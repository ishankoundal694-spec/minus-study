import type { Metadata } from "next";
import { AITutor } from "@/components/AITutor";

export const metadata: Metadata = { title: "Minus AI Tutor" };

type SearchParams = Promise<{ subject?: string | string[]; chapter?: string | string[]; mode?: string | string[] }>;

function single(value: string | string[] | undefined): string {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

export default async function AITutorRoute({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  return (
    <AITutor
      initialSubject={single(params.subject)}
      initialChapter={single(params.chapter)}
      initialMode={single(params.mode)}
    />
  );
}
