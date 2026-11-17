export type TutorLanguage = "english" | "hinglish" | "hindi";
export type ChapterStatus = "not_started" | "in_progress" | "completed";
export type Scope = "confirmed" | "cross_reference" | "verify";

export interface NoteSection {
  heading: string;
  points: string[];
}

export interface Exercise {
  prompt: string;
  hint: string;
}

export interface Chapter {
  id: string;
  subjectId: string;
  number: number;
  title: string;
  unit: string;
  summary: string;
  topics: string[];
  notes: NoteSection[];
  importantQuestions: string[];
  exercises: Exercise[];
  revision: string[];
  formulas: string[];
  scope: Scope;
  scopeNote: string;
  source: string;
  minutes: number;
}

export interface BookReference {
  title: string;
  publisher: string;
  note?: string;
}

export interface Subject {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  accent: string;
  softAccent: string;
  tagline: string;
  /** App-level study shortcut, not an official HPBOSE category. */
  main?: boolean;
  books: BookReference[];
  curriculumNote: string;
  chapters: Chapter[];
}

export interface QuizQuestion {
  id: string;
  subjectId: string;
  chapterId: string;
  topic: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  difficulty: "easy" | "medium" | "challenge";
}

export interface Goal {
  id: string;
  title: string;
  chapterId?: string;
  completed: boolean;
  createdAt: string;
  dueDate?: string;
}

export interface ProgressRecord {
  chapterId: string;
  status: ChapterStatus;
  updatedAt: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  quizTitle: string;
  subjectId: string | null;
  chapterId: string | null;
  score: number;
  total: number;
  weakTopics: string[];
  createdAt: string;
}

export interface Activity {
  id: string;
  label: string;
  type: "chapter" | "quiz" | "goal" | "revision" | "tutor" | "syllabus";
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  language: TutorLanguage;
  subjectId: string;
  createdAt: string;
}

export interface Preferences {
  displayName: string;
  language: TutorLanguage;
  dailyGoalMinutes: number;
  speechEnabled: boolean;
  compactMode: boolean;
  saveChatHistory: boolean;
}

export interface SyllabusItemSeed {
  title: string;
  unit?: string;
  chapterId?: string;
}

export interface SyllabusItem {
  id: string;
  subjectId: string;
  title: string;
  unit: string;
  chapterId?: string;
  status: ChapterStatus;
  source: "custom" | "curriculum";
  createdAt: string;
  updatedAt: string;
}

export type WorkspaceAction =
  | { type: "setProgress"; chapterId: string; status: ChapterStatus }
  | { type: "addGoal"; title: string; chapterId?: string; dueDate?: string }
  | { type: "toggleGoal"; id: string; completed: boolean }
  | { type: "deleteGoal"; id: string }
  | { type: "recordQuiz"; attempt: Omit<QuizAttempt, "id" | "createdAt"> }
  | { type: "savePreferences"; preferences: Preferences }
  | { type: "appendChat"; messages: Omit<ChatMessage, "id" | "createdAt">[] }
  | { type: "clearChat" }
  | { type: "clearActivity" }
  | { type: "addSyllabusItems"; subjectId: string; items: SyllabusItemSeed[] }
  | { type: "setSyllabusStatus"; id: string; status: ChapterStatus }
  | { type: "deleteSyllabusItem"; id: string }
  | { type: "importCurriculumSyllabus"; subjectId: string }
  | { type: "clearSubjectSyllabus"; subjectId: string };

export interface WorkspaceState {
  progress: ProgressRecord[];
  goals: Goal[];
  quizAttempts: QuizAttempt[];
  activity: Activity[];
  chatMessages: ChatMessage[];
  syllabusItems: SyllabusItem[];
  preferences: Preferences;
}

export interface LibraryResource {
  id: string;
  title: string;
  description: string;
  type: "Notes" | "Formula sheet" | "Revision guide" | "Sample paper" | "Official textbook" | "Official paper" | "Syllabus";
  subjectId: string | null;
  chapterId: string | null;
  href: string;
  external: boolean;
  official: boolean;
  source: string;
}
