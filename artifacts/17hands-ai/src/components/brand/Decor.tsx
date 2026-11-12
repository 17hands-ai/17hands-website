/** Decorative circuit trace in rose gold. Purely visual: hidden from assistive tech. */
export function CircuitTrace({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 24" fill="none" aria-hidden="true" focusable="false" className={className}>
      <g stroke="var(--brand-rose)" strokeWidth="1" strokeLinecap="round">
        <path d="M0 12h70l10-8h40" />
        <path d="M80 12l10 8h50" />
        <path d="M140 20h40l10-8h50" opacity="0.5" />
      </g>
      <g fill="var(--brand-rose)">
        <circle cx="70" cy="12" r="2.5" />
        <circle cx="120" cy="4" r="2" />
        <circle cx="140" cy="20" r="2" />
        <circle cx="236" cy="12" r="2" opacity="0.6" />
      </g>
    </svg>
  );
}

/**
 * Background watermarks: the oversized "17" numeral and the 17hands mark. They sit behind a
 * section's content, so the brand is in frame wherever a visitor screenshots the page.
 * The host section needs `relative isolate overflow-hidden`; `isolate` keeps the negative
 * z-index above the section's own background.
 */
const watermark = "pointer-events-none select-none absolute -z-10";

export function BrandNumeral({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`${watermark} display leading-none text-white/[0.05] ${className}`}
      style={{ fontSize: "clamp(180px, 28vw, 420px)" }}
    >
      17
    </div>
  );
}

/** The logo is the same file the header loads, so this costs no extra request. */
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <img
      src="/logo-rosegold.png"
      alt=""
      aria-hidden="true"
      width={501}
      height={339}
      loading="lazy"
      decoding="async"
      className={`${watermark} brand-mark h-auto w-[clamp(240px,34vw,520px)] max-w-none ${className}`}
    />
  );
}
