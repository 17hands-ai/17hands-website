#!/usr/bin/env node
/**
 * Saves one bio page submission to a folder on this machine: a readable details.html plus the
 * client's photo and logo. Run from artifacts/17hands-ai:
 *
 *   pnpm intake:export            list recent submissions, save nothing
 *   pnpm intake:export latest     save the newest one
 *   pnpm intake:export <id>       save that one (the id from the notice email link)
 *
 * Reads SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY and SUPABASE_INTAKE_BUCKET from .env.
 * Folders go to ~/Documents/17hands-intake, or INTAKE_EXPORT_DIR if set. Keep them out of the
 * repo: they hold client data, and the retention promise in the privacy policy covers them too.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_INTAKE_BUCKET = "bio-intake", INTAKE_EXPORT_DIR } = process.env;
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env first.");
  process.exit(1);
}
const client = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const bucket = client.storage.from(SUPABASE_INTAKE_BUCKET);
const table = () => client.from("bio_intake_submissions");
const must = (what, { data, error }) => {
  if (error) throw new Error(`${what}: ${error.message}`);
  return data;
};

const target = process.argv[2];

if (!target) {
  const rows = must("list submissions", await table().select("id, created_at, status, full_name, business_name").order("created_at", { ascending: false }).limit(20));
  if (!rows.length) console.log("No submissions yet.");
  for (const row of rows) console.log(`${row.created_at.slice(0, 10)}  ${row.status.padEnd(11)}  ${row.id}  ${row.business_name} (${row.full_name})`);
  if (rows.length) console.log("\nSave one with: pnpm intake:export latest   or   pnpm intake:export <id>");
  process.exit(0);
}

const query = target === "latest" ? table().select("*").order("created_at", { ascending: false }).limit(1) : table().select("*").eq("id", target);
const [row] = must("load submission", await query);
if (!row) {
  console.error(target === "latest" ? "No submissions yet." : `No submission with id ${target}.`);
  process.exit(1);
}

// Everything in a row was typed by a stranger. Escape it before it goes into HTML or a folder name.
const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const slug = row.business_name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "client";
const folder = path.join(INTAKE_EXPORT_DIR || path.join(homedir(), "Documents", "17hands-intake"), `${row.created_at.slice(0, 10)}-${slug}-${row.id.slice(0, 8)}`);
await mkdir(folder, { recursive: true });

const images = {};
for (const [slot, objectPath] of [["headshot", row.headshot_path], ["logo", row.logo_path]]) {
  if (!objectPath) continue;
  if (row.files_deleted_at) continue;
  const blob = must(`download ${slot}`, await bucket.download(objectPath));
  images[slot] = `${slot}${path.extname(objectPath)}`;
  await writeFile(path.join(folder, images[slot]), Buffer.from(await blob.arrayBuffer()));
}

const link = (url) => (/^https?:\/\//i.test(url ?? "") ? `<a href="${esc(url)}" rel="noreferrer noopener">${esc(url)}</a>` : esc(url));
const date = (value) => (value ? new Date(value).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }) : "");
const domain = { own: `Owns a domain: ${row.own_domain ?? ""}`, buy: "Wants to buy one (about $12/yr, registered in their name)", subdomain: "Use a free subdomain" }[row.domain_choice];
const fields = [
  ["Full name", esc(row.full_name)],
  ["Business name", esc(row.business_name)],
  ["About the business", esc(row.about)],
  ["Email", esc(row.email)],
  ["Phone", esc(row.phone)],
  ["Send inquiries to", esc(row.inquiry_email)],
  ["Brand colors", esc(row.brand_colors)],
  ["Brand fonts", esc(row.brand_fonts)],
  ["Booking link", link(row.booking_url)],
  ["Domain", esc(domain)],
  ["Social handles", esc(row.social_handles)],
];
const image = (slot, label) =>
  images[slot] ? `<figure><img src="${esc(images[slot])}" alt="${label}"><figcaption>${label}: ${esc(images[slot])}</figcaption></figure>` : "";

const html = `<!doctype html>
<html lang="en">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src 'self'; style-src 'unsafe-inline'">
<title>${esc(row.business_name)} - bio page details</title>
<style>
  body { font: 16px/1.55 system-ui, sans-serif; max-width: 46rem; margin: 2.5rem auto; padding: 0 1rem; color: #1c1917; }
  h1 { font-size: 1.6rem; margin-bottom: 0.2rem; }
  h2 { font-size: 1.05rem; margin-top: 2.2rem; border-bottom: 1px solid #d6d3d1; padding-bottom: 0.3rem; }
  .meta, figcaption { color: #57534e; font-size: 0.875rem; }
  dl { display: grid; grid-template-columns: 11rem 1fr; gap: 0.6rem 1rem; }
  dt { color: #57534e; } dd { margin: 0; white-space: pre-wrap; overflow-wrap: anywhere; }
  .images { display: flex; gap: 1.5rem; flex-wrap: wrap; } figure { margin: 0; }
  img { max-width: 16rem; max-height: 16rem; border: 1px solid #d6d3d1; background: #f5f5f4; }
  @media (max-width: 34rem) { dl { grid-template-columns: 1fr; gap: 0.1rem; } dd { margin-bottom: 0.7rem; } }
</style>
<h1>${esc(row.business_name)}</h1>
<p class="meta">Sent ${esc(date(row.created_at))} &middot; status: ${esc(row.status)} &middot; id ${esc(row.id)}</p>

<h2>Photo and logo</h2>
<div class="images">${image("headshot", "Photo")}${image("logo", "Logo")}</div>
${row.files_deleted_at ? `<p class="meta">Files were deleted on ${esc(date(row.files_deleted_at))}.</p>` : ""}

<h2>Details</h2>
<dl>${fields.filter(([, value]) => value).map(([label, value]) => `<dt>${label}</dt><dd>${value}</dd>`).join("")}</dl>

<h2>Links, in the order the client wants them</h2>
<ol>${row.links.map((item) => `<li>${esc(item.label)}: ${link(item.url)}</li>`).join("")}</ol>

<h2>Agreements</h2>
<dl>
  <dt>Privacy policy read</dt><dd>${esc(date(row.consent_privacy_at))} (policy dated ${esc(row.privacy_policy_version)})</dd>
  <dt>Founding client terms</dt><dd>${esc(date(row.consent_founding_at))}</dd>
  <dt>Photo and logo permission</dt><dd>${esc(date(row.consent_assets_at))}</dd>
  <dt>Delete files after</dt><dd>${esc(row.delete_files_after)}</dd>
</dl>
</html>
`;
await writeFile(path.join(folder, "details.html"), html);

console.log(`Saved ${row.business_name} (${row.full_name}) to:\n${folder}\n`);
console.log(`Open it with:\nopen "${path.join(folder, "details.html")}"`);
