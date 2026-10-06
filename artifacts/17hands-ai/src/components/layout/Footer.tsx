import { Link } from "wouter";
import { BOOKING_URL, CONTACT_EMAIL } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-[var(--brand-primary)] border-t border-border py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-5">
              <img src="/logo-rosegold.png" alt="" width={501} height={339} loading="lazy" className="h-14 w-auto" />
              <span className="display text-2xl text-[var(--brand-text)]">
                17hands<span className="rose-text">.ai</span>
              </span>
            </Link>
            <p className="text-[var(--brand-text-2)] max-w-sm mb-2">
              Security and practical AI for small businesses.
            </p>
            <p className="display text-lg rose-text mb-6">AI systems with a human touch.</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-[var(--brand-text)] underline underline-offset-4 decoration-[var(--brand-rose)] hover:text-[var(--brand-rose)]">
              {CONTACT_EMAIL}
            </a>
          </div>

          <nav aria-label="Footer">
            <h2 className="eyebrow mb-5">Explore</h2>
            <ul className="space-y-3">
              <li><a href="/#services" className="text-[var(--brand-text-2)] hover:text-[var(--brand-rose)]">Services</a></li>
              <li><a href="/#how-it-works" className="text-[var(--brand-text-2)] hover:text-[var(--brand-rose)]">How it works</a></li>
              <li><Link href="/for-you" className="text-[var(--brand-text-2)] hover:text-[var(--brand-rose)]">For individuals</Link></li>
              <li><Link href="/faq" className="text-[var(--brand-text-2)] hover:text-[var(--brand-rose)]">FAQ</Link></li>
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow mb-5">Get in touch</h2>
            <ul className="space-y-3">
              <li><a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="text-[var(--brand-text-2)] hover:text-[var(--brand-rose)]">Book a call<span className="sr-only"> (opens in a new tab)</span></a></li>
              <li><Link href="/contact" className="text-[var(--brand-text-2)] hover:text-[var(--brand-rose)]">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-[var(--brand-text-2)] text-sm">
            © {new Date().getFullYear()} 17hands.ai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
