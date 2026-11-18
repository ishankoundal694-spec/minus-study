"use client";

import Link from "next/link";
import {
  BookOpen, CheckCircle2, ClipboardList, RotateCcw, Target, TrendingUp, XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useWorkspace } from "@/components/WorkspaceProvider";
import {
  ArrowLink, Badge, Card, EmptyState, PageIntro, SectionTitle, formatDate, percent,
} from "@/components/ui";
import { allChapters, subjects, subjectOfChapter } from "@/lib/curriculum";
import { getQuizDefinitions, quizQuestions, type QuizDefinition } from "@/lib/quizzes";

export function PracticePage({ initialQuiz = "" }: { initialQuiz?: string }) {
  const { state, mutate, saving } = useWorkspace();
  const definitions = useMemo(() => getQuizDefinitions(), []);
  const [quizId, setQuizId] = useState(definitions.some((quiz) => quiz.id === initialQuiz) ? initialQuiz : "");
  const [typeFilter, setTypeFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [saved, setSaved] = useState(false);
  const [score, setScore] = useState(0);
  const [weakTopics, setWeakTopics] = useState<string[]>([]);

  const quiz: QuizDefinition | undefined = definitions.find((item) => item.id === quizId);
  const filtered = definitions.filter((item) => {
    if (typeFilter && item.type !== typeFilter) return false;
    if (subjectFilter && item.subjectId !== subjectFilter && item.type !== "mixed") return false;
    return true;
  });

  const aggregatedWeakTopics = useMemo(() => {
    const counts = new Map<string, number>();
    state.quizAttempts.forEach((attempt) => attempt.weakTopics.forEach((topic) => counts.set(topic, (counts.get(topic) ?? 0) + 1)));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [state.quizAttempts]);

  const suggestions = useMemo(() => {
    return aggregatedWeakTopics.map(([topic, count]) => {
      const related = quizQuestions.find((question) => question.topic === topic);
      const chapter = related ? allChapters.find((item) => item.id === related.chapterId) : undefined;
      return { topic, count, chapter, subject: chapter ? subjectOfChapter(chapter.id) : undefined };
    }).filter((item) => item.chapter && item.subject);
  }, [aggregatedWeakTopics]);

  function chooseQuiz(id: string) {
    setQuizId(id);
    setAnswers({});
    setSubmitted(false);
    setSaved(false);
    setScore(0);
    setWeakTopics([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submitQuiz() {
    if (!quiz || submitted) return;
    let correct = 0;
    const missed: string[] = [];
    quiz.questions.forEach((question) => {
      if (answers[question.id] === question.answerIndex) correct += 1;
      else missed.push(question.topic);
    });
    setScore(correct);
    setWeakTopics([...new Set(missed)]);
    setSubmitted(true);
    const result = await mutate({
      type: "recordQuiz",
      attempt: {
        quizId: quiz.id,
        quizTitle: quiz.title,
        subjectId: quiz.subjectId,
        chapterId: quiz.chapterId,
        score: correct,
        total: quiz.questions.length,
        weakTopics: [...new Set(missed)],
      },
    });
    setSaved(Boolean(result));
  }

  return (
    <div className="animate-enter space-y-7">
      <PageIntro
        eyebrow="Practice & tests"
        title="Practice Tests"
        description="Short, original MCQ tests with explanations. Your score history and weak topics come only from tests you actually complete."
        action={<Link href="/progress" className="btn-secondary"><TrendingUp size={16} aria-hidden="true" />View progress</Link>}
      />

      <Card className="flex flex-col gap-4 border-blue-100 bg-blue-50/50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <ClipboardList size={20} className="mt-0.5 shrink-0 text-blue-600" aria-hidden="true" />
          <div><h2 className="font-bold text-slate-900">Need a full chapter paper?</h2><p className="mt-1 text-sm leading-relaxed text-slate-600">Try the 14 original Class 10 Maths chapter sample papers with worked answer keys, printable questions and self-assessed score history.</p></div>
        </div>
        <ArrowLink href="/sample-papers">Browse Maths papers</ArrowLink>
      </Card>

      {quiz && (
        <Card className="border-blue-200 p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Badge>{quiz.type === "chapter" ? "Chapter test" : quiz.type === "mixed" ? "Mixed-subject test" : "Subject test"}</Badge>
              <h2 className="mt-3 text-xl font-bold text-slate-950">{quiz.title}</h2>
              <p className="mt-1 text-sm text-slate-600">{quiz.description} · {quiz.questions.length} questions</p>
            </div>
            <div className="flex gap-2">
              <button type="button" className="btn-secondary" onClick={() => chooseQuiz("")}>Close test</button>
              {submitted && <button type="button" className="btn-secondary" onClick={() => chooseQuiz(quiz.id)}><RotateCcw size={15} aria-hidden="true" />Try again</button>}
            </div>
          </div>

          {submitted && (
            <div className={`mt-5 rounded-2xl border p-4 ${percent(score, quiz.questions.length) >= 70 ? "border-emerald-200 bg-emerald-50" : "border-blue-200 bg-blue-50"}`} role="status">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-slate-900">Result: {score} / {quiz.questions.length} ({percent(score, quiz.questions.length)}%)</p>
                  <p className="mt-1 text-sm text-slate-600">{saving ? "Saving your result…" : saved ? "Saved to your private score history." : "The result is shown, but it could not be saved. Check the error above and refresh."}</p>
                </div>
                <Target size={24} className="text-blue-600" aria-hidden="true" />
              </div>
              {weakTopics.length > 0 && <p className="mt-3 text-sm text-slate-700"><strong>Work on:</strong> {weakTopics.join(", ")}. Revision suggestions appear below.</p>}
            </div>
          )}

          <div className="mt-6 space-y-5">
            {quiz.questions.map((question, index) => {
              const chosen = answers[question.id];
              const isCorrect = chosen === question.answerIndex;
              return (
                <fieldset key={question.id} className="rounded-2xl border border-slate-200 p-4 sm:p-5">
                  <legend className="sr-only">Question {index + 1}</legend>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <p className="font-semibold text-slate-900"><span className="mr-2 text-blue-600">Q{index + 1}.</span>{question.prompt}</p>
                    <Badge tone="slate">{question.topic}</Badge>
                  </div>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {question.options.map((option, optionIndex) => {
                      const selected = chosen === optionIndex;
                      const correctOption = submitted && optionIndex === question.answerIndex;
                      const wrongSelection = submitted && selected && !isCorrect;
                      return (
                        <label key={optionIndex} className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm transition-colors ${correctOption ? "border-emerald-300 bg-emerald-50" : wrongSelection ? "border-rose-300 bg-rose-50" : selected ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:border-blue-200"}`}>
                          <input
                            type="radio"
                            name={question.id}
                            value={optionIndex}
                            checked={selected}
                            disabled={submitted}
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
                  {submitted && (
                    <div className="mt-3 rounded-xl bg-slate-50 p-3 text-sm leading-relaxed text-slate-700">
                      <strong>Explanation:</strong> {question.explanation}
                    </div>
                  )}
                </fieldset>
              );
            })}
          </div>

          {!submitted && (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
              <p className="text-sm text-slate-500">{Object.keys(answers).length} of {quiz.questions.length} answered</p>
              <button type="button" className="btn-primary" onClick={() => void submitQuiz()} disabled={Object.keys(answers).length < quiz.questions.length || saving}>
                <ClipboardList size={16} aria-hidden="true" />Submit & see explanations
              </button>
            </div>
          )}
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <SectionTitle title="Choose a test" description={`${definitions.length} tests · ${quizQuestions.length} original questions`} />
            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="sr-only" htmlFor="quiz-type">Filter by test type</label>
              <select id="quiz-type" className="input sm:w-44" value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
                <option value="">All test types</option><option value="chapter">Chapter tests</option><option value="subject">Subject tests</option><option value="mixed">Mixed-subject tests</option>
              </select>
              <label className="sr-only" htmlFor="quiz-subject">Filter by subject</label>
              <select id="quiz-subject" className="input sm:w-44" value={subjectFilter} onChange={(event) => setSubjectFilter(event.target.value)}>
                <option value="">All subjects</option>{subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.name}</option>)}
              </select>
            </div>
          </div>
          {filtered.length === 0 ? <EmptyState title="No tests match" description="Clear a filter to see the full test list." /> : (
            <div className="grid gap-3 sm:grid-cols-2">
              {filtered.map((item) => (
                <button key={item.id} type="button" onClick={() => chooseQuiz(item.id)} className="card card-hover p-4 text-left">
                  <div className="flex items-center justify-between gap-2"><Badge tone={item.type === "mixed" ? "purple" : "blue"}>{item.type}</Badge><span className="text-xs font-medium text-slate-500">{item.questions.length} questions</span></div>
                  <h3 className="mt-3 text-sm font-bold leading-snug text-slate-900">{item.title}</h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">{item.description}</p>
                  <span className="mt-3 inline-block text-xs font-bold text-blue-600">Start test →</span>
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="space-y-6">
          <Card className="p-5">
            <SectionTitle title="Score history" description={`${state.quizAttempts.length} recorded attempt${state.quizAttempts.length === 1 ? "" : "s"}`} />
            {state.quizAttempts.length === 0 ? (
              <EmptyState title="No scores yet" description="Complete a test and your real score will appear here." icon={<TrendingUp size={20} aria-hidden="true" />} />
            ) : (
              <ul className="divide-y divide-slate-100">
                {state.quizAttempts.slice(0, 8).map((attempt) => (
                  <li key={attempt.id} className="flex items-center gap-3 py-3">
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${percent(attempt.score, attempt.total) >= 70 ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{percent(attempt.score, attempt.total)}%</span>
                    <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-slate-800">{attempt.quizTitle}</p><p className="text-xs text-slate-500">{attempt.score}/{attempt.total} · {formatDate(attempt.createdAt, true)}</p></div>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card className="p-5">
            <SectionTitle title="Weak topics & revision" description="Aggregated from questions you missed." />
            {aggregatedWeakTopics.length === 0 ? (
              <EmptyState title="No weak topics identified yet" description="After a test, topics from incorrect answers are listed here with revision links." icon={<BookOpen size={20} aria-hidden="true" />} />
            ) : (
              <div className="space-y-3">
                {aggregatedWeakTopics.map(([topic, count]) => <div key={topic} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm"><span className="font-medium text-slate-700">{topic}</span><Badge tone="amber">Missed {count}×</Badge></div>)}
                <div className="border-t border-slate-100 pt-3">
                  <h3 className="text-sm font-bold text-slate-900">Revision suggestions</h3>
                  <ul className="mt-2 space-y-2">
                    {suggestions.map((item) => (
                      <li key={item.topic} className="text-sm text-slate-600">
                        <ArrowLink href={`/subjects/${item.subject?.id}/${item.chapter?.id}#revision`}>Revise {item.chapter?.title}</ArrowLink>
                        <span className="block text-xs text-slate-500">{item.topic} · {item.subject?.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </Card>
        </section>
      </div>
    </div>
  );
}
