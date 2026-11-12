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
 * Background watermarks. Two marks, one job each, so they never compete:
 *
 * - BrandNumeral, the oversized "17", opens and closes a page: it bleeds off the edge of the
 *   page hero and of the closing call to action, and appears nowhere in between.
 * - BrandMark, the logo, sits whole in the empty space to the right of a section heading.
 *   Put it first inside the section's `container relative` so it lines up with the heading.
 *   Below `lg` a heading runs the full width, so the mark shrinks and moves up level with
 *   the eyebrow line, clear of the heading text.
 *
 * Placement rules: only on sections with open space (never behind cards, panels, forms or
 * diagrams), never cropped mid-shape by a section edge, and never in two sections in a row,
 * so one screen shows at most one mark. The host section needs `relative isolate`; `isolate`
 * keeps the negative z-index above the section's own background.
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
export function BrandMark() {
  return (
    <img
      src="/logo-rosegold.png"
      alt=""
      aria-hidden="true"
      width={501}
      height={339}
      loading="lazy"
      decoding="async"
      className={`${watermark} brand-mark right-4 sm:right-6 -top-10 w-24 h-auto lg:top-0 lg:w-[clamp(180px,20vw,260px)]`}
    />
  );
}
