export const SUBJECTS = [
  { key: "math", name: "Math", emoji: "➗" },
  { key: "chemistry", name: "Chemistry", emoji: "🧪" },
  { key: "physics", name: "Physics", emoji: "🪐" },
  { key: "biology", name: "Biology", emoji: "🌱" },
  { key: "english", name: "English", emoji: "📖" },
  { key: "history", name: "History", emoji: "🏛️" },
  { key: "language", name: "Language", emoji: "🌍" },
  { key: "cs", name: "CS", emoji: "💻" },
];

const yt = (q) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
const music = (name) => ({ name, url: yt(name) });

const GENERIC_TESTING = ["Read every question carefully", "Scan the whole test first, then budget your time", "Answer easy ones first, flag the hard ones"];

export const RESOURCES = {
  math: {
    tips: ["Do practice problems daily instead of cramming", "Write out every step — don't skip in your head", "Redo mistakes in a 'mistake notebook'"],
    testing: ["Check units and signs on every answer", "Plug your answer back in to verify", ...GENERIC_TESTING.slice(1)],
    music: [music("lofi study music for math"), music("instrumental focus piano")],
    videos: [{ name: "Khan Academy", url: "https://www.youtube.com/@khanacademy" }, { name: "3Blue1Brown", url: "https://www.youtube.com/@3blue1brown" }, { name: "The Organic Chemistry Tutor", url: "https://www.youtube.com/@TheOrganicChemistryTutor" }],
  },
  chemistry: {
    tips: ["Memorize the periodic table trends first", "Balance equations until it's automatic", "Draw molecules by hand to remember structure"],
    testing: ["Show unit conversions clearly", "Balance every equation before using it", ...GENERIC_TESTING.slice(1)],
    music: [music("lofi chemistry study beats"), music("calm ambient study music")],
    videos: [{ name: "Crash Course Chemistry", url: "https://www.youtube.com/@crashcourse" }, { name: "Professor Dave Explains", url: "https://www.youtube.com/@ProfessorDaveExplains" }, { name: "The Organic Chemistry Tutor", url: "https://www.youtube.com/@TheOrganicChemistryTutor" }],
  },
  physics: {
    tips: ["Draw a diagram before solving anything", "List knowns and unknowns for each problem", "Understand the concept before the formula"],
    testing: ["Write the formula first, then substitute", "Check that your units make sense", ...GENERIC_TESTING.slice(1)],
    music: [music("space ambient focus music"), music("lofi study beats physics")],
    videos: [{ name: "Veritasium", url: "https://www.youtube.com/@veritasium" }, { name: "Crash Course Physics", url: "https://www.youtube.com/@crashcourse" }, { name: "Khan Academy", url: "https://www.youtube.com/@khanacademy" }],
  },
  biology: {
    tips: ["Make flashcards for all the terms", "Explain the topic like you're teaching a 5 year old", "Make visual diagrams of topics"],
    testing: ["Read questions carefully", "Use process of elimination for multiple choice", "Scan the test first and plan time accordingly"],
    music: [{ name: "Romanticizing Studying Biology", url: "https://www.youtube.com/watch?v=8aQvMiZoCI4" }, music("lofi biology study music")],
    videos: [{ name: "Amoeba Sisters", url: "https://www.youtube.com/@AmoebaSisters" }, { name: "Kurzgesagt", url: "https://www.youtube.com/@kurzgesagt" }, { name: "Crash Course Biology", url: "https://www.youtube.com/watch?v=PWGBqskV1UQ&list=PL8dPuuaLjXtPW_ofbxdHNciuLoTRLPMgB" }],
  },
  english: {
    tips: ["Annotate as you read — underline themes and quotes", "Outline essays before writing a word", "Read your writing out loud to catch awkward lines"],
    testing: ["Back up every claim with a quote", "Plan a quick thesis before you write", ...GENERIC_TESTING.slice(1)],
    music: [music("lofi reading music"), music("cozy library ambience")],
    videos: [{ name: "Crash Course Literature", url: "https://www.youtube.com/@crashcourse" }, { name: "TED-Ed", url: "https://www.youtube.com/@TEDEd" }],
  },
  history: {
    tips: ["Build timelines to see cause and effect", "Turn events into a story you can retell", "Connect each event to 'why did this matter?'"],
    testing: ["Define the key terms in your answer", "Use specific dates and names as evidence", ...GENERIC_TESTING.slice(1)],
    music: [music("medieval ambience study music"), music("classical focus music")],
    videos: [{ name: "Crash Course History", url: "https://www.youtube.com/@crashcourse" }, { name: "OverSimplified", url: "https://www.youtube.com/@OverSimplified" }, { name: "TED-Ed", url: "https://www.youtube.com/@TEDEd" }],
  },
  language: {
    tips: ["Practice a little every single day", "Label things around you in the new language", "Speak out loud, even to yourself"],
    testing: ["Watch accents and verb endings", "Translate the meaning, not word by word", ...GENERIC_TESTING.slice(1)],
    music: [music("music in the language you're learning"), music("cafe lofi study music")],
    videos: [{ name: "Easy Languages", url: "https://www.youtube.com/@EasyLanguages" }, { name: "Crash Course Linguistics", url: "https://www.youtube.com/@crashcourse" }],
  },
  cs: {
    tips: ["Code a little every day — type, don't copy", "Trace code by hand to understand it", "Break big problems into tiny functions"],
    testing: ["Walk through edge cases on paper", "Comment your reasoning in code answers", ...GENERIC_TESTING.slice(1)],
    music: [music("coding lofi beats"), music("synthwave focus music")],
    videos: [{ name: "CS50", url: "https://www.youtube.com/@cs50" }, { name: "Fireship", url: "https://www.youtube.com/@Fireship" }, { name: "Crash Course Computer Science", url: "https://www.youtube.com/@crashcourse" }],
  },
};