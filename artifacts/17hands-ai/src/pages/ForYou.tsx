import { ArrowRight } from "lucide-react";
import { BrandButton } from "@/components/brand/BrandButton";
import { CircuitTrace } from "@/components/brand/Decor";
import { BOOKING_URL } from "@/lib/site";

const topics = [
  { name: "Phone and computer", body: "Updates, lock screen, privacy settings and the apps that can see your location, photos and contacts." },
  { name: "Passwords", body: "Set up a password manager so you don't have to remember dozens of passwords, and turn on sign-in codes for the accounts that matter." },
  { name: "Scams", body: "How to spot fake texts, emails, calls and pop-ups, and what to do if you've already clicked." },
  { name: "Email and banking accounts", body: "Check recovery details and sign-in settings so it's much harder for someone else to take over." },
  { name: "Backups", body: "Make sure your photos and important files are saved somewhere safe." },
  { name: "Using AI tools safely", body: "What's fine to ask ChatGPT and similar tools, and what's better kept to yourself." },
];

const how = [
  ["Book a time", "Pick a slot that suits you."],
  ["Tell me what worries you", "We focus on what matters most to you, not a generic checklist."],
  ["We fix it together", "I explain each change as we make it, at your pace."],
  ["You know what changed", "You leave understanding what was set up and why."],
];

export default function ForYou() {
  return (
    <div className="flex flex-col">
      <section aria-labelledby="foryou-title" className="relative overflow-hidden pt-36 pb-20 md:pt-44">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_0%,rgba(224,167,134,0.16),transparent_70%)]" aria-hidden="true" />
        <div className="container relative mx-auto px-4 sm:px-6 max-w-4xl hero-in">
          <p className="eyebrow mb-6">For individuals and families</p>
          <h1 id="foryou-title" className="display text-[2.6rem] leading-[1.05] sm:text-6xl text-[var(--brand-text)] mb-8">
            Feel safer online, <span className="rose-text">one session at a time.</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--brand-text-2)] leading-relaxed max-w-2xl mb-10">
            A 1-on-1 session where we sit down together and make your phone, passwords and accounts safer. No jargon and
            no judgment. Great for you, a parent or anyone who'd like a patient guide.
          </p>
          <BrandButton href={BOOKING_URL} size="lg">
            Book a session <ArrowRight size={18} aria-hidden="true" />
          </BrandButton>
        </div>
      </section>

      <section aria-labelledby="topics-title" className="py-20 md:py-24 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 id="topics-title" className="reveal display text-3xl md:text-4xl text-[var(--brand-text)] mb-12 max-w-2xl">
            What we can cover
          </h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
            {topics.map((t) => (
              <li key={t.name} className="reveal border-t border-[var(--brand-rose)]/40 pt-6">
                <h3 className="font-sans text-xl font-semibold text-[var(--brand-text)] mb-2">{t.name}</h3>
                <p className="text-[var(--brand-text-2)] leading-relaxed">{t.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="session-how-title" className="py-20 md:py-24 bg-atmosphere">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 id="session-how-title" className="reveal display text-3xl md:text-4xl text-[var(--brand-text)] mb-12">
            How a session works
          </h2>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {how.map(([name, body], i) => (
              <li key={name} className="reveal">
                <p className="font-mono text-sm rose-text mb-3">0{i + 1}</p>
                <h3 className="display text-xl text-[var(--brand-text)] mb-2">{name}</h3>
                <p className="text-[var(--brand-text-2)] leading-relaxed">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="foryou-cta" className="py-24 text-center">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
          <CircuitTrace className="mx-auto mb-8 w-56" />
          <h2 id="foryou-cta" className="display text-3xl md:text-5xl text-[var(--brand-text)] mb-6">
            Ready when you are.
          </h2>
          <p className="text-lg text-[var(--brand-text-2)] mb-10">
            Run a business too? I also run security workshops for staff and help small businesses look after customer
            information. <a href="/#services" className="rose-text underline underline-offset-4 hover:text-white">See business services</a>
          </p>
          <BrandButton href={BOOKING_URL} size="lg">
            Book a session <ArrowRight size={18} aria-hidden="true" />
          </BrandButton>
        </div>
      </section>
    </div>
  );
}
