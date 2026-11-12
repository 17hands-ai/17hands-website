import { ArrowRight, Mail } from "lucide-react";
import { BrandButton } from "@/components/brand/BrandButton";
import { BOOKING_URL, CONTACT_EMAIL } from "@/lib/site";
import { useContent } from "@/i18n";

export default function Contact() {
  const content = useContent();
  const t = content.contact;
  return (
    <div className="pt-36 pb-24 md:pt-44 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_0%,rgba(121,40,202,0.22),transparent_70%)]" aria-hidden="true" />
      <div className="container relative mx-auto px-4 sm:px-6 max-w-3xl">
        <p className="eyebrow mb-6">{t.eyebrow}</p>
        <h1 className="display text-5xl md:text-6xl text-[var(--brand-text)] mb-8">{t.title}</h1>
        <p className="text-xl text-[var(--brand-text-2)] leading-relaxed mb-12">{t.body}</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <BrandButton href={BOOKING_URL} placement="contact" size="lg">
            {content.common.book} <ArrowRight size={18} aria-hidden="true" />
          </BrandButton>
          <BrandButton href={`mailto:${CONTACT_EMAIL}`} variant="secondary" size="lg">
            <Mail size={18} aria-hidden="true" /> {CONTACT_EMAIL}
          </BrandButton>
        </div>
      </div>
    </div>
  );
}
