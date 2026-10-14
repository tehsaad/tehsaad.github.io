/**
 * ~/scratch — smaller builds that exist to understand how something works.
 * Add an entry here and it appears on the page (and in the filter) automatically.
 */

export type ExperimentKind = "AI prototype" | "Desktop" | "Mobile" | "C++" | "Web";

export interface Experiment {
  id: string;
  title: string;
  kind: ExperimentKind;
  question: string;
  note: string;
  stack: string[];
  state: string;
  href: string | null;
  hrefNote?: string;
}

export const experiments: Experiment[] = [
  {
    id: "jarvis-friday",
    title: "J.A.R.V.I.S. & F.R.I.D.A.Y.",
    kind: "AI prototype",
    question: "Can a voice assistant switch personality and language mid-sentence?",
    note: "A bilingual desktop voice assistant with two characters. It recognises English and Hindi in parallel, classifies each command as English, Hindi or Hinglish, routes it through intent detection, and replies in the same language with clearly labelled voices.",
    stack: ["Python", "Speech-to-text", "Intent detection", "TTS", "Desktop GUI"],
    state: "Working · private repo",
    href: null,
    hrefNote: "Private repository",
  },
  {
    id: "resume-analyzer",
    title: "AI Resume Analyzer",
    kind: "AI prototype",
    question: "How do you make an LLM return something a program can trust?",
    note: "Upload a résumé and an optional job description to get a scored breakdown, rewritten bullets and keyword match. Output follows a strict schema shared by OpenAI structured outputs and a Hugging Face fallback, with a rule-based offline mode.",
    stack: ["Next.js", "TypeScript", "OpenAI SDK", "Hugging Face", "Zod"],
    state: "Working · local",
    href: null,
    hrefNote: "Not published yet",
  },
  {
    id: "shopflow-android",
    title: "ShopFlow for Android",
    kind: "Mobile",
    question: "What does a web app need to feel native?",
    note: "A Kotlin shell around the live ShopFlow site, with splash, pull-to-refresh, an offline screen, camera and gallery uploads, in-app Stripe returns and a unit-tested link router. HTTPS only, with no JavaScript bridges.",
    stack: ["Kotlin", "Android", "WebView", "GitHub Actions"],
    state: "Signed release builds",
    href: null,
    hrefNote: "Private repository",
  },
  {
    id: "cpp-learning",
    title: "Cpp-Learning",
    kind: "C++",
    question: "What does C++ look like when you learn it by writing it?",
    note: "My running log of C++ exercises, from fundamentals upward. This is the groundwork the Qt library system was built on.",
    stack: ["C++"],
    state: "Ongoing · public",
    href: "https://github.com/tehsaad/Cpp-Learning",
  },
  {
    id: "this-site",
    title: "This bench",
    kind: "Web",
    question: "Can a portfolio explain a project by letting you use the idea?",
    note: "The site you're on: an air-draw canvas, an interactive hand-landmark model and a stack matrix. Built with Next.js server components and CSS scroll timelines, with very little client JavaScript.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Canvas", "SVG"],
    state: "Live",
    href: null,
  },
];

/** ~/scratch/hackathons — empty until there's something real to log. */
export interface HackathonEntry {
  event: string;
  date: string;
  build: string;
  summary: string;
  stack: string[];
  outcome?: string;
  href?: string;
}

export const hackathons: HackathonEntry[] = [];
