import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { BrandButton } from "@/components/brand/BrandButton";
import { BOOKING_URL } from "@/lib/site";

const navLinks = [
  { name: "Services", href: "/#services" },
  { name: "How it works", href: "/#how-it-works" },
  { name: "About", href: "/#about" },
  { name: "For individuals", href: "/for-you" },
  { name: "FAQ", href: "/faq" },
];

export function Header() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMobileMenuOpen(false), [location]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[background-color,padding,border-color] duration-300 border-b",
        isScrolled || mobileMenuOpen
          ? "bg-[var(--brand-canvas)]/90 backdrop-blur-md border-border py-3"
          : "bg-transparent border-transparent py-5",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3 shrink-0 rounded-md">
          <img src="/logo-rosegold.png" alt="" width={501} height={339} className="h-11 w-auto" />
          <span className="display text-xl text-[var(--brand-text)]">
            17hands<span className="rose-text">.ai</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              aria-current={location === link.href ? "page" : undefined}
              className={cn(
                "text-sm font-medium transition-colors hover:text-[var(--brand-rose)] py-2",
                location === link.href ? "text-[var(--brand-rose)]" : "text-[var(--brand-text-2)]",
              )}
            >
              {link.name}
            </a>
          ))}
          <BrandButton href={BOOKING_URL} className="ml-2">
            Book a call
          </BrandButton>
        </nav>

        <button
          type="button"
          className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-md text-[var(--brand-text)]"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="lg:hidden absolute top-full left-0 right-0 bg-[var(--brand-canvas)] border-b border-border px-4 sm:px-6 pb-6 pt-2 flex flex-col"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium py-3 text-[var(--brand-text)] border-b border-border/60"
            >
              {link.name}
            </a>
          ))}
          <BrandButton href={BOOKING_URL} size="lg" className="mt-6 w-full">
            Book a call
          </BrandButton>
        </nav>
      )}
    </header>
  );
}
