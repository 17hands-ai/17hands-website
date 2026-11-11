# Fable updates: project plan

Branch `fable-updates`, cut from `main` at d603cd5c on 2026-11-11. Nothing here is on production.
This file is the review guide: what was found, what this branch changes, what you need to decide
before merging, and what comes next.

## 1. Diagnosis

I read every route on main (`/`, `/packages` did not exist, `/bio-pages`, `/digital-defenders`,
`/for-you`, `/natural`, `/faq`, `/contact`, `/link-in-bio`).

| Finding | Where | Why it costs you |
|---|---|---|
| The only graphic on the home page was two text cards, hidden on phones | Home hero | A visitor has to read about 1,100 words to learn what you do |
| No number anywhere explains why a small business should act now | Whole site | Nothing creates urgency, so "Book a call" has no reason behind it |
| One price on the whole site ($200 bio page) | Home, FAQ, For You, Digital Defenders | "It depends" reads as expensive. Visitors who cannot size the cost do not book |
| Services are eight paragraphs in two lists | Home `#services` | Hard to scan, no sense of where to start or what comes after |
| No recurring offer | Whole site | Every sale is one-off. Nothing brings a client back monthly |
| No proof: no case study, no testimonial | Whole site | The strongest claim on the site is your own bio |
| Analytics is off (`UMAMI_WEBSITE_ID` is empty) | `src/lib/site.ts` | You cannot tell whether any change, including this branch, raised bookings |
| "October is Cybersecurity Awareness Month" still showing in November | `/digital-defenders` | Looks unmaintained |
| "Natural" is a placeholder in the main navigation | Header | Spends a top-level slot on a page with nothing to buy |

## 2. What this branch changes

All of it is inline SVG and CSS. No new dependency, no video, no image, no extra network request.

| Change | File | What the visitor sees |
|---|---|---|
| Animated flow diagram in the hero, on phones too | `src/components/visuals/HeroFlow.tsx` | Inquiries, emails and missed calls travel into a "17 / human check" hub and leave as booked calls and replies. Below it, customer records behind role-based access, with former staff removed. Both pillars in one picture |
| "Why now" stat band | `src/components/visuals/StatBand.tsx`, `src/lib/stats.ts` | Four sourced numbers that count up on scroll, each with a bar or trend chart and one line on what it means |
| ROI estimator | `src/components/visuals/RoiEstimator.tsx` | Three sliders and a three-way choice. Shows the yearly cost of repetitive admin, hours and dollars recovered, and how many weeks a quick-win automation takes to pay back. Runs in the browser, sends nothing |
| Packages page with starting prices | `src/pages/Packages.tsx`, `src/lib/packages.ts` | Three ladders (Websites, Protect, Automate and build) drawn as rising steps, monthly care plans, workshops and programs |
| Icons and starting prices on the service rows | `src/pages/Home.tsx` | Each service is scannable, four of them show "from $X" and link to the ladder |
| Phone comparison sketch | `src/components/visuals/BioPhones.tsx` | Link list versus bio page, side by side, on `/bio-pages` |
| Navigation, footer, sitemap, llms.txt, FAQ cost answer | `Header.tsx`, `Footer.tsx`, `pages.ts`, `faq.ts` | "Packages" is reachable everywhere and AI assistants can quote the prices |

Hero secondary button now reads "See packages and prices" and goes to `/packages`.

## 3. Performance

Measured with `pnpm run build` on this branch and on main, same machine.

| Asset | main | fable-updates | Change |
|---|---|---|---|
| JS, gzipped, every visitor | 119.3 KB | 133.0 KB | +13.7 KB |
| CSS, gzipped | 18.4 KB | 19.5 KB | +1.1 KB |
| Russian copy, `/ru` only | | 11.6 KB | separate chunk |
| Spanish copy, `/es` only | | 9.3 KB | separate chunk |
| Requests for English visitors | | | none added |

- Motion uses `transform`, `opacity` and `stroke-dashoffset` only. No layout work per frame.
- Scroll reveals use CSS view timelines, so they cost no JavaScript. Browsers without them show the content at rest.
- Every animation is inside `prefers-reduced-motion: no-preference`. Reduced-motion visitors get a still diagram and final numbers.
- The numbers are in the server-rendered HTML at their final value, so crawlers and AI assistants read 58%, not 0%.

Not measured: Lighthouse or real-device Core Web Vitals. Run PageSpeed Insights on the Vercel preview before merging.

## 4. The statistics, and where they come from

| Number | Claim | Source |
|---|---|---|
| 58% | U.S. small businesses using generative AI, up from 40% (2024) and 23% (2023) | U.S. Chamber of Commerce, Empowering Small Business 2025 |
| 60% | Breaches that involve a human element | Verizon DBIR 2025 |
| 88% | Breaches at small and midsize businesses that involved ransomware | Verizon DBIR 2025, SMB snapshot |
| 53% | Mobile visits abandoned when a page takes over 3 seconds | Google, "The Need for Mobile Speed", 2016 |

I confirmed each figure through search results on 2026-11-11, not by opening the primary PDFs.
Open the four links in `src/lib/stats.ts` once yourself before publishing. The Google figure is
ten years old and is labelled 2016 on the page. Replace it if you find a newer one you trust.

DESIGN.md says no fear-led copy and no fake metrics. Each number is paired with what a business
can do about it, and none is invented.

## 5. Decisions you need to make before production

These are yours. The branch should not merge until each has an answer.

1. **Every price in `src/lib/packages.ts` is my proposal.** I sized them from your $200 bio page
   and what a small business in El Dorado Hills or Folsom would pay a senior engineer. Change any
   `from` value in that one file and the page, the home rows, the estimator, the FAQ and llms.txt
   all follow.

   | Ladder | Steps |
   |---|---|
   | Websites | Bio page $200 flat, Starter from $900, Business from $2,400, Growth from $4,800 |
   | Protect | Data check-up from $600, Team workshop from $450, Protect bundle from $1,500 |
   | Automate and build | Quick win from $750, AI assistant from $1,500, Custom tool from $3,500 |
   | Care plans | Watch from $49/mo, Care from $129/mo, Partner from $349/mo |
   | Programs | AI kickstart from $600, 1-on-1 session from $120, Digital Defenders by group, onboarding program scoped |

2. **Care plans promise checks that are not built yet.** The page says agents run weekly uptime,
   speed, broken-link, certificate, breach-exposure and AI-visibility checks, and that you review
   the result. That pipeline does not exist in this repo. Either build it first (phase 2 below) or
   remove the `#care` section before merging.
3. **Teaspoon.** The custom tool step says "Example: a staff onboarding tool" without naming the
   client. With Teaspoon's permission, a named case study with one before-and-after number would
   be the strongest thing on the site.
4. **Is the first call free?** I did not write "free" anywhere because the site never says so.
   If it is, say it on the buttons.
5. **Navigation.** The header now has seven links. I recommend moving Natural to the footer until
   it has something to offer, and letting Packages carry Bio pages. Not done on this branch.

## 6. The /bio-pages comparison: analysis

What works: the "one new client pays for it" table is the best sales argument on the site, and
the founding-rate framing gives a reason to act now.

What weakens it:

- **The cost row is the weakest row but is presented as a win.** It says "$5 to $80 a month,
  every month". Linktree has a free tier, and recent reviews list its paid plans at $8, $15 and
  $35 a month. A visitor on the free tier sees "$200 once" as more expensive, not less. Lead with
  ownership, save-to-contacts and done-for-you instead, and state the cost honestly:
  "Free to about $35 a month, with their branding on the free plan".
- **"Save contact to phone: Not offered" needs checking.** I could not confirm this against
  Linktree's current feature list. If a competitor does offer it, the row is a false claim on a
  sales page. Verify, or reword to "Not on the free plan" if that is what is true.
- **The comparison is the sixth section.** Someone arriving from "Not a Linktree" in the headline
  wants the proof sooner. Move it above pricing.
- **It was all text.** This branch adds the two-phone sketch. The next step is a real screenshot
  of a client's page with its 30-day numbers once a founding client agrees.

## 6b. Second pass (2026-11-11): logo hub, themes, languages, urgency, SEO and AEO

| Change | Where | Notes |
|---|---|---|
| Hero hub shows the 17hands logo with "Human check" under it | `HeroFlow.tsx` | Logo breathes and the ring glows on a 4.8s loop. The hub keeps a dark plate in both themes so the rose gold reads |
| Light and dark mode | `index.css` (light theme block), `Header.tsx`, `index.html` | Sun and moon button in the header. Choice is saved and applied before first paint. Dark stays the default |
| English, Russian, Spanish | `src/i18n/` | `/`, `/packages`, `/faq`, `/contact` plus header and footer are translated. Russian at `/ru`, Spanish at `/es`, each a real pre-rendered page |
| "Waiting is the expensive option" CTA under the statistics | `StatBand.tsx` | Urgency tied to the sourced numbers, not invented scarcity |
| "Delivery, not hype" section with its own CTA | `Home.tsx` | Four commitments: a working result, written scope and price, measured outcome, no tool for its own sake |
| Estimator shows the monthly cost of waiting | `RoiEstimator.tsx` | |
| Structured data per route and language | `src/lib/schema.ts`, `vite.config.ts` | `FAQPage` on `/` and `/faq`, `OfferCatalog` with every price on `/packages` |
| hreflang, `<html lang>`, `og:locale`, language-aware sitemap | `vite.config.ts` | Translated routes cross-link all three languages plus `x-default` |
| Per-route share titles | `vite.config.ts` | Every route used to share the home page's `og:title`. Fixed |
| llms.txt now lists prices and the full FAQ | `vite.config.ts` | AI assistants can answer price and "why now" questions without rendering a page |
| Three new FAQ entries | `src/i18n/*.ts` | Why act now, how you differ from other AI consultants, ongoing support |

How the languages work: copy lives in `src/i18n/en.ts`, `ru.ts`, `es.ts`. The Russian and Spanish
files must match the English shape or typecheck fails. Prices are never typed into prose: copy
uses `{package-id}` tokens that are filled from `packages.ts`.

Decisions this pass adds:

6. **Translations are mine.** Russian is written in your voice (first person, feminine). Read it
   once. Spanish should be read by a native speaker before it goes live.
7. **Only four routes are translated.** Bio pages, Digital Defenders, For you, Natural, Privacy and
   Terms show English copy inside translated navigation under `/ru` and `/es`, and their canonical
   points at the English URL. Legal pages should be translated by a person, not by me.
8. **Light mode and the logo.** The rose gold PNG is softer on a light background. A darker
   bronze variant of the logo for light mode would be sharper if you have the source.
9. **Chat widget language.** The Chatbase assistant still greets in English on `/ru` and `/es`.
   That is configured in Chatbase.

## 7. Roadmap

**Phase 1, this branch.** Review, settle section 5, merge.

**Phase 2, makes the care plans real (1 to 2 weeks).**
- Scheduled agent that runs the Watch checks per client and drafts the monthly one-page update for your review.
- Turn on Umami and track three events: booking click, estimator use, package step click.
- `Offer` and `Service` structured data generated from `packages.ts` (the unmerged `geo-fixes` branch has the schema groundwork).
- Update the Chatbase assistant's knowledge with the prices. That lives in Chatbase, not this repo.

**Phase 3, round two: showcase of projects and products you built.**
- A `/work` page and a home strip: each project as problem, what was built, result, with a screenshot or short loop.
- Needs from you: the list of projects, which can be named publicly, one number per project, and screenshots.
- Candidates I know of: the Teaspoon onboarding tool, Digital Defenders, the bio page product, and this site itself.

**Phase 3b, proof.**
- Teaspoon onboarding case study: the problem, what was built, one measured result.
- LinkedIn recommendations as testimonials, once you have permission.
- Replace the estimator's default numbers with a real client's.

**Phase 4, video, only where it earns its weight.**
You offered Blender or Higgsfield video. I left it out of this branch on purpose: the diagrams
explain the service at 9 KB, and a hero video would cost 1 to 3 MB and your Higgsfield credits.
Two places where video would beat SVG:
- A 20-second screen recording of a real care-plan update arriving, on `/packages#care`.
- A short loop of the staff onboarding tool in use, for the case study.

Rules if you add them: below the fold, `preload="none"`, poster image first, under 1.5 MB, WebM
plus MP4, no autoplay with reduced motion. The intro opener already follows this pattern.

**Phase 5, text diet on the pages this branch did not rewrite.**
- Home "Sound familiar?": eight long bullets. Turn into a four-question self-check.
- Home "About": four paragraphs. Keep two, let the stat row carry the rest.
- `/digital-defenders`: drop the October banner, add group pricing, reformat the one-line JSX.
- `/for-you`: show the session price in the hero.

## 8. How to review

```bash
pnpm --dir artifacts/17hands-ai run dev
```

Then open `/?intro=0`, `/packages`, `/bio-pages`, `/ru` and `/es/packages`. Try the theme button and a phone width.

Verified on this branch: typecheck passes, production build passes, `/packages` is pre-rendered
and in the sitemap and llms.txt, no console errors, no horizontal scroll at 375px, layouts checked
at desktop and phone width. Not verified: the animations in motion (the preview pane freezes the
animation clock, so I saw start and end states only), Safari and Firefox, and Lighthouse.
