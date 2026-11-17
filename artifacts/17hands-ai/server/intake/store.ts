/** Everything the intake API needs from a database and a file store. Supabase in production, memory in tests and keyless local runs. */

export interface SubmissionRow {
  id: string;
  full_name: string;
  business_name: string;
  about: string;
  email: string;
  phone: string;
  inquiry_email: string;
  brand_colors: string | null;
  brand_fonts: string | null;
  links: { label: string; url: string }[];
  booking_url: string | null;
  domain_choice: "own" | "buy" | "subdomain";
  own_domain: string | null;
  social_handles: string | null;
  headshot_path: string;
  logo_path: string | null;
  consent_privacy_at: string;
  consent_founding_at: string;
  consent_assets_at: string;
  privacy_policy_version: string;
  /** Date (YYYY-MM-DD) after which the uploaded files should be deleted. Move it once the page is delivered. */
  delete_files_after: string;
}

export interface IntakeStore {
  /** Count this request against `key` in the current window and return the new count. */
  hitRateLimit(key: string, windowSeconds: number): Promise<number>;
  /** A one-time URL the browser can PUT one file to, at exactly this path. */
  createUploadUrl(path: string): Promise<string>;
  /** The stored bytes, or null when nothing was uploaded at this path. */
  download(path: string): Promise<Uint8Array | null>;
  move(from: string, to: string): Promise<void>;
  remove(paths: string[]): Promise<void>;
  insertSubmission(row: SubmissionRow): Promise<void>;
  markNotified(id: string, at: string): Promise<void>;
}
