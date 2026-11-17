-- Minus Study — Supabase PostgreSQL migration
-- Run in the Supabase SQL Editor or with `supabase db push`.
-- One private JSONB document per authenticated student keeps reads/writes light
-- on low-end devices while RLS strictly isolates every user's records.

create table if not exists public.student_workspaces (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null default '{"progress":[],"goals":[],"quizAttempts":[],"activity":[],"chatMessages":[],"syllabusItems":[],"preferences":{}}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.student_workspaces enable row level security;
alter table public.student_workspaces force row level security;

drop policy if exists "Students read only their own workspace" on public.student_workspaces;
create policy "Students read only their own workspace"
  on public.student_workspaces
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Students insert only their own workspace" on public.student_workspaces;
create policy "Students insert only their own workspace"
  on public.student_workspaces
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Students update only their own workspace" on public.student_workspaces;
create policy "Students update only their own workspace"
  on public.student_workspaces
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- Intentionally no delete policy and no public/anon policy.
revoke all on public.student_workspaces from anon, public;
grant select, insert, update on public.student_workspaces to authenticated;

create index if not exists student_workspaces_updated_at_idx
  on public.student_workspaces (updated_at desc);

comment on table public.student_workspaces is
  'Private Minus Study workspace containing progress, goals, quiz history, activity, custom syllabus items, optional text chat and preferences. Raw audio is never stored.';
