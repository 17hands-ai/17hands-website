import { beforeEach, describe, expect, it, vi } from "vitest";
import { handleStart, handleSubmit, type IntakeDeps } from "./handlers.js";
import { MemoryStore } from "./memory-store.js";
import { JPEG, PNG, SVG, validFields } from "./fixtures.js";

const ORIGIN = "https://17hands.ai";
const SECRET = "test-signing-secret-of-sufficient-length";

let store: MemoryStore;
let deps: IntakeDeps;
let notify: ReturnType<typeof vi.fn>;

beforeEach(() => {
  store = new MemoryStore();
  notify = vi.fn(async () => {});
  deps = {
    store,
    verifyTurnstile: async (token) => token === "good-token",
    notify: notify as unknown as IntakeDeps["notify"],
    signingSecret: SECRET,
    allowedOrigins: [ORIGIN],
  };
});

const post = (path: string, body: unknown, headers: Record<string, string> = {}) =>
  new Request(`${ORIGIN}/api/bio-intake/${path}`, {
    method: "POST",
    headers: { origin: ORIGIN, "content-type": "application/json", "x-real-ip": "203.0.113.7", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

const startBody = (extra: Record<string, unknown> = {}) => ({
  ...validFields(),
  turnstileToken: "good-token",
  files: { headshot: { type: "image/jpeg", size: JPEG.length } },
  ...extra,
});

/** Run step 1 and "upload" the given bytes to the paths it issued. */
async function startAndUpload(files: { headshot: Uint8Array; logo?: Uint8Array }, body = startBody()) {
  const response = await handleStart(post("start", body), deps);
  const data = (await response.json()) as { uploads: Record<string, { url: string }>; uploadToken: string };
  for (const [slot, bytes] of Object.entries(files)) store.files.set(data.uploads[slot].url.replace("memory://", ""), bytes);
  return data.uploadToken;
}

describe("POST /api/bio-intake/start", () => {
  it("issues upload URLs with random names and a token", async () => {
    const response = await handleStart(post("start", startBody({ files: { headshot: { type: "image/jpeg", size: 10 }, logo: { type: "image/svg+xml", size: 10 } } })), deps);
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    const data = await response.json();
    expect(data.uploads.headshot.url).toMatch(/^memory:\/\/pending\/[0-9a-f-]{36}\/headshot-[0-9a-f]{32}\.jpg$/);
    expect(data.uploads.logo.url).toMatch(/\/logo-[0-9a-f]{32}\.svg$/);
    expect(data.uploadToken).toEqual(expect.any(String));
  });

  it("refuses requests from another origin, or with none", async () => {
    expect((await handleStart(post("start", startBody(), { origin: "https://evil.example" }), deps)).status).toBe(403);
    const noOrigin = post("start", startBody());
    noOrigin.headers.delete("origin");
    expect((await handleStart(noOrigin, deps)).status).toBe(403);
    expect((await handleStart(post("start", startBody(), { "sec-fetch-site": "cross-site" }), deps)).status).toBe(403);
  });

  it("refuses bodies that are not JSON", async () => {
    expect((await handleStart(post("start", "fullName=x", { "content-type": "application/x-www-form-urlencoded" }), deps)).status).toBe(415);
    expect((await handleStart(post("start", "{not json"), deps)).status).toBe(400);
  });

  it("returns field errors without issuing anything when validation fails", async () => {
    const response = await handleStart(post("start", startBody({ email: "nope", links: [] })), deps);
    expect(response.status).toBe(422);
    const data = await response.json();
    expect(data.fields).toHaveProperty("email");
    expect(data.fields).toHaveProperty("links");
    expect(data.uploadToken).toBeUndefined();
  });

  it("refuses a failed spam check", async () => {
    const response = await handleStart(post("start", startBody({ turnstileToken: "bad-token" })), deps);
    expect(response.status).toBe(403);
    expect((await response.json()).error).toBe("turnstile");
  });

  it("answers a filled honeypot with a fake success and issues nothing", async () => {
    const response = await handleStart(post("start", startBody({ website: "https://spam.example", turnstileToken: "bad-token" })), deps);
    expect(await response.json()).toEqual({ ok: true, done: true });
  });

  it("rate limits by address", async () => {
    const statuses: number[] = [];
    for (let i = 0; i < 12; i++) statuses.push((await handleStart(post("start", startBody()), deps)).status);
    expect(statuses.slice(0, 10)).toEqual(Array(10).fill(200));
    expect(statuses.slice(10)).toEqual([429, 429]);
    // A different address is unaffected.
    expect((await handleStart(post("start", startBody(), { "x-real-ip": "198.51.100.9" }), deps)).status).toBe(200);
  });
});

describe("POST /api/bio-intake/submit", () => {
  it("verifies the files, stores the submission with consent timestamps and a retention date, and notifies", async () => {
    deps.now = () => new Date("2026-11-16T18:00:00.000Z");
    const body = startBody({ files: { headshot: { type: "image/jpeg", size: JPEG.length }, logo: { type: "image/svg+xml", size: SVG.length } } });
    const uploadToken = await startAndUpload({ headshot: JPEG, logo: new TextEncoder().encode(SVG) }, body);

    const response = await handleSubmit(post("submit", { ...validFields(), uploadToken }), deps);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });

    expect(store.submissions).toHaveLength(1);
    const row = store.submissions[0];
    expect(row).toMatchObject({
      full_name: "Dana Reyes",
      inquiry_email: "dana@example.com",
      domain_choice: "subdomain",
      own_domain: null,
      consent_privacy_at: "2026-11-16T18:00:00.000Z",
      consent_founding_at: "2026-11-16T18:00:00.000Z",
      consent_assets_at: "2026-11-16T18:00:00.000Z",
      privacy_policy_version: "2026-11-16",
      delete_files_after: "2027-02-14",
      notified_at: "2026-11-16T18:00:00.000Z",
    });
    expect(row.headshot_path).toMatch(/^submissions\/[0-9a-f-]{36}\/headshot-[0-9a-f]{32}\.jpg$/);
    expect([...store.files.keys()].sort()).toEqual([row.headshot_path, row.logo_path].sort());
    expect(notify).toHaveBeenCalledWith({ id: row.id, fullName: "Dana Reyes" });
  });

  it("rejects a file whose bytes are not what was declared, and deletes the uploads", async () => {
    const uploadToken = await startAndUpload({ headshot: new TextEncoder().encode("<html><script>alert(1)</script></html>") });
    const response = await handleSubmit(post("submit", { ...validFields(), uploadToken }), deps);
    expect(response.status).toBe(422);
    expect((await response.json()).fields).toHaveProperty("headshot");
    expect(store.files.size).toBe(0);
    expect(store.submissions).toHaveLength(0);
    expect(notify).not.toHaveBeenCalled();
  });

  it("rejects an allowed type uploaded under a different extension", async () => {
    const uploadToken = await startAndUpload({ headshot: PNG });
    expect((await handleSubmit(post("submit", { ...validFields(), uploadToken }), deps)).status).toBe(422);
  });

  it("rejects a tampered, foreign or expired token", async () => {
    const uploadToken = await startAndUpload({ headshot: JPEG });
    const [payload, signature] = uploadToken.split(".");
    const forged = Buffer.from(JSON.stringify({ ...JSON.parse(Buffer.from(payload, "base64url").toString()), headshot: "submissions/other/file.jpg" })).toString("base64url");
    for (const token of [`${forged}.${signature}`, "abc.def", "nonsense"]) {
      expect((await handleSubmit(post("submit", { ...validFields(), uploadToken: token }), deps)).status).toBe(403);
    }
    deps.now = () => new Date(Date.now() + 31 * 60 * 1000);
    expect((await handleSubmit(post("submit", { ...validFields(), uploadToken }), deps)).status).toBe(403);
    expect(store.submissions).toHaveLength(0);
  });

  it("cannot be replayed", async () => {
    const uploadToken = await startAndUpload({ headshot: JPEG });
    expect((await handleSubmit(post("submit", { ...validFields(), uploadToken }), deps)).status).toBe(200);
    expect((await handleSubmit(post("submit", { ...validFields(), uploadToken }), deps)).status).toBe(400);
    expect(store.submissions).toHaveLength(1);
  });

  it("refuses when the upload never happened", async () => {
    const uploadToken = await startAndUpload({} as { headshot: Uint8Array });
    expect((await handleSubmit(post("submit", { ...validFields(), uploadToken }), deps)).status).toBe(400);
  });

  it("re-validates the answers and ignores what step 1 saw", async () => {
    const uploadToken = await startAndUpload({ headshot: JPEG });
    const response = await handleSubmit(post("submit", { ...validFields(), uploadToken, consents: { privacy: true, founding: false, assets: true } }), deps);
    expect(response.status).toBe(422);
    expect(store.submissions).toHaveLength(0);
  });

  it("still succeeds when the notification email fails", async () => {
    notify.mockRejectedValueOnce(new Error("resend responded 500"));
    const errors = vi.spyOn(console, "error").mockImplementation(() => {});
    const uploadToken = await startAndUpload({ headshot: JPEG });
    expect((await handleSubmit(post("submit", { ...validFields(), uploadToken }), deps)).status).toBe(200);
    expect(store.submissions[0].notified_at).toBeUndefined();
    expect(errors.mock.calls.flat().join(" ")).not.toContain("dana@example.com");
    errors.mockRestore();
  });
});
