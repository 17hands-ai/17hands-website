#!/usr/bin/env node
/**
 * Deletes bio page intake files that are past their retention date, plus uploads that were
 * started and never submitted. Run from artifacts/17hands-ai:
 *
 *   pnpm intake:purge             list what would be deleted, change nothing
 *   pnpm intake:purge --confirm   delete
 *
 * Reads SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY and SUPABASE_INTAKE_BUCKET from .env.
 * Deletion from storage cannot be undone.
 */
import { createClient } from "@supabase/supabase-js";

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_INTAKE_BUCKET = "bio-intake" } = process.env;
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env first.");
  process.exit(1);
}
const confirm = process.argv.includes("--confirm");
const client = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const bucket = client.storage.from(SUPABASE_INTAKE_BUCKET);
const must = (what, { data, error }) => {
  if (error) throw new Error(`${what}: ${error.message}`);
  return data;
};

const today = new Date().toISOString().slice(0, 10);
const due = must(
  "list submissions",
  await client
    .from("bio_intake_submissions")
    .select("id, business_name, delete_files_after, headshot_path, logo_path")
    .is("files_deleted_at", null)
    .lt("delete_files_after", today),
);

for (const row of due) {
  const paths = [row.headshot_path, row.logo_path].filter(Boolean);
  console.log(`${confirm ? "Deleting" : "Would delete"} ${paths.length} file(s) for ${row.business_name} (${row.id}), due ${row.delete_files_after}`);
  if (!confirm) continue;
  must("remove files", await bucket.remove(paths));
  must("mark deleted", await client.from("bio_intake_submissions").update({ files_deleted_at: new Date().toISOString() }).eq("id", row.id));
}

// Uploads that never became a submission sit under pending/<id>/. A day is far longer than the 30-minute upload window.
const cutoff = Date.now() - 24 * 60 * 60 * 1000;
const abandoned = [];
for (const folder of must("list pending", await bucket.list("pending", { limit: 1000 }))) {
  for (const file of must("list pending folder", await bucket.list(`pending/${folder.name}`))) {
    if (file.created_at && new Date(file.created_at).getTime() < cutoff) abandoned.push(`pending/${folder.name}/${file.name}`);
  }
}
console.log(`${confirm ? "Deleting" : "Would delete"} ${abandoned.length} abandoned upload(s)`);
if (confirm && abandoned.length) must("remove abandoned", await bucket.remove(abandoned));

if (!confirm) console.log("\nNothing was changed. Run again with --confirm to delete.");
