import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useContent } from "@/i18n";
import { work } from "@/lib/work";
import { PhoneFrame, Shot } from "./Devices";

/**
 * The home page's signature move: one phone, every client. The section is a pinned scroll-craft
 * act; as the reader scrolls, each live page slides up over the last inside the same phone,
 * and the caption list follows. The screen swap is pure CSS driven by the engine's --sc-p
 * (see .work-layer in index.css); this component only tracks which caption is active.
 *
 * Before the engine runs (prerendered HTML, crawlers, no JS) this is a plain list of links
 * beside the first screenshot, so nothing depends on the animation.
 */
export function LiveWork() {
  const content = useContent();
  const t = content.home.work;
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const last = work.length - 1;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let visible = false;
    const tick = () => {
      const p = parseFloat(el.style.getPropertyValue("--sc-p")) || 0;
      const i = Math.min(last, Math.max(0, Math.round(p * last)));
      setActive((prev) => (prev === i ? prev : i));
      if (visible) raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      visible = false;
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [last]);

  return (
    <section
      id="work"
      ref={ref}
      data-sc-act="pin"
      data-sc-span="4.5"
      aria-labelledby="work-title"
      className="work-act relative border-t border-border scroll-mt-0"
      style={{ "--last": last } as React.CSSProperties}
    >
      <div data-sc-stage className="work-stage">
        <div className="container mx-auto grid h-full items-center gap-6 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-0">
          <div className="work-copy">
            <p className="eyebrow mb-4">{t.eyebrow}</p>
            <h2 id="work-title" className="display text-3xl md:text-5xl text-[var(--brand-text)] mb-4">{t.title}</h2>
            <p className="work-intro text-lg text-[var(--brand-text-2)] mb-8 max-w-md">{t.body}</p>
            <ol className="work-list space-y-1">
              {work.map((w, i) => {
                const copy = t.items[w.id];
                const on = i === active;
                return (
                  <li key={w.id} className="work-item" data-active={on ? "" : undefined}>
                    <a
                      href={w.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-baseline gap-3 py-2"
                    >
                      <span className="work-dot mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-rose)]" aria-hidden="true" />
                      <span>
                        <span className="block font-sans text-lg font-semibold text-[var(--brand-text)] group-hover:text-[var(--brand-rose)]">
                          {copy.name}
                        </span>
                        <span className="block font-mono text-xs uppercase tracking-[0.12em] text-[var(--brand-text-2)]">{copy.kind}</span>
                      </span>
                      <span className="sr-only">{content.common.newTab}</span>
                    </a>
                    <div className="work-detail pl-[1.125rem]">
                      <div className="overflow-hidden">
                        <p className="text-[var(--brand-text-2)] leading-relaxed max-w-md pt-1">{copy.body}</p>
                        <a
                          href={w.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          tabIndex={on ? undefined : -1}
                          className="mt-3 mb-2 inline-flex items-center gap-1.5 rose-text underline underline-offset-4 hover:text-[var(--brand-text)]"
                        >
                          {t.visit} <ArrowUpRight size={16} aria-hidden="true" />
                          <span className="sr-only">: {copy.name}</span>
                        </a>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="work-phone-wrap flex justify-center lg:justify-end">
            <PhoneFrame className="work-phone">
              {work.map((w, i) => (
                <div
                  key={w.id}
                  className="work-layer absolute inset-0"
                  style={{ "--i": i } as React.CSSProperties}
                  aria-hidden={i === active ? undefined : true}
                >
                  <Shot src={w.phone} alt={`${t.items[w.id].name}: ${t.items[w.id].kind}`} />
                </div>
              ))}
            </PhoneFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
