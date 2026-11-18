import { getChapter } from "./curriculum";
import type { QuizQuestion } from "./types";

type Options = [string, string, string, string];
export type PaperSection = "A" | "B" | "C" | "D";
export type QuestionKind = "MCQ" | "Short answer" | "Long answer" | "Case study";

export interface SampleQuestion {
  id: string;
  section: PaperSection;
  kind: QuestionKind;
  marks: number;
  topic: string;
  prompt: string;
  options?: Options;
  answerIndex?: number;
  answer: string;
  explanation: string;
}

export interface SamplePaper {
  id: string;
  chapterId: string;
  chapterNumber: number;
  chapterTitle: string;
  title: string;
  durationMinutes: number;
  maxMarks: number;
  questionCount: number;
  instructions: string[];
  questions: SampleQuestion[];
  source: string;
  isOfficial: false;
}

let counter = 0;
function make(
  section: PaperSection,
  kind: QuestionKind,
  marks: number,
  topic: string,
  prompt: string,
  answer: string,
  explanation: string,
  options?: Options,
  answerIndex?: number,
): SampleQuestion {
  counter += 1;
  return { id: `sq-${String(counter).padStart(3, "0")}`, section, kind, marks, topic, prompt, answer, explanation, options, answerIndex };
}

function mcq(topic: string, prompt: string, options: Options, answerIndex: number, answer: string, explanation: string): SampleQuestion {
  return make("A", "MCQ", 1, topic, prompt, answer, explanation, options, answerIndex);
}
function short(topic: string, prompt: string, answer: string, explanation: string): SampleQuestion {
  return make("B", "Short answer", 2, topic, prompt, answer, explanation);
}
function long(topic: string, prompt: string, answer: string, explanation: string): SampleQuestion {
  return make("C", "Long answer", 4, topic, prompt, answer, explanation);
}
function caseStudy(topic: string, prompt: string, answer: string, explanation: string): SampleQuestion {
  return make("D", "Case study", 4, topic, prompt, answer, explanation);
}

const instructions = [
  "This is an original Minus Study practice paper, not an official HPBOSE question paper.",
  "Attempt all six questions. Section A has objective questions; Sections B–D need written working.",
  "Use the answer key only after attempting the full paper. Written answers are self-assessed honestly.",
  "Suggested time: 30 minutes. No automatic timer runs in the background.",
];

function paper(chapterId: string, questions: SampleQuestion[]): SamplePaper {
  const chapter = getChapter(chapterId);
  if (!chapter) throw new Error(`Missing Mathematics chapter: ${chapterId}`);
  return {
    id: `paper-${chapterId}`,
    chapterId,
    chapterNumber: chapter.number,
    chapterTitle: chapter.title,
    title: `${chapter.title}: original chapter sample paper`,
    durationMinutes: 30,
    maxMarks: questions.reduce((total, question) => total + question.marks, 0),
    questionCount: questions.length,
    instructions,
    questions,
    source: "Minus Study original practice paper; chapter list referenced from the HPBOSE Class 10 Mathematics syllabus. Not an official paper.",
    isOfficial: false,
  };
}

export const mathSamplePapers: SamplePaper[] = [
  paper("mathematics-real-numbers", [
    mcq("HCF", "The HCF of 84 and 144 is:", ["6", "12", "24", "36"], 1, "12", "84 = 2² × 3 × 7 and 144 = 2⁴ × 3². Common powers give 2² × 3 = 12."),
    mcq("Decimal expansion", "The decimal expansion of 17/8 is:", ["Terminating", "Non-terminating repeating", "Non-terminating non-repeating", "Undefined"], 0, "Terminating", "The reduced denominator is 2³, so it contains only prime factor 2."),
    short("Prime factorisation", "Express 504 as a product of prime powers.", "504 = 2³ × 3² × 7", "Divide repeatedly: 504 = 8 × 63 = 2³ × 3² × 7."),
    short("Irrational numbers", "Give the three main logical steps in a proof that √5 is irrational.", "Assume √5 = p/q in lowest terms; show both p and q are divisible by 5; contradict coprimality.", "Squaring gives p² = 5q², so p is divisible by 5. Writing p = 5k gives q² = 5k², so q is also divisible by 5. This contradicts p/q being in lowest terms."),
    long("HCF and LCM", "Find the HCF and LCM of 96 and 360 by prime factorisation. Verify HCF × LCM equals the product.", "HCF = 24; LCM = 1440; 24 × 1440 = 34560 = 96 × 360.", "96 = 2⁵ × 3 and 360 = 2³ × 3² × 5. HCF takes the smallest common powers: 2³ × 3 = 24. LCM takes the greatest powers: 2⁵ × 3² × 5 = 1440."),
    caseStudy("HCF application", "A teacher has 84 blue cards and 144 red cards. She wants the greatest possible number of identical packs with no cards left over. How many packs can she make, and what is in each pack?", "12 packs; each has 7 blue and 12 red cards.", "The greatest number of identical packs is HCF(84, 144) = 12. Divide each colour total by 12: 84/12 = 7 and 144/12 = 12."),
  ]),
  paper("mathematics-polynomials", [
    mcq("Zeroes", "The zeroes of x² − 7x + 12 are:", ["2 and 6", "3 and 4", "−3 and −4", "1 and 12"], 1, "3 and 4", "(x − 3)(x − 4) = x² − 7x + 12."),
    mcq("Coefficient relation", "For 5x² − 3x + 2, the sum of zeroes is:", ["3/5", "−3/5", "2/5", "−2/5"], 0, "3/5", "Sum = −b/a = −(−3)/5 = 3/5."),
    short("Forming a polynomial", "Form a quadratic whose zeroes are 2 and −5.", "x² + 3x − 10 (or any non-zero multiple)", "Sum = −3 and product = −10, so x² − (sum)x + product = x² + 3x − 10."),
    short("Factor theorem", "Check whether x + 2 is a factor of x³ + 3x² + 4x + 4.", "Yes, because p(−2) = 0.", "p(−2) = −8 + 12 − 8 + 4 = 0; by the factor theorem x + 2 is a factor."),
    long("Zeroes and coefficients", "Find the zeroes of 2x² − 5x − 3 and verify both coefficient relationships.", "Zeroes: 3 and −1/2; sum = 5/2; product = −3/2.", "Factor as (2x + 1)(x − 3). Sum = 3 − 1/2 = 5/2 = −b/a. Product = 3 × (−1/2) = −3/2 = c/a."),
    caseStudy("Area model", "A garden's area is x² + 8x + 15 square metres. Factor the expression, interpret possible dimensions, and find the area when x = 2.", "(x + 3)(x + 5); dimensions 5 m and 7 m when x = 2; area 35 m².", "Factor by finding numbers with sum 8 and product 15. At x = 2: (2 + 3)(2 + 5) = 5 × 7 = 35."),
  ]),
  paper("mathematics-linear-equations", [
    mcq("Consistency", "The pair x + 2y = 5 and 3x + 6y = 15 has:", ["One solution", "No solution", "Infinitely many solutions", "Only (5, 0)"], 2, "Infinitely many solutions", "All coefficient and constant ratios equal 1/3, so both equations describe the same line."),
    mcq("Solving", "The solution of 2x + y = 7 and x − y = 2 is:", ["(3, 1)", "(1, 3)", "(2, 3)", "(3, 2)"], 0, "(3, 1)", "From x − y = 2, y = x − 2. Then 2x + x − 2 = 7 gives x = 3 and y = 1."),
    short("Substitution", "Solve x + y = 9 and 2x − y = 6 by substitution.", "(5, 4)", "y = 9 − x; 2x − (9 − x) = 6 gives 3x = 15, so x = 5 and y = 4."),
    short("Parameter", "Find k for which 3x + 4y = 12 and 9x + ky = 36 have infinitely many solutions.", "k = 12", "For coincident lines, 3/9 = 4/k = 12/36 = 1/3; hence k = 12."),
    long("Word problem", "Five pens and three notebooks cost ₹260; three pens and two notebooks cost ₹160. Find each price.", "Pen = ₹40; notebook = ₹20.", "Let p and n be prices. 5p + 3n = 260 and 3p + 2n = 160. Doubling the first and tripling the second gives 10p + 6n = 520 and 9p + 6n = 480, so p = 40 and n = 20."),
    caseStudy("Taxi fare", "A taxi charges a fixed amount x plus ₹y per km. A 10 km ride costs ₹155 and a 15 km ride costs ₹220. Find x and y, then the cost of 25 km.", "x = ₹25; y = ₹13/km; 25 km costs ₹350.", "x + 10y = 155 and x + 15y = 220; subtract to get 5y = 65, so y = 13 and x = 25. For 25 km: 25 + 25 × 13 = 350."),
  ]),
  paper("mathematics-quadratic-equations", [
    mcq("Roots", "The roots of x² − 5x + 6 = 0 are:", ["1 and 6", "2 and 3", "−2 and −3", "0 and 5"], 1, "2 and 3", "(x − 2)(x − 3) = x² − 5x + 6."),
    mcq("Discriminant", "The equation 2x² − 4x + 3 = 0 has:", ["Two distinct real roots", "Equal real roots", "No real roots", "Exactly one positive root"], 2, "No real roots", "D = (−4)² − 4(2)(3) = 16 − 24 = −8 < 0."),
    short("Equal roots", "Find k for which x² − 6x + k = 0 has equal real roots.", "k = 9", "D = 36 − 4k = 0, so k = 9."),
    short("Factorisation", "Solve x² − 9 = 0 by factorisation.", "x = 3 or x = −3", "(x − 3)(x + 3) = 0; each factor can be zero."),
    long("Area problem", "A rectangular field is 3 m longer than twice its breadth. Its area is 90 m². Find its dimensions.", "Breadth = 6 m; length = 15 m.", "Let breadth be b. b(2b + 3) = 90 gives 2b² + 3b − 90 = 0. D = 729 = 27², so b = (−3 + 27)/4 = 6. Length = 2(6) + 3 = 15."),
    caseStudy("Projectile model", "A ball's height in metres after t seconds is h = 20t − 5t². When is it on the ground, and what is its greatest height?", "t = 0 s and t = 4 s; greatest height = 20 m.", "Set h = 0: 5t(4 − t) = 0. The parabola's vertex is halfway between the roots at t = 2; h(2) = 40 − 20 = 20."),
  ]),
  paper("mathematics-trigonometry", [
    mcq("Standard angles", "sin 30° + cos 60° equals:", ["0", "1/2", "1", "√3/2"], 2, "1", "sin 30° = 1/2 and cos 60° = 1/2."),
    mcq("Identity", "1 + tan² 45° equals:", ["1", "2", "√2", "4"], 1, "2", "tan 45° = 1, so 1 + 1 = 2; equivalently sec² 45° = 2."),
    short("Ratios", "If sin A = 5/13 for an acute angle A, find cos A and tan A.", "cos A = 12/13; tan A = 5/12.", "Use the 5-12-13 right triangle: adjacent = √(13² − 5²) = 12."),
    short("Pythagorean identity", "Use sin²A + cos²A = 1 to find cos A when sin A = 3/5.", "cos A = 4/5", "cos²A = 1 − 9/25 = 16/25; A is acute, so cos A = 4/5."),
    long("Prove identity", "Prove that (1 + tan²A)/(1 + cot²A) = tan²A.", "The expression simplifies to sec²A / cosec²A = sin²A / cos²A = tan²A.", "Use 1 + tan²A = sec²A and 1 + cot²A = cosec²A. Since sec A = 1/cos A and cosec A = 1/sin A, the ratio is sin²A/cos²A."),
    caseStudy("Ladder", "A 10 m ladder makes a 60° angle with the ground. Find the height reached on the wall and the foot's distance from the wall.", "Height = 5√3 m ≈ 8.66 m; distance = 5 m.", "Height = 10 sin 60° = 10(√3/2) = 5√3. Base = 10 cos 60° = 10(1/2) = 5."),
  ]),
  paper("mathematics-arithmetic-progressions", [
    mcq("nth term", "The 10th term of 3, 7, 11, … is:", ["36", "39", "43", "47"], 1, "39", "a = 3, d = 4, so a₁₀ = 3 + 9 × 4 = 39."),
    mcq("Sum", "The sum of the first 20 natural numbers is:", ["190", "200", "210", "220"], 2, "210", "S₂₀ = 20 × 21 / 2 = 210."),
    short("Negative difference", "Find the 15th term of 8, 5, 2, …", "−34", "a = 8, d = −3, so a₁₅ = 8 + 14(−3) = −34."),
    short("Term position", "Which term of 4, 9, 14, … is 99?", "20th term", "4 + (n − 1)5 = 99 gives n − 1 = 19, so n = 20."),
    long("Sum of AP", "Find the sum of the first 25 terms of 7, 11, 15, …", "1375", "a = 7, d = 4 and a₂₅ = 7 + 24 × 4 = 103. S₂₅ = 25/2 (7 + 103) = 25 × 55 = 1375."),
    caseStudy("Theatre seats", "A theatre has 20 seats in row 1, 24 in row 2, 28 in row 3 and so on. Find the number of seats in row 12 and the total seats in the first 12 rows.", "Row 12 = 64 seats; total = 504 seats.", "a = 20, d = 4. a₁₂ = 20 + 11 × 4 = 64. S₁₂ = 12/2 (20 + 64) = 6 × 84 = 504."),
  ]),
  paper("mathematics-triangles", [
    mcq("Similarity", "Two triangles are certainly similar when:", ["Two sides are equal", "Corresponding angles are equal", "Their perimeters are equal", "One side is common"], 1, "Corresponding angles are equal", "Equal corresponding angles (AAA) determine the same shape; side lengths may be scaled."),
    mcq("Proportionality", "In triangle ABC, DE ∥ BC, AD/DB = 2/3 and AE = 4 cm. EC is:", ["4 cm", "5 cm", "6 cm", "8 cm"], 2, "6 cm", "By BPT, AD/DB = AE/EC, so 2/3 = 4/EC and EC = 6."),
    short("Area ratio", "The areas of two similar triangles are in ratio 9:25. Find the ratio of corresponding sides.", "3:5", "Area ratio is the square of side ratio; √9 : √25 = 3 : 5."),
    short("Pythagoras", "A right triangle has perpendicular sides 6 cm and 8 cm. Find its hypotenuse.", "10 cm", "c² = 6² + 8² = 100, so c = 10."),
    long("Shadow problem", "A 5 m pole casts a 3 m shadow. At the same time a tree casts a 12 m shadow. Find the tree's height and justify the method.", "20 m", "The same sun angle and right angles give similar triangles, so height/shadow is constant: 5/3 = h/12, hence h = 20."),
    caseStudy("Map scale", "On a 1:50,000 map, two places are 6 cm apart and a triangular park has sides 3 cm, 4 cm and 5 cm. Find the real distance between the places and the park's real perimeter.", "Distance = 3 km; perimeter = 6 km.", "1 cm represents 50,000 cm = 0.5 km. So 6 cm = 3 km. The park's map perimeter is 12 cm, representing 6 km."),
  ]),
  paper("mathematics-coordinate-geometry", [
    mcq("Distance", "The distance between (0, 0) and (3, 4) is:", ["4", "5", "7", "12"], 1, "5", "√(3² + 4²) = √25 = 5."),
    mcq("Midpoint", "The midpoint of (2, −3) and (8, 5) is:", ["(5, 1)", "(4, 1)", "(5, 4)", "(10, 2)"], 0, "(5, 1)", "Average coordinates: ((2+8)/2, (−3+5)/2) = (5, 1)."),
    short("Section formula", "Find the point dividing (1, 2) and (7, 8) internally in ratio 1:2.", "(3, 4)", "x = (1×7 + 2×1)/3 = 3; y = (1×8 + 2×2)/3 = 4."),
    short("Collinearity", "Check whether (1, 2), (3, 4) and (5, 6) are collinear.", "Yes, all consecutive slopes are 1.", "(4−2)/(3−1) = 1 and (6−4)/(5−3) = 1, so the points lie on one line."),
    long("Triangle area", "Find the area of the triangle with vertices (1, 1), (4, 5) and (7, 2).", "10.5 square units", "Area = ½|1(5−2) + 4(2−1) + 7(1−5)| = ½|3 + 4 − 28| = 10.5."),
    caseStudy("Campus map", "A school is at (2, 3) and a library at (8, 11). A student stops exactly halfway. Find the stopping point and the straight-line distance between the two places.", "Midpoint (5, 7); distance 10 units.", "Midpoint = ((2+8)/2, (3+11)/2) = (5, 7). Distance = √((8−2)² + (11−3)²) = √(36+64) = 10."),
  ]),
  paper("mathematics-applications-of-trigonometry", [
    mcq("Elevation", "At 45° elevation, an object 20 m away has height:", ["10 m", "20 m", "20√3 m", "40 m"], 1, "20 m", "tan 45° = h/20 = 1, so h = 20."),
    mcq("Shadow", "A pole's height equals its shadow's length. The sun's elevation is:", ["30°", "45°", "60°", "90°"], 1, "45°", "tan θ = height/shadow = 1, so θ = 45°."),
    short("Ladder", "A 13 m ladder reaches 12 m up a wall. Find the foot's distance from the wall.", "5 m", "By Pythagoras, d = √(13² − 12²) = √25 = 5."),
    short("Height", "From a point 30 m away, the angle of elevation to a tower's top is 30°. Find the height.", "10√3 m ≈ 17.32 m", "tan 30° = h/30 = 1/√3, so h = 30/√3 = 10√3."),
    long("Two ships", "From a 100 m lighthouse, two ships on opposite sides have angles of depression 30° and 45°. Find the distance between the ships.", "100(√3 + 1) m ≈ 273.2 m.", "Horizontal distances are 100/tan30° = 100√3 and 100/tan45° = 100. Opposite sides mean the distances add."),
    caseStudy("Drone observation", "A drone is 60 m above level ground. Its angle of elevation changes from 30° to 60° as an observer walks directly towards it. How far does the observer walk?", "40√3 m ≈ 69.3 m.", "Initial distance = 60/tan30° = 60√3; final distance = 60/tan60° = 20√3. Difference = 40√3."),
  ]),
  paper("mathematics-circles", [
    mcq("Tangent theorem", "At the point of contact, a tangent is:", ["Parallel to the radius", "Equal to the radius", "Perpendicular to the radius", "Twice the radius"], 2, "Perpendicular to the radius", "The shortest distance from the centre to the tangent is the radius, which meets it at 90°."),
    mcq("Tangent count", "From a point outside a circle, the number of tangents is:", ["0", "1", "2", "4"], 2, "2", "One tangent touches each side of the circle from the external point."),
    short("Equal tangents", "Two tangents from P measure 7 cm and x + 2 cm. Find x.", "x = 5", "Tangents from the same external point are equal: x + 2 = 7."),
    short("Tangent length", "A circle has radius 5 cm and an external point P is 13 cm from its centre. Find the tangent length.", "12 cm", "PT² = OP² − r² = 169 − 25 = 144, so PT = 12."),
    long("Proof", "Prove that two tangents drawn from an external point to a circle are equal.", "PA = PB by RHS congruence of triangles OAP and OBP.", "Join centre O to P and to contact points A and B. OA = OB (radii), ∠OAP = ∠OBP = 90°, and OP is common. Right triangles OAP and OBP are congruent, so PA = PB."),
    caseStudy("Circular park", "A circular park has radius 14 m. Rajni walks around its boundary twice. Using π = 22/7, find the distance covered and explain why the tangent-radius fact matters for a straight path touching the boundary.", "176 m; a tangent path would be perpendicular to the radius at its single contact point.", "One circumference = 2πr = 2 × 22/7 × 14 = 88 m. Twice around = 176 m. A straight tangent touches once and forms a right angle with the radius."),
  ]),
  paper("mathematics-areas-related-to-circles", [
    mcq("Sector area", "The area of a 60° sector of radius 6 cm is:", ["3π cm²", "6π cm²", "12π cm²", "36π cm²"], 1, "6π cm²", "(60/360) × π × 6² = 6π."),
    mcq("Quadrant", "A circle has circumference 22 cm. Its quadrant's area is:", ["77/8 cm²", "77/4 cm²", "77/2 cm²", "154 cm²"], 0, "77/8 cm²", "2πr = 22 gives r = 3.5 cm with π = 22/7. Quadrant area = πr²/4 = 77/8."),
    short("Circle area", "Find the area of a circle with radius 7 cm using π = 22/7.", "154 cm²", "πr² = 22/7 × 49 = 154."),
    short("Arc length", "Find the length of a 90° arc in a circle of radius 14 cm using π = 22/7.", "22 cm", "Arc = (90/360) × 2πr = ¼ × 2 × 22/7 × 14 = 22."),
    long("Sector perimeter", "A sector has radius 21 cm and central angle 120°. Find its area and perimeter using π = 22/7.", "Area = 462 cm²; perimeter = 86 cm.", "Area = (120/360)πr² = (1/3)(22/7)(441) = 462. Arc = (120/360)2πr = 44. Perimeter = arc + 2r = 44 + 42 = 86."),
    caseStudy("Table border", "A circular table has radius 1.4 m and a uniform 20 cm border. Find the border's area using π = 3.14.", "1.6328 m²", "Inner radius = 1.2 m. Border = π(1.4² − 1.2²) = 3.14(1.96 − 1.44) = 3.14 × 0.52."),
  ]),
  paper("mathematics-surface-areas-volumes", [
    mcq("Cylinder volume", "The volume of a cylinder with radius 7 cm and height 10 cm is, using π = 22/7:", ["490 cm³", "700 cm³", "1540 cm³", "3080 cm³"], 2, "1540 cm³", "πr²h = 22/7 × 49 × 10 = 1540."),
    mcq("Cube surface", "The total surface area of a cube of side 4 cm is:", ["16 cm²", "64 cm²", "96 cm²", "144 cm²"], 2, "96 cm²", "6a² = 6 × 16 = 96."),
    short("Cone CSA", "Find the curved surface area of a cone with r = 7 cm and slant height l = 10 cm, using π = 22/7.", "220 cm²", "πrl = 22/7 × 7 × 10 = 220."),
    short("Sphere volume", "Find the volume of a sphere of radius 3 cm in terms of π.", "36π cm³", "Volume = 4/3 πr³ = 4/3 × 27π = 36π."),
    long("Joined solids", "A cylinder of radius 7 cm and height 10 cm is joined at one base to a cone of the same radius and slant height 12 cm. Find the exposed total surface area using π = 22/7.", "858 cm²", "Exposed surfaces: cylinder CSA 2πrh = 440, cone CSA πrl = 264, and one circular base πr² = 154. The joined face is hidden. Total = 440 + 264 + 154 = 858."),
    caseStudy("Capsule", "A capsule consists of a cylinder of length 10 mm and radius 2.5 mm with a hemisphere at each end. Find its volume, leaving π in the answer.", "250π/3 mm³ ≈ 261.8 mm³", "Cylinder = πr²h = 62.5π. Two hemispheres equal one sphere: 4/3πr³ = 4/3π(15.625) = 125π/6. Total = 375π/6 + 125π/6 = 500π/6 = 250π/3."),
  ]),
  paper("mathematics-statistics", [
    mcq("Mean", "The mean of 4, 8, 12 and 16 is:", ["8", "10", "12", "14"], 1, "10", "Sum = 40; mean = 40/4 = 10."),
    mcq("Median", "The median of 3, 5, 7, 9 and 11 is:", ["5", "7", "8", "9"], 1, "7", "With five sorted values, the third value is the median."),
    short("Mode", "Find the mode of 2, 3, 3, 5, 7, 3, 8.", "3", "The value 3 occurs three times, more than any other value."),
    short("Missing value", "The mean of five numbers is 18. Four are 14, 16, 20 and 22. Find the fifth.", "18", "Total = 5 × 18 = 90; known sum = 72; missing value = 18."),
    long("Grouped mean", "For classes 0–10, 10–20 and 20–30 with frequencies 5, 8 and 7, find the mean by the direct method.", "16", "Class marks are 5, 15, 25. Σfx = 25 + 120 + 175 = 320 and Σf = 20, so mean = 320/20 = 16."),
    caseStudy("Marks analysis", "Ten students score 42, 55, 61, 68, 72, 75, 80, 84, 88, 95. Find the mean, median and range.", "Mean = 72; median = 73.5; range = 53.", "Sum = 720, so mean = 72. With 10 values, median = (5th + 6th)/2 = (72 + 75)/2 = 73.5. Range = 95 − 42 = 53."),
  ]),
  paper("mathematics-probability", [
    mcq("Coin", "The probability of a head on one fair coin toss is:", ["0", "1/4", "1/2", "1"], 2, "1/2", "Two equally likely outcomes; one is favourable."),
    mcq("Bag", "A bag has 5 red, 3 blue and 2 green balls. P(red) is:", ["1/5", "3/10", "1/2", "2/3"], 2, "1/2", "5 favourable out of 10 total = 1/2."),
    short("Two dice", "Two fair dice are rolled. Find the probability that the total is 7.", "1/6", "Six ordered pairs give 7 out of 36 outcomes: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1)."),
    short("Cards", "Find the probability of drawing an ace from a well-shuffled 52-card deck.", "1/13", "4 aces out of 52 cards: 4/52 = 1/13."),
    long("Without replacement", "A bag has 4 red, 5 blue and 6 green balls. Two balls are drawn without replacement. Find the probability that both are blue.", "2/21", "P(first blue) = 5/15 and P(second blue | first blue) = 4/14. Product = 20/210 = 2/21."),
    caseStudy("Spinner", "An eight-sector spinner has 3 blue, 2 red and 3 green equal sectors. Find P(not blue) and the expected number of blue results in 40 spins.", "P(not blue) = 5/8; expected blue = 15.", "Five of eight sectors are not blue. P(blue) = 3/8, so expected blue outcomes = 40 × 3/8 = 15."),
  ]),
];

export function getMathSamplePaper(chapterId: string): SamplePaper | undefined {
  return mathSamplePapers.find((item) => item.chapterId === chapterId);
}

export function samplePaperQuizQuestions(): QuizQuestion[] {
  return mathSamplePapers.flatMap((item) =>
    item.questions
      .filter((question) => question.kind === "MCQ" && question.options && question.answerIndex !== undefined)
      .map((question) => ({
        id: "",
        subjectId: "mathematics",
        chapterId: item.chapterId,
        topic: question.topic,
        prompt: question.prompt,
        options: question.options as Options,
        answerIndex: question.answerIndex as number,
        explanation: question.explanation,
        difficulty: "medium" as const,
      })),
  );
}

export const samplePaperSections: { id: PaperSection; label: string; description: string }[] = [
  { id: "A", label: "Section A · Objective", description: "1 mark each" },
  { id: "B", label: "Section B · Short answers", description: "2 marks each" },
  { id: "C", label: "Section C · Long answer", description: "4 marks" },
  { id: "D", label: "Section D · Case study", description: "4 marks" },
];
