/**
 * Scheduled cleanup, run once a day by Vercel Cron (see vercel.json). It deletes uploaded files
 * whose retention date has passed and uploads that were started and never submitted. This is what
 * keeps the privacy policy's "deleted within 12 months" promise without anyone remembering to.
 *
 * Rows are left alone: only the files go, and the row records when. Deleting old rows is a
 * separate decision (see README, Retention).
 */
import { timingSafeEqual } from "node:crypto";
import type { IntakeStore } from "./store.js";

export interface PurgeDeps {
  store: Pick<IntakeStore, "listFilesDue" | "markFilesDeleted" | "listPending" | "remove">;
  /** Vercel sends this as a bearer token on cron requests. Nothing else may trigger a purge. */
  cronSecret: string;
  now?: () => Date;
}

/** A day is far longer than the 30-minute upload window, so nothing in flight is touched. */
const ABANDONED_AFTER_MS = 24 * 60 * 60 * 1000;

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });

function authorized(request: Request, secret: string) {
  const given = Buffer.from(request.headers.get("authorization") ?? "");
  const expected = Buffer.from(`Bearer ${secret}`);
  return given.length === expected.length && timingSafeEqual(given, expected);
}

export async function handlePurge(request: Request, deps: PurgeDeps): Promise<Response> {
  if (!authorized(request, deps.cronSecret)) return json(401, { ok: false });

  const now = deps.now?.() ?? new Date();
  const due = await deps.store.listFilesDue(now.toISOString().slice(0, 10));
  let files = 0;
  for (const row of due) {
    // Files first, then the record: if marking fails, the next run retries a harmless delete.
    await deps.store.remove(row.paths);
    await deps.store.markFilesDeleted(row.id, now.toISOString());
    files += row.paths.length;
  }

  const cutoff = now.getTime() - ABANDONED_AFTER_MS;
  const abandoned = (await deps.store.listPending()).filter((file) => new Date(file.createdAt).getTime() < cutoff).map((file) => file.path);
  await deps.store.remove(abandoned);

  const result = { submissions: due.length, files, abandoned: abandoned.length };
  console.log("bio-intake purge:", JSON.stringify(result));
  return json(200, { ok: true, ...result });
}

export const guardedPurge =
  (deps: () => PurgeDeps) =>
  async (request: Request): Promise<Response> => {
    try {
      return await handlePurge(request, deps());
    } catch (error) {
      // Vercel records a non-2xx cron run as failed, which is where this shows up.
      console.error("bio-intake purge failed:", error instanceof Error ? error.message : error);
      return json(500, { ok: false });
    }
  };
