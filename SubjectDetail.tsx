"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, ChevronRight, Clock3, ExternalLink, FileText, Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { SyllabusPlanner } from "@/components/SyllabusPlanner";
import { useWorkspace } from "@/components/WorkspaceProvider";
import {
  ArrowLink, Badge, Card, EmptyState, PageIntro, ProgressBar, ScopeBadge,
  SectionTitle, SubjectIcon, percent,
} from "@/components/ui";
import { getSubject, OFFICIAL_LINKS } from "@/lib/curriculum";
import { mathSamplePapers } from "@/lib/samplePapers";
import type { ChapterStatus } from "@/lib/types";

const statusOptions: { value: ChapterStatus; label: string }[] = [
  { value: "not_started", label: "Not started" },
  { value: "in_progress", label: "In progress" },
  { value: "completed", label: "Completed" },
];

function officialSyllabus(subjectId: string): { label: string; href: string } {
  switch (subjectId) {
    case "mathematics": return { label: "HPBOSE Mathematics syllabus", href: OFFICIAL_LINKS.mathSyllabus };
    case "science": return { label: "HPBOSE Science syllabus", href: OFFICIAL_LINKS.scienceSyllabus };
    case "english": return { label: "HPBOSE English syllabus", href: OFFICIAL_LINKS.englishSyllabus };
    case "computer-science": return { label: "HPBOSE Computer Science syllabus", href: OFFICIAL_LINKS.computerScienceSyllabus };
    case "social-science": return { label: "HPBOSE Social Science model paper", href: OFFICIAL_LINKS.socialScienceModelPaper };
    default: return { label: "Official HPBOSE 2026–27 book list", href: OFFICIAL_LINKS.bookList2026 };
  }
}

export function SubjectDetail({ subjectId }: { subjectId: string }) {
  const { state, mutate, saving } = useWorkspace();
  const [query, setQuery] = useState("");
  const subject = getSubject(subjectId);

  if (!subject) {
    return <EmptyState title="Subject not found" description="This subject is not in the current study set." action={<Link href="/subjects" className="btn-primary">Back to subjects</Link>} />;
  }

  const completed = subject.chapters.filter((chapter) => state.progress.find((item) => item.chapterId === chapter.id)?.status === "completed").length;
  const filtered = subject.chapters.filter((chapter) => {
    const needle = query.trim().toLowerCase();
    return !needle || chapter.title.toLowerCase().includes(needle) || chapter.topics.some((topic) => topic.toLowerCase().includes(needle));
  });
  const syllabus = officialSyllabus(subject.id);

  return (
    <div className="animate-enter space-y-7">
      <Link href="/subjects" className="btn-ghost -ml-2"><ArrowLeft size={16} aria-hidden="true" />All subjects</Link>
      <PageIntro
        eyebrow="Subject"
        title={subject.name}
        description={subject.tagline}
        action={<Link href={`/practice?quiz=subject-${subject.id}`} className="btn-primary">Take subject test</Link>}
      />

      <Card className="p-5 sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl" style={{ backgroundColor: subject.softAccent, color: subject.accent }}><SubjectIcon icon={subject.icon} size={28} /></span>
            <div>
              <div className="flex flex-wrap gap-2"><Badge>{subject.chapters.length} chapter guides</Badge><Badge tone="slate">Original notes</Badge>{subject.main && <Badge tone="blue">Main subject</Badge>}</div>
              <h2 className="mt-3 text-lg font-bold text-slate-950">Your progress</h2>
              <p className="text-sm text-slate-500">{completed} of {subject.chapters.length} chapters complete · update any chapter below.</p>
            </div>
          </div>
          <div className="w-full max-w-sm"><ProgressBar value={percent(completed, subject.chapters.length)} label="Subject completion" color={subject.accent} /></div>
        </div>
        <div className="mt-5 grid gap-4 border-t border-slate-100 pt-5 lg:grid-cols-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Prescribed / reference books</h3>
            <ul className="mt-2 space-y-2 text-sm text-slate-600">
              {subject.books.map((book, index) => <li key={index}><span className="font-semibold text-slate-800">{book.title}</span> · {book.publisher}{book.note ? <span className="block text-xs text-slate-500">{book.note}</span> : null}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Curriculum & scope</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{subject.curriculumNote}</p>
            <a className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:underline" href={syllabus.href} target="_blank" rel="noopener noreferrer">{syllabus.label}<ExternalLink size={14} aria-hidden="true" /></a>
          </div>
        </div>
      </Card>

      {subject.id === "mathematics" && (
        <Card className="flex flex-col gap-4 border-blue-100 bg-blue-50/50 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <FileText size={20} className="mt-0.5 shrink-0 text-blue-600" aria-hidden="true" />
            <div><h2 className="font-bold text-slate-900">{mathSamplePapers.length} original chapter sample papers</h2><p className="mt-1 text-sm leading-relaxed text-slate-600">Every HPBOSE Mathematics unit has a short practice paper with worked answer keys and honest self-assessment. These are not official HPBOSE papers.</p></div>
          </div>
          <Link href="/sample-papers" className="btn-primary shrink-0">Browse papers</Link>
        </Card>
      )}

      <SyllabusPlanner subjectId={subject.id} />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <SectionTitle title="Chapters" description="Each chapter includes notes, important questions, exercises and revision material." />
        <div className="relative w-full sm:max-w-xs">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <label htmlFor="chapter-search" className="sr-only">Search chapters</label>
          <input id="chapter-search" className="input pl-10" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search chapters or topics…" />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No matching chapters" description="Try another topic or clear the search." icon={<Search size={20} aria-hidden="true" />} />
      ) : (
        <div className="space-y-4">
          {filtered.map((chapter) => {
            const current = state.progress.find((item) => item.chapterId === chapter.id)?.status ?? "not_started";
            const href = `/subjects/${subject.id}/${chapter.id}`;
            return (
              <Card key={chapter.id} hover className="p-5 sm:p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-700">{chapter.number}</span>
                      <ScopeBadge scope={chapter.scope} />
                      <Badge tone="slate"><Clock3 size={12} aria-hidden="true" />{chapter.minutes} min</Badge>
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-slate-950">{chapter.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{chapter.summary}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {chapter.topics.slice(0, 4).map((topic) => <span key={topic} className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">{topic}</span>)}
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-amber-800">{chapter.scopeNote}</p>
                  </div>
                  <div className="w-full shrink-0 space-y-3 lg:w-56">
                    <label className="block text-xs font-bold text-slate-600" htmlFor={`status-${chapter.id}`}>Chapter status</label>
                    <select
                      id={`status-${chapter.id}`}
                      className="input"
                      value={current}
                      disabled={saving}
                      onChange={(event) => void mutate({ type: "setProgress", chapterId: chapter.id, status: event.target.value as ChapterStatus })}
                    >
                      {statusOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                    <Link href={href} className="btn-primary w-full"><BookOpen size={16} aria-hidden="true" />Read chapter</Link>
                    <div className="flex gap-2">
                      <Link href={`${href}#revision`} className="btn-ghost flex-1 border border-slate-200">Revision</Link>
                      <Link href={`/practice?quiz=test-${chapter.id}`} className="btn-ghost flex-1 border border-slate-200">Quiz</Link>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <Card className="flex flex-col gap-4 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Sparkles size={20} className="mt-0.5 text-blue-600" aria-hidden="true" />
          <div><h3 className="font-bold text-slate-900">Need another explanation?</h3><p className="text-sm text-slate-600">Ask Minus AI Tutor about any topic from this subject, in Hindi, Hinglish or English.</p></div>
        </div>
        <ArrowLink href={`/ai-tutor?subject=${subject.id}`}>Open AI Tutor <ChevronRight size={14} aria-hidden="true" /></ArrowLink>
      </Card>
    </div>
  );
}
