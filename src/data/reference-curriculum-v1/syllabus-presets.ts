import type { SubjectSlug } from "./types";

export const MAIN_SUBJECT_SLUGS: SubjectSlug[] = [
  "science",
  "mathematics",
  "social-science",
];

export function isMainSubject(slug: string): boolean {
  return MAIN_SUBJECT_SLUGS.includes(slug as SubjectSlug);
}

export interface SyllabusPresetItem {
  unitName: string;
  title: string;
  targetMarks?: number;
  notes?: string;
}

export const COMPLETE_SYLLABUS_PRESETS: Record<
  SubjectSlug,
  SyllabusPresetItem[]
> = {
  science: [
    // Chemistry
    { unitName: "Chemistry", title: "Ch. 1: Chemical Reactions and Equations", targetMarks: 5 },
    { unitName: "Chemistry", title: "Ch. 2: Acids, Bases and Salts", targetMarks: 5 },
    { unitName: "Chemistry", title: "Ch. 3: Metals and Non-metals", targetMarks: 5 },
    { unitName: "Chemistry", title: "Ch. 4: Carbon and its Compounds", targetMarks: 5 },
    // Biology
    { unitName: "Biology", title: "Ch. 5: Life Processes", targetMarks: 7 },
    { unitName: "Biology", title: "Ch. 6: Control and Coordination", targetMarks: 4 },
    { unitName: "Biology", title: "Ch. 7: How do Organisms Reproduce?", targetMarks: 5 },
    { unitName: "Biology", title: "Ch. 8: Heredity", targetMarks: 4 },
    // Physics
    { unitName: "Physics", title: "Ch. 9: Light – Reflection and Refraction", targetMarks: 6 },
    { unitName: "Physics", title: "Ch. 10: The Human Eye and the Colourful World", targetMarks: 4 },
    { unitName: "Physics", title: "Ch. 11: Electricity", targetMarks: 6 },
    { unitName: "Physics", title: "Ch. 12: Magnetic Effects of Electric Current", targetMarks: 4 },
    // Natural Resources
    { unitName: "Environment", title: "Ch. 13: Our Environment", targetMarks: 4 },
  ],
  mathematics: [
    { unitName: "Number Systems", title: "Ch. 1: Real Numbers", targetMarks: 6 },
    { unitName: "Algebra", title: "Ch. 2: Polynomials", targetMarks: 5 },
    { unitName: "Algebra", title: "Ch. 3: Pair of Linear Equations in Two Variables", targetMarks: 6 },
    { unitName: "Algebra", title: "Ch. 4: Quadratic Equations", targetMarks: 6 },
    { unitName: "Algebra", title: "Ch. 5: Arithmetic Progressions", targetMarks: 6 },
    { unitName: "Geometry", title: "Ch. 6: Triangles", targetMarks: 7 },
    { unitName: "Coordinate Geometry", title: "Ch. 7: Coordinate Geometry", targetMarks: 6 },
    { unitName: "Trigonometry", title: "Ch. 8: Introduction to Trigonometry", targetMarks: 7 },
    { unitName: "Trigonometry", title: "Ch. 9: Some Applications of Trigonometry", targetMarks: 5 },
    { unitName: "Geometry", title: "Ch. 10: Circles", targetMarks: 6 },
    { unitName: "Mensuration", title: "Ch. 11: Areas Related to Circles", targetMarks: 5 },
    { unitName: "Mensuration", title: "Ch. 12: Surface Areas and Volumes", targetMarks: 6 },
    { unitName: "Statistics & Probability", title: "Ch. 13: Statistics", targetMarks: 5 },
    { unitName: "Statistics & Probability", title: "Ch. 14: Probability", targetMarks: 4 },
  ],
  "social-science": [
    // History
    { unitName: "History", title: "Ch. 1: The Rise of Nationalism in Europe", targetMarks: 5 },
    { unitName: "History", title: "Ch. 2: Nationalism in India (incl. Map Work)", targetMarks: 6 },
    { unitName: "History", title: "Ch. 3: The Making of a Global World", targetMarks: 4 },
    { unitName: "History", title: "Ch. 4: The Age of Industrialisation", targetMarks: 3 },
    { unitName: "History", title: "Ch. 5: Print Culture and the Modern World", targetMarks: 4 },
    // Geography
    { unitName: "Geography", title: "Ch. 1: Resources and Development", targetMarks: 4 },
    { unitName: "Geography", title: "Ch. 2: Forest and Wildlife Resources", targetMarks: 3 },
    { unitName: "Geography", title: "Ch. 3: Water Resources", targetMarks: 3 },
    { unitName: "Geography", title: "Ch. 4: Agriculture", targetMarks: 4 },
    { unitName: "Geography", title: "Ch. 5: Minerals and Energy Resources", targetMarks: 4 },
    { unitName: "Geography", title: "Ch. 6: Manufacturing Industries", targetMarks: 4 },
    { unitName: "Geography", title: "Ch. 7: Lifelines of National Economy (Map Work)", targetMarks: 3 },
    // Democratic Politics (Civics)
    { unitName: "Civics (Political Science)", title: "Ch. 1: Power-sharing", targetMarks: 4 },
    { unitName: "Civics (Political Science)", title: "Ch. 2: Federalism", targetMarks: 4 },
    { unitName: "Civics (Political Science)", title: "Ch. 3: Gender, Religion and Caste", targetMarks: 3 },
    { unitName: "Civics (Political Science)", title: "Ch. 4: Political Parties", targetMarks: 4 },
    { unitName: "Civics (Political Science)", title: "Ch. 5: Outcomes of Democracy", targetMarks: 3 },
    // Economics
    { unitName: "Economics", title: "Ch. 1: Development", targetMarks: 4 },
    { unitName: "Economics", title: "Ch. 2: Sectors of the Indian Economy", targetMarks: 4 },
    { unitName: "Economics", title: "Ch. 3: Money and Credit", targetMarks: 4 },
    { unitName: "Economics", title: "Ch. 4: Globalisation and the Indian Economy", targetMarks: 4 },
    // HPBOSE State Unit
    { unitName: "HPBOSE Disaster Management", title: "Disaster Management: Survival Skills, Tsunami & Alternate Communication", targetMarks: 5 },
  ],
  english: [
    { unitName: "First Flight (Prose)", title: "Ch. 1: A Letter to God" },
    { unitName: "First Flight (Prose)", title: "Ch. 2: Nelson Mandela: Long Walk to Freedom" },
    { unitName: "First Flight (Prose)", title: "Ch. 3: Two Stories about Flying" },
    { unitName: "First Flight (Prose)", title: "Ch. 4: From the Diary of Anne Frank" },
    { unitName: "First Flight (Prose)", title: "Ch. 5: Glimpses of India" },
    { unitName: "First Flight (Prose)", title: "Ch. 6: Madam Rides the Bus & The Sermon at Benares" },
    { unitName: "Footprints Without Feet", title: "Supplementary Reader: A Triumph of Surgery, The Thief's Story, Bholi & More" },
    { unitName: "Grammar & Writing", title: "Tenses, Modals, Reported Speech, Active/Passive Voice & Formal Letters" },
  ],
  hindi: [
    { unitName: "क्षितिज-2 (काव्य खंड)", title: "पाठ 1: सूरदास के पद" },
    { unitName: "क्षितिज-2 (काव्य खंड)", title: "पाठ 2: राम-लक्ष्मण-परशुराम संवाद (तुलसीदास)" },
    { unitName: "क्षितिज-2 (काव्य खंड)", title: "पाठ 4: उत्साह और अट नहीं रही है (सूर्यकांत त्रिपाठी 'निराला')" },
    { unitName: "क्षितिज-2 (गद्य खंड)", title: "पाठ 7: नेताजी का चश्मा (स्वयं प्रकाश)" },
    { unitName: "क्षितिज-2 (गद्य खंड)", title: "पाठ 8: बालगोबिन भगत (रामवृक्ष बेनीपुरी)" },
    { unitName: "कृतिका-2", title: "माता का अँचल, साना-साना हाथ जोड़ि एवं मैं क्यों लिखता हूँ" },
    { unitName: "व्याकरण एवं रचना", title: "समास, अलंकार, वाच्य, वाक्य-भेद, पत्र एवं निबंध लेखन" },
  ],
  sanskrit: [
    { unitName: "शेमुषी भाग-2", title: "पाठ 1: शुचिपर्यावरणम्" },
    { unitName: "शेमुषी भाग-2", title: "पाठ 2: बुद्धिर्बलवती सदा" },
    { unitName: "शेमुषी भाग-2", title: "पाठ 4: शिशुलालनम् एवं जननी तुल्यवत्सला" },
    { unitName: "शेमुषी भाग-2", title: "पाठ 6: सुभाषितानि एवं सौहार्दं प्रकृतेः शोभा" },
    { unitName: "संस्कृत व्याकरणम्", title: "सन्धिः, समासः, प्रत्ययाः, वाच्यपरिवर्तनम् एवं घटिका समय-लेखनम्" },
  ],
  "computer-science": [
    { unitName: "HPBOSE Module CS-201", title: "CS-201: Digital Literacy (Advanced) — Projectors, Displays, Printers & Plotters", targetMarks: 12 },
    { unitName: "HPBOSE Module CS-202", title: "CS-202: Network and Internet Concepts — PAN, LAN, MAN, WAN, Browsers & Email", targetMarks: 13 },
    { unitName: "HPBOSE Module CS-203", title: "CS-203: Digital Documentation (Word Processing Advanced & Mail Merge)", targetMarks: 12 },
    { unitName: "HPBOSE Module CS-204", title: "CS-204: Digital Data Tabulation (Spreadsheets, Formulas, Functions & Charts)", targetMarks: 13 },
    { unitName: "Practical & Viva", title: "CS-205: Lab Practical File, Project Work & Viva Voce", targetMarks: 50 },
  ],
};
