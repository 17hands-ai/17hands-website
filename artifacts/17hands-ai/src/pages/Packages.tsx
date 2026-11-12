import type { CSSProperties } from "react";
import { Link } from "wouter";
import { ArrowRight, Check } from "lucide-react";
import { BrandButton } from "@/components/brand/BrandButton";
import { BrandMark, BrandNumeral, CircuitTrace } from "@/components/brand/Decor";
import { BOOKING_URL } from "@/lib/site";
import { ladders, carePlans, programs, priceLabel, usd, type PackageDef } from "@/lib/packages";
import { useContent } from "@/i18n";

/** One step of a ladder. Steps rise left to right on wide screens, so the progression reads at a glance. */
function Step({ def, index, total }: { def: PackageDef; index: number; total: number }) {
  const content = useContent();
  const t = content.packages;
  const item = t.items[def.id];
  const featured = def.featured;
  const muted = featured ? "text-white/85" : "text-[var(--brand-text-2)]";
  return (
    <li
      className={`stair flex flex-col rounded-[var(--radius-card)] p-7 lg:mt-[var(--rise)] ${
        featured
          ? "on-accent bg-[var(--brand-amethyst)] shadow-[0_24px_60px_-28px_rgba(121,40,202,0.9)]"
          : "bg-[var(--brand-surface)]"
      }`}
      style={{ "--rise": `${(total - 1 - index) * 28}px` } as CSSProperties}
    >
      <p className={`font-mono text-xs mb-5 ${featured ? "text-white/85" : "rose-text"}`}>
        {t.step} 0{index + 1}
        {featured && ` · ${t.startHere}`}
      </p>
      <h3 className="font-sans text-xl font-semibold text-[var(--brand-text)] mb-3">{item.name}</h3>
      <p className="mb-4">
        {def.unit !== "flat" && <span className={`text-sm ${muted}`}>{content.price.from} </span>}
        <span className={`display text-4xl ${featured ? "text-white" : "rose-text"}`}>{usd(def.price)}</span>
        {def.unit !== "from" && (
          <span className={`text-sm ${muted}`}> {def.unit === "flat" ? content.price.flat : content.price.perMonth}</span>
        )}
      </p>
      <p className={`leading-relaxed mb-6 ${featured ? "text-white" : "text-[var(--brand-text)]"}`}>{item.fit}</p>
      <ul className="space-y-2.5 mb-2">
        {item.includes.map((line) => (
          <li key={line} className={`flex gap-2.5 text-[15px] leading-snug ${muted}`}>
            <Check size={16} className={`mt-0.5 shrink-0 ${featured ? "text-white" : "text-[var(--brand-rose)]"}`} aria-hidden="true" />
            {line}
          </li>
        ))}
      </ul>
      {def.href && (
        <Link href={def.href} className="mt-auto pt-5 rose-text underline underline-offset-4 hover:text-white">
          {t.seeIncluded}
        </Link>
      )}
    </li>
  );
}

export default function Packages() {
  const content = useContent();
  const t = content.packages;
  const jumps = [
    ...ladders.map((l) => [l.id, t.ladders[l.id].eyebrow] as const),
    ["care", t.hero.care] as const,
    ["programs", t.hero.workshops] as const,
  ];

  return (
    <div className="flex flex-col">
      <section aria-labelledby="packages-title" className="relative isolate overflow-hidden pt-36 pb-16 md:pt-44">
        <BrandNumeral className="-right-6 -bottom-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_0%,rgba(224,167,134,0.16),transparent_70%)]" aria-hidden="true" />
        <div className="container relative mx-auto px-4 sm:px-6 max-w-4xl hero-in">
          <p className="eyebrow mb-6">{t.hero.eyebrow}</p>
          <h1 id="packages-title" className="display text-[2.6rem] leading-[1.05] sm:text-6xl text-[var(--brand-text)] mb-8">
            {t.hero.title}<span className="rose-text">{t.hero.accent}</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--brand-text-2)] leading-relaxed max-w-2xl mb-10">{t.hero.body}</p>
          <nav aria-label={t.hero.navLabel} className="flex flex-wrap gap-2">
            {jumps.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className="min-h-11 inline-flex items-center rounded-[var(--radius-button)] bg-[var(--brand-surface)] px-4 text-sm font-medium text-[var(--brand-text)] hover:bg-[var(--brand-secondary)]"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {ladders.map((ladder, i) => {
        const copy = t.ladders[ladder.id];
        return (
          <section
            key={ladder.id}
            id={ladder.id}
            aria-labelledby={`${ladder.id}-title`}
            className={`py-20 md:py-24 scroll-mt-24 ${i % 2 === 0 ? "border-t border-border" : "bg-[var(--brand-primary)]"}`}
          >
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-3xl mb-12">
                <p className="eyebrow mb-4">{copy.eyebrow}</p>
                <h2 id={`${ladder.id}-title`} className="display text-3xl md:text-5xl text-[var(--brand-text)] mb-5">{copy.title}</h2>
                <p className="text-lg text-[var(--brand-text-2)] leading-relaxed">{copy.intro}</p>
              </div>
              <ol className={`grid sm:grid-cols-2 gap-5 items-stretch ${ladder.steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
                {ladder.steps.map((def, index) => (
                  <Step key={def.id} def={def} index={index} total={ladder.steps.length} />
                ))}
              </ol>
            </div>
          </section>
        );
      })}

      <section id="care" aria-labelledby="care-title" className="relative isolate overflow-hidden py-20 md:py-24 bg-atmosphere scroll-mt-24">
        <BrandMark className="-left-20 top-10" />
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12">
            <p className="eyebrow mb-4">{t.care.eyebrow}</p>
            <h2 id="care-title" className="display text-3xl md:text-5xl text-[var(--brand-text)] mb-5">
              {t.care.title}<span className="rose-text">{t.care.accent}</span>
            </h2>
            <p className="text-lg text-[var(--brand-text-2)] leading-relaxed">{t.care.body}</p>
          </div>

          <ol className="grid md:grid-cols-3 gap-x-10 gap-y-8 mb-16">
            {t.care.loop.map((item, i) => (
              <li key={item.name} className="relative pt-8 border-t border-[var(--brand-rose)]/50">
                <span className="absolute -top-[5px] left-0 h-2.5 w-2.5 rounded-full bg-[var(--brand-rose)]" aria-hidden="true" />
                <p className="font-mono text-sm rose-text mb-2">0{i + 1}</p>
                <h3 className="display text-2xl text-[var(--brand-text)] mb-2">{item.name}</h3>
                <p className="text-[var(--brand-text-2)] leading-relaxed">{item.body}</p>
              </li>
            ))}
          </ol>

          <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
            {carePlans.map((def, index) => (
              <Step key={def.id} def={def} index={index} total={carePlans.length} />
            ))}
          </ol>
          <p className="mt-8 text-sm text-[var(--brand-text-2)]/90 max-w-2xl">{t.care.note}</p>
        </div>
      </section>

      <section id="programs" aria-labelledby="programs-title" className="py-20 md:py-24 scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
          <div>
            <p className="eyebrow mb-4">{t.programs.eyebrow}</p>
            <h2 id="programs-title" className="display text-3xl md:text-5xl text-[var(--brand-text)] mb-5">
              {t.programs.title}<span className="rose-text">{t.programs.accent}</span>
            </h2>
            <p className="text-lg text-[var(--brand-text-2)] leading-relaxed">{t.programs.body}</p>
          </div>
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {programs.map((p) => {
              const copy = t.programs.items[p.id];
              return (
                <li key={p.id} className="py-6 grid sm:grid-cols-[1fr_auto] gap-x-8 gap-y-1">
                  <h3 className="font-sans text-xl font-semibold text-[var(--brand-text)]">
                    {p.href ? (
                      <Link href={p.href} className="hover:text-[var(--brand-rose)] underline underline-offset-4 decoration-white/25">
                        {copy.name}
                      </Link>
                    ) : (
                      copy.name
                    )}
                  </h3>
                  <p className="font-mono text-sm rose-text sm:text-right sm:pt-1.5">
                    {p.price ? priceLabel({ price: p.price, unit: "from" }, content.price) : copy.priceNote}
                  </p>
                  <p className="text-[var(--brand-text-2)] leading-relaxed sm:col-span-2 max-w-xl">{copy.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="terms-title" className="relative isolate overflow-hidden py-20 md:py-24 bg-[var(--brand-primary)]">
        <BrandNumeral className="-right-8 -bottom-14" />
        <div className="container mx-auto px-4 sm:px-6">
          <h2 id="terms-title" className="display text-3xl md:text-4xl text-[var(--brand-text)] mb-12 max-w-2xl">{t.terms.title}</h2>
          <ul className="grid md:grid-cols-3 gap-x-12 gap-y-10">
            {t.terms.items.map((item) => (
              <li key={item.name}>
                <h3 className="font-sans text-xl font-semibold text-[var(--brand-text)] mb-2">{item.name}</h3>
                <p className="text-[var(--brand-text-2)] leading-relaxed">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-12 text-sm text-[var(--brand-text-2)]/90 max-w-2xl">{t.terms.note}</p>
        </div>
      </section>

      <section aria-labelledby="packages-cta" className="py-24 text-center">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
          <CircuitTrace className="mx-auto mb-8 w-56" />
          <h2 id="packages-cta" className="display text-3xl md:text-5xl text-[var(--brand-text)] mb-6">{t.cta.title}</h2>
          <p className="text-lg text-[var(--brand-text-2)] mb-10">{t.cta.body}</p>
          <BrandButton href={BOOKING_URL} placement="packages-bottom" size="lg">
            {content.common.book} <ArrowRight size={18} aria-hidden="true" />
          </BrandButton>
        </div>
      </section>
    </div>
  );
}
