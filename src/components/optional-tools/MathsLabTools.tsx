"use client";

import { useMemo, useState } from "react";
import { Calculator, CheckCircle2, RefreshCw, Sparkles, XCircle } from "lucide-react";

const TRIG_ANGLES = ["0°", "30°", "45°", "60°", "90°"] as const;

const TRIG_TABLE: { ratio: string; values: [string, string, string, string, string] }[] = [
  { ratio: "sin θ", values: ["0", "1/2", "1/√2", "√3/2", "1"] },
  { ratio: "cos θ", values: ["1", "√3/2", "1/√2", "1/2", "0"] },
  { ratio: "tan θ", values: ["0", "1/√3", "1", "√3", "Not defined"] },
  { ratio: "cosec θ", values: ["Not defined", "2", "√2", "2/√3", "1"] },
  { ratio: "sec θ", values: ["1", "2/√3", "√2", "2", "Not defined"] },
  { ratio: "cot θ", values: ["Not defined", "√3", "1", "1/√3", "0"] },
];

const TRIG_DRILL_CARDS = [
  { prompt: "sin 30°", answer: "1/2", options: ["0", "1/2", "√3/2", "1/√2"] },
  { prompt: "cos 60°", answer: "1/2", options: ["1/2", "√3/2", "1", "0"] },
  { prompt: "tan 45°", answer: "1", options: ["1/√3", "√3", "1", "0"] },
  { prompt: "sin 60°", answer: "√3/2", options: ["1/2", "√3/2", "1/√2", "√3"] },
  { prompt: "tan 30°", answer: "1/√3", options: ["√3", "1/√3", "1/2", "1"] },
  { prompt: "sec 60°", answer: "2", options: ["2/√3", "√2", "2", "1/2"] },
  { prompt: "cosec 30°", answer: "2", options: ["1/2", "2", "√2", "2/√3"] },
  { prompt: "tan 60°", answer: "√3", options: ["1/√3", "√3", "1", "2"] },
];

function formatNum(n: number): string {
  if (Number.isInteger(n)) return String(n);
  return Number(n.toFixed(4)).toString();
}

export function MathsLabTools() {
  // 1. Quadratic Solver State
  const [qa, setQa] = useState("2");
  const [qb, setQb] = useState("-7");
  const [qc, setQc] = useState("3");

  const quadResult = useMemo(() => {
    const a = Number(qa);
    const b = Number(qb);
    const c = Number(qc);
    if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(c)) {
      return { valid: false as const, error: "Enter valid real numbers for a, b, and c." };
    }
    if (a === 0) {
      return {
        valid: false as const,
        error: "Coefficient 'a' cannot be 0 in a quadratic equation (ax² + bx + c = 0).",
      };
    }
    const D = b * b - 4 * a * c;
    if (D < 0) {
      return {
        valid: true as const,
        a,
        b,
        c,
        D,
        nature: "No real roots (D < 0)",
        rootsText: "No real solution exists because √D is not a real number.",
      };
    }
    const sqrtD = Math.sqrt(D);
    const r1 = (-b + sqrtD) / (2 * a);
    const r2 = (-b - sqrtD) / (2 * a);
    return {
      valid: true as const,
      a,
      b,
      c,
      D,
      sqrtD,
      nature:
        D === 0
          ? "Two equal real roots (D = 0)"
          : "Two distinct real roots (D > 0)",
      rootsText:
        D === 0
          ? `x = ${formatNum(r1)} (repeated root)`
          : `x₁ = ${formatNum(r1)},  x₂ = ${formatNum(r2)}`,
    };
  }, [qa, qb, qc]);

  // 2. Arithmetic Progression Explorer State
  const [apA, setApA] = useState("3");
  const [apD, setApD] = useState("5");
  const [apN, setApN] = useState("16");

  const apResult = useMemo(() => {
    const a = Number(apA);
    const d = Number(apD);
    const n = Math.floor(Number(apN));
    if (!Number.isFinite(a) || !Number.isFinite(d) || !Number.isFinite(n) || n < 1 || n > 1000) {
      return { valid: false as const, error: "Enter valid numbers (and n between 1 and 1000)." };
    }
    const an = a + (n - 1) * d;
    const sn = (n / 2) * (2 * a + (n - 1) * d);
    const previewTerms = Array.from({ length: Math.min(5, n) }, (_, i) =>
      formatNum(a + i * d)
    );
    return { valid: true as const, a, d, n, an, sn, previewTerms };
  }, [apA, apD, apN]);

  // 3. Trigonometry Flashcard Drill State
  const [cardIdx, setCardIdx] = useState(0);
  const [selectedTrig, setSelectedTrig] = useState<string | null>(null);
  const [drillScore, setDrillScore] = useState({ correct: 0, tried: 0 });

  const currentCard = TRIG_DRILL_CARDS[cardIdx];

  const handleSelectTrig = (opt: string) => {
    if (selectedTrig !== null) return;
    setSelectedTrig(opt);
    setDrillScore((prev) => ({
      correct: prev.correct + (opt === currentCard.answer ? 1 : 0),
      tried: prev.tried + 1,
    }));
  };

  const handleNextCard = () => {
    setSelectedTrig(null);
    setCardIdx((prev) => (prev + 1) % TRIG_DRILL_CARDS.length);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Tool 1: Quadratic Equation Step-by-Step Solver */}
        <section className="ms-card p-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB]">
              <Calculator className="h-4 w-4" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Quadratic Equation Step-by-Step Solver
              </h2>
              <p className="text-xs text-slate-500">
                Ch. 4 • Check Discriminant D = b² − 4ac & verify board homework
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <div>
              <label
                htmlFor="quad-a"
                className="block text-xs font-semibold text-slate-700"
              >
                a (x² coeff)
              </label>
              <input
                id="quad-a"
                type="number"
                step="any"
                value={qa}
                onChange={(e) => setQa(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-900 focus:border-[#2563EB] focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="quad-b"
                className="block text-xs font-semibold text-slate-700"
              >
                b (x coeff)
              </label>
              <input
                id="quad-b"
                type="number"
                step="any"
                value={qb}
                onChange={(e) => setQb(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-900 focus:border-[#2563EB] focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="quad-c"
                className="block text-xs font-semibold text-slate-700"
              >
                c (constant)
              </label>
              <input
                id="quad-c"
                type="number"
                step="any"
                value={qc}
                onChange={(e) => setQc(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-900 focus:border-[#2563EB] focus:outline-none"
              />
            </div>
          </div>

          {!quadResult.valid ? (
            <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-700">
              {quadResult.error}
            </p>
          ) : (
            <div className="mt-4 space-y-2 rounded-xl border border-blue-100 bg-blue-50/50 p-4 text-xs leading-relaxed text-slate-800">
              <p className="font-mono font-bold text-[#2563EB]">
                Equation: ({quadResult.a})x² + ({quadResult.b})x + ({quadResult.c}) = 0
              </p>
              <p>
                <strong>Step 1 (Discriminant):</strong> D = ({quadResult.b})² − 4(
                {quadResult.a})({quadResult.c}) ={" "}
                <strong>{formatNum(quadResult.D)}</strong>
              </p>
              <p>
                <strong>Step 2 (Nature of Roots):</strong> {quadResult.nature}
              </p>
              <p className="rounded-lg bg-white px-3 py-2 font-mono text-xs font-bold text-emerald-800 border border-emerald-200/80">
                {quadResult.rootsText}
              </p>
            </div>
          )}
        </section>

        {/* Tool 2: Arithmetic Progression Calculator */}
        <section className="ms-card p-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB]">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Arithmetic Progression (aₙ & Sₙ) Explorer
              </h2>
              <p className="text-xs text-slate-500">
                Ch. 5 • Verify nth term and sum of first n terms instantly
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <div>
              <label
                htmlFor="ap-a"
                className="block text-xs font-semibold text-slate-700"
              >
                First term (a)
              </label>
              <input
                id="ap-a"
                type="number"
                step="any"
                value={apA}
                onChange={(e) => setApA(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-900 focus:border-[#2563EB] focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="ap-d"
                className="block text-xs font-semibold text-slate-700"
              >
                Difference (d)
              </label>
              <input
                id="ap-d"
                type="number"
                step="any"
                value={apD}
                onChange={(e) => setApD(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-900 focus:border-[#2563EB] focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="ap-n"
                className="block text-xs font-semibold text-slate-700"
              >
                Term no. (n)
              </label>
              <input
                id="ap-n"
                type="number"
                min={1}
                max={1000}
                value={apN}
                onChange={(e) => setApN(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-900 focus:border-[#2563EB] focus:outline-none"
              />
            </div>
          </div>

          {!apResult.valid ? (
            <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-700">
              {apResult.error}
            </p>
          ) : (
            <div className="mt-4 space-y-2 rounded-xl border border-blue-100 bg-blue-50/50 p-4 text-xs leading-relaxed text-slate-800">
              <p>
                <strong>Sequence preview:</strong> {apResult.previewTerms.join(", ")}
                {apResult.n > 5 ? ", ..." : ""}
              </p>
              <p>
                <strong>nth Term:</strong> a<sub>{apResult.n}</sub> = {apResult.a} + (
                {apResult.n} − 1)({apResult.d}) ={" "}
                <strong className="text-[#2563EB]">{formatNum(apResult.an)}</strong>
              </p>
              <p className="rounded-lg bg-white px-3 py-2 font-mono text-xs font-bold text-emerald-800 border border-emerald-200/80">
                Sum S_{apResult.n} = ({apResult.n}/2)[2({apResult.a}) + ({apResult.n - 1})(
                {apResult.d})] = {formatNum(apResult.sn)}
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Tool 3: Trigonometry 0°–90° Master Table & Quick Flashcard Drill */}
      <section className="ms-card p-6">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-base font-bold text-slate-900">
              Ch. 8–9 Trigonometry Exact Values Table (0° – 90°)
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Board exam trick: Write √(0/4), √(1/4), √(2/4), √(3/4), √(4/4) for
              sin θ, reverse for cos θ, and divide sin/cos for tan θ.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[420px] border-collapse text-center text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                    <th className="px-3 py-2 text-left font-bold">Ratio</th>
                    {TRIG_ANGLES.map((ang) => (
                      <th key={ang} className="px-3 py-2 font-bold text-[#2563EB]">
                        {ang}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {TRIG_TABLE.map((row) => (
                    <tr key={row.ratio} className="hover:bg-blue-50/30">
                      <td className="px-3 py-2 text-left font-bold text-slate-900">
                        {row.ratio}
                      </td>
                      {row.values.map((val, idx) => (
                        <td key={idx} className="px-3 py-2 font-mono text-slate-700">
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive Flashcard Speed Drill */}
          <div className="flex flex-col justify-between rounded-2xl border border-blue-200 bg-blue-50/50 p-5 lg:col-span-5">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wide text-[#2563EB]">
                  Flashcard Speed Drill
                </span>
                <span className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-bold text-slate-700 border border-blue-100">
                  {drillScore.correct}/{drillScore.tried} correct
                </span>
              </div>

              <div className="mt-4 rounded-xl border border-blue-100 bg-white p-5 text-center">
                <p className="text-xs font-medium text-slate-500">
                  What is the exact value of:
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {currentCard.prompt}
                </p>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                {currentCard.options.map((opt) => {
                  const chosen = selectedTrig === opt;
                  const isCorrect = opt === currentCard.answer;
                  let cls =
                    "border-slate-200 bg-white text-slate-800 hover:border-blue-300";
                  if (selectedTrig !== null) {
                    if (isCorrect) {
                      cls =
                        "border-emerald-300 bg-emerald-50 text-emerald-900 font-bold";
                    } else if (chosen) {
                      cls = "border-rose-300 bg-rose-50 text-rose-800";
                    }
                  }

                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleSelectTrig(opt)}
                      className={`rounded-xl border py-2.5 font-mono text-sm font-semibold transition-colors ${cls}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between pt-2">
              {selectedTrig !== null ? (
                <span
                  className={`inline-flex items-center gap-1 text-xs font-semibold ${
                    selectedTrig === currentCard.answer
                      ? "text-emerald-700"
                      : "text-rose-700"
                  }`}
                >
                  {selectedTrig === currentCard.answer ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                      Spot on!
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4" aria-hidden="true" />
                      Answer: {currentCard.answer}
                    </>
                  )}
                </span>
              ) : (
                <span className="text-xs text-slate-500">
                  Tap an answer to test recall
                </span>
              )}

              <button
                type="button"
                onClick={handleNextCard}
                className="inline-flex items-center gap-1 rounded-xl bg-[#2563EB] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#1D4ED8]"
              >
                <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                Next Card
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
