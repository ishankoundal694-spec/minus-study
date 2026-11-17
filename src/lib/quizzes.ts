import { allChapters, subjects } from "./curriculum";
import { samplePaperQuizQuestions } from "./samplePapers";
import type { QuizQuestion } from "./types";

type Difficulty = QuizQuestion["difficulty"];
type Options = [string, string, string, string];

function q(
  subjectId: string,
  slug: string,
  topic: string,
  prompt: string,
  options: Options,
  answerIndex: number,
  explanation: string,
  difficulty: Difficulty = "medium",
): QuizQuestion {
  return {
    id: "",
    subjectId,
    chapterId: `${subjectId}-${slug}`,
    topic,
    prompt,
    options,
    answerIndex,
    explanation,
    difficulty,
  };
}

const manualQuestions: QuizQuestion[] = [
  q("mathematics", "real-numbers", "Prime factorisation", "The HCF of 96 and 404 is:", ["2", "4", "8", "12"], 1, "96 = 2⁵ × 3 and 404 = 2² × 101. The common prime power is 2² = 4.", "easy"),
  q("mathematics", "real-numbers", "Irrational numbers", "Which statement is always true?", ["Every decimal is rational", "√3 is irrational", "π = 22/7 exactly", "A non-terminating decimal can never be rational"], 1, "√3 cannot be expressed as p/q. Repeating non-terminating decimals are rational, and 22/7 only approximates π.", "challenge"),
  q("mathematics", "polynomials", "Zeroes", "For 2x² − 8x + 6, the sum of zeroes is:", ["4", "3", "−4", "−3"], 0, "For ax² + bx + c, sum = −b/a = −(−8)/2 = 4.", "easy"),
  q("mathematics", "polynomials", "Factor theorem", "If p(2) = 0 for a polynomial p(x), which is a factor?", ["x + 2", "x − 2", "2x", "x² + 2"], 1, "By the factor theorem, p(a) = 0 implies (x − a) is a factor.", "medium"),
  q("mathematics", "linear-equations", "Consistency", "The pair x + 2y = 3 and 2x + 4y = 6 has:", ["One solution", "No solution", "Infinitely many solutions", "Only (3, 0)"], 2, "All coefficient and constant ratios are equal, so the equations represent the same line.", "medium"),
  q("mathematics", "linear-equations", "Elimination", "Solving x + y = 7 and x − y = 3 gives:", ["(5, 2)", "(2, 5)", "(4, 3)", "(3, 4)"], 0, "Adding the equations gives 2x = 10, so x = 5 and y = 2.", "easy"),
  q("mathematics", "quadratic-equations", "Discriminant", "For x² − 6x + 9 = 0, the roots are:", ["Two distinct real", "Equal real", "Not real", "Irrational and unequal"], 1, "D = 36 − 36 = 0, so the equation has equal real roots.", "medium"),
  q("mathematics", "quadratic-equations", "Applications", "A positive number is 3 more than twice its reciprocal's denominator in 2x² − 3x − 2 = 0. The valid root is:", ["2", "−1/2", "1/2", "−2"], 0, "Roots are 2 and −1/2. A positive count/length keeps 2.", "challenge"),
  q("mathematics", "trigonometry", "Ratios", "In a right triangle, opposite = 3 and hypotenuse = 5 for angle A. sin A is:", ["3/4", "4/5", "3/5", "5/3"], 2, "sin A = opposite / hypotenuse = 3/5.", "easy"),
  q("mathematics", "trigonometry", "Identities", "1 + tan²A equals:", ["cosec²A", "sec²A", "cot²A", "sin²A"], 1, "Divide sin²A + cos²A = 1 by cos²A to obtain 1 + tan²A = sec²A.", "medium"),
  q("science", "chemical-reactions", "Balancing", "The coefficient of O₂ in 2KClO₃ → 2KCl + __O₂ is:", ["1", "2", "3", "4"], 2, "There are six oxygen atoms on the left; 3O₂ supplies six on the right.", "easy"),
  q("science", "chemical-reactions", "Reaction type", "Zn + CuSO₄ → ZnSO₄ + Cu is:", ["Combination", "Decomposition", "Single displacement", "Neutralisation"], 2, "Zinc is more reactive than copper and displaces it from its salt solution.", "medium"),
  q("science", "acids-bases-salts", "pH", "A solution with pH 3 is:", ["Neutral", "Weakly basic", "Acidic", "Strongly basic"], 2, "pH below 7 is acidic; lower values indicate stronger acidity.", "easy"),
  q("science", "acids-bases-salts", "Neutralisation", "HCl + NaOH produces:", ["NaCl + H₂O", "NaH + ClOH", "NaCl + O₂", "NaOH + HCl only"], 0, "H⁺ and OH⁻ form water; Na⁺ and Cl⁻ form sodium chloride.", "medium"),
  q("science", "life-processes", "Photosynthesis", "Which condition is essential for starch formation in a green leaf?", ["Darkness", "Light", "Oxygen absence", "High temperature only"], 1, "Light supplies the energy for photosynthesis; starch is the stored carbohydrate.", "easy"),
  q("science", "life-processes", "Circulation", "The chamber that pumps oxygenated blood to the whole body is:", ["Right atrium", "Right ventricle", "Left atrium", "Left ventricle"], 3, "The left ventricle has the thickest wall and pumps into the aorta.", "medium"),
  q("science", "light", "Reflection", "The angle of incidence is measured between:", ["Ray and mirror", "Incident ray and normal", "Reflected ray and mirror", "Incident and reflected rays"], 1, "Both incidence and reflection angles are measured from the normal at the point of incidence.", "easy"),
  q("science", "light", "Lens power", "A convex lens has focal length 0.5 m. Its power is:", ["+2 D", "−2 D", "+0.5 D", "−0.5 D"], 0, "P = 1/f = 1/0.5 = +2 dioptres; convex lenses have positive power.", "medium"),
  q("science", "electricity", "Ohm's law", "A 6 V battery drives 0.5 A through a resistor. Its resistance is:", ["3 Ω", "6 Ω", "12 Ω", "30 Ω"], 2, "R = V/I = 6/0.5 = 12 Ω.", "easy"),
  q("science", "electricity", "Parallel circuits", "For resistors in parallel, the quantity that is the same across each branch is:", ["Current", "Charge", "Potential difference", "Resistance"], 2, "Parallel branches connect across the same two nodes, so voltage is common.", "medium"),
  q("social-science", "nationalism-europe", "French Revolution", "The idea of popular sovereignty means authority comes from:", ["A monarch alone", "The people", "The army", "A foreign empire"], 1, "The French Revolution replaced dynastic legitimacy with the idea of citizen-based sovereignty.", "medium"),
  q("social-science", "nationalism-europe", "1848", "The Frankfurt Parliament sought:", ["A unified German nation-state", "A world empire", "Abolition of all parliaments", "A trade treaty with Britain"], 0, "Elected representatives drafted a constitution for a unified German nation, but the assembly ultimately failed.", "medium"),
  q("social-science", "nationalism-india", "Salt March", "Salt was an effective symbol because it was:", ["A luxury import", "Used by every household", "Only sold to landlords", "Unrelated to taxation"], 1, "A universal necessity made the salt tax visible to nearly every family.", "easy"),
  q("social-science", "nationalism-india", "Representation", "The Poona Pact addressed:", ["Partition of Bengal", "Representation of Depressed Classes", "Salt manufacture", "Currency reform"], 1, "It replaced separate electorates for Depressed Classes with reserved seats in joint electorates.", "challenge"),
  q("social-science", "gender-religion-caste", "Social divisions", "Cross-cutting differences usually:", ["Deepen a single conflict", "Remove all elections", "Reduce the chance of one overwhelming divide", "Make rights unnecessary"], 2, "When people share identities across groups, one division is less likely to split society into two fixed camps.", "medium"),
  q("social-science", "gender-religion-caste", "Democracy", "Which is the most democratic response to a group's legitimate grievance?", ["Ignore it completely", "Discuss rights and representation", "Ban all political parties", "Give one group permanent veto"], 1, "Democracy provides constitutional discussion, rights and representation while protecting other citizens.", "medium"),
  q("social-science", "development", "Indicators", "HDI adds which dimensions to income?", ["Area and population", "Health and education", "Exports and imports", "Roads and electricity only"], 1, "Human Development Index combines income with health and education measures.", "easy"),
  q("social-science", "development", "Sustainability", "Over-pumping groundwater is unsustainable mainly because it:", ["Always causes earthquakes", "Reduces water available to future generations", "Makes water cheaper", "Eliminates all farming immediately"], 1, "Sustainability asks whether current use depletes the resource base needed later.", "medium"),
  q("social-science", "disaster-management", "Risk", "Disaster risk increases when a hazard meets:", ["Low vulnerability", "High exposure and vulnerability", "Strong preparedness only", "Verified warning systems only"], 1, "Hazard alone is not a disaster; exposure, vulnerability and limited capacity intensify risk.", "medium"),
  q("social-science", "disaster-management", "Safety", "During a flood warning, the safest action is to:", ["Cross flowing water on foot", "Follow official evacuation guidance", "Stand under a damaged slope", "Share unverified rumours"], 1, "Official warnings and designated routes account for local hazards; floodwater is unpredictable.", "easy"),
  q("english", "letter-to-god", "Irony", "The irony in Lencho's second letter is that he:", ["Thanks the postmaster", "Suspects the people who helped him", "Refuses to write again", "Asks for a new harvest"], 1, "He trusts God but assumes the postal employees stole the missing amount, although they donated it.", "medium"),
  q("english", "letter-to-god", "Character", "The postmaster's decision to collect money shows:", ["Obedience to a rule", "Compassion and admiration", "Fear of punishment", "A wish for publicity"], 1, "He acts anonymously because he is moved by Lencho's faith.", "easy"),
  q("english", "nelson-mandela", "Theme", "Mandela says courage is:", ["Never feeling fear", "Triumph over fear", "Avoiding responsibility", "Winning an election"], 1, "His definition emphasises action despite fear, not the absence of fear.", "easy"),
  q("english", "nelson-mandela", "Freedom", "'The oppressor is also unfree' suggests freedom is:", ["Only a legal document", "Purely economic", "Relational and shared", "A private hobby"], 2, "Mandela argues that oppression diminishes both the oppressed and the oppressor.", "challenge"),
  q("english", "writing-skills", "Notice format", "Which belongs in a school notice?", ["Subject line and salutation", "Date, heading and issuing authority", "Yours faithfully", "A byline and title only"], 1, "A notice includes institution, NOTICE, date, heading, concise details and signature/designation.", "medium"),
  q("english", "writing-skills", "Tone", "A formal letter to a principal should be:", ["Casual and humorous", "Polite, specific and concise", "Written entirely in slogans", "Addressed to an unnamed friend"], 1, "Formal purpose and audience require respectful, relevant and concise language.", "easy"),
  q("english", "reading-grammar", "Inference", "An inferential comprehension answer must be:", ["Based only on prior opinion", "Supported by the passage", "Copied without reading", "Longer than the passage"], 1, "Inference combines textual evidence with reasoned interpretation.", "easy"),
  q("english", "reading-grammar", "Agreement", "Choose the correct sentence:", ["Each of the boys have a book", "Each of the boys has a book", "Each of the boys are having book", "Each boys has a book"], 1, "Each is singular and takes the singular verb has; 'boys' follows the preposition.", "medium"),
  q("hindi", "surdas-pad", "रस", "सूरदास के पदों में प्रमुख रस है:", ["वात्सल्य", "शृंगार", "रौद्र", "हास्य"], 0, "कृष्ण की बाललीला और यशोदा का स्नेह वात्सल्य रस को केन्द्र में रखते हैं।", "easy"),
  q("hindi", "surdas-pad", "भावार्थ", "भावार्थ लिखते समय सबसे उपयुक्त है:", ["मूल पंक्तियाँ ज्यों-की-त्यों", "केवल शब्दार्थ", "केंद्रीय भाव की अपने शब्दों में व्याख्या", "केवल छन्द-परिचय"], 2, "भावार्थ में पाठ के विचार को समझाकर अपने शब्दों में प्रस्तुत किया जाता है।", "medium"),
  q("hindi", "ram-lakshman", "चरित्र", "राम के स्वभाव का प्रमुख पक्ष है:", ["उग्रता", "संयम और विनम्रता", "व्यंग्य-प्रियता", "अनिर्णय"], 1, "परशुराम और लक्ष्मण के तीव्र संवाद के बीच राम संयम और बड़ों के सम्मान को बनाए रखते हैं।", "easy"),
  q("hindi", "ram-lakshman", "संवाद", "संवाद की नाटकीयता बढ़ती है:", ["प्रश्न-उत्तर की तीव्रता से", "केवल लंबे वर्णन से", "पात्रों की अनुपस्थिति से", "शीर्षक बदलने से"], 0, "छोटे, तीखे उत्तर और प्रतिक्रियाएँ संघर्ष को दृश्यमान बनाती हैं।", "medium"),
  q("hindi", "netaji-chashma", "व्यंग्य", "व्यंग्य में हास्य के साथ होता है:", ["केवल कल्पना", "सूक्ष्म आलोचना", "पूर्ण कथानक-त्याग", "केवल अलंकार"], 1, "व्यंग्य हँसी के माध्यम से किसी सोच या व्यवहार पर प्रश्न उठाता है।", "easy"),
  q("hindi", "netaji-chashma", "प्रतीक", "कहानी में चश्मा मुख्यतः बन जाता है:", ["यात्रा का साधन", "प्रतिष्ठा/दिखावे का प्रतीक", "मौसम-सूचक", "व्याकरण-नियम"], 1, "वस्तु का सामाजिक अर्थ बढ़कर दिखावे और मान-प्रतिष्ठा से जुड़ता है।", "medium"),
  q("hindi", "hindi-grammar", "संधि", "संधि-विच्छेद में मुख्य काम है:", ["नया वाक्य जोड़ना", "संयुक्त वर्णों के मूल रूप पहचानना", "केवल विराम लगाना", "लिंग बदलना"], 1, "विच्छेद में मेल से हुए परिवर्तन को उल्टाकर मूल वर्ण/पद लिखे जाते हैं।", "easy"),
  q("hindi", "hindi-grammar", "वाक्य-शुद्धि", "शुद्ध वाक्य है:", ["विद्यार्थियों ने अपना-अपना कार्य किया", "विद्यार्थियों ने अपने-अपने कार्य किया", "विद्यार्थीगण ने अपना कार्य किये", "विद्यार्थियों ने अपना कार्य कर रहा है"], 0, "बहुवचन कर्ता के अनुसार क्रिया और सर्वनाम का रूप संगत होना चाहिए।", "challenge"),
  q("sanskrit", "shuchi-paryavaranam", "शब्दार्थ", "'शुचि' का अर्थ है:", ["शुद्ध/स्वच्छ", "तीव्र", "दूर", "नूतन"], 0, "शुचिपर्यावरणम् का आशय स्वच्छ पर्यावरण से है।", "easy"),
  q("sanskrit", "shuchi-paryavaranam", "अन्वय", "संस्कृत अनुवाद का उपयोगी प्रथम चरण है:", ["क्रियापद पहचानना", "अंतिम अक्षर मिटाना", "केवल श्लोक कंठस्थ करना", "वर्णमाला लिखना"], 0, "क्रियापद से कर्ता, कर्म और अन्य कारकों के संबंध खोजना सरल होता है।", "medium"),
  q("sanskrit", "buddhi-balavati", "कथा-बोध", "पाठ का केंद्रीय विचार है:", ["बल सदैव निर्णायक", "बुद्धि/विवेक का प्रभाव", "यात्रा का वर्णन", "खेल-प्रतियोगिता"], 1, "कथा बुद्धि और विवेक को शारीरिक बल से प्रभावी दिखाती है।", "easy"),
  q("sanskrit", "buddhi-balavati", "व्याकरण", "विशेषण-विशेष्य में किसका मेल आवश्यक है?", ["केवल अर्थ", "लिंग, वचन, विभक्ति", "केवल वर्ण", "केवल काल"], 1, "संस्कृत में विशेषण अपने विशेष्य के लिंग, वचन और विभक्ति में चलता है।", "medium"),
  q("sanskrit", "subhashitani", "अध्ययन-विधि", "श्लोक-बोध का समुचित क्रम है:", ["भाव → पदच्छेद → अन्वय", "पदच्छेद → अन्वय → अर्थ → भाव", "केवल स्मरण", "अनुवाद → पदच्छेद → स्मरण"], 1, "पदों को अलग करके वाक्य-क्रम, अर्थ और फिर केंद्रीय भाव निकालना सुव्यवस्थित तरीका है।", "medium"),
  q("sanskrit", "subhashitani", "सूक्ति", "सुभाषित की विशेषता है:", ["दीर्घ कथा", "संक्षिप्त सारगर्भित विचार", "केवल सूची", "केवल प्रश्न"], 1, "सूक्तियाँ कम शब्दों में व्यावहारिक ज्ञान या नैतिक विचार व्यक्त करती हैं।", "easy"),
  q("sanskrit", "sanskrit-grammar", "कारक", "करण कारक की विभक्ति है:", ["प्रथमा", "द्वितीया", "तृतीया", "सप्तमी"], 2, "करण (साधन) के लिए तृतीया विभक्ति का प्रयोग होता है।", "easy"),
  q("sanskrit", "sanskrit-grammar", "वाक्य", "'बालकः पुस्तकं पठति' में 'पुस्तकम्' है:", ["कर्ता", "कर्म", "करण", "अधिकरण"], 1, "जो पढ़ा जा रहा है वह कर्म है, इसलिए द्वितीया विभक्ति है।", "medium"),
  q("computer-science", "digital-literacy", "Devices", "A printer is primarily a(n):", ["Input device", "Output device", "Storage device", "Processor"], 1, "A printer produces a physical copy of processed information.", "easy"),
  q("computer-science", "digital-literacy", "Displays", "Which list contains only display/output technologies?", ["Keyboard, LED, LCD", "LED, LCD, plasma", "Scanner, plasma, mouse", "RAM, LED, plotter"], 1, "LED, LCD and plasma describe display technologies; keyboards and scanners are input devices.", "medium"),
  q("computer-science", "network-internet", "Network types", "A network covering one school building is usually a:", ["PAN", "LAN", "MAN", "WAN"], 1, "A local area network covers a small site such as a home, lab or building.", "easy"),
  q("computer-science", "network-internet", "Web concepts", "A search engine is used to:", ["Render every web page", "Find indexed information", "Replace an internet connection", "Store printer drivers"], 1, "Search engines index web content; browsers render pages.", "medium"),
  q("computer-science", "word-processing", "Mail merge", "Mail merge combines:", ["A printer and scanner", "A main document and data source", "Two operating systems", "A chart and browser"], 1, "It generates personalised copies from a template and structured records.", "medium"),
  q("computer-science", "word-processing", "Formatting", "Which tool repeats formatting from one selection to another?", ["Find and Replace", "Format Painter", "Print Preview", "Mail Merge"], 1, "Format Painter copies formatting without copying the content.", "easy"),
  q("computer-science", "spreadsheets", "Formulas", "Every spreadsheet formula begins with:", ["#", "=", "$", "@"], 1, "The equals sign tells the spreadsheet to calculate an expression.", "easy"),
  q("computer-science", "spreadsheets", "References", "In a copied formula, $A$1 is:", ["A relative reference", "An absolute reference", "A chart title", "A worksheet name"], 1, "The dollar signs keep both column and row fixed when the formula is copied.", "medium"),
];

const seedQuestions: QuizQuestion[] = [...manualQuestions, ...samplePaperQuizQuestions()];

export const quizQuestions: QuizQuestion[] = seedQuestions.map((question, index) => ({
  ...question,
  id: `q-${String(index + 1).padStart(3, "0")}`,
}));

export interface QuizDefinition {
  id: string;
  title: string;
  type: "chapter" | "subject" | "mixed";
  subjectId: string | null;
  chapterId: string | null;
  description: string;
  questions: QuizQuestion[];
}

export function getQuizDefinitions(): QuizDefinition[] {
  const chapterQuizzes = allChapters.map((chapter) => ({
    id: `test-${chapter.id}`,
    title: `${chapter.title}: chapter check`,
    type: "chapter" as const,
    subjectId: chapter.subjectId,
    chapterId: chapter.id,
    description: "Two original questions with answer explanations.",
    questions: quizQuestions.filter((question) => question.chapterId === chapter.id),
  }));

  const subjectQuizzes = subjects.map((subject) => ({
    id: `subject-${subject.id}`,
    title: `${subject.name}: mixed chapter test`,
    type: "subject" as const,
    subjectId: subject.id,
    chapterId: null,
    description: `A short test drawn from the ${subject.name} chapters in this study set.`,
    questions: quizQuestions.filter((question) => question.subjectId === subject.id).slice(0, 8),
  }));

  const mixed = [
    { id: "mixed-foundations", title: "Mixed foundations", topics: ["mathematics", "science", "english"] },
    { id: "mixed-society-language", title: "Society, language & digital skills", topics: ["social-science", "hindi", "sanskrit", "computer-science"] },
    { id: "mixed-full-revision", title: "Full mixed revision", topics: subjects.map((subject) => subject.id) },
  ].map((set) => ({
    id: set.id,
    title: set.title,
    type: "mixed" as const,
    subjectId: null,
    chapterId: null,
    description: "A cross-subject practice test with explained answers.",
    questions: quizQuestions.filter((question) => set.topics.includes(question.subjectId)).filter((_, index) => index % 2 === 0).slice(0, 10),
  }));

  return [...chapterQuizzes, ...subjectQuizzes, ...mixed];
}

export function getQuizDefinition(id: string): QuizDefinition | undefined {
  return getQuizDefinitions().find((quiz) => quiz.id === id);
}
