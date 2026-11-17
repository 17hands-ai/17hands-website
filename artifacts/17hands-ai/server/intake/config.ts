/**
 * Builds the intake API's dependencies from environment variables. Secrets are read here and
 * nowhere else. In production a missing variable is an error; only the Vite dev server may
 * fall back to stand-ins (memory storage, Cloudflare's public test key, email printed to the terminal).
 */
import type { IntakeDeps } from "./handlers.js";
import { MemoryStore } from "./memory-store.js";
import { supabaseStore, SUBMISSIONS_TABLE } from "./supabase-store.js";

type Env = Record<string, string | undefined>;

/** Cloudflare's published secret that passes every token. Pairs with the test site key the form uses in dev. */
const TURNSTILE_TEST_SECRET = "1x0000000000000000000000000000000AA";

const turnstileVerifier = (secret: string) => async (token: string, ip: string) => {
  const form = new URLSearchParams({ secret, response: token });
  if (ip !== "unknown") form.set("remoteip", ip);
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form });
  if (!response.ok) return false;
  return ((await response.json()) as { success?: boolean }).success === true;
};

/**
 * The email says a submission arrived, names the client and links to the row. Answers, contact
 * details and files stay in Supabase, behind the owner's own login.
 */
const resendNotifier =
  (options: { apiKey: string; from: string; to: string; urlTemplate: string }) =>
  async ({ id, fullName }: { id: string; fullName: string }) => {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${options.apiKey}`, "content-type": "application/json" },
      body: JSON.stringify({
        from: options.from,
        to: [options.to],
        subject: "New bio page intake",
        text: `${fullName} sent their bio page details.\n\nOpen the submission:\n${options.urlTemplate.replaceAll("{id}", id)}\n`,
      }),
    });
    if (!response.ok) throw new Error(`resend responded ${response.status}`);
  };

function required(env: Env, names: string[]) {
  const missing = names.filter((name) => !env[name]);
  if (missing.length) throw new Error(`bio-intake is not configured. Missing: ${missing.join(", ")}`);
}

const list = (value: string | undefined) => (value ?? "").split(",").map((v) => v.trim()).filter(Boolean);

let cached: IntakeDeps | undefined;

export function productionDeps(env: Env = process.env): IntakeDeps {
  if (cached) return cached;
  required(env, [
    "SUPABASE_URL",
    "SUPABASE_SERVICE_ROLE_KEY",
    "TURNSTILE_SECRET_KEY",
    "RESEND_API_KEY",
    "INTAKE_EMAIL_FROM",
    "INTAKE_NOTIFY_EMAIL",
    "INTAKE_SUBMISSION_URL_TEMPLATE",
    "INTAKE_SIGNING_SECRET",
  ]);
  if (env.INTAKE_SIGNING_SECRET!.length < 32) throw new Error("INTAKE_SIGNING_SECRET must be at least 32 characters.");
  // Vercel sets these per deployment, which lets the form work on preview URLs without extra setup.
  const deploymentOrigins = [env.VERCEL_URL, env.VERCEL_BRANCH_URL].filter(Boolean).map((host) => `https://${host}`);
  cached = {
    store: supabaseStore({
      url: env.SUPABASE_URL!,
      serviceKey: env.SUPABASE_SERVICE_ROLE_KEY!,
      bucket: env.SUPABASE_INTAKE_BUCKET || "bio-intake",
    }),
    verifyTurnstile: turnstileVerifier(env.TURNSTILE_SECRET_KEY!),
    notify: resendNotifier({
      apiKey: env.RESEND_API_KEY!,
      from: env.INTAKE_EMAIL_FROM!,
      to: env.INTAKE_NOTIFY_EMAIL!,
      urlTemplate: env.INTAKE_SUBMISSION_URL_TEMPLATE!,
    }),
    signingSecret: env.INTAKE_SIGNING_SECRET!,
    allowedOrigins: [...list(env.INTAKE_ALLOWED_ORIGINS || "https://17hands.ai"), ...deploymentOrigins],
  };
  return cached;
}

/**
 * Dependencies for `pnpm dev`. Each service is real when its keys are in .env and a stand-in
 * when they are not, so the form can be reviewed before any account exists.
 */
export function devDeps(env: Env, origins: string[], memory: MemoryStore): IntakeDeps {
  const hasSupabase = Boolean(env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY);
  const hasResend = Boolean(env.RESEND_API_KEY && env.INTAKE_EMAIL_FROM && env.INTAKE_NOTIFY_EMAIL);
  const urlTemplate = env.INTAKE_SUBMISSION_URL_TEMPLATE || `(set INTAKE_SUBMISSION_URL_TEMPLATE) ${SUBMISSIONS_TABLE} id {id}`;
  return {
    store: hasSupabase
      ? supabaseStore({ url: env.SUPABASE_URL!, serviceKey: env.SUPABASE_SERVICE_ROLE_KEY!, bucket: env.SUPABASE_INTAKE_BUCKET || "bio-intake" })
      : memory,
    verifyTurnstile: turnstileVerifier(env.TURNSTILE_SECRET_KEY || TURNSTILE_TEST_SECRET),
    notify: hasResend
      ? resendNotifier({ apiKey: env.RESEND_API_KEY!, from: env.INTAKE_EMAIL_FROM!, to: env.INTAKE_NOTIFY_EMAIL!, urlTemplate })
      : async ({ id, fullName }) => {
          console.log(`[bio-intake dev] email not sent (no Resend keys). Would say: ${fullName} sent their bio page details. Submission ${id}.`);
        },
    signingSecret: env.INTAKE_SIGNING_SECRET || "dev-only-signing-secret-not-for-production",
    allowedOrigins: origins,
  };
}

export const devServices = (env: Env) => ({
  storage: env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY ? "Supabase" : "memory (lost on restart)",
  turnstile: env.TURNSTILE_SECRET_KEY ? "your Turnstile keys" : "Cloudflare test keys",
  email: env.RESEND_API_KEY && env.INTAKE_EMAIL_FROM && env.INTAKE_NOTIFY_EMAIL ? "Resend" : "printed to this terminal",
});
