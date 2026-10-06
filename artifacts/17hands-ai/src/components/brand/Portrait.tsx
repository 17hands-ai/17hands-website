import { useState } from "react";

/** Founder portrait. Falls back to a monogram until /portrait.jpg exists. */
export function Portrait({ className = "" }: { className?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className={`relative overflow-hidden rounded-[28px_6px_28px_6px] bg-[var(--brand-secondary)] ring-1 ring-[var(--brand-rose)]/40 ${className}`}
    >
      {failed ? (
        <div className="absolute inset-0 grid place-items-center display text-8xl rose-text" aria-hidden="true">
          A
        </div>
      ) : (
        <img
          src="/portrait.jpg"
          alt="Anastasia, founder of 17hands.ai"
          width={1500}
          height={2000}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      )}
    </div>
  );
}
