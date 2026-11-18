export type SubjectSlug =
  | "mathematics"
  | "science"
  | "social-science"
  | "english"
  | "hindi"
  | "sanskrit"
  | "computer-science";

export type SyllabusAlignment =
  | "hpbose-ncert-core"
  | "hpbose-state-specific"
  | "verify-annual-circular";

export interface NoteSection {
  heading: string;
  body: string[];
  keyFormulaOrRule?: string;
  workedExample?: {
    problem: string;
    steps: string[];
    answer: string;
  };
}

export interface ImportantQuestion {
  id: string;
  marks: 2 | 3 | 5;
  question: string;
  modelAnswer: string;
  examTip?: string;
}

export interface PracticeQuestion {
  id: string;
  subjectSlug: SubjectSlug;
  chapterSlug: string;
  chapterTitle: string;
  topic: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface ChapterData {
  slug: string;
  number: string;
  title: string;
  bookReference: string;
  syllabusAlignment: SyllabusAlignment;
  syllabusNote: string;
  estimatedMinutes: number;
  summary: string;
  learningObjectives: string[];
  detailedNotes: NoteSection[];
  importantQuestions: ImportantQuestion[];
  practiceQuestions: PracticeQuestion[];
  revisionPoints: string[];
  commonMistakes: string[];
  formulaHighlights?: { label: string; expression: string }[];
}

export interface OfficialLink {
  title: string;
  publisher: "NCERT" | "HPBOSE" | "DIKSHA";
  description: string;
  url: string;
  category: "textbook" | "syllabus" | "pyq";
}

export interface SubjectData {
  slug: SubjectSlug;
  name: string;
  localName?: string;
  category: "core" | "language" | "elective";
  shortDescription: string;
  prescribedBooks: string[];
  hpboseCurriculumNote: string;
  examPattern: {
    theoryMarks: number;
    internalOrPracticalMarks: number;
    durationHours: number;
  };
  accentColor: string;
  iconName:
    | "calculator"
    | "flask"
    | "globe"
    | "book-open"
    | "languages"
    | "scroll"
    | "cpu";
  officialLinks: OfficialLink[];
  chapters: ChapterData[];
}

export interface StudyLibraryResource {
  id: string;
  title: string;
  description: string;
  subjectSlug: SubjectSlug;
  chapterSlug?: string;
  type: "notes" | "formula-sheet" | "revision-guide" | "official-textbook" | "pyq-link";
  sourceLabel: string;
  href?: string;
  externalUrl?: string;
  content?: {
    subtitle: string;
    items: { heading: string; points: string[] }[];
  };
}
