import type { Chapter } from "./types";

const source = "HPBOSE Class 10 Mathematics syllabus (2024); NCERT Mathematics cross-reference; HPBOSE 2026–27 Maths model paper format";
const scopeNote = "Listed in the referenced HPBOSE Class 10 Mathematics syllabus. Verify the latest annual notice and your school's course plan.";

type Seed = Omit<Chapter, "id" | "subjectId" | "number" | "formulas"> & {
  slug: string;
  formulas?: string[];
};

function chapter(number: number, slug: string, data: Omit<Seed, "slug">): Chapter {
  return {
    id: `mathematics-${slug}`,
    subjectId: "mathematics",
    number,
    title: data.title,
    unit: data.unit,
    summary: data.summary,
    topics: data.topics,
    notes: data.notes,
    importantQuestions: data.importantQuestions,
    exercises: data.exercises,
    revision: data.revision,
    formulas: data.formulas ?? [],
    scope: data.scope,
    scopeNote: data.scopeNote,
    source: data.source,
    minutes: data.minutes,
  };
}

export const mathExtraChapters: Chapter[] = [
  chapter(6, "arithmetic-progressions", {
    title: "Arithmetic Progressions", unit: "Algebra",
    summary: "An arithmetic progression changes by a fixed amount each term; nth-term and sum formulas turn patterns into quick calculations.",
    topics: ["Common difference", "nth term", "Sum of n terms", "Pattern problems"],
    notes: [
      { heading: "Recognise the constant step", points: ["A list is an AP when the difference between consecutive terms stays the same.", "The first term is a and the common difference is d; d may be negative or zero.", "Write the first four terms before applying any formula to avoid assuming a pattern."] },
      { heading: "Two core formulas", points: ["The nth term is aₙ = a + (n − 1)d; the index starts at 1, hence n − 1.", "The sum of the first n terms is Sₙ = n/2 [2a + (n − 1)d].", "If the last term l is known, use Sₙ = n/2 (a + l)."] },
      { heading: "Word problems", points: ["Translate 'first row', 'per month' and 'increases by' into a and d.", "Check whether a requested position is a positive integer; a fractional n means the value is not a term.", "State units and interpret the result in the original situation."] },
    ],
    importantQuestions: ["Find the 20th term of 7, 11, 15, …", "Find the sum of the first 25 terms of 3, 8, 13, …", "How many terms of 5, 9, 13, … are needed to make 860?"],
    exercises: [
      { prompt: "Find the 15th term of 8, 5, 2, …", hint: "Use a = 8 and d = −3 in aₙ = a + (n − 1)d." },
      { prompt: "Which term of 4, 9, 14, … is 99?", hint: "Set a + (n − 1)d equal to 99 and solve for a positive integer n." },
    ],
    revision: ["AP = constant difference.", "aₙ = a + (n − 1)d.", "Sₙ = n/2 [2a + (n − 1)d] = n/2 (a + l)."],
    formulas: ["aₙ = a + (n − 1)d", "Sₙ = n/2 [2a + (n − 1)d]", "Sₙ = n/2 (a + l)"],
    scope: "confirmed", scopeNote, source, minutes: 40,
  }),
  chapter(7, "triangles", {
    title: "Triangles", unit: "Geometry",
    summary: "Similar triangles keep the same shape; proportional sides, equal angles and area ratios make indirect measurement possible.",
    topics: ["Similar figures", "AAA/SAS/SSS similarity", "Basic Proportionality Theorem", "Area ratio", "Pythagoras"],
    notes: [
      { heading: "Same shape, scaled size", points: ["Similar triangles have equal corresponding angles and proportional corresponding sides.", "Congruent triangles are always similar, but similar triangles need not be congruent.", "Match vertices in the correct order before writing a similarity statement."] },
      { heading: "Proportionality tools", points: ["If a line parallel to one side intersects the other two sides, it divides them in the same ratio.", "The converse also helps prove that a line is parallel.", "For similar triangles, the ratio of areas equals the square of the ratio of corresponding sides."] },
      { heading: "Right-triangle reasoning", points: ["Pythagoras applies only to right triangles: hypotenuse² = base² + height².", "A perpendicular from the right-angle vertex to the hypotenuse creates smaller similar triangles.", "Use units consistently and reject negative lengths."] },
    ],
    importantQuestions: ["State and apply the Basic Proportionality Theorem with a numeric example.", "Two similar triangles have areas 36 cm² and 64 cm²; find the ratio of corresponding sides.", "Prove the Pythagoras theorem using similarity."],
    exercises: [
      { prompt: "DE ∥ BC, AD = 2 cm, DB = 3 cm and AE = 4 cm. Find EC.", hint: "Use AD/DB = AE/EC." },
      { prompt: "A 5 m pole casts a 3 m shadow while a tree casts a 12 m shadow. Find the tree's height.", hint: "The sun's angle makes two similar right triangles." },
    ],
    revision: ["Equal angles + proportional sides = similarity.", "Area ratio = (side ratio)².", "Parallel line → proportional segments; converse also works."],
    formulas: ["AD/DB = AE/EC (DE ∥ BC)", "Area₁ / Area₂ = (side₁ / side₂)²", "c² = a² + b²"],
    scope: "confirmed", scopeNote, source, minutes: 50,
  }),
  chapter(8, "coordinate-geometry", {
    title: "Coordinate Geometry", unit: "Geometry and measurement",
    summary: "Coordinates turn points, distances, midpoints and triangle areas into exact arithmetic.",
    topics: ["Distance formula", "Section formula", "Midpoint", "Collinearity", "Area of a triangle"],
    notes: [
      { heading: "Distance from Pythagoras", points: ["The horizontal and vertical separations form the two perpendicular sides of a right triangle.", "Distance between two points is √[(x₂ − x₁)² + (y₂ − y₁)²].", "Squaring removes sign issues, so the order of points does not matter."] },
      { heading: "Dividing a segment", points: ["For a point dividing AB internally in ratio m:n, use (mx₂ + nx₁)/(m+n) for x.", "Use the same weighted pattern for y.", "The midpoint is the special case m:n = 1:1."] },
      { heading: "Checking a triangle", points: ["Three points are collinear if the sum of two distances equals the third or if the coordinate area formula gives zero.", "The area formula uses an absolute value because orientation can be clockwise or anticlockwise.", "Write coordinates in the same row order to avoid sign errors."] },
    ],
    importantQuestions: ["Find the distance between (−2, 3) and (4, −5).", "Find the point dividing (1, 2) and (7, 8) in the ratio 1:2.", "Find the area of the triangle with vertices (1, 1), (4, 5) and (7, 2)."],
    exercises: [
      { prompt: "Find the midpoint of (2, −3) and (8, 5).", hint: "Average the x-coordinates and the y-coordinates separately." },
      { prompt: "Check whether (1, 2), (3, 4) and (5, 6) are collinear.", hint: "Compare slopes or use the triangle-area formula." },
    ],
    revision: ["Distance is a Pythagorean calculation.", "Section formula uses weighted averages.", "Zero coordinate area means collinear points."],
    formulas: ["d = √[(x₂−x₁)² + (y₂−y₁)²]", "P = ((mx₂+nx₁)/(m+n), (my₂+ny₁)/(m+n))", "Midpoint = ((x₁+x₂)/2, (y₁+y₂)/2)", "Area = ½|x₁(y₂−y₃)+x₂(y₃−y₁)+x₃(y₁−y₂)|"],
    scope: "confirmed", scopeNote, source, minutes: 45,
  }),
  chapter(9, "applications-of-trigonometry", {
    title: "Some Applications of Trigonometry", unit: "Geometry and measurement",
    summary: "Angles of elevation and depression convert inaccessible heights and distances into right-triangle calculations.",
    topics: ["Line of sight", "Angle of elevation", "Angle of depression", "Heights and distances"],
    notes: [
      { heading: "Draw before calculating", points: ["Angle of elevation is measured upward from the horizontal; depression is measured downward.", "Horizontal ground, vertical object and line of sight usually form a right triangle.", "Ignore the observer's height unless the question explicitly gives it."] },
      { heading: "Choose the right ratio", points: ["Use tan when connecting opposite height and adjacent horizontal distance.", "Use sin for opposite/hypotenuse and cos for adjacent/hypotenuse.", "Keep all lengths in the same unit and use exact standard-angle values where possible."] },
      { heading: "Two-point problems", points: ["For two observation points on the same line, write one equation for each angle.", "Angles of depression from a height equal corresponding angles of elevation by alternate interior angles.", "Subtract or add distances depending on whether objects are on the same or opposite sides."] },
    ],
    importantQuestions: ["A 10 m ladder makes 60° with the ground. Find the height it reaches.", "From a point 30 m away, the angle of elevation is 30°. Find the height.", "Two ships on opposite sides of a 100 m lighthouse have depression angles 30° and 45°. Find the distance between them."],
    exercises: [
      { prompt: "A 13 m ladder reaches a window 12 m high. Find its foot's distance from the wall.", hint: "Use Pythagoras or cos with the 5-12-13 triangle." },
      { prompt: "A pole and its shadow are equal in length. Find the sun's angle of elevation.", hint: "tan θ = height / shadow = 1." },
    ],
    revision: ["Elevation looks up; depression looks down.", "tan θ = height / horizontal distance.", "Sketch first, then choose sin/cos/tan."],
    formulas: ["tan θ = opposite / adjacent", "sin θ = opposite / hypotenuse", "cos θ = adjacent / hypotenuse"],
    scope: "confirmed", scopeNote, source, minutes: 40,
  }),
  chapter(10, "circles", {
    title: "Circles", unit: "Geometry",
    summary: "Tangents meet a circle at exactly one point and create right angles, equal lengths and useful symmetry.",
    topics: ["Tangent and radius", "Number of tangents", "Equal tangent segments", "Cyclic reasoning"],
    notes: [
      { heading: "The tangent-radius theorem", points: ["A tangent touches a circle at exactly one point.", "The radius through the point of contact is perpendicular to the tangent.", "This right angle lets you use Pythagoras in tangent-length problems."] },
      { heading: "Tangents from one point", points: ["From a point inside a circle no tangent can be drawn; from a point on it exactly one; from outside exactly two.", "The two tangents from the same external point have equal lengths.", "The centre lies on the angle bisector of the angle between those two tangents."] },
      { heading: "Proof strategy", points: ["Join the centre to the point of contact and to the external point.", "Two right triangles share a hypotenuse and have equal radii.", "RHS congruence proves equal tangent lengths."] },
    ],
    importantQuestions: ["How many tangents can be drawn from a point outside a circle?", "Prove that tangents drawn from an external point are equal.", "Radius is 5 cm and an external point is 13 cm from the centre; find the tangent length."],
    exercises: [
      { prompt: "Two tangents from P measure 7 cm and x + 2 cm. Find x.", hint: "Tangents from the same external point are equal." },
      { prompt: "Find the tangent length when r = 5 cm and OP = 13 cm.", hint: "Use PT² = OP² − r²." },
    ],
    revision: ["Radius ⟂ tangent at contact.", "External point → two equal tangents.", "Use Pythagoras: tangent² = OP² − radius²."],
    formulas: ["OT ⟂ PT", "PT² = OP² − r²", "PA = PB (tangents from external point P)"],
    scope: "confirmed", scopeNote, source, minutes: 35,
  }),
  chapter(11, "areas-related-to-circles", {
    title: "Areas Related to Circles", unit: "Mensuration",
    summary: "Sectors, segments, arcs and combinations of circles are fractions of a full circle plus simple triangle arithmetic.",
    topics: ["Circumference and area", "Sector", "Arc length", "Segment", "Combined figures"],
    notes: [
      { heading: "Fractions of a turn", points: ["A sector with central angle θ is θ/360 of the full circle's area.", "Its arc is θ/360 of the full circumference.", "Use radians only if the question explicitly gives radians; board questions commonly use degrees."] },
      { heading: "Segment versus sector", points: ["A minor segment equals the minor sector minus the triangle formed by the two radii and chord.", "A major segment equals the circle's area minus the minor segment.", "For 60° or 90° sectors, use equilateral or right-triangle area facts."] },
      { heading: "Combined shapes", points: ["Split a complex figure into non-overlapping sectors, triangles and rectangles.", "Subtract cut-out areas rather than adding them.", "Keep π symbolic until the final step unless the question specifies an approximation."] },
    ],
    importantQuestions: ["Find the area of a 60° sector of a circle with radius 6 cm.", "Find the area of a quadrant whose circumference is 22 cm.", "Find the perimeter of a 120° sector of radius 21 cm."],
    exercises: [
      { prompt: "Find the arc length of a 90° sector in a circle of radius 14 cm.", hint: "Take one quarter of 2πr." },
      { prompt: "A circular table has radius 1.4 m and a 20 cm border. Find the border's area.", hint: "Subtract the inner circle from the outer circle." },
    ],
    revision: ["Sector area = (θ/360)πr².", "Arc length = (θ/360)2πr.", "Segment = sector − triangle."],
    formulas: ["C = 2πr", "A = πr²", "Sector area = (θ/360)πr²", "Arc length = (θ/360)2πr", "Segment = sector − triangle"],
    scope: "confirmed", scopeNote, source, minutes: 40,
  }),
  chapter(12, "surface-areas-volumes", {
    title: "Surface Areas and Volumes", unit: "Mensuration",
    summary: "Composite solids are solved by exposing only the outside surfaces and adding volumes of their simple parts.",
    topics: ["Cylinder, cone and sphere", "Curved/total surface area", "Volume", "Composite solids", "Conversion of units"],
    notes: [
      { heading: "Surface area is visible area", points: ["Curved surface area excludes circular bases; total surface area includes the exposed bases.", "When solids are joined, the touching circular face becomes internal and must not be counted twice.", "Sketch and label radius, height and slant height before substituting."] },
      { heading: "Volume adds cleanly", points: ["Volumes of non-overlapping parts can be added even when surfaces are hidden.", "A hemisphere is half a sphere by volume, but its total surface area includes its circular base.", "Convert all measurements to one unit before calculation."] },
      { heading: "Common relationships", points: ["For a cone, l² = r² + h²; do not replace l with h.", "A capsule is a cylinder plus two hemispheres, i.e. a cylinder plus one sphere.", "When a solid is melted and recast, volume is conserved (assuming no loss)."] },
    ],
    importantQuestions: ["Find the total surface area of a cylinder with radius 7 cm and height 10 cm.", "Find the volume of a sphere of radius 3 cm.", "A cylinder and cone of the same radius are joined; find the exposed surface area."],
    exercises: [
      { prompt: "Find the curved surface area of a cone with r = 7 cm and l = 10 cm.", hint: "Use πrl." },
      { prompt: "A solid sphere of radius 6 cm is melted into small spheres of radius 2 cm. How many are formed?", hint: "Compare volumes: 6³ / 2³." },
    ],
    revision: ["CSA excludes bases; TSA includes exposed bases.", "Cone uses l, not h, in πrl.", "Joined solids: add volumes, subtract hidden faces."],
    formulas: ["Cylinder: CSA = 2πrh, Volume = πr²h", "Cone: CSA = πrl, Volume = ⅓πr²h", "Sphere: SA = 4πr², Volume = ⁴⁄₃πr³", "Hemisphere TSA = 3πr²", "l² = r² + h²"],
    scope: "confirmed", scopeNote, source, minutes: 55,
  }),
  chapter(13, "statistics", {
    title: "Statistics", unit: "Data handling",
    summary: "Mean, median, mode and graphical summaries turn a raw data set or frequency table into useful information.",
    topics: ["Mean of ungrouped data", "Grouped mean", "Median", "Mode", "Ogives"],
    notes: [
      { heading: "Choose a centre wisely", points: ["Mean uses every value but is sensitive to extreme observations.", "Median is the middle value after sorting and resists outliers.", "Mode is the most frequent value; a data set may have more than one mode or none."] },
      { heading: "Grouped-data methods", points: ["Class mark = (upper limit + lower limit)/2.", "Direct method: mean = Σfᵢxᵢ / Σfᵢ; assumed-mean and step-deviation methods simplify large numbers.", "For grouped median and mode, identify the correct class before applying the formula."] },
      { heading: "Reading graphs", points: ["A cumulative-frequency table can use less-than or more-than totals; check which one is plotted.", "The median from an ogive is read at N/2 on the cumulative-frequency axis.", "Always state units and round only at the end."] },
    ],
    importantQuestions: ["Find the mean of a small frequency distribution using the direct method.", "Find the median of an odd and an even number of observations.", "Explain when median is a better representative value than mean."],
    exercises: [
      { prompt: "The mean of five numbers is 18; four are 14, 16, 20 and 22. Find the fifth.", hint: "Total = mean × number of observations." },
      { prompt: "Find the mode of 2, 3, 3, 5, 7, 3, 8.", hint: "Count the frequency of each distinct value." },
    ],
    revision: ["Mean = sum / count.", "Median needs sorted data.", "Class mark = midpoint of class interval."],
    formulas: ["Mean = Σx / n", "Grouped mean = Σfᵢxᵢ / Σfᵢ", "Class mark = (lower + upper)/2", "Median (odd n) = x₍ₙ₊₁₎/₂"],
    scope: "confirmed", scopeNote, source, minutes: 45,
  }),
  chapter(14, "probability", {
    title: "Probability", unit: "Data handling",
    summary: "Probability compares favourable outcomes with equally likely outcomes and always lies between 0 and 1.",
    topics: ["Experiment and outcome", "Equally likely events", "Complementary events", "Cards, dice and coins", "Simple compound events"],
    notes: [
      { heading: "Build the sample space", points: ["List or count every equally likely outcome before forming a ratio.", "P(event) = favourable outcomes / total outcomes.", "Impossible events have probability 0; certain events have probability 1."] },
      { heading: "Complement shortcut", points: ["P(not A) = 1 − P(A).", "For 'at least one' questions, counting the complement is often faster.", "Check that the event and its complement cover the entire sample space."] },
      { heading: "Cards, dice and replacement", points: ["A standard deck has 52 cards, 4 suits and 4 aces.", "Two dice have 36 equally likely ordered outcomes.", "Without replacement changes the denominator on the second draw; with replacement does not."] },
    ],
    importantQuestions: ["Find the probability of getting a total of 7 with two dice.", "Find the probability of drawing an ace from a well-shuffled deck.", "Explain the difference between drawing with and without replacement."],
    exercises: [
      { prompt: "A bag has 5 red, 3 blue and 2 green balls. Find P(red).", hint: "Divide favourable balls by all 10 balls." },
      { prompt: "Two coins are tossed. Find P(at least one head).", hint: "Use the complement: only TT has no head." },
    ],
    revision: ["0 ≤ P(E) ≤ 1.", "P(not E) = 1 − P(E).", "Without replacement changes the second denominator."],
    formulas: ["P(E) = favourable / total", "P(not E) = 1 − P(E)", "P(A and B) = P(A) × P(B|A)"],
    scope: "confirmed", scopeNote, source, minutes: 35,
  }),
];
