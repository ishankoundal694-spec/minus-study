import { jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import type { WorkspaceState } from "@/lib/types";

/**
 * A private, anonymous workspace for students who have not signed in.
 * The random workspace id lives only in an HTTP-only cookie. Signed-in
 * students use the Supabase `student_workspaces` table instead, protected by RLS.
 */
export const guestWorkspaces = pgTable("guest_workspaces", {
  workspaceId: text("workspace_id").primaryKey(),
  state: jsonb("state").$type<WorkspaceState>().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
