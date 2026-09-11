-- PinoyCare CH initial schema
-- Run this in the Supabase SQL Editor to create all tables + RLS policies.

create extension if not exists "pgcrypto";

-- ─── Enum ─────────────────────────────────────────────────────────
do $$ begin
  create type user_role as enum ('worker','family');
exception when duplicate_object then null; end $$;

-- ─── profiles ─────────────────────────────────────────────────────
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role user_role not null default 'worker',
  full_name text not null default '',
  photo_url text,
  bio text,
  canton text,
  postal_code text,
  languages text[] not null default '{}',
  job_types text[] not null default '{}',
  availability text,
  permit_type text,
  is_visible boolean not null default true,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

-- ─── jobs ─────────────────────────────────────────────────────────
create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  poster_id uuid not null references public.profiles(id) on delete cascade,
  category text not null,
  title text not null,
  description text not null,
  postal_code text,
  canton text,
  schedule text,
  languages_required text[] not null default '{}',
  photo_urls text[] not null default '{}',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists jobs_poster_id_idx on public.jobs(poster_id);
create index if not exists jobs_active_created_idx on public.jobs(is_active, created_at desc);

-- ─── applications ─────────────────────────────────────────────────
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  applicant_id uuid not null references public.profiles(id) on delete cascade,
  message text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

-- ─── conversations ────────────────────────────────────────────────
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  participant_a uuid not null references public.profiles(id) on delete cascade,
  participant_b uuid not null references public.profiles(id) on delete cascade,
  job_id uuid references public.jobs(id) on delete set null,
  last_message_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists conversations_a_idx on public.conversations(participant_a, last_message_at desc);
create index if not exists conversations_b_idx on public.conversations(participant_b, last_message_at desc);

-- ─── messages ─────────────────────────────────────────────────────
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists messages_conversation_idx on public.messages(conversation_id, created_at);

-- ─── favourites ───────────────────────────────────────────────────
create table if not exists public.favourites (
  user_id uuid not null references public.profiles(id) on delete cascade,
  job_id uuid not null references public.jobs(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, job_id)
);

-- ─── reviews ──────────────────────────────────────────────────────
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  reviewer_id uuid not null references public.profiles(id) on delete cascade,
  reviewee_id uuid not null references public.profiles(id) on delete cascade,
  rating int not null check (rating between 1 and 5),
  body text,
  created_at timestamptz not null default now()
);

create index if not exists reviews_reviewee_idx on public.reviews(reviewee_id);

-- ─── profile_views ────────────────────────────────────────────────
create table if not exists public.profile_views (
  id uuid primary key default gen_random_uuid(),
  viewer_id uuid not null references public.profiles(id) on delete cascade,
  viewed_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now()
);

create index if not exists profile_views_viewed_idx on public.profile_views(viewed_id, created_at desc);

-- ─── premium_waitlist ─────────────────────────────────────────────
create table if not exists public.premium_waitlist (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz not null default now()
);

-- ─── reports ──────────────────────────────────────────────────────
create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid references public.profiles(id) on delete set null,
  target_type text not null,
  target_id uuid not null,
  reason text not null,
  status text not null default 'open',
  created_at timestamptz not null default now()
);

-- ─── Enable RLS ───────────────────────────────────────────────────
alter table public.profiles           enable row level security;
alter table public.jobs               enable row level security;
alter table public.applications       enable row level security;
alter table public.conversations      enable row level security;
alter table public.messages           enable row level security;
alter table public.favourites         enable row level security;
alter table public.reviews            enable row level security;
alter table public.profile_views      enable row level security;
alter table public.premium_waitlist   enable row level security;
alter table public.reports            enable row level security;

-- ─── profiles policies ────────────────────────────────────────────
create policy "profiles_public_read_visible"
  on public.profiles for select
  using (is_visible = true or auth.uid() = id);

create policy "profiles_owner_insert"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_owner_update"
  on public.profiles for update
  using (auth.uid() = id);

-- ─── jobs policies ────────────────────────────────────────────────
create policy "jobs_public_read_active"
  on public.jobs for select
  using (is_active = true or auth.uid() = poster_id);

create policy "jobs_owner_insert"
  on public.jobs for insert
  with check (auth.uid() = poster_id);

create policy "jobs_owner_update"
  on public.jobs for update
  using (auth.uid() = poster_id);

create policy "jobs_owner_delete"
  on public.jobs for delete
  using (auth.uid() = poster_id);

-- ─── applications policies ────────────────────────────────────────
create policy "applications_party_read"
  on public.applications for select
  using (
    auth.uid() = applicant_id
    or auth.uid() = (select poster_id from public.jobs where id = job_id)
  );

create policy "applications_applicant_insert"
  on public.applications for insert
  with check (auth.uid() = applicant_id);

-- ─── conversations policies ───────────────────────────────────────
create policy "conversations_participant_read"
  on public.conversations for select
  using (auth.uid() = participant_a or auth.uid() = participant_b);

create policy "conversations_participant_insert"
  on public.conversations for insert
  with check (auth.uid() = participant_a or auth.uid() = participant_b);

-- ─── messages policies ────────────────────────────────────────────
create policy "messages_participant_read"
  on public.messages for select
  using (
    exists (
      select 1 from public.conversations c
      where c.id = conversation_id
        and (c.participant_a = auth.uid() or c.participant_b = auth.uid())
    )
  );

create policy "messages_sender_insert"
  on public.messages for insert
  with check (
    auth.uid() = sender_id
    and exists (
      select 1 from public.conversations c
      where c.id = conversation_id
        and (c.participant_a = auth.uid() or c.participant_b = auth.uid())
    )
  );

-- ─── favourites policies ──────────────────────────────────────────
create policy "favourites_owner_all"
  on public.favourites for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ─── reviews policies ─────────────────────────────────────────────
create policy "reviews_public_read"
  on public.reviews for select using (true);

create policy "reviews_owner_insert"
  on public.reviews for insert
  with check (auth.uid() = reviewer_id);

-- ─── profile_views policies ───────────────────────────────────────
create policy "profile_views_viewed_read"
  on public.profile_views for select
  using (auth.uid() = viewed_id);

create policy "profile_views_any_insert"
  on public.profile_views for insert
  with check (auth.uid() is not null and auth.uid() = viewer_id);

-- ─── premium_waitlist policies ────────────────────────────────────
create policy "waitlist_anon_insert"
  on public.premium_waitlist for insert
  with check (true);

-- ─── reports policies ─────────────────────────────────────────────
create policy "reports_insert"
  on public.reports for insert
  with check (auth.uid() is not null);
