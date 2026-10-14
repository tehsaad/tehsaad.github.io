/**
 * ~/materials — a matrix of technology × build.
 * A dot only appears where the technology is genuinely used in that build.
 */

export const matrixColumns = [
  { id: "air", label: "Air Draw", href: "/builds/air-draw-controller" },
  { id: "lms", label: "Library", href: "/builds/library-management-system" },
  { id: "shop", label: "ShopFlow", href: "/builds/shopflow" },
  { id: "fin", label: "Finance", href: "/builds/finance-expense-engine" },
  { id: "jarvis", label: "JARVIS", href: "#scratch" },
  { id: "resume", label: "Resume AI", href: "#scratch" },
] as const;

export type ColumnId = (typeof matrixColumns)[number]["id"];

export interface StackGroup {
  area: string;
  note: string;
  items: { name: string; uses: ColumnId[] }[];
}

export const stack: StackGroup[] = [
  {
    area: "AI / ML",
    note: "Models as components, not magic",
    items: [
      { name: "LLM APIs (Anthropic, OpenAI)", uses: ["shop", "resume"] },
      { name: "Structured output + schemas", uses: ["resume"] },
      { name: "Hugging Face inference", uses: ["resume"] },
      { name: "Speech recognition / TTS", uses: ["jarvis"] },
      { name: "Gesture classification", uses: ["air"] },
    ],
  },
  {
    area: "Computer vision",
    note: "Pixels → meaning, in real time",
    items: [
      { name: "OpenCV", uses: ["air"] },
      { name: "MediaPipe Hands", uses: ["air"] },
      { name: "Landmark geometry", uses: ["air"] },
    ],
  },
  {
    area: "Python",
    note: "The default language for finding out",
    items: [
      { name: "Python", uses: ["air", "fin", "jarvis", "shop"] },
      { name: "NumPy", uses: ["air"] },
      { name: "Django", uses: ["shop"] },
    ],
  },
  {
    area: "C++",
    note: "Where I learn what the machine is doing",
    items: [
      { name: "C++17", uses: ["lms"] },
      { name: "Qt 6 / Widgets", uses: ["lms"] },
      { name: "OOP architecture", uses: ["lms"] },
    ],
  },
  {
    area: "Frontend",
    note: "Interfaces with every state designed",
    items: [
      { name: "TypeScript", uses: ["shop", "resume"] },
      { name: "React / Next.js", uses: ["shop", "resume"] },
      { name: "Tailwind CSS", uses: ["shop", "resume"] },
    ],
  },
  {
    area: "Backend",
    note: "The part that has to be right",
    items: [
      { name: "REST API design", uses: ["shop", "resume"] },
      { name: "Auth (JWT, httpOnly cookies)", uses: ["shop"] },
      { name: "Payments + webhooks (Stripe)", uses: ["shop"] },
    ],
  },
  {
    area: "Data",
    note: "Storage, shape, and what it says",
    items: [
      { name: "PostgreSQL", uses: ["shop"] },
      { name: "Pandas", uses: ["fin"] },
      { name: "Matplotlib", uses: ["fin"] },
      { name: "CSV persistence", uses: ["lms"] },
    ],
  },
  {
    area: "Tools",
    note: "How it ships",
    items: [
      { name: "Git + GitHub", uses: ["air", "lms", "shop", "fin", "jarvis", "resume"] },
      { name: "Vercel", uses: ["shop"] },
      { name: "Vitest", uses: ["shop", "resume"] },
      { name: "Qt Creator", uses: ["lms"] },
      { name: "Jupyter", uses: ["fin"] },
    ],
  },
];
