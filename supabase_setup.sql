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
