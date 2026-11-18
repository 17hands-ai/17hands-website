/**
 * Bio page intake: the one definition of what a submission may contain.
 * The form (src/pages/BioPagesStart.tsx) uses it for inline errors; the API
 * (server/intake) runs it again and is the only check that counts.
 *
 * Imported by Vercel functions, so it must stay free of path aliases and browser APIs.
 */
import { z } from "zod";

/** Effective date of the privacy policy a client agrees to. Stored with each submission. */
export const PRIVACY_POLICY_VERSION = "2026-11-17";

export const MAX_LINKS = 8;
export const ABOUT_MAX = 500;
export const MAX_FILE_BYTES = 5 * 1024 * 1024;

export const FILE_EXTENSIONS = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/svg+xml": "svg",
} as const;
export type FileMime = keyof typeof FILE_EXTENSIONS;
export type FileExtension = (typeof FILE_EXTENSIONS)[FileMime];
export type FileSlot = "headshot" | "logo";

/** A photo of a person has no reason to be a vector, so SVG is accepted for the logo only. */
export const SLOT_TYPES = {
  headshot: ["image/jpeg", "image/png", "image/webp"],
  logo: ["image/jpeg", "image/png", "image/webp", "image/svg+xml"],
} as const satisfies Record<FileSlot, readonly FileMime[]>;

export const DOMAIN_CHOICES = ["own", "buy", "subdomain"] as const;
export type DomainChoice = (typeof DOMAIN_CHOICES)[number];

// Control characters have no place in any field; `about` alone may contain line breaks.
const SINGLE_LINE = /^[^\u0000-\u001F\u007F]*$/;
const MULTI_LINE = /^[^\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]*$/;

const line = (max: number, label: string) =>
  z
    .string({ required_error: `Enter ${label}.` })
    .trim()
    .min(1, `Enter ${label}.`)
    .max(max, `Keep this under ${max} characters.`)
    .regex(SINGLE_LINE, "Remove line breaks or unusual characters.");

/** Blank optional inputs arrive as "", which should mean "not given" and not "invalid". */
const blankable = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((v) => (typeof v === "string" && v.trim() === "" ? undefined : v), schema.optional());

const email = (label: string) =>
  z
    .string({ required_error: `Enter ${label}.` })
    .trim()
    .min(1, `Enter ${label}.`)
    .max(254, "That email address is too long.")
    .email("Enter a valid email address, like name@example.com.");

const isHttpUrl = (value: string) => {
  try {
    const url = new URL(value);
    return (url.protocol === "https:" || url.protocol === "http:") && url.hostname.includes(".") && !url.username && !url.password;
  } catch {
    return false;
  }
};

const httpUrl = z
  .string({ required_error: "Enter a web address." })
  .trim()
  .min(1, "Enter a web address.")
  .max(2048, "That web address is too long.")
  .refine(isHttpUrl, "Enter a full web address, like https://example.com.");

const DOMAIN = /^(?!-)(?:[a-z0-9-]{1,63}\.)+[a-z]{2,63}$/i;

const consent = (message: string) => z.literal(true, { errorMap: () => ({ message }) });

const fields = {
  fullName: line(120, "your full name"),
  businessName: line(160, "your business name"),
  about: z
    .string({ required_error: "Tell us about your business in two or three sentences." })
    .trim()
    .min(1, "Tell us about your business in two or three sentences.")
    .max(ABOUT_MAX, `Keep this under ${ABOUT_MAX} characters.`)
    .regex(MULTI_LINE, "Remove unusual characters."),
  email: email("your email address"),
  phone: z
    .string({ required_error: "Enter your phone number." })
    .trim()
    .min(1, "Enter your phone number.")
    .max(32, "That phone number is too long.")
    .regex(/^\+?[0-9 ().\-]+$/, "Use digits, spaces and + ( ) - only.")
    .refine((v) => {
      const digits = v.replace(/\D/g, "").length;
      return digits >= 7 && digits <= 15;
    }, "Enter a full phone number, including area code."),
  /** Where the bio page's contact form sends inquiries. Empty means the same as `email`. */
  inquiryEmail: blankable(email("an email address")),
  brandColors: blankable(line(300, "your brand colors")),
  brandFonts: blankable(line(300, "your brand fonts")),
  links: z
    .array(z.object({ label: line(60, "a label"), url: httpUrl }))
    .min(1, "Add at least one link.")
    .max(MAX_LINKS, `You can add up to ${MAX_LINKS} links.`),
  bookingUrl: blankable(httpUrl),
  domainChoice: z.enum(DOMAIN_CHOICES, { errorMap: () => ({ message: "Choose a domain option." }) }),
  ownDomain: blankable(z.string().trim().max(253, "That domain is too long.")),
  socialHandles: blankable(line(500, "your social handles")),
  consents: z.object({
    privacy: consent("Please confirm you have read the Privacy Policy."),
    founding: consent("Please agree to the founding client terms."),
    assets: consent("Please give permission to use your photo and logo."),
  }),
};

/** A domain is only required, and only kept, when the client says they own one. */
const domainRule = <T extends { domainChoice: DomainChoice; ownDomain?: string }>(value: T, ctx: z.RefinementCtx) => {
  if (value.domainChoice !== "own") return;
  if (!value.ownDomain) ctx.addIssue({ code: "custom", path: ["ownDomain"], message: "Enter the domain you own." });
  else if (!DOMAIN.test(value.ownDomain))
    ctx.addIssue({ code: "custom", path: ["ownDomain"], message: "Enter just the domain, like example.com." });
};
const dropUnusedDomain = <T extends { domainChoice: DomainChoice; ownDomain?: string }>(value: T): T =>
  value.domainChoice === "own" ? value : { ...value, ownDomain: undefined };

const fileDeclaration = (slot: FileSlot) =>
  z.object({
    type: z.enum(SLOT_TYPES[slot] as unknown as [FileMime, ...FileMime[]], {
      errorMap: () => ({
        message: slot === "logo" ? "Use a JPG, PNG, WebP or SVG file." : "Use a JPG, PNG or WebP file.",
      }),
    }),
    size: z
      .number()
      .int()
      .positive("That file is empty.")
      .max(MAX_FILE_BYTES, "That file is over 5 MB. Please send a smaller one."),
  });

/** What the form itself checks: the answers, before any token or file exists. */
export const fieldsSchema = z.object(fields).superRefine(domainRule).transform(dropUnusedDomain);

/** Step 1: the answers, the spam check and a description of the files about to be uploaded. */
export const startSchema = z
  .object({
    ...fields,
    turnstileToken: z.string({ required_error: "Complete the spam check." }).min(1, "Complete the spam check.").max(4096),
    files: z.object({
      headshot: fileDeclaration("headshot"),
      logo: fileDeclaration("logo").optional(),
    }),
  })
  .superRefine(domainRule)
  .transform(dropUnusedDomain);

/** Step 2: the answers again, with the token that step 1 issued for the uploaded files. */
export const submitSchema = z
  .object({ ...fields, uploadToken: z.string().min(1).max(4096) })
  .superRefine(domainRule)
  .transform(dropUnusedDomain);

export type IntakeFields = z.infer<typeof fieldsSchema>;
export type StartInput = z.infer<typeof startSchema>;
export type SubmitInput = z.infer<typeof submitSchema>;

/** First message per field, keyed by dotted path ("links.0.url"), for showing next to inputs. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".");
    if (!(key in out)) out[key] = issue.message;
  }
  return out;
}
