# 17hands.ai website

Vite + React + Tailwind, statically built and hosted on Vercel. Routes are listed in
`src/lib/pages.ts`; the `staticRoutes` plugin in `vite.config.ts` writes one HTML file per route.

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm test         # vitest
pnpm typecheck
pnpm build
```

## Bio page intake form

`/bio-pages/start` collects what is needed to build a client's bio page and replaces the Google
Form. It is the only part of the site with a backend.

### How it works

```
browser                         Vercel function                    Supabase
  | POST /api/bio-intake/start  |                                     |
  |   answers, Turnstile token  | origin check, rate limit, zod,      |
  |   file types and sizes      | Turnstile verify                    |
  | <-- signed upload URLs -----| createSignedUploadUrl ------------> |
  |     + signed upload token   |                                     |
  | PUT files ------------------------------------------------------> | private bucket, pending/
  | POST /api/bio-intake/submit |                                     |
  |   answers, upload token     | zod again, verify token, download   |
  |                             | each file, check size + signature,  |
  |                             | check SVG, move to submissions/,    |
  | <-- ok ---------------------| insert row, email via Resend        |
```

Files go from the browser straight to Supabase because Vercel caps function request bodies at
4.5 MB. The server never trusts what the browser said about a file: after upload it downloads the
bytes and decides the type from them.

| Where | What |
| --- | --- |
| `src/lib/intake/schema.ts` | The zod schema. Shared by the form and the API. |
| `src/pages/BioPagesStart.tsx` | The form and success screen. |
| `server/intake/` | Handlers, upload checks, SVG allowlist, token signing, Supabase store, tests. |
| `api/bio-intake/*.ts` | Vercel function entry points. Two lines each. |
| `supabase/migrations/` | Table, rate limit function and bucket. |
| `scripts/purge-intake-files.mjs` | Deletes files past their retention date. |
| `vercel.json` | Security headers. The form's CSP is generated at build time in `vite.config.ts`. |

Decisions worth knowing:

- **SVG is checked, not cleaned.** A logo SVG must pass a strict allowlist of elements and
  attributes (`server/intake/svg.ts`). Anything else, including editor metadata from Inkscape, is
  rejected and the client is asked for a PNG. Headshots cannot be SVG.
- **The notification email holds the client's name and a link, nothing else.** The link opens the
  row in the Supabase dashboard, which is behind your Supabase login.
- **No cookies, no session.** Cross-site requests are refused by an `Origin` check, a JSON-only
  rule and the signed upload token.
- **IP addresses are not stored.** Rate limiting keeps a keyed hash for up to 24 hours.

### Setup

Vercel's **Root Directory** for this project must be `artifacts/17hands-ai` (Project > Settings >
Build and Deployment). The `api/` folder and `vercel.json` are only picked up from the root directory.

#### 1. Supabase

1. Create a project at supabase.com (or use an existing one).
2. Open **SQL Editor**, paste `supabase/migrations/20261116000000_bio_intake.sql`, run it. It
   creates `bio_intake_submissions`, `bio_intake_rate_limits`, the `bio_intake_rate_hit` function
   and the private `bio-intake` bucket.
3. Check **Storage**: the `bio-intake` bucket should show as private, with no policies.
4. From **Project Settings > API** (or **API Keys**) copy the project URL and the secret key
   (called `service_role` on older projects). Never use this key in browser code.

#### 2. Cloudflare Turnstile

1. dash.cloudflare.com > **Turnstile** > **Add widget**.
2. Hostnames: `17hands.ai`. Add `localhost` and your `*.vercel.app` preview host if you want to
   test there with real keys. Mode: Managed.
3. Copy the **site key** and the **secret key**.

#### 3. Resend

1. resend.com > **Domains** > add `17hands.ai` and add the DNS records it shows.
2. **API Keys** > create a key with "Sending access" only.
3. Choose a sender on the verified domain, e.g. `17hands intake <intake@17hands.ai>`.

#### 4. The link in the email

Open `bio_intake_submissions` in the Supabase **Table Editor**, add a filter `id` `equals` any
value, and copy the address from the browser. Replace the value with `{id}`. The result looks like:

```
https://supabase.com/dashboard/project/<project-ref>/editor/<table-id>?schema=public&filter=id%3Aeq%3A{id}
```

#### 5. Environment variables

Vercel: **Project > Settings > Environment Variables**. Add each for **Production** and
**Preview**, and mark the four secrets as **Sensitive**. Locally, copy `.env.example` to `.env`.

| Variable | Value | Secret |
| --- | --- | --- |
| `SUPABASE_URL` | Supabase project URL | no |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase secret / `service_role` key | **yes** |
| `SUPABASE_INTAKE_BUCKET` | `bio-intake` | no |
| `VITE_TURNSTILE_SITE_KEY` | Turnstile site key. Built into the page, so redeploy after changing it. | no |
| `TURNSTILE_SECRET_KEY` | Turnstile secret key | **yes** |
| `RESEND_API_KEY` | Resend API key | **yes** |
| `INTAKE_EMAIL_FROM` | Sender on your verified domain | no |
| `INTAKE_NOTIFY_EMAIL` | Where notices are sent | no |
| `INTAKE_SUBMISSION_URL_TEMPLATE` | The link from step 4 | no |
| `INTAKE_SIGNING_SECRET` | Output of `openssl rand -base64 48` | **yes** |
| `INTAKE_ALLOWED_ORIGINS` | `https://17hands.ai` | no |

If a required variable is missing in production, the API answers 500 and the form shows an
"email us" message. It never falls back to a stand-in.

### Running locally

`pnpm dev` serves the API from the Vite dev server with the same handlers Vercel runs. Each
service is real if its keys are in `.env` and a stand-in if not: submissions held in memory,
Cloudflare's public test keys, and the email printed to the terminal. The terminal says which
are in use on the first request.

### Retention

Each row has `delete_files_after` (a date) and `files_deleted_at`. New submissions get a date 90
days out, which covers projects that never go ahead. After you deliver a page:

```sql
update bio_intake_submissions
set status = 'delivered', delete_files_after = current_date + 30
where id = '<submission id>';
```

Then, whenever you like (monthly is enough):

```bash
pnpm intake:purge
```

```bash
pnpm intake:purge --confirm
```

The first lists what is due, the second deletes it. It also removes uploads that were started and
never submitted. The privacy policy promises that written answers are deleted after 24 months:

```sql
delete from bio_intake_submissions
where created_at < now() - interval '24 months' and status in ('delivered', 'cancelled');
```

To honour a deletion request, delete the row and the two paths in its `headshot_path` and
`logo_path` columns from the bucket.

### Before going live

- [ ] Have the privacy policy (`src/pages/Privacy.tsx`) reviewed by a lawyer. The intake sections
      are a plain-language draft written with CalOPPA in mind. When the text changes, update
      `PRIVACY_POLICY_VERSION` in `src/lib/intake/schema.ts`; it sets the effective date and is
      stored with each submission.
- [ ] Deploy to a Vercel preview and send one real submission with a photo and an SVG logo. The
      browser-to-Supabase upload and the Vercel function build have not been exercised outside
      local stand-ins.
- [ ] Confirm the email arrives and its link opens the right row.
- [ ] Confirm the retention periods in the privacy policy (30 days after delivery, 90 days if the
      project does not go ahead, 24 months for answers) match what you intend to do.
