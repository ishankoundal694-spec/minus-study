"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, ArrowRight, BookOpen, Bot, CheckCircle2, ClipboardList,
  Clock3, ExternalLink, FileText, Lightbulb, ListChecks, Sigma,
} from "lucide-react";
import { useWorkspace } from "@/components/WorkspaceProvider";
import { Badge, Card, EmptyState, ScopeBadge, SubjectIcon } from "@/components/ui";
import { getChapter, getSubject, OFFICIAL_LINKS } from "@/lib/curriculum";
import type { ChapterStatus } from "@/lib/types";

const statusOptions: { value: ChapterStatus; label: string }[] = [
  { value: "not_started", label: "Not started" },
  { value: "in_progress", label: "In progress" },
  { value: "completed", label: "Completed" },
];

function sourceLink(subjectId: string): { href: string; label: string } {
  switch (subjectId) {
    case "mathematics": return { href: OFFICIAL_LINKS.mathSyllabus, label: "Official HPBOSE Mathematics syllabus" };
    case "science": return { href: OFFICIAL_LINKS.scienceSyllabus, label: "Official HPBOSE Science syllabus" };
    case "english": return { href: OFFICIAL_LINKS.englishSyllabus, label: "Official HPBOSE English syllabus" };
    case "social-science": return { href: OFFICIAL_LINKS.socialScienceModelPaper, label: "Official Social Science model paper" };
    case "computer-science": return { href: OFFICIAL_LINKS.computerScienceSyllabus, label: "Official Computer Science syllabus" };
    default: return { href: OFFICIAL_LINKS.bookList2026, label: "Official HPBOSE book list" };
  }
}

export function ChapterReader({ subjectId, chapterId }: { subjectId: string; chapterId: string }) {
  const router = useRouter();
  const { state, mutate, saving } = useWorkspace();
  const subject = getSubject(subjectId);
  const chapter = getChapter(chapterId);

  if (!subject || !chapter || chapter.subjectId !== subjectId) {
    return <EmptyState title="Chapter not found" description="This chapter is not in the current study set." action={<Link href="/subjects" className="btn-primary">Browse subjects</Link>} />;
  }

  const index = subject.chapters.findIndex((item) => item.id === chapter.id);
  const previous = subject.chapters[index - 1];
  const next = subject.chapters[index + 1];
  const status = state.progress.find((item) => item.chapterId === chapter.id)?.status ?? "not_started";
  const official = sourceLink(subject.id);

  const validSubject = subject;
  const validChapter = chapter;
  async function completeAndContinue() {
    const result = await mutate({ type: "setProgress", chapterId: validChapter.id, status: "completed" });
    if (result && next) router.push(`/subjects/${validSubject.id}/${next.id}`);
  }

  return (
    <div className="animate-enter space-y-6">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
        <Link href="/subjects" className="hover:text-blue-600 hover:underline">Subjects</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/subjects/${subject.id}`} className="hover:text-blue-600 hover:underline">{subject.name}</Link>
        <span aria-hidden="true">/</span>
        <span className="font-semibold text-slate-800">{chapter.title}</span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_290px]">
        <div className="min-w-0 space-y-6">
          <Card className="p-5 sm:p-7">
            <div className="flex flex-wrap gap-2">
              <Badge>{subject.name} · Chapter {chapter.number}</Badge>
              <ScopeBadge scope={chapter.scope} />
              <Badge tone="slate"><Clock3 size={12} aria-hidden="true" />{chapter.minutes} min</Badge>
            </div>
            <h1 className="mt-4 text-2xl font-bold leading-tight text-slate-950 sm:text-3xl">{chapter.title}</h1>
            <p className="mt-3 text-base leading-relaxed text-slate-600">{chapter.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {chapter.topics.map((topic) => <span key={topic} className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{topic}</span>)}
            </div>
            <div className="mt-6 rounded-xl border border-amber-100 bg-amber-50 p-3 text-sm leading-relaxed text-amber-900">
              <strong>Scope:</strong> {chapter.scopeNote} <span className="text-amber-800">Reference: {chapter.source}.</span>
            </div>
          </Card>

          <Card id="notes" className="scroll-mt-24 p-5 sm:p-7">
            <div className="mb-5 flex items-center gap-2"><BookOpen size={20} className="text-blue-600" aria-hidden="true" /><h2 className="text-xl font-bold text-slate-950">Detailed original notes</h2></div>
            <div className="space-y-7">
              {chapter.notes.map((section) => (
                <section key={section.heading}>
                  <h3 className="text-base font-bold text-blue-800">{section.heading}</h3>
                  <ul className="study-copy mt-2 space-y-2 text-sm">
                    {section.points.map((point, pointIndex) => <li key={pointIndex} className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" aria-hidden="true" /><span>{point}</span></li>)}
                  </ul>
                </section>
              ))}
            </div>
          </Card>

          {chapter.formulas.length > 0 && (
            <Card id="formulas" className="scroll-mt-24 p-5 sm:p-7">
              <div className="mb-4 flex items-center gap-2"><Sigma size={20} className="text-blue-600" aria-hidden="true" /><h2 className="text-xl font-bold text-slate-950">Formula & relationship sheet</h2></div>
              <div className="grid gap-3 sm:grid-cols-2">
                {chapter.formulas.map((formula) => <div key={formula} className="rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm font-semibold text-slate-800">{formula}</div>)}
              </div>
              <p className="mt-3 text-xs text-slate-500">Use the notes above for the meaning, conditions and units of each relationship.</p>
            </Card>
          )}

          <Card id="questions" className="scroll-mt-24 p-5 sm:p-7">
            <div className="mb-4 flex items-center gap-2"><ListChecks size={20} className="text-blue-600" aria-hidden="true" /><h2 className="text-xl font-bold text-slate-950">Important questions</h2></div>
            <ol className="study-copy space-y-3 text-sm">
              {chapter.importantQuestions.map((question, questionIndex) => (
                <li key={questionIndex} className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-50 text-xs font-bold text-blue-700">{questionIndex + 1}</span><span>{question}</span></li>
              ))}
            </ol>
            <Link href={`/ai-tutor?subject=${subject.id}&chapter=${chapter.id}`} className="btn-secondary mt-5"><Bot size={16} aria-hidden="true" />Ask AI to explain an answer</Link>
          </Card>

          <Card id="exercises" className="scroll-mt-24 p-5 sm:p-7">
            <div className="mb-4 flex items-center gap-2"><Lightbulb size={20} className="text-blue-600" aria-hidden="true" /><h2 className="text-xl font-bold text-slate-950">Practice exercises</h2></div>
            <div className="space-y-3">
              {chapter.exercises.map((exercise, exerciseIndex) => (
                <details key={exerciseIndex} className="group rounded-xl border border-slate-200 p-4 open:border-blue-200 open:bg-blue-50/40">
                  <summary className="cursor-pointer list-none text-sm font-semibold text-slate-800 marker:hidden">
                    <span className="mr-2 font-bold text-blue-600">Q{exerciseIndex + 1}.</span>{exercise.prompt}
                    <span className="ml-2 text-xs font-medium text-blue-600 group-open:hidden">Show hint</span>
                  </summary>
                  <p className="mt-3 border-l-2 border-blue-300 pl-3 text-sm leading-relaxed text-slate-600"><strong>Hint:</strong> {exercise.hint}</p>
                </details>
              ))}
            </div>
            <Link href={`/ai-tutor?subject=${subject.id}&chapter=${chapter.id}&mode=check`} className="btn-secondary mt-5"><Bot size={16} aria-hidden="true" />Get your answer checked</Link>
          </Card>

          <Card id="revision" className="scroll-mt-24 p-5 sm:p-7">
            <div className="mb-4 flex items-center gap-2"><CheckCircle2 size={20} className="text-blue-600" aria-hidden="true" /><h2 className="text-xl font-bold text-slate-950">Original revision guide</h2></div>
            <ul className="study-copy space-y-3 text-sm">
              {chapter.revision.map((point, pointIndex) => <li key={pointIndex} className="flex gap-2.5"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-emerald-600" aria-hidden="true" /><span>{point}</span></li>)}
            </ul>
            <Link href={`/practice?quiz=test-${chapter.id}`} className="btn-primary mt-6"><ClipboardList size={16} aria-hidden="true" />Take chapter test</Link>
          </Card>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start" aria-label="Chapter tools">
          <Card className="p-5">
            <h2 className="text-sm font-bold text-slate-900">Track your progress</h2>
            <label className="mt-3 block text-xs font-semibold text-slate-500" htmlFor="reader-status">Chapter status</label>
            <select
              id="reader-status"
              className="input mt-1.5"
              value={status}
              disabled={saving}
              onChange={(event) => void mutate({ type: "setProgress", chapterId: chapter.id, status: event.target.value as ChapterStatus })}
            >
              {statusOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
            <button type="button" className="btn-primary mt-3 w-full" disabled={saving || (status === "completed" && !next)} onClick={() => void completeAndContinue()}>
              <CheckCircle2 size={16} aria-hidden="true" />{status === "completed" ? (next ? "Continue to next chapter" : "Chapter completed") : (next ? "Mark complete & continue" : "Mark complete")}
            </button>
            <p className="mt-2 text-xs text-slate-500">Saved to your private workspace.</p>
          </Card>

          <Card className="p-5">
            <h2 className="text-sm font-bold text-slate-900">Quick tools</h2>
            <div className="mt-3 space-y-2">
              <Link href={`/ai-tutor?subject=${subject.id}&chapter=${chapter.id}`} className="btn-secondary w-full justify-start"><Bot size={16} aria-hidden="true" />Ask Minus AI</Link>
              <Link href={`/practice?quiz=test-${chapter.id}`} className="btn-secondary w-full justify-start"><ClipboardList size={16} aria-hidden="true" />Chapter quiz</Link>
              {subject.id === "mathematics" && <Link href={`/sample-papers?chapter=${chapter.id}`} className="btn-secondary w-full justify-start"><FileText size={16} aria-hidden="true" />Chapter sample paper</Link>}
              <Link href={`/library?subject=${subject.id}&chapter=${chapter.id}`} className="btn-secondary w-full justify-start"><BookOpen size={16} aria-hidden="true" />Related resources</Link>
              <a href={official.href} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full justify-start"><ExternalLink size={16} aria-hidden="true" />{official.label}</a>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ backgroundColor: subject.softAccent, color: subject.accent }}><SubjectIcon icon={subject.icon} size={18} /></span>
              <div><p className="text-xs text-slate-500">Subject</p><p className="text-sm font-bold text-slate-900">{subject.name}</p></div>
            </div>
            <Link href={`/subjects/${subject.id}`} className="btn-ghost mt-3 w-full justify-start"><ArrowLeft size={15} aria-hidden="true" />All chapters</Link>
          </Card>
        </aside>
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-between">
        {previous ? (
          <Link href={`/subjects/${subject.id}/${previous.id}`} className="btn-secondary justify-start"><ArrowLeft size={16} aria-hidden="true" /><span className="truncate">Previous: {previous.title}</span></Link>
        ) : <span />}
        {next && (
          <Link href={`/subjects/${subject.id}/${next.id}`} className="btn-primary justify-end"><span className="truncate">Next: {next.title}</span><ArrowRight size={16} aria-hidden="true" /></Link>
        )}
      </div>
    </div>
  );
}
