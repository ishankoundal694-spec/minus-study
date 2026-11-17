# Minus Study Admin + Papers setup

## Supabase setup

1. Keep the `minus-study-papers` Storage bucket **private**. The app issues short-lived signed download URLs to the public paper library.
2. In Supabase SQL Editor, run `supabase/migrations/0002_study_papers.sql`.
3. In your deployment environment (for example Vercel Project Settings → Environment Variables), add:
   - `NEXT_PUBLIC_SUPABASE_URL` — existing project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — existing publishable/anon key
   - `SUPABASE_SERVICE_ROLE_KEY` — Supabase service-role secret, server-only; never expose it in browser code, chat, screenshots, or a committed `.env` file.
4. Redeploy the app after setting the environment variables.

## Admin access

1. Sign in to Minus Study using the existing Supabase email magic-link flow.
2. The same account email must exist in `public.admins` with `active = true` and `role` equal to `owner` or `admin`.
3. Open `/admin`. The server validates the Supabase access token and checks the `admins` table by email. The `admins.id` value is not assumed to equal the Auth user UUID.

## Student paper pages

- `/previous-year-questions`
- `/model-question-papers`

These pages are public. They show uploaded catalogue entries and use short-lived signed URLs for PDF access. The bucket stays private.

## Upload limits

PDF only, maximum 50 MB. Storage paths are organized by category, subject and year.
