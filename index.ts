import { mathematicsSubject } from "./mathematics";
import { scienceSubject } from "./science";
import { socialScienceSubject } from "./social-science";
import { englishSubject } from "./english";
import { hindiSubject } from "./hindi";
import { sanskritSubject } from "./sanskrit";
import { computerScienceSubject } from "./computer-science";
import { STUDY_LIBRARY_RESOURCES } from "./resources";
import type {
  ChapterData,
  PracticeQuestion,
  StudyLibraryResource,
  SubjectData,
  SubjectSlug,
} from "./types";

export * from "./types";
export * from "./sample-papers";
export * from "./syllabus-presets";
export { STUDY_LIBRARY_RESOURCES };

export const SUBJECTS: SubjectData[] = [
  mathematicsSubject,
  scienceSubject,
  socialScienceSubject,
  englishSubject,
  hindiSubject,
  sanskritSubject,
  computerScienceSubject,
];

export const SUBJECT_MAP: Record<SubjectSlug, SubjectData> = {
  mathematics: mathematicsSubject,
  science: scienceSubject,
  "social-science": socialScienceSubject,
  english: englishSubject,
  hindi: hindiSubject,
  sanskrit: sanskritSubject,
  "computer-science": computerScienceSubject,
};

export function getSubjectBySlug(slug: string): SubjectData | undefined {
  return SUBJECTS.find((s) => s.slug === slug);
}

export function getChapterBySlug(
  subjectSlug: string,
  chapterSlug: string
): { subject: SubjectData; chapter: ChapterData; index: number } | undefined {
  const subject = getSubjectBySlug(subjectSlug);
  if (!subject) return undefined;
  const index = subject.chapters.findIndex((c) => c.slug === chapterSlug);
  if (index === -1) return undefined;
  return { subject, chapter: subject.chapters[index], index };
}

export interface FlattenedChapter {
  subjectSlug: SubjectSlug;
  subjectName: string;
  chapter: ChapterData;
}

export function getAllChapters(): FlattenedChapter[] {
  return SUBJECTS.flatMap((subject) =>
    subject.chapters.map((chapter) => ({
      subjectSlug: subject.slug,
      subjectName: subject.name,
      chapter,
    }))
  );
}

export function getTotalChapterCount(): number {
  return SUBJECTS.reduce((sum, s) => sum + s.chapters.length, 0);
}

export function getAllPracticeQuestions(): PracticeQuestion[] {
  return SUBJECTS.flatMap((s) => s.chapters.flatMap((c) => c.practiceQuestions));
}

export function getPracticeQuestionsForQuiz(options: {
  quizType: "chapter" | "subject" | "mixed";
  subjectSlug?: SubjectSlug;
  chapterSlug?: string;
  limit?: number;
}): PracticeQuestion[] {
  const { quizType, subjectSlug, chapterSlug, limit = 10 } = options;

  if (quizType === "chapter" && subjectSlug && chapterSlug) {
    const found = getChapterBySlug(subjectSlug, chapterSlug);
    return found ? found.chapter.practiceQuestions : [];
  }

  if (quizType === "subject" && subjectSlug) {
    const subject = getSubjectBySlug(subjectSlug);
    return subject
      ? subject.chapters.flatMap((c) => c.practiceQuestions).slice(0, limit)
      : [];
  }

  // Mixed-subject balanced selection across all 7 subjects
  const allBySubject = SUBJECTS.map((s) =>
    s.chapters.flatMap((c) => c.practiceQuestions)
  );
  const mixed: PracticeQuestion[] = [];
  let round = 0;
  while (mixed.length < limit) {
    let added = false;
    for (const pool of allBySubject) {
      if (round < pool.length && mixed.length < limit) {
        mixed.push(pool[round]);
        added = true;
      }
    }
    if (!added) break;
    round += 1;
  }
  return mixed;
}

export function getLibraryResourcesWithNotes(): StudyLibraryResource[] {
  const chapterNotes: StudyLibraryResource[] = getAllChapters().map(
    ({ subjectSlug, subjectName, chapter }) => ({
      id: `note-${subjectSlug}-${chapter.slug}`,
      title: `${chapter.number}: ${chapter.title} — Original Study Notes`,
      description: chapter.summary,
      subjectSlug,
      chapterSlug: chapter.slug,
      type: "notes",
      sourceLabel: `Minus Study Notes • ${subjectName}`,
      href: `/subjects/${subjectSlug}/${chapter.slug}`,
    })
  );

  return [...chapterNotes, ...STUDY_LIBRARY_RESOURCES];
}
