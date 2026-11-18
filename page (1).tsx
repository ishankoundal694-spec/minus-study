import type { Metadata } from "next";
import { SyllabusPage } from "@/components/SyllabusPage";

export const metadata: Metadata = {
  title: "My Syllabus",
  description: "Add your complete Class 10 syllabus for every subject, track item status, and see real progress across Mathematics, Science and Social Science.",
};

type SearchParams = Promise<{ subject?: string | string[] }>;

function single(value: string | string[] | undefined): string {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

export default async function SyllabusRoute({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  return <SyllabusPage initialSubject={single(params.subject)} />;
}
