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
    async listFilesDue(today) {
      const { data } = must(
        "list files due",
        await client.from(SUBMISSIONS_TABLE).select("id, headshot_path, logo_path").is("files_deleted_at", null).lt("delete_files_after", today).limit(200),
      );
      const rows = (data ?? []) as { id: string; headshot_path: string; logo_path: string | null }[];
      return rows.map((row) => ({ id: row.id, paths: [row.headshot_path, row.logo_path].filter((path): path is string => Boolean(path)) }));
    },
    async markFilesDeleted(id, at) {
      must("mark files deleted", await client.from(SUBMISSIONS_TABLE).update({ files_deleted_at: at }).eq("id", id));
    },
    async listPending() {
      type Entry = { name: string; created_at: string | null };
      const { data: folders } = must("list pending", await bucket().list("pending", { limit: 1000 }));
      const pending: { path: string; createdAt: string }[] = [];
      for (const folder of (folders ?? []) as Entry[]) {
        const { data: files } = must("list pending folder", await bucket().list(`pending/${folder.name}`));
        // An entry without a creation time is a folder placeholder, not an upload.
        for (const file of (files ?? []) as Entry[]) if (file.created_at) pending.push({ path: `pending/${folder.name}/${file.name}`, createdAt: file.created_at });
      }
      return pending;
    },
  };
}
