import { useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { BrandButton } from "@/components/brand/BrandButton";
import { BOOKING_URL, CONTACT_EMAIL } from "@/lib/site";

const topics = [
  { name: "Scams & social engineering", body: "Practice spotting suspicious emails, texts, QR codes and urgent requests. Learn how to verify a message before you act." },
  { name: "Passwords & account security", body: "Understand password managers, multifactor authentication and account recovery. Choose a practical next step for your most important accounts." },
  { name: "Social media & identity", body: "Review what you share, who can see it and how impersonation works. Build awareness around identity theft and protecting sensitive information." },
  { name: "Family digital hygiene", body: "Create shared habits for device updates, privacy settings and conversations about online safety, with children, parents and older relatives in mind." },
];
const habits = [
  "Use a different, strong password for every important account.",
  "Turn on multifactor authentication, starting with email.",
  "Verify unexpected requests through a trusted contact method.",
  "Keep devices and apps updated.",
  "Review social media privacy and location sharing together.",
  "Agree who to contact when a message or situation feels wrong.",
];

export default function DigitalDefenders() {
  const [checked, setChecked] = useState<number[]>([]);
  return (
    <div>
      <section className="pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 items-center">
          <div>
            <p className="eyebrow mb-5">A 17hands.ai program</p>
            <h1 className="display text-5xl sm:text-6xl lg:text-7xl mb-7">Digital <span className="rose-text">Defenders.</span></h1>
            <p className="text-2xl md:text-3xl text-[var(--brand-text)] mb-6">Safer online, together.</p>
            <p className="text-lg text-[var(--brand-text-2)] leading-relaxed max-w-2xl mb-9">Practical cybersecurity workshops for families, communities and small teams. Learn to recognize scams, protect your accounts and build everyday digital habits, in plain English.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <BrandButton href="#workshops" size="lg">Explore workshops <ArrowRight size={18} aria-hidden="true" /></BrandButton>
              <BrandButton href={BOOKING_URL} variant="secondary" size="lg">Plan a session</BrandButton>
            </div>
          </div>
          <aside className="bg-[var(--brand-surface)] p-8 md:p-10 rounded-[var(--radius-card)]">
            <ShieldCheck className="rose-text mb-8" size={52} strokeWidth={1.2} aria-hidden="true" />
            <h2 className="display text-3xl mb-5">October is Cybersecurity Awareness Month.</h2>
            <p className="text-lg text-[var(--brand-text-2)] leading-relaxed mb-6">Bring your family, community group or team together for a conversation that turns awareness into action, in October and throughout the year.</p>
            <a href={`mailto:${CONTACT_EMAIL}?subject=Digital%20Defenders%20workshop`} className="rose-text underline underline-offset-4">Ask about hosting a workshop</a>
          </aside>
        </div>
      </section>

      <section id="workshops" className="scroll-mt-28 py-20 md:py-24 bg-[var(--brand-primary)]">
        <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-20">
          <div>
            <h2 className="display text-4xl md:text-5xl mb-6">Real situations.<br /><span className="rose-text">Useful skills.</span></h2>
            <p className="text-lg text-[var(--brand-text-2)] leading-relaxed">Start with the questions your group is already asking. We agree on the audience, topics and format before a session is booked.</p>
          </div>
          <ol className="divide-y divide-white/10">
            {topics.map((topic, index) => <li key={topic.name} className="py-7 first:pt-0 flex gap-5"><span className="rose-text text-lg pt-1" aria-hidden="true">0{index + 1}</span><div><h3 className="text-xl font-semibold mb-3">{topic.name}</h3><p className="text-[var(--brand-text-2)] leading-relaxed">{topic.body}</p></div></li>)}
          </ol>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="display text-4xl md:text-5xl mb-12">A session that meets you where you are.</h2>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            <div><h3 className="display text-2xl rose-text mb-4">Families & community groups</h3><p className="text-lg text-[var(--brand-text-2)] leading-relaxed mb-6">Make room for questions about suspicious messages, social accounts, shared devices and helping relatives stay safe. No technical background needed.</p><BrandButton href="/for-you" variant="secondary">Explore individual support</BrandButton></div>
            <div><h3 className="display text-2xl rose-text mb-4">Small businesses & teams</h3><p className="text-lg text-[var(--brand-text-2)] leading-relaxed mb-6">Build shared habits around customer information, account access and suspicious requests. Discuss what is safe to share with AI tools and when to ask for help.</p><BrandButton href={BOOKING_URL} variant="secondary">Discuss a team workshop</BrandButton></div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-[var(--brand-surface)]">
        <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-[1fr_1.25fr] gap-10 lg:gap-20">
          <div><h2 className="display text-4xl md:text-5xl mb-6">Your next<br /><span className="rose-text">safer habit.</span></h2><p className="text-lg text-[var(--brand-text-2)] leading-relaxed mb-6">Use this checklist to start a conversation at home. Pick one action to take together today.</p><p className="text-sm text-[var(--brand-text-2)]">Selections reset when you leave or refresh this page. No answers are submitted.</p></div>
          <div><p role="status" className="rose-text mb-5">{checked.length} of {habits.length} habits checked</p><fieldset><legend className="sr-only">Everyday digital safety habits</legend><div className="divide-y divide-white/10">{habits.map((habit, index) => <label key={habit} className="flex gap-4 py-5 cursor-pointer text-lg leading-relaxed"><input type="checkbox" checked={checked.includes(index)} onChange={(event) => setChecked(current => event.target.checked ? [...current, index] : current.filter(value => value !== index))} className="mt-1.5 w-5 h-5 shrink-0 accent-[var(--brand-amethyst)]" /><span>{habit}</span></label>)}</div></fieldset></div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <h2 className="display text-4xl md:text-5xl mb-8">Before we get together.</h2>
          <div className="divide-y divide-white/10">
            {[
              ["Do I need technical experience?", "No. Sessions use plain language and familiar examples. Bring your questions; we choose the right starting point together."],
              ["How do I book, and what does it cost?", "Book a call or email info@17hands.ai with your audience, group size and preferred timing. Format, availability and pricing are agreed before booking. No public workshop dates are listed yet."],
              ["Will I need to share passwords or private information?", "No. Keep passwords, recovery codes, Social Security numbers and other sensitive details private. We can discuss settings and examples without collecting those details."],
            ].map(([question, answer]) => <details key={question} className="py-5"><summary className="cursor-pointer font-semibold text-lg py-2">{question}</summary><p className="text-[var(--brand-text-2)] leading-relaxed pt-4 pb-2">{answer}</p></details>)}
          </div>
          <p className="mt-8 text-[var(--brand-text-2)]">For additional guidance, explore <a href="https://www.cisa.gov/secure-our-world" className="rose-text underline underline-offset-4">CISA's online safety resources</a> and <a href="https://www.identitytheft.gov/" className="rose-text underline underline-offset-4">the FTC's identity theft recovery resources</a>.</p>
        </div>
      </section>

      <section className="bg-[var(--brand-primary)] py-20 md:py-24"><div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center"><h2 className="display text-4xl md:text-5xl mb-6">Bring Digital Defenders<br />to <span className="rose-text">your people.</span></h2><p className="text-lg text-[var(--brand-text-2)] mb-8">Tell me who you want to help and what concerns them. We will find a useful place to start.</p><BrandButton href={BOOKING_URL} size="lg">Plan your workshop <ArrowRight size={18} aria-hidden="true" /></BrandButton><p className="mt-6 text-sm text-[var(--brand-text-2)]">Led by Anastasia Blodgett, founder of 17hands.ai.</p></div></section>
    </div>
  );
}
