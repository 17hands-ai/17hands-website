import { BIO_PAGE_PRICE } from "./site";

/**
 * Single source for every published package and starting price. The /packages page, the
 * home page service rows, the ROI estimator, the FAQ and llms.txt all read from here, so a
 * price changes in one place.
 *
 * PROPOSED PRICES: drafted on the fable-updates branch for review. Confirm or change each
 * `from` before this reaches production. See docs/fable-updates-plan.md, section 5.
 */
export interface Package {
  id: string;
  name: string;
  /** Display price, already formatted. */
  from: string;
  /** "from", "flat" or "/mo": how the price reads next to the number. */
  unit: "from" | "flat" | "per month";
  /** Who it is for, in one line. */
  fit: string;
  includes: string[];
  /** One step per ladder is the suggested starting point. */
  featured?: boolean;
  href?: string;
}

export interface Ladder {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  steps: Package[];
}

export const QUICK_WIN_PRICE = 750;

export const ladders: Ladder[] = [
  {
    id: "websites",
    eyebrow: "Websites",
    title: "A site that customers and AI assistants can both read",
    intro: "Start with one page. Add pages, booking and an assistant when the business is ready for them.",
    steps: [
      {
        id: "bio-page",
        name: "Bio page",
        from: BIO_PAGE_PRICE,
        unit: "flat",
        fit: "The link behind your Instagram, card and QR code.",
        includes: ["One branded page on your domain", "Save to contacts, call, text, book", "Lead form and analytics"],
        href: "/bio-pages",
      },
      {
        id: "starter-site",
        name: "Starter site",
        from: "$900",
        unit: "from",
        fit: "A new business that needs to look real this month.",
        includes: ["One long page, written with you", "Booking and contact form", "Search and AI-answer basics", "Live in about a week"],
      },
      {
        id: "business-site",
        name: "Business site",
        from: "$2,400",
        unit: "from",
        fit: "An established business whose site isn't bringing inquiries.",
        includes: ["Up to 6 pages, one per service", "Google Business Profile tune-up", "Structured data and llms.txt for AI assistants", "Analytics and a 30-day results review"],
        featured: true,
      },
      {
        id: "growth-site",
        name: "Growth site",
        from: "$4,800",
        unit: "from",
        fit: "A busy team that loses leads after hours.",
        includes: ["Everything in Business", "Assistant that answers from your own content", "Automatic lead follow-up, with a person in the loop", "Quarterly review and tuning"],
      },
    ],
  },
  {
    id: "protect",
    eyebrow: "Protect",
    title: "Customer data, looked after properly",
    intro: "Find out where information lives, close the gaps that matter and give your team habits that hold.",
    steps: [
      {
        id: "data-checkup",
        name: "Data check-up",
        from: "$600",
        unit: "from",
        fit: "You hold customer details and aren't sure who can see them.",
        includes: ["Map of where customer data lives", "Who has access, and who shouldn't", "Prioritized fix list in plain English", "One hour of help making the fixes"],
      },
      {
        id: "team-workshop",
        name: "Team security workshop",
        from: "$450",
        unit: "from",
        fit: "Up to 15 people, 90 minutes, on the tools you use.",
        includes: ["Spotting scam emails, texts and calls", "Password manager and sign-in codes", "What is safe to paste into AI tools", "One-page guide to keep"],
      },
      {
        id: "protect-bundle",
        name: "Protect bundle",
        from: "$1,500",
        unit: "from",
        fit: "The full baseline for a small team.",
        includes: ["Data check-up and fixes", "Team workshop", "Joiner and leaver access routine", "Written AI-use rules for your business"],
        featured: true,
      },
    ],
  },
  {
    id: "automate",
    eyebrow: "Automate and build",
    title: "Hand the repetitive work to software",
    intro: "One workflow first. Measure it. Then decide whether the next one is worth doing.",
    steps: [
      {
        id: "quick-win",
        name: "Quick-win automation",
        from: `$${QUICK_WIN_PRICE}`,
        unit: "from",
        fit: "One task your team repeats every week.",
        includes: ["One workflow, start to finish", "Connects the tools you already pay for", "Before and after time measured", "Short guide for your team"],
        featured: true,
      },
      {
        id: "assistant",
        name: "AI assistant setup",
        from: "$1,500",
        unit: "from",
        fit: "The same questions arrive by chat, email or phone all day.",
        includes: ["Answers only from content you approve", "Hands over to a person when unsure", "No customer data used for training", "Monthly review of what it was asked"],
      },
      {
        id: "custom-tool",
        name: "Custom tool",
        from: "$3,500",
        unit: "from",
        fit: "Off-the-shelf software doesn't fit how you work.",
        includes: ["Built around your process", "Example: a staff onboarding tool", "Sign-in and access by role", "Training and written handover"],
      },
    ],
  },
];

/** Monthly plans where automated checks run on a schedule and a person reviews the result. */
export const carePlans: Package[] = [
  {
    id: "watch",
    name: "Watch",
    from: "$49",
    unit: "per month",
    fit: "Know your site is up, fast and findable.",
    includes: ["Weekly uptime, speed and broken-link checks", "Domain and certificate expiry alerts", "Monthly check of how Google and AI assistants describe you", "One-page monthly update"],
  },
  {
    id: "care",
    name: "Care",
    from: "$129",
    unit: "per month",
    fit: "Someone keeping the site and the accounts in order.",
    includes: ["Everything in Watch", "Up to one hour of edits a month", "Alert if a business email appears in a known breach", "Quarterly access review and call"],
    featured: true,
  },
  {
    id: "partner",
    name: "Partner",
    from: "$349",
    unit: "per month",
    fit: "Ongoing improvements, not just upkeep.",
    includes: ["Everything in Care", "Up to three hours of build time a month", "Automations and assistant kept tuned", "Monthly numbers review and next step"],
  },
];

/** Workshops and programs: where 17hands.ai is expanding. */
export const programs: { name: string; price: string; body: string; href?: string }[] = [
  {
    name: "Digital Defenders",
    price: "Priced by group",
    body: "Scam awareness and everyday digital safety for families, schools and community groups.",
    href: "/digital-defenders",
  },
  {
    name: "AI kickstart for teams",
    price: "from $600",
    body: "Two hours, hands on: what AI is good for in your business, what to keep out of it, and one workflow set up before we finish.",
  },
  {
    name: "1-on-1 tech safety session",
    price: "from $120",
    body: "Phone, passwords and accounts made safer for you or someone in your family.",
    href: "/for-you",
  },
  {
    name: "Staff onboarding program",
    price: "Scoped per business",
    body: "Your first-week training turned into a guided tool new hires can follow, so the owner stops repeating it.",
  },
];

const byId = new Map(
  [...ladders.flatMap((l) => l.steps), ...carePlans].map((p) => [p.id, p] as const),
);

/** "from $600", "$200 flat" or "from $49/mo" for a package id. Throws on a typo so the build fails. */
export function priceLabel(id: string): string {
  const p = byId.get(id);
  if (!p) throw new Error(`packages: unknown package id "${id}"`);
  if (p.unit === "flat") return `${p.from} flat`;
  if (p.unit === "per month") return `from ${p.from}/mo`;
  return `from ${p.from}`;
}
