# Minus Study merged build

## Chosen foundation
This project uses `minus-study-educational-platform (1).zip` as its primary foundation because it has the more complete, internally consistent workspace architecture: anonymous PostgreSQL workspaces, a detailed editable syllabus planner, 40 original chapter guides, dedicated Maths sample papers, streaming AI tutor, and deployment/security documentation.

## Added from the other version
- The first version's complete curriculum dataset is preserved under `src/data/reference-curriculum-v1/` for reference and future reconciliation.
- The first version's interactive Maths Lab tools are preserved under `src/components/optional-tools/MathsLabTools.tsx`.
- The first version's multi-provider AI tutor adapter and voice adapter are preserved under `src/lib/optional-v1/` as optional reference implementations. They are not silently wired into the main app because their API contracts differ from the selected streaming tutor architecture.
- Added the `dotenv` and `zod` dependencies used by the first version while retaining the second version's scripts and dependencies.

## Important
The primary app remains the version-2 implementation. The preserved optional/reference modules are not automatically exposed in the UI. Before production deployment, configure PostgreSQL, optionally Supabase, and a server-side AI provider key as described in README.md and docs/.
