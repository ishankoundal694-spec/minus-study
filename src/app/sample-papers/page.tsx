import type { Metadata } from "next";
import { SamplePapersPage } from "@/components/SamplePapersPage";

export const metadata: Metadata = {
  title: "Maths Sample Papers",
  description: "Original chapter-wise Class 10 HPBOSE Mathematics practice papers with worked answer keys, self-assessment and official model-paper references.",
};

type SearchParams = Promise<{ chapter?: string | string[] }>;

function single(value: string | string[] | undefined): string {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

export default async function SamplePapersRoute({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  return <SamplePapersPage initialChapter={single(params.chapter)} />;
}
