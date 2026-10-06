import { BrandButton } from "@/components/brand/BrandButton";
import { BOOKING_URL } from "@/lib/site";
import { faqs } from "@/lib/faq";

export default function FAQ() {
  return (
    <div className="pt-36 pb-24 md:pt-44">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <p className="eyebrow mb-6">FAQ</p>
        <h1 className="display text-5xl md:text-6xl text-[var(--brand-text)] mb-12">Frequently asked questions</h1>
        <div className="divide-y divide-white/10 border-y border-white/10 mb-16">
          {faqs.map((f) => (
            <details key={f.q} className="group py-2">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-semibold text-[var(--brand-text)] [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="rose-text text-2xl leading-none transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="pb-5 pr-10 text-[var(--brand-text-2)] leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="text-lg text-[var(--brand-text-2)] mb-6">Have a question that isn't here?</p>
        <BrandButton href={BOOKING_URL} size="lg">Book a call</BrandButton>
      </div>
    </div>
  );
}
