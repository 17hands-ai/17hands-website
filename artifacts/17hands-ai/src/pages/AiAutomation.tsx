import { useRef } from "react";
import { Link } from "wouter";
import {
  ArrowRight, GraduationCap, KeyRound, MonitorSmartphone, Presentation, ScanSearch, ScrollText, Search, Workflow,
  type LucideIcon,
} from "lucide-react";
import { BrandButton } from "@/components/brand/BrandButton";
import { BrandMark, BrandNumeral, CircuitTrace } from "@/components/brand/Decor";
import { BOOKING_URL } from "@/lib/site";
import { packageDef, priceLabel, type PackageId } from "@/lib/packages";
import { useContent, useI18n } from "@/i18n";
import { HeroFlow } from "@/components/visuals/HeroFlow";
import { StatBand } from "@/components/visuals/StatBand";
import { RoiEstimator } from "@/components/visuals/RoiEstimator";
import { CircuitRail } from "@/components/visuals/CircuitRail";
import { useScrollCraft } from "@/hooks/use-scrollcraft";

/** Per pillar, in the same order as `home.pillars[n].services` in the locale files. */
const pillarMeta: { id: string; packagesHash: string; services: { icon: LucideIcon; price?: PackageId }[] }[] = [
  {
    id: "protect",
    packagesHash: "protect",
    services: [
      { icon: ScanSearch, price: "data-checkup" },
      { icon: GraduationCap, price: "team-workshop" },
      { icon: KeyRound },
      { icon: ScrollText },
    ],
  },
  {
    id: "simplify",
    packagesHash: "automate",
    services: [
      { icon: Workflow, price: "quick-win" },
      { icon: MonitorSmartphone, price: "starter-site" },
      { icon: Search },
      { icon: Presentation },
    ],
  },
];

/**
 * AI automation and security for small businesses: the original home page, kept whole as its own
 * route. The circuit rail draws down the margin as the reader scrolls.
 */
export default function AiAutomation() {
  const content = useContent();
  const { locale } = useI18n();
  const t = content.ai;
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollCraft(rootRef, locale);

  return (
    <div ref={rootRef} className="relative flex flex-col">
      <CircuitRail rootRef={rootRef} />
      {/* Hero */}
      <section aria-labelledby="hero-title" data-sc-act="flow" className="relative isolate overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
        {/* Depth planes, far to near: numeral, glow, diagram, copy. Positive rates trail the scroll. */}
        <div className="absolute -inset-y-24 inset-x-0 -z-10" data-sc-parallax="1.2" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgba(121,40,202,0.28),transparent_70%)]" />
        </div>
        <div className="absolute inset-0 -z-10" data-sc-parallax="2" aria-hidden="true">
          <BrandNumeral className="-right-6 bottom-0 hidden md:block" />
        </div>

        <div data-rail-content className="container relative mx-auto px-4 sm:px-6 grid lg:grid-cols-[1.25fr_1fr] gap-16 items-center">
          <div data-sc-parallax="-0.5"><div className="hero-in">
            <p className="eyebrow mb-6">{t.hero.eyebrow}</p>
            <h1 id="hero-title" data-rail-node className="display text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl text-[var(--brand-text)] mb-8">
              {t.hero.line1}<span className="rose-text">{t.hero.accent1}</span>
              <br />
              {t.hero.line2}<span className="rose-text">{t.hero.accent2}</span>
            </h1>
            <p className="text-lg md:text-xl text-[var(--brand-text-2)] leading-relaxed max-w-2xl mb-10">{t.hero.body}</p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <BrandButton href={BOOKING_URL} placement="ai-hero" size="lg">
                {content.common.book} <ArrowRight size={18} aria-hidden="true" />
              </BrandButton>
              <BrandButton href="/packages" variant="secondary" size="lg">
                {t.hero.packages}
              </BrandButton>
            </div>
            <p className="text-sm text-[var(--brand-text-2)]">
              {t.hero.individuals}{" "}
              <Link href="/for-you" className="rose-text underline underline-offset-4 hover:text-white">
                {t.hero.individualsLink}
              </Link>
            </p>
          </div></div>

          <div data-sc-parallax="0.7"><div className="hero-in" style={{ animationDelay: "0.15s" }}>
            <div className="hero-visual relative w-full max-w-[460px] mx-auto lg:ml-auto lg:mr-0">
              <HeroFlow className="w-full" />
              
            </div>
          </div></div>
        </div>
      </section>

      <StatBand />

      {/* Recognizable problems */}
      <section aria-labelledby="familiar-title" data-sc-act="flow" className="relative isolate py-24 md:py-28 border-t border-border">
        <div className="container relative mx-auto px-4 sm:px-6">
          <BrandMark />
          <div className="max-w-3xl mb-14" data-sc-cue="0.02">
            <h2 id="familiar-title" data-rail-node className="display text-4xl md:text-5xl text-[var(--brand-text)]">{t.familiar.title}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            {([
              [t.familiar.protectTitle, t.familiar.protect],
              [t.familiar.simplifyTitle, t.familiar.simplify],
            ] as const).map(([heading, items]) => (
              <div key={heading}>
                <h3 className="display text-2xl rose-text mb-6" data-sc-cue="0.08">{heading}</h3>
                <ul className="space-y-5">
                  {items.map((item, row) => (
                    <li key={item} data-sc-cue={(0.12 + row * 0.045).toFixed(3)} className="flex gap-4 text-lg text-[var(--brand-text-2)] leading-relaxed">
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-rose)]" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-14 max-w-2xl text-lg text-[var(--brand-text)]" data-sc-cue="0.36">{t.familiar.closing}</p>
        </div>
      </section>

      {/* Services: two pillars */}
      <section id="services" aria-labelledby="services-title" data-sc-act="flow" data-rail-fork className="scroll-mt-24">
        <h2 id="services-title" className="sr-only">{t.servicesTitle}</h2>
        {t.pillars.map((pillar, i) => {
          const meta = pillarMeta[i];
          return (
            <div key={meta.id} className="relative isolate py-24 md:py-28">
              {i === 0 && <div className="bg-atmosphere absolute inset-0 -z-10" data-sc-reveal="left" data-sc-reveal-at="0 0.12" aria-hidden="true" />}
              <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20">
                <div className="lg:sticky lg:top-32 self-start" data-sc-in>
                  <p className="eyebrow mb-4">{pillar.eyebrow}</p>
                  <h3 data-rail-branch={i} className="display text-3xl md:text-4xl text-[var(--brand-text)] mb-6">{pillar.title}</h3>
                  <p className="text-lg text-[var(--brand-text-2)] leading-relaxed">{pillar.intro}</p>
                </div>
                <div>
                  <ul data-sc-in data-sc-stagger="90" className="divide-y divide-white/10 border-y border-white/10">
                    {pillar.services.map((s, j) => {
                      const { icon: Icon, price } = meta.services[j];
                      return (
                        <li key={s.name} className="py-7 flex gap-5">
                          <Icon size={26} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[var(--brand-rose)]" aria-hidden="true" />
                          <div>
                            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
                              <h4 className="font-sans text-xl font-semibold text-[var(--brand-text)]">{s.name}</h4>
                              {price && <span className="font-mono text-sm rose-text">{priceLabel(packageDef(price), content.price)}</span>}
                            </div>
                            <p className="text-[var(--brand-text-2)] leading-relaxed">{s.body}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  {pillar.note && <p className="mt-6 text-sm text-[var(--brand-text-2)]/90">{pillar.note}</p>}
                  <Link href={`/packages#${meta.packagesHash}`} className="mt-6 inline-flex items-center gap-2 rose-text underline underline-offset-4 hover:text-white">
                    {pillar.link} <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Delivery, not hype */}
      <section id="delivery" aria-labelledby="delivery-title" data-sc-act="flow" data-rail-merge className="relative isolate py-24 md:py-28 bg-[var(--brand-primary)] scroll-mt-24">
        <div className="container relative mx-auto px-4 sm:px-6">
          <BrandMark />
          <div className="max-w-4xl mb-14" data-sc-cue="0.03">
            <p className="eyebrow mb-4">{t.delivery.eyebrow}</p>
            <h2 id="delivery-title" data-rail-node className="display text-4xl md:text-5xl text-[var(--brand-text)] mb-6">
              {t.delivery.title}<span className="rose-text">{t.delivery.accent}</span>
            </h2>
            <p className="text-lg text-[var(--brand-text-2)] leading-relaxed max-w-2xl">{t.delivery.body}</p>
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10 mb-12">
            {t.delivery.points.map((p, i) => (
              <li key={p.name} data-sc-cue={(0.2 + i * 0.05).toFixed(2)} className="relative pt-8 border-t border-[var(--brand-rose)]/50">
                <span className="absolute -top-[5px] left-0 h-2.5 w-2.5 rounded-full bg-[var(--brand-rose)]" aria-hidden="true" />
                <h3 className="font-sans text-xl font-semibold text-[var(--brand-text)] mb-2">{p.name}</h3>
                <p className="text-[var(--brand-text-2)] leading-relaxed">{p.body}</p>
              </li>
            ))}
          </ul>
          <BrandButton href={BOOKING_URL} placement="ai-delivery" size="lg">
            {t.delivery.cta} <ArrowRight size={18} aria-hidden="true" />
          </BrandButton>
        </div>
      </section>

      <RoiEstimator />

      {/* How it works */}
      <section id="how-it-works" aria-labelledby="how-title" className="relative isolate py-24 md:py-28 border-t border-border scroll-mt-24">
        <div className="container relative mx-auto px-4 sm:px-6">
          <BrandMark />
          <div className="max-w-3xl mb-16" data-sc-in>
            <h2 id="how-title" data-rail-node className="display text-4xl md:text-5xl text-[var(--brand-text)] mb-6">{t.how.title}</h2>
            <p className="text-lg text-[var(--brand-text-2)] leading-relaxed">{t.how.body}</p>
          </div>
          <ol data-sc-in data-sc-stagger="120" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {t.how.steps.map((step, i) => (
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

      {/* Final CTA */}
      <section aria-labelledby="cta-title" className="relative isolate overflow-hidden py-24 md:py-32 bg-atmosphere">
        <BrandNumeral className="-left-8 -bottom-16" />
        <div className="container relative mx-auto px-4 sm:px-6 text-center max-w-3xl">
          <div className="mx-auto mb-8 w-56" data-rail-end><CircuitTrace className="cta-trace w-full" /></div>
          <h2 id="cta-title" className="display text-4xl md:text-6xl text-[var(--brand-text)] mb-6">
            {t.cta.line}<span className="rose-text">{t.cta.accent}</span>
          </h2>
          <p className="text-lg md:text-xl text-[var(--brand-text-2)] mb-10">{t.cta.body}</p>
          <BrandButton href={BOOKING_URL} placement="ai-bottom" size="lg" className="cta-book">
            {content.common.book} <ArrowRight size={18} aria-hidden="true" />
          </BrandButton>
        </div>
      </section>
    </div>
  );
}
