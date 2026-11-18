import type { Metadata } from "next";
import { LibraryPage } from "@/components/LibraryPage";

export const metadata: Metadata = { title: "Study Library" };

type SearchParams = Promise<{ subject?: string | string[]; chapter?: string | string[] }>;

function single(value: string | string[] | undefined): string {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

export default async function LibraryRoute({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  return <LibraryPage initialSubject={single(params.subject)} initialChapter={single(params.chapter)} />;
}
