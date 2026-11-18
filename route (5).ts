import { type NextRequest, NextResponse } from "next/server";
import {
  applyAction,
  loadWorkspace,
  publicConfig,
  resolveWorkspaceContext,
  saveWorkspace,
  withWorkspaceCookie,
} from "@/lib/workspace";
import type { WorkspaceAction } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const validActionTypes = new Set([
  "setProgress", "addGoal", "toggleGoal", "deleteGoal", "recordQuiz",
  "savePreferences", "appendChat", "clearChat", "clearActivity",
  "addSyllabusItems", "setSyllabusStatus", "deleteSyllabusItem",
  "importCurriculumSyllabus", "clearSubjectSyllabus",
]);

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET(request: NextRequest) {
  try {
    const context = await resolveWorkspaceContext(request);
    const state = await loadWorkspace(context);
    const response = NextResponse.json({
      state,
      backend: context.supabase ? "supabase" : "local",
      email: context.supabase?.email ?? null,
      config: publicConfig(),
    });
    return withWorkspaceCookie(response, context);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not load workspace";
    return errorResponse(message, 503);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const raw = await request.text();
    if (raw.length > 100_000) return errorResponse("Request is too large", 413);
    let body: unknown;
    try {
      body = JSON.parse(raw);
    } catch {
      return errorResponse("Invalid JSON", 400);
    }
    if (typeof body !== "object" || body === null || !("action" in body)) {
      return errorResponse("Missing action", 400);
    }
    const action = (body as { action: unknown }).action;
    if (typeof action !== "object" || action === null || !("type" in action)) {
      return errorResponse("Invalid action", 400);
    }
    const type = (action as { type: unknown }).type;
    if (typeof type !== "string" || !validActionTypes.has(type)) {
      return errorResponse("Unsupported action", 400);
    }
    const context = await resolveWorkspaceContext(request);
    const current = await loadWorkspace(context);
    const next = applyAction(current, action as WorkspaceAction);
    await saveWorkspace(context, next);
    const response = NextResponse.json({
      state: next,
      backend: context.supabase ? "supabase" : "local",
      email: context.supabase?.email ?? null,
      config: publicConfig(),
    });
    return withWorkspaceCookie(response, context);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save workspace";
    return errorResponse(message, 503);
  }
}
