import { BrandNumeral } from "@/components/brand/Decor";
import { BrandButton } from "@/components/brand/BrandButton";
import { BOOKING_URL } from "@/lib/site";
import { fillPrices, useContent } from "@/i18n";

export default function FAQ() {
  const content = useContent();
  const t = content.faqPage;
  return (
    <div className="relative isolate overflow-hidden pt-36 pb-24 md:pt-44">
      <BrandNumeral className="-right-6 top-24 hidden md:block" />
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <p className="eyebrow mb-6">{t.eyebrow}</p>
        <h1 className="display text-5xl md:text-6xl text-[var(--brand-text)] mb-12">{t.title}</h1>
        <div className="divide-y divide-white/10 border-y border-white/10 mb-16">
          {content.faqs.map((f) => (
            <details key={f.q} className="group py-2">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-semibold text-[var(--brand-text)] [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="rose-text text-2xl leading-none transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="pb-5 pr-10 text-[var(--brand-text-2)] leading-relaxed">{fillPrices(f.a, content)}</p>
            </details>
          ))}
        </div>
        <p className="text-lg text-[var(--brand-text-2)] mb-6">{t.more}</p>
        <BrandButton href={BOOKING_URL} placement="faq" size="lg">{content.common.book}</BrandButton>
      </div>
    </div>
  );
}
