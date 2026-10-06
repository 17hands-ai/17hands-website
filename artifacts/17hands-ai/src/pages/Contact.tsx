import { ArrowRight, Mail } from "lucide-react";
import { BrandButton } from "@/components/brand/BrandButton";
import { BOOKING_URL, CONTACT_EMAIL } from "@/lib/site";

export default function Contact() {
  return (
    <div className="pt-36 pb-24 md:pt-44 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_0%,rgba(121,40,202,0.22),transparent_70%)]" aria-hidden="true" />
      <div className="container relative mx-auto px-4 sm:px-6 max-w-3xl">
        <p className="eyebrow mb-6">Contact</p>
        <h1 className="display text-5xl md:text-6xl text-[var(--brand-text)] mb-8">Let's talk about your business.</h1>
        <p className="text-xl text-[var(--brand-text-2)] leading-relaxed mb-12">
          Book a call and tell me how your business works, what worries you and where your team gets stuck. We'll look
          for a practical place to start.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <BrandButton href={BOOKING_URL} size="lg">
            Book a call <ArrowRight size={18} aria-hidden="true" />
          </BrandButton>
          <BrandButton href={`mailto:${CONTACT_EMAIL}`} variant="secondary" size="lg">
            <Mail size={18} aria-hidden="true" /> {CONTACT_EMAIL}
          </BrandButton>
        </div>
      </div>
    </div>
  );
}
