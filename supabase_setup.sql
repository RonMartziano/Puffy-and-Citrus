-- Puffy & Citrus — Supabase setup
-- Run this once in your Supabase project: Dashboard -> SQL Editor -> New query -> Run.

create table if not exists public.saves (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.saves enable row level security;

drop policy if exists "saves_select_own" on public.saves;
drop policy if exists "saves_insert_own" on public.saves;
drop policy if exists "saves_update_own" on public.saves;

create policy "saves_select_own" on public.saves
  for select using (auth.uid() = user_id);
create policy "saves_insert_own" on public.saves
  for insert with check (auth.uid() = user_id);
create policy "saves_update_own" on public.saves
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Also recommended in Dashboard -> Authentication -> Providers -> Email:
--   * keep "Email" provider enabled
--   * turn OFF "Confirm email" so username/password signup works instantly
--     (the game turns usernames into <username>@puffycitrus.app under the hood)

-- ============================================================
-- Friends: public profiles + gifting (for Visit + Gifting)
-- ============================================================

-- Public profile snapshot (other players can read it to "visit" you).
create table if not exists public.profiles (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  username   text unique not null,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_all" on public.profiles;
drop policy if exists "profiles_upsert_own" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;

-- Any logged-in player can read any profile (that's what makes visiting work).
create policy "profiles_select_all" on public.profiles
  for select using (auth.role() = 'authenticated');
create policy "profiles_upsert_own" on public.profiles
  for insert with check (auth.uid() = user_id);
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Gift inbox. Sender inserts; only the recipient can read & claim.
create table if not exists public.gifts (
  id            uuid primary key default gen_random_uuid(),
  from_user_id  uuid not null references auth.users(id) on delete cascade,
  from_username text not null,
  to_user_id    uuid not null references auth.users(id) on delete cascade,
  kind          text not null,
  amount        int  not null default 1,
  claimed       boolean not null default false,
  created_at    timestamptz not null default now()
);

create index if not exists gifts_to_idx on public.gifts (to_user_id, claimed);

alter table public.gifts enable row level security;

drop policy if exists "gifts_insert_sender" on public.gifts;
drop policy if exists "gifts_select_recipient" on public.gifts;
drop policy if exists "gifts_update_recipient" on public.gifts;

create policy "gifts_insert_sender" on public.gifts
  for insert with check (auth.uid() = from_user_id);
create policy "gifts_select_recipient" on public.gifts
  for select using (auth.uid() = to_user_id);
create policy "gifts_update_recipient" on public.gifts
  for update using (auth.uid() = to_user_id) with check (auth.uid() = to_user_id);
