/**
 * English copy for the translated routes (/, /packages, /faq, /contact) and the shared
 * header and footer. ru.ts and es.ts must match this shape exactly: `Content` is derived
 * from this object, so a missing key in a translation fails typecheck.
 *
 * {package-id} tokens are replaced with that package's price (see fillPrices in ./index).
 */
import { pages } from "@/lib/pages";

export const en = {
  htmlLang: "en",
  ogLocale: "en_US",
  languageName: "English",

  /** English titles and descriptions have one source: lib/pages.ts. */
  meta: Object.fromEntries(pages.map((p) => [p.path, { title: p.title, description: p.description }])) as Record<
    string,
    { title: string; description: string }
  >,

  price: { from: "from", flat: "flat", perMonth: "a month", perMonthShort: "/mo" },

  common: {
    book: "Book a call",
    newTab: " (opens in a new tab)",
    skip: "Skip to content",
  },

  nav: {
    label: "Main",
    digitalDefenders: "Digital Defenders",
    natural: "Natural",
    services: "Services",
    packages: "Packages",
    bioPages: "Bio pages",
    about: "About",
    faq: "FAQ",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
    toLight: "Switch to light mode",
    toDark: "Switch to dark mode",
  },

  footer: {
    tagline: "Security and practical AI for small businesses.",
    motto: "AI systems with a human touch.",
    follow: "Follow 17hands.ai",
    explore: "Explore",
    linksBooking: "Links & booking",
    howItWorks: "How it works",
    packages: "Packages and prices",
    forIndividuals: "For individuals",
    getInTouch: "Get in touch",
    contact: "Contact",
    legal: "Legal",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    rights: "All rights reserved.",
  },

  home: {
    hero: {
      eyebrow: "Security and practical AI for small businesses",
      line1: "Keep your business ",
      accent1: "safe.",
      line2: "Make everyday work ",
      accent2: "easier.",
      body: "I help small businesses protect the information their customers trust them with, train their teams and save time with practical tools and AI. In plain English, starting with how your business actually runs.",
      packages: "See packages and prices",
      individuals: "Looking for help just for yourself or your family?",
      individualsLink: "1-on-1 sessions",
    },
    flow: {
      aria: "How it works: inquiries, emails and missed calls come in, are sorted and checked by a person, and leave as booked calls, replies and follow-ups. Customer records stay protected, with access set by role.",
      comesIn: "COMES IN",
      getsDone: "GETS DONE",
      inputs: ["Website inquiry", "Email question", "Missed call"],
      outputs: ["Call booked", "Reply sent", "Follow-up set"],
      humanCheck: "HUMAN CHECK",
      records: "Customer records",
      recordsNote: "Backed up. Access set by role.",
      access: [
        { who: "Owner", what: "full access" },
        { who: "Staff", what: "what the job needs" },
        { who: "Former staff", what: "removed" },
      ],
    },
    stats: {
      eyebrow: "Why now",
      title: "Small businesses are adopting AI faster than they are ",
      accent: "protecting it.",
      items: [
        { claim: "of U.S. small businesses now use generative AI.", meaning: "Your competitors are already trying it. Most have no rules for it." },
        { claim: "of data breaches involve a person: a click, a reused password, a mistake.", meaning: "Habits fix more than software does. That part is teachable." },
        { claim: "of breaches at small and midsize businesses involved ransomware.", meaning: "Backups and sign-in codes decide whether it is a bad day or a closed business." },
        { claim: "of mobile visits are abandoned when a page takes over 3 seconds to load.", meaning: "A slow site loses the customer before they read a word." },
      ],
      urgencyTitle: "Waiting is the expensive option.",
      urgencyBody: "Each of these gaps is cheap to close before something goes wrong and costly after. One call is enough to see which one to close first.",
      urgencyCta: "Find my first step",
    },
    products: {
      title: "Explore the 17hands.ai family.",
      ddTitle: "Digital Defenders",
      ddBody: "Safer online, together. Cybersecurity workshops, scam awareness and practical digital habits for families, communities and small teams.",
      ddCta: "Explore Digital Defenders",
      naturalTitle: "Natural",
      naturalBody: "An upcoming space for community and related services. We are shaping what comes next.",
      naturalCta: "Meet Natural",
    },
    familiar: {
      eyebrow: "Sound familiar?",
      title: "Most small businesses have the same two worries.",
      protectTitle: "Keeping information safe",
      protect: [
        "You keep customer names, emails, payment details or records, and you're not sure who can see them.",
        "Someone who left the business might still be able to sign in to an account.",
        "Your team uses AI tools, and nobody has agreed what's okay to paste into them.",
        "A convincing fake email or text is one click away from your inbox.",
      ],
      simplifyTitle: "Getting the work done",
      simplify: [
        "You answer the same questions, or explain the same steps, again and again.",
        "Information gets copied by hand from one tool to another.",
        "Inquiries and follow-ups slip through because it all depends on memory.",
        "Your website looks fine but doesn't bring in many inquiries.",
      ],
      closing: "You don't need to have the answer figured out before we talk. We start with the problem, your goals and what's already working.",
    },
    servicesTitle: "Services",
    pillars: [
      {
        eyebrow: "Protect",
        title: "Look after your business and your customers' information",
        intro: "Customers trust you with their details. I help you understand where that information lives, close the obvious gaps and give your team simple habits that stick.",
        services: [
          { name: "Customer data check-up", body: "We walk through where customer and business information is kept, who can reach it and which settings matter. You get a short, prioritized list of fixes in plain English, and help making them." },
          { name: "Security workshops for your team", body: "A hands-on session for staff: spotting scam emails, texts and calls, using a password manager and sign-in codes, and what's safe to share with AI tools." },
          { name: "Accounts and access", body: "A simple routine for giving new people the access they need, and removing it when someone leaves." },
          { name: "Safe AI use guidelines", body: "Clear, short rules your team can follow when using ChatGPT and similar tools with business information." },
        ],
        note: "This is practical review and improvement work. It is not a formal audit, certification, penetration test or legal advice.",
        link: "See Protect packages and prices",
      },
      {
        eyebrow: "Simplify & grow",
        title: "Spend less time on repetitive work, and help customers find you",
        intro: "Once we know how your business runs, we pick one useful improvement, set it up properly and make sure your team is comfortable using it.",
        services: [
          { name: "Automation and custom tools", body: "Automate repetitive admin, connect tools that don't talk to each other, or build a simple custom tool, such as an onboarding guide for new staff, when off-the-shelf software doesn't fit." },
          { name: "Websites that help customers act", body: "Build a new site or improve the one you have: a clearer message, a site that works well on phones and an easy next step for visitors." },
          { name: "Being found on Google and in AI answers", body: "Make sure search engines and AI assistants like ChatGPT have clear, accurate information about what you do and who you help." },
          { name: "Training on new tools", body: "Short, practical sessions so your team actually uses what we set up, plus simple written guides to come back to." },
        ],
        note: "",
        link: "See automation and website packages",
      },
    ],
    delivery: {
      eyebrow: "Delivery, not hype",
      title: "Plenty of people talk about AI. ",
      accent: "I build the thing and make sure it works.",
      body: "I spent more than 12 years shipping software that millions of people rely on, in healthcare, where a mistake with someone's data has consequences. You get that same discipline, sized for a small business.",
      points: [
        { name: "Something running, not a slide deck", body: "Every project ends with a working result inside your business and a team that knows how to use it." },
        { name: "Scope and price in writing first", body: "You know what you are getting and what it costs before any work begins." },
        { name: "Measured, then told straight", body: "We agree what to count before we start. If it didn't help, you hear it from me first." },
        { name: "No tool for its own sake", body: "If a settings change solves it, that is what I'll recommend, even when it means a smaller project." },
      ],
      cta: "Talk to the person who builds it",
    },
    estimator: {
      eyebrow: "Your numbers",
      title: "What is repetitive work ",
      accent: "costing you?",
      body: "Copying between tools, answering the same questions, chasing follow-ups. Move the sliders to match your business.",
      people: "People doing repetitive admin",
      hours: "Hours each, per week",
      hoursUnit: "h",
      rate: "What an hour of their time is worth",
      share: "How much of it could be automated",
      shareLabels: ["A little", "Typical", "A lot"],
      today: "TODAY",
      todayNote: "a year on {hours} hours of repetitive work every week.",
      withShare: "WITH {share}% AUTOMATED",
      hoursBack: "back every year",
      valueBack: "of time freed up",
      payback: "A quick-win automation starts at {price}. At these numbers it pays for itself in about ",
      weeks: (n: number) => (n === 1 ? "1 week" : `${n} weeks`),
      waiting: "Every month you wait costs about {monthly} of that time.",
      cta: "Find my first automation",
      disclaimer: "Simple arithmetic on your own inputs, based on {weeks} working weeks. Not a promise: we measure the real before and after on every project. Nothing you enter here leaves your browser.",
    },
    how: {
      eyebrow: "How it works",
      title: "One useful improvement at a time.",
      body: "Sometimes the best answer is a settings change or a simpler process, not new software or AI. Whatever we do, we agree up front how we'll know it helped.",
      steps: [
        { name: "Understand", body: "We talk about how your business works, the tools you use, where time goes and what information you handle." },
        { name: "Prioritize", body: "We pick the improvement most worth doing first, weighing value, effort, cost and risk." },
        { name: "Implement", body: "I set up the right tools or build what's missing, then help your team use it with confidence." },
        { name: "Measure", body: "We compare against where we started and decide what deserves attention next." },
      ],
    },
    about: {
      eyebrow: "About",
      title: "Hi, I'm Anastasia.",
      role: "Anastasia Blodgett, founder of 17hands.ai",
      paragraphs: [
        "I've spent more than 12 years building software. I studied Computer Science at UC Berkeley, built tools for real estate agents at Trulia and Zillow, shipped apps for clients like MLB and MasterClass as part of a small consulting team, and spent six years at UnitedHealth Group on the UnitedHealthcare mobile app, used by millions of members. Along the way I've also consulted for early-stage founders, helping them scope ideas and turn them into shipped products.",
        "In healthcare, protecting people's information isn't optional. I was the security advocate on my team, building sign-in, encryption and secure storage, and later led engineering teams that worked hand in hand with security and privacy partners. What I learned: good security is mostly clear habits that people actually follow.",
        "Small businesses deserve that same care, without the hype, the enterprise price tag or the jargon. The focus is always on what makes sense for your business, not technology for technology's sake. I'm hands-on with AI every day, prototyping tools and testing what's genuinely useful, and I believe AI should come with guardrails and a human in the loop. That's what \"AI systems with a human touch\" means to me.",
        "I also love teaching. I co-founded two women-in-engineering groups, mentored more than 15 engineers, and now run security workshops that help people spot scams and use technology with confidence.",
      ],
      facts: [
        ["12+ years", "building software"],
        ["Millions", "of members on apps I built and led"],
        ["UC Berkeley", "Computer Science"],
        ["Up to 14", "engineers led"],
      ],
      linkedin: "Connect with me",
    },
    individuals: {
      eyebrow: "For individuals",
      title: "Not a business? I help people too.",
      body: "A 1-on-1 session to make your phone, passwords and accounts safer, for you or someone in your family.",
      cta: "About 1-on-1 sessions",
    },
    faq: { eyebrow: "Questions", title: "Good questions to ask first.", all: "See all questions" },
    cta: {
      line: "Let's find your best ",
      accent: "first step.",
      body: "Tell me how your business works and what worries you or slows you down. We'll talk about a practical place to start.",
    },
  },

  packages: {
    hero: {
      eyebrow: "Packages and starting prices",
      title: "Start small. ",
      accent: "Climb when it pays.",
      body: "Every service is a ladder. Take the first step, see what it does for the business, and only then decide on the next one.",
      navLabel: "Package groups",
      care: "Care plans",
      workshops: "Workshops",
    },
    step: "STEP",
    startHere: "MOST START HERE",
    seeIncluded: "See what's included",
    ladders: {
      websites: {
        eyebrow: "Websites",
        title: "A site that customers and AI assistants can both read",
        intro: "Start with one page. Add pages, booking and an assistant when the business is ready for them.",
      },
      protect: {
        eyebrow: "Protect",
        title: "Customer data, looked after properly",
        intro: "Find out where information lives, close the gaps that matter and give your team habits that hold.",
      },
      automate: {
        eyebrow: "Automate and build",
        title: "Hand the repetitive work to software",
        intro: "One workflow first. Measure it. Then decide whether the next one is worth doing.",
      },
    },
    items: {
      "bio-page": { name: "Bio page", fit: "The link behind your Instagram, card and QR code.", includes: ["One branded page on your domain", "Save to contacts, call, text, book", "Lead form and analytics"] },
      "starter-site": { name: "Starter site", fit: "A new business that needs to look real this month.", includes: ["One long page, written with you", "Booking and contact form", "Search and AI-answer basics", "Live in about a week"] },
      "business-site": { name: "Business site", fit: "An established business whose site isn't bringing inquiries.", includes: ["Up to 6 pages, one per service", "Google Business Profile tune-up", "Structured data and llms.txt for AI assistants", "Analytics and a 30-day results review"] },
      "growth-site": { name: "Growth site", fit: "A busy team that loses leads after hours.", includes: ["Everything in Business", "Assistant that answers from your own content", "Automatic lead follow-up, with a person in the loop", "Quarterly review and tuning"] },
      "data-checkup": { name: "Data check-up", fit: "You hold customer details and aren't sure who can see them.", includes: ["Map of where customer data lives", "Who has access, and who shouldn't", "Prioritized fix list in plain English", "One hour of help making the fixes"] },
      "team-workshop": { name: "Team security workshop", fit: "Up to 15 people, 90 minutes, on the tools you use.", includes: ["Spotting scam emails, texts and calls", "Password manager and sign-in codes", "What is safe to paste into AI tools", "One-page guide to keep"] },
      "protect-bundle": { name: "Protect bundle", fit: "The full baseline for a small team.", includes: ["Data check-up and fixes", "Team workshop", "Joiner and leaver access routine", "Written AI-use rules for your business"] },
      "quick-win": { name: "Quick-win automation", fit: "One task your team repeats every week.", includes: ["One workflow, start to finish", "Connects the tools you already pay for", "Before and after time measured", "Short guide for your team"] },
      assistant: { name: "AI assistant setup", fit: "The same questions arrive by chat, email or phone all day.", includes: ["Answers only from content you approve", "Hands over to a person when unsure", "No customer data used for training", "Monthly review of what it was asked"] },
      "custom-tool": { name: "Custom tool", fit: "Off-the-shelf software doesn't fit how you work.", includes: ["Built around your process", "Example: a staff onboarding tool", "Sign-in and access by role", "Training and written handover"] },
      watch: { name: "Watch", fit: "Know your site is up, fast and findable.", includes: ["Weekly uptime, speed and broken-link checks", "Domain and certificate expiry alerts", "Monthly check of how Google and AI assistants describe you", "One-page monthly update"] },
      care: { name: "Care", fit: "Someone keeping the site and the accounts in order.", includes: ["Everything in Watch", "Up to one hour of edits a month", "Alert if a business email appears in a known breach", "Quarterly access review and call"] },
      partner: { name: "Partner", fit: "Ongoing improvements, not just upkeep.", includes: ["Everything in Care", "Up to three hours of build time a month", "Automations and assistant kept tuned", "Monthly numbers review and next step"] },
    },
    care: {
      eyebrow: "Care plans",
      title: "Agents keep watch. ",
      accent: "A person tells you what matters.",
      body: "Sites break quietly, domains expire and passwords leak. A care plan runs the checks on a schedule and sends you a short update, not a dashboard to log in to.",
      loop: [
        { name: "Agents run the checks", body: "Every week, software checks your site, your domain and how search and AI assistants describe you." },
        { name: "A person reads the result", body: "I review what they found, so you never get a raw alert you have to decode." },
        { name: "You get one page", body: "What changed, what I fixed and the one thing worth deciding this month." },
      ],
      note: "Month to month, cancel any time. Care plans are monitoring and upkeep. They are not a managed security service, incident response or a guarantee against attack.",
    },
    programs: {
      eyebrow: "Workshops and programs",
      title: "Teach the team, ",
      accent: "not just the tool.",
      body: "Tools only help when people use them. These sessions are hands on and built around your business.",
      items: {
        "digital-defenders": { name: "Digital Defenders", priceNote: "Priced by group", body: "Scam awareness and everyday digital safety for families, schools and community groups." },
        "ai-kickstart": { name: "AI kickstart for teams", priceNote: "", body: "Two hours, hands on: what AI is good for in your business, what to keep out of it, and one workflow set up before we finish." },
        "one-on-one": { name: "1-on-1 tech safety session", priceNote: "", body: "Phone, passwords and accounts made safer for you or someone in your family." },
        onboarding: { name: "Staff onboarding program", priceNote: "Scoped per business", body: "Your first-week training turned into a guided tool new hires can follow, so the owner stops repeating it." },
      },
    },
    terms: {
      title: "How pricing works",
      items: [
        { name: "A fixed price before work starts", body: "After the first call you get a written scope and price. Nothing begins until you say yes." },
        { name: "You own what we build", body: "Your domain, your accounts, your content. Nothing is held on a platform you can't leave." },
        { name: "Measured after 30 days", body: "We agree what to count before we start, then compare. If it didn't help, you hear it from me." },
      ],
      note: "Starting prices cover a typical small business. Third-party costs such as domains, hosting or software subscriptions are paid directly by you, in your name.",
    },
    cta: {
      title: "Not sure which step is yours?",
      body: "One call about how your business runs is usually enough to know where to start.",
    },
  },

  faqPage: {
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    more: "Have a question that isn't here?",
  },

  faqs: [
    { q: "Do I need to know exactly what I want before we talk?", a: "No. Tell me what feels slow, risky or confusing. We start with the problem and how your business runs today, then look at options together." },
    { q: "Why should a small business act on AI and security now?", a: "Because adoption has outrun protection. 58% of U.S. small businesses already use generative AI, most without rules for what goes into it, and about 60% of breaches start with a person, not a machine. Closing the basic gaps costs far less before an incident than after one." },
    { q: "Is this only about AI?", a: "No. Sometimes the right answer is a settings change, a simpler process or better use of a tool you already pay for. AI is one option, not the goal." },
    { q: "We hold customer information. Can you help us look after it?", a: "Yes. We look at where that information is kept, who can reach it and which settings and habits matter most, then fix the most important things first. This is practical review and improvement work, not a formal audit, certification or legal advice." },
    { q: "What happens in a staff security workshop?", a: "A hands-on session for your team, tailored to the tools you use. Typical topics are spotting scam emails, texts and calls, using a password manager and sign-in codes, and what is and isn't safe to share with AI tools." },
    { q: "Can you work with the tools we already use?", a: "Yes. I look at your current tools first. What they can do, what access we have, cost and practical limits all shape the recommendation." },
    { q: "Do you build websites?", a: "Yes. I can build a new site or improve the one you have so it explains what you do clearly, works well on phones and makes the next step easy for customers. A starter site is {starter-site}." },
    { q: "Can you build a bio page instead of Linktree?", a: "Yes. A custom bio page sits behind your Instagram and LinkedIn bio, on your brand and your own domain, with save to contacts, one-tap booking, a lead form and analytics. The founding rate is {bio-page}. See the Bio pages page for what's included." },
    { q: "How are you different from other AI consultants?", a: "I am an engineer who ships, not a commentator. I spent 12+ years building software, including six years on the UnitedHealthcare mobile app used by millions of members, where I was the security advocate on my team. Every project ends with something working in your business, a written scope and price agreed first, and a measured before and after." },
    { q: "How do you handle our business information during a project?", a: "Each project starts by agreeing what information is needed, who should have access and which tools are involved. Specific safeguards are agreed as part of the scope." },
    { q: "How will we know whether the work helped?", a: "Before starting we agree on what to measure, such as time spent on a task, response time, repeated questions or inquiries. After the change we compare and decide what to do next." },
    { q: "How much does it cost?", a: "Starting prices are on the Packages page: a data check-up is {data-checkup}, a team security workshop {team-workshop}, a quick-win automation {quick-win} and a starter website {starter-site}. We start with a call, and you get a written scope and price before any work begins." },
    { q: "Do you offer ongoing support?", a: "Yes. Monthly care plans run scheduled checks on your site, domain and search visibility, and I review the results and send a one-page update. Plans start {watch}." },
  ],

  contact: {
    eyebrow: "Contact",
    title: "Let's talk about your business.",
    body: "Book a call and tell me how your business works, what worries you and where your team gets stuck. We'll look for a practical place to start.",
  },
};

export type Content = typeof en;
