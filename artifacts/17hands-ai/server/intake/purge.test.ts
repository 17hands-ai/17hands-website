import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryStore } from "./memory-store.js";
import { handlePurge, type PurgeDeps } from "./purge.js";
import type { SubmissionRow } from "./store.js";

const SECRET = "cron-secret-for-tests";
const NOW = new Date("2027-11-20T10:00:00.000Z");

let store: MemoryStore;
let deps: PurgeDeps;

const run = (authorization?: string) =>
  handlePurge(new Request("https://17hands.ai/api/bio-intake/purge", { headers: authorization ? { authorization } : {} }), deps);

function submission(id: string, deleteAfter: string, withLogo = true) {
  const row = {
    id,
    delete_files_after: deleteAfter,
    headshot_path: `submissions/${id}/headshot.jpg`,
    logo_path: withLogo ? `submissions/${id}/logo.svg` : null,
  } as SubmissionRow;
  store.submissions.push(row);
  store.files.set(row.headshot_path, new Uint8Array([1]));
  if (row.logo_path) store.files.set(row.logo_path, new Uint8Array([2]));
  return row;
}

beforeEach(() => {
  store = new MemoryStore();
  deps = { store, cronSecret: SECRET, now: () => NOW };
  vi.spyOn(console, "log").mockImplementation(() => {});
});

describe("handlePurge", () => {
  it("refuses a request without the cron secret and deletes nothing", async () => {
    submission("old", "2027-01-01");
    for (const header of [undefined, "Bearer wrong-secret-of-same-len", `Bearer ${SECRET}x`, SECRET]) {
      expect((await run(header)).status).toBe(401);
    }
    expect(store.files.size).toBe(2);
    expect(store.submissions[0].files_deleted_at).toBeUndefined();
  });

  it("deletes files past their date, records when, and keeps the row", async () => {
    submission("old", "2027-11-19");
    const response = await run(`Bearer ${SECRET}`);
    expect(await response.json()).toEqual({ ok: true, submissions: 1, files: 2, abandoned: 0 });
    expect(store.files.size).toBe(0);
    expect(store.submissions).toHaveLength(1);
    expect(store.submissions[0].files_deleted_at).toBe(NOW.toISOString());
  });

  it("leaves files that are due today or later", async () => {
    submission("today", "2027-11-20");
    submission("later", "2028-01-01", false);
    expect(await (await run(`Bearer ${SECRET}`)).json()).toMatchObject({ submissions: 0, files: 0 });
    expect(store.files.size).toBe(3);
  });

  it("does not process a submission twice", async () => {
    submission("old", "2027-01-01");
    await run(`Bearer ${SECRET}`);
    expect(await (await run(`Bearer ${SECRET}`)).json()).toMatchObject({ submissions: 0, files: 0 });
  });

  it("removes uploads abandoned for more than a day and leaves recent ones", async () => {
    store.files.set("pending/a/headshot.jpg", new Uint8Array([1]));
    store.uploadedAt.set("pending/a/headshot.jpg", "2027-11-19T09:59:00.000Z");
    store.files.set("pending/b/headshot.jpg", new Uint8Array([1]));
    store.uploadedAt.set("pending/b/headshot.jpg", "2027-11-20T09:45:00.000Z");
    expect(await (await run(`Bearer ${SECRET}`)).json()).toMatchObject({ abandoned: 1 });
    expect([...store.files.keys()]).toEqual(["pending/b/headshot.jpg"]);
  });
});
