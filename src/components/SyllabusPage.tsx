"use client";

import Link from "next/link";
import { BookOpen, ExternalLink, Layers3, Target } from "lucide-react";
import { useState } from "react";
import { SyllabusPlanner } from "@/components/SyllabusPlanner";
import { useWorkspace } from "@/components/WorkspaceProvider";
import { Badge, Card, PageIntro, ProgressBar, SectionTitle, SubjectIcon } from "@/components/ui";
import { mainSubjects, OFFICIAL_LINKS, subjects } from "@/lib/curriculum";
import { getSyllabusProgress, syllabusProgressLabel } from "@/lib/syllabus-progress";

export function SyllabusPage({ initialSubject = "" }: { initialSubject?: string }) {
  const { state } = useWorkspace();
  const [selectedSubjectId, setSelectedSubjectId] = useState(
    subjects.some((subject) => subject.id === initialSubject) ? initialSubject : "science",
  );
  const overall = getSyllabusProgress(state);

  function chooseSubject(id: string) {
    setSelectedSubjectId(id);
    document.getElementById("syllabus-planner")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="animate-enter space-y-7">
      <PageIntro
        eyebrow="Complete syllabus"
        title="My Syllabus"
        description="Add the exact chapters and topics from your school, mark what is done, and see honest progress in every subject. Science, Mathematics and Social Science are pinned as your main subjects."
        action={<a href={OFFICIAL_LINKS.bookList2026} target="_blank" rel="noopener noreferrer" className="btn-secondary"><ExternalLink size={16} aria-hidden="true" />Official book list</a>}
      />

      <Card className="p-5 sm:p-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-center">
          <div>
            <Badge>Overall custom syllabus</Badge>
            <h2 className="mt-3 text-xl font-bold text-slate-950">Your full learning plan</h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">This progress is based only on syllabus items you add and mark complete. It is separate from the in-app chapter-guide progress.</p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-slate-50 p-3"><p className="text-xl font-bold text-slate-950">{overall.total}</p><p className="text-xs text-slate-500">Items added</p></div>
              <div className="rounded-xl bg-slate-50 p-3"><p className="text-xl font-bold text-slate-950">{overall.completed}</p><p className="text-xs text-slate-500">Completed</p></div>
              <div className="rounded-xl bg-slate-50 p-3"><p className="text-xl font-bold text-slate-950">{overall.inProgress}</p><p className="text-xs text-slate-500">In progress</p></div>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 p-4">
            <ProgressBar value={overall.value} label={syllabusProgressLabel(overall)} />
            <p className="mt-3 text-xs leading-relaxed text-slate-500">{overall.hasItems ? "Completed items drive this percentage; in-progress items are not counted as complete." : "Add your first syllabus item to start tracking real progress."}</p>
            <Link href="/progress" className="btn-secondary mt-4 w-full"><Target size={15} aria-hidden="true" />View My Progress</Link>
          </div>
        </div>
      </Card>

      <section>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-blue-600">Priority area</p>
            <h2 className="text-lg font-bold text-slate-950">Main subjects</h2>
            <p className="mt-1 text-sm text-slate-500">Science · Mathematics · Social Science — a study shortcut, not an official HPBOSE category.</p>
          </div>
          <Badge tone="slate">Pinned for quick access</Badge>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {mainSubjects.map((subject) => {
            const progress = getSyllabusProgress(state, subject.id);
            return (
              <Card key={subject.id} hover className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: subject.softAccent, color: subject.accent }}><SubjectIcon icon={subject.icon} /></span>
                  <Badge tone="blue">Main</Badge>
                </div>
                <h3 className="mt-4 font-bold text-slate-950">{subject.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{syllabusProgressLabel(progress)}</p>
                <div className="mt-4"><ProgressBar value={progress.value} color={subject.accent} /></div>
                <button type="button" className="btn-primary mt-5 w-full" onClick={() => chooseSubject(subject.id)}>Open planner</button>
              </Card>
            );
          })}
        </div>
      </section>

      <Card className="p-5">
        <SectionTitle title="Choose a subject" description="The same planner is also embedded on every subject page." />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label htmlFor="syllabus-subject" className="text-sm font-bold text-slate-700">Subject</label>
          <select id="syllabus-subject" className="input sm:max-w-xs" value={selectedSubjectId} onChange={(event) => setSelectedSubjectId(event.target.value)}>
            {subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.name}{subject.main ? " · Main" : ""}</option>)}
          </select>
          <Link href={`/subjects/${selectedSubjectId}`} className="btn-secondary"><BookOpen size={15} aria-hidden="true" />Open subject page</Link>
        </div>
      </Card>

      <div id="syllabus-planner" className="scroll-mt-24">
        <SyllabusPlanner subjectId={selectedSubjectId} />
      </div>

      <section>
        <SectionTitle title="All subjects at a glance" description="Your custom syllabus progress for each subject." />
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {subjects.map((subject) => {
            const progress = getSyllabusProgress(state, subject.id);
            return (
              <button key={subject.id} type="button" onClick={() => chooseSubject(subject.id)} className="card card-hover p-4 text-left">
                <div className="flex items-start justify-between gap-2"><span className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ backgroundColor: subject.softAccent, color: subject.accent }}><SubjectIcon icon={subject.icon} size={17} /></span>{subject.main && <Badge tone="blue">Main</Badge>}</div>
                <h3 className="mt-3 text-sm font-bold text-slate-900">{subject.name}</h3>
                <p className="mt-1 text-xs text-slate-500">{syllabusProgressLabel(progress)}</p>
                <div className="mt-3"><ProgressBar value={progress.value} color={subject.accent} /></div>
                <span className="mt-3 inline-block text-xs font-bold text-blue-600">Plan this subject →</span>
              </button>
            );
          })}
        </div>
      </section>

      <Card className="flex flex-col gap-4 border-blue-100 bg-blue-50/50 p-5 sm:flex-row sm:items-start">
        <Layers3 size={21} className="mt-0.5 shrink-0 text-blue-600" aria-hidden="true" />
        <div className="flex-1">
          <h2 className="text-sm font-bold text-slate-900">Compare with official sources</h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">Your personal list should match your school&apos;s final syllabus and the latest HPBOSE notice. NCERT books are cross-references where prescribed; an NCERT chapter is not automatically in the HPBOSE examination syllabus.</p>
          <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold text-blue-700">
            <a href={OFFICIAL_LINKS.hpboseHome} target="_blank" rel="noopener noreferrer" className="hover:underline">HPBOSE official site <ExternalLink size={12} className="inline" aria-hidden="true" /></a>
            <a href={OFFICIAL_LINKS.ncertTextbookPortal} target="_blank" rel="noopener noreferrer" className="hover:underline">NCERT textbook portal <ExternalLink size={12} className="inline" aria-hidden="true" /></a>
            <Link href="/library" className="hover:underline">Study library →</Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
