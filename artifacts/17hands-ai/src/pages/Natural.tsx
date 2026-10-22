import { BrandButton } from "@/components/brand/BrandButton";
import { CONTACT_EMAIL } from "@/lib/site";

export default function Natural() {
  return <section className="pt-40 pb-28 md:pt-48"><div className="container mx-auto px-4 sm:px-6 max-w-4xl"><p className="eyebrow mb-6">A 17hands.ai product in development</p><h1 className="display text-6xl md:text-7xl mb-8">Natural<span className="rose-text">.</span></h1><h2 className="display text-3xl md:text-4xl mb-6">A space for community.</h2><p className="text-lg md:text-xl text-[var(--brand-text-2)] leading-relaxed mb-10 max-w-2xl">We are shaping what comes next. Natural is an upcoming area for community and related services. Details will be shared here as the offering takes shape.</p><div className="flex flex-col sm:flex-row gap-4"><BrandButton href={`mailto:${CONTACT_EMAIL}?subject=Natural%20community%20inquiry`} size="lg">Start a conversation</BrandButton><BrandButton href="/digital-defenders" variant="secondary" size="lg">Explore Digital Defenders</BrandButton></div></div></section>;
}
