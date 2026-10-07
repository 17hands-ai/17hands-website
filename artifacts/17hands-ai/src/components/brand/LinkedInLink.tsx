import { FaLinkedinIn } from "react-icons/fa";
import { cn } from "@/lib/utils";

/** LinkedIn link with the "in" mark in rose gold on a plum badge, cut with the design system's cupped radius. */
export function LinkedInLink({ href, label, className }: { href: string; label: string; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex min-h-11 items-center gap-3 rounded-[var(--radius-button)] border border-[var(--brand-slate)] py-1.5 pl-1.5 pr-5 font-semibold text-[var(--brand-text)] transition-colors hover:border-[var(--brand-rose)] hover:bg-white/5",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="grid h-8 w-8 place-items-center rounded-[10px_3px_10px_3px] bg-[var(--brand-secondary)] text-[var(--brand-rose)] ring-1 ring-[var(--brand-rose)]/40 transition-colors group-hover:bg-[var(--brand-rose)] group-hover:text-[var(--brand-primary)]"
      >
        <FaLinkedinIn size={16} />
      </span>
      {label}
      <span className="sr-only"> on LinkedIn (opens in a new tab)</span>
    </a>
  );
}
