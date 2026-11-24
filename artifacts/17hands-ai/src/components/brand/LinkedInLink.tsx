import type { IconType } from "react-icons";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { cn } from "@/lib/utils";

/** Social link with the network's mark in rose gold on a plum badge, cut with the design system's cupped radius. */
function SocialLink({ href, label, network, Icon, className }: { href: string; label: string; network: string; Icon: IconType; className?: string }) {
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
        <Icon size={16} />
      </span>
      {label}
      <span className="sr-only"> on {network} (opens in a new tab)</span>
    </a>
  );
}

export function LinkedInLink(props: { href: string; label: string; className?: string }) {
  return <SocialLink {...props} network="LinkedIn" Icon={FaLinkedinIn} />;
}

export function InstagramLink(props: { href: string; label: string; className?: string }) {
  return <SocialLink {...props} network="Instagram" Icon={FaInstagram} />;
}
