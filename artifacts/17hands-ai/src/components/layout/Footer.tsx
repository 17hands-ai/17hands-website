import { Link } from "wouter";
import { BOOKING_URL, CONTACT_EMAIL, INSTAGRAM_URL, LINKEDIN_COMPANY_URL } from "@/lib/site";
import { InstagramLink, LinkedInLink } from "@/components/brand/LinkedInLink";
import { useI18n } from "@/i18n";

const linkClass = "text-[var(--brand-text-2)] hover:text-[var(--brand-rose)]";

export function Footer() {
  const { content } = useI18n();
  const t = content.footer;

  return (
    <footer className="bg-[var(--brand-primary)] border-t border-border py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-12">
          <div className="sm:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-5">
              <img src="/logo-rosegold.png" alt="" width={501} height={339} loading="lazy" className="h-14 w-auto" />
              <span className="display text-2xl text-[var(--brand-text)]">
                17hands<span className="rose-text">.ai</span>
              </span>
            </Link>
            <p className="text-[var(--brand-text-2)] max-w-sm mb-2">{t.tagline}</p>
            <p className="display text-lg rose-text mb-6">{t.motto}</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-[var(--brand-text)] underline underline-offset-4 decoration-[var(--brand-rose)] hover:text-[var(--brand-rose)]">
              {CONTACT_EMAIL}
            </a>
            <p className="mt-6 text-sm text-[var(--brand-text-2)]">{content.common.tips.eyebrow}: {content.common.tips.title}</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <InstagramLink href={INSTAGRAM_URL} label={t.instagram} />
              <LinkedInLink href={LINKEDIN_COMPANY_URL} label={t.linkedin} />
            </div>
          </div>

          <nav aria-label={t.explore}>
            <h2 className="eyebrow mb-5">{t.explore}</h2>
            <ul className="space-y-3">
              <li><Link href="/websites" className={linkClass}>{content.nav.websites}</Link></li>
              <li><Link href="/bio-pages" className={linkClass}>{content.nav.bioPages}</Link></li>
              <li><Link href="/workshops" className={linkClass}>{content.nav.workshops}</Link></li>
              <li><Link href="/ai-automation" className={linkClass}>{content.nav.aiAutomation}</Link></li>
              <li><Link href="/digital-defenders" className={linkClass}>{content.nav.digitalDefenders}</Link></li>
              <li><Link href="/for-you" className={linkClass}>{t.forIndividuals}</Link></li>
              <li><Link href="/packages" className={linkClass}>{t.packages}</Link></li>
              <li><Link href="/about" className={linkClass}>{content.nav.about}</Link></li>
              <li><Link href="/faq" className={linkClass}>{content.nav.faq}</Link></li>
              <li><a href="/anastasia" className={linkClass}>{t.linksBooking}</a></li>
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow mb-5">{t.getInTouch}</h2>
            <ul className="space-y-3">
              <li>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {content.common.book}
                  <span className="sr-only">{content.common.newTab}</span>
                </a>
              </li>
              <li><Link href="/contact" className={linkClass}>{t.contact}</Link></li>
            </ul>
          </div>

          <nav aria-label={t.legal}>
            <h2 className="eyebrow mb-5">{t.legal}</h2>
            <ul className="space-y-3">
              <li><Link href="/privacy" className={linkClass}>{t.privacy}</Link></li>
              <li><Link href="/terms" className={linkClass}>{t.terms}</Link></li>
            </ul>
          </nav>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-[var(--brand-text-2)] text-sm">
            © {new Date().getFullYear()} 17hands.ai. {t.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
