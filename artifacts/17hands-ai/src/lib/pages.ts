/**
 * Per-route metadata. Single source for the client-side <title>, and for the
 * build step in vite.config.ts that writes a static HTML entry per route, the
 * sitemap, llms.txt and the 404 page. Add a route here when you add one to App.tsx.
 */
export const SITE_ORIGIN = "https://www.17hands.ai";

/** Opening paragraph of /llms.txt. Keep in step with the homepage hero and About copy. */
export const SITE_SUMMARY =
  "17hands.ai offers security and practical AI for small businesses, run by founder Anastasia Blodgett, a software engineer and engineering leader with 12+ years of experience, including six years on the UnitedHealthcare mobile app where she was a security advocate. The work has two equal parts. Protect: customer data check-ups, security workshops for staff, account access routines and safe AI use guidelines. Simplify and grow: workflow automation and custom tools, websites, visibility on Google and in AI assistants, and training on new tools. Individuals and families can book 1-on-1 tech safety sessions. Every project starts by understanding how the business runs, picks one useful improvement, and measures whether it helped. It is practical review and improvement work, not formal audits, certification or legal advice. No prices are published; the first step is a call, booked at https://cal.com/17hands, or email info@17hands.ai.";

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  /** Excluded from the sitemap and marked noindex (redirect stubs). */
  noindex?: boolean;
  /** Canonical path when it differs from `path`. */
  canonical?: string;
  /** One line for /llms.txt: what this page answers. Required for indexed pages. */
  answers?: string;
}

const DEFAULT_DESCRIPTION =
  "Security and practical AI for small businesses. Protect customer information, train your team, and save time with automation, websites and AI tools. Plain English, one useful step at a time.";

export const pages: PageMeta[] = [
  {
    path: "/",
    title: "Small Business Security & AI Consulting | 17hands.ai",
    description: DEFAULT_DESCRIPTION,
    answers: "What 17hands.ai does, the Protect and Simplify & grow services, how projects work, and who Anastasia is.",
  },
  {
    path: "/for-you",
    title: "1-on-1 Tech Safety Sessions for Individuals | 17hands.ai",
    description:
      "A patient 1-on-1 session to make your phone, passwords and accounts safer. Spot scams, set up a password manager and use AI tools safely.",
    answers: "What a 1-on-1 tech safety session for an individual or family covers and how a session works.",
  },
  {
    path: "/faq",
    title: "FAQ | 17hands.ai",
    description: "Answers to common questions about security reviews, staff workshops, automation, websites and how projects work.",
    answers: "Common questions: where to start, whether it is only about AI, customer data, staff workshops, existing tools, websites, measuring results and cost.",
  },
  {
    path: "/contact",
    title: "Contact | 17hands.ai",
    description: "Book a call or email 17hands.ai to talk about keeping your business safe and making everyday work easier.",
    answers: "How to book a call or email 17hands.ai.",
  },
  {
    path: "/privacy",
    title: "Privacy Policy | 17hands.ai",
    description: "How 17hands.ai and the services used on this website handle personal information.",
    answers: "What personal information the site, chat assistant and booking collect, who receives it and how to request access or deletion.",
  },
  {
    path: "/terms",
    title: "Terms of Use | 17hands.ai",
    description: "Terms for using the 17hands.ai website.",
    answers: "Terms for using the website and chat assistant, and how paid work is agreed.",
  },
  { path: "/services", title: "Services | 17hands.ai", description: DEFAULT_DESCRIPTION, noindex: true, canonical: "/" },
  { path: "/case-studies", title: "17hands.ai", description: DEFAULT_DESCRIPTION, noindex: true, canonical: "/" },
];

export const notFoundTitle = "Page not found | 17hands.ai";
