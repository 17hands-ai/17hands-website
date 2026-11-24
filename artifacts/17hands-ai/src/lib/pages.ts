/**
 * Per-route metadata. Single source for the client-side <title>, and for the
 * build step in vite.config.ts that writes a static HTML entry per route, the
 * sitemap, llms.txt and the 404 page. React routes also belong in App.tsx;
 * standalone documents live under public/ and use native navigation links.
 */
/**
 * The one canonical host. Must match the primary domain in Vercel (the other host
 * should redirect here), or Google gets canonicals that point at a redirect.
 */
import { BIO_PAGE_PRICE } from "./site";

export const SITE_ORIGIN = "https://17hands.ai";

/** Opening paragraph of /llms.txt. Keep in step with the homepage hero and About copy. */
export const SITE_SUMMARY =
  `17hands.ai builds custom branded websites and apps, link-in-bio pages, and runs AI and security workshops. It is run by founder Anastasia Blodgett, a software engineer and engineering leader with 12+ years of experience, including six years on the UnitedHealthcare mobile app where she was a security advocate. Websites and apps (/websites): custom design with no templates, built for search (SEO) and for AI assistants such as ChatGPT (AEO), fast on phones, plus custom web and mobile apps, request forms and automation when a site is not enough. Bio pages (/bio-pages): a branded alternative to Linktree on the client's own domain, with save to contacts, one-tap booking, a lead form and analytics, at a founding rate of ${BIO_PAGE_PRICE} flat. Workshops (/workshops): hands-on sessions that teach small business teams to use AI tools without leaking customer data and to spot scams, and Digital Defenders sessions for families, schools and community groups (/digital-defenders); individuals can book 1-on-1 tech safety sessions (/for-you). Live work includes link-in-bio pages for a realtor and a studio owner, a catering request form for Teaspoon El Dorado Hills and the website for The Stuniverse children's books. Work is done remotely across the US; workshops run in person locally or live online. Starting prices for every package are published at /packages, and every project gets a written scope and price first. The first step is a call, booked at https://cal.com/17hands, or email info@17hands.ai.`;

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  /** Excluded from the sitemap and marked noindex (redirect stubs). */
  noindex?: boolean;
  /** A complete document copied from public/, with its own layout and scripts. */
  standalone?: boolean;
  /** Canonical path when it differs from `path`. */
  canonical?: string;
  /**
   * Ship a Content-Security-Policy with this route's HTML (see contentSecurityPolicy in vite.config.ts).
   * For pages that collect personal data. Reach them with a native <a>, not a client-side <Link>,
   * so the browser loads the document that carries the policy.
   */
  strictCsp?: boolean;
  /** One line for /llms.txt: what this page answers. Required for indexed pages. */
  answers?: string;
}

const DEFAULT_DESCRIPTION =
  "Custom branded websites and apps that show up on Google and in AI answers, link-in-bio pages that look like you, and AI and security workshops for small businesses and families.";

export const pages: PageMeta[] = [
  {
    path: "/anastasia",
    title: "Anastasia Blodgett | Links & Booking | 17hands.ai",
    description: "Connect with Anastasia Blodgett and 17hands.ai. Book a call, get a free website audit, and find security and practical AI services.",
    answers: "Anastasia Blodgett's links: save her contact, book a call, request a free SEO and AEO website audit, custom websites and link-in-bio pages, AI automation, Digital Defenders workshops and community projects.",
    standalone: true,
  },
  {
    path: "/digital-defenders",
    title: "Digital Defenders | Cybersecurity Workshops | 17hands.ai",
    description: "Practical cybersecurity workshops for families, communities and small teams. Learn scam awareness, account security, social media privacy and family digital hygiene.",
    answers: "What Digital Defenders workshops cover, who they help, everyday digital safety habits, and how to inquire about a session.",
  },
  {
    path: "/",
    title: "17hands.ai | Custom Websites, Bio Pages & AI Safety Workshops",
    description: DEFAULT_DESCRIPTION,
    answers: "What 17hands.ai does: custom websites and apps, link-in-bio pages and AI and security workshops, with live examples, starting prices and who Anastasia is.",
  },
  {
    path: "/websites",
    title: "Custom Websites & Apps with SEO and AEO | 17hands.ai",
    description: "Custom branded websites and web and mobile apps for small businesses, built to rank on Google and be recommended by AI assistants like ChatGPT. Fast, accessible, no templates.",
    answers: "What a 17hands.ai website or app includes, how SEO and AEO are built in, live examples, how a project runs and starting prices for websites and custom tools.",
  },
  {
    path: "/workshops",
    title: "AI & Cybersecurity Workshops for Teams and Families | 17hands.ai",
    description: "Hands-on workshops on using AI safely and spotting scams, for small business teams, families and community groups. In person locally or live online.",
    answers: "What the AI and security workshops cover for teams and for families, the format, and starting prices for team workshops, AI kickstart, Digital Defenders and 1-on-1 sessions.",
  },
  {
    path: "/about",
    title: "About Anastasia Blodgett | 17hands.ai",
    description: "Anastasia Blodgett, founder of 17hands.ai: 12+ years building software at Trulia, Zillow and UnitedHealthcare, UC Berkeley Computer Science, security advocate and teacher.",
    answers: "Who Anastasia Blodgett is: her background in software and healthcare security, the companies she built software for, and why she started 17hands.ai.",
  },
  {
    path: "/for-you",
    title: "1-on-1 Tech Safety Sessions for Individuals | 17hands.ai",
    description:
      "A patient 1-on-1 session to make your phone, passwords and accounts safer. Spot scams, set up a password manager and use AI tools safely.",
    answers: "What a 1-on-1 tech safety session for an individual or family covers and how a session works.",
  },
  {
    path: "/packages",
    title: "Packages and Starting Prices | 17hands.ai",
    description: "Starting prices for websites, customer data check-ups, security workshops, automation, AI assistants, custom tools and monthly care plans for small businesses.",
    answers: "Every 17hands.ai package with its starting price: websites, Protect, automation and custom tools, agent-monitored care plans, and workshops.",
  },
  {
    path: "/bio-pages",
    title: "Custom Bio Pages for Small Businesses | 17hands.ai",
    description: `A branded link-in-bio page that turns followers into clients: save to contacts, one-tap booking, a lead form and analytics you can see. Founding rate ${BIO_PAGE_PRICE} flat.`,
    answers: `What a custom bio page includes, how it compares with Linktree and Later, the founding ${BIO_PAGE_PRICE} price, add-ons and how results are measured.`,
  },
  {
    path: "/bio-pages/start",
    title: "Send Your Bio Page Details | 17hands.ai",
    description: "The intake form for 17hands.ai bio page clients: your photo, logo, links and domain choice.",
    // A form for clients who already booked; nothing here for search engines or assistants.
    noindex: true,
    strictCsp: true,
  },
  {
    path: "/faq",
    title: "FAQ | 17hands.ai",
    description: "Answers to common questions about security reviews, staff workshops, automation, websites, prices and how projects work.",
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
    answers: "What personal information the site, chat assistant, booking and the bio page intake form collect, who receives it, how long it is kept and how to request access or deletion.",
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
