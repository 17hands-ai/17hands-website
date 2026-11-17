# 17hands.ai home: scroll-craft brief

**Self-authored under explicit creative delegation.** The request was "apply that skill on my
17hands.ai website and show me in localhost". No interview was run. Answers below are authored
decisions grounded in repo evidence (`DESIGN.md`, `src/i18n/en.ts`, recent commits), not quotes.

This is a retrofit of a live page, not a new build. Content, routes, i18n, booking links and the
header are kept as they are. The skill decides how the page behaves under scroll, not what it says.

## The eight topics

1. **Vibe.** Calm, exact, protective, warm. References: a well-set printed feature (a long
   magazine profile), a circuit board under a loupe, a handwritten field notebook.
   Evidence: DESIGN.md "editorial, plum canvas, rose gold line work".
2. **Journey (existing sequence, kept).** Who this is for and the promise, why now, products,
   the problems you already recognise, the two pillars, how delivery works, your numbers, the
   process, who is behind it, individuals, questions, book a call.
3. **Energy curve.** Calm open, a quiet but held middle where the problems land, the most
   movement at the two pillars, calm and steady through the proof, a settled close.
4. **Feeling, stage by stage, and the one moment.** See the feeling curve below. The moment: the
   single line that has been drawing itself down the margin splits in two at the services, one
   branch for Protect and one for Simplify, and they rejoin into one line that plugs into the
   booking call at the bottom.
5. **One thing no other site does.** The page is wired. The brand mark is a circuit; the page
   becomes one, drawn by the reader's own scroll.
6. **Distance from premium-minimal.** Editorial. Not brutalist, not maximalist. DESIGN.md rules out
   gradient orbs, stock 3D, hacker imagery and fear-led copy.
7. **One unbroken world or distinct scenes.** Distinct chapters on hard grounds (the page already
   alternates plum and obsidian grounds). Not a worldflight.
8. **Assets.** Logo film (`public/intro`), founder portrait (`public/portrait.jpg`), rose-gold
   logo, the circuit-trace line language, HeroFlow diagram. No kie.ai key; nothing generated.

## Grammar

**Chaptered editorial** (uniqueness.md 2.2). It fits long-form substance from a named founder and
matches the existing editorial direction. Deviations forced by the retrofit, all stated:

- The fixed header stays. It carries the booking button at every width (commit b4d74265), a
  deliberate business decision. The trace, not a folio, marks progress.
- The hero keeps its diagram and logo film beside the type (commit 30a1000b). The media sits in its
  own column and never under the headline, which is the rule the grammar exists to protect.
- The close keeps a real booking button. Booking is the one action.

Why the other seven lost: filmic one-shot and continuous world need footage this brand does not
have and would put media under type; live surface suits a tool, not a services firm; typographic
poster cannot carry four services per pillar; gallery has no catalogue to show; split stage needs
one side to win, and the brand's two pillars are deliberately equal; rhythmic cutlist is too loud
for "calm and protective".

## Journey (beats)

1. Recognition: hero. "This is for a business like mine."
2. Tension: Sound familiar. The problems named plainly.
3. Turn: the two pillars. Both problems have a home.
4. Substance: delivery, numbers, process, the person.
5. Commitment: book a call.

Stats, products, individuals and FAQ serve the beats they sit beside; none were cut, because this
is a live business page and cutting content is the owner's call.

## Feeling curve (written before devices)

| Act | Feeling | What causes it |
|---|---|---|
| Hero | Oriented, at ease | Type on plum, planes drift apart slightly as you start, nothing shouts |
| Why now (stats) | Alert | Real sourced figures count up once |
| Products | Curious | The two products arrive side by side |
| Sound familiar | Recognised, a little exposed | Each problem arrives one at a time while you read, held on screen |
| **Pillars (peak)** | **Relief: there is a plan** | The ground wipes open and the margin line forks into two lit branches |
| Delivery | Trust | Four commitments land in a steady rhythm |
| Your numbers | In control | The estimator responds to your inputs |
| How it works | Clear | Four steps, in order |
| About | Personal | The portrait settles in its column at a different rate than the text |
| Questions | Reassured | Plain answers, no motion |
| Close | Resolved, ready | The line arrives and plugs into the circuit above the booking call, which lights and holds |

## The peak

"The line down the side split in two when it got to what they do, then joined back up and plugged
into the book-a-call button." Lives in the pillars chapter and is resolved at the close. The pillars
already hold the most scroll room on the page.

**Tell-someone sentence:** It's the site where your scroll wires up the page, and the circuit
finishes at the booking call.

## Authored silence

The questions chapter has no motion on purpose. It sits just before the close so the arrival reads.

## Score (device per chapter)

| Chapter | Device | Why |
|---|---|---|
| Hero | `flow` + `parallax` x4 | Depth from planes separating as you start, type stays readable |
| Why now | existing count-up | Real sourced numbers only |
| Products | `in` + stagger | Two products arrive in turn |
| Sound familiar | `flow` + `cue` per row | Each problem lands while you read it |
| Pillars (peak) | `reveal` (ground wipe) + `in` + rail fork | Hard change of ground, the line splits |
| Delivery | `cue` per commitment | Steady rhythm keyed to scroll |
| Your numbers | none (interactive estimator) | The visitor is the motion |
| How it works | `in` + stagger | Steps in order |
| About | `parallax` on the portrait column | Portrait and text settle at different rates |
| Questions | none | Authored silence before the close |
| Close | rail arrival | Resolves and holds |

`data-sc-kinetic` was deliberately not used: it rewrites text nodes, which React owns.

## Feel check (2026-11-16, headless Chrome, 1440x900 and 390x844)

Felt, from the screenshot strip: oriented, alert, curious, recognised, relief (largest change on the
sheet: plum ground sweeps in and the line forks), trust, in control, clear, personal, quiet, resolved.
Matches the intended curve. Not felt from stills: the hero parallax is subtle (planes separate by at
most ~100px over the hero's exit); judge it live and raise the rates in Home.tsx if it reads flat.
