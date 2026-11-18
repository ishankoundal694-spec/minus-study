"use client";

import Link from "next/link";
import { ExternalLink, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useWorkspace } from "@/components/WorkspaceProvider";
import { Badge, Card, EmptyState, PageIntro, ProgressBar, SectionTitle, SubjectIcon } from "@/components/ui";
import { CURRICULUM_NOTICE, OFFICIAL_LINKS, mainSubjects, subjects } from "@/lib/curriculum";
import { percent } from "@/components/ui";
import { getSyllabusProgress, syllabusProgressLabel } from "@/lib/syllabus-progress";

export function SubjectsPage() {
  const { state } = useWorkspace();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return subjects;
    return subjects.filter((subject) =>
      subject.name.toLowerCase().includes(needle) ||
      subject.tagline.toLowerCase().includes(needle) ||
      subject.chapters.some((chapter) => chapter.title.toLowerCase().includes(needle) || chapter.topics.some((topic) => topic.toLowerCase().includes(needle))),
    );
  }, [query]);

  return (
    <div className="animate-enter space-y-7">
      <PageIntro
        eyebrow="Curriculum"
        title="Subjects"
        description="Seven Class 10 subjects with original chapter notes, practice exercises, revision guides and honest syllabus-scope labels. Science, Mathematics and Social Science are pinned as main subjects."
        action={<a href={OFFICIAL_LINKS.bookList2026} target="_blank" rel="noopener noreferrer" className="btn-secondary"><ExternalLink size={16} aria-hidden="true" />Official book list</a>}
      />

      <Card className="border-blue-100 bg-blue-50/50 p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <Badge>Curriculum note</Badge>
          <p className="text-sm leading-relaxed text-slate-700">{CURRICULUM_NOTICE}</p>
        </div>
      </Card>

      <section>
        <SectionTitle title="Main subjects" description="Science, Mathematics and Social Science are a study shortcut, not an official HPBOSE category. Progress here comes from your own syllabus list." action={<Link href="/syllabus" className="btn-secondary">Open My Syllabus</Link>} />
        <div className="grid gap-4 md:grid-cols-3">
          {mainSubjects.map((subject) => {
            const syllabus = getSyllabusProgress(state, subject.id);
            return (
              <Card key={subject.id} hover className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: subject.softAccent, color: subject.accent }}><SubjectIcon icon={subject.icon} /></span>
                  <Badge tone="blue">Main</Badge>
                </div>
                <h2 className="mt-3 font-bold text-slate-950">{subject.name}</h2>
                <p className="mt-1 text-sm text-slate-500">{syllabusProgressLabel(syllabus)}</p>
                <div className="mt-3"><ProgressBar value={syllabus.value} color={subject.accent} /></div>
                <Link href={`/syllabus?subject=${subject.id}`} className="btn-secondary mt-4 w-full">Plan syllabus</Link>
              </Card>
            );
          })}
        </div>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SectionTitle title="Browse by subject" description={`${subjects.length} subjects · ${subjects.reduce((sum, subject) => sum + subject.chapters.length, 0)} in-app chapter guides`} />
        <div className="relative w-full sm:max-w-sm">
          <Search size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <label htmlFor="subject-search" className="sr-only">Search subjects and chapters</label>
          <input id="subject-search" className="input pl-10" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search subject, chapter or topic…" />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No matching subject" description="Try a different chapter name, topic or subject. You can also search the full study library." action={<Link href="/library" className="btn-secondary">Open study library</Link>} icon={<Search size={20} aria-hidden="true" />} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((subject) => {
            const done = subject.chapters.filter((chapter) => state.progress.find((item) => item.chapterId === chapter.id)?.status === "completed").length;
            return (
              <Card key={subject.id} hover className="flex flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: subject.softAccent, color: subject.accent }}><SubjectIcon icon={subject.icon} /></span>
                  <div className="flex flex-wrap justify-end gap-1.5">{subject.main && <Badge tone="blue">Main</Badge>}<Badge tone="slate">{subject.chapters.length} chapters</Badge></div>
                </div>
                <h2 className="mt-4 text-lg font-bold text-slate-950">{subject.name}</h2>
                <p className="mt-1 min-h-10 text-sm leading-relaxed text-slate-500">{subject.tagline}</p>
                <div className="mt-4"><ProgressBar value={percent(done, subject.chapters.length)} label={`${done} completed`} color={subject.accent} /></div>
                <ul className="mt-4 space-y-1.5 text-xs text-slate-600">
                  {subject.chapters.slice(0, 3).map((chapter) => <li key={chapter.id} className="truncate">• {chapter.title}</li>)}
                  {subject.chapters.length > 3 && <li className="font-semibold text-blue-600">+ {subject.chapters.length - 3} more chapters</li>}
                </ul>
                <div className="mt-auto pt-5">
                  <Link href={`/subjects/${subject.id}`} className="btn-primary w-full">Open subject <span aria-hidden="true">→</span></Link>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
