import { mathExtraChapters } from "./math-extra";
import type { Chapter, Scope, Subject } from "./types";

export const OFFICIAL_LINKS = {
  hpboseHome: "https://www.hpbose.org/",
  bookList2026: "https://www.hpbose.org/Admin/Upload/Book%20List%20Session%202026-2027.pdf",
  mathSyllabus: "https://www.hpbose.org/Admin/Upload/Sy.Math.10.27.06.2024.pdf",
  scienceSyllabus: "https://www.hpbose.org/Admin/Upload/Sylla.Sci.10.04.08.2025.pdf",
  englishSyllabus: "https://www.hpbose.org/Admin/Upload/Sy.Eng.10.27.06.2024.pdf",
  computerScienceSyllabus: "https://www.hpbose.org/Admin/Upload/Sy.CS.10.27.06.2024.pdf",
  socialScienceModelPaper: "https://www.hpbose.org/Admin/Upload/10thSocialScience10thMQP2026-27.pdf",
  englishModelPaper: "https://www.hpbose.org/Admin/Upload/10thEnglishMQP2026-27.pdf",
  mathModelPaper: "https://www.hpbose.org/Admin/Upload/10thMathsMQP2026-27.pdf",
  hpboseModelPapers: "https://www.hpbose.org/ModelQuesPpr.aspx",
  ncertTextbookPortal: "https://ncert.nic.in/textbook.php",
  ncertHome: "https://ncert.nic.in/",
} as const;

export const CURRICULUM_NOTICE =
  "Curriculum reference: the official HPBOSE Class 10 book list for session 2026–27 and HPBOSE subject syllabi/model papers. NCERT books are cross-references where prescribed; an NCERT chapter is not automatically in the HPBOSE examination syllabus. Always confirm optional subjects, course A/B and deleted portions with your school and the latest official notice.";

type ChapterSeed = {
  slug: string;
  title: string;
  unit: string;
  summary: string;
  topics: string[];
  notes: { heading: string; points: string[] }[];
  importantQuestions: string[];
  exercises: { prompt: string; hint: string }[];
  revision: string[];
  formulas?: string[];
  scope?: Scope;
  scopeNote?: string;
  source: string;
  minutes: number;
};

function chapters(subjectId: string, seeds: ChapterSeed[]): Chapter[] {
  return seeds.map((seed, index) => ({
    id: `${subjectId}-${seed.slug}`,
    subjectId,
    number: index + 1,
    title: seed.title,
    unit: seed.unit,
    summary: seed.summary,
    topics: seed.topics,
    notes: seed.notes,
    importantQuestions: seed.importantQuestions,
    exercises: seed.exercises,
    revision: seed.revision,
    formulas: seed.formulas ?? [],
    scope: seed.scope ?? "confirmed",
    scopeNote: seed.scopeNote ?? "Listed in the referenced HPBOSE syllabus. Verify the latest school notice.",
    source: seed.source,
    minutes: seed.minutes,
  }));
}

const mathSource = "HPBOSE Class 10 Mathematics syllabus; HPBOSE 2026–27 Maths model paper; NCERT Mathematics (cross-reference)";
const scienceSource = "HPBOSE Class 10 Science syllabus (2025); NCERT Science (cross-reference)";
const socialSource = "HPBOSE Class 10 Social Science model paper 2026–27; NCERT Social Science books";
const englishSource = "HPBOSE Class 10 English syllabus; NCERT First Flight / Footprints without Feet";
const hindiSource = "NCERT Hindi Course A/B books; verify course and examination scope with HPBOSE/school";
const sanskritSource = "NCERT Shemushi / grammar books; verify prescribed edition with HPBOSE/school";
const csSource = "HPBOSE Class 10 Computer Science syllabus (CS-201 to CS-204)";

export const subjects: Subject[] = [
  {
    id: "mathematics",
    main: true,
    name: "Mathematics",
    shortName: "Maths",
    icon: "calculator",
    accent: "#2563EB",
    softAccent: "#EFF6FF",
    tagline: "Build confidence one solved step at a time.",
    books: [
      { title: "Mathematics, Class X", publisher: "NCERT", note: "Prescribed in the official HPBOSE 2026–27 book list." },
      { title: "NCERT Exemplar / school reference book", publisher: "NCERT or school-prescribed", note: "Use only if your school recommends it." },
    ],
    curriculumNote: "All 14 units from HPBOSE's published Class 10 Mathematics syllabus now have original notes, exercises, a chapter sample paper and an answer key. The official 2026–27 model paper shows the full 80-mark examination pattern; NCERT Mathematics is a cross-reference, not a substitute for the HPBOSE scope notice.",
    chapters: [...chapters("mathematics", [
      {
        slug: "real-numbers", title: "Real Numbers", unit: "Number system",
        summary: "Real numbers connect prime factorisation, HCF/LCM and the difference between rational and irrational numbers.",
        topics: ["Euclid's division lemma", "Fundamental Theorem of Arithmetic", "Irrational numbers", "Decimal expansions"],
        notes: [
          { heading: "Prime factorisation is a fingerprint", points: ["Every composite number has one prime factorisation (apart from order).", "Use factor trees or repeated division to write a number as powers of primes.", "HCF takes the smallest powers of common primes; LCM takes the greatest powers."] },
          { heading: "Rational versus irrational", points: ["A rational number can be written as p/q with integers p, q and q ≠ 0.", "A terminating decimal has a denominator whose reduced prime factors are only 2 and 5.", "Non-terminating non-repeating decimals are irrational; √2 and √3 are common examples."] },
          { heading: "Proof habit", points: ["To prove a number such as 5 + 2√3 is irrational, assume it is rational, isolate the surd, and show √3 would become rational.", "State the contradiction clearly instead of relying on a decimal approximation."] },
        ],
        importantQuestions: ["Use prime factorisation to find HCF and LCM of 96 and 404, then verify HCF × LCM = product.", "Explain why 7 × 11 × 13 + 13 is composite.", "Prove that 3 + 2√5 is irrational."],
        exercises: [
          { prompt: "Write 3825 as a product of primes and find its HCF with 1575.", hint: "Compare exponents of the common prime bases." },
          { prompt: "Without long division, decide whether 27/125 has a terminating decimal expansion.", hint: "Reduce the fraction first; inspect the denominator's primes." },
        ],
        revision: ["HCF = lowest common prime powers; LCM = highest prime powers.", "p/q terminates only when reduced q = 2^m × 5^n.", "A contradiction proof needs an assumption, algebra and a final contradiction."],
        formulas: ["HCF(a,b) × LCM(a,b) = a × b", "Euclid: a = bq + r, 0 ≤ r < b"],
        source: mathSource, minutes: 45,
      },
      {
        slug: "polynomials", title: "Polynomials", unit: "Algebra",
        summary: "A polynomial's zeroes describe where its graph meets the x-axis and how its coefficients are related.",
        topics: ["Degree and zeroes", "Graphical meaning", "Sum and product of zeroes", "Quadratic factorisation"],
        notes: [
          { heading: "Reading a polynomial", points: ["The degree is the highest exponent with a non-zero coefficient.", "A zero k satisfies p(k) = 0; geometrically it is an x-intercept.", "A quadratic can have two, one repeated, or no real zeroes."] },
          { heading: "Coefficient relationships", points: ["For ax² + bx + c, the sum of zeroes is −b/a and the product is c/a.", "Given the zeroes, a quadratic can be rebuilt as k[x² − (sum)x + product].", "Check the answer by expanding, not by memorising alone."] },
          { heading: "Division and factors", points: ["If p(a) = 0, then (x − a) is a factor of p(x).", "Polynomial division follows: dividend = divisor × quotient + remainder.", "The remainder's degree must be smaller than the divisor's degree."] },
        ],
        importantQuestions: ["Find the zeroes of 6x² − 7x − 3 and verify both coefficient relations.", "Form a quadratic whose zeroes have sum 1/4 and product −1.", "Explain what the graph tells you about the number of real zeroes."],
        exercises: [
          { prompt: "For p(x) = 2x² − 8x + 6, find zeroes and sketch the sign of p(x) between them.", hint: "Factor out the common 2 first." },
          { prompt: "Check whether x − 3 is a factor of x³ − 4x² + x + 6.", hint: "Evaluate p(3); the factor theorem gives a quick test." },
        ],
        revision: ["Zero ↔ x-intercept ↔ factor (x − zero).", "Quadratic: α + β = −b/a; αβ = c/a.", "Always verify with substitution or expansion."],
        formulas: ["α + β = −b/a", "αβ = c/a", "p(x) = d(x)q(x) + r(x)"],
        source: mathSource, minutes: 40,
      },
      {
        slug: "linear-equations", title: "Pair of Linear Equations", unit: "Algebra",
        summary: "Two linear equations model two conditions at once; their graphs reveal whether a solution is unique, infinite or impossible.",
        topics: ["Graphical interpretation", "Substitution", "Elimination", "Consistency"],
        notes: [
          { heading: "What a solution means", points: ["An ordered pair (x, y) must satisfy both equations simultaneously.", "Intersecting lines give one solution; coincident lines give infinitely many; parallel lines give none.", "Compare a₁/a₂, b₁/b₂ and c₁/c₂ to predict consistency."] },
          { heading: "Choosing an algebraic method", points: ["Substitution works well when one variable already has coefficient 1.", "Elimination is efficient when coefficients can be matched by a small multiplier.", "Keep equations aligned and perform the same operation on both sides."] },
          { heading: "Word problems", points: ["Define x and y in words before forming equations.", "Translate conditions such as total, difference and twice into algebra.", "Substitute the result back into the original story and check units."] },
        ],
        importantQuestions: ["Solve 2x + 3y = 11 and 2x − 4y = −24, then verify graphically.", "For what value of k do kx + 3y = k − 3 and 12x + ky = k have no solution?", "Frame and solve a two-variable age or cost problem."],
        exercises: [
          { prompt: "Five pencils and seven pens cost ₹195; seven pencils and five pens cost ₹153. Find each price.", hint: "Let p and q be prices; use elimination after adding suitable multiples." },
          { prompt: "Determine whether 3x + 2y = 5 and 6x + 4y = 10 have one or infinitely many solutions.", hint: "Compare all three coefficient ratios." },
        ],
        revision: ["One intersection = unique solution.", "a₁/a₂ = b₁/b₂ ≠ c₁/c₂ means no solution.", "Define variables and include units in word problems."],
        formulas: ["Intersecting: a₁/a₂ ≠ b₁/b₂", "Parallel: a₁/a₂ = b₁/b₂ ≠ c₁/c₂", "Coincident: all three ratios equal"],
        source: mathSource, minutes: 50,
      },
      {
        slug: "quadratic-equations", title: "Quadratic Equations", unit: "Algebra",
        summary: "Quadratic equations appear in area, motion and product problems; the discriminant predicts the nature of roots.",
        topics: ["Standard form", "Factorisation", "Quadratic formula", "Discriminant"],
        notes: [
          { heading: "Recognise and arrange", points: ["Write the equation as ax² + bx + c = 0 with a ≠ 0 before choosing a method.", "A product equal to zero lets you set each factor equal to zero.", "Completing the square explains where the quadratic formula comes from."] },
          { heading: "Nature of roots", points: ["D = b² − 4ac; D > 0 gives two distinct real roots.", "D = 0 gives equal real roots; D < 0 gives no real roots at this level.", "A perfect-square discriminant often hints that factorisation will work."] },
          { heading: "Applications", points: ["Reject negative lengths, speeds or counts even if algebra produces them.", "Translate 'product' or 'area' into a quadratic and state the variable's domain.", "Verify the final value in the original situation."] },
        ],
        importantQuestions: ["Solve 2x² − 7x + 3 = 0 by factorisation and confirm with the formula.", "Find k for which 2x² + kx + 3 = 0 has equal roots.", "A rectangular garden has perimeter 60 m and area 200 m². Find its dimensions."],
        exercises: [
          { prompt: "Find two consecutive positive integers whose squares sum to 365.", hint: "Let them be n and n + 1; discard the negative root." },
          { prompt: "For x² − 4x + 5 = 0, predict the nature of roots without solving.", hint: "Calculate b² − 4ac." },
        ],
        revision: ["Standardise to ax² + bx + c = 0 first.", "D controls number and type of real roots.", "Real-world constraints can eliminate algebraic roots."],
        formulas: ["x = (−b ± √(b² − 4ac)) / 2a", "D = b² − 4ac", "Sum = −b/a; product = c/a"],
        source: mathSource, minutes: 45,
      },
      {
        slug: "trigonometry", title: "Introduction to Trigonometry", unit: "Geometry and measurement",
        summary: "Trigonometric ratios connect an angle in a right triangle to the ratios of its sides.",
        topics: ["Sine, cosine, tangent", "Complementary angles", "Standard angles", "Identities"],
        notes: [
          { heading: "Label before calculating", points: ["Mark the hypotenuse first; it is opposite the right angle and is the longest side.", "For the chosen acute angle, identify opposite and adjacent sides.", "sin = opposite/hypotenuse, cos = adjacent/hypotenuse, tan = opposite/adjacent."] },
          { heading: "Identities from Pythagoras", points: ["sin²A + cos²A = 1 follows by dividing a² + b² = c² by c².", "tan²A + 1 = sec²A and 1 + cot²A = cosec²A follow from the same triangle.", "Convert everything to sine and cosine when an expression looks complicated."] },
          { heading: "Common mistakes", points: ["Ratios depend on the chosen angle; swapping opposite and adjacent changes tan and cot.", "Memorise 0°, 30°, 45°, 60° and 90° through a compact table, not isolated facts.", "Angles are dimensionless; keep calculator units in degree mode if used."] },
        ],
        importantQuestions: ["In a right triangle with sides 5, 12 and 13, write all six ratios for the smaller acute angle.", "Prove (1 + tan²A)/(1 + cot²A) = tan²A.", "Evaluate sin30° cos60° + cos30° sin60°."],
        exercises: [
          { prompt: "If tan A = 3/4, find sin A and cos A without finding A.", hint: "Use a 3-4-5 right triangle." },
          { prompt: "Show that sin(90° − A) = cos A using side labels.", hint: "The side opposite one acute angle is adjacent to the other." },
        ],
        revision: ["SOH-CAH-TOA is a side-label tool, not a formula to guess with.", "Three core Pythagorean identities.", "Standard-angle table: 0, 1/2, 1/√2, √3/2, 1 for sine."],
        formulas: ["sin²A + cos²A = 1", "1 + tan²A = sec²A", "1 + cot²A = cosec²A"],
        source: mathSource, minutes: 45,
      },
    ]), ...mathExtraChapters],
  },
  {
    id: "science", name: "Science", shortName: "Science", icon: "flask", main: true,
    accent: "#0E7490", softAccent: "#ECFEFF", tagline: "Understand the why behind every observation.",
    books: [
      { title: "Science, Class X", publisher: "NCERT", note: "The HPBOSE 2026–27 book list names the NCERT Science textbook." },
      { title: "Science practical / laboratory manual", publisher: "School-prescribed", note: "Confirm the prescribed practical manual with your school." },
    ],
    curriculumNote: "The HPBOSE Science syllabus organizes prescribed NCERT chapters into four units and lists 13 chapters. The in-app guides below are original explanations, not copies of textbook pages.",
    chapters: chapters("science", [
      {
        slug: "chemical-reactions", title: "Chemical Reactions and Equations", unit: "Chemical substances",
        summary: "A chemical reaction rearranges atoms; a balanced equation records both the substances and their constant total atoms.",
        topics: ["Reactants and products", "Balancing", "Combination and decomposition", "Displacement, oxidation and reduction"],
        notes: [
          { heading: "Evidence is not proof by itself", points: ["Colour change, gas, precipitate, heat and light are useful observations.", "A chemical equation gives stronger evidence by naming reactants and products.", "Physical state symbols (s), (l), (g), (aq) make an equation more informative."] },
          { heading: "Balancing systematically", points: ["Never change a formula's subscripts; change only coefficients.", "Balance metals first, then non-metals, then hydrogen and oxygen.", "Count every atom in a small table after each change."] },
          { heading: "Reaction families", points: ["Combination joins substances; decomposition splits one substance using heat, light or electricity.", "A more reactive metal displaces a less reactive metal from its salt solution.", "Oxidation is oxygen gain or hydrogen loss; reduction is the reverse."] },
        ],
        importantQuestions: ["Balance Fe + H₂O → Fe₃O₄ + H₂ and explain each coefficient.", "Distinguish combination, decomposition and displacement with one original example each.", "Why are respiration and corrosion both oxidation processes?"],
        exercises: [
          { prompt: "Classify 2KClO₃ → 2KCl + 3O₂ and identify the external condition.", hint: "One reactant forms several products; heat is normally supplied." },
          { prompt: "Predict whether copper placed in silver nitrate solution will react.", hint: "Use the reactivity series." },
        ],
        revision: ["Atoms are conserved; coefficients balance them.", "Double-displacement often forms an insoluble precipitate.", "Oxidation and reduction always occur together in redox."],
        formulas: ["Atoms on LHS = atoms on RHS", "A + BC → AC + B (single displacement)"],
        source: scienceSource, minutes: 45,
      },
      {
        slug: "acids-bases-salts", title: "Acids, Bases and Salts", unit: "Chemical substances",
        summary: "Acids and bases are best understood through ions in water, indicators, neutralisation and the pH scale.",
        topics: ["H⁺ and OH⁻ ions", "Indicators", "Neutralisation", "pH and salts"],
        notes: [
          { heading: "What makes an acid acidic", points: ["Acids produce H⁺ ions in aqueous solution; bases produce OH⁻ ions.", "Hydrogen ions exist in water as hydronium, H₃O⁺.", "Dry HCl gas does not change dry litmus because ions need water to move and react."] },
          { heading: "Indicators and pH", points: ["Litmus, phenolphthalein and methyl orange report whether a solution is acidic or basic.", "pH 7 is neutral; lower values are acidic and higher values are basic.", "Universal indicator gives an approximate pH, not a precise laboratory measurement."] },
          { heading: "Everyday salts", points: ["Neutralisation gives salt and water, but the resulting solution need not always be neutral.", "Common salt leads to sodium hydroxide, bleaching powder, baking soda and washing soda industrially.", "Water of crystallisation gives hydrated salts their crystal shape and colour."] },
        ],
        importantQuestions: ["Why does an acid conduct electricity only in aqueous solution?", "Explain neutralisation and give one balanced equation.", "How do baking soda and washing soda differ in formula and use?"],
        exercises: [
          { prompt: "A solution turns phenolphthalein pink. What happens to its pH as dilute acid is added?", hint: "Track pH from above 7 toward 7." },
          { prompt: "Write the reaction of hydrochloric acid with sodium hydroxide.", hint: "Combine H⁺ and OH⁻ to form water." },
        ],
        revision: ["Acid → H⁺(aq); base → OH⁻(aq).", "Acid + base → salt + water.", "Strong acid has lower pH; strong base has higher pH."],
        formulas: ["pH = −log₁₀[H⁺]", "HCl + NaOH → NaCl + H₂O"],
        source: scienceSource, minutes: 45,
      },
      {
        slug: "life-processes", title: "Life Processes", unit: "Living world",
        summary: "Nutrition, respiration, transport and excretion keep an organism's internal systems working together.",
        topics: ["Autotrophic nutrition", "Human digestion", "Respiration", "Transport and excretion"],
        notes: [
          { heading: "Photosynthesis in context", points: ["Plants convert carbon dioxide and water into carbohydrate using light and chlorophyll.", "Stomata control gas exchange; guard cells regulate their opening.", "A variegated-leaf experiment shows chlorophyll is needed for starch formation."] },
          { heading: "Energy release", points: ["Digestion breaks large food molecules into absorbable smaller molecules.", "Aerobic respiration releases more energy than anaerobic respiration.", "ATP is the usable energy currency; energy release happens step by step in cells."] },
          { heading: "Transport and cleaning", points: ["Blood carries gases, nutrients and wastes; haemoglobin carries oxygen.", "The heart's double circulation separates oxygenated and deoxygenated blood.", "Nephrons filter blood and form urine; plants use transpiration and diffusion."] },
        ],
        importantQuestions: ["Explain the role of stomata and guard cells in photosynthesis.", "Compare aerobic and anaerobic respiration with equations.", "Trace a molecule of oxygen from the alveoli to a body cell."],
        exercises: [
          { prompt: "Why do leaves test positive for starch only after exposure to light?", hint: "Connect light, chlorophyll and glucose storage." },
          { prompt: "Explain why the left ventricular wall is thicker than the right.", hint: "Compare the distances each ventricle pumps blood." },
        ],
        revision: ["Photosynthesis stores energy; respiration releases it.", "Small intestine absorbs nutrients through villi.", "Nephron = filtration + selective reabsorption + urine formation."],
        formulas: ["6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂", "Glucose → pyruvate → CO₂ + H₂O + energy (aerobic)"],
        source: scienceSource, minutes: 55,
      },
      {
        slug: "light", title: "Light: Reflection and Refraction", unit: "Natural phenomena",
        summary: "Ray diagrams explain image formation by mirrors and lenses and the bending of light between media.",
        topics: ["Laws of reflection", "Spherical mirrors", "Refraction", "Lenses and power"],
        notes: [
          { heading: "Mirror rules", points: ["The angle of incidence equals the angle of reflection, measured from the normal.", "A concave mirror can form real inverted images or a virtual magnified image depending on object position.", "Use sign conventions consistently before applying the mirror formula."] },
          { heading: "Why light bends", points: ["Speed changes when light crosses a boundary, causing refraction.", "Going from rarer to denser medium bends light toward the normal.", "Refractive index compares the speed of light in two media."] },
          { heading: "Lenses", points: ["A convex lens converges parallel rays; a concave lens diverges them.", "Lens power in dioptres is the reciprocal of focal length in metres.", "Ray diagrams should use at least two principal rays and an arrow for the object."] },
        ],
        importantQuestions: ["Draw a ray diagram for an object between F and 2F of a convex lens.", "State the laws of reflection and describe an experiment to verify them.", "Define refractive index and relate it to the speed of light."],
        exercises: [
          { prompt: "A concave mirror forms a real image 30 cm away when the object is 20 cm away. Find focal length.", hint: "Apply signs carefully to 1/f = 1/v + 1/u." },
          { prompt: "A lens has focal length +0.25 m. Find its power and identify the lens.", hint: "P = 1/f in metres." },
        ],
        revision: ["i = r for reflection.", "Real images are inverted in single mirrors/lenses.", "Power positive → convex; negative → concave."],
        formulas: ["1/f = 1/v + 1/u", "m = −v/u (mirror)", "n = c/v", "P = 1/f (metres)"],
        source: scienceSource, minutes: 55,
      },
      {
        slug: "electricity", title: "Electricity", unit: "Natural phenomena",
        summary: "Potential difference drives charge through a circuit; resistance and circuit arrangement determine current and heating.",
        topics: ["Current and potential difference", "Ohm's law", "Resistors", "Heating effect"],
        notes: [
          { heading: "A useful water-pipe analogy", points: ["Charge is like water, potential difference like pressure difference, and current like flow rate.", "An electric circuit needs a closed path and a source of potential difference.", "Conventional current is treated as flowing from positive to negative outside the source."] },
          { heading: "Ohm's law and resistance", points: ["At constant temperature, V is proportional to I for an ohmic conductor.", "Resistance increases with length and decreases with larger cross-sectional area.", "An ammeter is in series; a voltmeter is connected in parallel."] },
          { heading: "Series, parallel and heat", points: ["Series resistances add; parallel reciprocal resistances add.", "Parallel devices receive the same potential difference and can operate independently.", "Joule heating depends on I²Rt, which explains fuses and heater elements."] },
        ],
        importantQuestions: ["Derive the equivalent resistance of three resistors in series.", "Compare brightness of identical bulbs in series and parallel.", "State Joule's law of heating and give two applications."],
        exercises: [
          { prompt: "A 12 V source drives 2 A through a resistor. Find R and power.", hint: "Use V = IR and P = VI." },
          { prompt: "Find the equivalent resistance of 6 Ω and 3 Ω in parallel.", hint: "Use 1/R = 1/R₁ + 1/R₂." },
        ],
        revision: ["V = IR only when physical conditions stay constant.", "Series: same current; parallel: same voltage.", "P = VI = I²R = V²/R."],
        formulas: ["V = IR", "R_series = ΣR", "1/R_parallel = Σ(1/R)", "H = I²Rt", "P = VI"],
        source: scienceSource, minutes: 50,
      },
    ]),
  },
  {
    id: "social-science", name: "Social Science", shortName: "S. Science", icon: "globe", main: true,
    accent: "#7C3AED", softAccent: "#F5F3FF", tagline: "Connect facts, places, people and ideas.",
    books: [
      { title: "India and the Contemporary World – II", publisher: "NCERT", note: "History." },
      { title: "Contemporary India – II", publisher: "NCERT", note: "Geography." },
      { title: "Democratic Politics – II", publisher: "NCERT", note: "Political Science; only prescribed sections are examinable." },
      { title: "Understanding Economic Development", publisher: "NCERT", note: "Economics." },
      { title: "Disaster Management component", publisher: "HPBOSE-prescribed", note: "Included in the HPBOSE 2026–27 Social Science model paper design." },
    ],
    curriculumNote: "The HPBOSE 2026–27 Social Science model paper includes a Disaster Management unit and a selected chapter blueprint. Not every chapter of the four NCERT books is in the HPBOSE examination scope; check the official blueprint.",
    chapters: chapters("social-science", [
      {
        slug: "nationalism-europe", title: "The Rise of Nationalism in Europe", unit: "History",
        summary: "Nationalism changed Europe's map and political imagination through revolutions, unification and cultural identity.",
        topics: ["French Revolution", "Napoleonic reforms", "1848 revolutions", "Unification of Germany and Italy"],
        notes: [
          { heading: "From subjects to citizens", points: ["The French Revolution introduced popular sovereignty, a common legal system and symbols of national identity.", "Napoleon's Code abolished privileges but also imposed French control, which stirred resistance.", "A nation-state is an idea as much as a territory: people imagine a shared belonging."] },
          { heading: "Forces and reactions", points: ["Liberals wanted representative government and economic freedom; conservatives wanted restored monarchies.", "The 1848 revolutions involved students, workers and middle classes but largely failed politically.", "Culture, language, folklore and music helped build national feeling where political unity was absent."] },
          { heading: "Unification", points: ["Prussian leadership, military strength and diplomacy drove German unification in 1871.", "Italian unification involved Sardinia-Piedmont, diplomatic alliances and popular movements.", "Balkan nationalism combined ethnic claims with great-power rivalry."] },
        ],
        importantQuestions: ["Explain how the French Revolution created the idea of the citizen-nation.", "Why did the 1848 Frankfurt Parliament fail?", "Describe the role of culture in European nationalism."],
        exercises: [
          { prompt: "Create a three-row comparison of liberals, conservatives and nationalists.", hint: "Compare political goal, social base and view of change." },
          { prompt: "Place the 1848 revolutions and German unification on a timeline with one consequence each.", hint: "Focus on cause → event → outcome." },
        ],
        revision: ["Nationalism = shared identity + political claim.", "1848: broad participation, limited immediate success.", "Culture carried nationalism before states existed."],
        source: socialSource, minutes: 45, scopeNote: "Named in the HPBOSE 2026–27 Social Science model paper chapter blueprint.",
      },
      {
        slug: "nationalism-india", title: "Nationalism in India", unit: "History",
        summary: "The freedom movement grew as different groups interpreted swaraj through mass protests, constructive work and negotiation.",
        topics: ["Non-Cooperation", "Civil Disobedience", "Salt March", "Simon Commission and Poona Pact"],
        notes: [
          { heading: "Why a mass movement became possible", points: ["Rowlatt Act repression, Jallianwala Bagh and economic hardship created shared anger.", "Gandhi linked local grievances to a nationwide non-violent method.", "Students, lawyers, peasants, workers and merchants participated in different ways."] },
          { heading: "Reading the Salt March", points: ["Salt was a universal necessity, making the tax a powerful symbol of colonial injustice.", "The march converted an abstract demand into a visible, replicable action.", "British repression widened participation and drew international attention."] },
          { heading: "Different visions", points: ["Some leaders wanted dominion status, others complete independence and revolutionary action.", "Dalit leaders demanded political safeguards; the Poona Pact changed representation.", "The movement included both unity and disagreement over rights, religion and strategy."] },
        ],
        importantQuestions: ["Why was salt chosen for the Civil Disobedience Movement?", "Explain how the Simon Commission turned into a nationwide issue.", "Compare the Non-Cooperation and Civil Disobedience movements."],
        exercises: [
          { prompt: "Write a cause-and-effect chain from Rowlatt Act to Non-Cooperation.", hint: "Use four linked arrows, not a list." },
          { prompt: "Explain one limitation of the Civil Disobedience Movement.", hint: "Consider participation and differing expectations." },
        ],
        revision: ["Symbol + practical grievance made Salt March powerful.", "Mass movements include diverse social groups.", "Poona Pact changed separate electorates to reserved seats."],
        source: socialSource, minutes: 45, scopeNote: "Named in the HPBOSE 2026–27 Social Science model paper chapter blueprint.",
      },
      {
        slug: "gender-religion-caste", title: "Gender, Religion and Caste", unit: "Political Science",
        summary: "Democracy must manage social divisions so that they do not become permanent political inequalities.",
        topics: ["Social divisions", "Political expression", "Overlapping identities", "Representation"],
        notes: [
          { heading: "Divisions are not automatically dangerous", points: ["Every society has differences based on gender, religion, language and caste.", "A division becomes political when a group makes claims on the state.", "Cross-cutting differences reduce conflict; overlapping differences can deepen it."] },
          { heading: "Democratic handling", points: ["Constitutional equality, rights and representation give groups a peaceful route to raise demands.", "It is legitimate to voice group grievances, but excluding others undermines democracy.", "Party competition can either bridge or sharpen social cleavages."] },
          { heading: "Evidence of change", points: ["Education, employment and legal reform have altered gender and caste relations.", "Reservation and local-body representation have widened political participation.", "Unequal outcomes still require careful policy and social change."] },
        ],
        importantQuestions: ["How can social divisions be both a resource and a challenge for democracy?", "Explain overlapping and cross-cutting differences with examples.", "Why is representation important beyond simply holding elections?"],
        exercises: [
          { prompt: "Give one example of a difference becoming a political issue.", hint: "Start with a public demand, then identify the state response." },
          { prompt: "Contrast a party that mobilises only one community with one that builds a broad coalition.", hint: "Think about long-term democratic outcomes." },
        ],
        revision: ["Difference ≠ conflict; political mobilisation is the key step.", "Cross-cutting identities soften division.", "Rights + representation + inclusive politics reduce tension."],
        source: socialSource, minutes: 40, scopeNote: "Named in the HPBOSE 2026–27 Social Science model paper blueprint.",
      },
      {
        slug: "development", title: "Development", unit: "Economics",
        summary: "Development is more than income: different people value security, freedom, equality and a healthy environment.",
        topics: ["Per capita income", "Human Development Index", "Sustainability", "Multiple goals"],
        notes: [
          { heading: "Measuring carefully", points: ["Per capita income = national income ÷ population; it is an average, not a distribution.", "HDI combines income, education and health indicators.", "Averages can hide regional, gender and group inequalities."] },
          { heading: "Conflicting goals", points: ["A dam may provide electricity and irrigation but displace communities and alter ecosystems.", "What is development for one group may be a loss for another.", "Democratic discussion and impact assessment help compare alternatives."] },
          { heading: "Sustainability", points: ["Current use should not exhaust resources needed by future generations.", "Renewable energy, efficient irrigation and waste reduction lower environmental cost.", "Groundwater depletion is a concrete example of unsustainable growth."] },
        ],
        importantQuestions: ["Why can two countries with similar income have different development outcomes?", "Explain how a project can create both gainers and losers.", "What is sustainable development? Give a Himachal-relevant example."],
        exercises: [
          { prompt: "Compare two fictional states: same average income, different literacy and infant mortality.", hint: "Use a non-income indicator to explain the difference." },
          { prompt: "List one environmental and one social cost of a large infrastructure project.", hint: "Think about displaced people and resource use." },
        ],
        revision: ["Income is a means, not the whole goal.", "HDI adds health and education.", "Sustainability adds future generations."],
        source: socialSource, minutes: 40, scope: "cross_reference", scopeNote: "NCERT Economics concept referenced by HPBOSE; check the latest blueprint for chapter-wise weightage.",
      },
      {
        slug: "disaster-management", title: "Disaster Management in Himachal", unit: "Disaster Management",
        summary: "Himachal's steep terrain, monsoon and seismic risk make preparedness, safe response and local knowledge essential.",
        topics: ["Hazard and vulnerability", "Landslides and floods", "Earthquake safety", "Preparedness plan"],
        notes: [
          { heading: "Risk is more than the hazard", points: ["Risk grows when a hazard meets exposed people, weak buildings or limited warning systems.", "Vulnerability includes age, disability, location and access to information.", "A landslide-prone slope is a hazard; an unplanned settlement on it creates disaster risk."] },
          { heading: "Before, during and after", points: ["Before: identify exits, emergency contacts, safe water and a small go-bag.", "During: follow official warnings, avoid damaged slopes/bridges and never enter floodwater.", "After: help injured people only when safe, check utilities and use verified information."] },
          { heading: "Local preparedness", points: ["School and village plans should include drills, maps and a meeting point.", "Keep documents and medicines in waterproof packaging.", "Do not spread unverified rumours during a crisis; use district administration and official alerts."] },
        ],
        importantQuestions: ["Distinguish hazard, vulnerability, capacity and risk with a local example.", "Prepare a four-step school earthquake safety plan.", "Why should roads and construction be considered in landslide preparedness?"],
        exercises: [
          { prompt: "Design a one-page family emergency plan for a monsoon event.", hint: "Include contacts, route, supplies and a communication rule." },
          { prompt: "Explain why a warning alone does not eliminate disaster risk.", hint: "Consider who receives, understands and can act on it." },
        ],
        revision: ["Disaster = hazard + vulnerability − capacity.", "Preparedness beats improvisation.", "Follow official local instructions."],
        source: "HPBOSE 2026–27 Social Science model paper design (Disaster Management unit)", minutes: 35, scope: "verify", scopeNote: "HPBOSE includes a Disaster Management unit; use the official prescribed material for detailed examination content.",
      },
    ]),
  },
  {
    id: "english", name: "English", shortName: "English", icon: "book",
    accent: "#EA580C", softAccent: "#FFF7ED", tagline: "Read closely, write clearly, express confidently.",
    books: [
      { title: "First Flight", publisher: "NCERT / HPBOSE-prescribed", note: "Main reader." },
      { title: "Footprints without Feet", publisher: "NCERT / HPBOSE-prescribed", note: "Supplementary reader." },
      { title: "Words and Expressions – 2", publisher: "NCERT", note: "Workbook." },
    ],
    curriculumNote: "The HPBOSE Class 10 English syllabus prescribes selected First Flight and Footprints without Feet lessons, plus reading, writing and grammar sections. Original study notes below discuss themes and skills; textbook prose is not reproduced.",
    chapters: chapters("english", [
      {
        slug: "letter-to-god", title: "A Letter to God", unit: "First Flight: prose",
        summary: "The chapter explores sincere faith, human kindness and the irony that help can arrive through imperfect people.",
        topics: ["Character and motive", "Irony", "Narrative structure", "Theme"],
        notes: [
          { heading: "Reading the characters", points: ["Lencho's confidence in God shapes every action, including his literal letter.", "The postmaster initially laughs, then admires the faith and chooses to help.", "Post office employees contribute anonymously, turning an institution into a community."] },
          { heading: "The turning point", points: ["The donated amount is less than requested, so Lencho assumes the postal staff kept part of it.", "This situational irony reveals both his unshakeable faith and his lack of trust in people.", "The ending stays open: readers decide whether to smile, worry or question."] },
          { heading: "Writing about theme", points: ["State a theme as a complete idea, not one word: 'Faith can inspire generosity, but unexamined suspicion can distort it.'", "Support each claim with a specific action from the story.", "Avoid retelling the whole plot in a theme answer."] },
        ],
        importantQuestions: ["How does the postmaster's response change through the story?", "What is ironic about Lencho's second letter?", "Write a brief character sketch of Lencho with two textual references."],
        exercises: [
          { prompt: "Write a 120-word alternative ending in which Lencho learns who helped him.", hint: "Keep his faith intact but add a new conversation." },
          { prompt: "Frame one theme statement and two supporting details.", hint: "Use an idea sentence, not a topic phrase." },
        ],
        revision: ["Faith, generosity and irony are central.", "The postmaster is a dynamic character.", "A theme answer needs evidence, not just plot summary."],
        source: englishSource, minutes: 35,
      },
      {
        slug: "nelson-mandela", title: "Nelson Mandela: Long Walk to Freedom", unit: "First Flight: prose",
        summary: "An inaugural address links personal courage to the collective idea of freedom and constitutional democracy.",
        topics: ["Context", "Freedom as responsibility", "Rhetoric", "Vocabulary in context"],
        notes: [
          { heading: "Historical frame", points: ["The passage is set after the end of apartheid and Mandela's inauguration.", "Apartheid legally separated and oppressed South Africa's Black majority.", "The ceremony symbolises a transfer of power to a representative government."] },
          { heading: "How the argument widens", points: ["Mandela begins with an individual's hunger for freedom.", "He then says freedom is indivisible: oppressor and oppressed are both diminished.", "Finally he defines courage not as absence of fear but as triumph over it."] },
          { heading: "Rhetorical technique", points: ["Repetition and parallel phrases create a speech-like rhythm.", "Abstract nouns such as dignity, justice and courage carry the central values.", "Personal memory makes political ideas emotionally accessible."] },
        ],
        importantQuestions: ["What does Mandela mean by 'the oppressor is also unfree'?", "Explain the line about courage and fear.", "How does the speech connect personal experience to national healing?"],
        exercises: [
          { prompt: "Write a 100-word paragraph on freedom as responsibility.", hint: "Give one concrete school or community example." },
          { prompt: "Identify one example of repetition and explain its effect.", hint: "Look for a phrase that returns in a later paragraph." },
        ],
        revision: ["Apartheid = institutionalised racial segregation.", "Freedom is relational, not merely personal.", "Courage = acting despite fear."],
        source: englishSource, minutes: 40,
      },
      {
        slug: "writing-skills", title: "Writing Skills: Letters, Notices and Articles", unit: "Exam skill",
        summary: "Board writing tasks reward a clear format, relevant content, logical order and controlled language.",
        topics: ["Formal letter", "Notice", "Article", "Tone and organisation"],
        notes: [
          { heading: "Plan before drafting", points: ["Underline the role, audience, purpose and word limit in the question.", "Note three content points before writing the first sentence.", "Reserve a minute to check format and grammar."] },
          { heading: "Format essentials", points: ["A formal letter includes sender's address, date, recipient's address, subject, salutation, body and complimentary close.", "A notice uses a box, institution name, NOTICE, date, heading, concise body and signature/designation.", "An article has a title, byline, introduction, developed body and concluding suggestion."] },
          { heading: "Language choices", points: ["Letters to authority stay polite and specific; notices stay impersonal and factual.", "Use paragraphs, linkers and one idea per paragraph.", "Avoid memorised ornamental phrases that do not answer the prompt."] },
        ],
        importantQuestions: ["Draft a formal letter requesting remission of a library fine.", "Write a notice for a school environment drive in about 50 words.", "Write an article on healthy digital habits in 120–150 words."],
        exercises: [
          { prompt: "Convert a given set of five facts into a notice.", hint: "Answer who, what, when, where and whom to contact." },
          { prompt: "Rewrite one casual sentence in formal tone.", hint: "Replace colloquial verbs and add a clear purpose." },
        ],
        revision: ["R-A-P: role, audience, purpose.", "Never exceed the word limit by a large margin.", "Format + content + accuracy all carry marks."],
        source: "HPBOSE Class 10 English syllabus and official 2026–27 model paper writing section", minutes: 40,
      },
      {
        slug: "reading-grammar", title: "Reading Comprehension and Grammar", unit: "Exam skill",
        summary: "Unseen passages and grammar questions test careful reading, inference and accurate sentence control.",
        topics: ["Skimming and scanning", "Inference", "Tenses and agreement", "Editing"],
        notes: [
          { heading: "Reading with a purpose", points: ["Read questions first, then scan for names, numbers and contrast words.", "Distinguish a directly stated fact from an inference supported by the passage.", "Do not import personal opinions into a comprehension answer."] },
          { heading: "Grammar in context", points: ["Subject–verb agreement depends on the true subject, not the nearest noun.", "Choose tense using the time frame of the whole sentence.", "In editing tasks, identify the error before proposing a correction."] },
          { heading: "Answer presentation", points: ["Use the passage's key words but frame the answer in your own sentence.", "For vocabulary questions, substitute the option and reread the line.", "Keep MCQ mark selection final only after eliminating distractors."] },
        ],
        importantQuestions: ["Explain the difference between a factual and inferential comprehension question.", "Edit a short paragraph with tense and agreement errors.", "Find a word in a passage that means 'careful and attentive'."],
        exercises: [
          { prompt: "Read a short news paragraph and write a 20-word summary without opinions.", hint: "Keep who, what, when and result." },
          { prompt: "Correct: 'Each of the students have submitted their notebook.'", hint: "Each is singular." },
        ],
        revision: ["Scan for evidence; infer only from the text.", "Check agreement and time markers.", "Answer in complete, concise sentences."],
        source: "HPBOSE Class 10 English syllabus and official 2026–27 model paper sections A–D", minutes: 35,
      },
    ]),
  },
  {
    id: "hindi", name: "Hindi", shortName: "Hindi", icon: "language",
    accent: "#DC2626", softAccent: "#FEF2F2", tagline: "भाव, भाषा और अभिव्यक्ति को समझें।",
    books: [
      { title: "क्षितिज भाग-2 / कृतिका भाग-2", publisher: "NCERT", note: "Course A; verify if your school follows Course B." },
      { title: "स्पर्श भाग-2 / संचयन भाग-2", publisher: "NCERT", note: "Course B alternative; not all chapters are in every board syllabus." },
      { title: "व्याकरण पुस्तक", publisher: "School-prescribed", note: "Confirm with the official HPBOSE book list for your course." },
    ],
    curriculumNote: "Hindi Course A/B depends on the school. These original concept guides cover common literary, grammar and writing skills; verify the exact prescribed lessons and grammar portions before exam preparation.",
    chapters: chapters("hindi", [
      {
        slug: "surdas-pad", title: "सूरदास के पद", unit: "काव्य अध्ययन",
        summary: "सूरदास के पद कृष्ण-बाललीला, वात्सल्य और भक्ति की सरल परंतु गहन अभिव्यक्ति हैं।",
        topics: ["भक्ति काव्य", "वात्सल्य रस", "ब्रजभाषा", "भावार्थ"],
        notes: [
          { heading: "भाव पढ़ने का तरीका", points: ["पद में कौन बोल रहा है, किससे और किस अवस्था में—पहले यह पहचानें।", "शब्दों के शाब्दिक अर्थ के साथ उनके भाव-अर्थ भी लिखें।", "बाल-स्वभाव और मातृ-प्रेम के संकेत अलग-अलग चिह्नित करें।"] },
          { heading: "भाषा और अलंकार", points: ["ब्रजभाषा के 'हैं', 'जसोदा', 'माखन' जैसे शब्दों का संदर्भ समझें।", "अनुप्रास और पुनरुक्ति से लय बनती है; केवल नाम याद न करें।", "हर अलंकार का प्रभाव बताएँ—स्वर, स्नेह या चित्रात्मकता।"] },
          { heading: "उत्तर-लेखन", points: ["भावार्थ अपने शब्दों में लिखें; मूल पद की पंक्तियाँ न सजाएँ।", "केंद्रीय भाव + दो पाठ्य संकेत + एक व्याख्या—यह तीन-भाग संरचना उपयोगी है।", "प्रश्न के 'क्यों' या 'कैसे' पर सीधे उत्तर दें।"] },
        ],
        importantQuestions: ["पदों में कृष्ण के बाल-स्वभाव के दो संकेत स्पष्ट कीजिए।", "वात्सल्य रस का अर्थ एक उदाहरण सहित लिखिए।", "भक्ति और लोक-व्यवहार का संबंध इन पदों में कैसे दिखता है?"],
        exercises: [
          { prompt: "किसी एक पद का 60 शब्दों में भावार्थ लिखिए।", hint: "पहले दृश्य, फिर भाव, अंत में संदेश।" },
          { prompt: "ब्रजभाषा के दो शब्दों के समकालीन हिंदी रूप लिखिए।", hint: "संदर्भ से अर्थ निकालें, अटकल न लगाएँ।" },
        ],
        revision: ["वात्सल्य = माता-पिता का स्नेह।", "भावार्थ अनुवाद नहीं, व्याख्या है।", "अलंकार के साथ प्रभाव लिखें।"],
        source: hindiSource, minutes: 35, scope: "verify", scopeNote: "Common Course A literary chapter; verify your school's HPBOSE-prescribed course and lesson list.",
      },
      {
        slug: "ram-lakshman", title: "राम-लक्ष्मण-परशुराम संवाद", unit: "काव्य अध्ययन",
        summary: "तुलसीदास का संवाद संयम, विनम्रता, तेज और वाक्-चातुर्य का संतुलित नाटकीय चित्र है।",
        topics: ["संवाद शैली", "चरित्र-चित्रण", "विनम्रता और गर्व", "प्रसंग"],
        notes: [
          { heading: "संघर्ष को पढ़ना", points: ["धनुष-भंग के बाद परशुराम का क्रोध और लक्ष्मण का उत्तर दो ध्रुव बनाते हैं।", "राम मध्यस्थ और संयमी हैं; वे बड़ों के प्रति विनम्र रहते हैं।", "संवाद में प्रश्न-उत्तर की तीव्रता से नाटकीयता बढ़ती है।"] },
          { heading: "भाषा और व्यंग्य", points: ["लक्ष्मण के तीखे परंतु सटीक वाक्य चरित्र की निर्भीकता दिखाते हैं।", "तुलसी के दोहे/चौपाई में लय और संक्षिप्तता अर्थ को तीक्ष्ण बनाती है।", "व्यंग्य का लक्ष्य और उसका प्रभाव अलग-अलग लिखें।"] },
          { heading: "परख-योग्य बातें", points: ["केवल 'कौन बोला' याद करने से चरित्र-विश्लेषण नहीं बनता।", "प्रत्येक चरित्र के मूल्य—संयम, साहस, गुरु-सम्मान—पाठ्य संकेत से जोड़ें।", "घटनाक्रम और भाव-परिवर्तन दोनों पर ध्यान दें।"] },
        ],
        importantQuestions: ["लक्ष्मण और परशुराम के स्वभाव की तुलना कीजिए।", "राम की विनम्रता पाठ में कैसे उभरती है?", "संवाद की नाटकीयता के दो कारण लिखिए।"],
        exercises: [
          { prompt: "किसी एक पात्र का 80 शब्दों में चरित्र-चित्रण कीजिए।", hint: "गुण + पाठ्य संकेत + प्रभाव।" },
          { prompt: "एक व्यंग्य-वाक्य चुनकर उसका भाव समझाइए।", hint: "शाब्दिक अर्थ और अभीष्ट अर्थ अलग लिखें।" },
        ],
        revision: ["संवाद = पात्र + तनाव + प्रतिक्रिया।", "राम: संयम; लक्ष्मण: तेज; परशुराम: क्रोध।", "उदाहरण बिना चरित्र-चित्रण अधूरा।"],
        source: hindiSource, minutes: 40, scope: "verify", scopeNote: "Common Course A lesson; verify your school's course and prescribed portion.",
      },
      {
        slug: "netaji-chashma", title: "नेताजी का चश्मा", unit: "गद्य अध्ययन",
        summary: "व्यंग्य-प्रधान कहानी दिखावे, अफसरशाही और सच्चे स्वाभिमान पर हल्का परंतु तीखा प्रश्न करती है।",
        topics: ["व्यंग्य", "पात्र-परिचय", "कथानक", "सामाजिक संदर्भ"],
        notes: [
          { heading: "हास्य के भीतर आलोचना", points: ["चश्मा एक वस्तु से आगे बढ़कर प्रतिष्ठा का प्रतीक बनता है।", "लेखक अतिशयोक्ति और विसंगति से पात्रों की मानसिकता उजागर करते हैं।", "हँसी का उद्देश्य किसी व्यक्ति को शर्मिंदा करना नहीं, सोच दिखाना है।"] },
          { heading: "कहानी की संरचना", points: ["स्थापना में परिचय, मध्य में तनाव, अंत में व्यंग्यपूर्ण मोड़ आता है।", "छोटे संवाद पात्रों की सोच जल्दी प्रकट करते हैं।", "कथन और वर्णन के बीच अंतर पहचानें।"] },
          { heading: "उत्तर में संतुलन", points: ["व्यंग्य का लक्ष्य बताएँ; केवल 'मज़ाकिया है' पर्याप्त नहीं।", "एक घटना और एक पात्र-प्रतिक्रिया जोड़ें।", "अपनी राय अंत में संक्षेप में दें।"] },
        ],
        importantQuestions: ["चश्मा किस सामाजिक सोच का प्रतीक बन जाता है?", "कहानी का व्यंग्य-बिंदु स्पष्ट कीजिए।", "किसी एक पात्र की मानसिकता का विश्लेषण कीजिए।"],
        exercises: [
          { prompt: "कहानी के शीर्षक की सार्थकता 70 शब्दों में लिखिए।", hint: "वस्तु → प्रतीक → व्यंग्य।" },
          { prompt: "हास्य और व्यंग्य में अंतर एक उदाहरण से समझाइए।", hint: "व्यंग्य में सुधार की दिशा छिपी होती है।" },
        ],
        revision: ["व्यंग्य = हास्य + आलोचना + सूक्ष्म संदेश।", "प्रतीक का अर्थ प्रसंग से निकालें।", "कथानक और उद्देश्य अलग-अलग लिखें।"],
        source: hindiSource, minutes: 40, scope: "verify", scopeNote: "Common Course A prose lesson; verify your school's course and prescribed portion.",
      },
      {
        slug: "hindi-grammar", title: "संधि, समास और रचना-कौशल", unit: "व्याकरण और लेखन",
        summary: "व्याकरण के नियमों को पहचानकर उन्हें अनुच्छेद, पत्र और भावार्थ में सही ढंग से प्रयोग करना सीखें।",
        topics: ["संधि-विच्छेद", "समास", "वाक्य-शुद्धि", "औपचारिक पत्र"],
        notes: [
          { heading: "पहचान से नियम तक", points: ["संधि में दो निकटवर्ती वर्णों के मेल से परिवर्तन होता है; विच्छेद में मूल रूप लौटते हैं।", "समास में समस्त पद का विग्रह करते समय विभक्ति/संबंध स्पष्ट लिखें।", "केवल परिभाषा याद करने से अज्ञात उदाहरण नहीं सुलझते—विश्लेषण अभ्यास करें।"] },
          { heading: "वाक्य-शुद्धि", points: ["कर्ता, क्रिया, लिंग, वचन और काल का मेल जाँचें।", "अनावश्यक पुनरुक्ति और अंग्रेज़ी वाक्य-क्रम के अतिक्रमण से बचें।", "विराम-चिह्न अर्थ बदल सकते हैं; पूरा वाक्य पढ़कर सुधार करें।"] },
          { heading: "रचना की रूपरेखा", points: ["औपचारिक पत्र में प्रेषक, दिनांक, प्रापक, विषय, संबोधन, विषय-वस्तु और हस्ताक्षर क्रम से रखें।", "अनुच्छेद में एक केंद्रीय विचार, दो समर्थक बिंदु और एक निष्कर्ष रखें।", "भाषा सरल, विनम्र और प्रश्न-केन्द्रित हो।"] },
        ],
        importantQuestions: ["स्वर संधि और व्यंजन संधि में अंतर उदाहरण सहित लिखिए।", "तत्पुरुष और कर्मधारय समास पहचानिए।", "एक औपचारिक पत्र की रूपरेखा बनाइए।"],
        exercises: [
          { prompt: "दिए गए तीन समस्त पदों का विग्रह कीजिए और प्रकार बताइए।", hint: "पहले अंतिम पद और उससे पहले का संबंध देखें।" },
          { prompt: "एक अशुद्ध वाक्य सुधारकर कारण लिखिए।", hint: "लिंग-वचन या काल की असंगति खोजें।" },
        ],
        revision: ["संधि = वर्ण-मेल; समास = पद-मेल।", "वाक्य-शुद्धि में कर्ता-क्रिया-विशेषण जाँचें।", "लेखन में प्रारूप और उद्देश्य साथ चलते हैं।"],
        source: hindiSource, minutes: 40, scope: "cross_reference", scopeNote: "Grammar topics vary by course and school-prescribed book; confirm exact portions.",
      },
    ]),
  },
  {
    id: "sanskrit", name: "Sanskrit", shortName: "Sanskrit", icon: "sparkles",
    accent: "#B45309", softAccent: "#FFFBEB", tagline: "शब्द, अर्थ और व्याकरण का आत्मविश्वास।",
    books: [
      { title: "शेमुषी भाग-2", publisher: "NCERT / school-prescribed", note: "Main reader; verify edition." },
      { title: "अभ्यासवान् भव / व्याकरण पुस्तक", publisher: "NCERT or HPBOSE-prescribed", note: "Grammar/workbook; verify with your school." },
    ],
    curriculumNote: "Sanskrit book prescriptions and grammar portions can vary by school and course. The guides below explain concepts in original language and do not reproduce full textbook passages.",
    chapters: chapters("sanskrit", [
      {
        slug: "shuchi-paryavaranam", title: "शुचिपर्यावरणम्", unit: "गद्य अध्ययन",
        summary: "यह पाठ स्वच्छ पर्यावरण, सामूहिक उत्तरदायित्व और प्रकृति-संतुलन पर केन्द्रित है।",
        topics: ["पर्यावरण शब्दावली", "गद्य-अनुवाद", "प्रश्न-निर्माण", "सारांश"],
        notes: [
          { heading: "शब्दों को वाक्य में रखें", points: ["'शुचि' का अर्थ शुद्ध/स्वच्छ और 'पर्यावरणम्' का अर्थ आस-पास का वातावरण है।", "संज्ञा-लिंग, वचन और विभक्ति पहचानकर अन्वय बनाएँ।", "क्रियापद ढूँढ़ना अनुवाद का पहला चरण है।"] },
          { heading: "अन्वय-पद्धति", points: ["कर्ता → कर्म → अन्य कारक → क्रिया—इस क्रम से वाक्य सजाएँ।", "संयोजक अव्यय जैसे 'च', 'तु', 'यतः' अर्थ-संबंध बताते हैं।", "शब्द-प्रतिशब्द अनुवाद से बचें; हिंदी/अंग्रेज़ी में स्वाभाविक वाक्य बनाएँ।"] },
          { heading: "भाव और विचार", points: ["स्वच्छता केवल व्यक्तिगत आदत नहीं, सार्वजनिक ज़िम्मेदारी है।", "जल, वायु, वृक्ष और मृत्तिका परस्पर जुड़े हैं।", "पाठ के विचार को अपने विद्यालय के एक उदाहरण से जोड़ें।"] },
        ],
        importantQuestions: ["शुचिपर्यावरणम् का केंद्रीय संदेश अपने शब्दों में लिखिए।", "पाठ से दो पर्यावरण-संबंधी शब्द चुनकर वाक्य बनाइए।", "विद्यालय में स्वच्छता के दो व्यावहारिक उपाय सुझाइए।"],
        exercises: [
          { prompt: "एक सरल संस्कृत वाक्य का अन्वय और अनुवाद लिखिए।", hint: "पहले क्रियापद, फिर कर्ता पहचानें।" },
          { prompt: "पाठ के आधार पर तीन-बिंदु सारांश बनाइए।", hint: "समस्या, कारण, समाधान।" },
        ],
        revision: ["क्रियापद → कर्ता → कारक → अर्थ।", "अव्यय संबंध दिखाते हैं।", "अनुवाद प्रसंग-अनुसार हो, शब्द-दर-शब्द नहीं।"],
        source: sanskritSource, minutes: 35, scope: "verify", scopeNote: "Common NCERT reader chapter; verify the exact HPBOSE-prescribed edition and portions.",
      },
      {
        slug: "buddhi-balavati", title: "बुद्धिर्बलवती सदा", unit: "गद्य अध्ययन",
        summary: "कथा-शैली में यह पाठ दिखाता है कि विवेक और बुद्धि शारीरिक बल से अधिक प्रभावी हो सकते हैं।",
        topics: ["कथा-क्रम", "विशेषण-विशेष्य", "कारण-कार्य", "नैतिक भाव"],
        notes: [
          { heading: "कथा को समझना", points: ["पात्र, स्थान, समस्या और निर्णय—चार बिंदुओं में कथा सारांश लिखें।", "हर घटना के बाद 'अतः' जोड़कर कारण-शृंखला बनाएँ।", "अंतिम निर्णय से पाठ का संदेश निकालें।"] },
          { heading: "व्याकरण-निरीक्षण", points: ["विशेषण और विशेष्य में लिंग, वचन, विभक्ति का मेल देखें।", "भूतकाल के 'लङ्' रूप और वर्तमान 'लट्' रूप में अंतर पहचानें।", "सर्वनाम किस संज्ञा की ओर इंगित करता है, यह प्रसंग से तय करें।"] },
          { heading: "उत्तर-शैली", points: ["एक-शब्द उत्तर में विभक्ति-सहित उचित रूप दें।", "भावार्थ में 'क्या हुआ' और 'क्या सीख मिली' दोनों जोड़ें।", "नैतिकता का सामान्य उपदेश न लिखकर पाठ्य घटना से जोड़ें।"] },
        ],
        importantQuestions: ["बुद्धि को बल से श्रेष्ठ क्यों कहा गया?", "कथा के निर्णायक मोड़ की व्याख्या कीजिए।", "पाठ से एक विशेषण-विशेष्य युग्म पहचानिए।"],
        exercises: [
          { prompt: "कथा का पाँच-वाक्य सारांश संस्कृत या हिंदी में लिखिए।", hint: "क्रम और कारण दोनों रखें।" },
          { prompt: "एक वाक्य में 'बल' और 'बुद्धि' का अंतर स्पष्ट कीजिए।", hint: "शारीरिक सामर्थ्य बनाम निर्णय-क्षमता।" },
        ],
        revision: ["बुद्धि = समस्या-समाधान की क्षमता।", "कथा-सारांश में कारण-शृंखला आवश्यक।", "विशेषण-विशेष्य का त्रय-मेल जाँचें।"],
        source: sanskritSource, minutes: 35, scope: "verify", scopeNote: "Common NCERT reader chapter; verify the exact prescribed edition and portions.",
      },
      {
        slug: "subhashitani", title: "सुभाषितानि", unit: "पद्य अध्ययन",
        summary: "छोटे श्लोकों में अनुशासन, ज्ञान, मित्रता और सदाचार जैसे विचार संक्षेप में व्यक्त होते हैं।",
        topics: ["श्लोक-अन्वय", "सूक्ति का भाव", "छन्द-लय", "स्मरण-विधि"],
        notes: [
          { heading: "श्लोक पढ़ने का क्रम", points: ["पदच्छेद करें, फिर अन्वय लिखें, अंत में भावार्थ बनाएँ।", "समास या सन्धि का विग्रह कर अर्थ स्पष्ट करें।", "एक श्लोक में अक्सर एक उपमा या विरोधाभास होता है—उसे पहचानें।"] },
          { heading: "भाव को व्यवहार से जोड़ें", points: ["सूक्ति का सार एक सरल वाक्य में लिखें।", "विद्यालयी जीवन से एक छोटा उदाहरण जोड़ें।", "कंठस्थ करने से पहले अर्थ समझें; तब स्मरण टिकता है।"] },
          { heading: "परीक्षा-योग्य प्रस्तुति", points: ["अन्वय, अर्थ और भाव—तीनों अलग-अलग शीर्षकों में लिखें।", "श्लोक का संदर्भ बताते समय केवल अनुवाद न दोहराएँ।", "व्याकरण-प्रश्न में विभक्ति/वचन/लकार स्पष्ट लिखें।"] },
        ],
        importantQuestions: ["किसी सूक्ति का अन्वय सहित भावार्थ लिखिए।", "ज्ञान या परिश्रम पर आधारित सूक्ति का संदेश स्पष्ट कीजिए।", "श्लोक में आए एक सन्धि-पद का विग्रह कीजिए।"],
        exercises: [
          { prompt: "एक सूक्ति को अपने दैनिक अध्ययन-क्रम से जोड़िए।", hint: "विचार → क्रिया → परिणाम।" },
          { prompt: "पदच्छेद और अन्वय में क्या अंतर है?", hint: "पहला तोड़ना, दूसरा वाक्य-क्रम सजाना।" },
        ],
        revision: ["पदच्छेद → अन्वय → अर्थ → भाव।", "सूक्ति संक्षिप्त परंतु व्यावहारिक ज्ञान है।", "अर्थ समझकर याद करें।"],
        source: sanskritSource, minutes: 30, scope: "verify", scopeNote: "Common NCERT poetry section; verify the prescribed shlokas with your school.",
      },
      {
        slug: "sanskrit-grammar", title: "सन्धि, कारक और वाक्य-निर्माण", unit: "व्याकरण",
        summary: "सन्धि और कारक का नियम-आधारित अभ्यास अनुवाद, अपठित गद्य और लेखन को सरल बनाता है।",
        topics: ["स्वर सन्धि", "विसर्ग सन्धि", "कारक-विभक्ति", "धातु-रूप"],
        notes: [
          { heading: "सन्धि को पहचानना", points: ["पहले संयुक्त वर्ण को तोड़ें और दोनों मूल वर्ण लिखें।", "गुण, वृद्धि, यण् और दीर्घ जैसे परिवर्तनों को उदाहरण-सहित तालिका में रखें।", "विसर्ग सन्धि में अगला वर्ण निर्णय बदल देता है; केवल अंतिम रूप मत देखिए।"] },
          { heading: "कारक का तर्क", points: ["कर्ता प्रथमा, कर्म द्वितीया, करण तृतीया, संप्रदान चतुर्थी—क्रिया से संबंध पूछें।", "अपादान पंचमी 'से अलगाव' और अधिकरण सप्तमी 'में/पर' दिखाती है।", "हिंदी 'से' हमेशा तृतीया नहीं होता; अर्थ देखकर विभक्ति चुनें।"] },
          { heading: "वाक्य-निर्माण", points: ["कर्ता के अनुसार क्रिया का पुरुष और वचन तय करें।", "विशेषण को विशेष्य के लिंग-वचन-विभक्ति में रखें।", "अनुवाद के बाद प्रत्येक पद का कारक-संबंध जाँचें।"] },
        ],
        importantQuestions: ["स्वर सन्धि के दो नियम उदाहरण सहित लिखिए।", "करण और अपादान कारक में अंतर स्पष्ट कीजिए।", "एक हिंदी वाक्य का शुद्ध संस्कृत अनुवाद कीजिए।"],
        exercises: [
          { prompt: "तीन सन्धि-पदों का विग्रह कर नियम लिखिए।", hint: "पूर्व-वर्ण + पर-वर्ण → परिवर्तन।" },
          { prompt: "'बालकः पुस्तकं पठति' में प्रत्येक पद का कारक बताइए।", hint: "क्रिया 'पठति' से प्रश्न पूछें।" },
        ],
        revision: ["नियम + उदाहरण + अपवाद।", "कारक अर्थ-संबंध है, हिंदी पर्याय नहीं।", "विशेषण-विशेष्य का मेल अनिवार्य।"],
        source: sanskritSource, minutes: 45, scope: "cross_reference", scopeNote: "Grammar portions depend on the prescribed workbook; verify exact scope.",
      },
    ]),
  },
  {
    id: "computer-science", name: "Computer Science", shortName: "Computer", icon: "monitor",
    accent: "#059669", softAccent: "#ECFDF5", tagline: "Practical digital skills for school and beyond.",
    books: [
      { title: "Computer Science, Class 10", publisher: "HPBOSE-prescribed", note: "Verify the textbook and practical book with the official book list/school." },
      { title: "Computer Science practical book", publisher: "HPBOSE-prescribed", note: "Practical work follows the school's prescribed manual." },
    ],
    curriculumNote: "The HPBOSE Class 10 Computer Science syllabus defines CS-201 Digital Literacy, CS-202 Network and Internet Concepts, CS-203 Digital Documentation and CS-204 Digital Data Tabulation. This subject may be optional depending on the school.",
    chapters: chapters("computer-science", [
      {
        slug: "digital-literacy", title: "Digital Literacy (Advanced)", unit: "CS-201",
        summary: "Identify common input, output and display devices and use them safely and responsibly.",
        topics: ["Hardware categories", "Printers and displays", "Output devices", "Safe handling"],
        notes: [
          { heading: "Classify by function", points: ["Input devices send data to a computer; output devices present processed results.", "LED, LCD and plasma displays differ in how they produce or control light.", "A printer is an output device; a scanner is an input device."] },
          { heading: "Choosing a device", points: ["Resolution, connectivity, paper handling and running cost matter more than appearance alone.", "Projectors and digital screens need correct brightness, source selection and safe cabling.", "Speakers, fax machines and plotters have distinct purposes despite being peripherals."] },
          { heading: "Practical safety", points: ["Power off and unplug before cleaning or connecting older peripherals.", "Use manufacturer instructions for consumables such as ink or toner.", "Label cables and keep ventilation clear to prevent overheating."] },
        ],
        importantQuestions: ["Distinguish input, output and storage devices with two examples each.", "Compare LED and LCD display characteristics in everyday language.", "List three safe-handling rules for shared computer-lab hardware."],
        exercises: [
          { prompt: "Make a table of five lab devices with their function and category.", hint: "Use action verbs: captures, displays, prints, stores." },
          { prompt: "A document prints faded pages. List two non-destructive checks.", hint: "Check consumable level and print settings first." },
        ],
        revision: ["Function, not shape, decides the device category.", "Display technology affects brightness, power and viewing angle.", "Safety begins with power and cables."],
        source: csSource, minutes: 30,
      },
      {
        slug: "network-internet", title: "Network and Internet Concepts", unit: "CS-202",
        summary: "Network types, browsers, search engines and e-mail form the basic vocabulary of connected computing.",
        topics: ["LAN/MAN/WAN/PAN", "Internet and web", "Browsers and search", "E-mail etiquette"],
        notes: [
          { heading: "Scale of a network", points: ["PAN covers personal devices; LAN covers a room/building; MAN a city; WAN a wide geographical area.", "The classification is about scale and ownership, not merely speed.", "A school lab is usually a LAN connected through a gateway to the internet."] },
          { heading: "Internet is not the web", points: ["The internet is the global network infrastructure; the web is a service running on it.", "A browser requests and renders web pages; a search engine indexes pages.", "Check URL, spelling and source before trusting information."] },
          { heading: "Responsible e-mail", points: ["Use a clear subject, short greeting, structured body and signature.", "Verify attachments before opening; never share passwords or OTPs.", "Reply-all and forwarding personal information both need extra care."] },
        ],
        importantQuestions: ["Compare LAN, MAN, WAN and PAN by coverage and example.", "Explain the difference between a browser and a search engine.", "Write five e-mail safety and etiquette rules."],
        exercises: [
          { prompt: "Classify a smartwatch-phone link, a school lab, a city network and a global bank network.", hint: "Order by geographical coverage." },
          { prompt: "Draft a short e-mail requesting a computer-lab slot.", hint: "Include subject, purpose, date and polite close." },
        ],
        revision: ["PAN < LAN < MAN < WAN by typical coverage.", "Internet = network; web = service.", "Verify source, URL, sender and attachment."],
        source: csSource, minutes: 35,
      },
      {
        slug: "word-processing", title: "Digital Documentation: Word Processing", unit: "CS-203",
        summary: "A well-formatted document is easy to revise, navigate and print.",
        topics: ["File operations", "Formatting", "Tables", "Mail merge"],
        notes: [
          { heading: "Structure before decoration", points: ["Use styles/headings so navigation and formatting stay consistent.", "Page setup, margins and orientation should be decided before detailed layout.", "Save with a clear file name and keep a recoverable backup."] },
          { heading: "Editing tools", points: ["Find and Replace speeds repeated corrections; review each replacement where meaning may change.", "Bullets show unordered lists; numbering shows steps or priority.", "Superscript/subscript, symbols, borders and Format Painter have specific uses."] },
          { heading: "Tables and mail merge", points: ["Plan rows/columns before inserting a table; merge cells only for a clear heading.", "Mail merge combines a main document with a data source to generate individual letters.", "Always preview a few merged records before printing all copies."] },
        ],
        importantQuestions: ["List the steps to create, save and print-preview a document.", "When would you use mail merge instead of copying a letter?", "Explain the difference between merging and splitting table cells."],
        exercises: [
          { prompt: "Plan a one-page school notice with heading, table and footer.", hint: "Sketch structure first, then choose tools." },
          { prompt: "Describe a safe workflow for Find and Replace in a long report.", hint: "Use specific matches and review changes." },
        ],
        revision: ["Styles save repeated work.", "Tables organise data; borders do not create structure.", "Mail merge = template + data source + preview."],
        source: csSource, minutes: 45,
      },
      {
        slug: "spreadsheets", title: "Digital Data Tabulation: Spreadsheet", unit: "CS-204",
        summary: "Spreadsheets organise data into cells and use formulas to turn raw values into useful information.",
        topics: ["Workbook and worksheet", "Cell references", "Formulas and functions", "Charts and formatting"],
        notes: [
          { heading: "Think in cells", points: ["A workbook holds worksheets; a cell is addressed by column letter and row number.", "Enter numbers, text, dates and times with the intended data type.", "Use AutoFill for a pattern, but verify the generated series."] },
          { heading: "Formulas and references", points: ["A formula begins with '=' and recalculates when its input changes.", "Relative references shift when copied; absolute references with $ stay fixed.", "SUM, AVERAGE, MIN, MAX and COUNT are common building blocks."] },
          { heading: "Presenting data", points: ["Choose a chart that matches the question: comparison, trend or proportion.", "Label axes and units; avoid decorative formatting that hides values.", "Protect original data by keeping a separate calculation/worksheet copy."] },
        ],
        importantQuestions: ["Differentiate a workbook, worksheet and cell.", "Explain relative and absolute cell references with an example.", "Which chart would you use for monthly rainfall and why?"],
        exercises: [
          { prompt: "Design a five-student marks sheet with total and average formulas.", hint: "Keep raw marks in one block and formulas in new columns." },
          { prompt: "A copied formula gives wrong totals. What would you check?", hint: "Inspect whether references should be fixed with $." },
        ],
        revision: ["Cell address = column + row.", "Formula starts with '='.", "$ fixes a reference; chart choice follows the question."],
        formulas: ["=SUM(A2:A10)", "=AVERAGE(B2:B10)", "$A$1 = absolute reference"],
        source: csSource, minutes: 45,
      },
    ]),
  },
];

export const allChapters: Chapter[] = subjects.flatMap((subject) => subject.chapters);

/** Science, Mathematics and Social Science are the student's main-subject shortcut. */
export const mainSubjects: Subject[] = ["science", "mathematics", "social-science"]
  .map((id) => subjects.find((subject) => subject.id === id))
  .filter((subject): subject is Subject => Boolean(subject));

export function getSubject(subjectId: string): Subject | undefined {
  return subjects.find((subject) => subject.id === subjectId);
}

export function getChapter(chapterId: string): Chapter | undefined {
  return allChapters.find((chapter) => chapter.id === chapterId);
}

export function subjectOfChapter(chapterId: string): Subject | undefined {
  return subjects.find((subject) => subject.chapters.some((chapter) => chapter.id === chapterId));
}

export function scopeLabel(scope: Scope): string {
  if (scope === "confirmed") return "HPBOSE scope";
  if (scope === "cross_reference") return "NCERT cross-reference";
  return "Verify scope";
}

export function totalStudyMinutes(): number {
  return allChapters.reduce((total, chapter) => total + chapter.minutes, 0);
}
