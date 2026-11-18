/**
 * In-memory stand-in for Supabase. Used by the tests, and by `pnpm dev` when no Supabase keys
 * are set so the form can be tried end to end. Never selected in production (see config.ts).
 */
import type { IntakeStore, SubmissionRow } from "./store.js";

export class MemoryStore implements IntakeStore {
  readonly files = new Map<string, Uint8Array>();
  readonly submissions: (SubmissionRow & { notified_at?: string; files_deleted_at?: string })[] = [];
  /** When a file arrived, for the tests that age an upload. Files without an entry count as new. */
  readonly uploadedAt = new Map<string, string>();
  private readonly hits = new Map<string, number>();

  constructor(private readonly uploadUrl: (path: string) => string = (path) => `memory://${path}`) {}

  async hitRateLimit(key: string, windowSeconds: number) {
    const bucket = `${key}:${Math.floor(Date.now() / 1000 / windowSeconds)}`;
    const count = (this.hits.get(bucket) ?? 0) + 1;
    this.hits.set(bucket, count);
    return count;
  }

  async createUploadUrl(path: string) {
    return this.uploadUrl(path);
  }

  async download(path: string) {
    return this.files.get(path) ?? null;
  }

  async move(from: string, to: string) {
    const bytes = this.files.get(from);
    if (!bytes) throw new Error(`memory store: nothing at ${from}`);
    this.files.set(to, bytes);
    this.files.delete(from);
  }

  async remove(paths: string[]) {
    for (const path of paths) this.files.delete(path);
  }

  async insertSubmission(row: SubmissionRow) {
    this.submissions.push(row);
  }

  async markNotified(id: string, at: string) {
    const row = this.submissions.find((s) => s.id === id);
    if (row) row.notified_at = at;
  }

  async listFilesDue(today: string) {
    return this.submissions
      .filter((s) => !s.files_deleted_at && s.delete_files_after < today)
      .map((s) => ({ id: s.id, paths: [s.headshot_path, s.logo_path].filter((p): p is string => Boolean(p)) }));
  }

  async markFilesDeleted(id: string, at: string) {
    const row = this.submissions.find((s) => s.id === id);
    if (row) row.files_deleted_at = at;
  }

  async listPending() {
    return [...this.files.keys()]
      .filter((path) => path.startsWith("pending/"))
      .map((path) => ({ path, createdAt: this.uploadedAt.get(path) ?? new Date().toISOString() }));
  }
}
