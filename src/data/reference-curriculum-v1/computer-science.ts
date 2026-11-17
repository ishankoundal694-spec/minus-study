import type { SubjectData } from "./types";

export const computerScienceSubject: SubjectData = {
  slug: "computer-science",
  name: "Computer Science",
  localName: "कंप्यूटर विज्ञान (HPBOSE CS-201 to CS-204)",
  category: "elective",
  shortDescription:
    "Official HPBOSE Class 10 Computer Science modules: Digital Literacy (CS-201), Network & Internet Concepts (CS-202), Word Processing (CS-203), and Spreadsheets (CS-204).",
  prescribedBooks: [
    "HPBOSE Class X Computer Science Prescribed Textbook (Dharamshala)",
    "HPBOSE Official CS Syllabus Units CS-201, CS-202, CS-203, CS-204 & Practical Project",
  ],
  hpboseCurriculumNote:
    "Unlike CBSE IT/AI, HPBOSE Class 10 Computer Science follows its own state-prescribed modular syllabus (CS-201 to CS-204 + Practical Project & Viva). Always cross-check the latest CS syllabus PDF on hpbose.org.",
  examPattern: {
    theoryMarks: 50,
    internalOrPracticalMarks: 50,
    durationHours: 3,
  },
  accentColor: "#0F766E",
  iconName: "cpu",
  officialLinks: [
    {
      title: "HPBOSE Official Class 10 Computer Science Syllabus",
      publisher: "HPBOSE",
      description: "Official HPBOSE syllabus portal for CS-201 to CS-204 units and practical marks.",
      url: "https://www.hpbose.org/Downloads.aspx",
      category: "syllabus",
    },
    {
      title: "DIKSHA Digital Education Portal",
      publisher: "DIKSHA",
      description: "Free government e-learning content for digital literacy and ICT skills.",
      url: "https://diksha.gov.in",
      category: "textbook",
    },
  ],
  chapters: [
    {
      slug: "cs-201-digital-literacy-advanced",
      number: "CS-201",
      title: "Digital Literacy (Advanced): Peripherals & Display Devices",
      bookReference: "HPBOSE Computer Science Unit CS-201",
      syllabusAlignment: "hpbose-state-specific",
      syllabusNote: "Official HPBOSE Unit CS-201 covering projectors, LED/LCD/Plasma displays, plotters, printers, fax machines, and audio output.",
      estimatedMinutes: 25,
      summary:
        "Learn the working principles, differences, and classroom/office uses of advanced hardware peripherals prescribed in HPBOSE CS-201: Overhead Projectors (OHP), LED/LCD/Plasma screens, Graphic Plotters, Impact vs. Non-Impact Printers, Fax Machines, and Speakers.",
      learningObjectives: [
        "Compare LCD, LED, and Plasma display technologies.",
        "Differentiate between Impact (Dot Matrix) and Non-Impact (Inkjet, Laser) printers.",
        "Explain the role of digital graphic plotters, overhead projectors, and fax machines.",
      ],
      detailedNotes: [
        {
          heading: "1. Display Screens & Projectors",
          body: [
            "LCD (Liquid Crystal Display) uses liquid crystals lit by a fluorescent (CCFL) backlight. LED screens are LCD panels illuminated by Light Emitting Diodes—offering lower power consumption, thinner screens, and longer lifespan.",
            "Plasma Displays use tiny gas-filled cells that emit UV light to excite phosphors; they deliver deep blacks and wide viewing angles but consume more power and generate more heat.",
            "Overhead Projectors (OHP) and Digital LCD/DLP Projectors enlarge slides and computer screens onto a classroom wall or screen for group teaching.",
          ],
        },
        {
          heading: "2. Printers, Plotters & Fax Machines",
          body: [
            "Impact Printers (e.g., Dot Matrix): Strike an inked ribbon against paper; noisy and slower, but economical for multi-copy carbon bills.",
            "Non-Impact Printers (Inkjet & Laser): No mechanical contact with paper. Inkjet sprays fine ink droplets (great for colour photos); Laser printers use a laser beam, toner powder, and heated fuser roller (fastest and sharpest for office text).",
            "Graphic Plotters: Precision vector output devices used by architects and engineers to draw large-scale CAD blueprints, maps, and circuit diagrams.",
          ],
        },
      ],
      importantQuestions: [
        {
          id: "cs-1-iq-1",
          marks: 3,
          question: "Differentiate between Impact Printers and Non-Impact Printers with examples.",
          modelAnswer:
            "Impact printers physically strike an inked ribbon onto paper (e.g., Dot Matrix, Daisy Wheel); they are noisy, slower, and can print carbon copies. Non-impact printers form characters without striking paper using ink spray or laser toner (e.g., Inkjet, Laser); they are quiet, fast, and produce high-resolution output.",
        },
      ],
      practiceQuestions: [
        {
          id: "cs-ch1-q1",
          subjectSlug: "computer-science",
          chapterSlug: "cs-201-digital-literacy-advanced",
          chapterTitle: "Digital Literacy (Advanced): Peripherals & Display Devices",
          topic: "Output Peripherals",
          question: "Which output device is specially designed to print large-scale engineering blueprints, architectural drawings, and maps?",
          options: ["Dot Matrix Printer", "Graphic Plotter", "Fax Machine", "Barcode Reader"],
          correctIndex: 1,
          explanation: "Graphic plotters draw continuous, high-precision vector lines on large paper sheets for architectural and engineering CAD drawings.",
          difficulty: "easy",
        },
      ],
      revisionPoints: [
        "Laser printers use dry toner powder; Inkjet printers use liquid ink cartridges.",
        "LED monitors are more energy-efficient than traditional CCFL-LCD and Plasma screens.",
      ],
      commonMistakes: [
        "Calling a Plotter an input device—a plotter is an OUTPUT device!",
      ],
    },
    {
      slug: "cs-202-network-and-internet-concepts",
      number: "CS-202",
      title: "Network and Internet Concepts",
      bookReference: "HPBOSE Computer Science Unit CS-202",
      syllabusAlignment: "hpbose-state-specific",
      syllabusNote: "Official HPBOSE Unit CS-202 covering PAN, LAN, MAN, WAN, Internet history (ARPANET), Web Browsers, Search Engines, and E-mail.",
      estimatedMinutes: 30,
      summary:
        "Understand how computers communicate across PAN, LAN, MAN, and WAN networks, trace the evolution of the Internet from ARPANET, compare Web Browsers vs. Search Engines, and master E-mail structure and etiquette.",
      learningObjectives: [
        "Compare PAN, LAN, MAN, and WAN by coverage range, speed, and ownership.",
        "Distinguish clearly between a Web Browser and a Search Engine.",
        "Explain components of an Email address (username@domain) and CC vs. BCC.",
      ],
      detailedNotes: [
        {
          heading: "1. Classification of Computer Networks",
          body: [
            "PAN (Personal Area Network): Very short range (~10 metres), connecting personal devices like phone, Bluetooth headset, and laptop.",
            "LAN (Local Area Network): Covers a single building, school computer lab, or office; very high speed, low cost, private ownership.",
            "MAN (Metropolitan Area Network): Spans an entire city (e.g., city cable TV network or inter-campus government network in Shimla).",
            "WAN (Wide Area Network): Covers countries and continents using optical fibre and satellites; the Internet is the world's largest WAN.",
          ],
        },
        {
          heading: "2. Internet, Browsers, Search Engines & Email",
          body: [
            "Internet began as ARPANET (1969, US Department of Defense) and grew globally with TCP/IP protocols and Tim Berners-Lee's World Wide Web (WWW).",
            "Web Browser: Software installed on your device to open and render webpages (e.g., Google Chrome, Mozilla Firefox, Opera, Microsoft Edge).",
            "Search Engine: A website/service accessed inside a browser that indexes webpages and finds information using keywords (e.g., Google Search, Bing, DuckDuckGo, Yahoo).",
            "Email: Format is username@domain.com. 'To' = main recipient; 'CC' (Carbon Copy) = visible copy recipients; 'BCC' (Blind Carbon Copy) = hidden recipients whose addresses remain private.",
          ],
        },
      ],
      importantQuestions: [
        {
          id: "cs-2-iq-1",
          marks: 3,
          question: "Distinguish between LAN and WAN with examples.",
          modelAnswer:
            "LAN (Local Area Network) connects devices within a limited area like a school lab or office, offering high data speeds and private ownership. WAN (Wide Area Network) spans cities, nations, or continents via public telecommunication links; the Internet and nationwide banking networks are examples of WAN.",
        },
        {
          id: "cs-2-iq-2",
          marks: 2,
          question: "What is the difference between CC and BCC in an e-mail?",
          modelAnswer:
            "CC (Carbon Copy) sends a copy of the email where every recipient can see all other recipients' email addresses. BCC (Blind Carbon Copy) also sends a copy, but keeps the BCC recipients' email addresses hidden from everyone else.",
        },
      ],
      practiceQuestions: [
        {
          id: "cs-ch2-q1",
          subjectSlug: "computer-science",
          chapterSlug: "cs-202-network-and-internet-concepts",
          chapterTitle: "Network and Internet Concepts",
          topic: "Web Browsers vs Search Engines",
          question: "Which of the following is a Web Browser and NOT a Search Engine?",
          options: ["Bing", "Mozilla Firefox", "Yahoo Search", "DuckDuckGo"],
          correctIndex: 1,
          explanation: "Mozilla Firefox is a web browser software application used to view websites, whereas Bing, Yahoo Search, and DuckDuckGo are search engines.",
          difficulty: "easy",
        },
        {
          id: "cs-ch2-q2",
          subjectSlug: "computer-science",
          chapterSlug: "cs-202-network-and-internet-concepts",
          chapterTitle: "Network and Internet Concepts",
          topic: "Network Types",
          question: "Connecting your wireless headphones to your smartphone via Bluetooth forms a:",
          options: ["WAN", "MAN", "PAN", "Internet backbone"],
          correctIndex: 2,
          explanation: "A short-range (~10 m) connection between personal devices is a Personal Area Network (PAN).",
          difficulty: "easy",
        },
      ],
      revisionPoints: [
        "Size order: PAN < LAN < MAN < WAN.",
        "Chrome/Firefox/Edge = Browsers; Google/Bing = Search Engines.",
      ],
      commonMistakes: [
        "Writing 'Google' instead of 'Google Chrome' when asked for a Web Browser example.",
      ],
    },
    {
      slug: "cs-203-204-word-processing-and-spreadsheets",
      number: "CS-203 & CS-204",
      title: "Digital Documentation & Spreadsheet Tabulation",
      bookReference: "HPBOSE Computer Science Units CS-203 & CS-204",
      syllabusAlignment: "hpbose-state-specific",
      syllabusNote: "Core practical + theory HPBOSE modules covering Word Processing (Mail Merge, Page Setup, Tables) and Spreadsheets (Cell Referencing, Formulas, Charts).",
      estimatedMinutes: 35,
      summary:
        "Master advanced Word Processing features (Page Setup, Headers/Footers, Superscript/Subscript, Mail Merge) and Spreadsheet Tabulation (cell addresses, relative vs. absolute references, SUM/AVERAGE/MAX/MIN/IF functions, and Charts).",
      learningObjectives: [
        "Use formatting, page setup, headers/footers, and Mail Merge in word processors.",
        "Write accurate spreadsheet formulas starting with '=' using cell ranges.",
        "Differentiate between Relative (A1) and Absolute ($A$1) cell references.",
      ],
      formulaHighlights: [
        { label: "Total Marks", expression: "=SUM(B2:F2)" },
        { label: "Average Score", expression: "=AVERAGE(B2:F2)" },
        { label: "Highest / Lowest", expression: "=MAX(B2:B20)  |  =MIN(B2:B20)" },
        { label: "Pass/Fail Check", expression: '=IF(G2>=33, "Pass", "Needs Revision")' },
      ],
      detailedNotes: [
        {
          heading: "1. Word Processing Essentials (CS-203)",
          body: [
            "Page Setup controls Margins, Orientation (Portrait vs. Landscape), and Paper Size (A4, Letter). Always inspect Print Preview before printing to avoid clipped tables.",
            "Superscript raises text above the baseline (e.g., x² using Ctrl+Shift+=) while Subscript lowers text below the baseline (e.g., H₂O using Ctrl+=).",
            "Mail Merge combines a single Main Document (e.g., school report card template) with a Data Source (table of student names & addresses) to automatically generate personalised letters for every student.",
          ],
        },
        {
          heading: "2. Spreadsheet Formulas & Functions (CS-204)",
          body: [
            "A spreadsheet consists of rows (1, 2, 3...) and columns (A, B, C...) intersecting at cells (e.g., C4). Every formula MUST begin with an equals sign (=).",
            "Relative Reference (A1) adjusts automatically when copied to another row or column. Absolute Reference ($A$1) locks both column and row using dollar signs ($) so the reference stays fixed when copied.",
            "Charts (Column, Bar, Line, Pie) convert tabular data into visual summaries—Pie charts show percentage shares of one series, while Line charts track trends over time.",
          ],
          workedExample: {
            problem: "Cells B2 to F2 contain marks of a student in 5 subjects. Write formulas to find (a) Total marks, (b) Percentage out of 500, and (c) Highest mark.",
            steps: [
              "(a) Total: =SUM(B2:F2)",
              "(b) Percentage: =(SUM(B2:F2)/500)*100  (or =AVERAGE(B2:F2) when each subject is out of 100)",
              "(c) Highest mark: =MAX(B2:F2)",
            ],
            answer: "=SUM(B2:F2), =(SUM(B2:F2)/500)*100, =MAX(B2:F2)",
          },
        },
      ],
      importantQuestions: [
        {
          id: "cs-3-iq-1",
          marks: 3,
          question: "What is Mail Merge in a word processor? Mention its two main components.",
          modelAnswer:
            "Mail Merge is a feature that automatically merges a common document template with a list of recipient records to produce multiple personalised letters, certificates, or labels. Its two main components are (1) the Main Document (containing common text and merge fields) and (2) the Data Source (spreadsheet or table storing individual records).",
        },
      ],
      practiceQuestions: [
        {
          id: "cs-ch3-q1",
          subjectSlug: "computer-science",
          chapterSlug: "cs-203-204-word-processing-and-spreadsheets",
          chapterTitle: "Digital Documentation & Spreadsheet Tabulation",
          topic: "Spreadsheet Formulas",
          question: "Every formula or function in a spreadsheet (MS Excel / LibreOffice Calc) must begin with which symbol?",
          options: ["#", "@", "=", "$"],
          correctIndex: 2,
          explanation: "The equals sign (=) tells the spreadsheet software to evaluate the entry as a formula rather than plain text.",
          difficulty: "easy",
        },
        {
          id: "cs-ch3-q2",
          subjectSlug: "computer-science",
          chapterSlug: "cs-203-204-word-processing-and-spreadsheets",
          chapterTitle: "Digital Documentation & Spreadsheet Tabulation",
          topic: "Cell Referencing",
          question: "Which of the following is an Absolute Cell Reference that does not change when copied to other cells?",
          options: ["B5", "$B$5", "B$5", "B:5"],
          correctIndex: 1,
          explanation: "Placing a '$' before both column letter and row number ($B$5) locks the reference absolutely.",
          difficulty: "medium",
        },
      ],
      revisionPoints: [
        "Common Word shortcuts: Ctrl+S (Save), Ctrl+P (Print), Ctrl+Z (Undo), Ctrl+B (Bold).",
        "Cell Range uses a colon (:), e.g., A1:A10 includes all 10 cells from A1 through A10.",
      ],
      commonMistakes: [
        "Writing SUM(A1:A5) without the leading '=' sign in exam answers.",
      ],
    },
  ],
};
