import type { ChapterData } from "./types";

export const mathematicsChaptersPart1: ChapterData[] = [
  {
    slug: "real-numbers",
    number: "Ch. 1",
    title: "Real Numbers",
    bookReference: "HPBOSE Ganit / NCERT Ch. 1",
    syllabusAlignment: "hpbose-ncert-core",
    syllabusNote:
      "Core HPBOSE exam chapter. Focus strongly on Fundamental Theorem of Arithmetic, HCF × LCM relation, and irrationality proofs.",
    estimatedMinutes: 35,
    summary:
      "Real Numbers builds the foundation of number theory in Class 10. You learn how every composite number breaks uniquely into prime factors (Fundamental Theorem of Arithmetic), how to compute HCF and LCM efficiently, and how to prove irrationality of numbers such as √2, √3, and 5 − √3 using proof by contradiction.",
    learningObjectives: [
      "State and apply the Fundamental Theorem of Arithmetic.",
      "Find HCF and LCM of positive integers using prime factorisation.",
      "Verify HCF(a, b) × LCM(a, b) = a × b for any two positive integers.",
      "Prove irrationality of √p and simple combinations using contradiction.",
    ],
    formulaHighlights: [
      {
        label: "HCF & LCM Identity (2 numbers)",
        expression: "HCF(a, b) × LCM(a, b) = a × b",
      },
      {
        label: "Prime Factorisation",
        expression:
          "Every composite n > 1 = p₁^a₁ × p₂^a₂ × ... (unique up to order)",
      },
    ],
    detailedNotes: [
      {
        heading: "1. Fundamental Theorem of Arithmetic",
        body: [
          "Every composite number can be expressed (factorised) as a product of primes, and this factorisation is unique, apart from the order in which the prime factors occur.",
          "Prime factorisation lets us determine whether a number like 6^n can end with the digit 0. For any integer to end with 0, it must be divisible by 10, meaning its prime factorisation must contain both 2 and 5. Since 6^n = (2 × 3)^n contains only primes 2 and 3, it can never end with 0.",
        ],
        keyFormulaOrRule:
          "HCF = Product of smallest powers of common prime factors; LCM = Product of greatest powers of all prime factors involved.",
        workedExample: {
          problem:
            "Find the HCF and LCM of 96 and 404 by prime factorisation, and verify HCF × LCM = product of the two numbers.",
          steps: [
            "Prime factorise 96: 96 = 2⁵ × 3.",
            "Prime factorise 404: 404 = 2² × 101.",
            "Common prime factor with smallest power: HCF(96, 404) = 2² = 4.",
            "LCM(96, 404) = (96 × 404) / 4 = 96 × 101 = 9696.",
            "Verification: HCF × LCM = 4 × 9696 = 38784, and 96 × 404 = 38784.",
          ],
          answer: "HCF = 4, LCM = 9696",
        },
      },
      {
        heading: "2. Revisiting Irrational Numbers (Proof by Contradiction)",
        body: [
          "Theorem: Let p be a prime number. If p divides a², then p divides a, where a is a positive integer.",
          "To prove √2 is irrational: assume the opposite—that √2 is rational. Write √2 = a/b where a and b are co-prime integers (HCF = 1) and b ≠ 0. Squaring both sides gives 2b² = a², so 2 divides a², which implies 2 divides a. Let a = 2c. Substituting gives 2b² = 4c² ⇒ b² = 2c², so 2 also divides b. Thus a and b share a common factor 2, contradicting that they are co-prime. Hence √2 is irrational.",
          "Note that the sum or difference of a rational and an irrational number is always irrational, and the product or quotient of a non-zero rational and an irrational number is irrational.",
        ],
        workedExample: {
          problem: "Prove that 3 + 2√5 is irrational, given √5 is irrational.",
          steps: [
            "Assume to the contrary that 3 + 2√5 is rational.",
            "Then 3 + 2√5 = a/b for integers a, b (b ≠ 0).",
            "Rearranging gives 2√5 = (a/b) − 3 = (a − 3b)/b.",
            "Therefore √5 = (a − 3b) / (2b).",
            "Since a and b are integers, (a − 3b)/(2b) is rational, which implies √5 is rational—contradicting that √5 is irrational.",
          ],
          answer: "Therefore, 3 + 2√5 is irrational.",
        },
      },
    ],
    importantQuestions: [
      {
        id: "math-1-iq-1",
        marks: 2,
        question: "Given that HCF(306, 657) = 9, find LCM(306, 657).",
        modelAnswer:
          "We know HCF(a, b) × LCM(a, b) = a × b. Therefore, LCM(306, 657) = (306 × 657) / 9 = 34 × 657 = 22338.",
        examTip:
          "Always simplify 306 ÷ 9 = 34 first to avoid multiplication errors.",
      },
      {
        id: "math-1-iq-2",
        marks: 3,
        question: "Prove that √3 is an irrational number.",
        modelAnswer:
          "Assume √3 is rational, so √3 = a/b where a, b are co-prime integers and b ≠ 0. Squaring both sides gives 3b² = a². Thus 3 divides a², so 3 divides a. Put a = 3c. Then 3b² = 9c² ⇒ b² = 3c², so 3 divides b. Hence 3 is a common factor of a and b, contradicting our assumption that a and b are co-prime. Therefore √3 is irrational.",
      },
    ],
    practiceQuestions: [
      {
        id: "math-ch1-q1",
        subjectSlug: "mathematics",
        chapterSlug: "real-numbers",
        chapterTitle: "Real Numbers",
        topic: "Prime Factorisation & HCF/LCM",
        question: "What is the HCF of 26 and 91?",
        options: ["7", "13", "26", "182"],
        correctIndex: 1,
        explanation:
          "26 = 2 × 13 and 91 = 7 × 13. The common prime factor is 13, so HCF(26, 91) = 13.",
        difficulty: "easy",
      },
      {
        id: "math-ch1-q2",
        subjectSlug: "mathematics",
        chapterSlug: "real-numbers",
        chapterTitle: "Real Numbers",
        topic: "Prime Factorisation & Digits",
        question:
          "For any natural number n, 6ⁿ cannot end with the digit 0 because its prime factorisation does not contain:",
        options: ["2", "3", "5", "6"],
        correctIndex: 2,
        explanation:
          "A number ending in 0 must be divisible by 10 = 2 × 5. Since 6ⁿ = 2ⁿ × 3ⁿ lacks the prime factor 5, it can never end with 0.",
        difficulty: "easy",
      },
      {
        id: "math-ch1-q3",
        subjectSlug: "mathematics",
        chapterSlug: "real-numbers",
        chapterTitle: "Real Numbers",
        topic: "HCF-LCM Relation",
        question:
          "If two positive integers p and q are written as p = a³b² and q = ab³ (a, b are primes), then LCM(p, q) is:",
        options: ["ab²", "a³b³", "a²b²", "a⁴b⁵"],
        correctIndex: 1,
        explanation:
          "LCM takes the highest power of each prime factor: max(3, 1) for a is a³ and max(2, 3) for b is b³, giving a³b³.",
        difficulty: "medium",
      },
    ],
    revisionPoints: [
      "HCF(a, b) × LCM(a, b) = a × b holds ONLY for two numbers, NOT generally for three numbers.",
      "Always explicitly write 'let a and b be co-prime integers, b ≠ 0' in irrationality proofs.",
      "Prime factorise using factor trees cleanly before finding HCF and LCM.",
    ],
    commonMistakes: [
      "Applying HCF × LCM = a × b × c to three numbers—this identity is invalid for 3 numbers.",
      "Forgetting to state 'a and b are co-prime' at the beginning of a √p proof.",
    ],
  },
  {
    slug: "polynomials",
    number: "Ch. 2",
    title: "Polynomials",
    bookReference: "HPBOSE Ganit / NCERT Ch. 2",
    syllabusAlignment: "hpbose-ncert-core",
    syllabusNote:
      "Core HPBOSE exam chapter. Master geometrical meaning of zeroes and the sum/product relationship for quadratic polynomials.",
    estimatedMinutes: 30,
    summary:
      "Learn how zeroes of a polynomial correspond to x-intercepts on its graph and how the zeroes α and β of a quadratic polynomial ax² + bx + c relate directly to its coefficients a, b, and c.",
    learningObjectives: [
      "Count the number of zeroes of y = p(x) from its graph.",
      "Find zeroes of quadratic polynomials by splitting the middle term.",
      "Verify sum of zeroes (α + β = −b/a) and product of zeroes (αβ = c/a).",
      "Form a quadratic polynomial from given sum and product of zeroes.",
    ],
    formulaHighlights: [
      { label: "Sum of Zeroes", expression: "α + β = −b / a" },
      { label: "Product of Zeroes", expression: "α · β = c / a" },
      {
        label: "Forming Quadratic",
        expression: "k [ x² − (α + β)x + αβ ], where k ≠ 0",
      },
    ],
    detailedNotes: [
      {
        heading: "1. Geometrical Meaning of Zeroes",
        body: [
          "A real number k is a zero of polynomial p(x) if p(k) = 0.",
          "Graphically, the zeroes of y = p(x) are the x-coordinates of all points where the curve intersects or touches the x-axis. A polynomial of degree n has at most n real zeroes.",
          "For a quadratic polynomial ax² + bx + c (a ≠ 0), the graph is a parabola opening upwards if a > 0 and downwards if a < 0.",
        ],
      },
      {
        heading: "2. Relationship Between Zeroes and Coefficients",
        body: [
          "For p(x) = ax² + bx + c with zeroes α and β: α + β = −b/a and αβ = c/a.",
          "Conversely, if the sum S = α + β and product P = αβ are known, a quadratic polynomial is given by x² − Sx + P (or any non-zero constant multiple k(x² − Sx + P)).",
        ],
        keyFormulaOrRule:
          "p(x) = k(x² − (Sum of zeroes)x + Product of zeroes)",
        workedExample: {
          problem:
            "Find the zeroes of x² + 7x + 10 and verify the relationship between zeroes and coefficients.",
          steps: [
            "Factorise: x² + 7x + 10 = x² + 5x + 2x + 10 = (x + 5)(x + 2).",
            "Set p(x) = 0 ⇒ x = −5 or x = −2. So α = −5, β = −2.",
            "Here a = 1, b = 7, c = 10.",
            "Sum: α + β = −5 + (−2) = −7 = −7/1 = −b/a (Verified).",
            "Product: αβ = (−5)(−2) = 10 = 10/1 = c/a (Verified).",
          ],
          answer: "Zeroes are −5 and −2.",
        },
      },
    ],
    importantQuestions: [
      {
        id: "math-2-iq-1",
        marks: 2,
        question:
          "Find a quadratic polynomial whose sum and product of zeroes are −1/4 and 1/4 respectively.",
        modelAnswer:
          "Polynomial = k[x² − (sum)x + product] = k[x² − (−1/4)x + 1/4] = k[x² + x/4 + 1/4]. Choosing k = 4 gives 4x² + x + 1.",
      },
      {
        id: "math-2-iq-2",
        marks: 3,
        question:
          "Find the zeroes of 6x² − 3 − 7x and verify the relationship between zeroes and coefficients.",
        modelAnswer:
          "Write in standard form: 6x² − 7x − 3 = 6x² − 9x + 2x − 3 = (3x + 1)(2x − 3). Zeroes are x = −1/3 and x = 3/2. Sum = −1/3 + 3/2 = 7/6 = −(−7)/6 = −b/a. Product = (−1/3)(3/2) = −1/2 = −3/6 = c/a.",
        examTip:
          "Always rewrite the polynomial in descending powers of x before identifying a, b, and c!",
      },
    ],
    practiceQuestions: [
      {
        id: "math-ch2-q1",
        subjectSlug: "mathematics",
        chapterSlug: "polynomials",
        chapterTitle: "Polynomials",
        topic: "Zeroes & Coefficients",
        question:
          "If α and β are zeroes of x² − 5x + 6, then the value of α + β + αβ is:",
        options: ["1", "11", "−1", "30"],
        correctIndex: 1,
        explanation:
          "α + β = −(−5)/1 = 5 and αβ = 6/1 = 6. Therefore α + β + αβ = 5 + 6 = 11.",
        difficulty: "easy",
      },
      {
        id: "math-ch2-q2",
        subjectSlug: "mathematics",
        chapterSlug: "polynomials",
        chapterTitle: "Polynomials",
        topic: "Geometrical Meaning",
        question:
          "A graph of y = p(x) touches the x-axis at 1 point and crosses it at 2 other points. How many real zeroes does p(x) have?",
        options: ["1", "2", "3", "4"],
        correctIndex: 2,
        explanation:
          "Each point where the graph intersects or touches the x-axis represents a distinct real zero, so there are 1 + 2 = 3 real zeroes.",
        difficulty: "easy",
      },
    ],
    revisionPoints: [
      "Rewrite terms in standard order ax² + bx + c before reading coefficients.",
      "Sign check: Sum of zeroes has a minus sign (−b/a), product does not (+c/a).",
      "If zeroes are α and β, remember α² + β² = (α + β)² − 2αβ.",
    ],
    commonMistakes: [
      "Misreading b in 6x² − 3 − 7x as −3 instead of −7 because terms were unsorted.",
      "Forgetting the negative sign in x² − (α + β)x + αβ.",
    ],
  },
  {
    slug: "pair-of-linear-equations",
    number: "Ch. 3",
    title: "Pair of Linear Equations in Two Variables",
    bookReference: "HPBOSE Ganit / NCERT Ch. 3",
    syllabusAlignment: "hpbose-ncert-core",
    syllabusNote:
      "Core HPBOSE Algebra chapter. Focus on consistency ratio conditions, graphical solution, substitution method, and elimination method.",
    estimatedMinutes: 40,
    summary:
      "Learn how two linear equations a₁x + b₁y + c₁ = 0 and a₂x + b₂y + c₂ = 0 represent two straight lines on the Cartesian plane, determine whether they intersect, coincide, or stay parallel without drawing, and solve real-life word problems via Substitution and Elimination.",
    learningObjectives: [
      "Compare ratios a₁/a₂, b₁/b₂, and c₁/c₂ to classify consistent vs. inconsistent pairs.",
      "Solve pairs of linear equations graphically and read the intersection point.",
      "Solve systems algebraically using Substitution and Elimination methods.",
      "Form linear equations for age, two-digit number, fraction, and fixed-charge word problems.",
    ],
    formulaHighlights: [
      {
        label: "Unique Solution (Intersecting)",
        expression: "a₁/a₂ ≠ b₁/b₂   (Consistent)",
      },
      {
        label: "Infinitely Many Solutions (Coincident)",
        expression: "a₁/a₂ = b₁/b₂ = c₁/c₂   (Consistent / Dependent)",
      },
      {
        label: "No Solution (Parallel Lines)",
        expression: "a₁/a₂ = b₁/b₂ ≠ c₁/c₂   (Inconsistent)",
      },
    ],
    detailedNotes: [
      {
        heading: "1. Consistency & Graphical Interpretation",
        body: [
          "A pair of linear equations is called Consistent if it has at least one solution (unique intersecting lines OR infinitely many coincident lines). It is Inconsistent if the lines are parallel and never meet (no solution).",
          "In HPBOSE exams, 1-mark and 2-mark questions regularly ask for the value of k for which a pair has no solution or infinitely many solutions—always bring all constants to the same side (LHS or RHS) before forming ratios!",
        ],
        keyFormulaOrRule:
          "Always verify signs of c₁ and c₂ on the SAME side of the '=' sign before comparing c₁/c₂.",
      },
      {
        heading: "2. Algebraic Methods: Substitution & Elimination",
        body: [
          "Substitution Method: Express one variable (say y) in terms of x from one equation, substitute into the other equation to solve for x, then back-substitute to get y.",
          "Elimination Method: Multiply one or both equations by suitable non-zero constants so the coefficients of x (or y) become numerically equal. Add (if opposite signs) or subtract (if same signs) to eliminate one variable cleanly.",
        ],
        workedExample: {
          problem: "Solve by elimination: 3x + 4y = 10 and 2x − 2y = 2.",
          steps: [
            "Label equations: (1) 3x + 4y = 10, (2) 2x − 2y = 2.",
            "Multiply equation (2) by 2 to match the y-coefficient: 4x − 4y = 4.",
            "Add equation (1) and the new equation: (3x + 4x) + (4y − 4y) = 10 + 4 ⇒ 7x = 14 ⇒ x = 2.",
            "Substitute x = 2 into equation (2): 2(2) − 2y = 2 ⇒ 4 − 2y = 2 ⇒ 2y = 2 ⇒ y = 1.",
          ],
          answer: "x = 2, y = 1",
        },
      },
    ],
    importantQuestions: [
      {
        id: "math-3-iq-1",
        marks: 2,
        question:
          "For what value of k will the equations kx + 3y − (k − 3) = 0 and 12x + ky − k = 0 have infinitely many solutions?",
        modelAnswer:
          "For infinitely many solutions: a₁/a₂ = b₁/b₂ = c₁/c₂ ⇒ k/12 = 3/k = (k − 3)/k. From k/12 = 3/k ⇒ k² = 36 ⇒ k = ±6. Checking 3/k = (k − 3)/k with k = 6 gives 3/6 = 3/6 (true), while k = −6 gives −1/2 ≠ 3/2 (false). Hence k = 6.",
        examTip:
          "Always test BOTH roots of k² = 36 in the second ratio to reject extraneous values!",
      },
      {
        id: "math-3-iq-2",
        marks: 3,
        question:
          "The sum of the digits of a two-digit number is 9. Also, nine times this number is twice the number obtained by reversing the order of the digits. Find the number.",
        modelAnswer:
          "Let tens digit = x and units digit = y. Number = 10x + y; reversed = 10y + x. Given: (1) x + y = 9, and (2) 9(10x + y) = 2(10y + x) ⇒ 90x + 9y = 20y + 2x ⇒ 88x − 11y = 0 ⇒ y = 8x. Substituting in (1): x + 8x = 9 ⇒ x = 1, y = 8. The number is 18.",
      },
    ],
    practiceQuestions: [
      {
        id: "math-ch3-q1",
        subjectSlug: "mathematics",
        chapterSlug: "pair-of-linear-equations",
        chapterTitle: "Pair of Linear Equations in Two Variables",
        topic: "Consistency Conditions",
        question:
          "The pair of equations x + 2y − 4 = 0 and 2x + 4y − 12 = 0 represents:",
        options: [
          "Intersecting lines",
          "Parallel lines",
          "Coincident lines",
          "Perpendicular lines",
        ],
        correctIndex: 1,
        explanation:
          "a₁/a₂ = 1/2, b₁/b₂ = 2/4 = 1/2, but c₁/c₂ = (−4)/(−12) = 1/3. Since a₁/a₂ = b₁/b₂ ≠ c₁/c₂, the lines are parallel (no solution).",
        difficulty: "easy",
      },
      {
        id: "math-ch3-q2",
        subjectSlug: "mathematics",
        chapterSlug: "pair-of-linear-equations",
        chapterTitle: "Pair of Linear Equations in Two Variables",
        topic: "Elimination & Unique Solution",
        question:
          "For what value of k does the system 2x + ky = 1 and 3x − 5y = 7 have NO solution?",
        options: ["k = −10/3", "k = 10/3", "k = 3/10", "k = −3/10"],
        correctIndex: 0,
        explanation:
          "For no solution, a₁/a₂ = b₁/b₂ ≠ c₁/c₂ ⇒ 2/3 = k/(−5) ⇒ k = −10/3 (and c₁/c₂ = 1/7 ≠ 2/3).",
        difficulty: "medium",
      },
    ],
    revisionPoints: [
      "Two-digit number with tens digit x and units digit y is ALWAYS written 10x + y, never xy.",
      "Always verify your final (x, y) by plugging back into BOTH original equations.",
      "If k² = 36 arises in consistency checks, verify both +6 and −6 against c₁/c₂.",
    ],
    commonMistakes: [
      "Writing a two-digit number as x + y instead of 10x + y.",
      "Forgetting to flip signs of every term when subtracting equation (2) from equation (1).",
    ],
  },
  {
    slug: "quadratic-equations",
    number: "Ch. 4",
    title: "Quadratic Equations",
    bookReference: "HPBOSE Ganit / NCERT Ch. 4",
    syllabusAlignment: "hpbose-ncert-core",
    syllabusNote:
      "High-weightage HPBOSE Algebra chapter. Focus on factorisation, quadratic formula, and discriminant nature-of-roots problems.",
    estimatedMinutes: 40,
    summary:
      "Quadratic equations model area, speed-time, and number problems in the form ax² + bx + c = 0 (a ≠ 0). Master solving by factorisation and the quadratic formula, and classify roots instantly using the discriminant D = b² − 4ac.",
    learningObjectives: [
      "Identify quadratic equations in standard form ax² + bx + c = 0 (a ≠ 0).",
      "Solve quadratic equations via factorisation and the quadratic formula.",
      "Determine the nature of roots using the discriminant D = b² − 4ac.",
      "Translate word problems into quadratic equations and reject non-physical roots.",
    ],
    formulaHighlights: [
      {
        label: "Quadratic Formula",
        expression: "x = [ −b ± √(b² − 4ac) ] / 2a",
      },
      { label: "Discriminant", expression: "D = b² − 4ac" },
      {
        label: "Nature of Roots",
        expression:
          "D > 0: 2 distinct real | D = 0: 2 equal real | D < 0: No real roots",
      },
    ],
    detailedNotes: [
      {
        heading: "1. Standard Form & Solution Methods",
        body: [
          "An equation of the form ax² + bx + c = 0 where a, b, c are real numbers and a ≠ 0 is a quadratic equation.",
          "Method 1 (Factorisation): Split bx into two terms whose product is acx² and sum is bx, then apply the zero-product rule.",
          "Method 2 (Quadratic Formula): Works for every quadratic equation when D ≥ 0: x = (−b ± √D) / (2a).",
        ],
        workedExample: {
          problem:
            "Find the value of k for which 2x² + kx + 3 = 0 has two equal real roots.",
          steps: [
            "Compare with ax² + bx + c = 0: a = 2, b = k, c = 3.",
            "For equal real roots, Discriminant D = b² − 4ac = 0.",
            "k² − 4(2)(3) = 0 ⇒ k² − 24 = 0 ⇒ k² = 24.",
            "Taking square root on both sides: k = ±√24 = ±2√6.",
          ],
          answer: "k = 2√6 or k = −2√6",
        },
      },
      {
        heading: "2. Discriminant & Word Problems Strategy",
        body: [
          "Always check D = b² − 4ac first. If D < 0, state clearly that no real roots exist.",
          "In speed-distance or age word problems, define the variable clearly with units (e.g., 'Let the speed of the train be x km/h') and discard negative values where speed, age, or length cannot be negative.",
        ],
      },
    ],
    importantQuestions: [
      {
        id: "math-4-iq-1",
        marks: 3,
        question: "Solve 2x² − 7x + 3 = 0 using the quadratic formula.",
        modelAnswer:
          "Here a = 2, b = −7, c = 3. D = (−7)² − 4(2)(3) = 49 − 24 = 25. Thus x = (7 ± √25) / 4 = (7 ± 5) / 4. So x = 12/4 = 3 or x = 2/4 = 1/2.",
      },
      {
        id: "math-4-iq-2",
        marks: 5,
        question:
          "A train travels 360 km at a uniform speed. If the speed had been 5 km/h more, it would have taken 1 hour less for the same journey. Find the speed of the train.",
        modelAnswer:
          "Let original speed = x km/h. Time₁ = 360/x, Time₂ = 360/(x + 5). Given 360/x − 360/(x + 5) = 1. Simplifying: 360(x + 5 − x) = x(x + 5) ⇒ x² + 5x − 1800 = 0 ⇒ (x + 45)(x − 40) = 0. Since speed > 0, x = 40 km/h.",
      },
    ],
    practiceQuestions: [
      {
        id: "math-ch4-q1",
        subjectSlug: "mathematics",
        chapterSlug: "quadratic-equations",
        chapterTitle: "Quadratic Equations",
        topic: "Discriminant & Nature of Roots",
        question:
          "The discriminant of the quadratic equation 3x² − 2x + 1/3 = 0 is:",
        options: ["0", "4", "−4", "1"],
        correctIndex: 0,
        explanation:
          "D = b² − 4ac = (−2)² − 4(3)(1/3) = 4 − 4 = 0, so the equation has two equal real roots.",
        difficulty: "easy",
      },
      {
        id: "math-ch4-q2",
        subjectSlug: "mathematics",
        chapterSlug: "quadratic-equations",
        chapterTitle: "Quadratic Equations",
        topic: "Roots of Quadratic Equations",
        question: "If x = 2 is a root of kx² − 5x + 2 = 0, then the value of k is:",
        options: ["1", "2", "3", "4"],
        correctIndex: 1,
        explanation:
          "Substitute x = 2: k(4) − 5(2) + 2 = 0 ⇒ 4k − 8 = 0 ⇒ k = 2.",
        difficulty: "medium",
      },
    ],
    revisionPoints: [
      "Equal roots always means D = b² − 4ac = 0, and each root equals −b/(2a).",
      "Remember ± when taking square roots (e.g., k² = 24 ⇒ k = ±2√6).",
      "Check units and discard invalid negative roots in word problems.",
    ],
    commonMistakes: [
      "Writing only the positive root when solving k² = 24.",
      "Using (−b ± √D) / 2 instead of dividing by 2a.",
    ],
  },
  {
    slug: "arithmetic-progressions",
    number: "Ch. 5",
    title: "Arithmetic Progressions",
    bookReference: "HPBOSE Ganit / NCERT Ch. 5",
    syllabusAlignment: "hpbose-ncert-core",
    syllabusNote:
      "Guaranteed HPBOSE board questions every year. Master the nth term formula (aₙ), sum of first n terms (Sₙ), and finding terms from the end.",
    estimatedMinutes: 35,
    summary:
      "An Arithmetic Progression (AP) is a list of numbers where each term differs from the preceding term by a fixed common difference d. Master finding any nth term, checking whether a number belongs to an AP, and summing n terms quickly.",
    learningObjectives: [
      "Identify first term (a) and common difference (d = a₂ − a₁) of an AP.",
      "Compute the nth term using aₙ = a + (n − 1)d.",
      "Find the sum of the first n terms using Sₙ = (n/2)[2a + (n − 1)d] and Sₙ = (n/2)(a + l).",
      "Use aₙ = Sₙ − Sₙ₋₁ to recover terms directly from a sum formula.",
    ],
    formulaHighlights: [
      { label: "nth Term from Start", expression: "aₙ = a + (n − 1)d" },
      {
        label: "Sum of First n Terms",
        expression: "Sₙ = (n / 2) [ 2a + (n − 1)d ]",
      },
      {
        label: "Sum with Last Term l",
        expression: "Sₙ = (n / 2) (a + l)",
      },
      {
        label: "nth Term from Sum",
        expression: "aₙ = Sₙ − Sₙ₋₁   (and a₁ = S₁)",
      },
    ],
    detailedNotes: [
      {
        heading: "1. nth Term of an AP",
        body: [
          "The general AP is a, a + d, a + 2d, a + 3d, ... where d can be positive, negative, or zero.",
          "To verify if a number K is a term of an AP, set aₙ = K and solve for n. If n comes out to be a positive integer (1, 2, 3, ...), K is in the AP; if n is fractional or negative, K is NOT a term of the AP.",
          "Useful trick: The nth term from the END of a finite AP with last term l and common difference d is l − (n − 1)d.",
        ],
        workedExample: {
          problem:
            "How many two-digit numbers are divisible by 3?",
          steps: [
            "Smallest two-digit multiple of 3 is 12; largest is 99. AP: 12, 15, 18, ..., 99.",
            "Here a = 12, d = 3, and aₙ = 99.",
            "Apply aₙ = a + (n − 1)d ⇒ 99 = 12 + (n − 1)(3).",
            "87 = 3(n − 1) ⇒ n − 1 = 29 ⇒ n = 30.",
          ],
          answer: "There are 30 two-digit numbers divisible by 3.",
        },
      },
      {
        heading: "2. Sum of First n Terms (Sₙ)",
        body: [
          "Use Sₙ = (n/2)[2a + (n − 1)d] when a, d, and n are known. Use the faster form Sₙ = (n/2)(a + l) whenever the first term a and last term l are already known.",
          "Special shortcut: Sum of first n positive integers = n(n + 1)/2.",
        ],
      },
    ],
    importantQuestions: [
      {
        id: "math-5-iq-1",
        marks: 3,
        question:
          "Find the 31st term of an AP whose 11th term is 38 and the 16th term is 73.",
        modelAnswer:
          "a₁₁ = a + 10d = 38 and a₁₆ = a + 15d = 73. Subtracting gives 5d = 35 ⇒ d = 7. Substituting: a + 10(7) = 38 ⇒ a = −32. Therefore a₃₁ = −32 + 30(7) = −32 + 210 = 178.",
      },
      {
        id: "math-5-iq-2",
        marks: 3,
        question: "Find the sum of the first 15 multiples of 8.",
        modelAnswer:
          "AP is 8, 16, 24, ..., up to 15 terms. Here a = 8, d = 8, n = 15. S₁₅ = (15/2)[2(8) + (15 − 1)(8)] = (15/2)[16 + 112] = (15/2)(128) = 15 × 64 = 960.",
      },
    ],
    practiceQuestions: [
      {
        id: "math-ch5-q1",
        subjectSlug: "mathematics",
        chapterSlug: "arithmetic-progressions",
        chapterTitle: "Arithmetic Progressions",
        topic: "nth Term Formula",
        question: "What is the 10th term of the AP: 2, 7, 12, ...?",
        options: ["45", "47", "50", "42"],
        correctIndex: 1,
        explanation:
          "a = 2, d = 7 − 2 = 5. a₁₀ = a + 9d = 2 + 9(5) = 2 + 45 = 47.",
        difficulty: "easy",
      },
      {
        id: "math-ch5-q2",
        subjectSlug: "mathematics",
        chapterSlug: "arithmetic-progressions",
        chapterTitle: "Arithmetic Progressions",
        topic: "Sum of First n Terms",
        question: "The sum of the first 20 positive integers (1 + 2 + ... + 20) is:",
        options: ["190", "200", "210", "420"],
        correctIndex: 2,
        explanation: "Sₙ = n(n + 1)/2 = 20 × 21 / 2 = 210.",
        difficulty: "easy",
      },
    ],
    revisionPoints: [
      "Always compute d = a₂ − a₁ (second term minus first term)—never first minus second!",
      "Three numbers a, b, c are in AP if and only if 2b = a + c.",
      "Remember n must ALWAYS be a positive whole number.",
    ],
    commonMistakes: [
      "Taking d = a₁ − a₂ in decreasing APs (for 10, 7, 4, d is −3, NOT +3).",
      "Forgetting to multiply by n/2 in the sum formula.",
    ],
  },
  {
    slug: "triangles",
    number: "Ch. 6",
    title: "Triangles",
    bookReference: "HPBOSE Ganit / NCERT Ch. 6",
    syllabusAlignment: "hpbose-ncert-core",
    syllabusNote:
      "Core Geometry chapter. Basic Proportionality Theorem (Thales Theorem) proof and AA/SAS/SSS similarity criteria are heavily tested in HPBOSE.",
    estimatedMinutes: 40,
    summary:
      "Understand similar figures vs. congruent figures, prove and apply the Basic Proportionality Theorem (BPT / Thales Theorem) and its converse, and solve geometry proofs using AA, SSS, and SAS similarity criteria.",
    learningObjectives: [
      "State and prove the Basic Proportionality Theorem (BPT / Thales Theorem).",
      "Apply BPT and its converse to find unknown side lengths and prove lines parallel.",
      "Prove two triangles similar using AA (AAA), SSS, and SAS similarity criteria.",
      "Write corresponding vertices in the exact correct order when stating △ABC ~ △PQR.",
    ],
    formulaHighlights: [
      {
        label: "Basic Proportionality Theorem (DE ∥ BC)",
        expression: "AD / DB = AE / EC   and   AD / AB = AE / AC = DE / BC",
      },
      {
        label: "Similarity Criteria",
        expression: "AA (or AAA)  |  SSS (proportional sides)  |  SAS (2 prop. sides + included ∠)",
      },
    ],
    detailedNotes: [
      {
        heading: "1. Basic Proportionality Theorem (Thales Theorem)",
        body: [
          "Statement: If a line is drawn parallel to one side of a triangle to intersect the other two sides in distinct points, the other two sides are divided in the same ratio.",
          "In △ABC, if DE ∥ BC with D on AB and E on AC, then AD/DB = AE/EC. Important corollaries: AD/AB = AE/AC and DB/AB = EC/AC.",
          "Converse of BPT: If a line divides any two sides of a triangle in the same ratio, then the line is parallel to the third side.",
        ],
        workedExample: {
          problem:
            "In △ABC, DE ∥ BC. If AD = 1.5 cm, DB = 3 cm, and AE = 1 cm, find EC.",
          steps: [
            "Since DE ∥ BC, by Basic Proportionality Theorem: AD / DB = AE / EC.",
            "Substitute known lengths: 1.5 / 3 = 1 / EC.",
            "Simplify: 1/2 = 1 / EC ⇒ EC = 2 cm.",
          ],
          answer: "EC = 2 cm",
        },
      },
      {
        heading: "2. Criteria for Similarity of Triangles",
        body: [
          "AA Similarity: If two angles of one triangle are respectively equal to two angles of another triangle, the triangles are similar (the third angles are automatically equal by angle sum property).",
          "SSS Similarity: If sides of one triangle are proportional to the sides of another triangle, their corresponding angles are equal and the triangles are similar.",
          "SAS Similarity: If one angle of a triangle equals one angle of another triangle and the sides INCLUDING these angles are proportional, the triangles are similar.",
        ],
      },
    ],
    importantQuestions: [
      {
        id: "math-6-iq-1",
        marks: 5,
        question:
          "State and prove the Basic Proportionality Theorem (Thales Theorem).",
        modelAnswer:
          "Statement: A line drawn parallel to one side of a triangle intersecting the other two sides divides those two sides in the same ratio. Proof outline: Draw △ABC with DE ∥ BC. Join BE and CD; draw DM ⊥ AC and EN ⊥ AB. Area(△ADE)/Area(△BDE) = (½·AD·EN)/(½·DB·EN) = AD/DB. Similarly Area(△ADE)/Area(△CDE) = AE/EC. Since △BDE and △CDE lie on the same base DE and between the same parallels DE ∥ BC, Area(△BDE) = Area(△CDE). Hence AD/DB = AE/EC.",
        examTip:
          "Always include Given, To Prove, Construction (neat labelled diagram), and Proof for full 5 marks.",
      },
      {
        id: "math-6-iq-2",
        marks: 3,
        question:
          "A vertical pole of length 6 m casts a shadow 4 m long on the ground and at the same time a tower casts a shadow 28 m long. Find the height of the tower.",
        modelAnswer:
          "At the same time, sun's rays make equal angles with the ground, so the right triangles formed by pole-shadow and tower-shadow are similar by AA similarity. Thus Height_tower / 6 = 28 / 4 = 7 ⇒ Height_tower = 42 m.",
      },
    ],
    practiceQuestions: [
      {
        id: "math-ch6-q1",
        subjectSlug: "mathematics",
        chapterSlug: "triangles",
        chapterTitle: "Triangles",
        topic: "Basic Proportionality Theorem",
        question:
          "In △ABC, DE ∥ BC. If AD = 2 cm, DB = 6 cm, and AE = 3 cm, then EC equals:",
        options: ["6 cm", "9 cm", "4 cm", "12 cm"],
        correctIndex: 1,
        explanation:
          "By BPT, AD/DB = AE/EC ⇒ 2/6 = 3/EC ⇒ 1/3 = 3/EC ⇒ EC = 9 cm.",
        difficulty: "easy",
      },
      {
        id: "math-ch6-q2",
        subjectSlug: "mathematics",
        chapterSlug: "triangles",
        chapterTitle: "Triangles",
        topic: "Triangle Similarity",
        question:
          "All equilateral triangles are always:",
        options: ["Congruent", "Similar", "Right-angled", "Scalene"],
        correctIndex: 1,
        explanation:
          "Every equilateral triangle has all three angles equal to 60°, so any two equilateral triangles are always similar by AAA similarity.",
        difficulty: "easy",
      },
    ],
    revisionPoints: [
      "All congruent figures are similar, but similar figures need NOT be congruent.",
      "Always match vertex order: if ∠A = ∠P, ∠B = ∠Q, ∠C = ∠R, write △ABC ~ △PQR.",
      "Memorise the exact 4-step proof of BPT (Thales Theorem)—it is one of HPBOSE's top 5-mark questions.",
    ],
    commonMistakes: [
      "Writing AD/DB = DE/BC (INCORRECT!). The parallel segment ratio uses the full side: AD/AB = DE/BC.",
      "Writing vertices in mismatched order when forming proportional side ratios.",
    ],
  },
  {
    slug: "coordinate-geometry",
    number: "Ch. 7",
    title: "Coordinate Geometry",
    bookReference: "HPBOSE Ganit / NCERT Ch. 7",
    syllabusAlignment: "hpbose-ncert-core",
    syllabusNote:
      "Very scoring HPBOSE chapter. Focus on Distance Formula, Equidistant Points, Section Formula, and Midpoint Formula.",
    estimatedMinutes: 35,
    summary:
      "Connect algebra and geometry on the Cartesian plane. Calculate the exact distance between any two points, verify triangle/quadrilateral types, and find coordinates of points dividing a line segment in ratio m₁ : m₂.",
    learningObjectives: [
      "Apply the Distance Formula to find lengths and check collinearity or polygon types.",
      "Find a point on the x-axis (x, 0) or y-axis (0, y) equidistant from two given points.",
      "Apply Section Formula and Midpoint Formula to divide line segments.",
      "Find the ratio in which a line or axis divides a segment by letting ratio be k : 1.",
    ],
    formulaHighlights: [
      {
        label: "Distance Formula",
        expression: "PQ = √[ (x₂ − x₁)² + (y₂ − y₁)² ]",
      },
      {
        label: "Distance from Origin (0, 0)",
        expression: "OP = √(x² + y²)",
      },
      {
        label: "Section Formula (m₁ : m₂)",
        expression: "P(x, y) = ( (m₁x₂ + m₂x₁)/(m₁ + m₂),  (m₁y₂ + m₂y₁)/(m₁ + m₂) )",
      },
      {
        label: "Midpoint Formula",
        expression: "M(x, y) = ( (x₁ + x₂)/2,  (y₁ + y₂)/2 )",
      },
    ],
    detailedNotes: [
      {
        heading: "1. Distance Formula & Geometric Tests",
        body: [
          "Any point on the x-axis has coordinates (x, 0). Any point on the y-axis has coordinates (0, y).",
          "To prove points A, B, C are collinear using distance formula, show that the sum of two smaller distances equals the largest distance (e.g., AB + BC = AC).",
          "Quadrilateral checks: Square = 4 equal sides AND equal diagonals; Rhombus = 4 equal sides with unequal diagonals; Rectangle = opposite sides equal AND equal diagonals; Parallelogram = opposite sides equal (or diagonals bisect each other using midpoint formula!).",
        ],
        workedExample: {
          problem:
            "Find the point on the x-axis which is equidistant from A(2, −5) and B(−2, 9).",
          steps: [
            "Let the required point on the x-axis be P(x, 0).",
            "Since PA = PB, we have PA² = PB² (squaring removes square roots).",
            "(x − 2)² + (0 − (−5))² = (x − (−2))² + (0 − 9)².",
            "(x² − 4x + 4) + 25 = (x² + 4x + 4) + 81.",
            "Cancel x² + 4 from both sides: −4x + 25 = 4x + 81 ⇒ −8x = 56 ⇒ x = −7.",
          ],
          answer: "The required point is (−7, 0).",
        },
      },
      {
        heading: "2. Section Formula & k : 1 Ratio Trick",
        body: [
          "Whenever a question asks 'In what ratio does point P (or the x-axis) divide segment AB?', ALWAYS assume the ratio is k : 1. This leaves only ONE unknown k instead of two!",
          "Midpoint trick for parallelograms: If A, B, C, D are vertices in order, Midpoint of AC = Midpoint of BD—this immediately finds any missing 4th vertex in 2 lines!",
        ],
      },
    ],
    importantQuestions: [
      {
        id: "math-7-iq-1",
        marks: 2,
        question: "Find the distance between the points (−5, 7) and (−1, 3).",
        modelAnswer:
          "d = √[(−1 − (−5))² + (3 − 7)²] = √[(4)² + (−4)²] = √(16 + 16) = √32 = 4√2 units.",
      },
      {
        id: "math-7-iq-2",
        marks: 3,
        question:
          "Find the ratio in which the line segment joining A(1, −5) and B(−4, 5) is divided by the x-axis. Also find the coordinates of the point of division.",
        modelAnswer:
          "Let the ratio be k : 1 and the point on x-axis be P(x, 0). Using y-coordinate of section formula: 0 = (k(5) + 1(−5))/(k + 1) ⇒ 5k − 5 = 0 ⇒ k = 1. Ratio = 1 : 1 (midpoint). Now x = (1(−4) + 1(1))/2 = −3/2. Point is (−3/2, 0).",
      },
    ],
    practiceQuestions: [
      {
        id: "math-ch7-q1",
        subjectSlug: "mathematics",
        chapterSlug: "coordinate-geometry",
        chapterTitle: "Coordinate Geometry",
        topic: "Distance from Origin",
        question: "The distance of the point P(−6, 8) from the origin is:",
        options: ["8", "2√7", "10", "6"],
        correctIndex: 2,
        explanation: "OP = √[(−6)² + 8²] = √(36 + 64) = √100 = 10 units.",
        difficulty: "easy",
      },
      {
        id: "math-ch7-q2",
        subjectSlug: "mathematics",
        chapterSlug: "coordinate-geometry",
        chapterTitle: "Coordinate Geometry",
        topic: "Midpoint Formula",
        question:
          "The midpoint of the line segment joining (−2, 8) and (−6, −4) is:",
        options: ["(−4, 2)", "(−4, −6)", "(4, 2)", "(−2, 6)"],
        correctIndex: 0,
        explanation:
          "Midpoint = ((−2 + (−6))/2, (8 + (−4))/2) = (−8/2, 4/2) = (−4, 2).",
        difficulty: "easy",
      },
    ],
    revisionPoints: [
      "Use PA² = PB² for equidistant problems so you don't carry messy square root signs.",
      "Assume ratio k : 1 whenever asked to find the division ratio.",
      "Trisection points divide a segment in ratios 1 : 2 and 2 : 1.",
    ],
    commonMistakes: [
      "Multiplying m₁ with x₁ instead of m₁ with x₂ in Section Formula (remember the cross-multiplication: m₁x₂ + m₂x₁).",
      "Forgetting negative signs when computing (x₂ − x₁) for negative coordinates.",
    ],
  },
];
