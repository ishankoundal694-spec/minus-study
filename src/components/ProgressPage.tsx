"use client";

import Link from "next/link";
import {
  BookOpen, CalendarDays, Check, ClipboardList, ListChecks, Plus, RotateCcw, Target,
  Trash2, TrendingUp,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useWorkspace } from "@/components/WorkspaceProvider";
import {
  ArrowLink, Badge, Card, EmptyState, PageIntro, ProgressBar, SectionTitle,
  SubjectIcon, formatDate, percent,
} from "@/components/ui";
import { allChapters, subjects, subjectOfChapter } from "@/lib/curriculum";
import { getSyllabusProgress, syllabusProgressLabel } from "@/lib/syllabus-progress";
import type { ChapterStatus } from "@/lib/types";

const statuses: { value: ChapterStatus; label: string }[] = [
  { value: "not_started", label: "Not started" },
  { value: "in_progress", label: "In progress" },
  { value: "completed", label: "Completed" },
];

function today(): string { return new Date().toISOString().slice(0, 10); }

export function ProgressPage() {
  const { state, mutate, saving } = useWorkspace();
  const [title, setTitle] = useState("");
  const [chapterId, setChapterId] = useState("");
  const [dueDate, setDueDate] = useState(today());
  const [adding, setAdding] = useState(false);

  const completed = state.progress.filter((item) => item.status === "completed");
  const inProgress = state.progress.filter((item) => item.status === "in_progress");
  const subjectsStudied = new Set(state.progress.filter((item) => item.status !== "not_started").map((item) => subjectOfChapter(item.chapterId)?.id).filter(Boolean));
  const goalsDone = state.goals.filter((goal) => goal.completed).length;
  const syllabusOverall = getSyllabusProgress(state);
  const averageScore = state.quizAttempts.length
    ? Math.round(state.quizAttempts.reduce((sum, attempt) => sum + percent(attempt.score, attempt.total), 0) / state.quizAttempts.length)
    : null;
  const chapterTests = state.quizAttempts.filter((attempt) => attempt.chapterId);
  const revisionCheckpoints = new Set(chapterTests.map((attempt) => attempt.chapterId)).size;
  const weakTopics = useMemo(() => {
    const counts = new Map<string, number>();
    state.quizAttempts.forEach((attempt) => attempt.weakTopics.forEach((topic) => counts.set(topic, (counts.get(topic) ?? 0) + 1)));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [state.quizAttempts]);

  async function addGoal(event: React.FormEvent) {
    event.preventDefault();
    if (title.trim().length < 2) return;
    setAdding(true);
    const result = await mutate({ type: "addGoal", title: title.trim(), chapterId: chapterId || undefined, dueDate: dueDate || undefined });
    if (result) { setTitle(""); setChapterId(""); }
    setAdding(false);
  }

  return (
    <div className="animate-enter space-y-7">
      <PageIntro
        eyebrow="Your journey"
        title="My Progress"
        description="Every number below is calculated from actions you take. Update chapters manually whenever your classroom pace changes."
        action={<Link href="/practice" className="btn-primary"><ClipboardList size={16} aria-hidden="true" />Take a test</Link>}
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6" aria-label="Progress summary">
        {[
          { label: "Chapters completed", value: `${completed.length}/${allChapters.length}`, icon: BookOpen },
          { label: "In progress", value: `${inProgress.length}`, icon: RotateCcw },
          { label: "Subjects studied", value: `${subjectsStudied.size}/${subjects.length}`, icon: Target },
          { label: "Goals completed", value: `${goalsDone}/${state.goals.length}`, icon: Check },
          { label: "Average quiz score", value: averageScore === null ? "—" : `${averageScore}%`, icon: TrendingUp },
          { label: "My syllabus", value: syllabusOverall.hasItems ? `${syllabusOverall.completed}/${syllabusOverall.total}` : "—", icon: ListChecks },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-5">
              <div className="flex items-start justify-between gap-2"><p className="text-xs font-semibold text-slate-500">{stat.label}</p><Icon size={17} className="text-blue-600" aria-hidden="true" /></div>
              <p className="mt-3 text-2xl font-bold text-slate-950">{stat.value}</p>
            </Card>
          );
        })}
      </section>

      <Card className="p-5 sm:p-6">
        <SectionTitle title="My syllabus progress" description="Based on the complete syllabus items you add yourself." action={<ArrowLink href="/syllabus">Open syllabus planner</ArrowLink>} />
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {subjects.map((subject) => {
            const syllabus = getSyllabusProgress(state, subject.id);
            return (
              <div key={subject.id} className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-2"><span className="flex items-center gap-2 text-sm font-bold text-slate-800"><span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: subject.softAccent, color: subject.accent }}><SubjectIcon icon={subject.icon} size={15} /></span>{subject.name}</span>{subject.main && <Badge tone="blue">Main</Badge>}</div>
                <p className="mt-3 text-xs text-slate-500">{syllabusProgressLabel(syllabus)}</p>
                <div className="mt-2"><ProgressBar value={syllabus.value} color={subject.accent} /></div>
              </div>
            );
          })}
        </div>
      </Card>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-5 sm:p-6">
          <SectionTitle title="Subject completion" description="Based on chapter statuses you set." />
          <div className="space-y-4">
            {subjects.map((subject) => {
              const done = subject.chapters.filter((chapter) => state.progress.find((item) => item.chapterId === chapter.id)?.status === "completed").length;
              return (
                <div key={subject.id} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: subject.softAccent, color: subject.accent }}><SubjectIcon icon={subject.icon} size={17} /></span>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center justify-between gap-2 text-xs"><Link href={`/subjects/${subject.id}`} className="truncate font-bold text-slate-700 hover:text-blue-600 hover:underline">{subject.name}</Link><span className="shrink-0 text-slate-500">{done}/{subject.chapters.length}</span></div>
                    <ProgressBar value={percent(done, subject.chapters.length)} color={subject.accent} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 border-t border-slate-100 pt-5">
            <ProgressBar value={percent(completed.length, allChapters.length)} label="Overall chapter completion" />
            <p className="mt-3 text-xs leading-relaxed text-slate-500">A chapter counts as studied once it is marked in progress; it counts as complete only when you mark it completed.</p>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-5 sm:p-6">
            <SectionTitle title="Quiz scores" description={`${state.quizAttempts.length} recorded attempt${state.quizAttempts.length === 1 ? "" : "s"}`} />
            {state.quizAttempts.length === 0 ? (
              <EmptyState title="No quiz scores yet" description="Take any chapter or mixed test to build a real score history." icon={<ClipboardList size={20} aria-hidden="true" />} action={<Link href="/practice" className="btn-secondary">Browse tests</Link>} />
            ) : (
              <ul className="max-h-72 space-y-2 overflow-y-auto pr-1">
                {state.quizAttempts.map((attempt) => (
                  <li key={attempt.id} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${percent(attempt.score, attempt.total) >= 70 ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{percent(attempt.score, attempt.total)}%</span>
                    <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-slate-800">{attempt.quizTitle}</p><p className="text-xs text-slate-500">{attempt.score}/{attempt.total} · {formatDate(attempt.createdAt, true)}</p></div>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card className="p-5 sm:p-6">
            <SectionTitle title="Revision progress" description="Derived from recorded chapter tests." />
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-50 p-3"><p className="text-2xl font-bold text-slate-950">{chapterTests.length}</p><p className="text-xs text-slate-500">Chapter tests</p></div>
              <div className="rounded-xl bg-slate-50 p-3"><p className="text-2xl font-bold text-slate-950">{revisionCheckpoints}</p><p className="text-xs text-slate-500">Distinct chapters practised</p></div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-500">This measures practice checkpoints, not time spent revising. Use the chapter reader's revision guide for a complete recap.</p>
            {weakTopics.length > 0 && (
              <div className="mt-4 border-t border-slate-100 pt-4">
                <h3 className="text-xs font-bold text-slate-700">Topics to revisit</h3>
                <div className="mt-2 flex flex-wrap gap-1.5">{weakTopics.map(([topic, count]) => <Badge key={topic} tone="amber">{topic} · {count}×</Badge>)}</div>
                <div className="mt-3"><ArrowLink href="/practice">See revision suggestions</ArrowLink></div>
              </div>
            )}
          </Card>
        </div>
      </section>

      <Card className="p-5 sm:p-6">
        <SectionTitle title="Study goals" description="Add a goal, link it to a chapter and mark it complete when done." />
        <form onSubmit={addGoal} className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_160px_auto]">
          <div><label className="mb-1 block text-xs font-bold text-slate-600" htmlFor="goal-title">Goal</label><input id="goal-title" className="input" value={title} onChange={(event) => setTitle(event.target.value)} maxLength={120} placeholder="e.g. Revise trigonometry formulas" required /></div>
          <div><label className="mb-1 block text-xs font-bold text-slate-600" htmlFor="goal-chapter">Linked chapter (optional)</label><select id="goal-chapter" className="input" value={chapterId} onChange={(event) => setChapterId(event.target.value)}><option value="">No chapter</option>{allChapters.map((chapter) => <option key={chapter.id} value={chapter.id}>{chapter.title}</option>)}</select></div>
          <div><label className="mb-1 block text-xs font-bold text-slate-600" htmlFor="goal-date"><CalendarDays size={12} className="mr-1 inline" aria-hidden="true" />Target date</label><input id="goal-date" type="date" className="input" value={dueDate} onChange={(event) => setDueDate(event.target.value)} /></div>
          <button type="submit" className="btn-primary self-end" disabled={adding || title.trim().length < 2}><Plus size={16} aria-hidden="true" />Add goal</button>
        </form>
        {state.goals.length === 0 ? (
          <div className="mt-5"><EmptyState title="No goals yet" description="Small goals make revision easier to start. Add one above." icon={<Target size={20} aria-hidden="true" />} /></div>
        ) : (
          <ul className="mt-5 grid gap-2 lg:grid-cols-2">
            {state.goals.map((goal) => (
              <li key={goal.id} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
                <button type="button" onClick={() => void mutate({ type: "toggleGoal", id: goal.id, completed: !goal.completed })} disabled={saving} aria-label={`${goal.completed ? "Mark incomplete" : "Mark complete"}: ${goal.title}`} aria-pressed={goal.completed} className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${goal.completed ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white text-transparent hover:border-blue-500"}`}><Check size={15} aria-hidden="true" /></button>
                <div className="min-w-0 flex-1"><p className={`truncate text-sm font-medium ${goal.completed ? "text-slate-400 line-through" : "text-slate-800"}`}>{goal.title}</p><p className="text-xs text-slate-500">{goal.dueDate ? formatDate(goal.dueDate) : "No target date"}{goal.chapterId ? ` · ${allChapters.find((chapter) => chapter.id === goal.chapterId)?.title ?? ""}` : ""}</p></div>
                {goal.chapterId && <Link href={`/subjects/${subjectOfChapter(goal.chapterId)?.id ?? "mathematics"}/${goal.chapterId}`} className="hidden text-xs font-bold text-blue-600 hover:underline sm:inline">Open</Link>}
                <button type="button" className="btn-ghost px-2 text-slate-400 hover:text-rose-600" aria-label={`Delete goal: ${goal.title}`} onClick={() => void mutate({ type: "deleteGoal", id: goal.id })}><Trash2 size={15} aria-hidden="true" /></button>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card className="p-5 sm:p-6">
        <SectionTitle title="Manual chapter tracking" description="Expand a subject and set each chapter's status. Changes save automatically." />
        <div className="grid gap-3 lg:grid-cols-2">
          {subjects.map((subject) => {
            const done = subject.chapters.filter((chapter) => state.progress.find((item) => item.chapterId === chapter.id)?.status === "completed").length;
            return (
              <details key={subject.id} className="group rounded-2xl border border-slate-200 p-4 open:border-blue-200">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 marker:hidden">
                  <span className="flex items-center gap-2"><span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: subject.softAccent, color: subject.accent }}><SubjectIcon icon={subject.icon} size={16} /></span><span className="text-sm font-bold text-slate-900">{subject.name}</span></span>
                  <Badge tone="slate">{done}/{subject.chapters.length} done</Badge>
                </summary>
                <div className="mt-4 space-y-2">
                  {subject.chapters.map((chapter) => {
                    const status = state.progress.find((item) => item.chapterId === chapter.id)?.status ?? "not_started";
                    return (
                      <div key={chapter.id} className="flex flex-col gap-2 rounded-xl bg-slate-50 p-3 sm:flex-row sm:items-center">
                        <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-slate-800">{chapter.title}</p><Link href={`/subjects/${subject.id}/${chapter.id}`} className="text-xs font-bold text-blue-600 hover:underline">Open reader</Link></div>
                        <label className="sr-only" htmlFor={`progress-${chapter.id}`}>Status for {chapter.title}</label>
                        <select id={`progress-${chapter.id}`} className="input min-h-9 py-1 text-xs sm:w-36" value={status} disabled={saving} onChange={(event) => void mutate({ type: "setProgress", chapterId: chapter.id, status: event.target.value as ChapterStatus })}>
                          {statuses.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                        </select>
                      </div>
                    );
                  })}
                </div>
              </details>
            );
          })}
        </div>
      </Card>

      <Card className="p-5 sm:p-6">
        <SectionTitle title="Activity timeline" description="Your own completed chapters, goals and quizzes." action={<button type="button" className="btn-ghost" disabled={state.activity.length === 0} onClick={() => void mutate({ type: "clearActivity" })}>Clear activity</button>} />
        {state.activity.length === 0 ? <EmptyState title="No activity recorded" description="Your learning actions will appear here automatically." icon={<TrendingUp size={20} aria-hidden="true" />} /> : (
          <ul className="divide-y divide-slate-100">
            {state.activity.map((item) => <li key={item.id} className="flex flex-wrap items-center gap-3 py-3"><Badge tone="slate">{item.type}</Badge><span className="min-w-0 flex-1 text-sm text-slate-700">{item.label}</span><time className="text-xs text-slate-400" dateTime={item.createdAt}>{formatDate(item.createdAt, true)}</time></li>)}
          </ul>
        )}
      </Card>
    </div>
  );
}
