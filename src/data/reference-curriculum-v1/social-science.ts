import type { SubjectData } from "./types";

export const socialScienceSubject: SubjectData = {
  slug: "social-science",
  name: "Social Science",
  localName: "सामाजिक विज्ञान",
  category: "core",
  shortDescription:
    "History, Geography, Democratic Politics, Economics, and HPBOSE Disaster Management aligned with HPBOSE Class 10 prescribed books.",
  prescribedBooks: [
    "India and the Contemporary World–II (History) — HPBOSE / NCERT",
    "Contemporary India–II (Geography) — HPBOSE / NCERT",
    "Democratic Politics–II (Civics) — HPBOSE / NCERT",
    "Understanding Economic Development (Economics) — HPBOSE / NCERT",
    "Disaster Management (HPBOSE Prescribed Unit)",
  ],
  hpboseCurriculumNote:
    "Unlike some boards, HPBOSE Social Science explicitly integrates Disaster Management (especially relevant to Himalayan seismic & landslide zones) alongside the four NCERT core books. Check HPBOSE map-work circular annually.",
  examPattern: {
    theoryMarks: 80,
    internalOrPracticalMarks: 20,
    durationHours: 3,
  },
  accentColor: "#0D9488",
  iconName: "globe",
  officialLinks: [
    {
      title: "NCERT History: India and the Contemporary World–II",
      publisher: "NCERT",
      description: "Official Class 10 History textbook on ncert.nic.in.",
      url: "https://ncert.nic.in/textbook.php?jess3=0-5",
      category: "textbook",
    },
    {
      title: "NCERT Geography: Contemporary India–II",
      publisher: "NCERT",
      description: "Official Class 10 Geography textbook on ncert.nic.in.",
      url: "https://ncert.nic.in/textbook.php?jess1=0-7",
      category: "textbook",
    },
    {
      title: "HPBOSE Social Science Syllabus & Question Papers",
      publisher: "HPBOSE",
      description: "Official HPBOSE Class 10 syllabus including Disaster Management and map work.",
      url: "https://www.hpbose.org/Downloads.aspx",
      category: "syllabus",
    },
  ],
  chapters: [
    {
      slug: "nationalism-in-india",
      number: "History Ch. 2",
      title: "Nationalism in India",
      bookReference: "India & the Contemporary World–II (Ch. 2)",
      syllabusAlignment: "hpbose-ncert-core",
      syllabusNote: "Core History chapter and primary source of HPBOSE 5-mark essays and Indian National Movement map questions.",
      estimatedMinutes: 40,
      summary:
        "Trace how the First World War, Satyagraha, the Non-Cooperation Movement (1920–22), the Civil Disobedience Movement (1930–34), and cultural symbols united diverse Indians against British colonial rule.",
      learningObjectives: [
        "Explain Mahatma Gandhi's concept of Satyagraha and early movements (Champaran, Kheda, Ahmedabad).",
        "Analyse causes, course, and withdrawal of the Non-Cooperation Movement (Chauri Chaura, 1922).",
        "Compare Non-Cooperation and Civil Disobedience (Salt March / Dandi March 1930).",
        "Locate key Congress sessions and Satyagraha centres on the map of India.",
      ],
      detailedNotes: [
        {
          heading: "1. Satyagraha, Rowlatt Act & Non-Cooperation (1915–1922)",
          body: [
            "Satyagraha emphasised the power of truth and non-violent struggle without hatred. Early local successes: Champaran (Bihar, 1917 — indigo planters), Kheda (Gujarat, 1917 — revenue relaxation), and Ahmedabad (1918 — cotton mill workers).",
            "The Rowlatt Act (1919) allowed detention of political prisoners without trial for 2 years. Peaceful protests culminated in the tragic Jallianwala Bagh massacre on 13 April 1919 in Amritsar.",
            "Gandhiji united the Khilafat issue with Swaraj to launch the Non-Cooperation Movement (January 1921): surrender of titles, boycott of British courts, schools, and foreign cloth. Following the violent Chauri Chaura incident in February 1922, Gandhiji called off the movement.",
          ],
        },
        {
          heading: "2. Civil Disobedience, Salt March & Collective Belonging",
          body: [
            "At the Lahore Congress Session (December 1929) presided by Jawaharlal Nehru, 'Purna Swaraj' (Complete Independence) was declared, and 26 January 1930 was celebrated as Independence Day.",
            "Salt was consumed by rich and poor alike, making the British salt tax a powerful symbol. Gandhiji marched 240 miles from Sabarmati Ashram to Dandi (12 March – 6 April 1930) with 78 volunteers and broke the salt law.",
            "Unlike Non-Cooperation, Civil Disobedience asked people not only to refuse cooperation but also to peacefully break colonial laws (forest laws, salt tax, chowkidari tax). Collective belonging grew through Bharat Mata imagery, Bankim Chandra's 'Vande Mataram', revival of folklore, and the tricolour flag.",
          ],
        },
      ],
      importantQuestions: [
        {
          id: "sst-1-iq-1",
          marks: 3,
          question: "Why did Mahatma Gandhi withdraw the Non-Cooperation Movement in February 1922?",
          modelAnswer:
            "In February 1922 at Chauri Chaura (Gorakhpur, Uttar Pradesh), a peaceful demonstration turned violent and protesters set fire to a police station, killing policemen. Gandhiji felt the movement was turning violent and satyagrahis needed proper training in non-violence before mass struggles.",
        },
        {
          id: "sst-1-iq-2",
          marks: 5,
          question: "Why was the Salt March an effective symbol of resistance against British colonialism?",
          modelAnswer:
            "(1) Salt was an essential food item used by rich and poor alike, uniting all classes. (2) British government monopoly and tax on salt exposed the oppressive face of colonial rule. (3) The 240-mile Sabarmati-to-Dandi march attracted thousands along the route and sparked nationwide peaceful breaking of salt and forest laws, launching the Civil Disobedience Movement.",
        },
      ],
      practiceQuestions: [
        {
          id: "sst-ch1-q1",
          subjectSlug: "social-science",
          chapterSlug: "nationalism-in-india",
          chapterTitle: "Nationalism in India",
          topic: "Indian National Congress Sessions",
          question: "In which Congress session was the demand for 'Purna Swaraj' (Complete Independence) formally adopted in December 1929?",
          options: ["Calcutta", "Nagpur", "Lahore", "Madras"],
          correctIndex: 2,
          explanation: "The Lahore Congress Session of December 1929, under Jawaharlal Nehru's presidency, formalised the demand for Purna Swaraj.",
          difficulty: "easy",
        },
        {
          id: "sst-ch1-q2",
          subjectSlug: "social-science",
          chapterSlug: "nationalism-in-india",
          chapterTitle: "Nationalism in India",
          topic: "Satyagraha & Events",
          question: "The Jallianwala Bagh incident took place in Amritsar on:",
          options: ["13 April 1919", "26 January 1930", "12 March 1930", "5 February 1922"],
          correctIndex: 0,
          explanation: "On Baisakhi day, 13 April 1919, General Dyer blocked the exits and fired on a peaceful gathering at Jallianwala Bagh, Amritsar.",
          difficulty: "easy",
        },
      ],
      revisionPoints: [
        "Timeline: 1917 Champaran & Kheda → 1919 Rowlatt & Jallianwala Bagh → 1920 Nagpur Congress → 1922 Chauri Chaura → 1929 Lahore Purna Swaraj → 1930 Dandi March → 1931 Gandhi-Irwin Pact → 1932 Poona Pact.",
        "Map must-knows: Calcutta (Sept 1920), Nagpur (Dec 1920), Madras (1927), Champaran, Kheda, Ahmedabad, Amritsar, Chauri Chaura, Dandi.",
      ],
      commonMistakes: [
        "Confusing Non-Cooperation Movement (1921) with Civil Disobedience Movement (1930).",
        "Mixing up the September 1920 (Calcutta) and December 1920 (Nagpur) sessions on the map.",
      ],
    },
    {
      slug: "resources-and-development",
      number: "Geography Ch. 1",
      title: "Resources and Development",
      bookReference: "Contemporary India–II (Ch. 1)",
      syllabusAlignment: "hpbose-ncert-core",
      syllabusNote: "Core Geography chapter. Key topics: sustainable development, Rio Earth Summit 1992, Indian soil types, and soil conservation in hilly regions.",
      estimatedMinutes: 35,
      summary:
        "Learn how natural resources are classified, why sustainable resource planning is essential for India, the six major Indian soil types (Alluvial, Black, Red & Yellow, Laterite, Arid, Forest/Mountain), and terrace farming soil conservation—directly relevant to Himachal Pradesh.",
      learningObjectives: [
        "Explain sustainable development and Agenda 21 (Rio de Janeiro, 1992).",
        "Identify the three steps of Resource Planning in India.",
        "Compare major soil types of India, their regions, and suitable crops.",
        "Explain contour ploughing, terrace farming, strip cropping, and shelter belts.",
      ],
      detailedNotes: [
        {
          heading: "1. Sustainable Development & Resource Planning",
          body: [
            "Sustainable economic development means development should take place without damaging the environment, and development in the present should not compromise the needs of future generations.",
            "Resource Planning in India involves 3 stages: (i) Identification and inventory of resources via surveying and mapping, (ii) Evolving a planning structure with technology, skill, and institutional setup, (iii) Matching resource development plans with overall national development plans.",
          ],
        },
        {
          heading: "2. Major Soil Types & Conservation in Mountain States",
          body: [
            "Alluvial Soil: Most widespread and fertile (Northern Plains); ideal for wheat, paddy, sugarcane. Older alluvium = Bangar; newer fertile alluvium = Khadar.",
            "Black (Regur) Soil: Found in Deccan trap (Maharashtra, MP, Gujarat); high moisture retention; ideal for cotton.",
            "Forest / Mountain Soil: Found in hilly and mountainous regions like Himachal Pradesh and Uttarakhand; loamy and silty in valley sides and coarse-grained on upper slopes.",
            "Soil Conservation in Hills: Contour ploughing (ploughing along contour lines slows water runoff) and Terrace cultivation (cutting flat steps on Himalayan slopes like in HP and Uttarakhand restricts sheet and gully erosion).",
          ],
        },
      ],
      importantQuestions: [
        {
          id: "sst-2-iq-1",
          marks: 3,
          question: "Distinguish between Bangar and Khadar alluvial soils.",
          modelAnswer:
            "Bangar is old alluvial soil with higher concentration of kankar nodules and lower fertility, found away from river floodplains. Khadar is new alluvial soil renewed annually by floods, has finer particles, fewer kankar nodules, and is far more fertile.",
        },
        {
          id: "sst-2-iq-2",
          marks: 3,
          question: "Suggest three effective methods of soil conservation in hilly areas such as Himachal Pradesh.",
          modelAnswer:
            "(1) Terrace farming: Cutting flat steps on steep mountain slopes slows water flow and holds topsoil. (2) Contour ploughing: Ploughing parallel to elevation contours reduces water runoff. (3) Afforestation and regulated grazing: Tree roots bind hill soil and prevent landslides and gully erosion.",
        },
      ],
      practiceQuestions: [
        {
          id: "sst-ch2-q1",
          subjectSlug: "social-science",
          chapterSlug: "resources-and-development",
          chapterTitle: "Resources and Development",
          topic: "Soil Types of India",
          question: "Black soil is also known as Regur soil and is best suited for growing:",
          options: ["Tea", "Cotton", "Cashew nut", "Apple"],
          correctIndex: 1,
          explanation: "Black (Regur) soil has excellent moisture-retaining capacity and nutrients ideal for cotton cultivation.",
          difficulty: "easy",
        },
        {
          id: "sst-ch2-q2",
          subjectSlug: "social-science",
          chapterSlug: "resources-and-development",
          chapterTitle: "Resources and Development",
          topic: "Soil Conservation",
          question: "Which soil conservation method is most effective on steep mountain slopes of the Western and Central Himalayas?",
          options: ["Shelter belts", "Terrace cultivation", "Over-irrigation", "Deep mining"],
          correctIndex: 1,
          explanation: "Terrace cultivation cuts flat steps into steep hill slopes to slow down runoff and prevent soil erosion.",
          difficulty: "easy",
        },
      ],
      revisionPoints: [
        "Rio Earth Summit (1992, Brazil) adopted Agenda 21 for global sustainable development.",
        "Khadar = New, finer, more fertile; Bangar = Old, more kankar.",
        "Red soil turns yellow when hydrated; Laterite soil forms under heavy rain and leaching.",
      ],
      commonMistakes: [
        "Swapping Bangar and Khadar definitions in 2-mark questions.",
        "Confusing contour ploughing (hilly areas) with shelter belts (arid/desert areas).",
      ],
    },
    {
      slug: "federalism-and-power-sharing",
      number: "Civics Ch. 1–2",
      title: "Power-sharing & Federalism",
      bookReference: "Democratic Politics–II (Ch. 1 & 2)",
      syllabusAlignment: "hpbose-ncert-core",
      syllabusNote: "Core Political Science chapters. Focus on Belgium vs. Sri Lanka comparison, Three Lists of Indian Federalism, and 1992 Decentralisation.",
      estimatedMinutes: 35,
      summary:
        "Discover why sharing power strengthens democracy (Belgium vs. Sri Lanka case studies), how Indian federalism divides law-making across Union, State, and Concurrent Lists, and how Panchayati Raj empowers local self-government.",
      learningObjectives: [
        "Compare prudential and moral reasons for power-sharing.",
        "Explain key features of federalism and India's three-fold legislative distribution.",
        "Describe major constitutional changes introduced in 1992 for rural/urban decentralisation.",
      ],
      detailedNotes: [
        {
          heading: "1. Power-sharing Lessons & Forms",
          body: [
            "Prudential reason: Power-sharing reduces social conflict and ensures political stability (as Belgium's accommodation model proved). Moral reason: Power-sharing is the very spirit of democracy because citizens have a right to be consulted on how they are governed.",
            "Four forms of power-sharing: (1) Horizontal (Legislature, Executive, Judiciary — checks and balances), (2) Vertical (Union, State, Local governments), (3) Among social/linguistic groups, (4) Among political parties and pressure groups (coalitions).",
          ],
        },
        {
          heading: "2. Indian Federalism & 1992 Decentralisation",
          body: [
            "Union List (Defence, Foreign Affairs, Banking, Currency — Union Parliament legislates), State List (Police, Trade, Agriculture, Irrigation — State Legislatures like HP Vidhan Sabha legislate), Concurrent List (Education, Forests, Marriage, Trade Unions — both can legislate; Union law prevails in conflict). Residuary subjects (e.g., Cyber laws/Computer software) go to the Union.",
            "1992 Constitutional Amendments (73rd & 74th): Made regular local elections mandatory, reserved seats for SC/ST/OBC and at least one-third seats for women, created independent State Election Commissions, and required states to share powers and revenue with Panchayats and Municipalities.",
          ],
        },
      ],
      importantQuestions: [
        {
          id: "sst-3-iq-1",
          marks: 3,
          question: "State three steps taken in 1992 to make the third tier of democracy in India more powerful and effective.",
          modelAnswer:
            "(1) Holding regular elections to local government bodies became constitutionally mandatory. (2) At least one-third of all positions were reserved for women alongside SC/ST reservations. (3) Independent State Election Commissions were established to conduct Panchayat and Municipal elections fairly.",
        },
      ],
      practiceQuestions: [
        {
          id: "sst-ch3-q1",
          subjectSlug: "social-science",
          chapterSlug: "federalism-and-power-sharing",
          chapterTitle: "Power-sharing & Federalism",
          topic: "Legislative Lists in India",
          question: "Under the Indian Constitution, 'Education' and 'Forests' belong to which list?",
          options: ["Union List", "State List", "Concurrent List", "Residuary List"],
          correctIndex: 2,
          explanation: "Education, forests, trade unions, marriage, and adoption are subjects of common interest placed in the Concurrent List.",
          difficulty: "easy",
        },
      ],
      revisionPoints: [
        "India is a 'Holding Together' federation; USA and Switzerland are 'Coming Together' federations.",
        "Horizontal power-sharing = checks and balances; Vertical power-sharing = federalism.",
      ],
      commonMistakes: [
        "Placing Police or Agriculture in the Union List instead of the State List.",
      ],
    },
    {
      slug: "hpbose-disaster-management",
      number: "HPBOSE Unit 5",
      title: "Disaster Management & Survival Skills",
      bookReference: "HPBOSE Prescribed Disaster Management Book",
      syllabusAlignment: "hpbose-state-specific",
      syllabusNote: "State-specific HPBOSE Class 10 compulsory Social Science component (not in standard NCERT 4-book set). Crucial for Himachal Pradesh students.",
      estimatedMinutes: 30,
      summary:
        "Essential HPBOSE unit covering earthquake safety (Drop, Cover, Hold), landslide awareness in Himalayan terrain, survival skills (first aid, search & rescue), and alternate emergency communication systems (HAM radio, satellite phones) when mobile towers fail.",
      learningObjectives: [
        "Apply safe evacuation and first-aid survival skills during earthquakes, floods, and landslides.",
        "Explain why alternate communication systems (Amateur/HAM radio, satellite phones) are vital during disasters.",
        "Describe community-level responsibility shared by students, schools, NDMA, and SDMA.",
      ],
      detailedNotes: [
        {
          heading: "1. Survival Skills & First Aid Principles",
          body: [
            "Himachal Pradesh lies in high seismic zones (Zones IV and V) and experiences monsoon landslides and flash floods. Knowing calm, practical survival skills saves lives during the 'Golden Hour' after a disaster.",
            "Earthquake Safety: Indoors — DROP to hands and knees, COVER head/neck under a sturdy table away from windows, HOLD ON until shaking stops. Outdoors — move to an open ground away from power lines, poles, and slopes.",
            "First Aid ABC rule: Check Airway, Breathing, and Circulation. Apply clean direct pressure on bleeding wounds; immobilise suspected fractures with splints; never move a suspected spinal injury victim unless in immediate danger.",
          ],
        },
        {
          heading: "2. Alternate Communication Systems & Shared Responsibility",
          body: [
            "During severe earthquakes, heavy snowfall, or landslides, conventional cellular networks and landlines often fail due to power outages or tower damage.",
            "Alternate systems include Amateur Radio (HAM Radio — battery-operated, independent of local towers), Satellite Phones (communicate directly with orbiting satellites), and VHF/UHF Police/SDRF wireless walkie-talkies.",
            "School Disaster Management Plans assign student teams for Awareness, First Aid, Evacuation, and Warning so every citizen shares responsibility alongside NDRF/SDRF.",
          ],
        },
      ],
      importantQuestions: [
        {
          id: "sst-4-iq-1",
          marks: 3,
          question: "Why are alternate communication systems like HAM radio and satellite phones necessary during natural disasters?",
          modelAnswer:
            "Earthquakes, landslides, and cyclones frequently snap power lines and damage cellular towers, disabling regular phones and internet. HAM radios operate on batteries independent of public networks, and satellite phones link directly to satellites, allowing rescue teams to coordinate relief immediately.",
        },
      ],
      practiceQuestions: [
        {
          id: "sst-ch4-q1",
          subjectSlug: "social-science",
          chapterSlug: "hpbose-disaster-management",
          chapterTitle: "Disaster Management & Survival Skills",
          topic: "Alternate Communication",
          question: "Which communication system uses battery-powered radio transceivers operated by licensed volunteers when mobile networks collapse?",
          options: ["Cable TV", "Amateur (HAM) Radio", "Broadband Wi-Fi", "Landline PBX"],
          correctIndex: 1,
          explanation: "Amateur (HAM) Radio works independently of commercial power grids and mobile towers, making it invaluable during earthquakes and floods.",
          difficulty: "easy",
        },
        {
          id: "sst-ch4-q2",
          subjectSlug: "social-science",
          chapterSlug: "hpbose-disaster-management",
          chapterTitle: "Disaster Management & Survival Skills",
          topic: "Earthquake Survival",
          question: "What is the recommended immediate safety action if you are indoors during an earthquake?",
          options: [
            "Use the elevator immediately",
            "Stand near glass windows",
            "Drop, Cover under a sturdy desk, and Hold On",
            "Light a matchstick to check for gas leaks",
          ],
          correctIndex: 2,
          explanation: "Drop, Cover, and Hold On protects your head and vital organs from falling objects until shaking stops.",
          difficulty: "easy",
        },
      ],
      revisionPoints: [
        "Emergency numbers in India: 112 (Unified Emergency), 108 (Ambulance), 1070/1077 (Disaster Helpline).",
        "Never use elevators during an earthquake or fire.",
        "HAM Radio & Satellite communication keep relief active when cellular towers fail.",
      ],
      commonMistakes: [
        "Skipping Disaster Management because it is not one of the four NCERT books—HPBOSE directly asks questions from it!",
      ],
    },
  ],
};
