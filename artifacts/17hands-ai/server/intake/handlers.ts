/**
 * The two intake endpoints, written against web-standard Request and Response so the same code
 * runs as Vercel functions (api/bio-intake), in the Vite dev server and in tests.
 *
 *   POST /api/bio-intake/start   answers + spam check  ->  upload URLs + a signed upload token
 *   (browser uploads the files straight to private storage)
 *   POST /api/bio-intake/submit  answers + token       ->  files verified, row stored, owner emailed
 *
 * Files cannot travel through a function: Vercel caps request bodies at 4.5 MB.
 */
import { randomBytes, randomUUID } from "node:crypto";
import {
  FILE_EXTENSIONS,
  PRIVACY_POLICY_VERSION,
  fieldErrors,
  startSchema,
  submitSchema,
  type FileExtension,
  type FileSlot,
  type SubmitInput,
} from "../../src/lib/intake/schema.js";
import { checkUpload } from "./files.js";
import type { IntakeStore, SubmissionRow } from "./store.js";
import { hashIp, signGrant, verifyGrant } from "./token.js";

export interface IntakeDeps {
  store: IntakeStore;
  /** True when Cloudflare confirms the Turnstile token. */
  verifyTurnstile(token: string, ip: string): Promise<boolean>;
  /** Tell the owner a submission arrived. Throwing is logged and does not fail the request. */
  notify(submission: { id: string; fullName: string }): Promise<void>;
  /** Tell the client their details arrived. Throwing is logged and does not fail the request. */
  confirm(submission: { email: string }): Promise<void>;
  signingSecret: string;
  /** Exact origins allowed to call the API, e.g. "https://17hands.ai". */
  allowedOrigins: string[];
  now?: () => Date;
}

const MAX_BODY_BYTES = 32_000;
const RATE_LIMIT = 10;
const RATE_WINDOW_SECONDS = 3600;
const UPLOAD_WINDOW_MS = 30 * 60 * 1000;
/** Files are kept this long when nobody moves the date, i.e. the project never went ahead. */
const DEFAULT_RETENTION_DAYS = 365;

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    },
  });

const refuse = (status: number, error: string, message: string, fields?: Record<string, string>) =>
  json(status, { ok: false, error, message, ...(fields ? { fields } : {}) });

const clientIp = (request: Request) =>
  request.headers.get("x-real-ip")?.trim() || request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";

/**
 * Checks shared by both endpoints, in order of cost. The API holds no cookie or session, so
 * there is nothing for a cross-site request to ride on; the origin check and the JSON-only
 * rule (which forces a CORS preflight that is never answered) close the door anyway.
 */
async function admit(
  request: Request,
  deps: IntakeDeps,
  action: "start" | "submit",
): Promise<{ body: unknown; ip: string } | Response> {
  if (request.method !== "POST") return refuse(405, "method", "Use POST.");
  const origin = request.headers.get("origin");
  if (!origin || !deps.allowedOrigins.includes(origin)) return refuse(403, "origin", "This request did not come from the form.");
  const site = request.headers.get("sec-fetch-site");
  if (site && site !== "same-origin") return refuse(403, "origin", "This request did not come from the form.");
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return refuse(415, "content-type", "Send JSON.");
  }
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) return refuse(413, "too-large", "That request is too large.");

  const ip = clientIp(request);
  const hits = await deps.store.hitRateLimit(`${action}:${hashIp(deps.signingSecret, ip)}`, RATE_WINDOW_SECONDS);
  if (hits > RATE_LIMIT) return refuse(429, "rate-limit", "Too many attempts from this connection. Please try again in an hour.");

  const text = await request.text();
  if (text.length > MAX_BODY_BYTES) return refuse(413, "too-large", "That request is too large.");
  try {
    return { body: JSON.parse(text) as unknown, ip };
  } catch {
    return refuse(400, "json", "That request could not be read.");
  }
}

/** The honeypot is an input people never see. Anything in it means a bot, which gets a believable "ok" and nothing stored. */
const honeypotFilled = (body: unknown) =>
  typeof body === "object" && body !== null && typeof (body as { website?: unknown }).website === "string" && (body as { website: string }).website.trim() !== "";

const randomName = () => randomBytes(16).toString("hex");

export async function handleStart(request: Request, deps: IntakeDeps): Promise<Response> {
  const admitted = await admit(request, deps, "start");
  if (admitted instanceof Response) return admitted;
  if (honeypotFilled(admitted.body)) return json(200, { ok: true, done: true });

  const parsed = startSchema.safeParse(admitted.body);
  if (!parsed.success) return refuse(422, "validation", "Some answers need another look.", fieldErrors(parsed.error));
  if (!(await deps.verifyTurnstile(parsed.data.turnstileToken, admitted.ip))) {
    return refuse(403, "turnstile", "The spam check did not pass. Please try it again.", { turnstileToken: "Complete the spam check again." });
  }

  const id = randomUUID();
  const pathFor = (slot: FileSlot, type: keyof typeof FILE_EXTENSIONS) => `pending/${id}/${slot}-${randomName()}.${FILE_EXTENSIONS[type]}`;
  const { files } = parsed.data;
  const headshot = pathFor("headshot", files.headshot.type);
  const logo = files.logo ? pathFor("logo", files.logo.type) : null;

  const uploads: Record<string, { url: string }> = { headshot: { url: await deps.store.createUploadUrl(headshot) } };
  if (logo) uploads.logo = { url: await deps.store.createUploadUrl(logo) };

  const now = (deps.now?.() ?? new Date()).getTime();
  return json(200, {
    ok: true,
    uploads,
    uploadToken: signGrant(deps.signingSecret, { id, headshot, logo, exp: now + UPLOAD_WINDOW_MS }),
  });
}

const extensionOf = (path: string) => path.slice(path.lastIndexOf(".") + 1) as FileExtension;

export async function handleSubmit(request: Request, deps: IntakeDeps): Promise<Response> {
  const admitted = await admit(request, deps, "submit");
  if (admitted instanceof Response) return admitted;
  if (honeypotFilled(admitted.body)) return json(200, { ok: true });

  const parsed = submitSchema.safeParse(admitted.body);
  if (!parsed.success) return refuse(422, "validation", "Some answers need another look.", fieldErrors(parsed.error));
  const now = deps.now?.() ?? new Date();
  const grant = verifyGrant(deps.signingSecret, parsed.data.uploadToken, now.getTime());
  if (!grant) return refuse(403, "token", "This session expired. Please submit the form again.");

  const pending = [grant.headshot, ...(grant.logo ? [grant.logo] : [])];
  const slots: [FileSlot, string | null][] = [["headshot", grant.headshot], ["logo", grant.logo]];
  for (const [slot, path] of slots) {
    if (!path) continue;
    const bytes = await deps.store.download(path);
    // Also the outcome of replaying a used token: its files have already been moved.
    if (!bytes) return refuse(400, "upload-missing", "An upload did not finish. Please submit the form again.");
    const check = checkUpload(bytes, slot, extensionOf(path));
    if (!check.ok) {
      await deps.store.remove(pending);
      return refuse(422, "file", "One of your files could not be accepted.", { [slot]: check.message });
    }
  }

  const stored = (path: string) => path.replace(/^pending\//, "submissions/");
  for (const path of pending) await deps.store.move(path, stored(path));

  const row = toRow(grant.id, parsed.data, now, stored(grant.headshot), grant.logo ? stored(grant.logo) : null);
  try {
    await deps.store.insertSubmission(row);
  } catch (error) {
    await deps.store.remove(pending.map(stored));
    throw error;
  }

  try {
    await deps.notify({ id: row.id, fullName: row.full_name });
    await deps.store.markNotified(row.id, (deps.now?.() ?? new Date()).toISOString());
  } catch (error) {
    // The submission is safely stored; a failed email must not make the client resubmit.
    console.error(`bio-intake: notification failed for ${row.id}:`, error instanceof Error ? error.message : error);
  }
  try {
    await deps.confirm({ email: row.email });
  } catch (error) {
    console.error(`bio-intake: confirmation failed for ${row.id}:`, error instanceof Error ? error.message : error);
  }
  return json(200, { ok: true });
}

function toRow(id: string, data: SubmitInput, now: Date, headshotPath: string, logoPath: string | null): SubmissionRow {
  const at = now.toISOString();
  const deleteAfter = new Date(now.getTime() + DEFAULT_RETENTION_DAYS * 86_400_000).toISOString().slice(0, 10);
  return {
    id,
    full_name: data.fullName,
    business_name: data.businessName,
    about: data.about,
    email: data.email,
    phone: data.phone,
    inquiry_email: data.inquiryEmail ?? data.email,
    brand_colors: data.brandColors ?? null,
    brand_fonts: data.brandFonts ?? null,
    links: data.links,
    booking_url: data.bookingUrl ?? null,
    domain_choice: data.domainChoice,
    own_domain: data.ownDomain ?? null,
    social_handles: data.socialHandles ?? null,
    headshot_path: headshotPath,
    logo_path: logoPath,
    consent_privacy_at: at,
    consent_founding_at: at,
    consent_assets_at: at,
    privacy_policy_version: PRIVACY_POLICY_VERSION,
    delete_files_after: deleteAfter,
  };
}

/** Wrap a handler so an unexpected failure is logged without personal data and answered plainly. */
export const guarded =
  (handler: (request: Request, deps: IntakeDeps) => Promise<Response>, deps: () => IntakeDeps) =>
  async (request: Request): Promise<Response> => {
    try {
      return await handler(request, deps());
    } catch (error) {
      console.error("bio-intake: request failed:", error instanceof Error ? error.message : error);
      return refuse(500, "server", "Something went wrong on our side. Please try again, or email info@17hands.ai.");
    }
  };
