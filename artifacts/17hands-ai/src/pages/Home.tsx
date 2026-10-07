import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { BrandButton } from "@/components/brand/BrandButton";
import { BrandNumeral, CircuitTrace } from "@/components/brand/Decor";
import { Portrait } from "@/components/brand/Portrait";
import { BOOKING_URL, LINKEDIN_PROFILE_URL } from "@/lib/site";
import { LinkedInLink } from "@/components/brand/LinkedInLink";
import { faqs } from "@/lib/faq";

const painPoints = {
  protect: [
    "You keep customer names, emails, payment details or records, and you're not sure who can see them.",
    "Someone who left the business might still be able to sign in to an account.",
    "Your team uses AI tools, and nobody has agreed what's okay to paste into them.",
    "A convincing fake email or text is one click away from your inbox.",
  ],
  simplify: [
    "You answer the same questions, or explain the same steps, again and again.",
    "Information gets copied by hand from one tool to another.",
    "Inquiries and follow-ups slip through because it all depends on memory.",
    "Your website looks fine but doesn't bring in many inquiries.",
  ],
};

const pillars = [
  {
    id: "protect",
    number: "01",
    eyebrow: "Protect",
    title: "Look after your business and your customers' information",
    intro:
      "Customers trust you with their details. I help you understand where that information lives, close the obvious gaps and give your team simple habits that stick.",
    services: [
      {
        name: "Customer data check-up",
        body: "We walk through where customer and business information is kept, who can reach it and which settings matter. You get a short, prioritized list of fixes in plain English, and help making them.",
      },
      {
        name: "Security workshops for your team",
        body: "A hands-on session for staff: spotting scam emails, texts and calls, using a password manager and sign-in codes, and what's safe to share with AI tools.",
      },
      {
        name: "Accounts and access",
        body: "A simple routine for giving new people the access they need, and removing it when someone leaves.",
      },
      {
        name: "Safe AI use guidelines",
        body: "Clear, short rules your team can follow when using ChatGPT and similar tools with business information.",
      },
    ],
    note: "This is practical review and improvement work. It is not a formal audit, certification, penetration test or legal advice.",
  },
  {
    id: "simplify",
    number: "02",
    eyebrow: "Simplify & grow",
    title: "Spend less time on repetitive work, and help customers find you",
    intro:
      "Once we know how your business runs, we pick one useful improvement, set it up properly and make sure your team is comfortable using it.",
    services: [
      {
        name: "Automation and custom tools",
        body: "Automate repetitive admin, connect tools that don't talk to each other, or build a simple custom tool, such as an onboarding guide for new staff, when off-the-shelf software doesn't fit.",
      },
      {
        name: "Websites that help customers act",
        body: "Build a new site or improve the one you have: a clearer message, a site that works well on phones and an easy next step for visitors.",
      },
      {
        name: "Being found on Google and in AI answers",
        body: "Make sure search engines and AI assistants like ChatGPT have clear, accurate information about what you do and who you help.",
      },
      {
        name: "Training on new tools",
        body: "Short, practical sessions so your team actually uses what we set up, plus simple written guides to come back to.",
      },
    ],
    note: null,
  },
];

const steps = [
  {
    name: "Understand",
    body: "We talk about how your business works, the tools you use, where time goes and what information you handle.",
  },
  {
    name: "Prioritize",
    body: "We pick the improvement most worth doing first, weighing value, effort, cost and risk.",
  },
  {
    name: "Implement",
    body: "I set up the right tools or build what's missing, then help your team use it with confidence.",
  },
  {
    name: "Measure",
    body: "We compare against where we started and decide what deserves attention next.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_0%,rgba(121,40,202,0.28),transparent_70%)]" aria-hidden="true" />
        <BrandNumeral className="absolute -right-6 bottom-0 hidden md:block" />

        <div className="container relative mx-auto px-4 sm:px-6 grid lg:grid-cols-[1.25fr_1fr] gap-16 items-center">
          <div className="hero-in">
            <p className="eyebrow mb-6">Security and practical AI for small businesses</p>
            <h1 id="hero-title" className="display text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl text-[var(--brand-text)] mb-8">
              Keep your business <span className="rose-text">safe.</span>
              <br />
              Make everyday work <span className="rose-text">easier.</span>
            </h1>
            <p className="text-lg md:text-xl text-[var(--brand-text-2)] leading-relaxed max-w-2xl mb-10">
              I help small businesses protect the information their customers trust them with, train their teams and save
              time with practical tools and AI. In plain English, starting with how your business actually runs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <BrandButton href={BOOKING_URL} size="lg">
                Book a call <ArrowRight size={18} aria-hidden="true" />
              </BrandButton>
              <BrandButton href="#services" variant="secondary" size="lg">
                See how I can help
              </BrandButton>
            </div>
            <p className="text-sm text-[var(--brand-text-2)]">
              Looking for help just for yourself or your family?{" "}
              <Link href="/for-you" className="rose-text underline underline-offset-4 hover:text-white">
                1-on-1 sessions
              </Link>
            </p>
          </div>

          <div className="hero-in relative hidden lg:block" style={{ animationDelay: "0.15s" }} aria-hidden="true">
            <div className="relative ml-auto max-w-sm rounded-[var(--radius-card)] bg-atmosphere ring-1 ring-white/10 p-7 shadow-2xl">
              <p className="font-mono text-xs rose-text mb-3">01 / PROTECT</p>
              <p className="display text-2xl text-white mb-4">Customer information, handled with care.</p>
              <div className="flex flex-wrap gap-2">
                {["Data check-up", "Staff workshops", "Access"].map((t) => (
                  <span key={t} className="text-xs font-medium px-2.5 py-1 rounded-[var(--radius-badge)] bg-white/10 text-[var(--brand-text-2)]">{t}</span>
                ))}
              </div>
            </div>
            <div className="relative -mt-6 mr-16 max-w-sm rounded-[var(--radius-card)] bg-[var(--brand-amethyst)] p-7 shadow-[0_20px_60px_-20px_rgba(121,40,202,0.8)]">
              <p className="font-mono text-xs text-white/80 mb-3">02 / SIMPLIFY</p>
              <p className="display text-2xl text-white mb-4">Less repetitive work, more time for customers.</p>
              <div className="flex flex-wrap gap-2">
                {["Automation", "Websites", "AI tools"].map((t) => (
                  <span key={t} className="text-xs font-medium px-2.5 py-1 rounded-[var(--radius-badge)] bg-black/20 text-white">{t}</span>
                ))}
              </div>
            </div>
            <CircuitTrace className="absolute -left-20 -bottom-10 w-56 opacity-70" />
          </div>
        </div>
      </section>

      {/* Recognizable problems */}
      <section aria-labelledby="familiar-title" className="py-24 md:py-28 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="reveal max-w-3xl mb-14">
            <p className="eyebrow mb-4">Sound familiar?</p>
            <h2 id="familiar-title" className="display text-4xl md:text-5xl text-[var(--brand-text)]">
              Most small businesses have the same two worries.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            {([
              ["Keeping information safe", painPoints.protect],
              ["Getting the work done", painPoints.simplify],
            ] as const).map(([heading, items]) => (
              <div key={heading} className="reveal">
                <h3 className="display text-2xl rose-text mb-6">{heading}</h3>
                <ul className="space-y-5">
                  {items.map((item) => (
                    <li key={item} className="flex gap-4 text-lg text-[var(--brand-text-2)] leading-relaxed">
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-rose)]" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="reveal mt-14 max-w-2xl text-lg text-[var(--brand-text)]">
            You don't need to have the answer figured out before we talk. We start with the problem, your goals and
            what's already working.
          </p>
        </div>
      </section>

      {/* Services: two pillars */}
      <section id="services" aria-labelledby="services-title" className="scroll-mt-24">
        <h2 id="services-title" className="sr-only">Services</h2>
        {pillars.map((pillar, i) => (
          <div
            key={pillar.id}
            className={i === 0 ? "bg-atmosphere py-24 md:py-28" : "py-24 md:py-28"}
          >
            <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20">
              <div className="reveal lg:sticky lg:top-32 self-start">
                <p className="eyebrow mb-4">
                  <span className="font-mono">{pillar.number}</span> · {pillar.eyebrow}
                </p>
                <h3 className="display text-3xl md:text-4xl text-[var(--brand-text)] mb-6">{pillar.title}</h3>
                <p className="text-lg text-[var(--brand-text-2)] leading-relaxed">{pillar.intro}</p>
              </div>
              <div>
                <ul className="divide-y divide-white/10 border-y border-white/10">
                  {pillar.services.map((s) => (
                    <li key={s.name} className="reveal py-7">
                      <h4 className="font-sans text-xl font-semibold text-[var(--brand-text)] mb-2">{s.name}</h4>
                      <p className="text-[var(--brand-text-2)] leading-relaxed">{s.body}</p>
                    </li>
                  ))}
                </ul>
                {pillar.note && <p className="mt-6 text-sm text-[var(--brand-text-2)]/90">{pillar.note}</p>}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* How it works */}
      <section id="how-it-works" aria-labelledby="how-title" className="py-24 md:py-28 border-t border-border scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="reveal max-w-3xl mb-16">
            <p className="eyebrow mb-4">How it works</p>
            <h2 id="how-title" className="display text-4xl md:text-5xl text-[var(--brand-text)] mb-6">
              One useful improvement at a time.
            </h2>
            <p className="text-lg text-[var(--brand-text-2)] leading-relaxed">
              Sometimes the best answer is a settings change or a simpler process, not new software or AI. Whatever we
              do, we agree up front how we'll know it helped.
            </p>
          </div>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {steps.map((step, i) => (
              <li key={step.name} className="reveal relative pt-8 border-t border-[var(--brand-rose)]/50">
                <span className="absolute -top-[5px] left-0 h-2.5 w-2.5 rounded-full bg-[var(--brand-rose)]" aria-hidden="true" />
                <p className="font-mono text-sm rose-text mb-3">0{i + 1}</p>
                <h3 className="display text-2xl text-[var(--brand-text)] mb-3">{step.name}</h3>
                <p className="text-[var(--brand-text-2)] leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* About */}
      <section id="about" aria-labelledby="about-title" className="py-24 md:py-28 bg-[var(--brand-primary)] scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 grid md:grid-cols-[minmax(0,360px)_1fr] gap-12 lg:gap-20 items-center">
          <Portrait className="reveal aspect-[3/4] w-full max-w-[360px]" />
          <div className="reveal">
            <p className="eyebrow mb-4">About</p>
            <h2 id="about-title" className="display text-4xl md:text-5xl text-[var(--brand-text)] mb-3">
              Hi, I'm Anastasia.
            </h2>
            <p className="rose-text font-medium mb-8">Anastasia Blodgett, founder of 17hands.ai</p>
            <div className="space-y-5 text-lg text-[var(--brand-text-2)] leading-relaxed max-w-2xl">
              <p>
                I've spent more than 12 years building software. I studied Computer Science at UC Berkeley, built tools
                for real estate agents at Trulia and Zillow, shipped apps for clients like MLB and MasterClass as part of
                a small consulting team, and spent six years at UnitedHealth Group on the UnitedHealthcare mobile app,
                used by millions of members. Along the way I've also consulted for early-stage founders, helping them
                scope ideas and turn them into shipped products.
              </p>
              <p>
                In healthcare, protecting people's information isn't optional. I was the security advocate on my team,
                building sign-in, encryption and secure storage, and later led engineering teams that worked hand in hand
                with security and privacy partners. What I learned: good security is mostly clear habits that people
                actually follow.
              </p>
              <p>
                Small businesses deserve that same care, without the hype, the enterprise price tag or the jargon. The
                focus is always on what makes sense for your business, not technology for technology's sake. I'm
                hands-on with AI every day, prototyping tools and testing what's genuinely useful, and I believe AI should
                come with guardrails and a human in the loop. That's what "AI systems with a human touch" means to me.
              </p>
              <p>
                I also love teaching. I co-founded two women-in-engineering groups, mentored more than 15 engineers, and
                now run security workshops that help people spot scams and use technology with confidence.
              </p>
            </div>

            <dl className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-y-6 border-y border-white/10 py-6 max-w-2xl">
              {[
                ["12+ years", "building software"],
                ["Millions", "of members on apps I built and led"],
                ["UC Berkeley", "Computer Science"],
                ["Up to 14", "engineers led"],
              ].map(([value, label]) => (
                <div key={value} className="pr-4">
                  <dt className="sr-only">{label}</dt>
                  <dd className="display text-2xl rose-text">{value}</dd>
                  <dd className="text-sm text-[var(--brand-text-2)] mt-1">{label}</dd>
                </div>
              ))}
            </dl>

            <LinkedInLink href={LINKEDIN_PROFILE_URL} label="Connect with me" className="mt-8" />
          </div>
        </div>
      </section>

      {/* Individuals */}
      <section aria-labelledby="individuals-title" className="py-20 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="reveal flex flex-col md:flex-row md:items-center justify-between gap-8 rounded-[var(--radius-card)] bg-[var(--brand-surface)] ring-1 ring-white/10 p-8 md:p-12">
            <div className="max-w-2xl">
              <p className="eyebrow mb-3">For individuals</p>
              <h2 id="individuals-title" className="display text-3xl text-[var(--brand-text)] mb-3">
                Not a business? I help people too.
              </h2>
              <p className="text-[var(--brand-text-2)] text-lg">
                A 1-on-1 session to make your phone, passwords and accounts safer, for you or someone in your family.
              </p>
            </div>
            <BrandButton href="/for-you" variant="secondary" size="lg" className="shrink-0">
              About 1-on-1 sessions <ArrowRight size={18} aria-hidden="true" />
            </BrandButton>
          </div>
        </div>
      </section>

      {/* FAQ preview */}
      <section aria-labelledby="faq-title" className="py-24 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-[1fr_1.6fr] gap-12">
          <div className="reveal">
            <p className="eyebrow mb-4">Questions</p>
            <h2 id="faq-title" className="display text-4xl md:text-5xl text-[var(--brand-text)] mb-6">
              Good questions to ask first.
            </h2>
            <Link href="/faq" className="rose-text underline underline-offset-4 hover:text-white">
              See all questions
            </Link>
          </div>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {faqs.slice(0, 5).map((f) => (
              <details key={f.q} className="group py-2">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-semibold text-[var(--brand-text)] [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="rose-text text-2xl leading-none transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="pb-5 pr-10 text-[var(--brand-text-2)] leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section aria-labelledby="cta-title" className="relative overflow-hidden py-24 md:py-32 bg-atmosphere">
        <BrandNumeral className="absolute -left-8 -bottom-16" />
        <div className="container relative mx-auto px-4 sm:px-6 text-center max-w-3xl">
          <CircuitTrace className="mx-auto mb-8 w-56" />
          <h2 id="cta-title" className="reveal display text-4xl md:text-6xl text-[var(--brand-text)] mb-6">
            Let's find your best <span className="rose-text">first step.</span>
          </h2>
          <p className="reveal text-lg md:text-xl text-[var(--brand-text-2)] mb-10">
            Tell me how your business works and what worries you or slows you down. We'll talk about a practical place to
            start.
          </p>
          <BrandButton href={BOOKING_URL} size="lg">
            Book a call <ArrowRight size={18} aria-hidden="true" />
          </BrandButton>
        </div>
      </section>
    </div>
  );
}
