-- Delete the accounts "platong.b" and "platong"  (NOT "b.platong")
-- Run in Supabase: Dashboard -> SQL Editor -> New query.
-- Usernames map to emails as <username>@puffycitrus.app, so we match EXACTLY
-- using IN (...) — this will never match 'b.platong'.

-- ── STEP 1: PREVIEW first (run this alone, confirm the rows, THEN delete) ──
select id, email, created_at
from auth.users
where lower(email) in ('platong.b@puffycitrus.app', 'platong@puffycitrus.app');

-- ── STEP 2: DELETE ──
-- Deleting from auth.users cascades to saves, profiles, gifts and
-- friend_requests automatically (all have ON DELETE CASCADE on user_id).
delete from auth.users
where lower(email) in ('platong.b@puffycitrus.app', 'platong@puffycitrus.app');


-- ── Alternative: match by the public profile username instead of email ──
-- (Use this only if the accounts published a profile. Same exact-match safety.)
-- delete from auth.users
-- where id in (
--   select user_id from public.profiles
--   where username in ('platong.b', 'platong')
-- );
