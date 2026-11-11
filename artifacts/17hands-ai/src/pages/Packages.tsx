import type { CSSProperties } from "react";
import { Link } from "wouter";
import { ArrowRight, Check } from "lucide-react";
import { BrandButton } from "@/components/brand/BrandButton";
import { CircuitTrace } from "@/components/brand/Decor";
import { BOOKING_URL } from "@/lib/site";
import { ladders, carePlans, programs, type Package } from "@/lib/packages";

/** One step of a ladder. Steps rise left to right on wide screens, so the progression reads at a glance. */
function Step({ pkg, index, total }: { pkg: Package; index: number; total: number }) {
  const featured = pkg.featured;
  const muted = featured ? "text-white/85" : "text-[var(--brand-text-2)]";
  return (
    <li
      className={`stair flex flex-col rounded-[var(--radius-card)] p-7 lg:mt-[var(--rise)] ${
        featured
          ? "bg-[var(--brand-amethyst)] shadow-[0_24px_60px_-28px_rgba(121,40,202,0.9)]"
          : "bg-[var(--brand-surface)]"
      }`}
      style={{ "--rise": `${(total - 1 - index) * 28}px` } as CSSProperties}
    >
      <p className={`font-mono text-xs mb-5 ${featured ? "text-white/85" : "rose-text"}`}>
        STEP 0{index + 1}
        {featured && " · MOST START HERE"}
      </p>
      <h3 className="font-sans text-xl font-semibold text-[var(--brand-text)] mb-3">{pkg.name}</h3>
      <p className="mb-4">
        {pkg.unit !== "flat" && <span className={`text-sm ${muted}`}>from </span>}
        <span className={`display text-4xl ${featured ? "text-white" : "rose-text"}`}>{pkg.from}</span>
        <span className={`text-sm ${muted}`}>
          {pkg.unit === "flat" ? " flat" : pkg.unit === "per month" ? " a month" : ""}
        </span>
      </p>
      <p className={`leading-relaxed mb-6 ${featured ? "text-white" : "text-[var(--brand-text)]"}`}>{pkg.fit}</p>
      <ul className="space-y-2.5 mb-2">
        {pkg.includes.map((item) => (
          <li key={item} className={`flex gap-2.5 text-[15px] leading-snug ${muted}`}>
            <Check size={16} className={`mt-0.5 shrink-0 ${featured ? "text-white" : "text-[var(--brand-rose)]"}`} aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
      {pkg.href && (
        <Link href={pkg.href} className="mt-auto pt-5 rose-text underline underline-offset-4 hover:text-white">
          See what's included
        </Link>
      )}
    </li>
  );
}

const loop = [
  ["Agents run the checks", "Every week, software checks your site, your domain and how search and AI assistants describe you."],
  ["A person reads the result", "I review what they found, so you never get a raw alert you have to decode."],
  ["You get one page", "What changed, what I fixed and the one thing worth deciding this month."],
];

const terms = [
  ["A fixed price before work starts", "After the first call you get a written scope and price. Nothing begins until you say yes."],
  ["You own what we build", "Your domain, your accounts, your content. Nothing is held on a platform you can't leave."],
  ["Measured after 30 days", "We agree what to count before we start, then compare. If it didn't help, you hear it from me."],
];

export default function Packages() {
  return (
    <div className="flex flex-col">
      <section aria-labelledby="packages-title" className="relative overflow-hidden pt-36 pb-16 md:pt-44">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_0%,rgba(224,167,134,0.16),transparent_70%)]" aria-hidden="true" />
        <div className="container relative mx-auto px-4 sm:px-6 max-w-4xl hero-in">
          <p className="eyebrow mb-6">Packages and starting prices</p>
          <h1 id="packages-title" className="display text-[2.6rem] leading-[1.05] sm:text-6xl text-[var(--brand-text)] mb-8">
            Start small. <span className="rose-text">Climb when it pays.</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--brand-text-2)] leading-relaxed max-w-2xl mb-10">
            Every service is a ladder. Take the first step, see what it does for the business, and only then decide on
            the next one.
          </p>
          <nav aria-label="Package groups" className="flex flex-wrap gap-2">
            {[...ladders.map((l) => [l.id, l.eyebrow] as const), ["care", "Care plans"] as const, ["programs", "Workshops"] as const].map(
              ([id, label]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="min-h-11 inline-flex items-center rounded-[var(--radius-button)] bg-[var(--brand-surface)] px-4 text-sm font-medium text-[var(--brand-text)] hover:bg-[var(--brand-secondary)]"
                >
                  {label}
                </a>
              ),
            )}
          </nav>
        </div>
      </section>

      {ladders.map((ladder, i) => (
        <section
          key={ladder.id}
          id={ladder.id}
          aria-labelledby={`${ladder.id}-title`}
          className={`py-20 md:py-24 scroll-mt-24 ${i % 2 === 0 ? "border-t border-border" : "bg-[var(--brand-primary)]"}`}
        >
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-12">
              <p className="eyebrow mb-4">{ladder.eyebrow}</p>
              <h2 id={`${ladder.id}-title`} className="display text-3xl md:text-5xl text-[var(--brand-text)] mb-5">
                {ladder.title}
              </h2>
              <p className="text-lg text-[var(--brand-text-2)] leading-relaxed">{ladder.intro}</p>
            </div>
            <ol
              className={`grid sm:grid-cols-2 gap-5 items-stretch ${
                ladder.steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
              }`}
            >
              {ladder.steps.map((pkg, index) => (
                <Step key={pkg.id} pkg={pkg} index={index} total={ladder.steps.length} />
              ))}
            </ol>
          </div>
        </section>
      ))}

      <section id="care" aria-labelledby="care-title" className="py-20 md:py-24 bg-atmosphere scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12">
            <p className="eyebrow mb-4">Care plans</p>
            <h2 id="care-title" className="display text-3xl md:text-5xl text-[var(--brand-text)] mb-5">
              Agents keep watch. <span className="rose-text">A person tells you what matters.</span>
            </h2>
            <p className="text-lg text-[var(--brand-text-2)] leading-relaxed">
              Sites break quietly, domains expire and passwords leak. A care plan runs the checks on a schedule and sends
              you a short update, not a dashboard to log in to.
            </p>
          </div>

          <ol className="grid md:grid-cols-3 gap-x-10 gap-y-8 mb-16">
            {loop.map(([name, body], i) => (
              <li key={name} className="relative pt-8 border-t border-[var(--brand-rose)]/50">
                <span className="absolute -top-[5px] left-0 h-2.5 w-2.5 rounded-full bg-[var(--brand-rose)]" aria-hidden="true" />
                <p className="font-mono text-sm rose-text mb-2">0{i + 1}</p>
                <h3 className="display text-2xl text-[var(--brand-text)] mb-2">{name}</h3>
                <p className="text-[var(--brand-text-2)] leading-relaxed">{body}</p>
              </li>
            ))}
          </ol>

          <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
            {carePlans.map((pkg, index) => (
              <Step key={pkg.id} pkg={pkg} index={index} total={carePlans.length} />
            ))}
          </ol>
          <p className="mt-8 text-sm text-[var(--brand-text-2)]/90 max-w-2xl">
            Month to month, cancel any time. Care plans are monitoring and upkeep. They are not a managed security
            service, incident response or a guarantee against attack.
          </p>
        </div>
      </section>

      <section id="programs" aria-labelledby="programs-title" className="py-20 md:py-24 scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
          <div>
            <p className="eyebrow mb-4">Workshops and programs</p>
            <h2 id="programs-title" className="display text-3xl md:text-5xl text-[var(--brand-text)] mb-5">
              Teach the team, <span className="rose-text">not just the tool.</span>
            </h2>
            <p className="text-lg text-[var(--brand-text-2)] leading-relaxed">
              Tools only help when people use them. These sessions are hands on and built around your business.
            </p>
          </div>
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {programs.map((p) => (
              <li key={p.name} className="py-6 grid sm:grid-cols-[1fr_auto] gap-x-8 gap-y-1">
                <h3 className="font-sans text-xl font-semibold text-[var(--brand-text)]">
                  {p.href ? (
                    <Link href={p.href} className="hover:text-[var(--brand-rose)] underline underline-offset-4 decoration-white/25">
                      {p.name}
                    </Link>
                  ) : (
                    p.name
                  )}
                </h3>
                <p className="font-mono text-sm rose-text sm:text-right sm:pt-1.5">{p.price}</p>
                <p className="text-[var(--brand-text-2)] leading-relaxed sm:col-span-2 max-w-xl">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="terms-title" className="py-20 md:py-24 bg-[var(--brand-primary)]">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 id="terms-title" className="display text-3xl md:text-4xl text-[var(--brand-text)] mb-12 max-w-2xl">
            How pricing works
          </h2>
          <ul className="grid md:grid-cols-3 gap-x-12 gap-y-10">
            {terms.map(([name, body]) => (
              <li key={name}>
                <h3 className="font-sans text-xl font-semibold text-[var(--brand-text)] mb-2">{name}</h3>
                <p className="text-[var(--brand-text-2)] leading-relaxed">{body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-12 text-sm text-[var(--brand-text-2)]/90 max-w-2xl">
            Starting prices cover a typical small business. Third-party costs such as domains, hosting or software
            subscriptions are paid directly by you, in your name.
          </p>
        </div>
      </section>

      <section aria-labelledby="packages-cta" className="py-24 text-center">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
          <CircuitTrace className="mx-auto mb-8 w-56" />
          <h2 id="packages-cta" className="display text-3xl md:text-5xl text-[var(--brand-text)] mb-6">
            Not sure which step is yours?
          </h2>
          <p className="text-lg text-[var(--brand-text-2)] mb-10">
            Twenty minutes on how your business runs is usually enough to know where to start.
          </p>
          <BrandButton href={BOOKING_URL} size="lg">
            Book a call <ArrowRight size={18} aria-hidden="true" />
          </BrandButton>
        </div>
      </section>
    </div>
  );
}
