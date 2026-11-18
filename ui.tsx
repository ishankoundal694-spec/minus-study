"use client";

import Link from "next/link";
import {
  AlertCircle, BookOpen, Calculator, FlaskConical, Globe2, Inbox,
  Languages, LoaderCircle, Monitor, Sparkles, type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import type { Scope } from "@/lib/types";

export function Card({ children, className = "", hover = false, id }: { children?: ReactNode; className?: string; hover?: boolean; id?: string }) {
  return <div id={id} className={`card ${hover ? "card-hover" : ""} ${className}`}>{children}</div>;
}

export function PageIntro({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description: string; action?: ReactNode }) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-blue-600">{eyebrow}</p>}
        <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function SectionTitle({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 className="text-lg font-bold text-slate-950">{title}</h2>
        {description && <p className="mt-0.5 text-sm text-slate-500">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Badge({ children, tone = "blue" }: { children: ReactNode; tone?: "blue" | "slate" | "amber" | "green" | "purple" }) {
  const tones = {
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    amber: "bg-amber-50 text-amber-800 border-amber-100",
    green: "bg-emerald-50 text-emerald-700 border-emerald-100",
    purple: "bg-violet-50 text-violet-700 border-violet-100",
  };
  return <span className={`tag border ${tones[tone]}`}>{children}</span>;
}

export function ScopeBadge({ scope }: { scope: Scope }) {
  if (scope === "confirmed") return <Badge tone="green">HPBOSE scope</Badge>;
  if (scope === "cross_reference") return <Badge tone="blue">NCERT cross-reference</Badge>;
  return <Badge tone="amber">Verify scope</Badge>;
}

const iconMap: Record<string, LucideIcon> = {
  calculator: Calculator,
  flask: FlaskConical,
  globe: Globe2,
  book: BookOpen,
  language: Languages,
  sparkles: Sparkles,
  monitor: Monitor,
};

export function SubjectIcon({ icon, size = 22, className = "" }: { icon: string; size?: number; className?: string }) {
  const Icon = iconMap[icon] ?? BookOpen;
  return <Icon size={size} strokeWidth={1.9} className={className} aria-hidden="true" />;
}

export function ProgressBar({ value, label, color = "#2563EB" }: { value: number; label?: string; color?: string }) {
  const safe = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div>
      {label && (
        <div className="mb-1.5 flex items-center justify-between text-xs font-semibold text-slate-600">
          <span>{label}</span><span>{safe}%</span>
        </div>
      )}
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-valuenow={safe} aria-valuemin={0} aria-valuemax={100} aria-label={label || "Progress"}>
        <div className="h-full rounded-full transition-[width] duration-500" style={{ width: `${safe}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

export function EmptyState({ title, description, action, icon }: { title: string; description: string; action?: ReactNode; icon?: ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 px-6 py-10 text-center">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
        {icon ?? <Inbox size={21} aria-hidden="true" />}
      </div>
      <h3 className="text-sm font-bold text-slate-900">{title}</h3>
      <p className="mt-1 max-w-md text-sm leading-relaxed text-slate-500">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-900" role="alert">
      <div className="flex items-start gap-2">
        <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
        <p className="font-semibold">{message}</p>
      </div>
      {onRetry && <button className="btn-secondary w-fit" onClick={onRetry}>Try again</button>}
    </div>
  );
}

export function LoadingState({ label = "Loading your study space…" }: { label?: string }) {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center gap-3 text-slate-500" role="status" aria-live="polite">
      <LoaderCircle className="animate-spin text-blue-600" size={26} aria-hidden="true" />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}

export function SkeletonCards({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="card h-32 animate-pulse bg-slate-100/70 p-5" />
      ))}
    </div>
  );
}

export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-800 hover:underline">
      {children}<span aria-hidden="true">→</span>
    </Link>
  );
}

export function formatDate(value: string, withTime = false): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-IN", withTime
    ? { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }
    : { day: "numeric", month: "short", year: "numeric" }).format(date);
}

export function percent(score: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((score / total) * 100);
}
