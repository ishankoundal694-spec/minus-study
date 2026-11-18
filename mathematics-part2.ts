import type { ChapterData } from "./types";

export const mathematicsChaptersPart2: ChapterData[] = [
  {
    slug: "introduction-to-trigonometry",
    number: "Ch. 8",
    title: "Introduction to Trigonometry",
    bookReference: "HPBOSE Ganit / NCERT Ch. 8",
    syllabusAlignment: "hpbose-ncert-core",
    syllabusNote:
      "One of the highest-scoring chapters in HPBOSE Class 10 Mathematics. Master ratios, standard angle table, and 3 fundamental identities.",
    estimatedMinutes: 45,
    summary:
      "Trigonometry connects angles and side lengths in right-angled triangles. Master the six trigonometric ratios, exact values for 0°, 30°, 45°, 60°, and 90°, and prove identities using sin²θ + cos²θ = 1.",
    learningObjectives: [
      "Define sin, cos, tan, cosec, sec, and cot with respect to an acute angle.",
      "Recall and substitute exact trigonometric values for 0°, 30°, 45°, 60°, 90°.",
      "Apply the three Pythagorean trigonometric identities to simplify and prove expressions.",
    ],
    formulaHighlights: [
      { label: "Fundamental Identity 1", expression: "sin²θ + cos²θ = 1" },
      { label: "Fundamental Identity 2", expression: "1 + tan²θ = sec²θ" },
      { label: "Fundamental Identity 3", expression: "1 + cot²θ = cosec²θ" },
      {
        label: "Quotient Relations",
        expression: "tan θ = sin θ / cos θ,  cot θ = cos θ / sin θ",
      },
    ],
    detailedNotes: [
      {
        heading: "1. Trigonometric Ratios in a Right Triangle",
        body: [
          "For an acute angle A in a right-angled triangle: Opposite side = Perpendicular (P), Adjacent side = Base (B), Longest side opposite 90° = Hypotenuse (H).",
          "sin A = P/H, cos A = B/H, tan A = P/B. Their reciprocals are cosec A = H/P, sec A = H/B, and cot A = B/P.",
          "Mnemonic (Hindi/English): 'Pandit Badri Prasad / Har Har Bole' → P/H (sin), B/H (cos), P/B (tan).",
        ],
      },
      {
        heading: "2. Standard Angles & Proving Identities",
        body: [
          "Key exact values: sin 0° = 0, sin 30° = 1/2, sin 45° = 1/√2, sin 60° = √3/2, sin 90° = 1. Write cos values in reverse order!",
          "Golden trick for proving identities: convert all sec, cosec, tan, and cot terms into sin and cos, take a common denominator, and apply sin²θ + cos²θ = 1.",
        ],
        workedExample: {
          problem: "If sin A = 3/4, calculate cos A and tan A.",
          steps: [
            "Let Opposite (P) = 3k and Hypotenuse (H) = 4k (where k > 0).",
            "By Pythagoras theorem: B = √(H² − P²) = √(16k² − 9k²) = √7 k.",
            "cos A = B / H = √7 k / 4k = √7 / 4.",
            "tan A = P / B = 3k / √7 k = 3 / √7.",
          ],
          answer: "cos A = √7 / 4, tan A = 3 / √7",
        },
      },
    ],
    importantQuestions: [
      {
        id: "math-8-iq-1",
        marks: 3,
        question: "Evaluate: 2 tan² 45° + cos² 30° − sin² 60°.",
        modelAnswer:
          "tan 45° = 1, cos 30° = √3/2, sin 60° = √3/2. Substituting: 2(1)² + (√3/2)² − (√3/2)² = 2 + 3/4 − 3/4 = 2.",
      },
      {
        id: "math-8-iq-2",
        marks: 5,
        question:
          "Prove that: (cosec θ − cot θ)² = (1 − cos θ) / (1 + cos θ).",
        modelAnswer:
          "LHS = (1/sin θ − cos θ/sin θ)² = (1 − cos θ)² / sin²θ. Using sin²θ = 1 − cos²θ = (1 − cos θ)(1 + cos θ), we cancel one factor of (1 − cos θ) to obtain (1 − cos θ)/(1 + cos θ) = RHS.",
      },
    ],
    practiceQuestions: [
      {
        id: "math-ch8-q1",
        subjectSlug: "mathematics",
        chapterSlug: "introduction-to-trigonometry",
        chapterTitle: "Introduction to Trigonometry",
        topic: "Trigonometric Identities",
        question: "The value of 9 sec² A − 9 tan² A is:",
        options: ["1", "9", "8", "0"],
        correctIndex: 1,
        explanation:
          "Factor out 9: 9(sec² A − tan² A) = 9(1) = 9 because 1 + tan² A = sec² A.",
        difficulty: "easy",
      },
      {
        id: "math-ch8-q2",
        subjectSlug: "mathematics",
        chapterSlug: "introduction-to-trigonometry",
        chapterTitle: "Introduction to Trigonometry",
        topic: "Standard Angle Values",
        question:
          "If sin(A − B) = 1/2 and cos(A + B) = 1/2 (0° < A + B ≤ 90°, A > B), then A and B are:",
        options: [
          "A = 45°, B = 15°",
          "A = 60°, B = 30°",
          "A = 30°, B = 15°",
          "A = 45°, B = 30°",
        ],
        correctIndex: 0,
        explanation:
          "A − B = 30° and A + B = 60°. Adding gives 2A = 90° ⇒ A = 45°, and B = 60° − 45° = 15°.",
        difficulty: "medium",
      },
    ],
    revisionPoints: [
      "Always check which acute angle is referenced—Base and Perpendicular swap between angle A and angle C!",
      "Draw the 0°–90° table cleanly on rough sheet at the start of the exam.",
      "Convert complicated identities to sin θ and cos θ first.",
    ],
    commonMistakes: [
      "Writing sin(A + B) = sin A + sin B (this is FALSE).",
      "Confusing Opposite and Adjacent sides when switching angles in a triangle.",
    ],
  },
  {
    slug: "some-applications-of-trigonometry",
    number: "Ch. 9",
    title: "Some Applications of Trigonometry",
    bookReference: "HPBOSE Ganit / NCERT Ch. 9 (Heights & Distances)",
    syllabusAlignment: "hpbose-ncert-core",
    syllabusNote:
      "Guaranteed 3-mark or 5-mark diagram-based board question in HPBOSE Class 10. Always draw a neat labelled right-triangle diagram first!",
    estimatedMinutes: 35,
    summary:
      "Apply trigonometric ratios (tan, sin, cos) to real-world height and distance problems—measuring towers, trees broken by wind, bridges, and buildings using Angles of Elevation and Angles of Depression.",
    learningObjectives: [
      "Differentiate clearly between Line of Sight, Angle of Elevation, and Angle of Depression.",
      "Draw accurate labelled right-angled triangle diagrams from word problems.",
      "Solve single-triangle and double-triangle height/distance problems cleanly.",
    ],
    formulaHighlights: [
      {
        label: "Most Used Ratio (Height & Ground)",
        expression: "tan θ = Height (Opposite) / Horizontal Distance (Adjacent)",
      },
      {
        label: "Key Exact tan Values",
        expression: "tan 30° = 1/√3  |  tan 45° = 1  |  tan 60° = √3",
      },
      {
        label: "Angle of Depression Rule",
        expression: "Angle of Depression from top = Angle of Elevation from bottom (Alternate interior ∠s)",
      },
    ],
    detailedNotes: [
      {
        heading: "1. Angles of Elevation & Depression",
        body: [
          "Line of Sight: Straight line drawn from the observer's eye to the viewed object.",
          "Angle of Elevation: Formed ABOVE the horizontal level when looking UP at an object (e.g., top of a tower or kite).",
          "Angle of Depression: Formed BELOW the horizontal level when looking DOWN at an object (e.g., car on road from a building top). Always draw a horizontal dashed line at the observer's eye—then transfer the angle down to the triangle base via alternate interior angles!",
        ],
        workedExample: {
          problem:
            "The angle of elevation of the top of a tower from a point on the ground 30 m away from its foot is 30°. Find the height of the tower.",
          steps: [
            "Draw right triangle ABC with right angle at B (foot of tower), BC = 30 m, ∠ACB = 30°, and height AB = h.",
            "Relate Opposite (AB) and Adjacent (BC): tan 30° = AB / BC.",
            "Substitute tan 30° = 1/√3: 1/√3 = h / 30 ⇒ h = 30 / √3.",
            "Rationalise denominator: h = (30√3) / 3 = 10√3 m (≈ 17.32 m).",
          ],
          answer: "Height of the tower = 10√3 m",
        },
      },
      {
        heading: "2. Double-Triangle Strategy",
        body: [
          "Many 5-mark board problems have TWO overlapping right triangles sharing a common height h or common base x (e.g., moving closer to a tower changes elevation from 30° to 60°).",
          "Step 1: Apply tan θ in the smaller triangle (usually 45° or 60°) to express one unknown in terms of the other. Step 2: Apply tan θ in the larger triangle and substitute. Step 3: Rationalise √3 in the denominator before concluding.",
        ],
      },
    ],
    importantQuestions: [
      {
        id: "math-9-iq-1",
        marks: 3,
        question:
          "A tree breaks due to storm and the broken part bends so that the top of the tree touches the ground making an angle 30° with it. The distance between the foot of the tree to the point where the top touches the ground is 8 m. Find the height of the tree.",
        modelAnswer:
          "Let standing part = AB and broken hypotenuse = AC (original tree height = AB + AC). Given BC = 8 m, ∠ACB = 30°. tan 30° = AB/8 ⇒ AB = 8/√3 m. cos 30° = 8/AC ⇒ √3/2 = 8/AC ⇒ AC = 16/√3 m. Total height = AB + AC = 24/√3 = 8√3 m.",
        examTip:
          "Remember original tree height is BOTH standing part + broken bent part (AB + AC)!",
      },
      {
        id: "math-9-iq-2",
        marks: 5,
        question:
          "From the top of a 7 m high building, the angle of elevation of the top of a cable tower is 60° and the angle of depression of its foot is 45°. Determine the height of the tower.",
        modelAnswer:
          "Let building AB = 7 m and tower CD. Draw AE ⊥ CD, so ED = 7 m and AE = BD. From depression 45° in △ABD: tan 45° = 7/BD ⇒ BD = 7 m = AE. In upper △AEC: tan 60° = CE/AE ⇒ √3 = CE/7 ⇒ CE = 7√3 m. Total tower height CD = CE + ED = 7√3 + 7 = 7(√3 + 1) m.",
      },
    ],
    practiceQuestions: [
      {
        id: "math-ch9-q1",
        subjectSlug: "mathematics",
        chapterSlug: "some-applications-of-trigonometry",
        chapterTitle: "Some Applications of Trigonometry",
        topic: "Angle of Elevation",
        question:
          "If the length of the shadow of a vertical pole equals its height, then the angle of elevation of the sun is:",
        options: ["30°", "45°", "60°", "90°"],
        correctIndex: 1,
        explanation:
          "tan θ = Height / Shadow = h / h = 1. Since tan 45° = 1, the angle of elevation is 45°.",
        difficulty: "easy",
      },
      {
        id: "math-ch9-q2",
        subjectSlug: "mathematics",
        chapterSlug: "some-applications-of-trigonometry",
        chapterTitle: "Some Applications of Trigonometry",
        topic: "Heights & Distances",
        question:
          "A kite is flying at a height of 60 m above the ground. Its string is inclined at 60° to the ground. Assuming no slack, the length of the string is:",
        options: ["40√3 m", "60√3 m", "30√3 m", "120 m"],
        correctIndex: 0,
        explanation:
          "sin 60° = Height / String ⇒ √3/2 = 60 / L ⇒ L = 120 / √3 = 40√3 m.",
        difficulty: "medium",
      },
    ],
    revisionPoints: [
      "Always draw a neat labelled diagram—HPBOSE awards step marks for the correct diagram!",
      "At 45°, Height = Horizontal Distance (because tan 45° = 1).",
      "Always rationalise denominators like 24/√3 → 8√3.",
    ],
    commonMistakes: [
      "Marking the Angle of Depression against the vertical wall instead of the horizontal line!",
      "Forgetting to add the observer's height (e.g., 1.5 m boy) or building height at the final step.",
    ],
  },
  {
    slug: "circles",
    number: "Ch. 10",
    title: "Circles",
    bookReference: "HPBOSE Ganit / NCERT Ch. 10",
    syllabusAlignment: "hpbose-ncert-core",
    syllabusNote:
      "Core Geometry chapter. Both NCERT theorems (Theorem 10.1 radius ⊥ tangent and Theorem 10.2 equal tangents from external point) are favourite HPBOSE proofs.",
    estimatedMinutes: 35,
    summary:
      "Understand tangents vs. secants to a circle, prove that a tangent is always perpendicular to the radius at the point of contact, and prove that tangents drawn from an external point to a circle are equal in length.",
    learningObjectives: [
      "Distinguish between secant (2 points) and tangent (1 point of contact).",
      "State and apply Theorem 10.1: Tangent ⊥ Radius at point of contact.",
      "State, prove, and apply Theorem 10.2: Lengths of two tangents from an external point are equal.",
      "Solve quadrilateral circumscribing a circle and concentric-circle chord problems.",
    ],
    formulaHighlights: [
      {
        label: "Theorem 10.1 (Right Triangle)",
        expression: "OP ⊥ PT ⇒ OT² = OP² + PT²   (Pythagoras)",
      },
      {
        label: "Theorem 10.2 (External Point P)",
        expression: "PA = PB   and   ∠AOB + ∠APB = 180° (Supplementary)",
      },
      {
        label: "Circumscribed Quadrilateral ABCD",
        expression: "AB + CD = AD + BC",
      },
    ],
    detailedNotes: [
      {
        heading: "1. Two Foundational Tangent Theorems",
        body: [
          "Theorem 10.1: The tangent at any point of a circle is perpendicular to the radius through the point of contact (∠OPT = 90°). This creates a right-angled triangle allowing immediate use of Pythagoras theorem.",
          "Theorem 10.2: The lengths of tangents drawn from an external point to a circle are equal (PA = PB). Proof uses RHS congruence on △OAP and △OBP (OA = OB radii, OP = OP common hypotenuse, ∠OAP = ∠OBP = 90°).",
          "Key consequence: In quadrilateral OAPB, since ∠A = ∠B = 90°, the angle between the two tangents (∠APB) and the central angle (∠AOB) are ALWAYS supplementary: ∠APB + ∠AOB = 180°.",
        ],
        workedExample: {
          problem:
            "Two concentric circles have radii 5 cm and 3 cm. Find the length of the chord of the larger circle which touches the smaller circle.",
          steps: [
            "Let O be the common centre, AB be the chord touching the inner circle at P.",
            "Since AB is a tangent to the smaller circle at P, OP ⊥ AB (Theorem 10.1), and perpendicular from centre bisects the chord (AP = PB).",
            "In right △OPA: OA = 5 cm (outer radius), OP = 3 cm (inner radius).",
            "By Pythagoras: AP = √(5² − 3²) = √(25 − 9) = √16 = 4 cm.",
            "Full chord length AB = 2 × AP = 8 cm.",
          ],
          answer: "Length of the chord = 8 cm",
        },
      },
    ],
    importantQuestions: [
      {
        id: "math-10-iq-1",
        marks: 3,
        question:
          "Prove that the lengths of tangents drawn from an external point to a circle are equal.",
        modelAnswer:
          "Given: Circle with centre O and two tangents PQ and PR from external point P. To prove: PQ = PR. Construction: Join OQ, OR, and OP. Proof: By Theorem 10.1, ∠OQP = ∠ORP = 90°. In right △OQP and △ORP: OQ = OR (radii), OP = OP (common hypotenuse). By RHS congruence, △OQP ≅ △ORP. Hence PQ = PR (CPCT).",
      },
      {
        id: "math-10-iq-2",
        marks: 3,
        question:
          "A quadrilateral ABCD is drawn to circumscribe a circle. Prove that AB + CD = AD + BC.",
        modelAnswer:
          "Let circle touch sides AB, BC, CD, DA at P, Q, R, S respectively. By Theorem 10.2 (equal tangents from each vertex): AP = AS, BP = BQ, CR = CQ, DR = DS. Adding all four equations: (AP + BP) + (CR + DR) = (AS + DS) + (BQ + CQ) ⇒ AB + CD = AD + BC.",
      },
    ],
    practiceQuestions: [
      {
        id: "math-ch10-q1",
        subjectSlug: "mathematics",
        chapterSlug: "circles",
        chapterTitle: "Circles",
        topic: "Tangent-Radius Angle",
        question:
          "If tangents PA and PB from a point P to a circle with centre O are inclined to each other at angle 80°, then ∠POA equals:",
        options: ["50°", "60°", "70°", "80°"],
        correctIndex: 0,
        explanation:
          "OP bisects ∠APB so ∠OPA = 40°. Since ∠OAP = 90°, in △OAP: ∠POA = 180° − (90° + 40°) = 50°.",
        difficulty: "medium",
      },
      {
        id: "math-ch10-q2",
        subjectSlug: "mathematics",
        chapterSlug: "circles",
        chapterTitle: "Circles",
        topic: "Pythagoras with Tangents",
        question:
          "From a point Q, the length of the tangent to a circle is 24 cm and the distance of Q from the centre is 25 cm. The radius of the circle is:",
        options: ["7 cm", "12 cm", "15 cm", "24.5 cm"],
        correctIndex: 0,
        explanation:
          "r = √(25² − 24²) = √(625 − 576) = √49 = 7 cm.",
        difficulty: "easy",
      },
    ],
    revisionPoints: [
      "A circle can have at most 2 parallel tangents (at opposite ends of a diameter).",
      "From an internal point: 0 tangents; on the circle: 1 tangent; external point: 2 equal tangents.",
      "Always remember ∠APB + ∠AOB = 180°.",
    ],
    commonMistakes: [
      "Assuming the hypotenuse is the tangent instead of the centre-to-external-point distance OP!",
      "Confusing ∠POA (half of central angle) with ∠AOB (full central angle).",
    ],
  },
  {
    slug: "areas-related-to-circles",
    number: "Ch. 11",
    title: "Areas Related to Circles",
    bookReference: "HPBOSE Ganit / NCERT Ch. 11",
    syllabusAlignment: "hpbose-ncert-core",
    syllabusNote:
      "Core Mensuration chapter. Master Area of Sector, Length of Arc, Area of Segment, and Clock minute-hand swept area problems.",
    estimatedMinutes: 35,
    summary:
      "Compute exact lengths of circular arcs, areas of minor and major sectors, areas of circular segments (sector minus triangle), and real-life areas swept by clock hands, car wipers, and horse grazing ropes.",
    learningObjectives: [
      "Calculate arc length and sector area for any central angle θ.",
      "Compute area of major sector = πr² − area of minor sector.",
      "Find area of minor segment = Area of sector − Area of △OAB.",
      "Solve clock minute-hand angle problems (6° per minute).",
    ],
    formulaHighlights: [
      {
        label: "Length of Arc",
        expression: "l = (θ / 360°) × 2πr",
      },
      {
        label: "Area of Sector",
        expression: "A_sector = (θ / 360°) × πr²   =   (1/2) × l × r",
      },
      {
        label: "Area of Minor Segment",
        expression: "A_segment = (θ / 360°)πr² − Area(△OAB)",
      },
      {
        label: "Clock Minute Hand Angle",
        expression: "In 1 minute = 6°  |  In 5 minutes = 30°",
      },
    ],
    detailedNotes: [
      {
        heading: "1. Sectors, Arcs & Clock Problems",
        body: [
          "A sector is the pie-slice region bounded by two radii and an arc. A quadrant is a sector with θ = 90° (Area = ¼ πr²).",
          "Clock shortcut: A minute hand completes 360° in 60 minutes, so it sweeps 360°/60 = 6° every minute (and 30° every 5 minutes).",
          "Use π = 22/7 unless the problem explicitly instructs to use π = 3.14.",
        ],
        workedExample: {
          problem:
            "The length of the minute hand of a clock is 14 cm. Find the area swept by the minute hand in 5 minutes.",
          steps: [
            "Radius r = 14 cm.",
            "Angle swept in 5 minutes: θ = (360° / 60) × 5 = 30°.",
            "Area of sector = (θ / 360°) × πr² = (30 / 360) × (22/7) × 14 × 14.",
            "Simplify: (1/12) × 22 × 2 × 14 = 616 / 12 = 154 / 3 cm² (≈ 51.33 cm²).",
          ],
          answer: "154/3 cm² (or 51.33 cm²)",
        },
      },
      {
        heading: "2. Area of a Segment",
        body: [
          "A segment is bounded by a chord and its corresponding arc: Area(Minor Segment) = Area(Minor Sector) − Area(△OAB).",
          "Fast triangle area formulas for central angle θ: if θ = 90°, Area(△OAB) = ½ r²; if θ = 60°, △OAB is equilateral so Area = (√3 / 4) r²; in general Area(△OAB) = ½ r² sin θ.",
        ],
      },
    ],
    importantQuestions: [
      {
        id: "math-11-iq-1",
        marks: 2,
        question:
          "Find the area of a quadrant of a circle whose circumference is 22 cm.",
        modelAnswer:
          "2πr = 22 ⇒ 2 × (22/7) × r = 22 ⇒ r = 7/2 cm. Area of quadrant = (1/4)πr² = (1/4) × (22/7) × (7/2) × (7/2) = 77/8 cm² = 9.625 cm².",
      },
      {
        id: "math-11-iq-2",
        marks: 3,
        question:
          "A chord of a circle of radius 10 cm subtends a right angle at the centre. Find the area of the corresponding minor segment (use π = 3.14).",
        modelAnswer:
          "Area of minor sector = (90/360) × 3.14 × 10 × 10 = 78.5 cm². Area of right △OAB = (1/2) × 10 × 10 = 50 cm². Area of minor segment = 78.5 − 50 = 28.5 cm².",
      },
    ],
    practiceQuestions: [
      {
        id: "math-ch11-q1",
        subjectSlug: "mathematics",
        chapterSlug: "areas-related-to-circles",
        chapterTitle: "Areas Related to Circles",
        topic: "Sector Area Formula",
        question:
          "Area of a sector of angle p (in degrees) of a circle with radius R is:",
        options: [
          "(p / 180) × 2πR",
          "(p / 180) × πR²",
          "(p / 360) × 2πR",
          "(p / 720) × 2πR²",
        ],
        correctIndex: 3,
        explanation:
          "(p / 720) × 2πR² simplifies cleanly by cancelling 2 to (p / 360) × πR², which is the exact area of a sector!",
        difficulty: "medium",
      },
      {
        id: "math-ch11-q2",
        subjectSlug: "mathematics",
        chapterSlug: "areas-related-to-circles",
        chapterTitle: "Areas Related to Circles",
        topic: "Arc Length",
        question:
          "In a circle of radius 21 cm, an arc subtends an angle of 60° at the centre. The length of the arc is:",
        options: ["11 cm", "22 cm", "44 cm", "21 cm"],
        correctIndex: 1,
        explanation:
          "l = (60/360) × 2 × (22/7) × 21 = (1/6) × 2 × 22 × 3 = 22 cm.",
        difficulty: "easy",
      },
    ],
    revisionPoints: [
      "Always verify whether the question asks for radius or diameter (r = d/2).",
      "Major Sector Area = πr² − Minor Sector Area; Major Segment = πr² − Minor Segment.",
      "Do not confuse Sector (uses 2 radii) with Segment (uses a chord).",
    ],
    commonMistakes: [
      "Forgetting to subtract triangle area when computing Segment area.",
      "Substituting diameter directly as r into πr².",
    ],
  },
  {
    slug: "surface-areas-and-volumes",
    number: "Ch. 12",
    title: "Surface Areas and Volumes",
    bookReference: "HPBOSE Ganit / NCERT Ch. 12",
    syllabusAlignment: "hpbose-ncert-core",
    syllabusNote:
      "Core Mensuration chapter focused on combinations of solids (capsule, tent, toy cone-on-hemisphere, hollowed cylinder). Keep π factored out until the very end!",
    estimatedMinutes: 40,
    summary:
      "Calculate total surface areas and combined volumes of real-world 3D composite solids made by joining or scooping out cubes, cuboids, cylinders, cones, spheres, and hemispheres.",
    learningObjectives: [
      "Recall exact CSA, TSA, and Volume formulas for all 6 standard 3D solids.",
      "Identify which surfaces are VISIBLE (outer) vs. hidden (joined) when computing surface area of combined solids.",
      "Factor out common terms (π, r) before multiplying to cut calculation errors in half.",
    ],
    formulaHighlights: [
      {
        label: "Cylinder",
        expression: "CSA = 2πrh  |  TSA = 2πr(r + h)  |  V = πr²h",
      },
      {
        label: "Cone (l = √(r² + h²))",
        expression: "CSA = πrl  |  TSA = πr(r + l)  |  V = (1/3)πr²h",
      },
      {
        label: "Sphere & Hemisphere",
        expression: "Sphere: SA = 4πr², V = (4/3)πr³  |  Hemisphere: CSA = 2πr², TSA = 3πr², V = (2/3)πr³",
      },
    ],
    detailedNotes: [
      {
        heading: "1. Golden Rules for Combined Solids",
        body: [
          "Surface Area Rule: NEVER blindly add the TSAs of two joined solids—because the circular face where they glue together is hidden inside! Instead, add ONLY the visible curved/flat outer faces (e.g., Toy = Cone on Hemisphere ⇒ Total SA = CSA of Cone + CSA of Hemisphere = πrl + 2πr² = πr(l + 2r)).",
          "Hollowed-Out Solid Rule: When a conical cavity is hollowed out of a solid cylinder, Volume SUBTRACTS (V_cyl − V_cone), whereas Surface Area ADDS the inner cone CSA because you can now touch/paint the inside wall!",
          "Volume Rule: Volume of joined solids always adds cleanly (V₁ + V₂), and when a solid is melted/recast, Volume stays conserved.",
        ],
        workedExample: {
          problem:
            "Two cubes each of volume 64 cm³ are joined end to end. Find the surface area of the resulting cuboid.",
          steps: [
            "Volume of one cube = a³ = 64 cm³ ⇒ side a = ∛64 = 4 cm.",
            "When two cubes join end to end: length l = 4 + 4 = 8 cm, breadth b = 4 cm, height h = 4 cm.",
            "TSA of cuboid = 2(lb + bh + hl) = 2(8×4 + 4×4 + 4×8) = 2(32 + 16 + 32) = 2(80) = 160 cm².",
          ],
          answer: "Surface area of resulting cuboid = 160 cm²",
        },
      },
    ],
    importantQuestions: [
      {
        id: "math-12-iq-1",
        marks: 3,
        question:
          "A medicine capsule is in the shape of a cylinder with two hemispheres stuck to each of its ends. The length of the entire capsule is 14 mm and the diameter is 5 mm. Find its surface area.",
        modelAnswer:
          "Radius r = 5/2 = 2.5 mm. Length of cylindrical part h = 14 − (2.5 + 2.5) = 9 mm. Surface area = CSA of cylinder + 2 × CSA of hemisphere = 2πrh + 2(2πr²) = 2πr(h + 2r) = 2 × (22/7) × 2.5 × (9 + 5) = (110/7) × 14 = 220 mm².",
        examTip:
          "Always subtract the radii of hemispherical ends from TOTAL length to get cylinder height h!",
      },
      {
        id: "math-12-iq-2",
        marks: 5,
        question:
          "A solid is in the shape of a cone standing on a hemisphere with both their radii being equal to 1 cm and the height of the cone is equal to its radius. Find the volume of the solid in terms of π.",
        modelAnswer:
          "Given r = 1 cm, h = 1 cm. Volume = V_cone + V_hemisphere = (1/3)πr²h + (2/3)πr³ = (1/3)π(1)²(1) + (2/3)π(1)³ = (1/3)π + (2/3)π = π cm³.",
      },
    ],
    practiceQuestions: [
      {
        id: "math-ch12-q1",
        subjectSlug: "mathematics",
        chapterSlug: "surface-areas-and-volumes",
        chapterTitle: "Surface Areas and Volumes",
        topic: "Slant Height of Cone",
        question:
          "A right circular cone has radius 6 cm and height 8 cm. Its slant height l is:",
        options: ["10 cm", "12 cm", "14 cm", "√28 cm"],
        correctIndex: 0,
        explanation: "l = √(r² + h²) = √(6² + 8²) = √(36 + 64) = √100 = 10 cm.",
        difficulty: "easy",
      },
      {
        id: "math-ch12-q2",
        subjectSlug: "mathematics",
        chapterSlug: "surface-areas-and-volumes",
        chapterTitle: "Surface Areas and Volumes",
        topic: "Combined Solids",
        question:
          "A solid cylinder of radius r and height h has a hemisphere of radius r mounted on top. The total surface area of the solid is:",
        options: [
          "2πrh + 2πr²",
          "2πrh + 3πr²",
          "2πrh + 4πr²",
          "πr²h + (2/3)πr³",
        ],
        correctIndex: 1,
        explanation:
          "Visible surfaces = bottom base (πr²) + cylinder CSA (2πrh) + top hemisphere CSA (2πr²) = 2πrh + 3πr².",
        difficulty: "medium",
      },
    ],
    revisionPoints: [
      "Always write final units: cm² / m² for Surface Area and cm³ / m³ for Volume.",
      "Factor out common terms like πr before substituting 22/7—the 7 almost always cancels cleanly!",
      "For a cone mounted on a hemisphere: Cone height = Total height − Radius.",
    ],
    commonMistakes: [
      "Using total toy height as cone height instead of subtracting the hemisphere radius.",
      "Using vertical height h instead of slant height l = √(r² + h²) in Cone CSA (πrl).",
    ],
  },
  {
    slug: "statistics",
    number: "Ch. 13",
    title: "Statistics",
    bookReference: "HPBOSE Ganit / NCERT Ch. 13",
    syllabusAlignment: "hpbose-ncert-core",
    syllabusNote:
      "Guaranteed 5-mark HPBOSE board question! Master Mean (Direct & Assumed Mean), Mode, Median of grouped data, missing-frequency problems, and the Empirical Formula.",
    estimatedMinutes: 40,
    summary:
      "Summarise grouped frequency distributions accurately using Mean, Median, and Mode, handle missing frequency equations, and connect all three averages via the Empirical Relation: 3 Median = Mode + 2 Mean.",
    learningObjectives: [
      "Compute Mean of grouped data via Direct, Assumed Mean, or Step-Deviation method.",
      "Calculate Mode and Median of continuous grouped frequency tables.",
      "Find missing frequencies f₁ and f₂ when Median or Mean is given.",
      "Apply 3 Median = Mode + 2 Mean accurately.",
    ],
    formulaHighlights: [
      { label: "Direct Mean", expression: "x̄ = Σ(fᵢ xᵢ) / Σfᵢ" },
      {
        label: "Assumed Mean Method",
        expression: "x̄ = a + [ Σ(fᵢ dᵢ) / Σfᵢ ],  where dᵢ = xᵢ − a",
      },
      {
        label: "Mode (Grouped)",
        expression: "Mode = l + [ (f₁ − f₀) / (2f₁ − f₀ − f₂) ] × h",
      },
      {
        label: "Median (Grouped)",
        expression: "Median = l + [ (n/2 − cf) / f ] × h",
      },
      {
        label: "Empirical Relation",
        expression: "3 Median = Mode + 2 Mean",
      },
    ],
    detailedNotes: [
      {
        heading: "1. Mean, Mode & Median Step-by-Step Guide",
        body: [
          "Class mark xᵢ = (Upper limit + Lower limit) / 2. Make sure class intervals are continuous (e.g., convert 10–19, 20–29 into 9.5–19.5, 19.5–29.5 by subtracting 0.5 from lower limit and adding 0.5 to upper limit) before applying Mode or Median formulas!",
          "Modal class = interval with MAXIMUM frequency f₁. Then f₀ = frequency just before modal class, f₂ = frequency just after modal class, l = lower limit of modal class, h = class size.",
          "Median class = first interval whose cumulative frequency (cf) is ≥ n/2. Critical detail: in the Median formula, 'cf' is the cumulative frequency of the class PRECEDING the median class, while 'f' is the frequency OF the median class.",
        ],
        workedExample: {
          problem:
            "For a grouped distribution, Modal class is 30–40 with f₁ = 20, preceding frequency f₀ = 12, succeeding frequency f₂ = 11. Find the Mode.",
          steps: [
            "Identify values: l = 30, h = 10, f₁ = 20, f₀ = 12, f₂ = 11.",
            "Mode = l + [(f₁ − f₀) / (2f₁ − f₀ − f₂)] × h.",
            "Mode = 30 + [(20 − 12) / (40 − 12 − 11)] × 10 = 30 + (8 / 17) × 10.",
            "Mode = 30 + 80/17 ≈ 30 + 4.71 = 34.71.",
          ],
          answer: "Mode ≈ 34.71",
        },
      },
    ],
    importantQuestions: [
      {
        id: "math-13-iq-1",
        marks: 2,
        question:
          "If the Mean of a distribution is 24 and its Median is 26, find its Mode using the empirical relationship.",
        modelAnswer:
          "Using 3 Median = Mode + 2 Mean ⇒ Mode = 3 Median − 2 Mean = 3(26) − 2(24) = 78 − 48 = 30.",
      },
      {
        id: "math-13-iq-2",
        marks: 5,
        question:
          "The median of a distribution with n = 60 is 28.5, lying in the class 20–30 (f = 20, preceding cf = 5 + x). Find x, and if total sum 45 + x + y = 60, find y.",
        modelAnswer:
          "Here l = 20, h = 10, n/2 = 30, f = 20, cf = 5 + x. Using Median = l + [(n/2 − cf)/f] × h: 28.5 = 20 + [(30 − (5 + x))/20] × 10 ⇒ 8.5 = (25 − x)/2 ⇒ 17 = 25 − x ⇒ x = 8. Since 45 + x + y = 60 ⇒ y = 60 − 53 = 7.",
      },
    ],
    practiceQuestions: [
      {
        id: "math-ch13-q1",
        subjectSlug: "mathematics",
        chapterSlug: "statistics",
        chapterTitle: "Statistics",
        topic: "Empirical Relation",
        question:
          "If Mean = 20 and Mode = 26, then by the empirical formula the Median is:",
        options: ["22", "23", "24", "21"],
        correctIndex: 0,
        explanation:
          "3 Median = Mode + 2 Mean = 26 + 2(20) = 66 ⇒ Median = 66 / 3 = 22.",
        difficulty: "easy",
      },
      {
        id: "math-ch13-q2",
        subjectSlug: "mathematics",
        chapterSlug: "statistics",
        chapterTitle: "Statistics",
        topic: "Class Mark",
        question:
          "What is the class mark of the class interval 25–35?",
        options: ["25", "30", "35", "10"],
        correctIndex: 1,
        explanation: "Class mark = (Lower limit + Upper limit)/2 = (25 + 35)/2 = 30.",
        difficulty: "easy",
      },
    ],
    revisionPoints: [
      "Always double-check that Σfᵢ matches the given total n.",
      "In Median formula, cf belongs to the class BEFORE the median class!",
      "Sanity check: Mode MUST lie inside the modal class, and Median MUST lie inside the median class.",
    ],
    commonMistakes: [
      "Using the median class's own cumulative frequency instead of the preceding class's cf.",
      "Forgetting to make discontinuous intervals (like 10–19, 20–29) continuous before finding l and h.",
    ],
  },
  {
    slug: "probability",
    number: "Ch. 14",
    title: "Probability",
    bookReference: "HPBOSE Ganit / NCERT Ch. 14",
    syllabusAlignment: "hpbose-ncert-core",
    syllabusNote:
      "Fastest-scoring chapter in HPBOSE Class 10 Maths! Master coins, dice (single & two dice = 36 outcomes), 52 playing cards, and complementary events.",
    estimatedMinutes: 30,
    summary:
      "Calculate exact theoretical (classical) probabilities of single events using equally likely outcomes—mastering coins, dice sums, 52-card decks, defective bulbs, and complementary events P(not E) = 1 − P(E).",
    learningObjectives: [
      "Compute P(E) = Favourable outcomes / Total equally likely outcomes.",
      "Verify bounds 0 ≤ P(E) ≤ 1, sure events (1), impossible events (0), and P(E) + P(not E) = 1.",
      "Enumerate sample spaces for 2 coins (4), 3 coins (8), 2 dice (36), and 52 playing cards accurately.",
    ],
    formulaHighlights: [
      {
        label: "Classical Probability",
        expression: "P(E) = Number of outcomes favourable to E / Total equally likely outcomes",
      },
      {
        label: "Bounds & Complement",
        expression: "0 ≤ P(E) ≤ 1   and   P(not E) = 1 − P(E)",
      },
      {
        label: "52-Card Deck Quick Map",
        expression: "26 Red (13♥ 13♦) | 26 Black (13♠ 13♣) | 12 Face Cards (J,Q,K) | 4 Aces",
      },
    ],
    detailedNotes: [
      {
        heading: "1. Sample Spaces You Must Know Cold",
        body: [
          "1 Coin: {H, T} (2 outcomes). 2 Coins: {HH, HT, TH, TT} (4 outcomes). 3 Coins: 8 outcomes (HHH, HHT, HTH, THH, HTT, THT, TTH, TTT).",
          "1 Die: {1, 2, 3, 4, 5, 6} (6 outcomes; primes are 2, 3, 5—remember 1 is NOT prime!). 2 Dice: 6 × 6 = 36 ordered pairs; doublets {(1,1)...(6,6)} = 6 outcomes.",
          "52 Playing Cards: 4 suits × 13 cards each. Face cards (picture cards) are ONLY Jack, Queen, King = 3 per suit × 4 = 12 total (6 Red, 6 Black). Aces are NOT face cards!",
        ],
        workedExample: {
          problem:
            "Two dice are thrown at the same time. Find the probability that the sum of the two numbers appearing on top is (i) 8, (ii) 13.",
          steps: [
            "Total equally likely outcomes when throwing two dice = 6 × 6 = 36.",
            "(i) Pairs giving sum 8: (2,6), (3,5), (4,4), (5,3), (6,2) → 5 favourable outcomes.",
            "P(sum = 8) = 5 / 36.",
            "(ii) Maximum possible sum on two dice is 6 + 6 = 12, so sum 13 is an impossible event → P(sum = 13) = 0.",
          ],
          answer: "(i) 5/36, (ii) 0",
        },
      },
    ],
    importantQuestions: [
      {
        id: "math-14-iq-1",
        marks: 2,
        question: "If P(E) = 0.05, what is the probability of 'not E'?",
        modelAnswer: "P(not E) = 1 − P(E) = 1 − 0.05 = 0.95.",
      },
      {
        id: "math-14-iq-2",
        marks: 3,
        question:
          "One card is drawn from a well-shuffled deck of 52 cards. Find the probability of getting (i) a king of red colour, (ii) a face card, (iii) the queen of diamonds.",
        modelAnswer:
          "Total outcomes = 52. (i) Red kings = 2 ⇒ P = 2/52 = 1/26. (ii) Face cards = 12 ⇒ P = 12/52 = 3/13. (iii) Queen of diamonds = 1 ⇒ P = 1/52.",
      },
    ],
    practiceQuestions: [
      {
        id: "math-ch14-q1",
        subjectSlug: "mathematics",
        chapterSlug: "probability",
        chapterTitle: "Probability",
        topic: "Probability Bounds",
        question:
          "Which of the following CANNOT be the probability of an event?",
        options: ["2/3", "−1.5", "15%", "0.7"],
        correctIndex: 1,
        explanation:
          "Probability of any event always lies between 0 and 1 inclusive (0 ≤ P(E) ≤ 1). A negative value like −1.5 is impossible.",
        difficulty: "easy",
      },
      {
        id: "math-ch14-q2",
        subjectSlug: "mathematics",
        chapterSlug: "probability",
        chapterTitle: "Probability",
        topic: "Playing Cards",
        question:
          "A card is drawn at random from a deck of 52 cards. What is the probability of drawing a red face card?",
        options: ["3/26", "6/13", "3/13", "1/26"],
        correctIndex: 0,
        explanation:
          "Red face cards = J, Q, K of Hearts + J, Q, K of Diamonds = 6 cards. P = 6/52 = 3/26.",
        difficulty: "easy",
      },
    ],
    revisionPoints: [
      "Sum of probabilities of all elementary events of an experiment is always 1.",
      "Always reduce fractions to lowest terms (e.g., 6/52 → 3/26).",
      "1 is neither prime nor composite—primes on a die are {2, 3, 5}.",
    ],
    commonMistakes: [
      "Counting 1 as a prime number on a die!",
      "Counting Aces as face cards (there are 12 face cards, not 16).",
    ],
  },
];
