/** Founder portrait, toned into the brand palette with a glow, plum fade and offset frame. */
export function Portrait({ className = "" }: { className?: string }) {
  return (
    <div className={`relative isolate ${className}`}>
      {/* Glow behind the photo */}
      <div
        aria-hidden="true"
        className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(121,40,202,0.55),transparent_60%),radial-gradient(circle_at_75%_80%,rgba(224,167,134,0.35),transparent_55%)] blur-2xl"
      />
      {/* Offset rose-gold frame */}
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-4 translate-y-4 rounded-[28px_6px_28px_6px] border border-[var(--brand-rose)]/60"
      />
      <div className="relative h-full w-full overflow-hidden rounded-[28px_6px_28px_6px] bg-[var(--brand-secondary)] ring-1 ring-white/10">
        <img
          src="/portrait.jpg"
          alt="Anastasia, founder of 17hands.ai"
          width={900}
          height={1200}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-top saturate-[0.9]"
        />
        {/* Brand tint: amethyst wash up top, plum fade into the section below */}
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(160deg,rgba(121,40,202,0.38)_0%,transparent_50%)] mix-blend-soft-light" />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(19,9,30,0.75)_100%)]" />
      </div>
    </div>
  );
}
