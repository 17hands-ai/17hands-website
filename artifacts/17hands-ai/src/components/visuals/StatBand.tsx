import { BrandNumeral } from "@/components/brand/Decor";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { stats, type Stat } from "@/lib/stats";
import { BrandButton } from "@/components/brand/BrandButton";
import { BOOKING_URL } from "@/lib/site";
import { useContent } from "@/i18n";

/**
 * Counts up to `value` the first time it scrolls into view. The server render and the first
 * client render both show the final value, so crawlers and reduced-motion visitors get the number.
 */
export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / 900);
          setShown(Math.round(value * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {shown}
      {suffix}
    </span>
  );
}

/** A share of 100 as a horizontal bar, or the year-over-year series when the stat has one. */
function Meter({ stat }: { stat: Stat }) {
  if (stat.trend) {
    const peak = Math.max(...stat.trend.map((point) => point.value));
    return (
      <div className="flex items-end gap-2 h-16" aria-hidden="true">
        {stat.trend.map((point, i) => (
          <div key={point.label} className="flex-1 font-mono text-[11px] text-[var(--brand-text-2)]">
            <span className="block mb-1">{point.value}%</span>
            <div
              className="meter-rise rounded-t-[3px]"
              style={{
                height: `${Math.round((point.value / peak) * 28)}px`,
                background: i === stat.trend!.length - 1 ? "var(--brand-rose)" : "var(--brand-slate)",
              }}
            />
            <span className="block mt-1">{point.label}</span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="h-16 flex items-end pb-[22px]" aria-hidden="true">
      <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
        <div className="meter-fill h-full rounded-full bg-[var(--brand-rose)]" style={{ width: `${stat.value}%` }} />
      </div>
    </div>
  );
}

export function StatBand() {
  const content = useContent();
  const t = content.home.stats;
  return (
    <section aria-labelledby="why-now-title" className="relative isolate overflow-hidden py-20 md:py-24 bg-[var(--brand-primary)]">
      <BrandNumeral className="-right-8 -bottom-12" />
      <div className="container mx-auto px-4 sm:px-6">
        <div className="reveal max-w-3xl mb-14">
          <p className="eyebrow mb-4">{t.eyebrow}</p>
          <h2 id="why-now-title" className="display text-4xl md:text-5xl text-[var(--brand-text)]">
            {t.title}<span className="rose-text">{t.accent}</span>
          </h2>
        </div>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14">
          {stats.map((stat, i) => (
            <li key={stat.source} className="flex flex-col">
              <Meter stat={stat} />
              <p className="display text-6xl rose-text mt-5 mb-3">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-[var(--brand-text)] leading-snug mb-3">{t.items[i].claim}</p>
              <p className="text-[var(--brand-text-2)] leading-relaxed mb-4">{t.items[i].meaning}</p>
              <a
                href={stat.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto font-mono text-xs text-[var(--brand-text-2)] underline underline-offset-4 decoration-white/25 hover:text-[var(--brand-rose)]"
              >
                {stat.source}
                <span className="sr-only">{content.common.newTab}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="reveal mt-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8 rounded-[var(--radius-card)] bg-atmosphere p-8 md:p-10">
          <div className="max-w-2xl">
            <h3 className="display text-3xl text-[var(--brand-text)] mb-3">{t.urgencyTitle}</h3>
            <p className="text-lg text-[var(--brand-text-2)] leading-relaxed">{t.urgencyBody}</p>
          </div>
          <BrandButton href={BOOKING_URL} placement="urgency" size="lg" className="shrink-0">
            {t.urgencyCta} <ArrowRight size={18} aria-hidden="true" />
          </BrandButton>
        </div>
      </div>
    </section>
  );
}
