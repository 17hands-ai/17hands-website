import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ArrowDown, ArrowRight, ArrowUp, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT_EMAIL } from "@/lib/site";
import {
  ABOUT_MAX,
  MAX_FILE_BYTES,
  MAX_LINKS,
  SLOT_TYPES,
  fieldErrors,
  fieldsSchema,
  type DomainChoice,
  type FileSlot,
} from "@/lib/intake/schema";

/**
 * Intake form for bio page clients. The checks here only make the form pleasant to fill in;
 * the API (server/intake) repeats every one of them and is the check that counts.
 */

/** Cloudflare's published key that always passes, so the form works in `pnpm dev` before real keys exist. */
const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";
const TURNSTILE_SITE_KEY: string =
  import.meta.env.VITE_TURNSTILE_SITE_KEY || (import.meta.env.DEV ? TURNSTILE_TEST_SITE_KEY : "");
const TURNSTILE_SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

declare global {
  interface Window {
    turnstile?: {
      render(el: HTMLElement, options: Record<string, unknown>): string;
      reset(id?: string): void;
      remove(id: string): void;
    };
  }
}

interface LinkRow {
  /** Stable React key, so a row keeps its inputs and focus when it moves. */
  key: number;
  label: string;
  url: string;
}

interface FormState {
  fullName: string;
  businessName: string;
  about: string;
  email: string;
  phone: string;
  inquiryEmail: string;
  brandColors: string;
  brandFonts: string;
  bookingUrl: string;
  domainChoice: DomainChoice | "";
  ownDomain: string;
  socialHandles: string;
  consents: { privacy: boolean; founding: boolean; assets: boolean };
  /** Honeypot. Hidden from people; anything in it marks the sender as a bot. */
  website: string;
}

const EMPTY: FormState = {
  fullName: "", businessName: "", about: "", email: "", phone: "", inquiryEmail: "", brandColors: "", brandFonts: "",
  bookingUrl: "", domainChoice: "", ownDomain: "", socialHandles: "",
  consents: { privacy: false, founding: false, assets: false },
  website: "",
};

type Errors = Record<string, string>;
type Stage = "idle" | "checking" | "uploading" | "saving" | "done";

const STAGE_TEXT: Record<Stage, string> = {
  idle: "",
  checking: "Checking your answers.",
  uploading: "Uploading your files. Large photos can take a moment.",
  saving: "Saving your details.",
  done: "",
};

/** People type "example.com"; the schema wants a full address. */
const withScheme = (value: string) => {
  const trimmed = value.trim();
  return trimmed && !/^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed) ? `https://${trimmed}` : trimmed;
};

const FIELD_ORDER = [
  "fullName", "businessName", "about", "email", "phone", "inquiryEmail", "headshot", "logo", "brandColors", "brandFonts",
  "links", "bookingUrl", "socialHandles", "domainChoice", "ownDomain", "consents", "turnstileToken",
];

const fieldId = (key: string) => `f-${key.replaceAll(".", "-")}`;

const megabytes = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;

function fileProblem(slot: FileSlot, file: File | null): string | null {
  if (!file) return slot === "headshot" ? "Add a headshot or photo." : null;
  if (!(SLOT_TYPES[slot] as readonly string[]).includes(file.type)) {
    return slot === "logo" ? "Use a JPG, PNG, WebP or SVG file." : "Use a JPG, PNG or WebP file.";
  }
  if (file.size > MAX_FILE_BYTES) return `That file is ${megabytes(file.size)}. The limit is 5 MB.`;
  return null;
}

const control =
  "w-full rounded-[var(--radius-button)] border border-white/20 bg-[var(--brand-surface)] px-4 py-3 text-base text-[var(--brand-text)] placeholder:text-[var(--brand-text-2)]/60 transition-colors hover:border-white/35 focus-visible:border-[var(--brand-rose)] aria-[invalid=true]:border-[var(--brand-error)]";

const smallButton =
  "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-button)] border border-white/20 text-[var(--brand-text)] transition-colors hover:border-[var(--brand-rose)] hover:bg-white/5 disabled:opacity-35 disabled:hover:border-white/20 disabled:hover:bg-transparent";

interface ControlProps {
  id: string;
  "aria-invalid": boolean;
  "aria-describedby": string | undefined;
}

function Field({
  name,
  label,
  hint,
  error,
  optional,
  children,
}: {
  name: string;
  label: string;
  hint?: ReactNode;
  error?: string;
  optional?: boolean;
  children: (props: ControlProps) => ReactNode;
}) {
  const id = fieldId(name);
  const describedBy = [hint ? `${id}-hint` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-semibold text-[var(--brand-text)]">
        {label}
        {optional && <span className="ml-2 font-normal text-sm text-[var(--brand-text-2)]">optional</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mb-2 text-sm leading-relaxed text-[var(--brand-text-2)]">
          {hint}
        </p>
      )}
      {children({ id, "aria-invalid": Boolean(error), "aria-describedby": describedBy })}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm font-medium text-[var(--brand-error)]">
      {message}
    </p>
  );
}

function Section({ number, title, intro, children }: { number: string; title: string; intro?: string; children: ReactNode }) {
  const id = useId();
  return (
    <section aria-labelledby={id} className="border-t border-[var(--brand-rose)]/40 pt-8">
      <p className="font-mono text-sm rose-text mb-2" aria-hidden="true">{number}</p>
      <h2 id={id} className="display text-2xl md:text-3xl text-[var(--brand-text)] mb-2">{title}</h2>
      {intro && <p className="text-[var(--brand-text-2)] leading-relaxed">{intro}</p>}
      <div className="mt-8 space-y-7">{children}</div>
    </section>
  );
}

function FilePicker({
  slot,
  label,
  hint,
  optional,
  file,
  error,
  onPick,
}: {
  slot: FileSlot;
  label: string;
  hint: string;
  optional?: boolean;
  file: File | null;
  error?: string;
  onPick: (file: File | null) => void;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  useEffect(() => {
    // SVG is shown by name only: it is the one type that can run code, and it has not been checked yet.
    if (!file || file.type === "image/svg+xml" || !file.type.startsWith("image/")) return setPreview(null);
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <Field name={slot} label={label} hint={hint} optional={optional} error={error}>
      {(props) => (
        <div className="flex items-center gap-4">
          {preview && <img src={preview} alt="" className="h-16 w-16 shrink-0 rounded-[var(--radius-button)] object-cover" />}
          <div className="min-w-0 flex-1">
            <input
              {...props}
              type="file"
              accept={SLOT_TYPES[slot].join(",")}
              onChange={(e) => onPick(e.target.files?.[0] ?? null)}
              className={cn(
                control,
                "cursor-pointer py-2.5 text-sm file:mr-4 file:cursor-pointer file:rounded-[var(--radius-badge)] file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[var(--brand-text)]",
              )}
            />
            {file && !error && <p className="mt-2 text-sm text-[var(--brand-text-2)]">{megabytes(file.size)}</p>}
          </div>
        </div>
      )}
    </Field>
  );
}

function Turnstile({ onToken, resetSignal }: { onToken: (token: string) => void; resetSignal: number }) {
  const holder = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const render = () => {
      if (cancelled || !holder.current || !window.turnstile || widget.current) return;
      widget.current = window.turnstile.render(holder.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: document.documentElement.dataset.theme === "light" ? "light" : "dark",
        callback: (token: string) => onToken(token),
        "expired-callback": () => onToken(""),
        "error-callback": () => onToken(""),
      });
    };
    if (window.turnstile) render();
    else {
      let script = document.querySelector<HTMLScriptElement>(`script[src="${TURNSTILE_SCRIPT}"]`);
      if (!script) {
        script = document.createElement("script");
        script.src = TURNSTILE_SCRIPT;
        script.async = true;
        document.head.appendChild(script);
      }
      script.addEventListener("load", render);
      script.addEventListener("error", () => setFailed(true));
    }
    return () => {
      cancelled = true;
      if (widget.current) window.turnstile?.remove(widget.current);
      widget.current = null;
    };
    // The widget is created once; onToken is a state setter and never changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // A token is good for one request, so every failed attempt needs a fresh one.
  useEffect(() => {
    if (resetSignal && widget.current) window.turnstile?.reset(widget.current);
  }, [resetSignal]);

  return (
    <div>
      <div ref={holder} className="min-h-[65px]" />
      {failed && (
        <p className="mt-2 text-sm text-[var(--brand-error)]">
          The spam check could not load. Turn off any content blocker for this page and reload.
        </p>
      )}
    </div>
  );
}

export default function BioPagesStart() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [links, setLinks] = useState<LinkRow[]>([{ key: 0, label: "", url: "" }]);
  const nextKey = useRef(1);
  const [files, setFiles] = useState<Record<FileSlot, File | null>>({ headshot: null, logo: null });
  const [token, setToken] = useState("");
  const [turnstileReset, setTurnstileReset] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [stage, setStage] = useState<Stage>("idle");
  const [announcement, setAnnouncement] = useState("");
  const [failures, setFailures] = useState(0);
  const summary = useRef<HTMLDivElement>(null);
  const doneHeading = useRef<HTMLHeadingElement>(null);
  const busy = stage !== "idle" && stage !== "done";

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => ({ ...f, [key]: value }));
  const text = (key: Exclude<keyof FormState, "consents" | "domainChoice">) => ({
    value: form[key],
    onChange: (e: { target: { value: string } }) => set(key, e.target.value),
  });
  const updateLink = (key: number, patch: Partial<LinkRow>) => setLinks((rows) => rows.map((r) => (r.key === key ? { ...r, ...patch } : r)));
  const moveLink = (index: number, by: -1 | 1) => {
    setLinks((rows) => {
      const next = [...rows];
      [next[index], next[index + by]] = [next[index + by], next[index]];
      return next;
    });
    setAnnouncement(`${links[index].label || "Link"} moved to position ${index + by + 1} of ${links.length}.`);
  };

  useEffect(() => {
    if (stage === "done") {
      window.scrollTo(0, 0);
      doneHeading.current?.focus();
    }
  }, [stage]);

  const answers = () => ({
    ...form,
    links: links.map(({ label, url }) => ({ label, url: withScheme(url) })),
    bookingUrl: withScheme(form.bookingUrl),
  });

  function fail(found: Errors, message = "") {
    setErrors(found);
    setFormError(message);
    setStage("idle");
    setFailures((n) => n + 1);
  }
  // Move focus to the error summary once it has rendered, so it is read out and scrolled into view.
  useEffect(() => {
    if (failures) summary.current?.focus();
  }, [failures]);

  /** The API reports file problems under the schema's path; the form shows them on the file input. */
  const fromServer = (fields: Errors = {}) =>
    Object.fromEntries(
      Object.entries(fields).map(([key, message]) => [key.replace(/^files\.(headshot|logo)(\..*)?$/, "$1"), message]),
    );

  async function post(path: string, body: unknown) {
    const response = await fetch(`/api/bio-intake/${path}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await response.json().catch(() => ({}))) as {
      ok?: boolean;
      done?: boolean;
      message?: string;
      fields?: Errors;
      uploads?: Partial<Record<FileSlot, { url: string }>>;
      uploadToken?: string;
    };
    return { response, data };
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    const payload = answers();
    const parsed = fieldsSchema.safeParse(payload);
    const found: Errors = parsed.success ? {} : fieldErrors(parsed.error);
    for (const slot of ["headshot", "logo"] as const) {
      const problem = fileProblem(slot, files[slot]);
      if (problem) found[slot] = problem;
    }
    if (!token) found.turnstileToken = "Complete the spam check.";
    if (Object.keys(found).length) return fail(found);

    setErrors({});
    setFormError("");
    setStage("checking");
    const retry = (fields: Errors | undefined, message: string) => {
      setToken("");
      setTurnstileReset((n) => n + 1);
      fail(fromServer(fields), message);
    };
    const genericError = `Something went wrong. Please try again, or email ${CONTACT_EMAIL}.`;

    try {
      const started = await post("start", {
        ...payload,
        turnstileToken: token,
        files: {
          headshot: { type: files.headshot!.type, size: files.headshot!.size },
          ...(files.logo ? { logo: { type: files.logo.type, size: files.logo.size } } : {}),
        },
      });
      if (!started.response.ok || !started.data.ok) return retry(started.data.fields, started.data.message ?? genericError);
      if (started.data.done) return setStage("done");

      setStage("uploading");
      for (const slot of ["headshot", "logo"] as const) {
        const file = files[slot];
        const target = started.data.uploads?.[slot];
        if (!file || !target) continue;
        const uploaded = await fetch(target.url, {
          method: "PUT",
          headers: { "content-type": file.type, "x-upsert": "false" },
          body: file,
        });
        if (!uploaded.ok) {
          return retry({ [slot]: "This file did not upload. Please try again." }, "A file did not upload. Check your connection and try again.");
        }
      }

      setStage("saving");
      const saved = await post("submit", { ...payload, uploadToken: started.data.uploadToken });
      if (!saved.response.ok || !saved.data.ok) return retry(saved.data.fields, saved.data.message ?? genericError);
      setStage("done");
    } catch {
      retry(undefined, `We couldn't reach the server. Check your connection and try again, or email ${CONTACT_EMAIL}.`);
    }
  }

  if (stage === "done") {
    return (
      <div className="pt-36 pb-24 md:pt-44">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
          <p className="eyebrow mb-6">Details received</p>
          <h1 ref={doneHeading} tabIndex={-1} className="display text-4xl md:text-5xl text-[var(--brand-text)] mb-8 focus:outline-none">
            Thank you. <span className="rose-text">Here's what happens next.</span>
          </h1>
          <p className="text-lg text-[var(--brand-text-2)] leading-relaxed mb-10">
            Your page is delivered within 5 business days, including one round of revisions. A confirmation email is
            on its way to you. If it does not arrive, check your spam folder.
          </p>
          <ol className="space-y-8">
            {[
              ["We build your page", "We review what you sent and email you if anything is missing."],
              ["You get a preview link", "A private link to your page, so you can try it on your own phone before anyone else sees it."],
              ["One round of revisions", "Tell us what to change. One round of revisions is included."],
              ["Go live", "We connect your domain, and after 30 days you get your numbers."],
            ].map(([name, body], i) => (
              <li key={name} className="border-t border-[var(--brand-rose)]/40 pt-5">
                <p className="font-mono text-sm rose-text mb-2" aria-hidden="true">0{i + 1}</p>
                <h2 className="font-sans text-xl font-semibold text-[var(--brand-text)] mb-1">{name}</h2>
                <p className="text-[var(--brand-text-2)] leading-relaxed">{body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-12 text-[var(--brand-text-2)] leading-relaxed">
            Need to change something you sent? Email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="rose-text underline underline-offset-4">{CONTACT_EMAIL}</a>.
          </p>
        </div>
      </div>
    );
  }

  // Listed in the order the fields appear, with link errors saying which link they belong to.
  const position = (key: string) => FIELD_ORDER.indexOf(key.split(".")[0]);
  const errorList = Object.entries(errors)
    .sort(([a], [b]) => position(a) - position(b) || a.localeCompare(b, undefined, { numeric: true }))
    .map(([key, message]): [string, string] => {
      const link = /^links\.(\d+)\./.exec(key);
      return [key, link ? `Link ${Number(link[1]) + 1}: ${message}` : message];
    });

  return (
    <div className="pt-36 pb-24 md:pt-44">
      <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
        <p className="eyebrow mb-6">Bio pages · founding clients</p>
        <h1 className="display text-4xl md:text-5xl text-[var(--brand-text)] mb-6">
          Send me what goes <span className="rose-text">on your page.</span>
        </h1>
        <p className="text-lg text-[var(--brand-text-2)] leading-relaxed mb-12">
          About ten minutes. Have your photo, your logo if you have one, and the links you want ready. Everything here
          is used to build your page and nothing else.
        </p>

        {!TURNSTILE_SITE_KEY ? (
          <p role="alert" className="rounded-[var(--radius-card)] border border-[var(--brand-error)] p-5 text-[var(--brand-text)]">
            This form isn't available right now. Please email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="rose-text underline underline-offset-4">{CONTACT_EMAIL}</a> and
            I'll collect your details another way.
          </p>
        ) : (
          <form onSubmit={onSubmit} noValidate className="space-y-14">
            {(errorList.length > 0 || formError) && (
              <div
                ref={summary}
                tabIndex={-1}
                role="alert"
                className="rounded-[var(--radius-card)] border border-[var(--brand-error)] p-5 focus:outline-none"
              >
                <h2 className="font-sans text-lg font-semibold text-[var(--brand-text)]">
                  {errorList.length > 0
                    ? `${errorList.length === 1 ? "One answer needs" : `${errorList.length} answers need`} another look`
                    : "That didn't go through"}
                </h2>
                {formError && <p className="mt-2 text-[var(--brand-text-2)]">{formError}</p>}
                {errorList.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {errorList.map(([key, message]) => (
                      <li key={key}>
                        <a
                          href={`#${fieldId(key)}`}
                          onClick={(e) => {
                            e.preventDefault();
                            const target = document.getElementById(fieldId(key));
                            target?.scrollIntoView({ block: "center" });
                            target?.focus({ preventScroll: true });
                          }}
                          className="text-[var(--brand-error)] underline underline-offset-4"
                        >
                          {message}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <Section number="01" title="You and your business">
              <Field name="fullName" label="Full name" error={errors.fullName}>
                {(p) => <input {...p} {...text("fullName")} type="text" autoComplete="name" required maxLength={120} className={control} />}
              </Field>
              <Field name="businessName" label="Business name" error={errors.businessName}>
                {(p) => <input {...p} {...text("businessName")} type="text" autoComplete="organization" required maxLength={160} className={control} />}
              </Field>
              <Field
                name="about"
                label="About your business"
                hint={`Two or three sentences: who you help and what you do for them. ${form.about.length} of ${ABOUT_MAX} characters.`}
                error={errors.about}
              >
                {(p) => <textarea {...p} {...text("about")} required rows={5} maxLength={ABOUT_MAX} className={cn(control, "resize-y")} />}
              </Field>
              <div className="grid gap-7 sm:grid-cols-2">
                <Field name="email" label="Email" error={errors.email}>
                  {(p) => <input {...p} {...text("email")} type="email" autoComplete="email" inputMode="email" required maxLength={254} className={control} />}
                </Field>
                <Field name="phone" label="Phone" error={errors.phone}>
                  {(p) => <input {...p} {...text("phone")} type="tel" autoComplete="tel" inputMode="tel" required maxLength={32} className={control} />}
                </Field>
              </div>
              <Field
                name="inquiryEmail"
                label="Email for contact form inquiries"
                hint="Where messages from your page's contact form should go. Leave blank to use the email above."
                optional
                error={errors.inquiryEmail}
              >
                {(p) => <input {...p} {...text("inquiryEmail")} type="email" inputMode="email" maxLength={254} placeholder={form.email || undefined} className={control} />}
              </Field>
            </Section>

            <Section number="02" title="Your photo and brand">
              <FilePicker
                slot="headshot"
                label="Headshot or photo"
                hint="JPG, PNG or WebP, up to 5 MB. A clear photo of you works best."
                file={files.headshot}
                error={errors.headshot}
                onPick={(file) => setFiles((f) => ({ ...f, headshot: file }))}
              />
              <FilePicker
                slot="logo"
                label="Logo"
                hint="JPG, PNG, WebP or SVG, up to 5 MB."
                optional
                file={files.logo}
                error={errors.logo}
                onPick={(file) => setFiles((f) => ({ ...f, logo: file }))}
              />
              <Field name="brandColors" label="Brand colors" hint="Color names or hex codes, if you have them." optional error={errors.brandColors}>
                {(p) => <input {...p} {...text("brandColors")} type="text" maxLength={300} placeholder="Navy #1B2A49, warm white" className={control} />}
              </Field>
              <Field name="brandFonts" label="Brand fonts" optional error={errors.brandFonts}>
                {(p) => <input {...p} {...text("brandFonts")} type="text" maxLength={300} placeholder="Playfair Display for headings" className={control} />}
              </Field>
            </Section>

            <Section
              number="03"
              title="Your links"
              intro={`Up to ${MAX_LINKS}, in the order you want them on the page. Put what brings you business first.`}
            >
              <fieldset aria-describedby={errors.links ? `${fieldId("links")}-error` : undefined}>
                <legend className="sr-only">Links for your page, in order</legend>
                <ol id={fieldId("links")} tabIndex={-1} className="space-y-5 focus:outline-none">
                  {links.map((link, i) => (
                    <li key={link.key} className="flex gap-3">
                      <span className="mt-3 w-6 shrink-0 font-mono text-sm rose-text" aria-hidden="true">{i + 1}</span>
                      <div className="min-w-0 flex-1 space-y-3">
                        <div>
                          <label htmlFor={fieldId(`links.${i}.label`)} className="sr-only">Link {i + 1} label</label>
                          <input
                            id={fieldId(`links.${i}.label`)}
                            value={link.label}
                            onChange={(e) => updateLink(link.key, { label: e.target.value })}
                            type="text"
                            maxLength={60}
                            placeholder="Label, like Book a showing"
                            aria-invalid={Boolean(errors[`links.${i}.label`])}
                            aria-describedby={errors[`links.${i}.label`] ? `${fieldId(`links.${i}.label`)}-error` : undefined}
                            className={control}
                          />
                          <FieldError id={`${fieldId(`links.${i}.label`)}-error`} message={errors[`links.${i}.label`]} />
                        </div>
                        <div>
                          <label htmlFor={fieldId(`links.${i}.url`)} className="sr-only">Link {i + 1} web address</label>
                          <input
                            id={fieldId(`links.${i}.url`)}
                            value={link.url}
                            onChange={(e) => updateLink(link.key, { url: e.target.value })}
                            onBlur={(e) => updateLink(link.key, { url: withScheme(e.target.value) })}
                            type="url"
                            inputMode="url"
                            autoCapitalize="none"
                            maxLength={2048}
                            placeholder="https://"
                            aria-invalid={Boolean(errors[`links.${i}.url`])}
                            aria-describedby={errors[`links.${i}.url`] ? `${fieldId(`links.${i}.url`)}-error` : undefined}
                            className={control}
                          />
                          <FieldError id={`${fieldId(`links.${i}.url`)}-error`} message={errors[`links.${i}.url`]} />
                        </div>
                        <div className="flex gap-2">
                          <button type="button" className={smallButton} disabled={i === 0} onClick={() => moveLink(i, -1)} aria-label={`Move link ${i + 1} up`}>
                            <ArrowUp size={18} aria-hidden="true" />
                          </button>
                          <button type="button" className={smallButton} disabled={i === links.length - 1} onClick={() => moveLink(i, 1)} aria-label={`Move link ${i + 1} down`}>
                            <ArrowDown size={18} aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            className={smallButton}
                            disabled={links.length === 1}
                            onClick={() => {
                              setLinks((rows) => rows.filter((r) => r.key !== link.key));
                              setAnnouncement(`Link ${i + 1} removed.`);
                            }}
                            aria-label={`Remove link ${i + 1}`}
                          >
                            <X size={18} aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
                <FieldError id={`${fieldId("links")}-error`} message={errors.links} />
                <button
                  type="button"
                  disabled={links.length >= MAX_LINKS}
                  onClick={() => {
                    setLinks((rows) => [...rows, { key: nextKey.current++, label: "", url: "" }]);
                    setAnnouncement(`Link ${links.length + 1} added.`);
                  }}
                  className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-button)] border border-white/20 px-4 font-semibold text-[var(--brand-text)] transition-colors hover:border-[var(--brand-rose)] hover:bg-white/5 disabled:opacity-40"
                >
                  <Plus size={18} aria-hidden="true" />
                  {links.length >= MAX_LINKS ? `${MAX_LINKS} links is the limit` : "Add another link"}
                </button>
                <p aria-live="polite" className="sr-only">{announcement}</p>
              </fieldset>
              <Field
                name="bookingUrl"
                label="Booking link"
                hint="Calendly, cal.com, Square or similar, if clients book you online."
                optional
                error={errors.bookingUrl}
              >
                {(p) => (
                  <input
                    {...p}
                    {...text("bookingUrl")}
                    onBlur={(e) => set("bookingUrl", withScheme(e.target.value))}
                    type="url"
                    inputMode="url"
                    autoCapitalize="none"
                    maxLength={2048}
                    placeholder="https://"
                    className={control}
                  />
                )}
              </Field>
              <Field
                name="socialHandles"
                label="Where will you post the link?"
                hint="Your social handles, like Instagram @yourname or your LinkedIn page."
                optional
                error={errors.socialHandles}
              >
                {(p) => <input {...p} {...text("socialHandles")} type="text" autoCapitalize="none" maxLength={500} className={control} />}
              </Field>
            </Section>

            <Section
              number="04"
              title="Your domain"
              intro="A domain is your page's address on the internet, like a street address for a house. It is what people type or tap to open your page. Pick the one that fits you."
            >
              <fieldset aria-describedby={errors.domainChoice ? `${fieldId("domainChoice")}-error` : undefined}>
                <legend className="sr-only">Domain choice</legend>
                <div id={fieldId("domainChoice")} tabIndex={-1} className="space-y-3 focus:outline-none">
                  {(
                    [
                      [
                        "own",
                        "I already have a domain",
                        "You already bought an address for your business. We send you short instructions to connect it to your new page.",
                        "mariasbakery.com",
                      ],
                      [
                        "buy",
                        "I want my own domain",
                        "A new address with only your name in it. It costs about $12 a year, paid to the company that sells domains, and it is registered in your name, so it belongs to you. We help you pick one and set it up.",
                        "mariasbakery.com",
                      ],
                      [
                        "subdomain",
                        "Give me a free address",
                        "We give you an address that ends in 17hands.ai. Nothing to buy and nothing to renew. We set it up for you.",
                        "mariasbakery.17hands.ai",
                      ],
                    ] as const
                  ).map(([value, name, body, example]) => (
                    <label
                      key={value}
                      className="flex cursor-pointer gap-4 rounded-[var(--radius-button)] border border-white/20 p-4 transition-colors hover:border-white/35 has-[:checked]:border-[var(--brand-rose)] has-[:checked]:bg-white/5"
                    >
                      <input
                        type="radio"
                        name="domainChoice"
                        value={value}
                        checked={form.domainChoice === value}
                        onChange={() => set("domainChoice", value)}
                        className="mt-1 h-5 w-5 shrink-0 accent-[var(--brand-amethyst)]"
                      />
                      <span>
                        <span className="block font-semibold text-[var(--brand-text)]">{name}</span>
                        <span className="block text-sm leading-relaxed text-[var(--brand-text-2)]">{body}</span>
                        <span className="mt-2 block text-sm text-[var(--brand-text-2)]">
                          Example: <span className="font-mono text-[var(--brand-text)]">{example}</span>
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
                <FieldError id={`${fieldId("domainChoice")}-error`} message={errors.domainChoice} />
              </fieldset>
              {form.domainChoice === "own" && (
                <Field name="ownDomain" label="Your domain" hint="Type the address you own, like mariasbakery.com." error={errors.ownDomain}>
                  {(p) => <input {...p} {...text("ownDomain")} type="text" inputMode="url" autoCapitalize="none" autoComplete="off" required maxLength={253} placeholder="mariasbakery.com" className={control} />}
                </Field>
              )}
            </Section>

            <Section number="05" title="Agreements">
              {(
                [
                  [
                    "privacy",
                    <>
                      I've read the{" "}
                      <a href="/privacy" target="_blank" rel="noopener" className="rose-text underline underline-offset-4">
                        Privacy Policy<span className="sr-only"> (opens in a new tab)</span>
                      </a>
                      .
                    </>,
                  ],
                  [
                    "founding",
                    "Founding client terms: I agree 17hands may show my page as an example, I'll provide a short testimonial, and I'll share my 30-day numbers.",
                  ],
                  ["assets", "I give 17hands permission to use the photo and logo I upload to build my page."],
                ] as const
              ).map(([key, label]) => {
                const id = fieldId(`consents.${key}`);
                const error = errors[`consents.${key}`];
                return (
                  <div key={key}>
                    <div className="flex gap-4">
                      <input
                        id={id}
                        type="checkbox"
                        checked={form.consents[key]}
                        onChange={(e) => set("consents", { ...form.consents, [key]: e.target.checked })}
                        required
                        aria-invalid={Boolean(error)}
                        aria-describedby={error ? `${id}-error` : undefined}
                        className="mt-1 h-5 w-5 shrink-0 accent-[var(--brand-amethyst)]"
                      />
                      <label htmlFor={id} className="leading-relaxed text-[var(--brand-text)]">{label}</label>
                    </div>
                    <FieldError id={`${id}-error`} message={error} />
                  </div>
                );
              })}
            </Section>

            {/* Honeypot: off-screen and out of the tab order and accessibility tree. People never fill it. */}
            <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" {...text("website")} />
            </div>

            <div className="border-t border-white/15 pt-8">
              <div id={fieldId("turnstileToken")} tabIndex={-1} className="focus:outline-none">
                <Turnstile onToken={setToken} resetSignal={turnstileReset} />
                <FieldError id={`${fieldId("turnstileToken")}-error`} message={errors.turnstileToken} />
              </div>
              <button
                type="submit"
                disabled={busy}
                className="on-accent mt-6 inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-[var(--radius-cta)] bg-[var(--brand-amethyst)] px-7 text-base font-semibold italic tracking-wide text-white shadow-[0_6px_24px_-8px_rgba(121,40,202,0.7)] transition-[background-color,box-shadow,transform] duration-200 hover:bg-[#8a3ae0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-rose)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-canvas)] active:translate-y-px disabled:opacity-60 sm:w-auto"
              >
                {busy ? "Sending" : "Send my details"} <ArrowRight size={18} aria-hidden="true" />
              </button>
              <p aria-live="polite" className="mt-4 min-h-6 text-sm text-[var(--brand-text-2)]">{STAGE_TEXT[stage]}</p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
