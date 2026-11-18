"use client";

import Link from "next/link";
import {
  BookOpen, CheckCircle2, ExternalLink, FileText, ListChecks, Plus,
  RotateCcw, Trash2, Upload,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { useWorkspace } from "@/components/WorkspaceProvider";
import { Badge, Card, EmptyState, ProgressBar, SectionTitle } from "@/components/ui";
import { getSubject, OFFICIAL_LINKS } from "@/lib/curriculum";
import { getSyllabusProgress, syllabusProgressLabel } from "@/lib/syllabus-progress";
import type { ChapterStatus, SyllabusItemSeed, WorkspaceAction } from "@/lib/types";

const statusOptions: { value: ChapterStatus; label: string }[] = [
  { value: "not_started", label: "Not started" },
  { value: "in_progress", label: "In progress" },
  { value: "completed", label: "Completed" },
];

function officialReference(subjectId: string): { label: string; href: string } {
  switch (subjectId) {
    case "mathematics": return { label: "Official HPBOSE Mathematics syllabus", href: OFFICIAL_LINKS.mathSyllabus };
    case "science": return { label: "Official HPBOSE Science syllabus", href: OFFICIAL_LINKS.scienceSyllabus };
    case "social-science": return { label: "Official HPBOSE Social Science model paper", href: OFFICIAL_LINKS.socialScienceModelPaper };
    case "english": return { label: "Official HPBOSE English syllabus", href: OFFICIAL_LINKS.englishSyllabus };
    case "computer-science": return { label: "Official HPBOSE Computer Science syllabus", href: OFFICIAL_LINKS.computerScienceSyllabus };
    default: return { label: "Official HPBOSE 2026–27 book list", href: OFFICIAL_LINKS.bookList2026 };
  }
}

export function SyllabusPlanner({ subjectId }: { subjectId: string }) {
  const { state, mutate, saving } = useWorkspace();
  const subject = getSubject(subjectId);
  const [title, setTitle] = useState("");
  const [unit, setUnit] = useState("");
  const [chapterId, setChapterId] = useState("");
  const [bulk, setBulk] = useState("");
  const [bulkUnit, setBulkUnit] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  if (!subject) {
    return <EmptyState title="Subject not found" description="Choose a valid subject to plan its syllabus." />;
  }

  const validSubject = subject;
  const validSubjectId = validSubject.id;
  const progress = getSyllabusProgress(state, validSubjectId);
  const items = state.syllabusItems.filter((item) => item.subjectId === validSubjectId);
  const reference = officialReference(validSubjectId);
  const disabled = saving || busy;

  async function runAction(action: WorkspaceAction, success: string): Promise<boolean> {
    setBusy(true);
    const result = await mutate(action);
    setMessage(result ? success : "Could not save your syllabus. Check the error above and try again.");
    setBusy(false);
    return Boolean(result);
  }

  async function addOne(event: FormEvent) {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) return;
    const seed: SyllabusItemSeed = {
      title: cleanTitle,
      unit: unit.trim() || "My syllabus",
      chapterId: chapterId || undefined,
    };
    const done = await runAction({ type: "addSyllabusItems", subjectId: validSubjectId, items: [seed] }, "Added 1 syllabus item.");
    if (done) { setTitle(""); setUnit(""); setChapterId(""); }
  }

  async function addBulk(event: FormEvent) {
    event.preventDefault();
    const existing = new Set(items.map((item) => item.title.toLowerCase()));
    const seeds: SyllabusItemSeed[] = [];
    for (const line of bulk.split(/\r?\n/).map((line) => line.trim()).filter(Boolean).slice(0, 200)) {
      const parts = line.split("|").map((part) => part.trim()).filter(Boolean);
      const itemTitle = parts.shift() ?? "";
      const key = itemTitle.toLowerCase();
      if (!itemTitle || existing.has(key)) continue;
      existing.add(key);
      seeds.push({ title: itemTitle, unit: parts.join(" | ") || bulkUnit.trim() || "My syllabus" });
    }
    if (!seeds.length) {
      setMessage(bulk.trim() ? "All pasted lines are already in your syllabus." : "Paste at least one chapter or topic first.");
      return;
    }
    const done = await runAction(
      { type: "addSyllabusItems", subjectId: validSubjectId, items: seeds },
      `Added ${seeds.length} syllabus item${seeds.length === 1 ? "" : "s"}. Duplicate lines were skipped.`,
    );
    if (done) setBulk("");
  }

  async function importChapters() {
    await runAction(
      { type: "importCurriculumSyllabus", subjectId: validSubjectId },
      "Added in-app chapter guides that were not already in your syllabus.",
    );
  }

  async function clearSyllabus() {
    if (!items.length) return;
    if (!window.confirm(`Remove all ${items.length} syllabus items from ${validSubject.name}? Your chapter progress is not deleted.`)) return;
    await runAction({ type: "clearSubjectSyllabus", subjectId: validSubjectId }, `Cleared the ${validSubject.name} syllabus list.`);
  }

  return (
    <Card className="border-blue-100 p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge>My complete syllabus</Badge>
            {validSubject.main && <Badge tone="blue">Main subject</Badge>}
            <Badge tone="slate">{validSubject.name}</Badge>
          </div>
          <h2 className="mt-3 text-lg font-bold text-slate-950">Plan and track your full syllabus</h2>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-600">Paste the chapters and topics your school actually gave you, or import Minus Study chapter guides. Progress below is calculated only from items you mark complete.</p>
        </div>
        <div className="w-full max-w-xs">
          <ProgressBar value={progress.value} label={syllabusProgressLabel(progress)} />
          <p className="mt-2 text-xs text-slate-500">{progress.inProgress} in progress · {progress.notStarted} not started</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-slate-50 p-3"><p className="text-xl font-bold text-slate-950">{progress.total}</p><p className="text-xs text-slate-500">Syllabus items</p></div>
        <div className="rounded-xl bg-slate-50 p-3"><p className="text-xl font-bold text-slate-950">{progress.completed}</p><p className="text-xs text-slate-500">Completed</p></div>
        <div className="rounded-xl bg-slate-50 p-3"><p className="text-xl font-bold text-slate-950">{progress.value}%</p><p className="text-xs text-slate-500">Your progress</p></div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <form onSubmit={addOne} className="rounded-2xl border border-slate-200 p-4">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900"><Plus size={16} className="text-blue-600" aria-hidden="true" />Add one item</h3>
          <div className="mt-3 space-y-3">
            <div><label className="mb-1 block text-xs font-bold text-slate-600" htmlFor={`syllabus-title-${validSubjectId}`}>Chapter / topic</label><input id={`syllabus-title-${validSubjectId}`} className="input" value={title} onChange={(event) => setTitle(event.target.value)} maxLength={160} placeholder="e.g. Life Processes" required /></div>
            <div><label className="mb-1 block text-xs font-bold text-slate-600" htmlFor={`syllabus-unit-${validSubjectId}`}>Unit (optional)</label><input id={`syllabus-unit-${validSubjectId}`} className="input" value={unit} onChange={(event) => setUnit(event.target.value)} maxLength={100} placeholder="e.g. Unit 2" /></div>
            <div><label className="mb-1 block text-xs font-bold text-slate-600" htmlFor={`syllabus-chapter-${validSubjectId}`}>Link an in-app chapter (optional)</label><select id={`syllabus-chapter-${validSubjectId}`} className="input" value={chapterId} onChange={(event) => setChapterId(event.target.value)}><option value="">No chapter link</option>{validSubject.chapters.map((chapter) => <option key={chapter.id} value={chapter.id}>{chapter.title}</option>)}</select></div>
            <button type="submit" className="btn-primary w-full" disabled={disabled || !title.trim()}><Plus size={16} aria-hidden="true" />Add item</button>
          </div>
        </form>

        <form onSubmit={addBulk} className="rounded-2xl border border-slate-200 p-4">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900"><Upload size={16} className="text-blue-600" aria-hidden="true" />Paste complete syllabus</h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">One chapter/topic per line. Use <code className="rounded bg-slate-100 px-1">Chapter | Unit name</code> to add a unit.</p>
          <label className="sr-only" htmlFor={`syllabus-bulk-${validSubjectId}`}>Paste syllabus lines</label>
          <textarea id={`syllabus-bulk-${validSubjectId}`} className="input mt-3 min-h-32 resize-y py-3" value={bulk} onChange={(event) => setBulk(event.target.value)} placeholder={"Chemical Reactions | Chemical substances\nAcids, Bases and Salts | Chemical substances\nLife Processes | Living world"} />
          <label className="mt-3 mb-1 block text-xs font-bold text-slate-600" htmlFor={`syllabus-bulk-unit-${validSubjectId}`}>Default unit (optional)</label>
          <input id={`syllabus-bulk-unit-${validSubjectId}`} className="input" value={bulkUnit} onChange={(event) => setBulkUnit(event.target.value)} maxLength={100} placeholder="e.g. Term 1" />
          <button type="submit" className="btn-primary mt-3 w-full" disabled={disabled || !bulk.trim()}><Upload size={16} aria-hidden="true" />Add all lines</button>
        </form>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className="btn-secondary" onClick={() => void importChapters()} disabled={disabled}><ListChecks size={16} aria-hidden="true" />Import in-app chapters</button>
        <button type="button" className="btn-secondary" onClick={() => void clearSyllabus()} disabled={disabled || !items.length}><RotateCcw size={16} aria-hidden="true" />Clear this syllabus</button>
        <a href={reference.href} target="_blank" rel="noopener noreferrer" className="btn-secondary"><ExternalLink size={16} aria-hidden="true" />{reference.label}</a>
      </div>
      {message && <p className="mt-3 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-800" role="status">{message}</p>}

      <div className="mt-6 border-t border-slate-100 pt-5">
        <SectionTitle title="Your syllabus items" description="Status changes save automatically and sync linked chapter progress." />
        {items.length === 0 ? (
          <EmptyState title="No syllabus items yet" description="Add one item, paste your complete list, or import the in-app chapter guides to start tracking progress." icon={<FileText size={20} aria-hidden="true" />} />
        ) : (
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.id} className="flex flex-col gap-3 rounded-xl border border-slate-200 p-3 lg:flex-row lg:items-center">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                    <Badge tone={item.source === "curriculum" ? "blue" : "slate"}>{item.source === "curriculum" ? "In-app chapter" : "My list"}</Badge>
                    <Badge tone={item.status === "completed" ? "green" : item.status === "in_progress" ? "amber" : "slate"}>{statusOptions.find((option) => option.value === item.status)?.label}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{item.unit}</p>
                  {item.chapterId && <Link href={`/subjects/${validSubjectId}/${item.chapterId}`} className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"><BookOpen size={12} aria-hidden="true" />Open chapter guide</Link>}
                </div>
                <div className="flex items-center gap-2">
                  <label className="sr-only" htmlFor={`syllabus-status-${item.id}`}>Status for {item.title}</label>
                  <select id={`syllabus-status-${item.id}`} className="input min-h-9 py-1 text-xs lg:w-36" value={item.status} disabled={disabled} onChange={(event) => void mutate({ type: "setSyllabusStatus", id: item.id, status: event.target.value as ChapterStatus })}>
                    {statusOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select>
                  <button type="button" className="btn-ghost px-2 text-slate-400 hover:text-rose-600" aria-label={`Delete syllabus item: ${item.title}`} disabled={disabled} onClick={() => void mutate({ type: "deleteSyllabusItem", id: item.id })}><Trash2 size={15} aria-hidden="true" /></button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-5 flex items-start gap-2 rounded-xl bg-slate-50 p-3 text-xs leading-relaxed text-slate-600">
        <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-600" aria-hidden="true" />
        <p>This is a personal planning list, not an official syllabus document. Compare your list with the official HPBOSE reference and your school&apos;s final notice.</p>
      </div>
    </Card>
  );
}
