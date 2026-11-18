import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterReader } from "@/components/ChapterReader";
import { allChapters, getChapter, getSubject } from "@/lib/curriculum";

type Params = Promise<{ subjectId: string; chapterId: string }>;

export function generateStaticParams() {
  return allChapters.map((chapter) => ({ subjectId: chapter.subjectId, chapterId: chapter.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { chapterId } = await params;
  const chapter = getChapter(chapterId);
  return { title: chapter ? chapter.title : "Chapter not found" };
}

export default async function ChapterPage({ params }: { params: Params }) {
  const { subjectId, chapterId } = await params;
  const subject = getSubject(subjectId);
  const chapter = getChapter(chapterId);
  if (!subject || !chapter || chapter.subjectId !== subjectId) notFound();
  return <ChapterReader subjectId={subjectId} chapterId={chapterId} />;
}
