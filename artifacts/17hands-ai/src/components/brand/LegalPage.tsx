import type { ReactNode } from "react";

/** Shared layout for long-form legal pages: readable measure, real headings, effective date up top. */
export function LegalPage({ title, effective, children }: { title: string; effective: string; children: ReactNode }) {
  return (
    <div className="pt-36 pb-24 md:pt-44">
      <article className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <p className="eyebrow mb-6">Legal</p>
        <h1 className="display text-4xl md:text-5xl text-[var(--brand-text)] mb-4">{title}</h1>
        <p className="text-[var(--brand-text-2)] mb-12">Effective date: {effective}</p>
        <div className="legal space-y-5 text-lg leading-relaxed text-[var(--brand-text-2)]">{children}</div>
      </article>
    </div>
  );
}
