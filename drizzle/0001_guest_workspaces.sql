-- Local/self-hosted PostgreSQL schema for anonymous browser workspaces.
-- Drizzle's canonical schema lives in src/db/schema.ts; apply with `npx drizzle-kit push`.
CREATE TABLE IF NOT EXISTS guest_workspaces (
  workspace_id TEXT PRIMARY KEY,
  state JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS guest_workspaces_updated_at_idx
  ON guest_workspaces (updated_at DESC);
