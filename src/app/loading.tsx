import { Card, SkeletonCards } from "@/components/ui";

export default function Loading() {
  return (
    <div className="animate-enter space-y-6" role="status" aria-live="polite">
      <div className="h-8 w-56 animate-pulse rounded-lg bg-slate-200" />
      <div className="h-4 w-full max-w-xl animate-pulse rounded bg-slate-200" />
      <SkeletonCards />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="h-64 animate-pulse bg-slate-100 p-6 lg:col-span-2" />
        <Card className="h-64 animate-pulse bg-slate-100 p-6" />
      </div>
      <span className="sr-only">Loading page</span>
    </div>
  );
}
