-- Bio page intake: submissions, per-address rate limiting and a private file bucket.
-- Run once in the Supabase SQL Editor (or with `supabase db push`). Safe to re-run.
--
-- Access model: row level security is on and no policies exist, so the anon and authenticated
-- roles can read and write nothing. Only the service key, held by the server, gets through.

create table if not exists public.bio_intake_submissions (
  id                      uuid primary key,
  created_at              timestamptz not null default now(),
  -- Yours to edit as the project moves along.
  status                  text not null default 'new'
                          check (status in ('new', 'in_progress', 'delivered', 'cancelled')),

  full_name               text not null,
  business_name           text not null,
  about                   text not null check (char_length(about) <= 500),
  email                   text not null,
  phone                   text not null,
  inquiry_email           text not null,
  brand_colors            text,
  brand_fonts             text,
  -- Ordered as the client wants them: [{"label": "...", "url": "https://..."}], 1 to 8 entries.
  links                   jsonb not null check (jsonb_typeof(links) = 'array' and jsonb_array_length(links) between 1 and 8),
  booking_url             text,
  domain_choice           text not null check (domain_choice in ('own', 'buy', 'subdomain')),
  own_domain              text,
  social_handles          text,

  -- Object paths inside the private bucket. Never public URLs.
  headshot_path           text not null,
  logo_path               text,

  -- When each required box was confirmed, and which privacy policy was in force.
  consent_privacy_at      timestamptz not null,
  consent_founding_at     timestamptz not null,
  consent_assets_at       timestamptz not null,
  privacy_policy_version  text not null,

  -- Retention. Files are due for deletion after this date; the purge script acts on it.
  -- Set to 12 months out on arrival, which is what the privacy policy promises.
  delete_files_after      date not null,
  files_deleted_at        timestamptz,

  notified_at             timestamptz
);

alter table public.bio_intake_submissions enable row level security;
revoke all on table public.bio_intake_submissions from anon, authenticated;

create index if not exists bio_intake_submissions_retention_idx
  on public.bio_intake_submissions (delete_files_after)
  where files_deleted_at is null;

-- Rate limiting. `key` is "<action>:<HMAC of the IP address>", never the address itself.
create table if not exists public.bio_intake_rate_limits (
  key           text not null,
  window_start  timestamptz not null,
  hits          integer not null default 1,
  primary key (key, window_start)
);

alter table public.bio_intake_rate_limits enable row level security;
revoke all on table public.bio_intake_rate_limits from anon, authenticated;

-- Counts one request against `p_key` in the current fixed window and returns the new total.
-- One statement, so concurrent requests cannot both read the same count. Also clears rows
-- older than a day, which keeps the privacy policy's 24-hour promise without a scheduled job.
create or replace function public.bio_intake_rate_hit(p_key text, p_window_seconds integer)
returns integer
language plpgsql
set search_path = ''
as $$
declare
  v_window timestamptz := to_timestamp(floor(extract(epoch from now()) / p_window_seconds) * p_window_seconds);
  v_hits integer;
begin
  delete from public.bio_intake_rate_limits where window_start < now() - interval '1 day';

  insert into public.bio_intake_rate_limits as r (key, window_start, hits)
  values (p_key, v_window, 1)
  on conflict (key, window_start) do update set hits = r.hits + 1
  returning r.hits into v_hits;

  return v_hits;
end;
$$;

revoke execute on function public.bio_intake_rate_hit(text, integer) from public, anon, authenticated;
grant execute on function public.bio_intake_rate_hit(text, integer) to service_role;

-- Private bucket. No storage policies are created, so nothing is readable or writable without
-- the service key or a one-time signed upload URL that the server issues. The size and type
-- limits here are a second line behind the server's own checks.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('bio-intake', 'bio-intake', false, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'])
on conflict (id) do update
  set public = false,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;
