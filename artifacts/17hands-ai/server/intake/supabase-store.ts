/**
 * Supabase Postgres and Storage, reached with the service key. That key bypasses row level
 * security, so it stays on the server; the tables and the bucket allow nothing to anyone else
 * (see supabase/migrations).
 */
import { createClient } from "@supabase/supabase-js";
import type { IntakeStore, SubmissionRow } from "./store.js";

export const SUBMISSIONS_TABLE = "bio_intake_submissions";

export function supabaseStore(options: { url: string; serviceKey: string; bucket: string }): IntakeStore {
  const client = createClient(options.url, options.serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const bucket = () => client.storage.from(options.bucket);
  const must = <T extends { error: { message: string } | null }>(what: string, result: T): T => {
    if (result.error) throw new Error(`supabase ${what}: ${result.error.message}`);
    return result;
  };

  return {
    async hitRateLimit(key, windowSeconds) {
      const { data } = must("rate limit", await client.rpc("bio_intake_rate_hit", { p_key: key, p_window_seconds: windowSeconds }));
      return Number(data);
    },
    async createUploadUrl(path) {
      const { data } = must("signed upload url", await bucket().createSignedUploadUrl(path));
      return data!.signedUrl;
    },
    async download(path) {
      const { data, error } = await bucket().download(path);
      // A missing object is an expected outcome (the browser never uploaded), not a failure.
      if (error || !data) return null;
      return new Uint8Array(await data.arrayBuffer());
    },
    async move(from, to) {
      must("move", await bucket().move(from, to));
    },
    async remove(paths) {
      if (paths.length) must("remove", await bucket().remove(paths));
    },
    async insertSubmission(row: SubmissionRow) {
      must("insert", await client.from(SUBMISSIONS_TABLE).insert(row));
    },
    async markNotified(id, at) {
      must("mark notified", await client.from(SUBMISSIONS_TABLE).update({ notified_at: at }).eq("id", id));
    },
  };
}
