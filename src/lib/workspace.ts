import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { guestWorkspaces } from "@/db/schema";
import { allChapters, subjects } from "@/lib/curriculum";
import type {
  Activity,
  ChatMessage,
  ChapterStatus,
  Goal,
  Preferences,
  ProgressRecord,
  QuizAttempt,
  SyllabusItem,
  TutorLanguage,
  WorkspaceAction,
  WorkspaceState,
} from "@/lib/types";

export const WORKSPACE_COOKIE = "minus_study_workspace";
const chapterIds = new Set(allChapters.map((chapter) => chapter.id));
const chapterSubject = new Map(allChapters.map((chapter) => [chapter.id, chapter.subjectId]));
const subjectIds = new Set(subjects.map((subject) => subject.id));
const statusValues: ChapterStatus[] = ["not_started", "in_progress", "completed"];
const languageValues: TutorLanguage[] = ["english", "hinglish", "hindi"];
const syllabusSources = ["custom", "curriculum"] as const;
const activityTypes: Activity["type"][] = ["chapter", "quiz", "goal", "revision", "tutor", "syllabus"];

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function str(value: unknown, fallback = "", max = 500): string {
  return typeof value === "string" ? value.trim().slice(0, max) : fallback;
}

function iso(value: unknown): string {
  if (typeof value === "string") {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) return date.toISOString();
  }
  return new Date().toISOString();
}

function oneOf<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  return allowed.includes(value as T) ? (value as T) : fallback;
}

function boundedNumber(value: unknown, min: number, max: number, fallback: number): number {
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, Math.round(parsed)));
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function dateOnly(): string {
  return new Date().toISOString().slice(0, 10);
}

export function defaultState(): WorkspaceState {
  return {
    progress: [],
    goals: [
      { id: "starter-revise", title: "Revise one chapter for 20 minutes", completed: false, createdAt: new Date().toISOString(), dueDate: dateOnly() },
      { id: "starter-quiz", title: "Complete one short chapter quiz", completed: false, createdAt: new Date().toISOString(), dueDate: dateOnly() },
      { id: "starter-doubt", title: "Ask Minus AI Tutor one concept question", completed: false, createdAt: new Date().toISOString(), dueDate: dateOnly() },
    ],
    quizAttempts: [],
    activity: [],
    syllabusItems: [],
    chatMessages: [],
    preferences: {
      displayName: "Student",
      language: "english",
      dailyGoalMinutes: 60,
      speechEnabled: true,
      compactMode: false,
      saveChatHistory: true,
    },
  };
}

function normalizePreferences(value: unknown): Preferences {
  const raw = isObject(value) ? value : {};
  const base = defaultState().preferences;
  return {
    displayName: str(raw.displayName, base.displayName, 40) || base.displayName,
    language: oneOf(raw.language, languageValues, base.language),
    dailyGoalMinutes: boundedNumber(raw.dailyGoalMinutes, 10, 480, base.dailyGoalMinutes),
    speechEnabled: typeof raw.speechEnabled === "boolean" ? raw.speechEnabled : base.speechEnabled,
    compactMode: typeof raw.compactMode === "boolean" ? raw.compactMode : base.compactMode,
    saveChatHistory: typeof raw.saveChatHistory === "boolean" ? raw.saveChatHistory : base.saveChatHistory,
  };
}

function normalizeProgress(value: unknown): ProgressRecord[] {
  return asArray(value)
    .filter(isObject)
    .filter((row) => chapterIds.has(str(row.chapterId, "", 120)))
    .slice(-200)
    .map((row) => ({
      chapterId: str(row.chapterId, "", 120),
      status: oneOf(row.status, statusValues, "not_started"),
      updatedAt: iso(row.updatedAt),
    }));
}

function normalizeGoals(value: unknown): Goal[] {
  return asArray(value)
    .filter(isObject)
    .slice(-100)
    .map((row) => ({
      id: str(row.id, "", 80) || crypto.randomUUID(),
      title: str(row.title, "", 120),
      chapterId: chapterIds.has(str(row.chapterId, "", 120)) ? str(row.chapterId, "", 120) : undefined,
      completed: Boolean(row.completed),
      createdAt: iso(row.createdAt),
      dueDate: typeof row.dueDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(row.dueDate) ? row.dueDate : undefined,
    }))
    .filter((goal) => goal.title.length > 0);
}

function normalizeAttempts(value: unknown): QuizAttempt[] {
  return asArray(value)
    .filter(isObject)
    .slice(-200)
    .map((row) => {
      const total = boundedNumber(row.total, 1, 100, 1);
      return {
        id: str(row.id, "", 80) || crypto.randomUUID(),
        quizId: str(row.quizId, "", 120),
        quizTitle: str(row.quizTitle, "Practice quiz", 160),
        subjectId: str(row.subjectId, "", 80) || null,
        chapterId: str(row.chapterId, "", 120) || null,
        score: Math.min(total, boundedNumber(row.score, 0, 100, 0)),
        total,
        weakTopics: asArray(row.weakTopics).map((topic) => str(topic, "", 100)).filter(Boolean).slice(0, 20),
        createdAt: iso(row.createdAt),
      };
    });
}

function normalizeActivity(value: unknown): Activity[] {
  return asArray(value)
    .filter(isObject)
    .slice(-60)
    .map((row) => ({
      id: str(row.id, "", 80) || crypto.randomUUID(),
      label: str(row.label, "", 200),
      type: oneOf(row.type, activityTypes, "revision"),
      createdAt: iso(row.createdAt),
    }))
    .filter((item) => item.label.length > 0);
}

function normalizeChat(value: unknown): ChatMessage[] {
  return asArray(value)
    .filter(isObject)
    .slice(-100)
    .map((row) => ({
      id: str(row.id, "", 80) || crypto.randomUUID(),
      role: (row.role === "assistant" ? "assistant" : "user") as ChatMessage["role"],
      content: str(row.content, "", 6000),
      language: oneOf(row.language, languageValues, "english"),
      subjectId: str(row.subjectId, "", 80),
      createdAt: iso(row.createdAt),
    }))
    .filter((message) => message.content.length > 0);
}

function normalizeSyllabusItems(value: unknown): SyllabusItem[] {
  return asArray(value)
    .filter(isObject)
    .slice(-500)
    .map((row) => {
      const subjectId = str(row.subjectId, "", 80);
      const rawChapterId = str(row.chapterId, "", 120);
      const linkedChapterId = chapterSubject.get(rawChapterId) === subjectId ? rawChapterId : undefined;
      return {
        id: str(row.id, "", 80) || crypto.randomUUID(),
        subjectId,
        title: str(row.title, "", 160),
        unit: str(row.unit, "My syllabus", 100) || "My syllabus",
        chapterId: linkedChapterId,
        status: oneOf(row.status, statusValues, "not_started"),
        source: oneOf(row.source, syllabusSources, "custom"),
        createdAt: iso(row.createdAt),
        updatedAt: iso(row.updatedAt),
      };
    })
    .filter((item) => subjectIds.has(item.subjectId) && item.title.length > 0);
}

export function normalizeState(value: unknown): WorkspaceState {
  const raw = isObject(value) ? value : {};
  const base = defaultState();
  return {
    progress: normalizeProgress(raw.progress),
    goals: normalizeGoals(raw.goals),
    quizAttempts: normalizeAttempts(raw.quizAttempts),
    activity: normalizeActivity(raw.activity),
    chatMessages: normalizeChat(raw.chatMessages),
    syllabusItems: normalizeSyllabusItems(raw.syllabusItems),
    preferences: normalizePreferences(raw.preferences),
  };
}

export interface SupabaseContext {
  client: SupabaseClient;
  userId: string;
  email: string | undefined;
}

export interface WorkspaceContext {
  workspaceId: string;
  isNewCookie: boolean;
  supabase: SupabaseContext | null;
}

export function publicConfig() {
  const supabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
  const aiKey = process.env.AI_API_KEY || process.env.OPENAI_API_KEY;
  return {
    supabaseConfigured,
    aiConfigured: Boolean(aiKey),
    aiModel: process.env.AI_MODEL || (aiKey ? "configured" : "not-configured"),
    aiStreaming: process.env.AI_STREAMING !== "false",
  };
}

export async function resolveWorkspaceContext(request: NextRequest): Promise<WorkspaceContext> {
  const existing = request.cookies.get(WORKSPACE_COOKIE)?.value;
  const validCookie = existing && /^[0-9a-f-]{36}$/i.test(existing);
  const workspaceId = validCookie ? existing : crypto.randomUUID();
  const token = request.headers.get("x-supabase-token");
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  let supabase: SupabaseContext | null = null;

  if (url && anonKey && token) {
    const client = createClient(url, anonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    });
    const { data, error } = await client.auth.getUser(token);
    if (!error && data.user) {
      supabase = { client, userId: data.user.id, email: data.user.email ?? undefined };
    }
  }

  return { workspaceId, isNewCookie: !validCookie, supabase };
}

export function withWorkspaceCookie(response: NextResponse, context: WorkspaceContext): NextResponse {
  if (context.isNewCookie) {
    response.cookies.set(WORKSPACE_COOKIE, context.workspaceId, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }
  return response;
}

export async function loadWorkspace(context: WorkspaceContext): Promise<WorkspaceState> {
  if (context.supabase) {
    const { data, error } = await context.supabase.client
      .from("student_workspaces")
      .select("state")
      .eq("user_id", context.supabase.userId)
      .maybeSingle();
    if (error) throw new Error(`Supabase workspace read failed: ${error.message}`);
    return data?.state ? normalizeState(data.state) : defaultState();
  }

  const rows = await db
    .select({ state: guestWorkspaces.state })
    .from(guestWorkspaces)
    .where(eq(guestWorkspaces.workspaceId, context.workspaceId))
    .limit(1);
  return rows[0]?.state ? normalizeState(rows[0].state) : defaultState();
}

export async function saveWorkspace(
  context: WorkspaceContext,
  state: WorkspaceState,
): Promise<void> {
  const normalized = normalizeState(state);
  if (context.supabase) {
    const { error } = await context.supabase.client.from("student_workspaces").upsert(
      {
        user_id: context.supabase.userId,
        state: normalized,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    );
    if (error) throw new Error(`Supabase workspace write failed: ${error.message}`);
    return;
  }

  await db
    .insert(guestWorkspaces)
    .values({ workspaceId: context.workspaceId, state: normalized, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: guestWorkspaces.workspaceId,
      set: { state: normalized, updatedAt: new Date() },
    });
}

function addActivity(state: WorkspaceState, label: string, type: Activity["type"]): WorkspaceState {
  return {
    ...state,
    activity: [
      { id: crypto.randomUUID(), label, type, createdAt: new Date().toISOString() },
      ...state.activity,
    ].slice(0, 60),
  };
}

export function applyAction(state: WorkspaceState, action: WorkspaceAction): WorkspaceState {
  const now = new Date().toISOString();
  switch (action.type) {
    case "setProgress": {
      const chapterId = str(action.chapterId, "", 120);
      const status = oneOf(action.status, statusValues, "not_started");
      if (!chapterIds.has(chapterId)) return state;
      const previous = state.progress.find((item) => item.chapterId === chapterId);
      const nextProgress = previous
        ? state.progress.map((item) => item.chapterId === chapterId ? { ...item, status, updatedAt: now } : item)
        : [...state.progress, { chapterId, status, updatedAt: now }];
      const nextSyllabusItems = state.syllabusItems.map((item) =>
        item.chapterId === chapterId ? { ...item, status, updatedAt: now } : item,
      );
      let next: WorkspaceState = { ...state, progress: nextProgress.slice(-200), syllabusItems: nextSyllabusItems };
      if (status === "completed" && previous?.status !== "completed") {
        const chapter = allChapters.find((item) => item.id === chapterId);
        next = addActivity(next, `Completed chapter: ${chapter?.title ?? chapterId}`, "chapter");
      }
      return next;
    }
    case "addGoal": {
      const title = str(action.title, "", 120);
      if (title.length < 2) return state;
      const chapterId = chapterIds.has(str(action.chapterId, "", 120)) ? str(action.chapterId, "", 120) : undefined;
      const dueDate = typeof action.dueDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(action.dueDate) ? action.dueDate : undefined;
      const goal: Goal = { id: crypto.randomUUID(), title, chapterId, dueDate, completed: false, createdAt: now };
      return { ...state, goals: [goal, ...state.goals].slice(0, 100) };
    }
    case "toggleGoal": {
      const goal = state.goals.find((item) => item.id === action.id);
      if (!goal) return state;
      const goals = state.goals.map((item) => item.id === action.id ? { ...item, completed: Boolean(action.completed) } : item);
      let next: WorkspaceState = { ...state, goals };
      if (action.completed && !goal.completed) next = addActivity(next, `Completed goal: ${goal.title}`, "goal");
      return next;
    }
    case "deleteGoal":
      return { ...state, goals: state.goals.filter((goal) => goal.id !== action.id) };
    case "recordQuiz": {
      const raw = action.attempt;
      const total = boundedNumber(raw.total, 1, 100, 1);
      const score = Math.min(total, boundedNumber(raw.score, 0, 100, 0));
      const attempt: QuizAttempt = {
        id: crypto.randomUUID(),
        quizId: str(raw.quizId, "", 120),
        quizTitle: str(raw.quizTitle, "Practice quiz", 160),
        subjectId: str(raw.subjectId, "", 80) || null,
        chapterId: str(raw.chapterId, "", 120) || null,
        score,
        total,
        weakTopics: asArray(raw.weakTopics).map((topic) => str(topic, "", 100)).filter(Boolean).slice(0, 20),
        createdAt: now,
      };
      return addActivity(
        { ...state, quizAttempts: [attempt, ...state.quizAttempts].slice(0, 200) },
        `Scored ${score}/${total} on ${attempt.quizTitle}`,
        "quiz",
      );
    }
    case "savePreferences":
      return { ...state, preferences: normalizePreferences(action.preferences) };
    case "appendChat": {
      if (!state.preferences.saveChatHistory) return state;
      const messages: ChatMessage[] = asArray(action.messages)
        .filter(isObject)
        .slice(0, 10)
        .map((row) => ({
          id: crypto.randomUUID(),
          role: (row.role === "assistant" ? "assistant" : "user") as ChatMessage["role"],
          content: str(row.content, "", 6000),
          language: oneOf(row.language, languageValues, state.preferences.language),
          subjectId: str(row.subjectId, "", 80),
          createdAt: now,
        }))
        .filter((message) => message.content.length > 0);
      return { ...state, chatMessages: [...state.chatMessages, ...messages].slice(-100) };
    }
    case "clearChat":
      return { ...state, chatMessages: [] };
    case "clearActivity":
      return { ...state, activity: [] };
    case "addSyllabusItems": {
      const subjectId = str(action.subjectId, "", 80);
      if (!subjectIds.has(subjectId)) return state;
      const existing = new Set(
        state.syllabusItems.filter((item) => item.subjectId === subjectId).map((item) => item.title.toLowerCase()),
      );
      const items: SyllabusItem[] = [];
      for (const row of asArray(action.items).filter(isObject).slice(0, 200)) {
        const title = str(row.title, "", 160);
        const key = title.toLowerCase();
        if (!title || existing.has(key)) continue;
        existing.add(key);
        const rawChapterId = str(row.chapterId, "", 120);
        const chapterId = chapterSubject.get(rawChapterId) === subjectId ? rawChapterId : undefined;
        const linkedStatus = chapterId
          ? state.progress.find((item) => item.chapterId === chapterId)?.status ?? "not_started"
          : "not_started";
        items.push({
          id: crypto.randomUUID(),
          subjectId,
          title,
          unit: str(row.unit, "My syllabus", 100) || "My syllabus",
          chapterId,
          status: linkedStatus,
          source: "custom",
          createdAt: now,
          updatedAt: now,
        });
      }
      if (!items.length) return state;
      const label = subjects.find((item) => item.id === subjectId)?.name ?? "subject";
      return addActivity(
        { ...state, syllabusItems: [...state.syllabusItems, ...items].slice(-500) },
        `Added ${items.length} syllabus item${items.length === 1 ? "" : "s"} to ${label}`,
        "syllabus",
      );
    }
    case "importCurriculumSyllabus": {
      const subjectId = str(action.subjectId, "", 80);
      const subject = subjects.find((item) => item.id === subjectId);
      if (!subject) return state;
      const existingChapterIds = new Set<string>();
      const existingTitles = new Set<string>();
      for (const item of state.syllabusItems) {
        if (item.subjectId !== subjectId) continue;
        existingTitles.add(item.title.toLowerCase());
        if (item.chapterId) existingChapterIds.add(item.chapterId);
      }
      const items: SyllabusItem[] = [];
      for (const chapter of subject.chapters) {
        const key = chapter.title.toLowerCase();
        if (existingChapterIds.has(chapter.id) || existingTitles.has(key)) continue;
        existingTitles.add(key);
        items.push({
          id: crypto.randomUUID(),
          subjectId,
          title: chapter.title,
          unit: chapter.unit,
          chapterId: chapter.id,
          status: state.progress.find((item) => item.chapterId === chapter.id)?.status ?? "not_started",
          source: "curriculum",
          createdAt: now,
          updatedAt: now,
        });
      }
      if (!items.length) return state;
      return addActivity(
        { ...state, syllabusItems: [...state.syllabusItems, ...items].slice(-500) },
        `Imported ${items.length} ${subject.name} chapter guides into My Syllabus`,
        "syllabus",
      );
    }
    case "setSyllabusStatus": {
      const item = state.syllabusItems.find((entry) => entry.id === action.id);
      if (!item) return state;
      const status = oneOf(action.status, statusValues, "not_started");
      const syllabusItems = state.syllabusItems.map((entry) =>
        entry.id === action.id ? { ...entry, status, updatedAt: now } : entry,
      );
      let progress = state.progress;
      const linkedChapterId = item.chapterId;
      if (linkedChapterId) {
        const existing = progress.find((entry) => entry.chapterId === linkedChapterId);
        progress = existing
          ? progress.map((entry) => entry.chapterId === linkedChapterId ? { ...entry, status, updatedAt: now } : entry)
          : [...progress, { chapterId: linkedChapterId, status, updatedAt: now }];
      }
      let next: WorkspaceState = { ...state, syllabusItems, progress };
      if (status === "completed" && item.status !== "completed") {
        next = addActivity(next, `Completed syllabus item: ${item.title}`, "syllabus");
      }
      return next;
    }
    case "deleteSyllabusItem":
      return { ...state, syllabusItems: state.syllabusItems.filter((item) => item.id !== action.id) };
    case "clearSubjectSyllabus": {
      const subjectId = str(action.subjectId, "", 80);
      const count = state.syllabusItems.filter((item) => item.subjectId === subjectId).length;
      if (!count) return state;
      const label = subjects.find((item) => item.id === subjectId)?.name ?? "subject";
      return addActivity(
        { ...state, syllabusItems: state.syllabusItems.filter((item) => item.subjectId !== subjectId) },
        `Cleared ${count} syllabus item${count === 1 ? "" : "s"} from ${label}`,
        "syllabus",
      );
    }
    default:
      return state;
  }
}
