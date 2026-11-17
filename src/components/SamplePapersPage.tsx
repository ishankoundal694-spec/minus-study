"use client";

import Link from "next/link";
import {
  BookOpen, CheckCircle2, ClipboardList, ExternalLink, FileText, Printer,
  RotateCcw, Search, ShieldCheck, XCircle,
} from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { useWorkspace } from "@/components/WorkspaceProvider";
import {
  ArrowLink, Badge, Card, EmptyState, PageIntro, ProgressBar, SectionTitle,
  formatDate, percent,
} from "@/components/ui";
import { OFFICIAL_LINKS } from "@/lib/curriculum";
import {
  getMathSamplePaper, mathSamplePapers, samplePaperSections,
  type SampleQuestion,
} from "@/lib/samplePapers";

export function SamplePapersPage({ initialChapter = "" }: { initialChapter?: string }) {
  const { state, mutate, saving } = useWorkspace();
  const initialPaper = getMathSamplePaper(initialChapter);
  const [selectedId, setSelectedId] = useState(initialPaper?.id ?? "");
  const [query, setQuery] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [written, setWritten] = useState<Record<string, string>>({});
  const [selfScore, setSelfScore] = useState("");
  const [saved, setSaved] = useState(false);
  const [scoreMessage, setScoreMessage] = useState<string | null>(null);

  const selectedPaper = mathSamplePapers.find((item) => item.id === selectedId);
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return mathSamplePapers;
    return mathSamplePapers.filter((item) => {
      const topics = item.questions.map((question) => question.topic).join(" ");
      return `${item.title} ${item.chapterTitle} ${topics}`.toLowerCase().includes(needle);
    });
  }, [query]);

  const completedIds = useMemo(() => new Set(
    state.progress
      .filter((item) => item.chapterId.startsWith("mathematics-") && item.status === "completed")
      .map((item) => item.chapterId),
  ), [state.progress]);

  const attempts = useMemo(() => selectedPaper
    ? state.quizAttempts.filter((item) => item.quizId === selectedPaper.id)
    : [], [selectedPaper, state.quizAttempts]);

  const objectiveQuestions = selectedPaper?.questions.filter((question) => question.kind === "MCQ") ?? [];
  const objectiveScore = objectiveQuestions.filter((question) => answers[question.id] === question.answerIndex).length;

  function choosePaper(id: string) {
    setSelectedId(id);
    setShowKey(false);
    setAnswers({});
    setWritten({});
    setSelfScore("");
    setSaved(false);
    setScoreMessage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function printPaper() {
    setShowKey(false);
    window.setTimeout(() => window.print(), 120);
  }

  async function saveSelfScore(event: FormEvent) {
    event.preventDefault();
    if (!selectedPaper) return;
    const parsed = Number(selfScore);
    if (!Number.isFinite(parsed)) return;
    const score = Math.min(selectedPaper.maxMarks, Math.max(0, Math.round(parsed)));
    const missed = selectedPaper.questions
      .filter((question) => question.kind === "MCQ" && question.answerIndex !== undefined && answers[question.id] !== question.answerIndex)
      .map((question) => question.topic);
    const weakTopics = missed.length
      ? [...new Set(missed)]
      : score < selectedPaper.maxMarks * 0.7 ? [selectedPaper.chapterTitle] : [];
    const result = await mutate({
      type: "recordQuiz",
      attempt: {
        quizId: selectedPaper.id,
        quizTitle: selectedPaper.title,
        subjectId: "mathematics",
        chapterId: selectedPaper.chapterId,
        score,
        total: selectedPaper.maxMarks,
        weakTopics,
      },
    });
    setSaved(Boolean(result));
    setScoreMessage(result
      ? `Saved ${score}/${selectedPaper.maxMarks} to your private score history.`
      : "The score could not be saved. Check the error above and try again.");
  }

  function statusFor(chapterId: string): string {
    const status = state.progress.find((item) => item.chapterId === chapterId)?.status ?? "not_started";
    if (status === "completed") return "Completed";
    if (status === "in_progress") return "In progress";
    return "Not started";
  }

  function questionCard(question: SampleQuestion, index: number) {
    const chosen = answers[question.id];
    const isCorrect = chosen === question.answerIndex;
    return (
      <div key={question.id} className="rounded-2xl border border-slate-200 p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-blue-700">{index + 1}</span>
            <p className="font-semibold leading-relaxed text-slate-900">{question.prompt}</p>
          </div>
          <div className="flex shrink-0 gap-1.5">
            <Badge tone="slate">{question.topic}</Badge>
            <Badge>{question.marks} mark{question.marks === 1 ? "" : "s"}</Badge>
          </div>
        </div>

        {question.options ? (
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {question.options.map((option, optionIndex) => {
              const selected = chosen === optionIndex;
              const correctOption = showKey && optionIndex === question.answerIndex;
              const wrongSelection = showKey && selected && !isCorrect;
              return (
                <label key={optionIndex} className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm ${correctOption ? "border-emerald-300 bg-emerald-50" : wrongSelection ? "border-rose-300 bg-rose-50" : selected ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:border-blue-200"}`}>
                  <input
                    type="radio"
                    name={question.id}
                    value={optionIndex}
                    checked={selected}
                    disabled={showKey}
                    onChange={() => setAnswers((current) => ({ ...current, [question.id]: optionIndex }))}
                    className="h-4 w-4 accent-blue-600"
                  />
                  <span className="text-slate-700">{option}</span>
                  {correctOption && <CheckCircle2 size={16} className="ml-auto text-emerald-600" aria-hidden="true" />}
                  {wrongSelection && <XCircle size={16} className="ml-auto text-rose-600" aria-hidden="true" />}
                </label>
              );
            })}
          </div>
        ) : (
          <div className="mt-4">
            <label className="sr-only" htmlFor={`written-${question.id}`}>Your working for question {index + 1}</label>
            <textarea
              id={`written-${question.id}`}
              className="input min-h-24 resize-y py-3"
              value={written[question.id] ?? ""}
              onChange={(event) => setWritten((current) => ({ ...current, [question.id]: event.target.value }))}
              disabled={showKey}
              placeholder="Write your steps here…"
            />
          </div>
        )}

        {showKey && (
          <div className="no-print mt-4 rounded-xl border border-blue-100 bg-blue-50/70 p-3 text-sm leading-relaxed text-slate-700">
            <p><strong>Answer key:</strong> {question.answer}</p>
            <p className="mt-1"><strong>Why:</strong> {question.explanation}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="animate-enter space-y-7">
      <PageIntro
        eyebrow="Class 10 Mathematics"
        title="Maths Sample Papers"
        description="One original practice paper for every chapter in the 14-unit HPBOSE Mathematics syllabus, with worked answer keys, honest self-assessment and verified official references."
        action={<a href={OFFICIAL_LINKS.mathModelPaper} target="_blank" rel="noopener noreferrer" className="btn-secondary"><ExternalLink size={16} aria-hidden="true" />Official model paper</a>}
      />

      <Card className="flex flex-col gap-3 border-blue-100 bg-blue-50/50 p-5 sm:flex-row sm:items-start">
        <ShieldCheck size={21} className="mt-0.5 shrink-0 text-blue-600" aria-hidden="true" />
        <div>
          <h2 className="text-sm font-bold text-slate-900">Original practice papers, not official question papers</h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">These papers are written by Minus Study for chapter practice. They are short 14-mark papers, not copies or predictions of the HPBOSE exam. The official 2026–27 Maths model paper and model-paper portal are linked below; no unavailable or fake PDF is presented.</p>
        </div>
      </Card>

      <section className="grid gap-4 sm:grid-cols-3" aria-label="Sample paper overview">
        <Card className="p-5"><p className="text-xs font-semibold text-slate-500">Chapter papers</p><p className="mt-2 text-2xl font-bold text-slate-950">{mathSamplePapers.length}</p><p className="text-xs text-slate-500">One for each official Maths unit</p></Card>
        <Card className="p-5"><p className="text-xs font-semibold text-slate-500">Original questions</p><p className="mt-2 text-2xl font-bold text-slate-950">{mathSamplePapers.reduce((sum, item) => sum + item.questionCount, 0)}</p><p className="text-xs text-slate-500">All with worked answer keys</p></Card>
        <Card className="p-5"><p className="text-xs font-semibold text-slate-500">Your chapter coverage</p><p className="mt-2 text-2xl font-bold text-slate-950">{completedIds.size}/{mathSamplePapers.length}</p><div className="mt-2"><ProgressBar value={percent(completedIds.size, mathSamplePapers.length)} /></div></Card>
      </section>

      {selectedPaper && (
        <Card className="border-blue-200 p-5 sm:p-6">
          <div className="no-print flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex flex-wrap gap-2"><Badge>Chapter {selectedPaper.chapterNumber}</Badge><Badge tone="slate">{selectedPaper.maxMarks} marks · {selectedPaper.durationMinutes} min</Badge><Badge tone="green">Answer key available</Badge></div>
              <h2 className="mt-3 text-xl font-bold text-slate-950">{selectedPaper.title}</h2>
              <p className="mt-1 text-sm text-slate-600">{selectedPaper.source}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" className="btn-secondary" onClick={() => choosePaper("")}>Close paper</button>
              <button type="button" className="btn-secondary" onClick={() => { setShowKey(false); setAnswers({}); setWritten({}); setSelfScore(""); setSaved(false); setScoreMessage(null); }}><RotateCcw size={15} aria-hidden="true" />Reset answers</button>
              <button type="button" className="btn-secondary" onClick={printPaper}><Printer size={15} aria-hidden="true" />Print paper</button>
              <button type="button" className={showKey ? "btn-primary" : "btn-secondary"} onClick={() => setShowKey((value) => !value)}><CheckCircle2 size={15} aria-hidden="true" />{showKey ? "Hide answer key" : "Show answer key"}</button>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-sm font-bold text-slate-900">Instructions</h3>
            <ul className="mt-2 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-slate-600">
              {selectedPaper.instructions.map((instruction) => <li key={instruction}>{instruction}</li>)}
            </ul>
          </div>

          <div className="mt-6 space-y-7">
            {samplePaperSections.map((section) => {
              const questions = selectedPaper.questions.filter((question) => question.section === section.id);
              if (!questions.length) return null;
              return (
                <section key={section.id} aria-label={section.label}>
                  <div className="mb-3 flex items-center justify-between gap-3 border-b border-slate-200 pb-2">
                    <h3 className="font-bold text-blue-800">{section.label}</h3>
                    <span className="text-xs font-medium text-slate-500">{section.description}</span>
                  </div>
                  <div className="space-y-3">{questions.map((question) => questionCard(question, selectedPaper.questions.findIndex((item) => item.id === question.id)))}</div>
                </section>
              );
            })}
          </div>

          {showKey && (
            <div className="no-print mt-7 space-y-4 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-slate-900">Self-assessment</h3>
                  <p className="mt-1 text-sm text-slate-600">Objective check: {objectiveScore}/{objectiveQuestions.length} correct. Compare your written work with the answer key and enter your total score.</p>
                </div>
                <Badge tone="green">No automatic grading of written work</Badge>
              </div>
              <form onSubmit={saveSelfScore} className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <div className="sm:max-w-56">
                  <label htmlFor="self-score" className="mb-1.5 block text-xs font-bold text-slate-600">Your score out of {selectedPaper.maxMarks}</label>
                  <input id="self-score" type="number" min={0} max={selectedPaper.maxMarks} required className="input" value={selfScore} onChange={(event) => { setSelfScore(event.target.value); setSaved(false); setScoreMessage(null); }} placeholder={`0–${selectedPaper.maxMarks}`} />
                </div>
                <button type="submit" className="btn-primary" disabled={saving || selfScore === ""}><ClipboardList size={16} aria-hidden="true" />Save score to progress</button>
                {saved && <span className="text-sm font-semibold text-emerald-700">Saved ✓</span>}
              </form>
              {scoreMessage && <p className="text-sm font-medium text-slate-700" role="status">{scoreMessage}</p>}
            </div>
          )}
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <SectionTitle title="All chapter papers" description="Search by chapter or topic; your progress status is shown." />
            <div className="relative w-full sm:max-w-xs">
              <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <label htmlFor="paper-search" className="sr-only">Search sample papers</label>
              <input id="paper-search" className="input pl-10" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search chapter or topic…" />
            </div>
          </div>
          {filtered.length === 0 ? (
            <EmptyState title="No papers match" description="Try another chapter name or topic." icon={<Search size={20} aria-hidden="true" />} />
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {filtered.map((item) => (
                <button key={item.id} type="button" onClick={() => choosePaper(item.id)} className="card card-hover p-4 text-left">
                  <div className="flex flex-wrap items-center justify-between gap-2"><Badge>Chapter {item.chapterNumber}</Badge><Badge tone={completedIds.has(item.chapterId) ? "green" : "slate"}>{statusFor(item.chapterId)}</Badge></div>
                  <h3 className="mt-3 text-sm font-bold leading-snug text-slate-900">{item.chapterTitle}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">{item.questionCount} questions · {item.maxMarks} marks · {item.durationMinutes} min · worked answer key</p>
                  <span className="mt-3 inline-block text-xs font-bold text-blue-600">Open paper →</span>
                </button>
              ))}
            </div>
          )}
        </section>

        <div className="space-y-6">
          <Card className="p-5">
            <SectionTitle title="Score history" description={selectedPaper ? `Attempts for ${selectedPaper.chapterTitle}` : "Select a paper to see chapter attempts."} />
            {!selectedPaper || attempts.length === 0 ? (
              <EmptyState title="No saved score for this paper" description="After checking the answer key, save your honest self-assessed score." icon={<ClipboardList size={20} aria-hidden="true" />} />
            ) : (
              <ul className="space-y-2">
                {attempts.map((attempt) => (
                  <li key={attempt.id} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${percent(attempt.score, attempt.total) >= 70 ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{percent(attempt.score, attempt.total)}%</span>
                    <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-slate-800">{attempt.score}/{attempt.total} self-assessed</p><p className="text-xs text-slate-500">{formatDate(attempt.createdAt, true)}</p></div>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4"><ArrowLink href="/progress">View full progress</ArrowLink></div>
          </Card>

          <Card className="p-5">
            <SectionTitle title="Official HPBOSE references" description="For the real examination pattern and scope." />
            <p className="text-sm leading-relaxed text-slate-600">Minus Study papers are original short chapter practice. Use the Board's own sources for the 80-mark format, blueprint and prescribed syllabus.</p>
            <div className="mt-4 space-y-2">
              <a href={OFFICIAL_LINKS.mathModelPaper} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:border-blue-200 hover:bg-blue-50">Official Maths model paper 2026–27 <ExternalLink size={15} aria-hidden="true" /></a>
              <a href={OFFICIAL_LINKS.hpboseModelPapers} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:border-blue-200 hover:bg-blue-50">Official model-paper portal <ExternalLink size={15} aria-hidden="true" /></a>
              <a href={OFFICIAL_LINKS.mathSyllabus} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:border-blue-200 hover:bg-blue-50">Official Maths syllabus <ExternalLink size={15} aria-hidden="true" /></a>
              <a href={OFFICIAL_LINKS.bookList2026} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:border-blue-200 hover:bg-blue-50">Official 2026–27 book list <ExternalLink size={15} aria-hidden="true" /></a>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/subjects/mathematics" className="btn-secondary"><BookOpen size={15} aria-hidden="true" />All Maths chapters</Link>
              <Link href="/library" className="btn-secondary"><FileText size={15} aria-hidden="true" />Study library</Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
