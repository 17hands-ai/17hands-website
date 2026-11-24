import { InstagramLink } from "@/components/brand/LinkedInLink";
import { INSTAGRAM_URL } from "@/lib/site";
import { useContent } from "@/i18n";

/**
 * The free-tips invitation: a low-commitment next step for readers not ready to book a call.
 * Sits just before a page's closing CTA, so it never competes with the booking button above the fold.
 */
export function InstagramTips({ className = "" }: { className?: string }) {
  const t = useContent().common.tips;
  return (
    <section aria-labelledby="ig-tips-title" className={`border-t border-border py-14 md:py-16 ${className}`}>
      <div className="container mx-auto flex flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between md:gap-12">
        <div className="max-w-2xl">
          <p className="eyebrow mb-3">{t.eyebrow}</p>
          <h2 id="ig-tips-title" className="display text-2xl md:text-3xl text-[var(--brand-text)] mb-3">{t.title}</h2>
          <p className="text-[var(--brand-text-2)] leading-relaxed">{t.body}</p>
        </div>
        <InstagramLink href={INSTAGRAM_URL} label={t.cta} className="shrink-0 self-start md:self-center" />
      </div>
    </section>
  );
}
