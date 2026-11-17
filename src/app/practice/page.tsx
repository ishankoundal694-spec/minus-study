import type { Metadata } from "next";
import { PracticePage } from "@/components/PracticePage";

export const metadata: Metadata = { title: "Practice Tests" };

type SearchParams = Promise<{ quiz?: string | string[] }>;

function single(value: string | string[] | undefined): string {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

export default async function PracticeRoute({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  return <PracticePage initialQuiz={single(params.quiz)} />;
}
