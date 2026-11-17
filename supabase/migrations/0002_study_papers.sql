-- Minus Study paper catalogue. Files remain in the private `minus-study-papers` bucket.
create table if not exists public.study_papers (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 140),
  category text not null check (category in ('previous-year', 'model')),
  subject text not null,
  year text not null,
  storage_path text not null unique,
  file_size bigint not null check (file_size > 0 and file_size <= 52428800),
  created_at timestamptz not null default now()
);

alter table public.study_papers enable row level security;
-- Catalogue reads are public; file bytes are served with short-lived signed URLs.
drop policy if exists "Anyone can read study paper catalogue" on public.study_papers;
create policy "Anyone can read study paper catalogue"
  on public.study_papers for select to anon, authenticated using (true);
-- Writes are performed only by the server after checking Supabase Auth + public.admins.
revoke insert, update, delete on public.study_papers from anon, authenticated;
grant select on public.study_papers to anon, authenticated;
