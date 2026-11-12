import { Link } from "wouter";
import {
  ArrowRight, GraduationCap, KeyRound, MonitorSmartphone, Presentation, ScanSearch, ScrollText, Search, Workflow,
  type LucideIcon,
} from "lucide-react";
import { BrandButton } from "@/components/brand/BrandButton";
import { BrandNumeral, CircuitTrace } from "@/components/brand/Decor";
import { Portrait } from "@/components/brand/Portrait";
import { BOOKING_URL, LINKEDIN_PROFILE_URL } from "@/lib/site";
import { LinkedInLink } from "@/components/brand/LinkedInLink";
import { packageDef, priceLabel, type PackageId } from "@/lib/packages";
import { fillPrices, useContent } from "@/i18n";
import { HeroFlow } from "@/components/visuals/HeroFlow";
import { HeroIntro } from "@/components/visuals/HeroIntro";
import { StatBand } from "@/components/visuals/StatBand";
import { RoiEstimator } from "@/components/visuals/RoiEstimator";

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

export default function Home() {
  const content = useContent();
  const t = content.home;

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_0%,rgba(121,40,202,0.28),transparent_70%)]" aria-hidden="true" />
        <BrandNumeral className="absolute -right-6 bottom-0 hidden md:block" />

        <div className="container relative mx-auto px-4 sm:px-6 grid lg:grid-cols-[1.25fr_1fr] gap-16 items-center">
          <div className="hero-in">
            <p className="eyebrow mb-6">{t.hero.eyebrow}</p>
            <h1 id="hero-title" className="display text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl text-[var(--brand-text)] mb-8">
              {t.hero.line1}<span className="rose-text">{t.hero.accent1}</span>
              <br />
              {t.hero.line2}<span className="rose-text">{t.hero.accent2}</span>
            </h1>
            <p className="text-lg md:text-xl text-[var(--brand-text-2)] leading-relaxed max-w-2xl mb-10">{t.hero.body}</p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <BrandButton href={BOOKING_URL} placement="hero" size="lg">
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
          </div>

          <div className="hero-in" style={{ animationDelay: "0.15s" }}>
            <div className="hero-visual relative w-full max-w-[460px] mx-auto lg:ml-auto lg:mr-0">
              <HeroFlow className="w-full" />
              <HeroIntro />
            </div>
          </div>
        </div>
      </section>

      <StatBand />

      <section id="products" className="py-20 md:py-24 border-t border-border scroll-mt-24" aria-labelledby="products-title">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 id="products-title" className="display text-4xl md:text-5xl mb-12">{t.products.title}</h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 lg:gap-20">
            <div>
              <h3 className="display text-3xl rose-text mb-4">{t.products.ddTitle}</h3>
              <p className="text-lg text-[var(--brand-text-2)] leading-relaxed mb-6">{t.products.ddBody}</p>
              <BrandButton href="/digital-defenders" size="lg">{t.products.ddCta} <ArrowRight size={18} aria-hidden="true" /></BrandButton>
            </div>
            <div>
              <h3 className="display text-3xl rose-text mb-4">{t.products.naturalTitle}</h3>
              <p className="text-lg text-[var(--brand-text-2)] leading-relaxed mb-6">{t.products.naturalBody}</p>
              <BrandButton href="/natural" variant="secondary" size="lg">{t.products.naturalCta}</BrandButton>
            </div>
          </div>
        </div>
      </section>

      {/* Recognizable problems */}
      <section aria-labelledby="familiar-title" className="py-24 md:py-28 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="reveal max-w-3xl mb-14">
            <p className="eyebrow mb-4">{t.familiar.eyebrow}</p>
            <h2 id="familiar-title" className="display text-4xl md:text-5xl text-[var(--brand-text)]">{t.familiar.title}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            {([
              [t.familiar.protectTitle, t.familiar.protect],
              [t.familiar.simplifyTitle, t.familiar.simplify],
            ] as const).map(([heading, items]) => (
              <div key={heading} className="reveal">
                <h3 className="display text-2xl rose-text mb-6">{heading}</h3>
                <ul className="space-y-5">
                  {items.map((item) => (
                    <li key={item} className="flex gap-4 text-lg text-[var(--brand-text-2)] leading-relaxed">
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-rose)]" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="reveal mt-14 max-w-2xl text-lg text-[var(--brand-text)]">{t.familiar.closing}</p>
        </div>
      </section>

      {/* Services: two pillars */}
      <section id="services" aria-labelledby="services-title" className="scroll-mt-24">
        <h2 id="services-title" className="sr-only">{t.servicesTitle}</h2>
        {t.pillars.map((pillar, i) => {
          const meta = pillarMeta[i];
          return (
            <div key={meta.id} className={i === 0 ? "bg-atmosphere py-24 md:py-28" : "py-24 md:py-28"}>
              <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20">
                <div className="reveal lg:sticky lg:top-32 self-start">
                  <p className="eyebrow mb-4">
                    <span className="font-mono">0{i + 1}</span> · {pillar.eyebrow}
                  </p>
                  <h3 className="display text-3xl md:text-4xl text-[var(--brand-text)] mb-6">{pillar.title}</h3>
                  <p className="text-lg text-[var(--brand-text-2)] leading-relaxed">{pillar.intro}</p>
                </div>
                <div>
                  <ul className="divide-y divide-white/10 border-y border-white/10">
                    {pillar.services.map((s, j) => {
                      const { icon: Icon, price } = meta.services[j];
                      return (
                        <li key={s.name} className="reveal py-7 flex gap-5">
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
      <section id="delivery" aria-labelledby="delivery-title" className="py-24 md:py-28 bg-[var(--brand-primary)] scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="reveal max-w-4xl mb-14">
            <p className="eyebrow mb-4">{t.delivery.eyebrow}</p>
            <h2 id="delivery-title" className="display text-4xl md:text-5xl text-[var(--brand-text)] mb-6">
              {t.delivery.title}<span className="rose-text">{t.delivery.accent}</span>
            </h2>
            <p className="text-lg text-[var(--brand-text-2)] leading-relaxed max-w-2xl">{t.delivery.body}</p>
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10 mb-12">
            {t.delivery.points.map((p, i) => (
              <li key={p.name} className="reveal relative pt-8 border-t border-[var(--brand-rose)]/50">
                <span className="absolute -top-[5px] left-0 h-2.5 w-2.5 rounded-full bg-[var(--brand-rose)]" aria-hidden="true" />
                <p className="font-mono text-sm rose-text mb-3">0{i + 1}</p>
                <h3 className="font-sans text-xl font-semibold text-[var(--brand-text)] mb-2">{p.name}</h3>
                <p className="text-[var(--brand-text-2)] leading-relaxed">{p.body}</p>
              </li>
            ))}
          </ul>
          <BrandButton href={BOOKING_URL} placement="delivery" size="lg">
            {t.delivery.cta} <ArrowRight size={18} aria-hidden="true" />
          </BrandButton>
        </div>
      </section>

      <RoiEstimator />

      {/* How it works */}
      <section id="how-it-works" aria-labelledby="how-title" className="py-24 md:py-28 border-t border-border scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="reveal max-w-3xl mb-16">
            <p className="eyebrow mb-4">{t.how.eyebrow}</p>
            <h2 id="how-title" className="display text-4xl md:text-5xl text-[var(--brand-text)] mb-6">{t.how.title}</h2>
            <p className="text-lg text-[var(--brand-text-2)] leading-relaxed">{t.how.body}</p>
          </div>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {t.how.steps.map((step, i) => (
              <li key={step.name} className="reveal relative pt-8 border-t border-[var(--brand-rose)]/50">
                <span className="absolute -top-[5px] left-0 h-2.5 w-2.5 rounded-full bg-[var(--brand-rose)]" aria-hidden="true" />
                <p className="font-mono text-sm rose-text mb-3">0{i + 1}</p>
                <h3 className="display text-2xl text-[var(--brand-text)] mb-3">{step.name}</h3>
                <p className="text-[var(--brand-text-2)] leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* About */}
      <section id="about" aria-labelledby="about-title" className="py-24 md:py-28 bg-[var(--brand-primary)] scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 grid md:grid-cols-[minmax(0,360px)_1fr] gap-12 lg:gap-20 items-center">
          <Portrait className="reveal aspect-[3/4] w-full max-w-[360px]" />
          <div className="reveal">
            <p className="eyebrow mb-4">{t.about.eyebrow}</p>
            <h2 id="about-title" className="display text-4xl md:text-5xl text-[var(--brand-text)] mb-3">{t.about.title}</h2>
            <p className="rose-text font-medium mb-8">{t.about.role}</p>
            <div className="space-y-5 text-lg text-[var(--brand-text-2)] leading-relaxed max-w-2xl">
              {t.about.paragraphs.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
            </div>

            <dl className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-y-6 border-y border-white/10 py-6 max-w-2xl">
              {t.about.facts.map(([value, label]) => (
                <div key={value} className="pr-4">
                  <dt className="sr-only">{label}</dt>
                  <dd className="display text-2xl rose-text">{value}</dd>
                  <dd className="text-sm text-[var(--brand-text-2)] mt-1">{label}</dd>
                </div>
              ))}
            </dl>

            <LinkedInLink href={LINKEDIN_PROFILE_URL} label={t.about.linkedin} className="mt-8" />
          </div>
        </div>
      </section>

      {/* Individuals */}
      <section aria-labelledby="individuals-title" className="py-20 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="reveal flex flex-col md:flex-row md:items-center justify-between gap-8 rounded-[var(--radius-card)] bg-[var(--brand-surface)] ring-1 ring-white/10 p-8 md:p-12">
            <div className="max-w-2xl">
              <p className="eyebrow mb-3">{t.individuals.eyebrow}</p>
              <h2 id="individuals-title" className="display text-3xl text-[var(--brand-text)] mb-3">{t.individuals.title}</h2>
              <p className="text-[var(--brand-text-2)] text-lg">{t.individuals.body}</p>
            </div>
            <BrandButton href="/for-you" variant="secondary" size="lg" className="shrink-0">
              {t.individuals.cta} <ArrowRight size={18} aria-hidden="true" />
            </BrandButton>
          </div>
        </div>
      </section>

      {/* FAQ preview */}
      <section aria-labelledby="faq-title" className="py-24 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-[1fr_1.6fr] gap-12">
          <div className="reveal">
            <p className="eyebrow mb-4">{t.faq.eyebrow}</p>
            <h2 id="faq-title" className="display text-4xl md:text-5xl text-[var(--brand-text)] mb-6">{t.faq.title}</h2>
            <Link href="/faq" className="rose-text underline underline-offset-4 hover:text-white">{t.faq.all}</Link>
          </div>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {content.faqs.slice(0, 5).map((f) => (
              <details key={f.q} className="group py-2">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-semibold text-[var(--brand-text)] [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="rose-text text-2xl leading-none transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="pb-5 pr-10 text-[var(--brand-text-2)] leading-relaxed">{fillPrices(f.a, content)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section aria-labelledby="cta-title" className="relative overflow-hidden py-24 md:py-32 bg-atmosphere">
        <BrandNumeral className="absolute -left-8 -bottom-16" />
        <div className="container relative mx-auto px-4 sm:px-6 text-center max-w-3xl">
          <CircuitTrace className="mx-auto mb-8 w-56" />
          <h2 id="cta-title" className="reveal display text-4xl md:text-6xl text-[var(--brand-text)] mb-6">
            {t.cta.line}<span className="rose-text">{t.cta.accent}</span>
          </h2>
          <p className="reveal text-lg md:text-xl text-[var(--brand-text-2)] mb-10">{t.cta.body}</p>
          <BrandButton href={BOOKING_URL} placement="home-bottom" size="lg">
            {content.common.book} <ArrowRight size={18} aria-hidden="true" />
          </BrandButton>
        </div>
      </section>
    </div>
  );
}
