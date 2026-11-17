# Minus Study

**Learn smarter. Score higher.** — a complete Class 10 HPBOSE learning platform in Hindi, Hinglish and English.

## What is included

- Dashboard with real progress, today's goals, continue-learning, subject cards, recent activity and AI Tutor access.
- Seven subjects: Mathematics, Science, Social Science, English, Hindi, Sanskrit and Computer Science.
- 40 original in-app chapter guides with summaries, detailed notes, important questions, exercises with hints, revision material and formula/relationship sheets where relevant. All 14 HPBOSE Class 10 Mathematics units are covered.
- Searchable study library with subject, chapter and type filters; official NCERT/HPBOSE links only for external books and papers.
- A dedicated **Maths Sample Papers** page: 14 original chapter papers, printable questions, MCQ input, written-answer space, worked answer keys, honest self-scoring, score history and chapter coverage. These are clearly not official HPBOSE papers.
- Minus AI Tutor: streaming chat, Hindi/Hinglish/English, subject/chapter context, teaching modes, browser microphone input, spoken answers, continuous voice mode, text history and clear-history control.
- MCQ chapter tests, subject tests and mixed-subject tests with explanations, score history, weak-topic detection and revision suggestions.
- Progress dashboard with manual chapter updates, goals, subject breakdown, quiz scores, revision checkpoints and activity timeline.
- **My Syllabus**: a private, editable complete-syllabus planner on every subject page and a dedicated page. Paste all chapters/topics, import in-app chapter guides, mark status, and see real progress. Science, Mathematics and Social Science are pinned as main subjects (a study shortcut, not an official HPBOSE category).
- Settings for preferences, compact mode, voice, private data export, Supabase email-link auth, AI setup and curriculum sources.
- Local PostgreSQL persistence through Drizzle plus optional Supabase auth/database with Row Level Security.

## Curriculum and copyright policy

The curriculum reference is the official [HPBOSE 2026–27 Class 10 book list](https://www.hpbose.org/Admin/Upload/Book%20List%20Session%202026-2027.pdf), HPBOSE subject syllabi/model papers, and the [official NCERT textbook portal](https://ncert.nic.in/textbook.php). Relevant official PDFs are also linked in the app:

- [HPBOSE Mathematics syllabus](https://www.hpbose.org/Admin/Upload/Sy.Math.10.27.06.2024.pdf)
- [HPBOSE Science syllabus](https://www.hpbose.org/Admin/Upload/Sylla.Sci.10.04.08.2025.pdf)
- [HPBOSE English syllabus](https://www.hpbose.org/Admin/Upload/Sy.Eng.10.27.06.2024.pdf)
- [HPBOSE Computer Science syllabus](https://www.hpbose.org/Admin/Upload/Sy.CS.10.27.06.2024.pdf)
- [HPBOSE 2026–27 Social Science model paper](https://www.hpbose.org/Admin/Upload/10thSocialScience10thMQP2026-27.pdf)
- [HPBOSE 2026–27 English model paper](https://www.hpbose.org/Admin/Upload/10thEnglishMQP2026-27.pdf)
- [HPBOSE 2026–27 Mathematics model paper](https://www.hpbose.org/Admin/Upload/10thMathsMQP2026-27.pdf)
- [HPBOSE official model-question-paper portal](https://www.hpbose.org/ModelQuesPpr.aspx)

All in-app notes are original Minus Study explanations and are **not** a textbook replacement. NCERT books are cross-references where prescribed; an NCERT chapter is **not automatically included** in the HPBOSE examination syllabus. Chapters carry `HPBOSE scope`, `NCERT cross-reference` or `Verify scope` labels. Students should confirm optional subjects, Course A/B, deleted portions and editions with their school and the latest official notice.

No copyrighted textbook is copied, mirrored or redistributed. External book/paper links open the official publisher/Board website. No unavailable PDF or fake download button is presented.

## Tech stack

- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4
- Drizzle ORM + PostgreSQL for anonymous workspaces
- Optional Supabase Auth and RLS-protected PostgreSQL storage
- Server-side OpenAI-compatible `/chat/completions` adapter with SSE streaming
- Web Speech API for recognition/synthesis; no audio recording or autoplay

## Quick start

```bash
npm install
cp .env.example .env
# Set DATABASE_URL; AI and Supabase values are optional.
npx drizzle-kit push
npm run dev
```

Open `http://localhost:3000`. `/api/health` verifies the local database connection.

Without Supabase, the app creates a random anonymous workspace id in an HTTP-only cookie and stores progress, goals, quiz attempts, activity, preferences and optional chat text in local PostgreSQL. Without an AI key, the tutor shows exact setup instructions and never produces a fake response.

## Environment variables

See `.env.example`. Important rules:

- `AI_API_KEY` / `OPENAI_API_KEY` are **server-only**. Put secrets in `.env.local` (ignored by Git) or your host's secret store. Never use a `NEXT_PUBLIC_` prefix for an AI key.
- If a key is ever pasted into chat, logs or a screenshot, **revoke and rotate it immediately**; assume it is compromised.
- A configured key still needs available provider credits/quota. HTTP 429 or other provider errors are displayed honestly; Minus Study never substitutes a fake AI answer.
- `AI_MODEL` must be a model available to your key. `AI_BASE_URL` must expose an OpenAI-compatible `/chat/completions` endpoint.
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are intentionally public client configuration. The Supabase service-role key is never used by this app.
- `DATABASE_URL` is required for local Drizzle storage and `/api/health`.

## Supabase setup

1. Create a Supabase project.
2. Run [`supabase/migrations/0001_minus_study.sql`](supabase/migrations/0001_minus_study.sql) in the SQL Editor or with `supabase db push`.
3. In **Authentication → Providers**, enable Email and magic-link/OTP sign-in. Add your local and production URLs to **URL Configuration → Redirect URLs**.
4. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env` or your host, then restart.
5. In Settings, enter only an email address and request the secure sign-in link. No name, phone number or other personal information is requested.
6. RLS policies allow an authenticated student to `select`, `insert` and `update` only the row where `auth.uid() = user_id`. There is no public/anon policy and no delete policy.

Server routes verify the browser's access token with `auth.getUser(token)` and construct a user-scoped Supabase client. The service-role key is never used, so RLS cannot be bypassed by the app.

## AI Tutor setup

See [`docs/AI_SETUP.md`](docs/AI_SETUP.md). In short: set `AI_API_KEY`, `AI_MODEL`, optionally `AI_BASE_URL`, and restart. Voice architecture is explained there too.

## Deployment

See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

## Database migrations

- `src/db/schema.ts` — canonical Drizzle table definition for local anonymous workspaces.
- `drizzle/0001_guest_workspaces.sql` — equivalent SQL migration for self-hosted PostgreSQL.
- `supabase/migrations/0001_minus_study.sql` — signed-in student workspace with RLS.

## Validation

```bash
npx next typegen
npm exec tsc -- --noEmit --pretty false
npm run build
```

Then start with `npm run start` (or your platform's build/start command) and check `/api/health`.

## Performance and accessibility

- Server-rendered route shells and small client components; no autoplay video, animation loop or background polling.
- Library results load 12 at a time; chapter routes are statically generated.
- Keyboard-accessible navigation, form controls, quiz radios and AI shortcuts: Enter sends, Shift+Enter adds a line, Alt+M toggles the microphone.
- Loading, error, empty and AI-not-configured states are explicit. Reduced-motion preferences are respected.
- Microphone permission is requested only after a user action; the permission stream is stopped immediately. No raw voice recording is stored or uploaded.

## Combined build notes
This combined package uses the more complete workspace/syllabus-planner implementation as its main app. Additional curriculum reference data, Maths Lab tools, and alternative AI/voice adapters from the companion version are preserved in `src/data/reference-curriculum-v1/`, `src/components/optional-tools/`, and `src/lib/optional-v1/`. See `MERGE_NOTES.md` before wiring those optional modules into the main UI.
