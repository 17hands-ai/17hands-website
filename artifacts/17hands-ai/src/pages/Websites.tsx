import { useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ArrowUpRight, Gauge, MonitorSmartphone, Palette, Search } from "lucide-react";
import { BrandButton } from "@/components/brand/BrandButton";
import { PackageList } from "@/components/brand/PackageList";
import { BrowserFrame, PhoneFrame, Shot } from "@/components/visuals/Devices";
import { RoiEstimator } from "@/components/visuals/RoiEstimator";
import { BOOKING_URL } from "@/lib/site";
import { workById } from "@/lib/work";
import { useContent } from "@/i18n";
import { useScrollCraft } from "@/hooks/use-scrollcraft";

const gets = [
  { icon: Palette, name: "Designed around your brand", body: "No templates. Your colours, your voice and your photos, so the site looks like the business people meet in person." },
  { icon: Search, name: "Found on Google and in AI answers", body: "Search engine optimization (SEO) helps you rank on Google. Answer engine optimization (AEO) helps assistants like ChatGPT, Gemini and Perplexity understand what you do and recommend you. Both are built in from the first page: clear headings, real text, structured data and an llms.txt file." },
  { icon: Gauge, name: "Fast and easy to use", body: "Pages load quickly on a phone, work with screen readers and keyboards, and make the next step obvious: call, book or send a request." },
  { icon: MonitorSmartphone, name: "Apps when a site is not enough", body: "Booking flows, request forms, customer portals, internal tools and mobile apps, built by an engineer with 12+ years of shipping apps used by millions." },
];

const steps = [
  { name: "Talk", body: "We go through your business, your customers and what the site needs to do." },
  { name: "Design", body: "You see the look and the words before anything is built, and we adjust together." },
  { name: "Build", body: "I build it, connect your booking and forms, and set up search and AI visibility." },
  { name: "Launch and measure", body: "We go live on your domain and check how people find and use it." },
];

export default function Websites() {
  const content = useContent();
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollCraft(rootRef);
  const teaspoon = workById("teaspoon");
  const stuniverse = workById("stuniverse");
  const items = content.home.work.items;

  return (
    <div ref={rootRef}>
      <section className="relative isolate overflow-hidden pt-36 pb-20 md:pt-44 md:pb-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_80%_20%,rgba(121,40,202,0.28),transparent_70%)]" aria-hidden="true" />
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <p className="eyebrow mb-5">Websites & apps</p>
          <h1 className="display text-5xl sm:text-6xl lg:text-7xl text-[var(--brand-text)] mb-7">
            A website that gets you <span className="rose-text">found.</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--brand-text-2)] leading-relaxed max-w-2xl mb-10">
            Custom websites and apps for small businesses, built around your brand and set up so customers, Google and AI assistants can all understand what you do.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <BrandButton href={BOOKING_URL} placement="websites-hero" size="lg">{content.common.book} <ArrowRight size={18} aria-hidden="true" /></BrandButton>
            <BrandButton href="#prices" variant="secondary" size="lg">See prices</BrandButton>
          </div>
        </div>
      </section>

      <section aria-labelledby="gets-title" className="py-20 md:py-24 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 id="gets-title" className="display text-4xl md:text-5xl text-[var(--brand-text)] mb-12 max-w-2xl">What you get.</h2>
          <ul data-sc-in data-sc-stagger="90" className="grid gap-x-16 gap-y-12 md:grid-cols-2">
            {gets.map(({ icon: Icon, name, body }) => (
              <li key={name} className="flex gap-5">
                <Icon size={28} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[var(--brand-rose)]" aria-hidden="true" />
                <div>
                  <h3 className="font-sans text-xl font-semibold text-[var(--brand-text)] mb-2">{name}</h3>
                  <p className="text-[var(--brand-text-2)] leading-relaxed">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="websites-work-title" className="py-20 md:py-24 bg-[var(--brand-primary)]">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 id="websites-work-title" className="display text-4xl md:text-5xl text-[var(--brand-text)] mb-12">Live sites.</h2>
          <div className="grid gap-16 lg:grid-cols-2">
            {[
              { w: teaspoon, copy: items.teaspoon, host: "teaspoonedh.com" },
              { w: stuniverse, copy: items.stuniverse, host: "thestuniverse.com" },
            ].map(({ w, copy, host }) => (
              <article key={w.id} data-sc-in>
                <div className="relative mb-8 pr-[18%]">
                  <BrowserFrame url={host}><Shot src={w.desktop!} alt={`${copy.name} on desktop`} /></BrowserFrame>
                  <PhoneFrame className="absolute -bottom-6 right-0 w-[24%]"><Shot src={w.phone} alt={`${copy.name} on a phone`} /></PhoneFrame>
                </div>
                <h3 className="font-sans text-xl font-semibold text-[var(--brand-text)]">{copy.name}</h3>
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--brand-text-2)] mt-1 mb-3">{copy.kind}</p>
                <p className="text-[var(--brand-text-2)] leading-relaxed mb-4 max-w-lg">{copy.body}</p>
                <a href={w.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rose-text underline underline-offset-4 hover:text-[var(--brand-text)]">
                  Visit live <ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only">: {copy.name}{content.common.newTab}</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="how-title" className="py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 id="how-title" className="display text-4xl md:text-5xl text-[var(--brand-text)] mb-12">How it works.</h2>
          <ol data-sc-in data-sc-stagger="110" className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step.name} className="relative pt-8 border-t border-[var(--brand-rose)]/50">
                <span className="absolute -top-[5px] left-0 h-2.5 w-2.5 rounded-full bg-[var(--brand-rose)]" aria-hidden="true" />
                <p className="font-mono text-sm rose-text mb-3">0{i + 1}</p>
                <h3 className="display text-2xl text-[var(--brand-text)] mb-3">{step.name}</h3>
                <p className="text-[var(--brand-text-2)] leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="prices" aria-labelledby="prices-title" className="py-20 md:py-24 border-t border-border scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 grid gap-12 lg:grid-cols-[1fr_1.8fr] lg:gap-20">
          <div>
            <h2 id="prices-title" className="display text-4xl md:text-5xl text-[var(--brand-text)] mb-5">Starting prices.</h2>
            <p className="text-lg text-[var(--brand-text-2)] leading-relaxed mb-6">You get a written scope and the final price before any work begins. Apps and custom tools are scoped per project.</p>
            <Link href="/packages" className="inline-flex items-center gap-2 rose-text underline underline-offset-4 hover:text-[var(--brand-text)]">All packages and care plans <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          <PackageList ids={["starter-site", "business-site", "growth-site", "custom-tool"]} />
        </div>
      </section>

      <RoiEstimator />

      <section className="py-20 md:py-28 bg-atmosphere">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center">
          <h2 className="display text-4xl md:text-5xl text-[var(--brand-text)] mb-6">Let's make you <span className="rose-text">easy to find.</span></h2>
          <p className="text-lg text-[var(--brand-text-2)] mb-10">Tell me about your business and what the site needs to do. We'll work out the right size together.</p>
          <BrandButton href={BOOKING_URL} placement="websites-bottom" size="lg">{content.common.book} <ArrowRight size={18} aria-hidden="true" /></BrandButton>
        </div>
      </section>
    </div>
  );
}
