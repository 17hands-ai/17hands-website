/** Founder portrait with a brand glow, soft plum fade and offset rose-gold frame. */
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
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        {/* The photo is already shot on a brand-purple backdrop; just fade the base into the section. */}
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_65%,rgba(19,9,30,0.55)_100%)]" />
      </div>
    </div>
  );
}
