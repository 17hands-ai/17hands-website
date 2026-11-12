import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, Moon, Sun, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { BrandButton } from "@/components/brand/BrandButton";
import { BOOKING_URL } from "@/lib/site";
import { LOCALES, localizedPath, prefixOf, useI18n } from "@/i18n";

/** Route links navigate client-side; "/#section" links stay plain anchors so the browser handles the hash. */
function NavLink({ href, ...props }: React.ComponentProps<"a"> & { href: string }) {
  const { locale } = useI18n();
  return href.includes("#") ? <a href={prefixOf(locale) + href} {...props} /> : <Link href={href} {...props} />;
}

/**
 * Light and dark. The choice is applied to <html data-theme> before first paint by the inline
 * script in index.html; this button flips it and remembers it. Both icons are rendered and CSS
 * shows one, so the server HTML is the same for either theme.
 */
function ThemeToggle() {
  const { content } = useI18n();
  const [isLight, setIsLight] = useState(false);
  useEffect(() => setIsLight(document.documentElement.dataset.theme === "light"), []);

  const toggle = () => {
    const next = isLight ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "light" ? "#FBF9FE" : "#0D0C13");
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode: the choice lasts for this page only */
    }
    setIsLight(!isLight);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? content.nav.toDark : content.nav.toLight}
      className="inline-flex h-11 w-11 items-center justify-center rounded-md text-[var(--brand-text-2)] hover:text-[var(--brand-rose)]"
    >
      <Sun size={20} className="only-dark" aria-hidden="true" />
      <Moon size={20} className="only-light" aria-hidden="true" />
    </button>
  );
}

/** Plain links, so each language loads its own pre-rendered page and its own copy. */
function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, content } = useI18n();
  const [location] = useLocation();
  return (
    <nav aria-label={content.nav.language} className={cn("flex items-center font-mono text-xs", className)}>
      {LOCALES.map((l) => (
        <a
          key={l}
          href={localizedPath(l, location)}
          hrefLang={l}
          lang={l}
          aria-current={l === locale ? "true" : undefined}
          className={cn(
            "inline-flex min-h-11 items-center px-2 uppercase tracking-wider transition-colors hover:text-[var(--brand-rose)]",
            l === locale ? "text-[var(--brand-rose)]" : "text-[var(--brand-text-2)]",
          )}
        >
          {l}
        </a>
      ))}
    </nav>
  );
}

export function Header() {
  const { content } = useI18n();
  const t = content.nav;
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: t.digitalDefenders, href: "/digital-defenders" },
    { name: t.natural, href: "/natural" },
    { name: t.services, href: "/#services" },
    { name: t.packages, href: "/packages" },
    { name: t.bioPages, href: "/bio-pages" },
    { name: t.about, href: "/#about" },
    { name: t.faq, href: "/faq" },
  ];

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
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 shrink-0 rounded-md">
          <img src="/logo-rosegold.png" alt="" width={501} height={339} className="h-11 w-auto" />
          <span className="display text-xl text-[var(--brand-text)] hidden sm:inline">
            17hands<span className="rose-text">.ai</span>
          </span>
        </Link>

        <nav aria-label={t.label} className="hidden xl:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              aria-current={location === link.href ? "page" : undefined}
              className={cn(
                "text-sm font-medium transition-colors hover:text-[var(--brand-rose)] py-2",
                location === link.href ? "text-[var(--brand-rose)]" : "text-[var(--brand-text-2)]",
              )}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <LanguageSwitcher className="hidden sm:flex" />
          <ThemeToggle />
          {/* Always in view: the header is fixed, so booking is one tap away at any scroll depth. */}
          <BrandButton href={BOOKING_URL} placement="header" className="ml-1 sm:ml-2 px-4 sm:px-5 whitespace-nowrap">
            <span className="sm:hidden">{content.common.bookShort}</span>
            <span className="hidden sm:inline">{content.common.book}</span>
          </BrandButton>
          <button
            type="button"
            className="xl:hidden inline-flex h-11 w-11 items-center justify-center rounded-md text-[var(--brand-text)]"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={mobileMenuOpen ? t.closeMenu : t.openMenu}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-nav" className="xl:hidden absolute top-full left-0 right-0 bg-[var(--brand-canvas)] border-b border-border px-4 sm:px-6 pb-6 pt-2">
          <nav aria-label={t.label} className="flex flex-col">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium py-3 text-[var(--brand-text)] border-b border-border/60"
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
          <LanguageSwitcher className="mt-3 sm:hidden" />
          <BrandButton href={BOOKING_URL} placement="menu" size="lg" className="mt-4 w-full">
            {content.common.book}
          </BrandButton>
        </div>
      )}
    </header>
  );
}
