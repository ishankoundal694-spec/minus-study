import type { SubjectData } from "./types";

export const scienceSubject: SubjectData = {
  slug: "science",
  name: "Science",
  localName: "विज्ञान (Vigyan)",
  category: "core",
  shortDescription:
    "Chemistry, Biology, and Physics fundamentals aligned with HPBOSE Science & Technology (Vigyan) and NCERT Class 10.",
  prescribedBooks: [
    "Vigyan / Science & Technology Class X — Published by HPBOSE Dharamshala",
    "NCERT Class 10 Science (Cross-reference edition)",
  ],
  hpboseCurriculumNote:
    "Cross-referenced with HPBOSE 2026–27 Science & Technology book list and NCERT rationalised syllabus. Theory (60/80 depending on session pattern) + Practical Assessment. Check hpbose.org circular for status of Periodic Classification & Sources of Energy.",
  examPattern: {
    theoryMarks: 60,
    internalOrPracticalMarks: 40,
    durationHours: 3,
  },
  accentColor: "#0284C7",
  iconName: "flask",
  officialLinks: [
    {
      title: "NCERT Class 10 Science Official e-Book",
      publisher: "NCERT",
      description: "Official English medium Class 10 Science chapters hosted by NCERT.",
      url: "https://ncert.nic.in/textbook.php?jesc1=0-13",
      category: "textbook",
    },
    {
      title: "NCERT Class 10 Vigyan (Hindi Medium)",
      publisher: "NCERT",
      description: "Official Hindi medium Class 10 Vigyan chapters on ncert.nic.in.",
      url: "https://ncert.nic.in/textbook.php?jhsc1=0-13",
      category: "textbook",
    },
    {
      title: "HPBOSE Official Downloads & Syllabus",
      publisher: "HPBOSE",
      description: "Official HPBOSE Class 10 Science syllabus, practical guidelines, and model papers.",
      url: "https://www.hpbose.org/Downloads.aspx",
      category: "syllabus",
    },
  ],
  chapters: [
    {
      slug: "chemical-reactions-and-equations",
      number: "Ch. 1",
      title: "Chemical Reactions and Equations",
      bookReference: "HPBOSE Vigyan / NCERT Ch. 1",
      syllabusAlignment: "hpbose-ncert-core",
      syllabusNote: "Core Chemistry chapter. Focus on balancing equations, five reaction types, redox reactions, corrosion, and rancidity.",
      estimatedMinutes: 35,
      summary:
        "Explore how chemical changes are written as balanced chemical equations obeying the Law of Conservation of Mass, classify reactions (combination, decomposition, displacement, double displacement, redox), and understand corrosion and rancidity in everyday life.",
      learningObjectives: [
        "Balance skeletal chemical equations systematically.",
        "Identify exothermic vs. endothermic reactions with examples.",
        "Classify combination, decomposition, displacement, double displacement, and redox reactions.",
        "Explain corrosion and rancidity along with prevention methods.",
      ],
      formulaHighlights: [
        { label: "Slaking of Lime (Exothermic)", expression: "CaO(s) + H₂O(l) → Ca(OH)₂(aq) + Heat" },
        { label: "Whitewashing Reaction", expression: "Ca(OH)₂(aq) + CO₂(g) → CaCO₃(s) + H₂O(l)" },
        { label: "Thermal Decomposition", expression: "2FeSO₄(s) —Δ→ Fe₂O₃(s) + SO₂(g) + SO₃(g)" },
        { label: "Photolytic Decomposition", expression: "2AgCl(s) —Sunlight→ 2Ag(s) + Cl₂(g)" },
      ],
      detailedNotes: [
        {
          heading: "1. Balancing Chemical Equations",
          body: [
            "According to the Law of Conservation of Mass, matter can neither be created nor destroyed in a chemical reaction. Therefore, the total number of atoms of each element must be identical on the reactant (LHS) and product (RHS) sides.",
            "Never alter the subscripts inside a chemical formula when balancing—only place whole-number coefficients in front of formulas.",
          ],
          workedExample: {
            problem: "Balance the equation: Fe + H₂O → Fe₃O₄ + H₂",
            steps: [
              "Start with the compound containing the most atoms: Fe₃O₄ has 4 Oxygen atoms.",
              "Put coefficient 4 in front of H₂O to balance Oxygen: Fe + 4H₂O → Fe₃O₄ + H₂.",
              "Now LHS has 8 Hydrogen atoms, so put 4 in front of H₂: Fe + 4H₂O → Fe₃O₄ + 4H₂.",
              "Balance Iron (3 atoms on RHS) by putting 3 in front of Fe.",
            ],
            answer: "3Fe(s) + 4H₂O(g) → Fe₃O₄(s) + 4H₂(g)",
          },
        },
        {
          heading: "2. Types of Reactions & Everyday Oxidation",
          body: [
            "Combination: Two or more substances combine to form a single product (e.g., C + O₂ → CO₂). Decomposition: One compound breaks down using heat (thermal), electricity (electrolytic), or sunlight (photolytic).",
            "Displacement: A more reactive element displaces a less reactive element from its salt solution (e.g., Fe + CuSO₄ → FeSO₄ + Cu; blue solution turns pale green).",
            "Redox: Oxidation is gain of oxygen or loss of hydrogen; Reduction is loss of oxygen or gain of hydrogen. Example: CuO + H₂ → Cu + H₂O (CuO is reduced, H₂ is oxidised).",
            "Corrosion (e.g., rusting of iron) is prevented by painting, oiling, galvanisation, and alloying. Rancidity of fats/oils is slowed by antioxidants, airtight containers, and flushing chip packets with inert Nitrogen gas.",
          ],
        },
      ],
      importantQuestions: [
        {
          id: "sci-1-iq-1",
          marks: 2,
          question: "Why is respiration considered an exothermic reaction? Explain.",
          modelAnswer:
            "During respiration, glucose combines with oxygen inside our cells to produce carbon dioxide, water, and energy needed by the body: C₆H₁₂O₆(aq) + 6O₂(aq) → 6CO₂(aq) + 6H₂O(l) + Energy. Since energy is released, respiration is an exothermic process.",
        },
        {
          id: "sci-1-iq-2",
          marks: 3,
          question: "Why does the colour of copper sulphate solution change when an iron nail is dipped in it? Write the balanced equation.",
          modelAnswer:
            "Iron is more reactive than copper, so it displaces copper from blue copper sulphate solution to form pale green iron(II) sulphate solution and reddish-brown copper deposits on the nail. Equation: Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s).",
        },
      ],
      practiceQuestions: [
        {
          id: "sci-ch1-q1",
          subjectSlug: "science",
          chapterSlug: "chemical-reactions-and-equations",
          chapterTitle: "Chemical Reactions and Equations",
          topic: "Types of Reactions",
          question: "The reaction Fe₂O₃ + 2Al → Al₂O₃ + 2Fe is an example of a:",
          options: [
            "Combination reaction",
            "Double displacement reaction",
            "Decomposition reaction",
            "Displacement reaction",
          ],
          correctIndex: 3,
          explanation: "Aluminium is more reactive than iron and displaces iron from iron(III) oxide, making it a displacement reaction (thermite reaction).",
          difficulty: "easy",
        },
        {
          id: "sci-ch1-q2",
          subjectSlug: "science",
          chapterSlug: "chemical-reactions-and-equations",
          chapterTitle: "Chemical Reactions and Equations",
          topic: "Rancidity Prevention",
          question: "Manufacturers flush bags of potato chips with which gas to prevent rancidity?",
          options: ["Oxygen", "Hydrogen", "Nitrogen", "Chlorine"],
          correctIndex: 2,
          explanation: "Nitrogen is an unreactive (inert) gas that prevents oxidation of fats and oils in chips.",
          difficulty: "easy",
        },
      ],
      revisionPoints: [
        "Photolytic decomposition of AgCl and AgBr is used in black-and-white photography.",
        "In CuO + H₂ → Cu + H₂O, CuO is the oxidising agent and H₂ is the reducing agent.",
        "Always mention physical states (s), (l), (g), (aq) where known for full board marks.",
      ],
      commonMistakes: [
        "Changing subscripts like writing H₂O₂ instead of 2H₂O while balancing.",
        "Confusing oxidised substance with oxidising agent.",
      ],
    },
    {
      slug: "life-processes",
      number: "Ch. 5",
      title: "Life Processes",
      bookReference: "HPBOSE Vigyan / NCERT Ch. 5",
      syllabusAlignment: "hpbose-ncert-core",
      syllabusNote: "Highest-weightage Biology chapter in HPBOSE Class 10. Expect diagram-based questions on Human Heart, Nephron, and Alimentary Canal.",
      estimatedMinutes: 45,
      summary:
        "Life Processes explains the four essential maintenance systems in living organisms: Nutrition (photosynthesis & human digestion), Respiration (aerobic vs. anaerobic), Transportation (human double circulation & plant xylem/phloem), and Excretion (human nephron).",
      learningObjectives: [
        "Describe photosynthesis steps and stomatal regulation.",
        "Trace human digestion enzymes (salivary amylase, pepsin, trypsin, lipase, bile).",
        "Compare aerobic and anaerobic respiration pathways of glucose breakdown.",
        "Explain double circulation in the human heart and urine formation in a nephron.",
      ],
      formulaHighlights: [
        { label: "Photosynthesis", expression: "6CO₂ + 12H₂O —Sunlight/Chlorophyll→ C₆H₁₂O₆ + 6O₂ + 6H₂O" },
        { label: "Aerobic Respiration", expression: "Glucose → Pyruvate → CO₂ + H₂O + High Energy (ATP)" },
      ],
      detailedNotes: [
        {
          heading: "1. Nutrition in Plants and Humans",
          body: [
            "Autotrophic nutrition (Photosynthesis) occurs in chloroplasts in three steps: (1) Absorption of light energy by chlorophyll, (2) Conversion of light energy to chemical energy and splitting of water into H₂ and O₂, (3) Reduction of CO₂ to carbohydrates.",
            "Human Alimentary Canal: Mouth (salivary amylase breaks starch into maltose) → Stomach (HCl kills bacteria & creates acidic medium for pepsin to digest proteins; mucus protects lining) → Small Intestine (receives bile from liver to emulsify fats + pancreatic enzymes trypsin & lipase; villi maximise absorption).",
          ],
        },
        {
          heading: "2. Respiration, Transportation & Excretion",
          body: [
            "Respiration: First step (Glycolysis) happens in cytoplasm—6-carbon glucose splits into 3-carbon pyruvate. In mitochondria with O₂ (aerobic), pyruvate yields CO₂, H₂O, and abundant ATP. In yeast without O₂, it yields ethanol + CO₂. In human muscles during lack of O₂, lactic acid forms causing cramps.",
            "Double Circulation: Blood passes through the human heart twice per complete cycle (Pulmonary circulation to lungs + Systemic circulation to body). Four chambers keep oxygenated and deoxygenated blood separate for high energy needs.",
            "Plants: Xylem transports water and minerals upwards (transpiration pull + root pressure); Phloem translocates food (sucrose) bidirectionally using ATP.",
            "Excretion: Each kidney contains millions of filtering units called Nephrons (Bowman's capsule + glomerulus + tubule) performing ultrafiltration, selective reabsorption (glucose, amino acids, water), and urine collection.",
          ],
        },
      ],
      importantQuestions: [
        {
          id: "sci-5-iq-1",
          marks: 3,
          question: "State the role of (a) HCl in the stomach, (b) Bile juice, and (c) Villi in the small intestine.",
          modelAnswer:
            "(a) HCl creates an acidic medium for enzyme pepsin to act and destroys harmful germs in food. (b) Bile makes acidic chyme alkaline for pancreatic enzymes and emulsifies large fat globules into smaller droplets. (c) Finger-like villi massively increase surface area and contain blood vessels for rapid nutrient absorption.",
        },
        {
          id: "sci-5-iq-2",
          marks: 5,
          question: "Differentiate between aerobic and anaerobic respiration. Why is double circulation necessary in mammals and birds?",
          modelAnswer:
            "Aerobic respiration occurs in presence of O₂ inside mitochondria, completely breaking down glucose into CO₂, H₂O, and large energy (38 ATP). Anaerobic respiration occurs without O₂ in cytoplasm, producing ethanol + CO₂ (yeast) or lactic acid (muscles) with very little energy (2 ATP). Double circulation prevents mixing of oxygenated and deoxygenated blood, ensuring efficient oxygen supply needed by warm-blooded birds and mammals to maintain constant body temperature.",
        },
      ],
      practiceQuestions: [
        {
          id: "sci-ch5-q1",
          subjectSlug: "science",
          chapterSlug: "life-processes",
          chapterTitle: "Life Processes",
          topic: "Respiration Pathways",
          question: "The breakdown of pyruvate to give carbon dioxide, water, and energy takes place in:",
          options: ["Cytoplasm", "Mitochondria", "Chloroplast", "Nucleus"],
          correctIndex: 1,
          explanation: "Aerobic breakdown of pyruvate into CO₂, H₂O, and energy occurs inside the mitochondria.",
          difficulty: "easy",
        },
        {
          id: "sci-ch5-q2",
          subjectSlug: "science",
          chapterSlug: "life-processes",
          chapterTitle: "Life Processes",
          topic: "Plant Transport",
          question: "The xylem in plants is primarily responsible for:",
          options: [
            "Transport of water and minerals",
            "Transport of food",
            "Transport of amino acids",
            "Transport of oxygen",
          ],
          correctIndex: 0,
          explanation: "Xylem vessels and tracheids conduct water and dissolved minerals from roots to leaves; phloem transports food.",
          difficulty: "easy",
        },
      ],
      revisionPoints: [
        "Arteries carry blood away from heart (thick elastic walls, no valves); Veins bring blood to heart (thin walls, valves prevent backflow).",
        "Left ventricle has the thickest muscular wall because it pumps blood to the entire body.",
        "Bile contains NO digestive enzymes—it only emulsifies fats and neutralises stomach acid.",
      ],
      commonMistakes: [
        "Writing that bile digests fats chemically—bile physically emulsifies fats; lipase digests them.",
        "Confusing Bowman's capsule (filtration) with tubules (reabsorption).",
      ],
    },
    {
      slug: "light-reflection-and-refraction",
      number: "Ch. 9",
      title: "Light – Reflection and Refraction",
      bookReference: "HPBOSE Vigyan / NCERT Ch. 9",
      syllabusAlignment: "hpbose-ncert-core",
      syllabusNote: "Core Physics chapter with numericals and ray diagrams every year in HPBOSE exams. Pay special attention to New Cartesian Sign Convention.",
      estimatedMinutes: 45,
      summary:
        "Master image formation by concave/convex mirrors and lenses, apply the Mirror Formula, Lens Formula, Magnification, Snell's Law of refraction, and Power of a Lens in dioptres.",
      learningObjectives: [
        "Apply New Cartesian Sign Convention accurately for mirrors and lenses.",
        "Solve numericals using Mirror Formula and Lens Formula.",
        "Draw all ray diagrams for concave mirrors and convex lenses.",
        "Calculate refractive index and power of lenses (P = 1/f in metres).",
      ],
      formulaHighlights: [
        { label: "Mirror Formula", expression: "1/f = 1/v + 1/u,   m = h'/h = −v/u" },
        { label: "Lens Formula", expression: "1/f = 1/v − 1/u,   m = h'/h = +v/u" },
        { label: "Radius & Focal Length", expression: "R = 2f" },
        { label: "Power of Lens", expression: "P = 1 / f(in metres)  [Unit: Dioptre, D]" },
      ],
      detailedNotes: [
        {
          heading: "1. Spherical Mirrors & Sign Convention",
          body: [
            "New Cartesian Sign Convention: Object is always placed on the left, so object distance u is ALWAYS negative. Distances measured along incident light (right) are positive; opposite (left) are negative. Heights above principal axis are positive, below are negative.",
            "Concave mirror has negative focal length (f < 0) and is used in headlights, shaving mirrors, and solar furnaces. Convex mirror has positive focal length (f > 0) and is used as rear-view mirror because it always forms an erect, diminished image with a wider field of view.",
          ],
          workedExample: {
            problem: "An object 4 cm high is placed 25 cm in front of a concave mirror of focal length 15 cm. Find the image position, nature, and height.",
            steps: [
              "Given: h = +4 cm, u = −25 cm, f = −15 cm (concave mirror).",
              "Mirror formula: 1/v = 1/f − 1/u = 1/(−15) − 1/(−25) = −1/15 + 1/25.",
              "LCM(15, 25) = 75 ⇒ 1/v = (−5 + 3) / 75 = −2 / 75 ⇒ v = −37.5 cm.",
              "Magnification m = −v/u = −(−37.5)/(−25) = −1.5.",
              "Image height h' = m × h = −1.5 × 4 = −6 cm (inverted & enlarged).",
            ],
            answer: "Real, inverted image at 37.5 cm in front of mirror; height = 6 cm.",
          },
        },
        {
          heading: "2. Refraction, Lenses & Lens Power",
          body: [
            "Snell's Law: sin i / sin r = constant = n₂₁. Absolute refractive index n = c / v (where c = 3 × 10⁸ m/s).",
            "Convex (converging) lens has positive f and positive Power (+D). Concave (diverging) lens has negative f and negative Power (−D). Always convert focal length from cm to metres before calculating Power!",
          ],
        },
      ],
      importantQuestions: [
        {
          id: "sci-9-iq-1",
          marks: 2,
          question: "Why do we prefer a convex mirror as a rear-view mirror in vehicles?",
          modelAnswer:
            "A convex mirror always forms a virtual, erect, and diminished image regardless of object distance, and its outward curve gives drivers a much wider field of view of traffic behind.",
        },
        {
          id: "sci-9-iq-2",
          marks: 3,
          question: "A doctor prescribes a corrective lens of power +1.5 D. Find the focal length of the lens. Is the prescribed lens diverging or converging?",
          modelAnswer:
            "f = 1/P = 1 / (+1.5) = +2/3 m = +0.67 m (or +66.7 cm). Since focal length and power are positive, it is a converging (convex) lens.",
        },
      ],
      practiceQuestions: [
        {
          id: "sci-ch9-q1",
          subjectSlug: "science",
          chapterSlug: "light-reflection-and-refraction",
          chapterTitle: "Light – Reflection and Refraction",
          topic: "Lens Power",
          question: "What is the SI unit of power of a lens?",
          options: ["Metre", "Watt", "Dioptre", "Joule"],
          correctIndex: 2,
          explanation: "Power of a lens is measured in Dioptre (D), where 1 D = 1 m⁻¹.",
          difficulty: "easy",
        },
        {
          id: "sci-ch9-q2",
          subjectSlug: "science",
          chapterSlug: "light-reflection-and-refraction",
          chapterTitle: "Light – Reflection and Refraction",
          topic: "Mirror Image Formation",
          question: "To obtain a virtual, erect, and magnified image using a concave mirror, the object must be placed:",
          options: [
            "At the centre of curvature C",
            "Between pole P and principal focus F",
            "Beyond C",
            "At infinity",
          ],
          correctIndex: 1,
          explanation: "Only when the object is placed between P and F does a concave mirror produce a virtual, erect, and enlarged image behind the mirror.",
          difficulty: "medium",
        },
      ],
      revisionPoints: [
        "Object distance u is ALWAYS negative for both mirrors and lenses.",
        "Mirror formula has (+) between 1/v and 1/u; Lens formula has (−).",
        "Real images have negative magnification (inverted); Virtual images have positive magnification (erect).",
      ],
      commonMistakes: [
        "Using f in centimetres directly in P = 1/f without converting to metres (use P = 100 / f_cm).",
        "Mixing up the minus sign in mirror magnification (−v/u) vs lens magnification (+v/u).",
      ],
    },
    {
      slug: "electricity",
      number: "Ch. 11",
      title: "Electricity",
      bookReference: "HPBOSE Vigyan / NCERT Ch. 11",
      syllabusAlignment: "hpbose-ncert-core",
      syllabusNote: "Core HPBOSE Physics chapter. Expect circuit numericals on Ohm's Law, Series/Parallel Resistors, Joule's Heating, and kWh electricity bills.",
      estimatedMinutes: 40,
      summary:
        "Understand electric current, potential difference, Ohm's Law, resistivity, series and parallel resistor combinations, Joule's Law of Heating, electric power, and commercial energy units (kWh).",
      learningObjectives: [
        "Apply I = Q/t, V = W/Q, and Ohm's Law V = IR.",
        "Calculate equivalent resistance for series and parallel resistor circuits.",
        "Compute heat produced using Joule's Law H = I²Rt.",
        "Solve household electrical power and electricity bill numericals in kWh.",
      ],
      formulaHighlights: [
        { label: "Ohm's Law", expression: "V = I × R" },
        { label: "Resistivity", expression: "R = ρ (l / A)" },
        { label: "Series & Parallel", expression: "Rs = R₁ + R₂ + ...  |  1/Rp = 1/R₁ + 1/R₂ + ..." },
        { label: "Heating & Power", expression: "H = I²Rt = VIt,   P = VI = I²R = V²/R" },
        { label: "Commercial Energy", expression: "1 kWh (1 Unit) = 3.6 × 10⁶ Joules" },
      ],
      detailedNotes: [
        {
          heading: "1. Ohm's Law, Resistance & Combinations",
          body: [
            "Ohm's Law: At constant temperature, the current I through a metallic conductor is directly proportional to the potential difference V across its ends (V = IR). Unit of resistance is Ohm (Ω).",
            "Resistance depends on length (R ∝ l), cross-sectional area (R ∝ 1/A), nature of material (resistivity ρ), and temperature. Resistivity ρ depends ONLY on material and temperature—not on length or thickness!",
            "In Series: Current I is same through all resistors, voltage divides, and total R increases. In Parallel: Voltage V is same across all branches, current divides, and total R is smaller than the smallest individual resistor. Household appliances are wired in parallel so each gets full 220 V and can be switched independently.",
          ],
          workedExample: {
            problem: "Two resistors of 6 Ω and 3 Ω are connected in parallel across a 6 V battery. Find total resistance and total current.",
            steps: [
              "1/Rp = 1/6 + 1/3 = (1 + 2)/6 = 3/6 = 1/2.",
              "Take reciprocal carefully: Rp = 2 Ω.",
              "By Ohm's Law: I = V / Rp = 6 V / 2 Ω = 3 A.",
            ],
            answer: "Equivalent Resistance = 2 Ω, Total Current = 3 A",
          },
        },
        {
          heading: "2. Joule's Heating & Electric Power",
          body: [
            "Joule's Law: Heat produced H = I²Rt. Applications: electric iron, toaster (nichrome alloy has high resistivity and does not oxidise easily), electric bulb filament (tungsten has very high melting point ~3380°C), and safety fuse (low melting point alloy connected in series).",
            "Commercial unit of electrical energy is kilowatt-hour (kWh), commonly called 1 unit. Energy (kWh) = Power (kW) × Time (hours).",
          ],
        },
      ],
      importantQuestions: [
        {
          id: "sci-11-iq-1",
          marks: 3,
          question: "Why are coils of electric toasters and irons made of an alloy rather than a pure metal?",
          modelAnswer:
            "(1) Alloys such as nichrome have much higher resistivity than constituent pure metals, producing large heat (H = I²Rt). (2) Alloys do not oxidise (burn) readily at high red-hot temperatures.",
        },
        {
          id: "sci-11-iq-2",
          marks: 3,
          question: "An electric refrigerator rated 400 W operates 8 hours/day. What is the cost of the energy to operate it for 30 days at ₹5.00 per kWh?",
          modelAnswer:
            "Total Energy = 400 W × 8 h/day × 30 days = 96,000 Wh = 96 kWh. Total Cost = 96 × ₹5.00 = ₹480.",
        },
      ],
      practiceQuestions: [
        {
          id: "sci-ch11-q1",
          subjectSlug: "science",
          chapterSlug: "electricity",
          chapterTitle: "Electricity",
          topic: "Resistivity & Resistance",
          question: "If a copper wire is stretched to double its length without changing volume, its resistivity:",
          options: [
            "Doubles",
            "Becomes four times",
            "Remains unchanged",
            "Becomes half",
          ],
          correctIndex: 2,
          explanation: "Resistance increases fourfold, but resistivity (ρ) is an intrinsic property of the material and temperature, so it remains unchanged.",
          difficulty: "medium",
        },
        {
          id: "sci-ch11-q2",
          subjectSlug: "science",
          chapterSlug: "electricity",
          chapterTitle: "Electricity",
          topic: "Commercial Energy",
          question: "1 kilowatt-hour (1 kWh) is equal to:",
          options: ["3.6 × 10³ J", "3.6 × 10⁵ J", "3.6 × 10⁶ J", "3.6 × 10⁷ J"],
          correctIndex: 2,
          explanation: "1 kWh = 1000 W × 3600 s = 3,600,000 J = 3.6 × 10⁶ J.",
          difficulty: "easy",
        },
      ],
      revisionPoints: [
        "Always take the reciprocal at the end when computing parallel resistance (1/Rp → Rp)!",
        "Ammeter is always connected in series (low resistance); Voltmeter in parallel (high resistance).",
        "Convert Watts to Kilowatts (÷ 1000) before calculating electricity bill units.",
      ],
      commonMistakes: [
        "Forgetting to invert 1/Rp to get Rp.",
        "Confusing resistance (depends on dimensions) with resistivity (material property only).",
      ],
    },
  ],
};
