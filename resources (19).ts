import { OFFICIAL_LINKS, allChapters, subjects } from "./curriculum";
import { mathSamplePapers } from "./samplePapers";
import type { LibraryResource } from "./types";

const official: LibraryResource[] = [
  {
    id: "official-hpbose-book-list",
    title: "HPBOSE Class 10 book list — session 2026–27",
    description: "The official prescribed textbook list. Use it to confirm the exact edition, course and optional subject books for your school.",
    type: "Official textbook",
    subjectId: null,
    chapterId: null,
    href: OFFICIAL_LINKS.bookList2026,
    external: true,
    official: true,
    source: "Himachal Pradesh Board of School Education",
  },
  {
    id: "official-ncert-portal",
    title: "NCERT official textbook portal — Class X",
    description: "Select Class X, subject, language and title on NCERT's own portal. Minus Study links to the official source rather than republishing copyrighted books.",
    type: "Official textbook",
    subjectId: null,
    chapterId: null,
    href: OFFICIAL_LINKS.ncertTextbookPortal,
    external: true,
    official: true,
    source: "National Council of Educational Research and Training",
  },
  {
    id: "official-hpbose-archive",
    title: "HPBOSE official examination & paper archive",
    description: "Entry point to the Board's official site. Look for Examination / Downloads / Model or Previous Year Question Papers; availability is controlled by HPBOSE.",
    type: "Official paper",
    subjectId: null,
    chapterId: null,
    href: OFFICIAL_LINKS.hpboseHome,
    external: true,
    official: true,
    source: "Himachal Pradesh Board of School Education",
  },
  {
    id: "official-model-english-2026",
    title: "Official HPBOSE English model question paper 2026–27",
    description: "The Board's published model paper shows the current question pattern and writing-task format.",
    type: "Official paper",
    subjectId: "english",
    chapterId: null,
    href: OFFICIAL_LINKS.englishModelPaper,
    external: true,
    official: true,
    source: "HPBOSE",
  },
  {
    id: "official-model-social-2026",
    title: "Official HPBOSE Social Science model question paper 2026–27",
    description: "Includes the question-paper design and chapter blueprint, useful for checking examination scope.",
    type: "Official paper",
    subjectId: "social-science",
    chapterId: null,
    href: OFFICIAL_LINKS.socialScienceModelPaper,
    external: true,
    official: true,
    source: "HPBOSE",
  },
  {
    id: "official-syllabus-math",
    title: "HPBOSE Class 10 Mathematics syllabus",
    description: "Official unit list and detailed course of study for Mathematics.",
    type: "Syllabus",
    subjectId: "mathematics",
    chapterId: null,
    href: OFFICIAL_LINKS.mathSyllabus,
    external: true,
    official: true,
    source: "HPBOSE",
  },
  {
    id: "official-syllabus-science",
    title: "HPBOSE Class 10 Science syllabus",
    description: "Official unit-wise chapters, practical list and prescribed book information.",
    type: "Syllabus",
    subjectId: "science",
    chapterId: null,
    href: OFFICIAL_LINKS.scienceSyllabus,
    external: true,
    official: true,
    source: "HPBOSE",
  },
  {
    id: "official-syllabus-english",
    title: "HPBOSE Class 10 English syllabus",
    description: "Official prescribed readers, question-paper design and section-wise course details.",
    type: "Syllabus",
    subjectId: "english",
    chapterId: null,
    href: OFFICIAL_LINKS.englishSyllabus,
    external: true,
    official: true,
    source: "HPBOSE",
  },
  {
    id: "official-syllabus-computer",
    title: "HPBOSE Class 10 Computer Science syllabus",
    description: "Official CS-201 to CS-204 units, theory/practical hours and course content.",
    type: "Syllabus",
    subjectId: "computer-science",
    chapterId: null,
    href: OFFICIAL_LINKS.computerScienceSyllabus,
    external: true,
    official: true,
    source: "HPBOSE",
  },
  {
    id: "official-model-math-2026",
    title: "Official HPBOSE Mathematics model question paper 2026–27",
    description: "The Board's official 80-mark, 3-hour model paper with sections A–E and the examination blueprint.",
    type: "Official paper",
    subjectId: "mathematics",
    chapterId: null,
    href: OFFICIAL_LINKS.mathModelPaper,
    external: true,
    official: true,
    source: "HPBOSE",
  },
  {
    id: "official-hpbose-model-portal",
    title: "HPBOSE official model question paper portal",
    description: "Browse current and past Board model/question papers by class and subject on the official HPBOSE website.",
    type: "Official paper",
    subjectId: null,
    chapterId: null,
    href: OFFICIAL_LINKS.hpboseModelPapers,
    external: true,
    official: true,
    source: "HPBOSE",
  },
];

const subjectBooks: LibraryResource[] = subjects.flatMap((subject) =>
  subject.books.map((book, index) => ({
    id: `book-${subject.id}-${index}`,
    title: `${book.title}`,
    description: `${book.publisher}. ${book.note ?? "Confirm the prescribed edition with the official HPBOSE book list."}`,
    type: "Official textbook" as const,
    subjectId: subject.id,
    chapterId: null,
    href: subject.id === "computer-science" ? OFFICIAL_LINKS.computerScienceSyllabus : OFFICIAL_LINKS.ncertTextbookPortal,
    external: true,
    official: true,
    source: book.publisher,
  })),
);

const chapterNotes: LibraryResource[] = allChapters.map((chapter) => ({
  id: `notes-${chapter.id}`,
  title: `${chapter.title}: original study notes`,
  description: chapter.summary,
  type: "Notes",
  subjectId: chapter.subjectId,
  chapterId: chapter.id,
  href: `/subjects/${chapter.subjectId}/${chapter.id}#notes`,
  external: false,
  official: false,
  source: "Minus Study original guide",
}));

const revisionGuides: LibraryResource[] = allChapters.map((chapter) => ({
  id: `revision-${chapter.id}`,
  title: `${chapter.title}: quick revision guide`,
  description: "Original last-day recap, important questions and practice prompts with hints.",
  type: "Revision guide",
  subjectId: chapter.subjectId,
  chapterId: chapter.id,
  href: `/subjects/${chapter.subjectId}/${chapter.id}#revision`,
  external: false,
  official: false,
  source: "Minus Study original guide",
}));

const formulaSheets: LibraryResource[] = allChapters
  .filter((chapter) => chapter.formulas.length > 0)
  .map((chapter) => ({
    id: `formula-${chapter.id}`,
    title: `${chapter.title}: formula & concept sheet`,
    description: `${chapter.formulas.length} essential relationships from this chapter, with the original notes for context.`,
    type: "Formula sheet",
    subjectId: chapter.subjectId,
    chapterId: chapter.id,
    href: `/subjects/${chapter.subjectId}/${chapter.id}#formulas`,
    external: false,
    official: false,
    source: "Minus Study original guide",
  }));

const samplePaperResources: LibraryResource[] = mathSamplePapers.map((item) => ({
  id: `sample-${item.chapterId}`,
  title: item.title,
  description: `Original ${item.maxMarks}-mark, ${item.durationMinutes}-minute practice paper with ${item.questionCount} questions and a worked answer key. Not an official HPBOSE paper.`,
  type: "Sample paper",
  subjectId: "mathematics",
  chapterId: item.chapterId,
  href: `/sample-papers?chapter=${item.chapterId}`,
  external: false,
  official: false,
  source: "Minus Study original practice paper",
}));

export const libraryResources: LibraryResource[] = [
  ...official,
  ...subjectBooks,
  ...chapterNotes,
  ...revisionGuides,
  ...formulaSheets,
  ...samplePaperResources,
];

export const resourceTypes = ["Notes", "Formula sheet", "Revision guide", "Sample paper", "Official textbook", "Official paper", "Syllabus"] as const;

export function subjectName(subjectId: string | null): string {
  if (!subjectId) return "All subjects";
  return subjects.find((subject) => subject.id === subjectId)?.name ?? "All subjects";
}
