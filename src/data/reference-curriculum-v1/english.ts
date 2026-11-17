import type { SubjectData } from "./types";

export const englishSubject: SubjectData = {
  slug: "english",
  name: "English",
  category: "language",
  shortDescription:
    "Reading comprehension, formal writing, applied grammar, and literature from HPBOSE prescribed First Flight & Footprints Without Feet.",
  prescribedBooks: [
    "First Flight (Main Reader) — HPBOSE / NCERT Class X",
    "Footprints Without Feet (Supplementary Reader) — HPBOSE / NCERT Class X",
  ],
  hpboseCurriculumNote:
    "Prescribed directly from HPBOSE / NCERT First Flight and Footprints Without Feet. Exam covers Reading Comprehension, Writing (Letters, Paragraphs), Grammar (Tenses, Modals, Reported Speech, Voice), and Literature.",
  examPattern: {
    theoryMarks: 80,
    internalOrPracticalMarks: 20,
    durationHours: 3,
  },
  accentColor: "#4F46E5",
  iconName: "book-open",
  officialLinks: [
    {
      title: "NCERT Class 10 English: First Flight",
      publisher: "NCERT",
      description: "Read official First Flight chapters directly on ncert.nic.in.",
      url: "https://ncert.nic.in/textbook.php?jeff1=0-9",
      category: "textbook",
    },
    {
      title: "NCERT Class 10 English: Footprints Without Feet",
      publisher: "NCERT",
      description: "Read official Footprints Without Feet chapters on ncert.nic.in.",
      url: "https://ncert.nic.in/textbook.php?jefp1=0-9",
      category: "textbook",
    },
    {
      title: "HPBOSE English Syllabus & Previous Year Papers",
      publisher: "HPBOSE",
      description: "Official HPBOSE Class 10 English model papers and blueprint.",
      url: "https://www.hpbose.org/Downloads.aspx",
      category: "pyq",
    },
  ],
  chapters: [
    {
      slug: "a-letter-to-god",
      number: "First Flight Ch. 1",
      title: "A Letter to God",
      bookReference: "First Flight (Prose Ch. 1 — G.L. Fuentes)",
      syllabusAlignment: "hpbose-ncert-core",
      syllabusNote: "Core First Flight chapter. Focus on character sketches of Lencho and the Postmaster, and the situational irony in the ending.",
      estimatedMinutes: 25,
      summary:
        "G.L. Fuentes tells the moving, ironic story of Lencho, a hardworking farmer whose ripe cornfield is destroyed by a hailstorm. With unwavering faith, he writes a letter to God asking for 100 pesos. Touched by his faith, the kind postmaster and staff collect 70 pesos—yet Lencho suspects the very helpers of stealing the rest.",
      learningObjectives: [
        "Explain the central theme of unshakeable faith and human kindness.",
        "Analyse the situational irony at the climax of the story.",
        "Write clear character sketches of Lencho and the Postmaster with textual evidence.",
      ],
      detailedNotes: [
        {
          heading: "1. Plot Progression & Metaphors",
          body: [
            "Lencho compares large raindrops to 'ten cent pieces' and smaller drops to 'five cent pieces' because rain promises a prosperous harvest. Soon a fierce hailstorm turns the valley white 'as if covered with salt', destroying his entire crop—leaving more destruction than a plague of locusts.",
            "Driven by pure faith, Lencho writes a letter addressed simply to 'God', requesting 100 pesos to sow his field again and survive until the next crop.",
            "The amiable postmaster reads the letter, laughs briefly, then becomes serious—moved by the depth of Lencho's belief. He contributes part of his salary and gathers donations from colleagues, sending 70 pesos signed 'God'.",
          ],
        },
        {
          heading: "2. Irony & Character Sketches",
          body: [
            "Situational Irony: The post office employees act as instruments of God's kindness by donating their own money, yet Lencho angrily calls them 'a bunch of crooks' because 30 pesos are missing.",
            "Lencho: Simple, hardworking ('an ox of a man'), deeply devoted, yet naive and quick to mistrust fellow humans. Postmaster: Fat, amiable, empathetic, generous, and respectful of another person's faith.",
          ],
        },
      ],
      importantQuestions: [
        {
          id: "eng-1-iq-1",
          marks: 3,
          question: "Why did Lencho say the raindrops were like 'new coins'?",
          modelAnswer:
            "Lencho's ripe cornfield badly needed a shower for a bumper harvest. Since good rain directly meant good crops and prosperity (money) for his family, he joyfully compared big raindrops to ten-cent coins and smaller drops to five-cent coins.",
        },
        {
          id: "eng-1-iq-2",
          marks: 5,
          question: "Bring out the irony in the ending of the story 'A Letter to God'.",
          modelAnswer:
            "The ending displays sharp situational irony. When Lencho receives 70 pesos instead of 100, he refuses to doubt God and immediately suspects the post office staff of stealing 30 pesos, calling them 'a bunch of crooks'. Ironically, those very employees had sacrificed part of their own salaries out of pure generosity to preserve his faith.",
        },
      ],
      practiceQuestions: [
        {
          id: "eng-ch1-q1",
          subjectSlug: "english",
          chapterSlug: "a-letter-to-god",
          chapterTitle: "A Letter to God",
          topic: "Plot & Comprehension",
          question: "How much money was the postmaster able to collect and send to Lencho?",
          options: ["50 pesos", "70 pesos", "100 pesos", "30 pesos"],
          correctIndex: 1,
          explanation: "Despite donating part of his own salary and asking colleagues and friends, the postmaster could collect only 70 pesos (slightly more than half of 100).",
          difficulty: "easy",
        },
        {
          id: "eng-ch1-q2",
          subjectSlug: "english",
          chapterSlug: "a-letter-to-god",
          chapterTitle: "A Letter to God",
          topic: "Literary Devices",
          question: "Lencho calling the generous post office employees 'a bunch of crooks' is an example of:",
          options: ["Personification", "Alliteration", "Situational Irony", "Onomatopoeia"],
          correctIndex: 2,
          explanation: "It is situational irony because the readers know the employees were his actual benefactors, the exact opposite of crooks.",
          difficulty: "easy",
        },
      ],
      revisionPoints: [
        "Author: G.L. Fuentes. Currency: Pesos (Latin American setting).",
        "Always quote key phrases ('ox of a man', 'covered with salt', 'bunch of crooks') in long answers.",
      ],
      commonMistakes: [
        "Writing 'rupees' or 'dollars' instead of 'pesos'.",
      ],
    },
    {
      slug: "nelson-mandela-long-walk-to-freedom",
      number: "First Flight Ch. 2",
      title: "Nelson Mandela: Long Walk to Freedom",
      bookReference: "First Flight (Prose Ch. 2 — Autobiography Excerpt)",
      syllabusAlignment: "hpbose-ncert-core",
      syllabusNote: "Core First Flight chapter. Focus on twin obligations, definition of courage, and the meaning of true freedom.",
      estimatedMinutes: 30,
      summary:
        "An inspiring excerpt from Nelson Mandela's autobiography describing 10 May 1994—South Africa's first democratic, non-racial government inauguration—and his reflections on courage, twin obligations, and how apartheid damaged both oppressed and oppressor.",
      learningObjectives: [
        "Describe the historical significance of 10 May 1994 at the Union Buildings, Pretoria.",
        "Explain Mandela's definition of courage and twin obligations.",
        "Discuss why Mandela says both the oppressor and the oppressed must be liberated.",
      ],
      detailedNotes: [
        {
          heading: "1. The Inauguration & Meaning of Courage",
          body: [
            "On 10 May 1994, Nelson Mandela was sworn in as South Africa's first Black President after more than three centuries of white supremacy and apartheid. Two national anthems were sung as a symbol of racial reconciliation.",
            "Mandela learned from comrades that courage is NOT the absence of fear, but the triumph over it. 'The brave man is not he who does not feel afraid, but he who conquers that fear.'",
          ],
        },
        {
          heading: "2. Twin Obligations & Universal Freedom",
          body: [
            "Every person has twin obligations: (1) obligations to family (parents, spouse, children) and (2) obligations to one's people, community, and country. Under apartheid, fulfilling duty to one's people meant being ripped away from family and imprisoned.",
            "Mandela observed that hatred is learned, not innate; love comes more naturally to the human heart. Furthermore, a man who steals another's freedom is himself a prisoner of hatred and prejudice—hence both oppressed and oppressor need liberation.",
          ],
        },
      ],
      importantQuestions: [
        {
          id: "eng-2-iq-1",
          marks: 3,
          question: "What 'twin obligations' does Nelson Mandela mention in his autobiography?",
          modelAnswer:
            "Mandela states that every individual has twin obligations in life: first, obligations to one's family—parents, wife, and children; second, obligations to one's people, community, and country.",
        },
      ],
      practiceQuestions: [
        {
          id: "eng-ch2-q1",
          subjectSlug: "english",
          chapterSlug: "nelson-mandela-long-walk-to-freedom",
          chapterTitle: "Nelson Mandela: Long Walk to Freedom",
          topic: "Key Themes",
          question: "According to Nelson Mandela, what is the true meaning of courage?",
          options: [
            "Having no fear at all",
            "Triumph over fear",
            "Using physical force",
            "Avoiding dangerous duties",
          ],
          correctIndex: 1,
          explanation: "Mandela explicitly defines courage not as the absence of fear, but as conquering/triumphing over fear.",
          difficulty: "easy",
        },
      ],
      revisionPoints: [
        "Inauguration date: 10 May 1994 (autumn day in the Southern Hemisphere!).",
        "True wealth of South Africa = its people, 'finer and truer than the purest diamonds'.",
      ],
      commonMistakes: [
        "Calling May a spring day—remember South Africa is in the Southern Hemisphere, so May is autumn!",
      ],
    },
    {
      slug: "applied-grammar-and-writing",
      number: "Grammar & Writing",
      title: "Tenses, Modals, Reported Speech & Formal Letters",
      bookReference: "HPBOSE Section B & C — Grammar & Composition",
      syllabusAlignment: "hpbose-ncert-core",
      syllabusNote: "High-scoring deterministic section in HPBOSE Class 10 English (20+ marks). Mastering rules guarantees near-full marks.",
      estimatedMinutes: 35,
      summary:
        "Master the exact rules tested in HPBOSE Class 10 Grammar (Tenses, Modals, Subject-Verb Agreement, Active/Passive Voice, Direct/Indirect Speech) plus the official CBSE/HPBOSE Formal Letter format.",
      learningObjectives: [
        "Convert statements, questions, and commands into Reported (Indirect) Speech accurately.",
        "Apply Subject-Verb Concord rules cleanly in gap-filling tasks.",
        "Write well-structured Letters to the Editor, Complaint Letters, and Formal Applications.",
      ],
      formulaHighlights: [
        { label: "Reported Speech Backshift", expression: "Present Simple → Past Simple | Present Continuous → Past Continuous | Will → Would" },
        { label: "Formal Letter Order", expression: "Sender's Address → Date → Receiver's Address → Subject → Salutation → Body (3 paras) → Sign-off" },
      ],
      detailedNotes: [
        {
          heading: "1. Reported Speech Essentials",
          body: [
            "When the reporting verb is in the past ('said', 'told'), tense shifts one step back: is/am/are → was/were; has/have → had; can → could; may → might; yesterday → the previous day; tomorrow → the next day.",
            "Exception: Universal truths and habitual facts DO NOT change tense! Example: The teacher said, 'The earth revolves around the sun.' → The teacher said that the earth revolves around the sun.",
            "In reported questions, use 'asked' + if/whether (for Yes/No questions) or the wh-word, and convert word order to statement form (NO question mark at the end!).",
          ],
          workedExample: {
            problem: "Change into Indirect Speech: Riya said to Aman, 'Did you complete the Science project yesterday?'",
            steps: [
              "Identify sentence type: Yes/No interrogative in Simple Past.",
              "Change 'said to' → 'asked'; add connector 'if' or 'whether'.",
              "Shift Simple Past ('did complete') → Past Perfect ('had completed').",
              "Change pronoun 'you' → 'he' and time word 'yesterday' → 'the previous day'.",
            ],
            answer: "Riya asked Aman if he had completed the Science project the previous day.",
          },
        },
        {
          heading: "2. Subject-Verb Agreement Quick Rules",
          body: [
            "Words like 'each', 'every', 'everyone', 'neither of', 'one of' ALWAYS take a SINGULAR verb (e.g., 'One of the students IS absent today').",
            "When two subjects are joined by 'either...or' or 'neither...nor', the verb agrees with the NEARER subject (e.g., 'Neither the teacher nor the students WERE late').",
          ],
        },
      ],
      importantQuestions: [
        {
          id: "eng-3-iq-1",
          marks: 5,
          question: "Write a letter to the Editor of a local daily highlighting irregular drinking water supply in your locality in Shimla and suggesting practical remedies.",
          modelAnswer:
            "Follow full block format: Sender's Address, Date (e.g., 14 March 2026), The Editor, The Tribune, Shimla. Subject: Irregular drinking water supply in Sanjauli locality. Para 1: State purpose ('Through the columns of your esteemed newspaper...'). Para 2: Detail hardships faced by students and senior citizens, leaky pipelines, erratic timings. Para 3: Request municipal authorities to repair leaks, publish fixed schedules, and promote rainwater harvesting. Yours sincerely, [Name].",
        },
      ],
      practiceQuestions: [
        {
          id: "eng-ch3-q1",
          subjectSlug: "english",
          chapterSlug: "applied-grammar-and-writing",
          chapterTitle: "Tenses, Modals, Reported Speech & Formal Letters",
          topic: "Subject-Verb Concord",
          question: "Choose the grammatically correct verb: Neither of the two answers ___ correct.",
          options: ["are", "were", "is", "have"],
          correctIndex: 2,
          explanation: "'Neither of' refers to 'not one of the two' and always takes a singular verb ('is').",
          difficulty: "easy",
        },
        {
          id: "eng-ch3-q2",
          subjectSlug: "english",
          chapterSlug: "applied-grammar-and-writing",
          chapterTitle: "Tenses, Modals, Reported Speech & Formal Letters",
          topic: "Reported Speech",
          question: "Convert to indirect speech: He said, 'Honesty is the best policy.'",
          options: [
            "He said that honesty was the best policy.",
            "He said that honesty is the best policy.",
            "He told honesty had been the best policy.",
            "He asked if honesty is the best policy.",
          ],
          correctIndex: 1,
          explanation: "Universal truths and proverbs remain in Present Simple tense even when the reporting verb is in the past.",
          difficulty: "medium",
        },
      ],
      revisionPoints: [
        "No question mark (?) at the end of an indirect reported question.",
        "Keep formal letter Subject crisp (4–6 words maximum).",
        "Use 'Yours sincerely' with a named person, 'Yours truly / faithfully' for an Editor.",
      ],
      commonMistakes: [
        "Changing verb tense for universal truths in reported speech.",
        "Using plural verbs after 'Each of' or 'One of the boys'.",
      ],
    },
  ],
};
