import type { ReactNode } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";
type Size = "md" | "lg";

interface BrandButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  onClick?: () => void;
}

const base =
  "inline-flex items-center justify-center gap-2 font-sans font-semibold italic tracking-wide transition-[background-color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-rose)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-canvas)] active:translate-y-px";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--brand-amethyst)] text-white shadow-[0_6px_24px_-8px_rgba(121,40,202,0.7)] hover:bg-[#8a3ae0] hover:shadow-[0_8px_30px_-6px_rgba(121,40,202,0.85)]",
  secondary:
    "border border-[var(--brand-slate)] text-[var(--brand-text)] hover:border-[var(--brand-rose)] hover:bg-white/5",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-sm rounded-[var(--radius-button)]",
  lg: "min-h-[50px] px-7 text-base rounded-[var(--radius-cta)]",
};

/** Links styled as the design system's kinetic CTAs. External hrefs open in a new tab. */
export function BrandButton({ href, children, variant = "primary", size = "md", className, onClick }: BrandButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  if (/^(https?:|mailto:)/.test(href)) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }
  if (href.startsWith("#") || href.startsWith("/#")) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}
