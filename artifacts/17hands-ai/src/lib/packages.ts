import { BIO_PAGE_PRICE } from "./site";

/**
 * Single source for package structure and starting prices. Names and descriptions live in
 * the locale files (src/i18n/<locale>.ts) under `packages.items`, keyed by the ids below.
 *
 * PROPOSED PRICES: drafted on the fable-updates branch for review. Confirm or change each
 * `price` before this reaches production. See docs/fable-updates-plan.md, section 5.
 */
export type Unit = "from" | "flat" | "per month";

export type PackageId =
  | "bio-page" | "starter-site" | "business-site" | "growth-site"
  | "data-checkup" | "team-workshop" | "protect-bundle"
  | "quick-win" | "assistant" | "custom-tool"
  | "watch" | "care" | "partner";

export interface PackageDef {
  id: PackageId;
  /** US dollars. */
  price: number;
  unit: Unit;
  /** One step per ladder is the suggested starting point. */
  featured?: boolean;
  href?: string;
}

export type LadderId = "websites" | "protect" | "automate";

export const ladders: { id: LadderId; steps: PackageDef[] }[] = [
  {
    id: "websites",
    steps: [
      { id: "bio-page", price: Number(BIO_PAGE_PRICE.replace(/\D/g, "")), unit: "flat", href: "/bio-pages" },
      { id: "starter-site", price: 900, unit: "from" },
      { id: "business-site", price: 2400, unit: "from", featured: true },
      { id: "growth-site", price: 4800, unit: "from" },
    ],
  },
  {
    id: "protect",
    steps: [
      { id: "data-checkup", price: 600, unit: "from" },
      { id: "team-workshop", price: 450, unit: "from" },
      { id: "protect-bundle", price: 1500, unit: "from", featured: true },
    ],
  },
  {
    id: "automate",
    steps: [
      { id: "quick-win", price: 750, unit: "from", featured: true },
      { id: "assistant", price: 1500, unit: "from" },
      { id: "custom-tool", price: 3500, unit: "from" },
    ],
  },
];

/** Monthly plans where automated checks run on a schedule and a person reviews the result. */
export const carePlans: PackageDef[] = [
  { id: "watch", price: 49, unit: "per month" },
  { id: "care", price: 129, unit: "per month", featured: true },
  { id: "partner", price: 349, unit: "per month" },
];

export type ProgramId = "digital-defenders" | "ai-kickstart" | "one-on-one" | "onboarding";

/** Workshops and programs. A missing `price` means the locale file supplies a note such as "Priced by group". */
export const programs: { id: ProgramId; price?: number; href?: string }[] = [
  { id: "digital-defenders", href: "/digital-defenders" },
  { id: "ai-kickstart", price: 600 },
  { id: "one-on-one", price: 120, href: "/for-you" },
  { id: "onboarding" },
];

const all = new Map([...ladders.flatMap((l) => l.steps), ...carePlans].map((p) => [p.id, p] as const));

/** Throws on an unknown id so a typo fails the build instead of printing a blank price. */
export function packageDef(id: PackageId): PackageDef {
  const def = all.get(id);
  if (!def) throw new Error(`packages: unknown package id "${id}"`);
  return def;
}

export const QUICK_WIN_PRICE = packageDef("quick-win").price;

export const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

/** Words that go around a price, per locale. */
export interface PriceWords {
  from: string;
  flat: string;
  perMonth: string;
  perMonthShort: string;
}

/** "from $600", "$200 flat" or "from $49/mo", in the locale's words. */
export function priceLabel(def: Pick<PackageDef, "price" | "unit">, w: PriceWords): string {
  if (def.unit === "flat") return `${usd(def.price)} ${w.flat}`;
  if (def.unit === "per month") return `${w.from} ${usd(def.price)}${w.perMonthShort}`;
  return `${w.from} ${usd(def.price)}`;
}
