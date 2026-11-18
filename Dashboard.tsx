"use client";

import Link from "next/link";
import {
  ArrowRight, BookOpen, Bot, Check, CircleHelp, ClipboardList, ExternalLink, FileText,
  LibraryBig, Plus, Sparkles, Target, Trash2, TrendingUp,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useWorkspace } from "@/components/WorkspaceProvider";
import {
  ArrowLink, Badge, Card, EmptyState, PageIntro, ProgressBar, SectionTitle,
  SubjectIcon, formatDate, percent,
} from "@/components/ui";
import { allChapters, getSubject, mainSubjects, OFFICIAL_LINKS, subjects, subjectOfChapter } from "@/lib/curriculum";
import { quizQuestions } from "@/lib/quizzes";
import { mathSamplePapers } from "@/lib/samplePapers";
import { getSyllabusProgress, syllabusProgressLabel } from "@/lib/syllabus-progress";
import type { Chapter } from "@/lib/types";

function today(): string { return new Date().toISOString().slice(0, 10); }

function chapterProgress(state: ReturnType<typeof useWorkspace>["state"], chapter: Chapter) {
  return state.progress.find((item) => item.chapterId === chapter.id)?.status ?? "not_started";
}

export function Dashboard() {
  const { state, mutate, config, saving } = useWorkspace();
  const [newGoal, setNewGoal] = useState("");
  const [adding, setAdding] = useState(false);

  const completed = useMemo(() => state.progress.filter((item) => item.status === "completed").length, [state.progress]);
  const inProgress = state.progress.filter((item) => item.status === "in_progress");
  const overall = percent(completed, allChapters.length);
  const todayGoals = state.goals.filter((goal) => !goal.dueDate || goal.dueDate === today());
  const doneToday = todayGoals.filter((goal) => goal.completed).length;
  const recentActivity = state.activity.slice(0, 5);
  const latestAttempt = state.quizAttempts[0];

  const continueChapter = useMemo(() => {
    const lastInProgress = [...inProgress]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .map((item) => allChapters.find((chapter) => chapter.id === item.chapterId))
      .find((chapter): chapter is Chapter => Boolean(chapter));
    return lastInProgress ?? allChapters[0];
  }, [inProgress]);
  const continueSubject = subjectOfChapter(continueChapter.id);
  const isSuggested = !inProgress.some((item) => item.chapterId === continueChapter.id);

  async function addGoal(event: React.FormEvent) {
    event.preventDefault();
    const title = newGoal.trim();
    if (title.length < 2) return;
    setAdding(true);
    const result = await mutate({ type: "addGoal", title, dueDate: today() });
    if (result) setNewGoal("");
    setAdding(false);
  }

  return (
    <div className="animate-enter space-y-8">
      <PageIntro
        eyebrow="Your study space"
        title={`Welcome back, ${state.preferences.displayName || "Student"}!`}
        description="A calm place to learn, practise and revise for Class 10 — in Hindi, Hinglish or English."
        action={<Link href="/library" className="btn-secondary"><LibraryBig size={17} aria-hidden="true" />Browse library</Link>}
      />

      <section className="grid gap-4 lg:grid-cols-3" aria-label="Study overview">
        <Card className="p-5 lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <Badge>Class 10 · HPBOSE + NCERT</Badge>
              <h2 className="mt-4 text-xl font-bold text-slate-950">Overall study progress</h2>
              <p className="mt-1 text-sm text-slate-500">Based only on chapters you mark complete.</p>
            </div>
            <Link href="/progress" className="btn-ghost">View details <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
          <div className="mt-7 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <ProgressBar value={overall} label={`${completed} of ${allChapters.length} chapters complete`} />
              <div className="mt-5 grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xl font-bold text-slate-950">{inProgress.length}</p>
                  <p className="text-xs text-slate-500">In progress</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xl font-bold text-slate-950">{state.quizAttempts.length}</p>
                  <p className="text-xs text-slate-500">Quizzes taken</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xl font-bold text-slate-950">{latestAttempt ? `${percent(latestAttempt.score, latestAttempt.total)}%` : "—"}</p>
                  <p className="text-xs text-slate-500">Latest score</p>
                </div>
              </div>
            </div>
            <div className="hidden h-24 w-24 shrink-0 place-items-center rounded-full border-[10px] border-blue-100 sm:grid">
              <span className="text-xl font-bold text-blue-700">{overall}%</span>
            </div>
          </div>
        </Card>

        <Card className="flex flex-col justify-between bg-blue-600 p-5 text-white" >
          <div>
            <div className="flex items-center gap-2 text-blue-100"><Sparkles size={17} aria-hidden="true" /><span className="text-xs font-bold uppercase tracking-wider">Minus AI Tutor</span></div>
            <h2 className="mt-4 text-xl font-bold">Stuck on a concept?</h2>
            <p className="mt-2 text-sm leading-relaxed text-blue-50">Get patient, step-by-step explanations in Hindi, Hinglish or English. Ask for practice questions or get your answer checked.</p>
          </div>
          <div className="mt-6">
            <Link href="/ai-tutor" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-blue-700 hover:bg-blue-50">
              <Bot size={17} aria-hidden="true" />Open AI Tutor
            </Link>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-blue-100">
              <span className={`h-2 w-2 rounded-full ${config.aiConfigured ? "bg-emerald-300" : "bg-amber-300"}`} aria-hidden="true" />
              {config.aiConfigured ? "Server-side AI key configured; provider availability may vary" : "AI key not configured — setup shown in Settings"}
            </p>
          </div>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="p-5 sm:p-6">
          <SectionTitle
            title="Today's study goals"
            description={`${doneToday} of ${todayGoals.length} complete`}
            action={<Link href="/progress" className="btn-ghost">Manage goals <ArrowRight size={15} aria-hidden="true" /></Link>}
          />
          {todayGoals.length === 0 ? (
            <EmptyState title="No goals for today" description="Add one small, specific task. Tiny consistent steps are easier to finish." icon={<Target size={20} aria-hidden="true" />} />
          ) : (
            <ul className="space-y-2">
              {todayGoals.map((goal) => (
                <li key={goal.id} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
                  <button
                    type="button"
                    onClick={() => void mutate({ type: "toggleGoal", id: goal.id, completed: !goal.completed })}
                    disabled={saving}
                    aria-label={`${goal.completed ? "Mark incomplete" : "Mark complete"}: ${goal.title}`}
                    aria-pressed={goal.completed}
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${goal.completed ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white text-transparent hover:border-blue-500"}`}
                  >
                    <Check size={15} aria-hidden="true" />
                  </button>
                  <span className={`min-w-0 flex-1 text-sm ${goal.completed ? "text-slate-400 line-through" : "font-medium text-slate-700"}`}>{goal.title}</span>
                  {goal.chapterId && <Link href={`/subjects/${subjectOfChapter(goal.chapterId)?.id ?? "mathematics"}/${goal.chapterId}`} className="hidden text-xs font-bold text-blue-600 hover:underline sm:inline">Open chapter</Link>}
                  <button type="button" className="btn-ghost px-2 text-slate-400 hover:text-rose-600" aria-label={`Delete goal: ${goal.title}`} onClick={() => void mutate({ type: "deleteGoal", id: goal.id })}><Trash2 size={15} aria-hidden="true" /></button>
                </li>
              ))}
            </ul>
          )}
          <form onSubmit={addGoal} className="mt-4 flex flex-col gap-2 sm:flex-row">
            <label className="sr-only" htmlFor="new-goal">Add a study goal</label>
            <input id="new-goal" className="input" value={newGoal} onChange={(event) => setNewGoal(event.target.value)} maxLength={120} placeholder="e.g. Revise chemical reactions for 20 minutes" />
            <button className="btn-primary shrink-0" type="submit" disabled={adding || newGoal.trim().length < 2}><Plus size={16} aria-hidden="true" />Add goal</button>
          </form>
        </Card>

        <Card className="p-5 sm:p-6">
          <SectionTitle title="Continue learning" description={isSuggested ? "Suggested starting point — no chapter is in progress yet." : "Pick up where you left off."} />
          {continueSubject && (
            <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm"><SubjectIcon icon={continueSubject.icon} /></span>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wide text-blue-700">{continueSubject.name}</p>
                  <h3 className="truncate font-bold text-slate-950">{continueChapter.title}</h3>
                </div>
              </div>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">{continueChapter.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href={`/subjects/${continueSubject.id}/${continueChapter.id}`} className="btn-primary"><BookOpen size={16} aria-hidden="true" />Continue chapter</Link>
                <Link href={`/ai-tutor?subject=${continueSubject.id}&chapter=${continueChapter.id}`} className="btn-secondary"><CircleHelp size={16} aria-hidden="true" />Ask AI</Link>
              </div>
            </div>
          )}
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Link href="/practice" className="rounded-xl border border-slate-200 p-3 transition-colors hover:border-blue-200 hover:bg-blue-50/50">
              <ClipboardList size={18} className="text-blue-600" aria-hidden="true" />
              <p className="mt-2 text-sm font-bold text-slate-900">Practice test</p>
              <p className="text-xs text-slate-500">{quizQuestions.length} original questions</p>
            </Link>
            <Link href="/library" className="rounded-xl border border-slate-200 p-3 transition-colors hover:border-blue-200 hover:bg-blue-50/50">
              <LibraryBig size={18} className="text-blue-600" aria-hidden="true" />
              <p className="mt-2 text-sm font-bold text-slate-900">Study library</p>
              <p className="text-xs text-slate-500">Notes & official links</p>
            </Link>
            <Link href="/sample-papers" className="rounded-xl border border-blue-200 bg-blue-50/50 p-3 transition-colors hover:bg-blue-100/70">
              <FileText size={18} className="text-blue-600" aria-hidden="true" />
              <p className="mt-2 text-sm font-bold text-slate-900">Maths papers</p>
              <p className="text-xs text-slate-500">{mathSamplePapers.length} chapter papers + answer keys</p>
            </Link>
          </div>
        </Card>
      </section>

      <section>
        <SectionTitle title="Your subjects" description="Progress is calculated from your own chapter updates." action={<ArrowLink href="/subjects">View all subjects</ArrowLink>} />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {subjects.map((subject) => {
            const done = subject.chapters.filter((chapter) => chapterProgress(state, chapter) === "completed").length;
            const value = percent(done, subject.chapters.length);
            return (
              <Link key={subject.id} href={`/subjects/${subject.id}`} className="card card-hover block p-5 focus-visible:outline-offset-4">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: subject.softAccent, color: subject.accent }}><SubjectIcon icon={subject.icon} /></span>
                  <Badge tone="slate">{done}/{subject.chapters.length} done</Badge>
                </div>
                <h3 className="mt-4 font-bold text-slate-950">{subject.name}</h3>
                <p className="mt-1 line-clamp-2 min-h-10 text-xs leading-relaxed text-slate-500">{subject.tagline}</p>
                <div className="mt-4"><ProgressBar value={value} color={subject.accent} /></div>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <SectionTitle title="Main subjects" description="Science, Mathematics and Social Science pinned for quick planning. This is a study shortcut, not an official HPBOSE category." action={<ArrowLink href="/syllabus">Manage my syllabus</ArrowLink>} />
        <div className="grid gap-4 md:grid-cols-3">
          {mainSubjects.map((subject) => {
            const syllabus = getSyllabusProgress(state, subject.id);
            return (
              <Card key={subject.id} hover className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: subject.softAccent, color: subject.accent }}><SubjectIcon icon={subject.icon} /></span>
                  <Badge tone="blue">Main</Badge>
                </div>
                <h3 className="mt-3 font-bold text-slate-950">{subject.name}</h3>
                <p className="mt-1 text-sm text-slate-500">My syllabus: {syllabusProgressLabel(syllabus)}</p>
                <div className="mt-3"><ProgressBar value={syllabus.value} color={subject.accent} /></div>
                <div className="mt-3"><ArrowLink href={`/syllabus?subject=${subject.id}`}>Open planner</ArrowLink></div>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="p-5 sm:p-6">
          <SectionTitle title="Recent activity" description="Only actions you take are recorded." action={<button type="button" className="btn-ghost" disabled={state.activity.length === 0} onClick={() => void mutate({ type: "clearActivity" })}>Clear activity</button>} />
          {recentActivity.length === 0 ? (
            <EmptyState title="No activity yet" description="Complete a chapter, finish a goal or take a quiz — your history will appear here." icon={<TrendingUp size={20} aria-hidden="true" />} />
          ) : (
            <ul className="divide-y divide-slate-100">
              {recentActivity.map((item) => (
                <li key={item.id} className="flex items-center gap-3 py-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600"><TrendingUp size={15} aria-hidden="true" /></span>
                  <span className="min-w-0 flex-1 truncate text-sm text-slate-700">{item.label}</span>
                  <time className="shrink-0 text-xs text-slate-400" dateTime={item.createdAt}>{formatDate(item.createdAt, true)}</time>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="p-5 sm:p-6">
          <SectionTitle title="Curriculum reference" description="Know exactly what you are studying." />
          <p className="text-sm leading-relaxed text-slate-600">The official HPBOSE 2026–27 book list and subject syllabi guide this platform. NCERT books are cross-references where prescribed; not every NCERT chapter is in the HPBOSE examination syllabus.</p>
          <div className="mt-4 space-y-2">
            <a href={OFFICIAL_LINKS.bookList2026} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:border-blue-200 hover:bg-blue-50">
              Official 2026–27 book list <ExternalLink size={15} aria-hidden="true" />
            </a>
            <a href={OFFICIAL_LINKS.hpboseHome} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:border-blue-200 hover:bg-blue-50">
              HPBOSE official website <ExternalLink size={15} aria-hidden="true" />
            </a>
            <a href={OFFICIAL_LINKS.ncertTextbookPortal} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:border-blue-200 hover:bg-blue-50">
              NCERT official textbook portal <ExternalLink size={15} aria-hidden="true" />
            </a>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-slate-500">{getSubject("science")?.curriculumNote}</p>
        </Card>
      </section>
    </div>
  );
}
