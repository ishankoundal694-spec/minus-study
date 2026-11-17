# Deployment guide

## Prerequisites

- Node.js 20+
- PostgreSQL database with a `DATABASE_URL` connection string
- Optional Supabase project for email-link auth and RLS-backed user workspaces
- Optional OpenAI-compatible AI provider key

## Build locally

```bash
npm ci
cp .env.example .env
# Fill in DATABASE_URL and optional AI/Supabase values.
npx next typegen
npm exec tsc -- --noEmit --pretty false
npm run build
npm run start
```

Check `GET /api/health` after startup. It performs `select 1` through Drizzle.

## Database

Apply the local schema with either:

```bash
npx drizzle-kit push
```

or run [`drizzle/0001_guest_workspaces.sql`](../drizzle/0001_guest_workspaces.sql) against the database. The table contains one JSONB state document per anonymous browser workspace.

For Supabase, apply [`supabase/migrations/0001_minus_study.sql`](../supabase/migrations/0001_minus_study.sql). It enables and forces RLS and adds user-scoped select/insert/update policies. Do not disable RLS or grant anon/public access.

## Vercel / managed hosting

1. Import the repository and set the build command to `npm run build`.
2. Add `DATABASE_URL` (use a pooled connection string for serverless where required).
3. Add `AI_API_KEY`, `AI_MODEL`, `AI_BASE_URL` and `AI_STREAMING` if using the AI Tutor.
4. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` if using Supabase. Redeploy after changing `NEXT_PUBLIC_` values because they are build-time browser constants.
5. In Supabase Authentication, add the production origin to Site URL and Redirect URLs.
6. Run the local and Supabase migrations before first use.
7. Verify `/api/health`, `/api/ai/status`, sign-in (if enabled), a workspace write, and one chapter test.

## Self-hosted Node

1. Set environment variables in the process manager or a secret store.
2. Run migrations.
3. `npm ci && npm run build && npm run start`.
4. Put the service behind HTTPS. HTTPS is required for microphone access and recommended for Supabase auth callbacks.
5. Use a reverse proxy that permits streaming responses without buffering (`X-Accel-Buffering: no` is already set on AI streams).

## Security checklist

- AI provider keys and any service-role secrets remain server-side only.
- Never commit `.env`.
- Keep Supabase RLS enabled and verify policies after each migration.
- Do not add raw audio storage without a separate explicit consent and retention policy.
- Use an HTTP-only, SameSite cookie for anonymous workspaces (already implemented) and secure cookies in production (already conditional on `NODE_ENV`).

## Performance checklist

- No autoplay video, polling loops or persistent background timers.
- Library resources paginate 12 at a time.
- Dynamic chapter routes are statically generated; client bundles contain no database driver.
- CSS respects `prefers-reduced-motion`.
- Static curriculum and quiz datasets are bundled locally, avoiding third-party runtime requests.
