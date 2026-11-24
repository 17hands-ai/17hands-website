import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { BrandButton } from "@/components/brand/BrandButton";
import { CompanyLogos } from "@/components/brand/CompanyLogos";
import { InstagramLink, LinkedInLink } from "@/components/brand/LinkedInLink";
import { Portrait } from "@/components/brand/Portrait";
import { BOOKING_URL, INSTAGRAM_URL, LINKEDIN_PROFILE_URL } from "@/lib/site";
import { useContent } from "@/i18n";
import { useScrollCraft } from "@/hooks/use-scrollcraft";

const story = [
  "I've spent more than 12 years building software. I studied Computer Science at UC Berkeley, built tools for real estate agents at Trulia and Zillow, shipped apps for clients like MLB and MasterClass as part of a small consulting team, and spent six years at UnitedHealth Group on the UnitedHealthcare mobile app, used by millions of members. Along the way I've also consulted for early-stage founders, helping them scope ideas and turn them into shipped products.",
  "In healthcare, protecting people's information isn't optional. I was the security advocate on my team, building sign-in, encryption and secure storage, and later led engineering teams that worked hand in hand with security and privacy partners. What I learned: good security is mostly clear habits that people actually follow.",
  "Small businesses deserve that same care, without the hype, the enterprise price tag or the jargon. The focus is always on what makes sense for your business, not technology for technology's sake. I'm hands-on with AI every day, prototyping tools and testing what's genuinely useful, and I believe AI should come with guardrails and a human in the loop. That's what \"AI systems with a human touch\" means to me.",
  "I also love teaching. I co-founded two women-in-engineering groups, mentored more than 15 engineers, and now run security workshops that help people spot scams and use technology with confidence.",
];

export default function About() {
  const content = useContent();
  const t = content.home.about;
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollCraft(rootRef);

  return (
    <div ref={rootRef}>
      <section className="overflow-x-clip pt-36 pb-20 md:pt-44 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 grid md:grid-cols-[minmax(0,360px)_1fr] gap-12 lg:gap-20">
          <div className="md:sticky md:top-32 self-start"><Portrait className="aspect-[3/4] w-full max-w-[360px]" /></div>
          <div>
            <p className="eyebrow mb-5">About</p>
            <h1 className="display text-5xl sm:text-6xl text-[var(--brand-text)] mb-3">{t.title}</h1>
            <p className="rose-text font-medium mb-10">{t.role}</p>
            <div className="space-y-6 text-lg text-[var(--brand-text-2)] leading-relaxed max-w-2xl">
              {story.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
            </div>
            <dl className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-y-6 border-y border-white/10 py-6 max-w-2xl">
              {t.facts.map(([value, label]) => (
                <div key={value} className="pr-4">
                  <dt className="sr-only">{label}</dt>
                  <dd className="display text-2xl rose-text">{value}</dd>
                  <dd className="text-sm text-[var(--brand-text-2)] mt-1">{label}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkedInLink href={LINKEDIN_PROFILE_URL} label={t.linkedin} />
              <InstagramLink href={INSTAGRAM_URL} label="@17hands.ai" />
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Experience" className="py-16 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6"><CompanyLogos /></div>
      </section>

      <section className="py-20 md:py-28 bg-atmosphere">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center">
          <h2 className="display text-4xl md:text-5xl text-[var(--brand-text)] mb-6">Let's start with <span className="rose-text">one call.</span></h2>
          <p className="text-lg text-[var(--brand-text-2)] mb-10">Tell me what you want to build or what worries you.</p>
          <BrandButton href={BOOKING_URL} placement="about-bottom" size="lg">{content.common.book} <ArrowRight size={18} aria-hidden="true" /></BrandButton>
        </div>
      </section>
    </div>
  );
}
