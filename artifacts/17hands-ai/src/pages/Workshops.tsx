import { useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, Check } from "lucide-react";
import { BrandButton } from "@/components/brand/BrandButton";
import { PackageList } from "@/components/brand/PackageList";
import { ScamText } from "@/components/visuals/ScamText";
import { StatBand } from "@/components/visuals/StatBand";
import { BOOKING_URL, CONTACT_EMAIL } from "@/lib/site";
import { priceLabel, programs } from "@/lib/packages";
import { useContent } from "@/i18n";
import { useScrollCraft } from "@/hooks/use-scrollcraft";

const tracks = [
  {
    id: "teams",
    eyebrow: "For teams",
    title: "Use AI at work without the risk.",
    body: "Your team is already trying AI tools. This session gives everyone the same simple rules and the habits that stop the most common attacks.",
    points: [
      "What is safe to paste into ChatGPT and similar tools, and what never is",
      "Spotting scam emails, texts, calls and fake invoices",
      "Password managers and sign-in codes, set up during the session",
      "A one-page guide your team keeps",
    ],
  },
  {
    id: "families",
    eyebrow: "For families and communities",
    title: "Safer online, together.",
    body: "Through Digital Defenders, families, schools and community groups learn to spot scams and protect their accounts, in plain language and with no technical background needed.",
    points: [
      "Scam texts, calls and messages, with real examples",
      "Passwords, sign-in codes and account recovery",
      "Privacy settings, location sharing and kids online",
      "Helping older relatives stay safe",
    ],
  },
] as const;

export default function Workshops() {
  const content = useContent();
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollCraft(rootRef);
  const p = content.packages.programs.items;
  const programPrice = (id: (typeof programs)[number]["id"]) => {
    const def = programs.find((x) => x.id === id)!;
    return def.price ? priceLabel({ price: def.price, unit: "from" }, content.price) : p[id].priceNote;
  };

  return (
    <div ref={rootRef}>
      <section className="relative isolate overflow-hidden pt-36 pb-20 md:pt-44 md:pb-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_80%_20%,rgba(121,40,202,0.28),transparent_70%)]" aria-hidden="true" />
        <div className="container mx-auto px-4 sm:px-6 grid gap-14 lg:grid-cols-[1.3fr_1fr] items-center">
          <div>
            <p className="eyebrow mb-5">AI and security workshops</p>
            <h1 className="display text-5xl sm:text-6xl lg:text-7xl text-[var(--brand-text)] mb-7">
              Use AI. <span className="rose-text">Stay safe.</span>
            </h1>
            <p className="text-lg md:text-xl text-[var(--brand-text-2)] leading-relaxed max-w-2xl mb-10">
              Hands-on workshops that teach people to use AI with good security habits. For small business teams, and for families and community groups. In person locally, or live online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <BrandButton href={BOOKING_URL} placement="workshops-hero" size="lg">Plan a workshop <ArrowRight size={18} aria-hidden="true" /></BrandButton>
              <BrandButton href="#prices" variant="secondary" size="lg">See prices</BrandButton>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end" data-sc-in>
            <ScamText size="lg" className="w-full max-w-[420px]" />
          </div>
        </div>
      </section>

      {tracks.map((track, i) => (
        <section key={track.id} id={track.id} aria-labelledby={`${track.id}-title`} className={`py-20 md:py-24 scroll-mt-24 ${i === 0 ? "border-t border-border" : "bg-[var(--brand-primary)]"}`}>
          <div className="container mx-auto px-4 sm:px-6 grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div data-sc-in>
              <p className="font-mono text-xs uppercase tracking-[0.16em] rose-text mb-4">{track.eyebrow}</p>
              <h2 id={`${track.id}-title`} className="display text-4xl md:text-5xl text-[var(--brand-text)] mb-6">{track.title}</h2>
              <p className="text-lg text-[var(--brand-text-2)] leading-relaxed max-w-xl">{track.body}</p>
              {track.id === "families" && (
                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                  <Link href="/digital-defenders" className="inline-flex items-center gap-2 font-semibold rose-text underline underline-offset-4 hover:text-[var(--brand-text)]">About Digital Defenders <ArrowRight size={16} aria-hidden="true" /></Link>
                  <Link href="/for-you" className="inline-flex items-center gap-2 font-semibold rose-text underline underline-offset-4 hover:text-[var(--brand-text)]">1-on-1 sessions <ArrowRight size={16} aria-hidden="true" /></Link>
                </div>
              )}
            </div>
            <ul data-sc-in data-sc-stagger="90" className="space-y-4 self-center">
              {track.points.map((point) => (
                <li key={point} className="flex gap-3 text-lg text-[var(--brand-text)]">
                  <Check size={22} className="mt-1 shrink-0 text-[var(--brand-rose)]" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <StatBand />

      <section id="prices" aria-labelledby="prices-title" className="py-20 md:py-24 border-t border-border scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 grid gap-12 lg:grid-cols-[1fr_1.8fr] lg:gap-20">
          <div>
            <h2 id="prices-title" className="display text-4xl md:text-5xl text-[var(--brand-text)] mb-5">Starting prices.</h2>
            <p className="text-lg text-[var(--brand-text-2)] leading-relaxed mb-6">Topics and length are tailored to your group. You get the format and price in writing before booking.</p>
            <p className="text-sm text-[var(--brand-text-2)]">This is practical training and improvement work. It is not a formal audit, certification, penetration test or legal advice.</p>
          </div>
          <div>
            <PackageList ids={["team-workshop", "data-checkup"]} />
            <ul className="divide-y divide-white/10 border-b border-white/10">
              {(["ai-kickstart", "digital-defenders", "one-on-one"] as const).map((id) => (
                <li key={id} className="grid gap-2 py-7 md:grid-cols-[1fr_auto] md:gap-10">
                  <div>
                    <h3 className="font-sans text-xl font-semibold text-[var(--brand-text)]">{p[id].name}</h3>
                    <p className="mt-1 text-[var(--brand-text-2)]">{p[id].body}</p>
                  </div>
                  <p className="display text-2xl rose-text whitespace-nowrap md:text-right">{programPrice(id)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-atmosphere">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center">
          <h2 className="display text-4xl md:text-5xl text-[var(--brand-text)] mb-6">Bring a workshop to <span className="rose-text">your people.</span></h2>
          <p className="text-lg text-[var(--brand-text-2)] mb-10">Tell me who it is for and what worries them. Or email <a href={`mailto:${CONTACT_EMAIL}?subject=Workshop`} className="rose-text underline underline-offset-4">{CONTACT_EMAIL}</a>.</p>
          <BrandButton href={BOOKING_URL} placement="workshops-bottom" size="lg">Plan a workshop <ArrowRight size={18} aria-hidden="true" /></BrandButton>
        </div>
      </section>
    </div>
  );
}
