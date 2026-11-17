import type { WorkspaceState } from "./types";

export interface SyllabusProgress {
  total: number;
  completed: number;
  inProgress: number;
  notStarted: number;
  value: number;
  hasItems: boolean;
}

export function getSyllabusProgress(state: WorkspaceState, subjectId?: string): SyllabusProgress {
  const items = subjectId
    ? state.syllabusItems.filter((item) => item.subjectId === subjectId)
    : state.syllabusItems;
  const total = items.length;
  const completed = items.filter((item) => item.status === "completed").length;
  const inProgress = items.filter((item) => item.status === "in_progress").length;
  const notStarted = total - completed - inProgress;
  return {
    total,
    completed,
    inProgress,
    notStarted,
    value: total ? Math.round((completed / total) * 100) : 0,
    hasItems: total > 0,
  };
}

export function syllabusProgressLabel(progress: SyllabusProgress): string {
  return progress.hasItems ? `${progress.completed}/${progress.total} complete` : "No syllabus added";
}
