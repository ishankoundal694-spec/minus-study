import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubjectDetail } from "@/components/SubjectDetail";
import { getSubject, subjects } from "@/lib/curriculum";

type Params = Promise<{ subjectId: string }>;

export function generateStaticParams() {
  return subjects.map((subject) => ({ subjectId: subject.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { subjectId } = await params;
  const subject = getSubject(subjectId);
  return { title: subject ? `${subject.name} chapters` : "Subject not found" };
}

export default async function SubjectPage({ params }: { params: Params }) {
  const { subjectId } = await params;
  if (!getSubject(subjectId)) notFound();
  return <SubjectDetail subjectId={subjectId} />;
}
