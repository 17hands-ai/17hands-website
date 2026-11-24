# Home page redesign (branch `simplify-home`)

The home page now sells three things, in this order, and moves everything else to its own page.

| Offer | Promise | Page |
|---|---|---|
| Custom websites and apps, SEO and AEO built in | Be found. | `/websites` (new) |
| Link-in-bio pages | Be remembered. | `/bio-pages` |
| AI and security workshops, teams and families | Stay safe. | `/workshops` (new), with `/digital-defenders` and `/for-you` linked from it |

## Home page order

1. Hero: three promises, one sentence, Book a call. Visual is three planes of real work (website, bio page, scam text) moving at different scroll rates.
2. Three offers, one row each, alternating sides, no prices.
3. Live work: one phone that slides from client to client as you scroll (pinned scroll-craft act, `LiveWork.tsx`, CSS in `index.css` under "Live work").
4. Testimonials: hidden until `src/lib/testimonials.ts` has entries.
5. Ways to start: the three starting prices, after the work.
6. About, short, with past employers and clients (`CompanyLogos.tsx`). Full story at `/about` (new).
7. Four FAQs (the first four of `faqs`; `HOME_FAQ_COUNT` in `site.ts` keeps the page and the FAQPage schema in step).
8. Close: one call.

Removed from the home page: the automation diagram, circuit rail, "Sound familiar", the two service pillars, "Delivery, not hype", How it works, the individuals banner. The stats band now lives on `/workshops`, the ROI calculator on `/websites`.

## Adding things later

- A project: capture 390x844 (phone) and 1440x900 (desktop) screenshots into `public/work/`, add it to `src/lib/work.ts`, add its copy under `home.work.items` in all three locale files. Only with the client's OK.
- A testimonial: add to `src/lib/testimonials.ts` once the person approves the wording.
- A real logo: drop a single-colour SVG in `public/logos/` and set `src` in `CompanyLogos.tsx`.

## SEO and AEO

Every new page is in `src/lib/pages.ts`, so it is prerendered with full text, listed in the sitemap and in `/llms.txt`. `/websites` and `/workshops` carry Service JSON-LD. `SITE_SUMMARY`, the home title and the organisation description now describe the three offers. Instagram is in the organisation `sameAs`. Old anchors `/#services` and `/#about` still land on the matching home sections.

## Open items

- Prices shown on the home page come from `src/lib/packages.ts` and still need sign-off.
- MLB and MasterClass appear under "Shipped apps for": confirm no NDA restricts naming them.
- Karla Newton and Kam Ayapova: confirm they are happy to be featured.
