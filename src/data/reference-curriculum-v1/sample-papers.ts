import type { SubjectSlug } from "./types";

export interface SamplePaperQuestion {
  id: string;
  number: number;
  marks: number;
  chapterRef: string;
  question: string;
  options?: [string, string, string, string];
  correctOptionIndex?: 0 | 1 | 2 | 3;
  solutionSteps: string[];
  finalAnswer: string;
}

export interface SamplePaperSection {
  id: string;
  name: string;
  instructions: string;
  marksSummary: string;
  questions: SamplePaperQuestion[];
}

export interface SamplePaperData {
  id: string;
  title: string;
  subtitle: string;
  subjectSlug: SubjectSlug;
  subjectName: string;
  boardTag: string;
  totalMarks: number;
  durationMinutes: number;
  difficulty: "Standard" | "Board Core" | "Challenge";
  generalInstructions: string[];
  sections: SamplePaperSection[];
}

export const SAMPLE_PAPERS: SamplePaperData[] = [
  {
    id: "hpbose-math-set-1",
    title: "Class 10 Mathematics — HPBOSE Board Sample Paper 1",
    subtitle:
      "Complete 14-chapter blueprint (Real Numbers to Probability) with MCQs, 2-mark, 3-mark, and 5-mark board questions + step-by-step marking scheme.",
    subjectSlug: "mathematics",
    subjectName: "Mathematics",
    boardTag: "HPBOSE 2026–27 Pattern",
    totalMarks: 80,
    durationMinutes: 180,
    difficulty: "Board Core",
    generalInstructions: [
      "All questions are compulsory. Show clear step-by-step working for full step marks.",
      "Section A has 16 objective MCQs (1 mark each = 16 marks).",
      "Section B has 8 Very Short Answer questions (2 marks each = 16 marks).",
      "Section C has 6 Short Answer questions (3 marks each = 18 marks).",
      "Section D has 6 Long Answer / Case-Study questions (5 marks each = 30 marks).",
      "Use π = 22/7 wherever required unless stated otherwise.",
    ],
    sections: [
      {
        id: "m1-sec-a",
        name: "Section A — Multiple Choice Questions (1 Mark Each)",
        instructions:
          "Select the single best option. Click any option to check immediately.",
        marksSummary: "16 × 1 = 16 Marks",
        questions: [
          {
            id: "m1-q1",
            number: 1,
            marks: 1,
            chapterRef: "Ch. 1 Real Numbers",
            question: "The prime factorisation of 156 is:",
            options: ["2 × 3² × 13", "2² × 3 × 13", "2³ × 3 × 13", "2² × 3² × 13"],
            correctOptionIndex: 1,
            solutionSteps: ["156 = 2 × 78 = 2 × 2 × 39 = 2² × 3 × 13."],
            finalAnswer: "2² × 3 × 13",
          },
          {
            id: "m1-q2",
            number: 2,
            marks: 1,
            chapterRef: "Ch. 2 Polynomials",
            question:
              "A quadratic polynomial whose zeroes are −3 and 4 is:",
            options: [
              "x² − x − 12",
              "x² + x + 12",
              "x² − x + 12",
              "2x² + 2x − 24",
            ],
            correctOptionIndex: 0,
            solutionSteps: [
              "Sum S = −3 + 4 = 1; Product P = (−3)(4) = −12.",
              "Polynomial = x² − Sx + P = x² − x − 12.",
            ],
            finalAnswer: "x² − x − 12",
          },
          {
            id: "m1-q3",
            number: 3,
            marks: 1,
            chapterRef: "Ch. 3 Linear Equations",
            question:
              "The pair of equations 3x + 2y = 5 and 2x − 3y = 7 is:",
            options: [
              "Consistent with unique solution",
              "Consistent with infinitely many solutions",
              "Inconsistent (parallel lines)",
              "Dependent",
            ],
            correctOptionIndex: 0,
            solutionSteps: [
              "a₁/a₂ = 3/2 and b₁/b₂ = 2/(−3) = −2/3.",
              "Since a₁/a₂ ≠ b₁/b₂, lines intersect at a unique point (consistent).",
            ],
            finalAnswer: "Consistent with unique solution",
          },
          {
            id: "m1-q4",
            number: 4,
            marks: 1,
            chapterRef: "Ch. 4 Quadratic Equations",
            question:
              "If x² + 4x + k = 0 has real and equal roots, then the value of k is:",
            options: ["2", "4", "8", "16"],
            correctOptionIndex: 1,
            solutionSteps: [
              "For equal roots, D = b² − 4ac = 0.",
              "4² − 4(1)(k) = 0 ⇒ 16 − 4k = 0 ⇒ k = 4.",
            ],
            finalAnswer: "k = 4",
          },
          {
            id: "m1-q5",
            number: 5,
            marks: 1,
            chapterRef: "Ch. 5 Arithmetic Progressions",
            question: "The 11th term of the AP: −3, −1/2, 2, ... is:",
            options: ["28", "22", "−38", "−48.5"],
            correctOptionIndex: 1,
            solutionSteps: [
              "a = −3, d = −1/2 − (−3) = 5/2.",
              "a₁₁ = a + 10d = −3 + 10(5/2) = −3 + 25 = 22.",
            ],
            finalAnswer: "22",
          },
          {
            id: "m1-q6",
            number: 6,
            marks: 1,
            chapterRef: "Ch. 6 Triangles",
            question:
              "In △ABC, DE ∥ BC. If AD = 4 cm, DB = 6 cm, and AE = 6 cm, then EC equals:",
            options: ["4 cm", "8 cm", "9 cm", "12 cm"],
            correctOptionIndex: 2,
            solutionSteps: ["By BPT: AD/DB = AE/EC ⇒ 4/6 = 6/EC ⇒ EC = 36/4 = 9 cm."],
            finalAnswer: "9 cm",
          },
          {
            id: "m1-q7",
            number: 7,
            marks: 1,
            chapterRef: "Ch. 7 Coordinate Geometry",
            question:
              "The distance between points A(0, 6) and B(0, −2) is:",
            options: ["6", "8", "4", "2"],
            correctOptionIndex: 1,
            solutionSteps: ["AB = √[(0 − 0)² + (−2 − 6)²] = √64 = 8 units."],
            finalAnswer: "8",
          },
          {
            id: "m1-q8",
            number: 8,
            marks: 1,
            chapterRef: "Ch. 8 Trigonometry",
            question: "The value of (2 tan 30°) / (1 + tan² 30°) equals:",
            options: ["sin 60°", "cos 60°", "tan 60°", "sin 30°"],
            correctOptionIndex: 0,
            solutionSteps: [
              "tan 30° = 1/√3.",
              "Numerator = 2/√3; Denominator = 1 + 1/3 = 4/3.",
              "(2/√3) ÷ (4/3) = (2/√3) × (3/4) = √3/2 = sin 60°.",
            ],
            finalAnswer: "sin 60°",
          },
          {
            id: "m1-q9",
            number: 9,
            marks: 1,
            chapterRef: "Ch. 9 Applications of Trigonometry",
            question:
              "If a 6 m tall pole casts a shadow of 2√3 m on the ground, the sun's angle of elevation is:",
            options: ["30°", "45°", "60°", "90°"],
            correctOptionIndex: 2,
            solutionSteps: [
              "tan θ = 6 / (2√3) = 3 / √3 = √3 ⇒ θ = 60°.",
            ],
            finalAnswer: "60°",
          },
          {
            id: "m1-q10",
            number: 10,
            marks: 1,
            chapterRef: "Ch. 10 Circles",
            question:
              "The maximum number of parallel tangents a circle can have is:",
            options: ["1", "2", "4", "Infinitely many"],
            correctOptionIndex: 1,
            solutionSteps: [
              "Exactly two parallel tangents can be drawn at the two opposite endpoints of a diameter.",
            ],
            finalAnswer: "2",
          },
          {
            id: "m1-q11",
            number: 11,
            marks: 1,
            chapterRef: "Ch. 11 Areas Related to Circles",
            question:
              "If the perimeter and area of a circle are numerically equal, then its radius is:",
            options: ["2 units", "π units", "4 units", "7 units"],
            correctOptionIndex: 0,
            solutionSteps: ["2πr = πr² ⇒ dividing by πr (r > 0) gives r = 2 units."],
            finalAnswer: "2 units",
          },
          {
            id: "m1-q12",
            number: 12,
            marks: 1,
            chapterRef: "Ch. 12 Surface Areas & Volumes",
            question:
              "The total surface area of a solid hemisphere of radius r is:",
            options: ["2πr²", "3πr²", "4πr²", "(2/3)πr³"],
            correctOptionIndex: 1,
            solutionSteps: [
              "TSA of solid hemisphere = CSA (2πr²) + flat circular base (πr²) = 3πr².",
            ],
            finalAnswer: "3πr²",
          },
          {
            id: "m1-q13",
            number: 13,
            marks: 1,
            chapterRef: "Ch. 13 Statistics",
            question:
              "In the empirical relationship between Mean, Median, and Mode:",
            options: [
              "Mode = 3 Median − 2 Mean",
              "Mode = 2 Median − 3 Mean",
              "Median = 3 Mode − 2 Mean",
              "Mean = 3 Median − 2 Mode",
            ],
            correctOptionIndex: 0,
            solutionSteps: ["Standard relation: 3 Median = Mode + 2 Mean ⇒ Mode = 3 Median − 2 Mean."],
            finalAnswer: "Mode = 3 Median − 2 Mean",
          },
          {
            id: "m1-q14",
            number: 14,
            marks: 1,
            chapterRef: "Ch. 14 Probability",
            question:
              "A die is thrown once. What is the probability of getting an even prime number?",
            options: ["1/2", "1/3", "1/6", "2/3"],
            correctOptionIndex: 2,
            solutionSteps: [
              "The ONLY even prime number on a die is {2} (1 outcome out of 6). P = 1/6.",
            ],
            finalAnswer: "1/6",
          },
          {
            id: "m1-q15",
            number: 15,
            marks: 1,
            chapterRef: "Ch. 7 Coordinate Geometry",
            question:
              "The midpoint of the line segment joining (3, −4) and (−3, 4) is:",
            options: ["(3, 4)", "(0, 0)", "(6, −8)", "(0, 4)"],
            correctOptionIndex: 1,
            solutionSteps: ["Midpoint = ((3 − 3)/2, (−4 + 4)/2) = (0, 0)."],
            finalAnswer: "(0, 0)",
          },
          {
            id: "m1-q16",
            number: 16,
            marks: 1,
            chapterRef: "Ch. 14 Probability",
            question:
              "If P(E) = 0.37, then P(not E) equals:",
            options: ["0.37", "0.63", "0.73", "1.37"],
            correctOptionIndex: 1,
            solutionSteps: ["P(not E) = 1 − 0.37 = 0.63."],
            finalAnswer: "0.63",
          },
        ],
      },
      {
        id: "m1-sec-b",
        name: "Section B — Very Short Answer Questions (2 Marks Each)",
        instructions: "Write concise steps and clearly highlight the final answer.",
        marksSummary: "8 × 2 = 16 Marks",
        questions: [
          {
            id: "m1-q17",
            number: 17,
            marks: 2,
            chapterRef: "Ch. 1 Real Numbers",
            question:
              "Find the HCF and LCM of 12, 15, and 21 by the prime factorisation method.",
            solutionSteps: [
              "12 = 2² × 3;  15 = 3 × 5;  21 = 3 × 7.",
              "Common prime factor with smallest power: HCF = 3.",
              "LCM = 2² × 3 × 5 × 7 = 4 × 105 = 420.",
            ],
            finalAnswer: "HCF = 3, LCM = 420",
          },
          {
            id: "m1-q18",
            number: 18,
            marks: 2,
            chapterRef: "Ch. 2 Polynomials",
            question:
              "Find the zeroes of the quadratic polynomial t² − 15 and verify their sum and product.",
            solutionSteps: [
              "t² − 15 = (t − √15)(t + √15) = 0 ⇒ t = √15, −√15.",
              "Sum = √15 + (−√15) = 0 = −0/1 = −b/a.",
              "Product = (√15)(−√15) = −15 = −15/1 = c/a.",
            ],
            finalAnswer: "Zeroes are √15 and −√15",
          },
          {
            id: "m1-q19",
            number: 19,
            marks: 2,
            chapterRef: "Ch. 5 Arithmetic Progressions",
            question: "Which term of the AP: 3, 8, 13, 18, ... is 78?",
            solutionSteps: [
              "a = 3, d = 8 − 3 = 5, aₙ = 78.",
              "78 = 3 + (n − 1)5 ⇒ 75 = 5(n − 1) ⇒ n − 1 = 15 ⇒ n = 16.",
            ],
            finalAnswer: "16th term",
          },
          {
            id: "m1-q20",
            number: 20,
            marks: 2,
            chapterRef: "Ch. 7 Coordinate Geometry",
            question:
              "Find the value of y for which the distance between P(2, −3) and Q(10, y) is 10 units.",
            solutionSteps: [
              "PQ² = (10 − 2)² + (y − (−3))² = 10².",
              "64 + (y + 3)² = 100 ⇒ (y + 3)² = 36.",
              "y + 3 = ±6 ⇒ y = 3 or y = −9.",
            ],
            finalAnswer: "y = 3 or y = −9",
          },
          {
            id: "m1-q21",
            number: 21,
            marks: 2,
            chapterRef: "Ch. 8 Trigonometry",
            question:
              "If tan(A + B) = √3 and tan(A − B) = 1/√3 (0° < A + B ≤ 90°, A > B), find A and B.",
            solutionSteps: [
              "A + B = 60° and A − B = 30°.",
              "Adding: 2A = 90° ⇒ A = 45°; B = 60° − 45° = 15°.",
            ],
            finalAnswer: "A = 45°, B = 15°",
          },
          {
            id: "m1-q22",
            number: 22,
            marks: 2,
            chapterRef: "Ch. 10 Circles",
            question:
              "A tangent PQ at a point P of a circle of radius 5 cm meets a line through centre O at a point Q so that OQ = 12 cm. Find the length PQ.",
            solutionSteps: [
              "By Theorem 10.1, OP ⊥ PQ ⇒ ∠OPQ = 90°.",
              "In right △OPQ: PQ = √(OQ² − OP²) = √(12² − 5²) = √(144 − 25) = √119 cm.",
            ],
            finalAnswer: "PQ = √119 cm",
          },
          {
            id: "m1-q23",
            number: 23,
            marks: 2,
            chapterRef: "Ch. 11 Areas Related to Circles",
            question:
              "Find the area of a sector of a circle with radius 6 cm if the angle of the sector is 60°.",
            solutionSteps: [
              "Area = (θ/360°) × πr² = (60/360) × (22/7) × 6 × 6 = (1/6) × (22/7) × 36 = 132/7 cm².",
            ],
            finalAnswer: "132/7 cm² (≈ 18.86 cm²)",
          },
          {
            id: "m1-q24",
            number: 24,
            marks: 2,
            chapterRef: "Ch. 14 Probability",
            question:
              "A bag contains 3 red balls and 5 black balls. A ball is drawn at random. Find the probability that the ball drawn is (i) red, (ii) not red.",
            solutionSteps: [
              "Total balls = 3 + 5 = 8.",
              "(i) P(red) = 3/8.",
              "(ii) P(not red) = 1 − 3/8 = 5/8.",
            ],
            finalAnswer: "(i) 3/8, (ii) 5/8",
          },
        ],
      },
      {
        id: "m1-sec-c",
        name: "Section C — Short Answer Questions (3 Marks Each)",
        instructions: "Show complete algebraic steps, theorems used, and units.",
        marksSummary: "6 × 3 = 18 Marks",
        questions: [
          {
            id: "m1-q25",
            number: 25,
            marks: 3,
            chapterRef: "Ch. 1 Real Numbers",
            question: "Prove that √5 is an irrational number.",
            solutionSteps: [
              "Assume √5 is rational ⇒ √5 = a/b where a, b are co-prime integers and b ≠ 0.",
              "Squaring both sides: 5b² = a² ⇒ 5 divides a² ⇒ 5 divides a. Let a = 5c.",
              "Substitute: 5b² = 25c² ⇒ b² = 5c² ⇒ 5 divides b.",
              "Thus a and b have common factor 5, contradicting co-prime assumption.",
            ],
            finalAnswer: "Hence √5 is irrational.",
          },
          {
            id: "m1-q26",
            number: 26,
            marks: 3,
            chapterRef: "Ch. 3 Linear Equations",
            question:
              "Five years hence, the age of Jacob will be three times that of his son. Five years ago, Jacob's age was seven times that of his son. What are their present ages?",
            solutionSteps: [
              "Let present ages be x (Jacob) and y (son).",
              "Condition 1: x + 5 = 3(y + 5) ⇒ x − 3y = 10.",
              "Condition 2: x − 5 = 7(y − 5) ⇒ x − 7y = −30.",
              "Subtracting equations: 4y = 40 ⇒ y = 10; x = 10 + 3(10) = 40.",
            ],
            finalAnswer: "Jacob = 40 years, Son = 10 years",
          },
          {
            id: "m1-q27",
            number: 27,
            marks: 3,
            chapterRef: "Ch. 6 Triangles",
            question:
              "Diagonals of a trapezium ABCD with AB ∥ DC intersect each other at point O. Using similarity criteria for two triangles, show that OA / OC = OB / OD.",
            solutionSteps: [
              "In △AOB and △COD: ∠OAB = ∠OCD (alternate interior angles, AB ∥ DC) and ∠OBA = ∠ODC (alternate interior angles).",
              "By AA similarity criterion, △AOB ~ △COD.",
              "Corresponding sides of similar triangles are proportional ⇒ OA / OC = OB / OD.",
            ],
            finalAnswer: "Hence proved: OA / OC = OB / OD.",
          },
          {
            id: "m1-q28",
            number: 28,
            marks: 3,
            chapterRef: "Ch. 8 Trigonometry",
            question:
              "Prove that: (sin A + cosec A)² + (cos A + sec A)² = 7 + tan² A + cot² A.",
            solutionSteps: [
              "Expand LHS: (sin²A + cosec²A + 2 sin A cosec A) + (cos²A + sec²A + 2 cos A sec A).",
              "Use sin A·cosec A = 1, cos A·sec A = 1, and sin²A + cos²A = 1 ⇒ 1 + 2 + 2 + cosec²A + sec²A = 5 + cosec²A + sec²A.",
              "Substitute cosec²A = 1 + cot²A and sec²A = 1 + tan²A ⇒ 5 + (1 + cot²A) + (1 + tan²A) = 7 + tan²A + cot²A = RHS.",
            ],
            finalAnswer: "LHS = RHS (Proved)",
          },
          {
            id: "m1-q29",
            number: 29,
            marks: 3,
            chapterRef: "Ch. 10 Circles",
            question:
              "Prove that the parallelogram circumscribing a circle is a rhombus.",
            solutionSteps: [
              "Let parallelogram ABCD circumscribe a circle touching sides at P, Q, R, S.",
              "By equal tangents property: AB + CD = AD + BC.",
              "Since opposite sides of a parallelogram are equal (AB = CD and AD = BC): 2AB = 2BC ⇒ AB = BC.",
              "Therefore AB = BC = CD = DA, so ABCD is a rhombus.",
            ],
            finalAnswer: "Hence proved: ABCD is a rhombus.",
          },
          {
            id: "m1-q30",
            number: 30,
            marks: 3,
            chapterRef: "Ch. 14 Probability",
            question:
              "Two dice, one blue and one grey, are thrown at the same time. Find the probability that the sum of the two numbers appearing on top is (i) 8, (ii) less than or equal to 12, (iii) a doublet.",
            solutionSteps: [
              "Total outcomes = 6 × 6 = 36.",
              "(i) Sum 8: {(2,6),(3,5),(4,4),(5,3),(6,2)} → 5/36.",
              "(ii) Every outcome has sum ≤ 12 (sure event) → 36/36 = 1.",
              "(iii) Doublets: {(1,1),(2,2),(3,3),(4,4),(5,5),(6,6)} → 6/36 = 1/6.",
            ],
            finalAnswer: "(i) 5/36, (ii) 1, (iii) 1/6",
          },
        ],
      },
      {
        id: "m1-sec-d",
        name: "Section D — Long Answer & Application Questions (5 Marks Each)",
        instructions:
          "Include labelled diagrams (where applicable), formula statements, and neat final units.",
        marksSummary: "6 × 5 = 30 Marks",
        questions: [
          {
            id: "m1-q31",
            number: 31,
            marks: 5,
            chapterRef: "Ch. 4 Quadratic Equations",
            question:
              "An express train takes 1 hour less than a passenger train to travel 132 km between two stations. If the average speed of the express train is 11 km/h more than that of the passenger train, find the average speed of the two trains.",
            solutionSteps: [
              "Let speed of passenger train = x km/h ⇒ express train speed = (x + 11) km/h.",
              "Time difference: 132/x − 132/(x + 11) = 1.",
              "132(x + 11 − x) = x(x + 11) ⇒ x² + 11x − 1452 = 0.",
              "Factorise: (x + 44)(x − 33) = 0 ⇒ x = 33 (rejecting −44).",
              "Express train speed = 33 + 11 = 44 km/h.",
            ],
            finalAnswer: "Passenger train = 33 km/h, Express train = 44 km/h",
          },
          {
            id: "m1-q32",
            number: 32,
            marks: 5,
            chapterRef: "Ch. 6 Triangles",
            question:
              "State and prove the Basic Proportionality Theorem (Thales Theorem). Using it, if in △ABC, DE ∥ BC with AD = 3 cm, DB = 4.5 cm and AE = 2.4 cm, find AC.",
            solutionSteps: [
              "State BPT and prove AD/DB = AE/EC using area ratios of △ADE, △BDE, and △CDE (same base DE between parallels DE ∥ BC).",
              "Application: 3 / 4.5 = 2.4 / EC ⇒ 2/3 = 2.4 / EC ⇒ EC = 3.6 cm.",
              "Total AC = AE + EC = 2.4 + 3.6 = 6 cm.",
            ],
            finalAnswer: "BPT proved; AC = 6 cm",
          },
          {
            id: "m1-q33",
            number: 33,
            marks: 5,
            chapterRef: "Ch. 9 Applications of Trigonometry",
            question:
              "From a point on a bridge across a river, the angles of depression of the banks on opposite sides of the river are 30° and 45° respectively. If the bridge is at a height of 3 m from the banks, find the width of the river.",
            solutionSteps: [
              "Let P be the point on the bridge, PD = 3 m height above river AB, with ∠PAD = 30° and ∠PBD = 45° (alternate interior angles).",
              "In right △PDA: tan 30° = 3/AD ⇒ 1/√3 = 3/AD ⇒ AD = 3√3 m.",
              "In right △PDB: tan 45° = 3/BD ⇒ 1 = 3/BD ⇒ BD = 3 m.",
              "Total width AB = AD + BD = 3√3 + 3 = 3(√3 + 1) m (≈ 8.20 m).",
            ],
            finalAnswer: "Width of river = 3(√3 + 1) m",
          },
          {
            id: "m1-q34",
            number: 34,
            marks: 5,
            chapterRef: "Ch. 12 Surface Areas & Volumes",
            question:
              "A tent is in the shape of a cylinder surmounted by a conical top. If the height and diameter of the cylindrical part are 2.1 m and 4 m respectively, and the slant height of the top is 2.8 m, find the area of the canvas used for making the tent and the cost of canvas at ₹500 per m².",
            solutionSteps: [
              "Radius r = 4/2 = 2 m, cylinder height h = 2.1 m, cone slant height l = 2.8 m.",
              "Canvas Area = CSA of cylinder + CSA of cone = 2πrh + πrl = πr(2h + l).",
              "Substitute: (22/7) × 2 × (4.2 + 2.8) = (44/7) × 7 = 44 m².",
              "Total Cost = 44 × ₹500 = ₹22,000.",
            ],
            finalAnswer: "Area = 44 m², Cost = ₹22,000",
          },
          {
            id: "m1-q35",
            number: 35,
            marks: 5,
            chapterRef: "Ch. 13 Statistics",
            question:
              "Find the Mean and Mode of the following frequency distribution of daily pocket allowance of 25 students: Classes 10–20 (f=3), 20–30 (f=5), 30–40 (f=9), 40–50 (f=5), 50–60 (f=3).",
            solutionSteps: [
              "Class marks xᵢ: 15, 25, 35, 45, 55. Products fᵢxᵢ: 45, 125, 315, 225, 165. Σfᵢxᵢ = 875, Σfᵢ = 25.",
              "Mean x̄ = 875 / 25 = 35.",
              "Modal class is 30–40 (highest frequency f₁ = 9, f₀ = 5, f₂ = 5, l = 30, h = 10).",
              "Mode = 30 + [(9 − 5) / (18 − 5 − 5)] × 10 = 30 + (4/8) × 10 = 35.",
            ],
            finalAnswer: "Mean = 35, Mode = 35",
          },
          {
            id: "m1-q36",
            number: 36,
            marks: 5,
            chapterRef: "Ch. 5 Arithmetic Progressions (Case Study)",
            question:
              "Case Study (Himachal School Plantation Drive): Students plant trees in rows such that Row 1 has 5 saplings, Row 2 has 8 saplings, Row 3 has 11 saplings, and so on. (a) How many saplings are in Row 10? (b) Which row has 62 saplings? (c) Find the total number of saplings planted in the first 15 rows.",
            solutionSteps: [
              "AP formed: 5, 8, 11, ... with a = 5, d = 3.",
              "(a) a₁₀ = 5 + 9(3) = 32 saplings.",
              "(b) 62 = 5 + (n − 1)3 ⇒ 57 = 3(n − 1) ⇒ n − 1 = 19 ⇒ Row 20.",
              "(c) S₁₅ = (15/2)[2(5) + 14(3)] = (15/2)[10 + 42] = 15 × 26 = 390 saplings.",
            ],
            finalAnswer: "(a) 32 saplings, (b) 20th row, (c) 390 saplings",
          },
        ],
      },
    ],
  },
  {
    id: "hpbose-math-set-2",
    title: "Class 10 Mathematics — Standard Challenge Sample Paper 2",
    subtitle:
      "Fresh board-level problems targeting tricky HPBOSE areas: irrationality proofs, consistency k-values, identities, circular segments, and missing-frequency medians.",
    subjectSlug: "mathematics",
    subjectName: "Mathematics",
    boardTag: "HPBOSE Standard Level",
    totalMarks: 80,
    durationMinutes: 180,
    difficulty: "Challenge",
    generalInstructions: [
      "Attempt under timed 3-hour board conditions for realistic preparation.",
      "Section A: 8 high-yield MCQs (2 marks each = 16 marks).",
      "Section B: 8 Short Answer questions (3 marks each = 24 marks).",
      "Section C: 8 Long Answer & Proof questions (5 marks each = 40 marks).",
    ],
    sections: [
      {
        id: "m2-sec-a",
        name: "Section A — Conceptual MCQs (2 Marks Each)",
        instructions: "Select the correct option and review the shortcut.",
        marksSummary: "8 × 2 = 16 Marks",
        questions: [
          {
            id: "m2-q1",
            number: 1,
            marks: 2,
            chapterRef: "Ch. 1 Real Numbers",
            question:
              "If HCF(a, 8) = 4 and LCM(a, 8) = 24, then the value of a is:",
            options: ["8", "10", "12", "14"],
            correctOptionIndex: 2,
            solutionSteps: ["a × 8 = HCF × LCM = 4 × 24 = 96 ⇒ a = 96/8 = 12."],
            finalAnswer: "12",
          },
          {
            id: "m2-q2",
            number: 2,
            marks: 2,
            chapterRef: "Ch. 2 Polynomials",
            question:
              "If α and β are zeroes of 2x² − 7x + 3, then α² + β² equals:",
            options: ["37/4", "49/4", "25/4", "13/4"],
            correctOptionIndex: 0,
            solutionSteps: [
              "α + β = 7/2, αβ = 3/2.",
              "α² + β² = (α + β)² − 2αβ = 49/4 − 3 = 37/4.",
            ],
            finalAnswer: "37/4",
          },
          {
            id: "m2-q3",
            number: 3,
            marks: 2,
            chapterRef: "Ch. 4 Quadratic Equations",
            question:
              "The nature of roots of 2x² − 3x + 5 = 0 is:",
            options: [
              "Two distinct real roots",
              "Two equal real roots",
              "No real roots",
              "More than two real roots",
            ],
            correctOptionIndex: 2,
            solutionSteps: ["D = (−3)² − 4(2)(5) = 9 − 40 = −31 < 0 ⇒ No real roots."],
            finalAnswer: "No real roots",
          },
          {
            id: "m2-q4",
            number: 4,
            marks: 2,
            chapterRef: "Ch. 5 Arithmetic Progressions",
            question:
              "If the nth term of an AP is (2n + 1), then the sum of its first three terms is:",
            options: ["6n + 3", "15", "12", "21"],
            correctOptionIndex: 1,
            solutionSteps: ["a₁ = 3, a₂ = 5, a₃ = 7 ⇒ Sum = 3 + 5 + 7 = 15."],
            finalAnswer: "15",
          },
          {
            id: "m2-q5",
            number: 5,
            marks: 2,
            chapterRef: "Ch. 8 Trigonometry",
            question: "If sin θ = cos θ (0° ≤ θ ≤ 90°), then 2 tan²θ + sin²θ − 1 equals:",
            options: ["3/2", "1/2", "2", "1"],
            correctOptionIndex: 0,
            solutionSteps: [
              "sin θ = cos θ ⇒ θ = 45°.",
              "2(1)² + (1/√2)² − 1 = 2 + 1/2 − 1 = 3/2.",
            ],
            finalAnswer: "3/2",
          },
          {
            id: "m2-q6",
            number: 6,
            marks: 2,
            chapterRef: "Ch. 10 Circles",
            question:
              "Two concentric circles have radii 10 cm and 6 cm. The length of the chord of the larger circle tangent to the smaller circle is:",
            options: ["8 cm", "12 cm", "16 cm", "14 cm"],
            correctOptionIndex: 2,
            solutionSteps: ["Half-chord = √(10² − 6²) = √64 = 8 cm ⇒ Full chord = 16 cm."],
            finalAnswer: "16 cm",
          },
          {
            id: "m2-q7",
            number: 7,
            marks: 2,
            chapterRef: "Ch. 11 Areas Related to Circles",
            question:
              "The area swept by a 7 cm clock minute hand in 15 minutes is:",
            options: ["38.5 cm²", "77 cm²", "154 cm²", "19.25 cm²"],
            correctOptionIndex: 0,
            solutionSteps: [
              "15 min = 90° (quadrant). Area = (1/4) × (22/7) × 7 × 7 = 77/2 = 38.5 cm².",
            ],
            finalAnswer: "38.5 cm²",
          },
          {
            id: "m2-q8",
            number: 8,
            marks: 2,
            chapterRef: "Ch. 14 Probability",
            question:
              "What is the probability that a non-leap year has 53 Sundays?",
            options: ["1/7", "2/7", "5/7", "53/365"],
            correctOptionIndex: 0,
            solutionSteps: [
              "365 days = 52 full weeks + 1 extra day. That 1 extra day can be any of 7 days, so P(Sunday) = 1/7.",
            ],
            finalAnswer: "1/7",
          },
        ],
      },
      {
        id: "m2-sec-b",
        name: "Section B — Short Answer Questions (3 Marks Each)",
        instructions: "Show clear reasoning and formula substitution.",
        marksSummary: "8 × 3 = 24 Marks",
        questions: [
          {
            id: "m2-q9",
            number: 9,
            marks: 3,
            chapterRef: "Ch. 1 Real Numbers",
            question: "Show that 5 − 2√3 is irrational, given that √3 is irrational.",
            solutionSteps: [
              "Assume 5 − 2√3 = a/b (rational, b ≠ 0).",
              "Rearrange: 2√3 = 5 − a/b = (5b − a)/b ⇒ √3 = (5b − a)/(2b).",
              "RHS is rational while LHS √3 is irrational—contradiction!",
            ],
            finalAnswer: "Therefore 5 − 2√3 is irrational.",
          },
          {
            id: "m2-q10",
            number: 10,
            marks: 3,
            chapterRef: "Ch. 3 Linear Equations",
            question:
              "Solve the pair of linear equations: 2x + 3y = 11 and 2x − 4y = −24, and hence find m for which y = mx + 3.",
            solutionSteps: [
              "Subtracting the two equations: 7y = 35 ⇒ y = 5.",
              "Substitute y = 5 in 2x + 3(5) = 11 ⇒ 2x = −4 ⇒ x = −2.",
              "Plug (−2, 5) into y = mx + 3: 5 = −2m + 3 ⇒ −2m = 2 ⇒ m = −1.",
            ],
            finalAnswer: "x = −2, y = 5, m = −1",
          },
          {
            id: "m2-q11",
            number: 11,
            marks: 3,
            chapterRef: "Ch. 5 Arithmetic Progressions",
            question:
              "Find the 20th term from the LAST term of the AP: 3, 8, 13, ..., 253.",
            solutionSteps: [
              "Here last term l = 253 and common difference d = 5.",
              "nth term from end = l − (n − 1)d = 253 − 19(5) = 253 − 95 = 158.",
            ],
            finalAnswer: "158",
          },
          {
            id: "m2-q12",
            number: 12,
            marks: 3,
            chapterRef: "Ch. 7 Coordinate Geometry",
            question:
              "If (1, 2), (4, y), (x, 6), and (3, 5) are the vertices of a parallelogram taken in order, find x and y.",
            solutionSteps: [
              "Diagonals of a parallelogram bisect each other ⇒ Midpoint of AC = Midpoint of BD.",
              "((1 + x)/2, (2 + 6)/2) = ((4 + 3)/2, (y + 5)/2).",
              "1 + x = 7 ⇒ x = 6;  8 = y + 5 ⇒ y = 3.",
            ],
            finalAnswer: "x = 6, y = 3",
          },
          {
            id: "m2-q13",
            number: 13,
            marks: 3,
            chapterRef: "Ch. 8 Trigonometry",
            question:
              "Prove that: √[(1 + sin A) / (1 − sin A)] = sec A + tan A.",
            solutionSteps: [
              "Multiply numerator and denominator inside root by (1 + sin A).",
              "√[(1 + sin A)² / (1 − sin²A)] = √[(1 + sin A)² / cos²A] = (1 + sin A) / cos A.",
              "Split fraction: 1/cos A + sin A/cos A = sec A + tan A = RHS.",
            ],
            finalAnswer: "Proved",
          },
          {
            id: "m2-q14",
            number: 14,
            marks: 3,
            chapterRef: "Ch. 10 Circles",
            question:
              "Two tangents TP and TQ are drawn to a circle with centre O from an external point T. Prove that ∠PTQ = 2 ∠OPQ.",
            solutionSteps: [
              "Let ∠PTQ = θ. Since TP = TQ, △TPQ is isosceles ⇒ ∠TPQ = ∠TQP = (180° − θ)/2 = 90° − θ/2.",
              "Since OP ⊥ TP, ∠OPT = 90°.",
              "Therefore ∠OPQ = ∠OPT − ∠TPQ = 90° − (90° − θ/2) = θ/2 ⇒ ∠PTQ = 2 ∠OPQ.",
            ],
            finalAnswer: "Proved: ∠PTQ = 2 ∠OPQ",
          },
          {
            id: "m2-q15",
            number: 15,
            marks: 3,
            chapterRef: "Ch. 11 Areas Related to Circles",
            question:
              "In a circle of radius 21 cm, an arc subtends an angle of 60° at the centre. Find (i) area of the sector, (ii) area of the segment formed by the corresponding chord.",
            solutionSteps: [
              "(i) Sector Area = (60/360) × (22/7) × 21 × 21 = 231 cm².",
              "(ii) Since θ = 60°, △OAB is equilateral: Area = (√3/4) × 21² = (441√3)/4 cm².",
              "Segment Area = [231 − (441√3)/4] cm² (≈ 40.05 cm²).",
            ],
            finalAnswer: "(i) 231 cm², (ii) [231 − (441√3)/4] cm²",
          },
          {
            id: "m2-q16",
            number: 16,
            marks: 3,
            chapterRef: "Ch. 12 Surface Areas & Volumes",
            question:
              "A cubical block of side 7 cm is surmounted by a hemisphere. What is the greatest diameter the hemisphere can have? Find the surface area of the solid.",
            solutionSteps: [
              "Greatest diameter = side of cube = 7 cm ⇒ radius r = 7/2 = 3.5 cm.",
              "Surface area = TSA of cube − base circle of hemisphere + CSA of hemisphere = 6a² + πr².",
              "= 6(7²) + (22/7)(7/2)(7/2) = 294 + 38.5 = 332.5 cm².",
            ],
            finalAnswer: "Max diameter = 7 cm, Surface Area = 332.5 cm²",
          },
        ],
      },
      {
        id: "m2-sec-c",
        name: "Section C — Long Answer Questions (5 Marks Each)",
        instructions: "Show complete steps, diagrams, and final answers with units.",
        marksSummary: "8 × 5 = 40 Marks",
        questions: [
          {
            id: "m2-q17",
            number: 17,
            marks: 5,
            chapterRef: "Ch. 4 Quadratic Equations",
            question:
              "Two water taps together can fill a tank in 9⅜ hours. The tap of larger diameter takes 10 hours less than the smaller one to fill the tank separately. Find the time in which each tap can separately fill the tank.",
            solutionSteps: [
              "Let smaller tap take x hours ⇒ larger tap takes (x − 10) hours. 9⅜ = 75/8 hours.",
              "1/x + 1/(x − 10) = 8/75 ⇒ (2x − 10)/[x(x − 10)] = 8/75.",
              "4x² − 115x + 375 = 0 ⇒ (4x − 15)(x − 25) = 0 ⇒ x = 25 or x = 3.75.",
              "Reject x = 3.75 (since x − 10 would be negative). Smaller tap = 25 hrs, Larger tap = 15 hrs.",
            ],
            finalAnswer: "Smaller tap = 25 hours, Larger tap = 15 hours",
          },
          {
            id: "m2-q18",
            number: 18,
            marks: 5,
            chapterRef: "Ch. 9 Applications of Trigonometry",
            question:
              "As observed from the top of a 75 m high lighthouse from sea-level, the angles of depression of two ships are 30° and 45°. If one ship is exactly behind the other on the same side of the lighthouse, find the distance between the two ships.",
            solutionSteps: [
              "Let lighthouse AB = 75 m, closer ship at C (45°), farther ship at D (30°).",
              "In △ABC: tan 45° = 75/BC ⇒ BC = 75 m.",
              "In △ABD: tan 30° = 75/BD ⇒ BD = 75√3 m.",
              "Distance between ships CD = BD − BC = 75(√3 − 1) m (≈ 54.9 m).",
            ],
            finalAnswer: "75(√3 − 1) m",
          },
          {
            id: "m2-q19",
            number: 19,
            marks: 5,
            chapterRef: "Ch. 12 Surface Areas & Volumes",
            question:
              "From a solid cylinder whose height is 2.4 cm and diameter 1.4 cm, a conical cavity of the same height and same diameter is hollowed out. Find the total surface area of the remaining solid to the nearest cm².",
            solutionSteps: [
              "r = 0.7 cm, h = 2.4 cm ⇒ slant height l = √(0.7² + 2.4²) = √(0.49 + 5.76) = √6.25 = 2.5 cm.",
              "TSA of remaining solid = Cylinder CSA + Bottom base + Inner Cone CSA = 2πrh + πr² + πrl = πr(2h + r + l).",
              "= (22/7)(0.7)(4.8 + 0.7 + 2.5) = 2.2 × 8 = 17.6 cm² ≈ 18 cm².",
            ],
            finalAnswer: "18 cm² (nearest cm²)",
          },
          {
            id: "m2-q20",
            number: 20,
            marks: 5,
            chapterRef: "Ch. 13 Statistics",
            question:
              "If the median of the distribution with total frequency n = 60 is 28.5, where classes are 0–10 (5), 10–20 (x), 20–30 (20), 30–40 (15), 40–50 (y), 50–60 (5), find the values of x and y.",
            solutionSteps: [
              "Sum of frequencies: 45 + x + y = 60 ⇒ x + y = 15.",
              "Median 28.5 lies in class 20–30 ⇒ l = 20, f = 20, h = 10, preceding cf = 5 + x, n/2 = 30.",
              "28.5 = 20 + [(30 − (5 + x))/20] × 10 ⇒ 8.5 = (25 − x)/2 ⇒ x = 8.",
              "Therefore y = 15 − 8 = 7.",
            ],
            finalAnswer: "x = 8, y = 7",
          },
          {
            id: "m2-q21",
            number: 21,
            marks: 5,
            chapterRef: "Ch. 6 Triangles",
            question:
              "Sides AB and AC and median AD of △ABC are respectively proportional to sides PQ and PR and median PM of △PQR. Show that △ABC ~ △PQR.",
            solutionSteps: [
              "Extend AD to E such that AD = DE and join EC; extend PM to N such that PM = MN and join NR.",
              "Since diagonals bisect each other, ABEC and PQNR are parallelograms ⇒ BE = AC, EC = AB and QN = PR, NR = PQ.",
              "Given AB/PQ = AC/PR = AD/PM ⇒ AB/PQ = EC/NR = 2AD/2PM = AE/PN ⇒ △AEC ~ △PNR (SSS) ⇒ ∠DAC = ∠MPR.",
              "Similarly ∠DAB = ∠MPQ ⇒ adding gives ∠BAC = ∠QPR. By SAS similarity, △ABC ~ △PQR.",
            ],
            finalAnswer: "Proved: △ABC ~ △PQR",
          },
          {
            id: "m2-q22",
            number: 22,
            marks: 5,
            chapterRef: "Ch. 3 Linear Equations",
            question:
              "Solve graphically: x − y + 1 = 0 and 3x + 2y − 12 = 0. Determine the coordinates of the vertices of the triangle formed by these lines and the x-axis.",
            solutionSteps: [
              "Line 1 (y = x + 1) passes through (−1, 0), (0, 1), and (2, 3).",
              "Line 2 (2y = 12 − 3x) passes through (4, 0), (0, 6), and (2, 3).",
              "Intersection point of both lines is (2, 3).",
              "x-axis intercepts are (−1, 0) and (4, 0).",
            ],
            finalAnswer: "Triangle vertices: (2, 3), (−1, 0), and (4, 0)",
          },
          {
            id: "m2-q23",
            number: 23,
            marks: 5,
            chapterRef: "Ch. 7 Coordinate Geometry",
            question:
              "Find the coordinates of the points of trisection of the line segment joining A(4, −1) and B(−2, −3).",
            solutionSteps: [
              "Point P divides AB in ratio 1 : 2 ⇒ P = ((1(−2) + 2(4))/3, (1(−3) + 2(−1))/3) = (6/3, −5/3) = (2, −5/3).",
              "Point Q divides AB in ratio 2 : 1 ⇒ Q = ((2(−2) + 1(4))/3, (2(−3) + 1(−1))/3) = (0/3, −7/3) = (0, −7/3).",
            ],
            finalAnswer: "P(2, −5/3) and Q(0, −7/3)",
          },
          {
            id: "m2-q24",
            number: 24,
            marks: 5,
            chapterRef: "Ch. 14 Probability",
            question:
              "Five cards—the ten, jack, queen, king, and ace of diamonds—are well shuffled face downwards. One card is drawn at random. (i) What is the probability that the card is the queen? (ii) If the queen is drawn and put aside, what is the probability that the second card picked up is (a) an ace? (b) a queen?",
            solutionSteps: [
              "(i) Total cards = 5; Queen = 1 ⇒ P(queen) = 1/5.",
              "(ii) Queen is put aside, so remaining cards = 4 (10, J, K, A).",
              "(a) P(ace) = 1/4.",
              "(b) No queen remains in the 4 cards (impossible event) ⇒ P(queen) = 0.",
            ],
            finalAnswer: "(i) 1/5, (ii)(a) 1/4, (ii)(b) 0",
          },
        ],
      },
    ],
  },
  {
    id: "hpbose-science-set-1",
    title: "Class 10 Science & Technology — HPBOSE Board Sample Paper 1",
    subtitle:
      "60-mark HPBOSE Theory pattern covering Chemistry equations, Life Processes diagrams, Optics ray numericals, and Electricity circuits.",
    subjectSlug: "science",
    subjectName: "Science",
    boardTag: "HPBOSE 60-Mark Theory",
    totalMarks: 60,
    durationMinutes: 180,
    difficulty: "Board Core",
    generalInstructions: [
      "Theory carries 60 marks (3 hours); practical/internal assessment carries 40 marks as per HPBOSE pattern.",
      "Draw neat, labelled diagrams for Biology and Optics questions.",
      "Write balanced chemical equations wherever applicable.",
    ],
    sections: [
      {
        id: "s1-sec-a",
        name: "Section A — Objective MCQs (1 Mark Each)",
        instructions: "Choose the correct scientific answer.",
        marksSummary: "10 × 1 = 10 Marks",
        questions: [
          {
            id: "s1-q1",
            number: 1,
            marks: 1,
            chapterRef: "Ch. 1 Chemical Reactions",
            question:
              "Which gas is released when zinc granules react with dilute hydrochloric acid?",
            options: ["Oxygen", "Hydrogen", "Carbon dioxide", "Chlorine"],
            correctOptionIndex: 1,
            solutionSteps: ["Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g)↑."],
            finalAnswer: "Hydrogen",
          },
          {
            id: "s1-q2",
            number: 2,
            marks: 1,
            chapterRef: "Ch. 5 Life Processes",
            question:
              "The filtration units present in human kidneys are called:",
            options: ["Neurons", "Nephrons", "Alveoli", "Villi"],
            correctOptionIndex: 1,
            solutionSteps: ["Each kidney contains millions of nephrons that filter blood and form urine."],
            finalAnswer: "Nephrons",
          },
          {
            id: "s1-q3",
            number: 3,
            marks: 1,
            chapterRef: "Ch. 9 Light",
            question:
              "A lens has a focal length of −50 cm. Its power is:",
            options: ["+2 D", "−2 D", "+0.5 D", "−0.5 D"],
            correctOptionIndex: 1,
            solutionSteps: ["f = −0.5 m ⇒ P = 1 / (−0.5) = −2 D (concave lens)."],
            finalAnswer: "−2 D",
          },
          {
            id: "s1-q4",
            number: 4,
            marks: 1,
            chapterRef: "Ch. 11 Electricity",
            question: "The SI unit of electrical resistivity is:",
            options: ["Ohm (Ω)", "Ohm-metre (Ω·m)", "Volt/Ampere", "Watt (W)"],
            correctOptionIndex: 1,
            solutionSteps: ["ρ = RA / l ⇒ unit = (Ω × m²) / m = Ω·m."],
            finalAnswer: "Ohm-metre (Ω·m)",
          },
          {
            id: "s1-q5",
            number: 5,
            marks: 1,
            chapterRef: "Ch. 5 Life Processes",
            question:
              "Which enzyme in human saliva starts digesting starch in the mouth?",
            options: ["Pepsin", "Salivary amylase", "Lipase", "Trypsin"],
            correctOptionIndex: 1,
            solutionSteps: ["Salivary amylase breaks complex starch into simpler maltose sugar."],
            finalAnswer: "Salivary amylase",
          },
          {
            id: "s1-q6",
            number: 6,
            marks: 1,
            chapterRef: "Ch. 1 Chemical Reactions",
            question:
              "When silver chloride (AgCl) is exposed to sunlight, it turns grey due to:",
            options: [
              "Combination reaction",
              "Photolytic decomposition",
              "Displacement reaction",
              "Neutralisation",
            ],
            correctOptionIndex: 1,
            solutionSteps: ["2AgCl(s) —Sunlight→ 2Ag(s) + Cl₂(g)."],
            finalAnswer: "Photolytic decomposition",
          },
          {
            id: "s1-q7",
            number: 7,
            marks: 1,
            chapterRef: "Ch. 9 Light",
            question:
              "Which mirror always produces a virtual, erect, and diminished image?",
            options: ["Concave mirror", "Plane mirror", "Convex mirror", "Parabolic mirror"],
            correctOptionIndex: 2,
            solutionSteps: ["Convex mirrors always diverge rays to form diminished, erect virtual images."],
            finalAnswer: "Convex mirror",
          },
          {
            id: "s1-q8",
            number: 8,
            marks: 1,
            chapterRef: "Ch. 11 Electricity",
            question:
              "Two resistors of 4 Ω each connected in parallel give equivalent resistance:",
            options: ["8 Ω", "4 Ω", "2 Ω", "1 Ω"],
            correctOptionIndex: 2,
            solutionSteps: ["1/Rp = 1/4 + 1/4 = 2/4 = 1/2 ⇒ Rp = 2 Ω."],
            finalAnswer: "2 Ω",
          },
          {
            id: "s1-q9",
            number: 9,
            marks: 1,
            chapterRef: "Ch. 5 Life Processes",
            question: "Lactic acid builds up in human muscle cells during:",
            options: [
              "Aerobic respiration",
              "Lack of oxygen during vigorous exercise",
              "Photosynthesis",
              "Transpiration",
            ],
            correctOptionIndex: 1,
            solutionSteps: ["Under oxygen shortage, pyruvate converts to lactic acid causing muscle cramps."],
            finalAnswer: "Lack of oxygen during vigorous exercise",
          },
          {
            id: "s1-q10",
            number: 10,
            marks: 1,
            chapterRef: "Ch. 11 Electricity",
            question:
              "An ammeter is always connected in a circuit in:",
            options: ["Parallel", "Series", "Either series or parallel", "Across a switch"],
            correctOptionIndex: 1,
            solutionSteps: ["Ammeter has very low resistance and is connected in series to measure total current."],
            finalAnswer: "Series",
          },
        ],
      },
      {
        id: "s1-sec-b",
        name: "Section B — Short & Numerical Questions (5 × 4 = 20 Marks)",
        instructions: "Show balanced equations, formulas, and units.",
        marksSummary: "5 × 4 = 20 Marks",
        questions: [
          {
            id: "s1-q11",
            number: 11,
            marks: 4,
            chapterRef: "Ch. 1 Chemical Reactions",
            question:
              "Define oxidation and reduction. Identify the substance oxidised, substance reduced, oxidising agent, and reducing agent in: MnO₂ + 4HCl → MnCl₂ + 2H₂O + Cl₂.",
            solutionSteps: [
              "Oxidation: gain of oxygen / loss of hydrogen. Reduction: loss of oxygen / gain of hydrogen.",
              "HCl loses hydrogen to become Cl₂ ⇒ HCl is oxidised (Reducing agent).",
              "MnO₂ loses oxygen to become MnCl₂ ⇒ MnO₂ is reduced (Oxidising agent).",
            ],
            finalAnswer:
              "Oxidised: HCl; Reduced: MnO₂; Oxidising agent: MnO₂; Reducing agent: HCl",
          },
          {
            id: "s1-q12",
            number: 12,
            marks: 4,
            chapterRef: "Ch. 9 Light",
            question:
              "A 5 cm tall object is placed 20 cm in front of a convex lens of focal length 10 cm. Find the position, nature, and size of the image.",
            solutionSteps: [
              "Given: h = +5 cm, u = −20 cm, f = +10 cm.",
              "Lens formula: 1/v − 1/u = 1/f ⇒ 1/v = 1/10 + 1/(−20) = 1/20 ⇒ v = +20 cm.",
              "Magnification m = v/u = 20/(−20) = −1 ⇒ h' = −5 cm.",
            ],
            finalAnswer: "Real, inverted, same size (5 cm) at 20 cm on the other side",
          },
          {
            id: "s1-q13",
            number: 13,
            marks: 4,
            chapterRef: "Ch. 11 Electricity",
            question:
              "Three resistors of 5 Ω, 10 Ω, and 30 Ω are connected in parallel across a 12 V battery. Calculate (a) current through each resistor, (b) total circuit current, (c) total equivalent resistance.",
            solutionSteps: [
              "(a) I₁ = 12/5 = 2.4 A; I₂ = 12/10 = 1.2 A; I₃ = 12/30 = 0.4 A.",
              "(b) Total current I = 2.4 + 1.2 + 0.4 = 4 A.",
              "(c) 1/Rp = 1/5 + 1/10 + 1/30 = (6 + 3 + 1)/30 = 10/30 = 1/3 ⇒ Rp = 3 Ω.",
            ],
            finalAnswer: "(a) 2.4 A, 1.2 A, 0.4 A; (b) 4 A; (c) 3 Ω",
          },
          {
            id: "s1-q14",
            number: 14,
            marks: 4,
            chapterRef: "Ch. 5 Life Processes",
            question:
              "Explain the three main events occurring during photosynthesis and write its balanced chemical equation.",
            solutionSteps: [
              "(1) Absorption of light energy by chlorophyll.",
              "(2) Conversion of light energy to chemical energy and splitting of water molecules into H₂ and O₂.",
              "(3) Reduction of carbon dioxide to carbohydrates (glucose).",
              "Equation: 6CO₂ + 12H₂O —Sunlight/Chlorophyll→ C₆H₁₂O₆ + 6O₂ + 6H₂O.",
            ],
            finalAnswer: "Three events + balanced equation",
          },
          {
            id: "s1-q15",
            number: 15,
            marks: 4,
            chapterRef: "Ch. 11 Electricity",
            question:
              "State Joule's Law of Heating. An electric iron of resistance 20 Ω draws a current of 5 A. Calculate the heat developed in 30 seconds.",
            solutionSteps: [
              "Joule's Law: Heat H produced in a resistor is proportional to I², R, and time t (H = I²Rt).",
              "H = (5)² × 20 × 30 = 25 × 600 = 15,000 J = 15 kJ.",
            ],
            finalAnswer: "H = 15,000 J (15 kJ)",
          },
        ],
      },
      {
        id: "s1-sec-c",
        name: "Section C — Long Answer Questions (6 × 5 = 30 Marks)",
        instructions: "Answer in structured points with clean diagrams.",
        marksSummary: "6 × 5 = 30 Marks",
        questions: [
          {
            id: "s1-q16",
            number: 16,
            marks: 5,
            chapterRef: "Ch. 5 Life Processes",
            question:
              "Describe double circulation in human beings. Why is it essential to separate oxygenated and deoxygenated blood in mammals and birds?",
            solutionSteps: [
              "Blood passes twice through the 4-chambered heart during one complete cycle: Pulmonary circulation (right ventricle → lungs → left atrium) and Systemic circulation (left ventricle → body → right atrium).",
              "Separation prevents mixing of oxygen-rich and carbon-dioxide-rich blood, providing high oxygen efficiency needed by warm-blooded animals to maintain constant body temperature.",
            ],
            finalAnswer: "Complete structured explanation of double circulation",
          },
          {
            id: "s1-q17",
            number: 17,
            marks: 5,
            chapterRef: "Ch. 9 Light",
            question:
              "Define refractive index. Light enters from air into glass having refractive index 1.50. What is the speed of light in the glass? Also state the two laws of refraction of light.",
            solutionSteps: [
              "Absolute refractive index n = c / v, where c = 3 × 10⁸ m/s.",
              "v = c / n = (3 × 10⁸) / 1.50 = 2 × 10⁸ m/s.",
              "Laws: (1) Incident ray, refracted ray, and normal lie in the same plane. (2) Snell's Law: sin i / sin r = constant.",
            ],
            finalAnswer: "Speed in glass = 2 × 10⁸ m/s + Laws of refraction",
          },
          {
            id: "s1-q18",
            number: 18,
            marks: 5,
            chapterRef: "Ch. 1 Chemical Reactions",
            question:
              "Explain thermal, electrolytic, and photolytic decomposition reactions with one balanced chemical equation for each.",
            solutionSteps: [
              "Thermal (Heat): CaCO₃(s) —Δ→ CaO(s) + CO₂(g).",
              "Electrolytic (Electricity): 2H₂O(l) —Electricity→ 2H₂(g) + O₂(g).",
              "Photolytic (Light): 2AgBr(s) —Sunlight→ 2Ag(s) + Br₂(g).",
            ],
            finalAnswer: "3 balanced decomposition equations with explanations",
          },
          {
            id: "s1-q19",
            number: 19,
            marks: 5,
            chapterRef: "Ch. 5 Life Processes",
            question:
              "Explain the structure and functioning of a nephron in urine formation.",
            solutionSteps: [
              "Structure: Cup-shaped Bowman's capsule enclosing capillary cluster (glomerulus) connected to renal tubule and collecting duct.",
              "Functioning: (1) Glomerular filtration filters water, glucose, amino acids, salts, and urea. (2) Selective reabsorption along tubule reabsorbs useful glucose, amino acids, and required water back into blood. (3) Remaining urea + excess water passes as urine to urinary bladder.",
            ],
            finalAnswer: "Structured nephron anatomy + 3 urine-formation stages",
          },
          {
            id: "s1-q20",
            number: 20,
            marks: 5,
            chapterRef: "Ch. 11 Electricity",
            question:
              "Explain why household domestic electric circuits are connected in parallel rather than in series (give 3 reasons). Also compute the monthly bill (30 days) for two 100 W fans running 6 hours/day at ₹6/unit.",
            solutionSteps: [
              "Parallel advantages: (1) Every appliance receives full 220 V. (2) Each appliance has an independent switch—if one fails, others keep working. (3) Overall circuit resistance is low.",
              "Energy = 2 × 100 W × 6 h × 30 days = 36,000 Wh = 36 kWh (units).",
              "Bill = 36 × ₹6 = ₹216.",
            ],
            finalAnswer: "3 parallel advantages + Monthly bill = ₹216",
          },
          {
            id: "s1-q21",
            number: 21,
            marks: 5,
            chapterRef: "Ch. 5 Life Processes",
            question:
              "How are water, minerals, and food transported inside plants? Differentiate clearly between Xylem and Phloem.",
            solutionSteps: [
              "Xylem transports water & minerals unidirectionally (roots → leaves) using root pressure and transpiration pull (no ATP required).",
              "Phloem translocates prepared food (sucrose) bidirectionally (leaves → roots, fruits, growing buds) using ATP osmotic pressure.",
            ],
            finalAnswer: "Clear comparison table of Xylem vs. Phloem",
          },
        ],
      },
    ],
  },
  {
    id: "hpbose-sst-set-1",
    title: "Class 10 Social Science (SST) — HPBOSE Board Sample Paper 1",
    subtitle:
      "80-mark HPBOSE Social Science blueprint across History, Geography, Democratic Politics (Civics), Economics, and HPBOSE Disaster Management.",
    subjectSlug: "social-science",
    subjectName: "Social Science",
    boardTag: "HPBOSE 80-Mark Pattern",
    totalMarks: 80,
    durationMinutes: 180,
    difficulty: "Board Core",
    generalInstructions: [
      "All sections are compulsory: History, Geography, Civics, Economics, and HPBOSE Disaster Management.",
      "Write structured bullet points for 3-mark and 5-mark answers.",
      "Include accurate dates, soil regions, and constitutional terms for full marks.",
    ],
    sections: [
      {
        id: "sst1-sec-a",
        name: "Section A — Objective MCQs (1 Mark Each)",
        instructions: "Choose the single most accurate option.",
        marksSummary: "10 × 1 = 10 Marks",
        questions: [
          {
            id: "sst1-q1",
            number: 1,
            marks: 1,
            chapterRef: "History — Nationalism in India",
            question: "Mahatma Gandhi launched the historic Dandi Salt March on:",
            options: ["13 April 1919", "12 March 1930", "26 January 1930", "5 February 1922"],
            correctOptionIndex: 1,
            solutionSteps: [
              "Gandhiji began the 240-mile march from Sabarmati Ashram on 12 March 1930 and broke the salt law at Dandi on 6 April 1930.",
            ],
            finalAnswer: "12 March 1930",
          },
          {
            id: "sst1-q2",
            number: 2,
            marks: 1,
            chapterRef: "Geography — Resources & Development",
            question: "Which soil is also called Regur soil and is best for cotton?",
            options: ["Alluvial soil", "Laterite soil", "Black soil", "Arid soil"],
            correctOptionIndex: 2,
            solutionSteps: ["Black (Regur) soil retains moisture well and is ideal for cotton in the Deccan Trap."],
            finalAnswer: "Black soil",
          },
          {
            id: "sst1-q3",
            number: 3,
            marks: 1,
            chapterRef: "Civics — Federalism",
            question: "Which subject falls under the State List in the Indian Constitution?",
            options: ["Defence", "Currency", "Police & Agriculture", "Foreign Affairs"],
            correctOptionIndex: 2,
            solutionSteps: ["Police, Trade, Commerce, Agriculture, and Irrigation belong to the State List."],
            finalAnswer: "Police & Agriculture",
          },
          {
            id: "sst1-q4",
            number: 4,
            marks: 1,
            chapterRef: "HPBOSE Disaster Management",
            question:
              "When mobile networks and power lines collapse in a Himalayan earthquake, which alternate communication tool stays operational on battery?",
            options: ["Cable Broadband", "Amateur (HAM) Radio", "Landline PBX", "Local Wi-Fi Router"],
            correctOptionIndex: 1,
            solutionSteps: ["HAM radio operates independently of cellular towers and commercial power grids."],
            finalAnswer: "Amateur (HAM) Radio",
          },
          {
            id: "sst1-q5",
            number: 5,
            marks: 1,
            chapterRef: "History — Nationalism in India",
            question: "Who presided over the December 1929 Lahore Congress Session?",
            options: ["Subhas Chandra Bose", "Jawaharlal Nehru", "Sardar Patel", "C.R. Das"],
            correctOptionIndex: 1,
            solutionSteps: ["Jawaharlal Nehru presided over the Lahore Session (Dec 1929) declaring Purna Swaraj."],
            finalAnswer: "Jawaharlal Nehru",
          },
          {
            id: "sst1-q6",
            number: 6,
            marks: 1,
            chapterRef: "Geography — Resources & Development",
            question: "Newer, more fertile alluvial soil deposited annually by floods is called:",
            options: ["Bangar", "Khadar", "Kankar", "Laterite"],
            correctOptionIndex: 1,
            solutionSteps: ["Khadar is new, fine, highly fertile alluvium; Bangar is older alluvium with kankar nodules."],
            finalAnswer: "Khadar",
          },
          {
            id: "sst1-q7",
            number: 7,
            marks: 1,
            chapterRef: "Civics — Power-sharing",
            question:
              "Division of power among Legislature, Executive, and Judiciary is known as:",
            options: [
              "Vertical power-sharing",
              "Horizontal power-sharing",
              "Community government",
              "Coalition sharing",
            ],
            correctOptionIndex: 1,
            solutionSteps: ["Horizontal distribution places different organs at the same level for checks and balances."],
            finalAnswer: "Horizontal power-sharing",
          },
          {
            id: "sst1-q8",
            number: 8,
            marks: 1,
            chapterRef: "Economics — Sectors of Economy",
            question: "Banking, transport, and communication belong to which economic sector?",
            options: ["Primary sector", "Secondary sector", "Tertiary sector", "Unorganised sector"],
            correctOptionIndex: 2,
            solutionSteps: ["Service activities that support production form the Tertiary (Service) sector."],
            finalAnswer: "Tertiary sector",
          },
          {
            id: "sst1-q9",
            number: 9,
            marks: 1,
            chapterRef: "Geography — Soil Conservation",
            question: "Cutting flat steps into steep Himalayan hill slopes to stop erosion is called:",
            options: ["Shelter belts", "Terrace farming", "Strip mining", "Over-irrigation"],
            correctOptionIndex: 1,
            solutionSteps: ["Terrace cultivation slows down mountain water runoff and preserves hill topsoil."],
            finalAnswer: "Terrace farming",
          },
          {
            id: "sst1-q10",
            number: 10,
            marks: 1,
            chapterRef: "HPBOSE Disaster Management",
            question: "What is India's unified national emergency helpline number?",
            options: ["112", "139", "1912", "1800"],
            correctOptionIndex: 0,
            solutionSteps: ["112 is India's single pan-India emergency response number for police, fire, and medical rescue."],
            finalAnswer: "112",
          },
        ],
      },
      {
        id: "sst1-sec-b",
        name: "Section B — Short Answer Questions (10 × 3 = 30 Marks)",
        instructions: "Write 3 crisp, well-explained points per question.",
        marksSummary: "10 × 3 = 30 Marks",
        questions: [
          {
            id: "sst1-q11",
            number: 11,
            marks: 3,
            chapterRef: "History — Nationalism in India",
            question: "Why did Gandhiji decide to withdraw the Non-Cooperation Movement in February 1922?",
            solutionSteps: [
              "At Chauri Chaura (Gorakhpur, UP), a peaceful demonstration clashed with police and protesters set fire to a police station.",
              "Gandhiji felt the movement was turning violent and satyagrahis needed proper training in non-violence.",
              "Some Congress leaders were also tiring of mass struggles and wanted to enter provincial councils.",
            ],
            finalAnswer: "Chauri Chaura violence + training needed in Satyagraha",
          },
          {
            id: "sst1-q12",
            number: 12,
            marks: 3,
            chapterRef: "Geography — Resources & Development",
            question: "Explain the three stages of Resource Planning in India.",
            solutionSteps: [
              "(1) Identification and inventory of resources across regions via surveying, mapping, and measurement.",
              "(2) Evolving a planning structure equipped with appropriate technology, skill, and institutional setup.",
              "(3) Matching resource development plans with overall national development plans.",
            ],
            finalAnswer: "Survey/Mapping → Institutional Structure → National Alignment",
          },
          {
            id: "sst1-q13",
            number: 13,
            marks: 3,
            chapterRef: "Civics — Federalism",
            question: "State three key changes made in 1992 to strengthen Panchayati Raj / local self-government in India.",
            solutionSteps: [
              "(1) Regular elections to local bodies became constitutionally mandatory.",
              "(2) Seats were reserved for SC/ST/OBC and at least one-third of all positions for women.",
              "(3) Independent State Election Commissions were established, and states had to share powers and revenue.",
            ],
            finalAnswer: "Mandatory elections, 1/3rd women reservation, State Election Commissions",
          },
          {
            id: "sst1-q14",
            number: 14,
            marks: 3,
            chapterRef: "HPBOSE Disaster Management",
            question: "List three practical earthquake survival steps every Class 10 student in Himachal Pradesh should follow.",
            solutionSteps: [
              "(1) Indoors: Drop to hands/knees, Cover head under a sturdy desk away from windows, Hold On until shaking stops.",
              "(2) Outdoors: Move immediately to open ground away from buildings, steep slopes, and electric poles.",
              "(3) Never use elevators or light matchsticks after tremors due to possible gas leaks.",
            ],
            finalAnswer: "Drop-Cover-Hold, open ground safety, no elevators/flames",
          },
          {
            id: "sst1-q15",
            number: 15,
            marks: 3,
            chapterRef: "Economics — Money & Credit",
            question: "Why do we need to expand formal sources of credit (banks & cooperatives) in rural India?",
            solutionSteps: [
              "(1) Informal moneylenders charge very high interest rates, trapping poor farmers in debt.",
              "(2) Formal lenders are supervised by the RBI and offer lower, transparent interest rates.",
              "(3) Cheap, affordable credit enables farmers and small businesses to grow crops and set up enterprises safely.",
            ],
            finalAnswer: "Prevents debt traps, RBI supervision, affordable rural development",
          },
        ],
      },
      {
        id: "sst1-sec-c",
        name: "Section C — Long Answer Questions (8 × 5 = 40 Marks — Sample Core 4 Shown)",
        instructions: "Write structured headings and 5 clear points.",
        marksSummary: "5 Marks Each",
        questions: [
          {
            id: "sst1-q16",
            number: 16,
            marks: 5,
            chapterRef: "History — Nationalism in India",
            question:
              "How did cultural processes (images, folklore, songs, and flags) help develop a sense of collective belonging among Indians during the freedom struggle?",
            solutionSteps: [
              "(1) Image of Bharat Mata painted by Abanindranath Tagore gave the nation a visual identity.",
              "(2) Bankim Chandra Chattopadhyay's hymn 'Vande Mataram' inspired unity during Swadeshi.",
              "(3) Revival of Indian folk tales and songs (Rabindranath Tagore, Natesa Sastri) restored pride in heritage.",
              "(4) Swadeshi & Swaraj tricolour flags with spinning wheel (charkha) became symbols of defiance.",
              "(5) Reinterpretation of Indian history highlighted India's glorious scientific, architectural, and cultural achievements.",
            ],
            finalAnswer: "5 structured cultural pillars of Indian nationalism",
          },
          {
            id: "sst1-q17",
            number: 17,
            marks: 5,
            chapterRef: "Geography — Resources & Development",
            question:
              "What is soil erosion? Describe four effective methods of soil conservation suitable for both mountain states (like Himachal Pradesh) and plains/arid regions.",
            solutionSteps: [
              "Soil erosion is the denudation and washing away of topsoil by water, wind, or human activities like deforestation.",
              "(1) Terrace farming on steep Himalayan slopes.",
              "(2) Contour ploughing along lines of equal elevation.",
              "(3) Strip cropping (strips of grass left between crops to break wind force).",
              "(4) Shelter belts (rows of trees planted to stabilise sand dunes in arid western India).",
            ],
            finalAnswer: "Definition + 4 conservation methods",
          },
          {
            id: "sst1-q18",
            number: 18,
            marks: 5,
            chapterRef: "Civics — Power-sharing",
            question:
              "Compare how Belgium and Sri Lanka handled linguistic diversity and explain what lesson Indian democracy draws from them.",
            solutionSteps: [
              "Belgium amended its constitution four times: equal Dutch/French ministers in central govt, strong state governments, separate Brussels govt with equal representation, and Community Government for culture/language.",
              "Sri Lanka adopted Majoritarianism (1956 Act made Sinhala the only official language, preferential policies for Sinhalese), leading to Tamil alienation and civil war.",
              "Lesson: Power-sharing respects diverse communities and preserves national unity, whereas imposing majority will undermines stability.",
            ],
            finalAnswer: "Belgium accommodation vs. Sri Lanka majoritarianism",
          },
          {
            id: "sst1-q19",
            number: 19,
            marks: 5,
            chapterRef: "HPBOSE Disaster Management",
            question:
              "Explain the role of alternate communication systems and community/school disaster management teams during earthquakes and monsoon landslides.",
            solutionSteps: [
              "(1) Explain why normal telecom fails (tower collapse, snapped cables, power blackouts).",
              "(2) Amateur (HAM) Radio networks provide rapid battery-operated two-way links for SDRF/NDRF.",
              "(3) Satellite phones connect cut-off mountain valleys (e.g., Lahaul, Kinnaur, Chamba) directly to State Emergency Operations Centres.",
              "(4) School disaster teams (Awareness, Warning, Evacuation, First Aid) prepare students through mock drills.",
              "(5) Sharing responsibility reduces panic and saves lives in the crucial Golden Hour.",
            ],
            finalAnswer: "Alternate telecom systems + school/community disaster readiness",
          },
        ],
      },
    ],
  },
];
