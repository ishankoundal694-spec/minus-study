import type { SubjectData } from "./types";
import { mathematicsChaptersPart1 } from "./mathematics-part1";
import { mathematicsChaptersPart2 } from "./mathematics-part2";

export const mathematicsSubject: SubjectData = {
  slug: "mathematics",
  name: "Mathematics",
  localName: "गणित (Ganit)",
  category: "core",
  shortDescription:
    "Complete 14-chapter Class 10 Mathematics coverage—Real Numbers through Probability—aligned with HPBOSE Ganit & NCERT Class 10.",
  prescribedBooks: [
    "Ganit (Mathematics) Class X — Published by HPBOSE Dharamshala",
    "NCERT Class 10 Mathematics (All 14 Rationalised Chapters)",
  ],
  hpboseCurriculumNote:
    "Covers all 14 core chapters of the HPBOSE 2026–27 & NCERT Class 10 Mathematics syllabus (Real Numbers, Polynomials, Linear Equations, Quadratics, AP, Triangles, Coordinate Geometry, Trigonometry, Applications, Circles, Areas Related to Circles, Surface Areas & Volumes, Statistics, Probability). Verify hpbose.org for any annual circular updates.",
  examPattern: {
    theoryMarks: 80,
    internalOrPracticalMarks: 20,
    durationHours: 3,
  },
  accentColor: "#2563EB",
  iconName: "calculator",
  officialLinks: [
    {
      title: "NCERT Class 10 Mathematics Official e-Book",
      publisher: "NCERT",
      description:
        "Read official chapter-wise Mathematics PDFs directly on NCERT's portal.",
      url: "https://ncert.nic.in/textbook.php?jemh1=0-14",
      category: "textbook",
    },
    {
      title: "NCERT Class 10 Ganit (Hindi Medium)",
      publisher: "NCERT",
      description:
        "Official Hindi medium Class 10 Mathematics textbook on ncert.nic.in.",
      url: "https://ncert.nic.in/textbook.php?jhmh1=0-14",
      category: "textbook",
    },
    {
      title: "HPBOSE Official Syllabus & Model Question Papers",
      publisher: "HPBOSE",
      description:
        "Download official HPBOSE Class 10 syllabus notifications and model papers.",
      url: "https://www.hpbose.org/Downloads.aspx",
      category: "pyq",
    },
  ],
  chapters: [...mathematicsChaptersPart1, ...mathematicsChaptersPart2],
};
