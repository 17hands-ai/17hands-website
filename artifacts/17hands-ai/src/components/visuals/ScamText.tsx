import { MessageSquare, TriangleAlert } from "lucide-react";
import { useContent } from "@/i18n";

/** The look-alike domain in the sample text. Same in every language, so it can be highlighted. */
const FAKE_DOMAIN = "usps-redeliver.co";

/**
 * A sample scam text of the kind workshop participants learn to spot, with the look-alike link
 * marked. Text, not an image, so it translates and stays sharp.
 */
export function ScamText({ className = "", size = "md" }: { className?: string; size?: "md" | "lg" }) {
  const t = useContent().home.hero;
  const [before, after] = t.scamText.split(FAKE_DOMAIN);
  const big = size === "lg";
  return (
    <div className={`scam-card rounded-2xl ${big ? "p-6 md:p-7" : "p-4"} ${className}`}>
      <div className={`flex items-center gap-2 font-mono uppercase tracking-[0.12em] text-[var(--brand-text-2)] ${big ? "text-xs mb-4" : "text-[10px] mb-2.5"}`}>
        <MessageSquare size={big ? 16 : 13} aria-hidden="true" />
        {t.scamFrom}
      </div>
      <p className={`rounded-2xl rounded-tl-sm bg-white/[0.07] text-[var(--brand-text)] leading-snug ${big ? "px-5 py-4 text-lg" : "px-3.5 py-2.5 text-sm"}`}>
        {before}
        {after !== undefined && (
          <>
            <span className="scam-link">{FAKE_DOMAIN}</span>
            {after}
          </>
        )}
      </p>
      <p className={`mt-3 inline-flex items-center gap-1.5 rounded-full font-semibold scam-flag ${big ? "px-3.5 py-1.5 text-sm" : "px-2.5 py-1 text-xs"}`}>
        <TriangleAlert size={big ? 16 : 13} aria-hidden="true" />
        {t.scamFlag}
      </p>
    </div>
  );
}
