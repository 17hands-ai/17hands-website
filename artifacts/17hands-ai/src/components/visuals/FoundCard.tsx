import { Search, FileText } from "lucide-react";
import { SITE_ORIGIN, pages } from "@/lib/pages";
import { useContent } from "@/i18n";

const home = pages.find((p) => p.path === "/")!;

/**
 * "Be found", shown with this site's own real output: how Google lists the home page (its actual
 * title and description from pages.ts) and the opening lines of the llms.txt that AI assistants read.
 */
export function FoundCard({ className = "" }: { className?: string }) {
  const t = useContent().home.offers.found;
  return (
    <div className={`relative w-full max-w-[540px] ${className}`}>
      <div className="found-card rounded-2xl p-5 md:p-6">
        <p className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--brand-text-2)]">
          <Search size={14} aria-hidden="true" /> {t.search}
        </p>
        <p className="text-sm text-[var(--brand-text-2)]">{SITE_ORIGIN.replace("https://", "")}</p>
        <p className="mt-1 text-xl leading-snug text-[#9db8ff]">{home.title}</p>
        <p className="mt-2 text-[15px] leading-relaxed text-[var(--brand-text-2)]">{home.description}</p>
      </div>
      <div className="found-card found-code relative -mt-4 ml-8 rounded-2xl p-5 md:ml-14 md:p-6">
        <p className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--brand-text-2)]">
          <FileText size={14} aria-hidden="true" /> {t.ai} · llms.txt
        </p>
        <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-[var(--brand-text)]">
          <span className="rose-text"># 17hands.ai</span>
          {"\n"}
          <span className="text-[var(--brand-text-2)]">{"> "}{home.description}</span>
          {"\n\n"}
          <span className="rose-text">## Pages</span>
          {"\n"}- /websites{"\n"}- /bio-pages{"\n"}- /ai-automation
        </pre>
      </div>
    </div>
  );
}
