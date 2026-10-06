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

/** Oversized "17" brand numeral used as a background watermark. */
export function BrandNumeral({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none display leading-none text-white/[0.035] ${className}`}
      style={{ fontSize: "clamp(180px, 28vw, 420px)" }}
    >
      17
    </div>
  );
}
