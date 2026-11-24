import { useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, Check } from "lucide-react";
import { BrandButton } from "@/components/brand/BrandButton";
import { BrandNumeral, CircuitTrace } from "@/components/brand/Decor";
import { Portrait } from "@/components/brand/Portrait";
import { LinkedInLink } from "@/components/brand/LinkedInLink";
import { CompanyLogos } from "@/components/brand/CompanyLogos";
import { BrowserFrame, PhoneFrame, Shot } from "@/components/visuals/Devices";
import { ScamText } from "@/components/visuals/ScamText";
import { LiveWork } from "@/components/visuals/LiveWork";
import { FoundCard } from "@/components/visuals/FoundCard";
import { HeroFlow } from "@/components/visuals/HeroFlow";
import { TypeSwap } from "@/components/visuals/TypeSwap";
import { HeroIntro } from "@/components/visuals/HeroIntro";
import { InstagramTips } from "@/components/brand/InstagramTips";
import { BOOKING_URL, HOME_FAQ_COUNT, LINKEDIN_PROFILE_URL } from "@/lib/site";
import { packageDef, priceLabel, type PackageId } from "@/lib/packages";
import { workById } from "@/lib/work";
import { testimonials } from "@/lib/testimonials";
import { fillPrices, useContent, useI18n } from "@/i18n";
import { CircuitRail } from "@/components/visuals/CircuitRail";
import { useScrollCraft } from "@/hooks/use-scrollcraft";

/** Per offer, in the order of `home.offers.items`: where it leads. */
const offerMeta = ["/websites", "/bio-pages", "/ai-automation", "/workshops"] as const;

/** Starting prices, in the order of `home.start.items`. */
const startPrices: PackageId[] = ["bio-page", "starter-site", "team-workshop"];

function OfferVisual({ index }: { index: number }) {
  const content = useContent();
  if (index === 0) return <FoundCard />;
  if (index === 1) {
    const w = workById("anastasia");
    return (
      <PhoneFrame className="w-[min(62vw,260px)]">
        <Shot src={w.phone} alt={`${content.home.work.items.anastasia.name}: ${content.home.work.items.anastasia.kind}`} />
      </PhoneFrame>
    );
  }
  if (index === 2) return <HeroFlow className="w-full max-w-[460px]" />;
  return <ScamText size="lg" className="w-full max-w-[440px]" />;
}

export default function Home() {
  const content = useContent();
  const { locale } = useI18n();
  const t = content.home;
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollCraft(rootRef, locale);
  const stuniverse = workById("stuniverse");
  const karla = workById("karla");

  return (
    <div ref={rootRef} className="relative flex flex-col">
      <CircuitRail rootRef={rootRef} />
      {/* Hero. Planes far to near: glow, website, bio page, scam text. Positive rates trail the scroll. */}
      <section aria-labelledby="hero-title" data-sc-act="flow" className="relative isolate overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute -inset-y-24 inset-x-0 -z-10" data-sc-parallax="1.2" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_72%_30%,rgba(121,40,202,0.32),transparent_70%)]" />
        </div>
        <div className="absolute inset-0 -z-10" data-sc-parallax="2" aria-hidden="true">
          <BrandNumeral className="-left-6 bottom-0 hidden md:block" />
        </div>

        <div data-rail-content className="container relative mx-auto px-4 sm:px-6 grid lg:grid-cols-[1.05fr_1fr] gap-14 lg:gap-10 items-center">
          <div data-sc-parallax="-0.35">
            <div className="hero-in">
              <p className="eyebrow mb-6">{t.hero.eyebrow}</p>
              <h1 id="hero-title" data-rail-node className="display text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-[4.25rem] text-[var(--brand-text)] mb-5">
                {t.hero.headline}
              </h1>
              <p className="display text-[2rem] leading-tight sm:text-5xl rose-text mb-8">
                <TypeSwap phrases={t.hero.rotate} />
              </p>
              <p className="text-lg md:text-xl text-[var(--brand-text-2)] leading-relaxed max-w-xl mb-10">{t.hero.body}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <BrandButton href={BOOKING_URL} placement="hero" size="lg">
                  {content.common.book} <ArrowRight size={18} aria-hidden="true" />
                </BrandButton>
                <BrandButton href="#work" variant="secondary" size="lg">
                  {t.hero.work}
                </BrandButton>
              </div>
            </div>
          </div>

          <div className="hero-in" style={{ animationDelay: "0.2s" }}>
            <div className="hero-visual relative mx-auto aspect-[1/0.92] w-full max-w-[560px]" role="img" aria-label={t.hero.visualLabel}>
              <div className="hero-collage absolute inset-0" aria-hidden="true">
                <div className="absolute right-0 top-[4%] w-[88%]" data-sc-parallax="0.45">
                  <div className="hero-tilt-back">
                    <BrowserFrame url="thestuniverse.com">
                      <Shot src={stuniverse.desktop!} alt="" eager />
                    </BrowserFrame>
                  </div>
                </div>
                <div className="absolute left-[2%] bottom-0 w-[36%]" data-sc-parallax="-0.25">
                  <div className="hero-tilt-front">
                    <PhoneFrame>
                      <Shot src={karla.phone} alt="" eager />
                    </PhoneFrame>
                  </div>
                </div>
                <div className="absolute right-[-2%] bottom-[6%] w-[56%] sm:w-[50%]" data-sc-parallax="-0.7">
                  <ScamText className="hero-scam" />
                </div>
              </div>
              <HeroIntro />
            </div>
          </div>
        </div>
      </section>

      {/* Three offers. Each row owns its visual; the anchor alternates so no two rows read alike. */}
      <section id="services" aria-labelledby="offers-title" data-sc-act="flow" className="relative border-t border-border scroll-mt-20">
        <h2 id="offers-title" className="sr-only">{t.offers.title}</h2>
        {t.offers.items.map((offer, i) => {
          const href = offerMeta[i];
          const flip = i % 2 === 1;
          return (
            <article key={href} className={`relative isolate py-20 md:py-28 ${flip ? "bg-[var(--brand-primary)]" : ""}`}>
              <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className={flip ? "lg:order-2" : ""} data-sc-in>
                  <p className="font-mono text-xs uppercase tracking-[0.16em] rose-text mb-4">{offer.kicker}</p>
                  <h3 data-rail-node className="display text-5xl md:text-6xl text-[var(--brand-text)] mb-6">{offer.title}</h3>
                  <p className="text-lg md:text-xl text-[var(--brand-text-2)] leading-relaxed max-w-xl mb-8">{offer.body}</p>
                  <ul className="space-y-3 mb-9">
                    {offer.points.map((point) => (
                      <li key={point} className="flex gap-3 text-[var(--brand-text)]">
                        <Check size={20} className="mt-0.5 shrink-0 text-[var(--brand-rose)]" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Link href={href} className="inline-flex items-center gap-2 font-semibold rose-text underline underline-offset-4 hover:text-[var(--brand-text)]">
                    {offer.link} <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
                <div className={`flex justify-center ${flip ? "lg:order-1 lg:justify-start" : "lg:justify-end"}`} data-sc-in>
                  <OfferVisual index={i} />
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <LiveWork />

      {testimonials.length > 0 && (
        <section aria-labelledby="testimonials-title" className="py-24 md:py-28 border-t border-border">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 id="testimonials-title" className="display text-4xl md:text-5xl text-[var(--brand-text)] mb-12">{t.testimonials.title}</h2>
            <ul data-sc-in data-sc-stagger="100" className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((q) => (
                <li key={q.name}>
                  <figure>
                    <blockquote className="text-xl leading-relaxed text-[var(--brand-text)]">“{q.quote}”</blockquote>
                    <figcaption className="mt-5 flex items-center gap-3">
                      {q.photo && <img src={q.photo} alt="" width={44} height={44} loading="lazy" className="h-11 w-11 rounded-full object-cover" />}
                      <span>
                        <span className="block font-semibold text-[var(--brand-text)]">{q.name}</span>
                        <span className="block text-sm text-[var(--brand-text-2)]">{q.role}</span>
                      </span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Prices come after the work, never above it. */}
      <section id="start" aria-labelledby="start-title" className="py-24 md:py-28 border-t border-border bg-[var(--brand-primary)] scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
          <div data-sc-in>
            <h2 id="start-title" data-rail-node className="display text-4xl md:text-5xl text-[var(--brand-text)] mb-5">{t.start.title}</h2>
            <p className="text-lg text-[var(--brand-text-2)] leading-relaxed max-w-md mb-6">{t.start.body}</p>
            <Link href="/packages" className="inline-flex items-center gap-2 rose-text underline underline-offset-4 hover:text-[var(--brand-text)]">
              {t.start.all} <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <ul data-sc-in data-sc-stagger="90" className="divide-y divide-white/10 border-y border-white/10">
            {t.start.items.map((item, i) => (
              <li key={item.name} className="flex flex-col gap-1 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <div>
                  <h3 className="font-sans text-xl font-semibold text-[var(--brand-text)]">{item.name}</h3>
                  <p className="text-[var(--brand-text-2)] mt-1">{item.note}</p>
                </div>
                <p className="display text-2xl rose-text whitespace-nowrap">{priceLabel(packageDef(startPrices[i]), content.price)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* About, then the companies behind the experience. */}
      <section id="about" aria-labelledby="about-title" data-sc-act="flow" className="overflow-x-clip py-24 md:py-28 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 grid md:grid-cols-[minmax(0,320px)_1fr] gap-12 lg:gap-20 items-center">
          <div data-sc-parallax="-0.6"><Portrait className="aspect-[3/4] w-full max-w-[320px]" /></div>
          <div data-sc-in>
            <p className="eyebrow mb-4">{t.about.eyebrow}</p>
            <h2 id="about-title" data-rail-node className="display text-4xl md:text-5xl text-[var(--brand-text)] mb-3">{t.about.title}</h2>
            <p className="rose-text font-medium mb-7">{t.about.role}</p>
            <div className="space-y-5 text-lg text-[var(--brand-text-2)] leading-relaxed max-w-2xl">
              {t.about.paragraphs.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
            </div>
            <dl className="mt-9 grid grid-cols-2 lg:grid-cols-4 gap-y-6 border-y border-white/10 py-6 max-w-2xl">
              {t.about.facts.map(([value, label]) => (
                <div key={value} className="pr-4">
                  <dt className="sr-only">{label}</dt>
                  <dd className="display text-2xl rose-text">{value}</dd>
                  <dd className="text-sm text-[var(--brand-text-2)] mt-1">{label}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link href="/about" className="inline-flex items-center gap-2 font-semibold rose-text underline underline-offset-4 hover:text-[var(--brand-text)]">
                {t.about.more} <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <LinkedInLink href={LINKEDIN_PROFILE_URL} label={t.about.linkedin} />
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 mt-16 pt-10 border-t border-white/10" data-sc-in>
          <CompanyLogos />
        </div>
      </section>

      <section aria-labelledby="faq-title" className="py-24 md:py-28 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-[1fr_1.6fr] gap-12">
          <div>
            <h2 id="faq-title" data-rail-node className="display text-4xl md:text-5xl text-[var(--brand-text)] mb-6">{t.faq.title}</h2>
            <Link href="/faq" className="rose-text underline underline-offset-4 hover:text-[var(--brand-text)]">{t.faq.all}</Link>
          </div>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {content.faqs.slice(0, HOME_FAQ_COUNT).map((f) => (
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

      <InstagramTips />

      {/* Close: the three promises return as one line, then one action. */}
      <section aria-labelledby="cta-title" className="relative isolate overflow-hidden py-24 md:py-32 bg-atmosphere">
        <BrandNumeral className="-right-8 -bottom-16" />
        <div className="container relative mx-auto px-4 sm:px-6 text-center max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--brand-text-2)] mb-6">{t.hero.rotate.join("  ")}</p>
          <div className="mx-auto mb-8 w-56" data-rail-end><CircuitTrace className="cta-trace w-full" /></div>
          <h2 id="cta-title" className="display text-4xl md:text-6xl text-[var(--brand-text)] mb-6">
            {t.cta.line}<span className="rose-text">{t.cta.accent}</span>
          </h2>
          <p className="text-lg md:text-xl text-[var(--brand-text-2)] mb-10">{t.cta.body}</p>
          <BrandButton href={BOOKING_URL} placement="home-bottom" size="lg" className="cta-book">
            {content.common.book} <ArrowRight size={18} aria-hidden="true" />
          </BrandButton>
        </div>
      </section>
    </div>
  );
}
