/**
 * Per-route metadata. Single source for the client-side <title>, and for the
 * build step in vite.config.ts that writes a static HTML entry per route, the
 * sitemap and the 404 page. Add a route here when you add one to App.tsx.
 */
export const SITE_ORIGIN = "https://www.17hands.ai";

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  /** Excluded from the sitemap and marked noindex (redirect stubs). */
  noindex?: boolean;
  /** Canonical path when it differs from `path`. */
  canonical?: string;
}

const DEFAULT_DESCRIPTION =
  "Security and practical AI for small businesses. Protect customer information, train your team, and save time with automation, websites and AI tools. Plain English, one useful step at a time.";

export const pages: PageMeta[] = [
  { path: "/", title: "Small Business Security & AI Consulting | 17hands.ai", description: DEFAULT_DESCRIPTION },
  {
    path: "/for-you",
    title: "1-on-1 Tech Safety Sessions for Individuals | 17hands.ai",
    description:
      "A patient 1-on-1 session to make your phone, passwords and accounts safer. Spot scams, set up a password manager and use AI tools safely.",
  },
  {
    path: "/faq",
    title: "FAQ | 17hands.ai",
    description: "Answers to common questions about security reviews, staff workshops, automation, websites and how projects work.",
  },
  {
    path: "/contact",
    title: "Contact | 17hands.ai",
    description: "Book a call or email 17hands.ai to talk about keeping your business safe and making everyday work easier.",
  },
  {
    path: "/privacy",
    title: "Privacy Policy | 17hands.ai",
    description: "How 17hands.ai and the services used on this website handle personal information.",
  },
  {
    path: "/terms",
    title: "Terms of Use | 17hands.ai",
    description: "Terms for using the 17hands.ai website.",
  },
  { path: "/services", title: "Services | 17hands.ai", description: DEFAULT_DESCRIPTION, noindex: true, canonical: "/" },
  { path: "/case-studies", title: "17hands.ai", description: DEFAULT_DESCRIPTION, noindex: true, canonical: "/" },
];

export const notFoundTitle = "Page not found | 17hands.ai";
