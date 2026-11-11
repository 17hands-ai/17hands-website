import { useId, useState } from "react";
import { ArrowRight } from "lucide-react";
import { BrandButton } from "@/components/brand/BrandButton";
import { BOOKING_URL } from "@/lib/site";
import { QUICK_WIN_PRICE } from "@/lib/packages";

const WORK_WEEKS = 48;
const SHARES = [25, 40, 60];

const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  format,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step?: number;
  format: (n: number) => string;
}) {
  const id = useId();
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 mb-2">
        <label htmlFor={id} className="text-[var(--brand-text)]">{label}</label>
        <output htmlFor={id} className="font-mono text-sm rose-text tabular-nums">{format(value)}</output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="roi-range w-full"
      />
    </div>
  );
}

/**
 * The visitor's own numbers, simple arithmetic, nothing sent anywhere. Shows what repetitive
 * admin costs in a year and how quickly one automated workflow would pay for itself.
 */
export function RoiEstimator() {
  const [people, setPeople] = useState(3);
  const [hours, setHours] = useState(5);
  const [rate, setRate] = useState(35);
  const [share, setShare] = useState(40);

  const weeklyHours = people * hours;
  const yearlyCost = weeklyHours * rate * WORK_WEEKS;
  const hoursBack = weeklyHours * WORK_WEEKS * (share / 100);
  const valueBack = hoursBack * rate;
  const weeklyValue = valueBack / WORK_WEEKS;
  const paybackWeeks = Math.max(1, Math.ceil(QUICK_WIN_PRICE / weeklyValue));

  return (
    <section id="estimate" aria-labelledby="estimate-title" className="py-24 md:py-28 border-t border-border scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">
        <div>
          <p className="eyebrow mb-4">Your numbers</p>
          <h2 id="estimate-title" className="display text-4xl md:text-5xl text-[var(--brand-text)] mb-6">
            What is repetitive work <span className="rose-text">costing you?</span>
          </h2>
          <p className="text-lg text-[var(--brand-text-2)] leading-relaxed mb-10 max-w-xl">
            Copying between tools, answering the same questions, chasing follow-ups. Move the sliders to match your
            business.
          </p>
          <div className="space-y-7 max-w-xl">
            <Slider label="People doing repetitive admin" value={people} onChange={setPeople} min={1} max={15} format={(n) => `${n}`} />
            <Slider label="Hours each, per week" value={hours} onChange={setHours} min={1} max={20} format={(n) => `${n} h`} />
            <Slider label="What an hour of their time is worth" value={rate} onChange={setRate} min={15} max={150} step={5} format={(n) => `$${n}`} />
            <fieldset>
              <legend className="text-[var(--brand-text)] mb-3">How much of it could be automated</legend>
              <div className="flex gap-2">
                {SHARES.map((s) => (
                  <label
                    key={s}
                    className={`flex-1 cursor-pointer rounded-[var(--radius-button)] px-3 py-2.5 text-center text-sm font-medium transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--brand-rose)] ${
                      share === s
                        ? "bg-[var(--brand-amethyst)] text-white"
                        : "bg-[var(--brand-surface)] text-[var(--brand-text-2)] hover:text-[var(--brand-text)]"
                    }`}
                  >
                    <input type="radio" name="share" value={s} checked={share === s} onChange={() => setShare(s)} className="sr-only" />
                    {s === 25 ? "A little" : s === 40 ? "Typical" : "A lot"} · {s}%
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        </div>

        <div className="rounded-[var(--radius-card)] bg-atmosphere p-8 md:p-10" aria-live="polite">
          <p className="font-mono text-xs rose-text mb-3">TODAY</p>
          <p className="display text-5xl md:text-6xl text-[var(--brand-text)] tabular-nums">{usd(yearlyCost)}</p>
          <p className="text-[var(--brand-text-2)] mt-2 mb-8">
            a year on {weeklyHours} hours of repetitive work every week.
          </p>

          <div className="h-3 rounded-full bg-white/10 overflow-hidden mb-3" aria-hidden="true">
            <div
              className="h-full origin-left rounded-full bg-[var(--brand-rose)] transition-transform duration-300 ease-out"
              style={{ transform: `scaleX(${share / 100})` }}
            />
          </div>
          <p className="font-mono text-xs rose-text mb-3">WITH {share}% AUTOMATED</p>
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <p className="display text-4xl rose-text tabular-nums">{Math.round(hoursBack).toLocaleString("en-US")} h</p>
              <p className="text-sm text-[var(--brand-text-2)] mt-1">back every year</p>
            </div>
            <div>
              <p className="display text-4xl rose-text tabular-nums">{usd(valueBack)}</p>
              <p className="text-sm text-[var(--brand-text-2)] mt-1">of time freed up</p>
            </div>
          </div>
          <p className="text-[var(--brand-text)] leading-relaxed mb-8">
            A quick-win automation starts at {usd(QUICK_WIN_PRICE)}. At these numbers it pays for itself in about{" "}
            <strong className="rose-text">{paybackWeeks} {paybackWeeks === 1 ? "week" : "weeks"}</strong>.
          </p>
          <BrandButton href={BOOKING_URL} size="lg" className="w-full sm:w-auto">
            Find my first automation <ArrowRight size={18} aria-hidden="true" />
          </BrandButton>
          <p className="mt-6 text-sm text-[var(--brand-text-2)]/90">
            Simple arithmetic on your own inputs, based on {WORK_WEEKS} working weeks. Not a promise: we measure the
            real before and after on every project. Nothing you enter here leaves your browser.
          </p>
        </div>
      </div>
    </section>
  );
}
