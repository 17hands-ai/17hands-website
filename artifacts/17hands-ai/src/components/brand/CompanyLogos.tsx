import { useContent } from "@/i18n";

/**
 * Past employers and consulting clients, shown as one muted colour so they read as a résumé
 * line, not as partners or endorsements. Each entry renders `src` when an official single-colour
 * SVG is in public/logos/, otherwise a typeset wordmark.
 */
interface Company {
  name: string;
  src?: string;
  /** Wordmark styling when there is no SVG yet. */
  style?: React.CSSProperties;
}

const builtAt: Company[] = [
  { name: "UnitedHealthcare", style: { fontWeight: 700, letterSpacing: "-0.01em" } },
  { name: "Zillow", style: { fontWeight: 700, letterSpacing: "-0.02em" } },
  { name: "Trulia", style: { fontWeight: 700, letterSpacing: "0.01em" } },
];

const shippedFor: Company[] = [
  { name: "MLB", style: { fontWeight: 800, letterSpacing: "0.06em" } },
  { name: "MasterClass", style: { fontWeight: 600, letterSpacing: "0.02em" } },
];

function Row({ label, items }: { label: string; items: Company[] }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
      <p className="w-40 shrink-0 font-mono text-xs uppercase tracking-[0.14em] text-[var(--brand-text-2)]">{label}</p>
      <ul className="flex flex-wrap items-center gap-x-9 gap-y-3">
        {items.map((c) => (
          <li key={c.name} className="text-[var(--brand-text-2)] opacity-80">
            {c.src ? (
              <img src={c.src} alt={c.name} className="h-6 w-auto" loading="lazy" />
            ) : (
              <span className="font-sans text-xl" style={c.style}>{c.name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CompanyLogos({ className = "" }: { className?: string }) {
  const t = useContent().home.about;
  return (
    <div className={`space-y-5 ${className}`}>
      <Row label={t.builtAt} items={builtAt} />
      <Row label={t.shippedFor} items={shippedFor} />
    </div>
  );
}
