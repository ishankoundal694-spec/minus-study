import type { StudyLibraryResource } from "./types";

export const STUDY_LIBRARY_RESOURCES: StudyLibraryResource[] = [
  {
    id: "sample-paper-math-1-lib",
    title: "HPBOSE Class 10 Mathematics Board Sample Paper 1 (80 Marks + Solutions)",
    description:
      "Full 3-hour board-pattern paper covering all 14 Mathematics chapters with live exam timer, interactive MCQs, and step-by-step marking scheme.",
    subjectSlug: "mathematics",
    type: "revision-guide",
    sourceLabel: "Minus Study Original Sample Paper",
    href: "/sample-papers?paper=hpbose-math-set-1",
  },
  {
    id: "sample-paper-math-2-lib",
    title: "HPBOSE Class 10 Mathematics Standard Challenge Sample Paper 2 (80 Marks)",
    description:
      "Fresh challenge set focusing on irrationality proofs, trigonometric identities, segments, surface areas, and missing-frequency medians.",
    subjectSlug: "mathematics",
    type: "revision-guide",
    sourceLabel: "Minus Study Original Sample Paper",
    href: "/sample-papers?paper=hpbose-math-set-2",
  },
  {
    id: "sample-paper-science-1-lib",
    title: "HPBOSE Class 10 Science & Technology Sample Paper 1 (60 Marks Theory)",
    description:
      "Board-pattern Science mock paper with balanced equations, Biology explanations, Light numericals, and Electricity circuits.",
    subjectSlug: "science",
    type: "revision-guide",
    sourceLabel: "Minus Study Original Sample Paper",
    href: "/sample-papers?paper=hpbose-science-set-1",
  },
  {
    id: "formula-math-master",
    title: "Class 10 Mathematics Master Formula Sheet (HPBOSE + NCERT)",
    description:
      "All essential board-exam formulas across Real Numbers, Polynomials, Quadratics, Trigonometry, Statistics, and Probability in one clean printable sheet.",
    subjectSlug: "mathematics",
    type: "formula-sheet",
    sourceLabel: "Minus Study Original",
    content: {
      subtitle: "Verified high-yield formulas for quick pre-exam revision",
      items: [
        {
          heading: "Number System & Algebra",
          points: [
            "HCF(a, b) × LCM(a, b) = a × b (valid for two positive integers)",
            "Quadratic Polynomial ax² + bx + c: Sum of zeroes (α + β) = −b/a; Product (αβ) = c/a",
            "Quadratic Formula: x = [−b ± √(b² − 4ac)] / 2a, where Discriminant D = b² − 4ac",
            "Arithmetic Progression: aₙ = a + (n − 1)d;  Sₙ = (n/2)[2a + (n − 1)d] = (n/2)(a + l)",
          ],
        },
        {
          heading: "Coordinate Geometry & Trigonometry",
          points: [
            "Distance Formula: d = √[(x₂ − x₁)² + (y₂ − y₁)²]",
            "Section Formula (m₁ : m₂): x = (m₁x₂ + m₂x₁)/(m₁ + m₂), y = (m₁y₂ + m₂y₁)/(m₁ + m₂)",
            "Identities: sin²θ + cos²θ = 1  |  1 + tan²θ = sec²θ  |  1 + cot²θ = cosec²θ",
            "Exact Values: sin 30° = 1/2, sin 45° = 1/√2, sin 60° = √3/2, tan 45° = 1",
          ],
        },
        {
          heading: "Mensuration, Statistics & Probability",
          points: [
            "Area of Sector = (θ/360°) × πr²;  Length of Arc = (θ/360°) × 2πr",
            "Mode = l + [(f₁ − f₀)/(2f₁ − f₀ − f₂)] × h  |  Median = l + [(n/2 − cf)/f] × h",
            "Empirical Formula: 3 Median = Mode + 2 Mean",
            "Probability: 0 ≤ P(E) ≤ 1;  P(not E) = 1 − P(E)",
          ],
        },
      ],
    },
  },
  {
    id: "formula-science-physics-chem",
    title: "Class 10 Science Formula, Equations & Constants Sheet",
    description:
      "Key Physics numerical formulas (Light & Electricity), essential balanced Chemistry reactions, and SI units frequently asked in HPBOSE exams.",
    subjectSlug: "science",
    type: "formula-sheet",
    sourceLabel: "Minus Study Original",
    content: {
      subtitle: "Physics equations, sign conventions, and must-know chemical equations",
      items: [
        {
          heading: "Optics (Light – Reflection & Refraction)",
          points: [
            "Mirror Formula: 1/f = 1/v + 1/u  |  Magnification m = h'/h = −v/u",
            "Lens Formula: 1/f = 1/v − 1/u  |  Magnification m = h'/h = +v/u",
            "Power of Lens: P = 1 / f(m) = 100 / f(cm)  [Unit: Dioptre, D]",
            "Snell's Law: n₂₁ = sin i / sin r = v₁ / v₂;  Absolute n = c / v (c = 3 × 10⁸ m/s)",
          ],
        },
        {
          heading: "Electricity & Heating",
          points: [
            "Current I = Q / t (Ampere);  Potential Difference V = W / Q (Volt)",
            "Ohm's Law: V = IR  |  Resistivity: R = ρ(l / A)",
            "Series: Rs = R₁ + R₂ + ...  |  Parallel: 1/Rp = 1/R₁ + 1/R₂ + ...",
            "Joule Heating: H = I²Rt = VIt  |  Power P = VI = I²R = V²/R  |  1 kWh = 3.6 × 10⁶ J",
          ],
        },
        {
          heading: "Must-Remember Chemical Reactions",
          points: [
            "Slaking of Lime: CaO(s) + H₂O(l) → Ca(OH)₂(aq) + Heat",
            "Photosynthesis: 6CO₂ + 12H₂O —Sunlight/Chlorophyll→ C₆H₁₂O₆ + 6O₂ + 6H₂O",
            "Chlor-Alkali Process: 2NaCl(aq) + 2H₂O(l) —Electricity→ 2NaOH + Cl₂ + H₂",
            "Thermite Reaction: Fe₂O₃(s) + 2Al(s) → 2Fe(l) + Al₂O₃(s) + Heat",
          ],
        },
      ],
    },
  },
  {
    id: "revision-sst-timeline-maps",
    title: "Social Science Rapid Revision Guide: History Dates, Soils & Disaster Safety",
    description:
      "One-page chronological timeline of Indian Nationalism, soil-crop chart, Three Constitutional Lists, and HPBOSE Disaster Management checklist.",
    subjectSlug: "social-science",
    type: "revision-guide",
    sourceLabel: "Minus Study Original",
    content: {
      subtitle: "High-frequency facts for 1-mark, 3-mark, and map questions",
      items: [
        {
          heading: "Nationalism in India — Exact Timeline",
          points: [
            "1915: Mahatma Gandhi returns to India from South Africa",
            "1917: Champaran Satyagraha (Bihar) & Kheda Satyagraha (Gujarat)",
            "13 April 1919: Jallianwala Bagh Massacre, Amritsar (following Rowlatt Act)",
            "Feb 1922: Chauri Chaura incident → Non-Cooperation Movement called off",
            "Dec 1929: Lahore Congress Session → 'Purna Swaraj' resolution",
            "12 March – 6 April 1930: Dandi Salt March → Civil Disobedience Movement begins",
          ],
        },
        {
          heading: "HPBOSE Disaster Management Quick Points",
          points: [
            "Earthquake indoor action: Drop, Cover under sturdy furniture, Hold On",
            "Alternate communication when towers fail: Amateur (HAM) Radio & Satellite Phones",
            "Himachal hillside conservation: Terrace farming, contour ploughing, afforestation",
          ],
        },
      ],
    },
  },
  {
    id: "revision-english-grammar-letters",
    title: "English Grammar & Formal Letter Blueprint (HPBOSE Class 10)",
    description:
      "Tense backshift table for Reported Speech, Subject-Verb Concord rules, and mark-scoring structure for Formal Letters.",
    subjectSlug: "english",
    type: "revision-guide",
    sourceLabel: "Minus Study Original",
    content: {
      subtitle: "Fast accuracy checklist before writing Section B & C",
      items: [
        {
          heading: "Reported Speech Conversion Rules",
          points: [
            "Simple Present → Simple Past (except universal truths, which NEVER change)",
            "Simple Past → Past Perfect ('went' → 'had gone')",
            "Time shifts: now → then, today → that day, yesterday → the previous day, tomorrow → the next day",
            "Reported questions become statements—never place a '?' at the end of indirect speech",
          ],
        },
        {
          heading: "Formal Letter Checklist",
          points: [
            "Block left alignment: Sender Address → Date → Receiver Address → Crisp Subject → Salutation",
            "3 crisp paragraphs: (1) Purpose, (2) Details/Impact, (3) Suggested action & courteous close",
          ],
        },
      ],
    },
  },
  {
    id: "revision-hindi-vyakaran",
    title: "हिन्दी व्याकरण त्वरित पुनरावृत्ति मार्गदर्शिका (समास, अलंकार, वाक्य-भेद)",
    description:
      "समास के छह भेदों की पहचान तालिका, प्रमुख अलंकारों के वाचक शब्द और रचना के आधार पर वाक्य रूपांतरण नियम।",
    subjectSlug: "hindi",
    type: "revision-guide",
    sourceLabel: "Minus Study Original",
    content: {
      subtitle: "कक्षा 10 बोर्ड परीक्षा के लिए सटीक व्याकरण सूत्र",
      items: [
        {
          heading: "समास पहचान के सूत्र",
          points: [
            "अव्ययीभाव: पहला पद उपसर्ग/अव्यय (यथाशक्ति, आजीवन, प्रतिदिन)",
            "द्विगु: पहला पद संख्यावाची समूह (चौराहा, पंचवटी, नवग्रह)",
            "द्वंद्व: योजक चिह्न व दोनों पद प्रधान (माता-पिता, रात-दिन)",
            "बहुव्रीहि: तीसरा विशेष अर्थ प्रधान (दशानन = रावण, लंबोदर = गणेश)",
          ],
        },
        {
          heading: "अलंकार त्वरित पहचान",
          points: [
            "अनुप्रास: एक वर्ण की बार-बार आवृत्ति ('तरनि तनूजा तट तमाल')",
            "उपमा: तुलनात्मक शब्द 'सा, सी, से, सम, सरिस'",
            "उत्प्रेक्षा: संभावना वाचक शब्द 'मनु, मानो, जनु, जानो'",
          ],
        },
      ],
    },
  },
  {
    id: "revision-sanskrit-samay-sandhi",
    title: "संस्कृत त्वरित पुनरावृत्ति: समय-लेखनम्, सन्धि एवं विभक्ति-सूत्र",
    description:
      "घटिका समय-लेखन (सपाद/सार्ध/पादोन), व्यंजन-विसर्ग सन्धि के उदाहरण एवं सामान्य त्रुटियों से बचाव।",
    subjectSlug: "sanskrit",
    type: "revision-guide",
    sourceLabel: "Minus Study Original",
    content: {
      subtitle: "संस्कृत व्याकरण में शत-प्रतिशत अंकों हेतु त्वरित पत्रक",
      items: [
        {
          heading: "घटिका समय-लेखन सूत्र",
          points: [
            ":00 → वादनम् (5:00 = पञ्चवादनम्)  |  :15 → सपाद (5:15 = सपाद-पञ्चवादनम्)",
            ":30 → सार्ध (5:30 = सार्ध-पञ्चवादनम्)  |  :45 → पादोन + अगली संख्या (5:45 = पादोन-षड्वादनम्)",
          ],
        },
        {
          heading: "मुख्य सन्धि उदाहरण",
          points: [
            "वाक् + ईशः = वागीशः  |  जगत् + ईशः = जगदीशः (जश्त्व सन्धि)",
            "कः + अपि = कोऽपि  |  मनः + हरः = मनोहरः (विसर्ग उत्व सन्धि)",
          ],
        },
      ],
    },
  },
  {
    id: "formula-cs-excel-shortcuts",
    title: "HPBOSE Computer Science Reference Sheet: Networks & Excel Functions",
    description:
      "Quick summary of PAN/LAN/MAN/WAN differences, Word shortcuts (CS-203), and Spreadsheet formulas (CS-204).",
    subjectSlug: "computer-science",
    type: "formula-sheet",
    sourceLabel: "Minus Study Original",
    content: {
      subtitle: "Essential theory + practical reference for HPBOSE CS-201 to CS-204",
      items: [
        {
          heading: "Spreadsheet Functions (CS-204)",
          points: [
            "=SUM(A1:A10) — Adds all numeric values in range A1 to A10",
            "=AVERAGE(A1:A10) — Calculates arithmetic mean of the range",
            "=MAX(A1:A10) / =MIN(A1:A10) — Returns largest / smallest number",
            '=IF(B2>=33, "Pass", "Fail") — Conditional logic check',
            "Relative reference: B2  |  Absolute reference (locked): $B$2",
          ],
        },
        {
          heading: "Networking Quick Table (CS-202)",
          points: [
            "PAN (~10m, Bluetooth) < LAN (building/lab) < MAN (city) < WAN (global/Internet)",
            "Web Browser (Chrome, Firefox, Edge) opens sites; Search Engine (Google, Bing) searches sites",
          ],
        },
      ],
    },
  },
  // Official external NCERT & HPBOSE links (no copyrighted redistribution!)
  {
    id: "official-ncert-portal-math",
    title: "NCERT Official Class 10 Mathematics e-Textbook",
    description: "Official NCERT portal hosting copyrighted Class 10 Mathematics & Ganit textbooks for legitimate free reading.",
    subjectSlug: "mathematics",
    type: "official-textbook",
    sourceLabel: "Official NCERT Portal",
    externalUrl: "https://ncert.nic.in/textbook.php?jemh1=0-14",
  },
  {
    id: "official-ncert-portal-science",
    title: "NCERT Official Class 10 Science (Vigyan) e-Textbook",
    description: "Official NCERT portal for Class 10 Science chapters in English and Hindi.",
    subjectSlug: "science",
    type: "official-textbook",
    sourceLabel: "Official NCERT Portal",
    externalUrl: "https://ncert.nic.in/textbook.php?jesc1=0-13",
  },
  {
    id: "official-ncert-portal-sst",
    title: "NCERT Official Class 10 Social Science e-Textbooks (All 4 Books)",
    description: "Access History, Geography, Civics, and Economics directly from NCERT.",
    subjectSlug: "social-science",
    type: "official-textbook",
    sourceLabel: "Official NCERT Portal",
    externalUrl: "https://ncert.nic.in/textbook.php",
  },
  {
    id: "official-ncert-portal-english",
    title: "NCERT Official Class 10 English: First Flight & Footprints Without Feet",
    description: "Read official English textbooks legitimately on NCERT's website.",
    subjectSlug: "english",
    type: "official-textbook",
    sourceLabel: "Official NCERT Portal",
    externalUrl: "https://ncert.nic.in/textbook.php?jeff1=0-9",
  },
  {
    id: "official-ncert-portal-hindi",
    title: "NCERT Official Class 10 Hindi: Kshitij-2 & Kritika-2",
    description: "Official Hindi textbooks hosted on ncert.nic.in.",
    subjectSlug: "hindi",
    type: "official-textbook",
    sourceLabel: "Official NCERT Portal",
    externalUrl: "https://ncert.nic.in/textbook.php?jhks1=0-12",
  },
  {
    id: "official-ncert-portal-sanskrit",
    title: "NCERT Official Class 10 Sanskrit: Shemushi Bhag-2",
    description: "Official Sanskrit textbook hosted on ncert.nic.in.",
    subjectSlug: "sanskrit",
    type: "official-textbook",
    sourceLabel: "Official NCERT Portal",
    externalUrl: "https://ncert.nic.in/textbook.php?jhsk1=0-12",
  },
  {
    id: "official-hpbose-pyq-all",
    title: "HPBOSE Official Downloads: Class 10 Syllabus, Model Papers & PYQs",
    description:
      "Visit Himachal Pradesh Board of School Education (hpbose.org) directly for official Class 10 syllabus circulars, model question papers, and previous-year question papers across all subjects.",
    subjectSlug: "mathematics",
    type: "pyq-link",
    sourceLabel: "Official HPBOSE Portal",
    externalUrl: "https://www.hpbose.org/Downloads.aspx",
  },
  {
    id: "official-hpbose-cs-syllabus",
    title: "HPBOSE Official Class 10 Computer Science Syllabus & Model Papers",
    description:
      "Official HPBOSE portal for Class 10 Computer Science (CS-201 to CS-204) theory and practical blueprints.",
    subjectSlug: "computer-science",
    type: "pyq-link",
    sourceLabel: "Official HPBOSE Portal",
    externalUrl: "https://www.hpbose.org/Downloads.aspx",
  },
  {
    id: "official-hpbose-notifications",
    title: "HPBOSE Official Notifications & 2026–27 Academic Circulars",
    description:
      "Verify annual syllabus rationalisation, exam date sheets, and official HPBOSE board notices directly.",
    subjectSlug: "science",
    type: "pyq-link",
    sourceLabel: "Official HPBOSE Portal",
    externalUrl: "https://www.hpbose.org/Notification.aspx",
  },
];
