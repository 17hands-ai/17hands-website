import { ArrowRight, Check } from "lucide-react";
import { BrandButton } from "@/components/brand/BrandButton";
import { CircuitTrace } from "@/components/brand/Decor";
import { BIO_PAGE_PRICE, BIO_PAGE_FOUNDING_SPOTS, BOOKING_URL } from "@/lib/site";

const converts = [
  {
    name: "Saved to their phone",
    body: "One tap adds you to their contacts with your name, number, email and booking link. Next time they need you, you're already there.",
  },
  {
    name: "One tap to call, text, email or book",
    body: "No hunting for a contact page. The actions that bring you business sit at the top, in the order that matters to you.",
  },
  {
    name: "Leads land in your inbox",
    body: "A short contact form sends each inquiry straight to your email, so a late-night visitor doesn't slip away.",
  },
  {
    name: "Found on Google and in AI answers",
    body: "Your page tells search engines and assistants like ChatGPT who you are, what you do and where you work.",
  },
];

const roi = [
  ["Realtor", "One closing, about $10,000 in commission", "Pays for the page about 50 times"],
  ["Salon or med spa", "One regular client, $500 to $1,500 a year", "Pays for the page in the first visit or two"],
  ["Coach or consultant", "One client, $1,000 to $5,000", "One discovery call that converts"],
];

const metrics = [
  "Page views, and where visitors came from: Instagram, LinkedIn, a QR code or Google",
  "Clicks on each link, so you know what people actually want",
  "Contact saves, calls, texts and emails tapped",
  "Form inquiries and booking clicks",
];

const included = [
  "One mobile-first page on your existing brand: your logo, colors and fonts",
  "Up to 8 links, ordered by what brings you business",
  "Contact card with save to phone, plus tap to call, text and email",
  "Your booking link: Calendly, cal.com, Square or similar",
  "One contact form that sends inquiries to your email",
  "A share image, so your link looks good when posted",
  "Search basics: title, description and business details for Google and AI assistants",
  "A QR code for print, cards and events",
  "Your own domain connected, or a free subdomain",
  "Analytics dashboard and a 30-day results summary",
  "One round of revisions, delivered in 5 business days",
];

const provide = [
  "A headshot or photo",
  "Your logo, if you have one",
  "The links you want on the page",
  "Phone, email and booking link",
  "Two or three sentences about you",
];

const addOns = [
  ["Logo and brand kit", "+$150", "A simple logo, color palette and font pairing if you don't have them yet."],
  ["Copywriting", "+$75", "We write your bio and link labels, not just polish them."],
  ["Edit it yourself", "+$100", "Update links and text from a Google Sheet. No login, nothing new to learn."],
  ["Care plan", "$15 to $25/mo", "Hosting, two small edits a month and a monthly results report."],
];

const comparison = [
  ["Who builds it", "You fill in a template", "Designed around your business"],
  ["Where it lives", "Their platform and their address", "Your own domain"],
  ["Cost", "$5 to $80 a month, every month", `${BIO_PAGE_PRICE} once, optional care plan`],
  ["Save contact to phone", "Not offered", "Built in"],
  ["Google and AI visibility", "Title and description", "Full business details"],
  ["If you stop paying", "The page goes with the plan", "The page is yours"],
];

const steps = [
  ["Book a call", "15 minutes on who you serve and what a good lead looks like for you."],
  ["Send your content", "A short checklist: photo, logo, links and a few sentences."],
  ["Review your page", "You get a preview link and one round of changes."],
  ["Go live and measure", "We connect your domain, and after 30 days you get your numbers."],
];

export default function BioPages() {
  return (
    <div className="flex flex-col">
      <section aria-labelledby="bio-title" className="relative overflow-hidden pt-36 pb-20 md:pt-44">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_0%,rgba(224,167,134,0.16),transparent_70%)]" aria-hidden="true" />
        <div className="container relative mx-auto px-4 sm:px-6 max-w-4xl hero-in">
          <p className="eyebrow mb-6">Bio pages for small businesses</p>
          <h1 id="bio-title" className="display text-[2.6rem] leading-[1.05] sm:text-6xl text-[var(--brand-text)] mb-8">
            Not a Linktree. <span className="rose-text">A page that turns followers into clients.</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--brand-text-2)] leading-relaxed max-w-2xl mb-8">
            One page behind your Instagram and LinkedIn bio, your business card and your QR code. Built on your brand and
            your domain, so people can save your contact, book you or send an inquiry in one tap. And you see exactly
            what it brings in.
          </p>
          <p className="inline-block mb-10 rounded-[var(--radius-badge)] border border-[var(--brand-rose)]/50 px-4 py-2 text-[var(--brand-text)]">
            <span className="rose-text font-semibold">Founding rate:</span> {BIO_PAGE_PRICE} flat for the first{" "}
            {BIO_PAGE_FOUNDING_SPOTS} clients.
          </p>
          <div className="flex flex-wrap gap-4">
            <BrandButton href={BOOKING_URL} size="lg">
              Book a 15-minute call <ArrowRight size={18} aria-hidden="true" />
            </BrandButton>
            <BrandButton href="/link-in-bio" variant="secondary" size="lg">
              See a live example
            </BrandButton>
          </div>
        </div>
      </section>

      <section aria-labelledby="converts-title" className="py-20 md:py-24 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="reveal max-w-3xl mb-12">
            <p className="eyebrow mb-4">Why it works</p>
            <h2 id="converts-title" className="display text-3xl md:text-4xl text-[var(--brand-text)] mb-6">
              It doesn't invent traffic. It turns the visitors you already get into contacts.
            </h2>
            <p className="text-lg text-[var(--brand-text-2)] leading-relaxed">
              People already tap the link in your bio, scan your card and look you up. A list of links sends them
              somewhere else. Your page gives them a reason and a way to reach you.
            </p>
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
            {converts.map((c) => (
              <li key={c.name} className="reveal border-t border-[var(--brand-rose)]/40 pt-6">
                <h3 className="font-sans text-xl font-semibold text-[var(--brand-text)] mb-2">{c.name}</h3>
                <p className="text-[var(--brand-text-2)] leading-relaxed">{c.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="roi-title" className="py-20 md:py-24 bg-atmosphere">
        <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20">
          <div className="reveal">
            <p className="eyebrow mb-4">The math</p>
            <h2 id="roi-title" className="display text-3xl md:text-4xl text-[var(--brand-text)] mb-6">
              One new client pays for it.
            </h2>
            <p className="text-lg text-[var(--brand-text-2)] leading-relaxed mb-8">
              Before we start, I ask how many inquiries you get from social media in a normal month. Thirty days after
              launch we compare. You see exactly what the page did.
            </p>
            <h3 className="font-sans text-lg font-semibold text-[var(--brand-text)] mb-4">What your dashboard shows</h3>
            <ul className="space-y-3">
              {metrics.map((m) => (
                <li key={m} className="flex gap-3 text-[var(--brand-text-2)] leading-relaxed">
                  <Check size={18} className="mt-1 shrink-0 text-[var(--brand-rose)]" aria-hidden="true" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal overflow-x-auto">
            <table className="w-full text-left">
              <caption className="sr-only">What one new client is worth, by type of business</caption>
              <thead>
                <tr className="border-b border-white/15 text-sm text-[var(--brand-text-2)]">
                  <th scope="col" className="py-3 pr-4 font-medium">Business</th>
                  <th scope="col" className="py-3 pr-4 font-medium">One new client is worth</th>
                  <th scope="col" className="py-3 font-medium">On a {BIO_PAGE_PRICE} page</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {roi.map(([who, worth, payback]) => (
                  <tr key={who}>
                    <th scope="row" className="py-5 pr-4 font-semibold text-[var(--brand-text)] align-top">{who}</th>
                    <td className="py-5 pr-4 text-[var(--brand-text-2)] align-top">{worth}</td>
                    <td className="py-5 rose-text align-top">{payback}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-6 text-sm text-[var(--brand-text-2)]/90">
              Typical values, not a promise. Results depend on the traffic you already have, which is why we measure.
            </p>
          </div>
        </div>
      </section>

      <section id="pricing" aria-labelledby="pricing-title" className="py-20 md:py-24 scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="reveal max-w-3xl mb-12">
            <p className="eyebrow mb-4">Founding rate · first {BIO_PAGE_FOUNDING_SPOTS} clients</p>
            <h2 id="pricing-title" className="display text-3xl md:text-5xl text-[var(--brand-text)] mb-6">
              <span className="rose-text">{BIO_PAGE_PRICE}</span> flat. Everything you need to start getting leads.
            </h2>
            <p className="text-lg text-[var(--brand-text-2)] leading-relaxed">
              Founding clients get this rate in exchange for letting me show their page as an example, a short
              testimonial and sharing their 30-day numbers. The price goes up after the first {BIO_PAGE_FOUNDING_SPOTS}.
            </p>
          </div>
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20">
            <div className="reveal">
              <h3 className="font-sans text-xl font-semibold text-[var(--brand-text)] mb-6">What's included</h3>
              <ul className="space-y-4">
                {included.map((item) => (
                  <li key={item} className="flex gap-3 text-[var(--brand-text-2)] leading-relaxed">
                    <Check size={18} className="mt-1 shrink-0 text-[var(--brand-rose)]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal">
              <h3 className="font-sans text-xl font-semibold text-[var(--brand-text)] mb-6">What you send me</h3>
              <ul className="space-y-3 mb-10">
                {provide.map((item) => (
                  <li key={item} className="flex gap-4 text-[var(--brand-text-2)] leading-relaxed">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-rose)]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-[var(--brand-text-2)] leading-relaxed">
                Your domain is about $12 a year, paid directly to the registrar, so it stays in your name.
              </p>
            </div>
          </div>

          <h3 className="reveal font-sans text-xl font-semibold text-[var(--brand-text)] mt-20 mb-6">Add when you need them</h3>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10">
            {addOns.map(([name, price, body]) => (
              <li key={name} className="reveal border-t border-[var(--brand-rose)]/40 pt-6">
                <p className="font-mono text-sm rose-text mb-2">{price}</p>
                <h4 className="font-sans text-lg font-semibold text-[var(--brand-text)] mb-2">{name}</h4>
                <p className="text-[var(--brand-text-2)] leading-relaxed">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="compare-title" className="py-20 md:py-24 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <h2 id="compare-title" className="reveal display text-3xl md:text-4xl text-[var(--brand-text)] mb-10">
            Why not Linktree or Later?
          </h2>
          <div className="reveal overflow-x-auto">
            <table className="w-full min-w-[34rem] text-left">
              <thead>
                <tr className="border-b border-white/15 text-sm text-[var(--brand-text-2)]">
                  <th scope="col" className="py-3 pr-4 font-medium"><span className="sr-only">Compared on</span></th>
                  <th scope="col" className="py-3 pr-4 font-medium">Link-in-bio apps</th>
                  <th scope="col" className="py-3 font-medium rose-text">Your bio page</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {comparison.map(([row, apps, ours]) => (
                  <tr key={row}>
                    <th scope="row" className="py-4 pr-4 font-semibold text-[var(--brand-text)] align-top">{row}</th>
                    <td className="py-4 pr-4 text-[var(--brand-text-2)] align-top">{apps}</td>
                    <td className="py-4 text-[var(--brand-text)] align-top">{ours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="reveal mt-8 text-[var(--brand-text-2)] leading-relaxed max-w-3xl">
            Every page runs on the same tested engine, so it's fast and secure. What's different is everything people
            see: your brand, your words, and the parts your business needs, like a license number and service areas for
            a realtor, or services and booking for a salon.
          </p>
        </div>
      </section>

      <section aria-labelledby="bio-how-title" className="py-20 md:py-24 bg-atmosphere">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 id="bio-how-title" className="reveal display text-3xl md:text-4xl text-[var(--brand-text)] mb-12">
            How it works
          </h2>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {steps.map(([name, body], i) => (
              <li key={name} className="reveal">
                <p className="font-mono text-sm rose-text mb-3">0{i + 1}</p>
                <h3 className="display text-xl text-[var(--brand-text)] mb-2">{name}</h3>
                <p className="text-[var(--brand-text-2)] leading-relaxed">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="bio-cta" className="py-24 text-center">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
          <CircuitTrace className="mx-auto mb-8 w-56" />
          <h2 id="bio-cta" className="display text-3xl md:text-5xl text-[var(--brand-text)] mb-6">
            Claim a founding spot.
          </h2>
          <p className="text-lg text-[var(--brand-text-2)] mb-10">
            {BIO_PAGE_PRICE} flat for the first {BIO_PAGE_FOUNDING_SPOTS} clients. Book a short call and we'll see if
            it's a fit.
          </p>
          <BrandButton href={BOOKING_URL} size="lg">
            Book a 15-minute call <ArrowRight size={18} aria-hidden="true" />
          </BrandButton>
        </div>
      </section>
    </div>
  );
}
