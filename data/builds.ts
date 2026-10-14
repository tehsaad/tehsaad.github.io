/**
 * Case files for ~/builds. Facts here come from each project's own README / source.
 * Where a link doesn't exist publicly, it's `null` and the UI shows an honest state.
 */

export type BuildStatusTone = "live" | "stable" | "prototype" | "wip";
export type PlateKind = "air-draw" | "library" | "shopflow" | "finance";

export interface BuildLink {
  href: string | null;
  /** Shown instead of a link when href is null, e.g. "Private repository". */
  note?: string;
}

export interface Build {
  slug: string;
  index: string;
  name: string;
  file: string;
  kind: string;
  oneLiner: string;
  summary: string;
  stack: string[];
  status: { label: string; tone: BuildStatusTone };
  links: { repo: BuildLink; live: BuildLink };
  plate: PlateKind;
  caption: string;
  problem: string[];
  mechanism: { intro: string; steps: { title: string; body: string }[] };
  materials: { name: string; use: string }[];
  role: string[];
  readout: { body: string[]; facts: { k: string; v: string }[] };
}

export const builds: Build[] = [
  {
    slug: "air-draw-controller",
    index: "001",
    name: "Air Draw Controller",
    file: "air-draw/",
    kind: "Computer vision · real-time input",
    oneLiner: "A webcam watches your hand, and your hand becomes the input device.",
    summary:
      "Real-time hand tracking turns finger poses into drawing and control actions, with no glove, controller or touchscreen. Just a camera and the space in front of it.",
    stack: ["Python", "OpenCV", "MediaPipe", "NumPy", "Hand tracking", "Gesture recognition"],
    status: { label: "Working prototype", tone: "prototype" },
    links: {
      repo: { href: null, note: "Repository not public yet" },
      live: { href: null, note: "Runs locally (needs a webcam)" },
    },
    plate: "air-draw",
    caption: "plate 01: 21-point hand landmark graph, index fingertip as pen",
    problem: [
      "Every common interface assumes you're touching something: a key, a mouse, a glass screen. Air Draw asks a different question. What if the interface is the air in front of the screen?",
      "Doing that well is a vision problem as much as a UI problem. The system has to find a hand in a noisy webcam frame, understand its pose, decide what the person means, and respond fast enough that it feels like drawing rather than waiting.",
    ],
    mechanism: {
      intro:
        "A tight capture → understand → act loop that runs every frame. Each stage is small and replaceable, which keeps it fast enough to feel direct.",
      steps: [
        {
          title: "Capture",
          body: "OpenCV reads frames from the webcam and mirrors them, so moving your hand right moves the pen right, like a mirror.",
        },
        {
          title: "Detect",
          body: "MediaPipe Hands finds the hand and returns 21 landmarks per frame: the wrist plus four joints on each finger, in normalised coordinates.",
        },
        {
          title: "Interpret",
          body: "Landmark geometry becomes finger states. Comparing each fingertip with the joints below it (vector maths in NumPy) tells which fingers are raised, and that combination is read as a gesture.",
        },
        {
          title: "Act",
          body: "The gesture drives the canvas. The fingertip's position maps to screen coordinates, strokes are drawn on an overlay layer, and the result is composited back onto the live frame.",
        },
      ],
    },
    materials: [
      { name: "Python", use: "The whole real-time loop and the glue between stages." },
      { name: "OpenCV", use: "Camera capture, frame transforms, drawing primitives and compositing." },
      { name: "MediaPipe", use: "Hand detection and the 21-point landmark model." },
      { name: "NumPy", use: "Landmark vectors, distances and coordinate mapping." },
    ],
    role: [
      "Designed the interaction model: which hand poses mean what, and how they should feel.",
      "Implemented the capture → landmarks → gesture → canvas pipeline.",
    ],
    readout: {
      body: [
        "A working real-time prototype: point a finger at the webcam and draw. It's the project that pulled me into computer vision, and the reason a hand shows up throughout this site.",
      ],
      facts: [
        { k: "Input", v: "Any webcam" },
        { k: "Landmarks / frame", v: "21" },
        { k: "State", v: "Prototype, running locally" },
      ],
    },
  },
  {
    slug: "library-management-system",
    index: "002",
    name: "Library Management System",
    file: "lms-qt/",
    kind: "C++17 · Qt 6 desktop application",
    oneLiner: "A desktop system where every role, rule and record is modelled in C++.",
    summary:
      "Four kinds of users, real borrowing rules, and data that survives a restart without a database, because the persistence layer is a hand-written CSV engine.",
    stack: ["C++17", "Qt 6", "Qt Widgets", "OOP", "CSV persistence", "File I/O"],
    status: { label: "Complete · public source", tone: "stable" },
    links: {
      repo: { href: "https://github.com/tehsaad/Library-Managment-System" },
      live: { href: null, note: "Desktop app: build with Qt Creator" },
    },
    plate: "library",
    caption: "plate 02: role-based dashboard over a layered C++ core",
    problem: [
      "It started as a first-year Object-Oriented Programming project. I treated it as real software instead: different people need different powers, the library's rules must hold no matter which screen you're on, and every change has to persist.",
      "The goal was code where each OOP idea (abstraction, inheritance, interfaces, operator overloading) is doing real work, not just there to tick a box.",
    ],
    mechanism: {
      intro:
        "Four layers with one strict rule: the GUI never touches data directly. It asks the Library core, which owns every rule.",
      steps: [
        {
          title: "Model",
          body: "Plain C++ with no Qt. An abstract Person base with Student, Faculty and Admin; Book, Loan and history entries; a Date value class with overloaded operators; a CsvSerializable interface.",
        },
        {
          title: "Storage",
          body: "A hand-written CsvParser that handles quoting, embedded commas and escaped quotes, a FileHandler on fstream, and typed File/Library exceptions.",
        },
        {
          title: "Core",
          body: "One Library class holds all data and enforces all rules: 14-day loans, a five-book limit, borrowing blocked by a pending fee or three warnings, late returns adding warnings.",
        },
        {
          title: "Interface",
          body: "Qt Widgets: Welcome → Login → role dashboard, with pages and dialogs built on shared base classes and a QSS theme. On first run, sample CSVs are seeded into a data folder.",
        },
      ],
    },
    materials: [
      { name: "C++17", use: "Domain model, rules engine, storage layer." },
      { name: "Qt 6 / Widgets", use: "Windows, pages, dialogs, role cards and the QSS theme." },
      { name: "fstream + custom CSV", use: "Persistence with no database dependency." },
      { name: "Unit tests", use: "Core (non-GUI) classes are tested in isolation." },
    ],
    role: [
      "Designed the class hierarchy and the model/storage/core/UI split.",
      "Wrote the CSV parser, the rules engine and the Qt interface.",
    ],
    readout: {
      body: [
        "Complete and public. Admins manage members and review volunteer applications, faculty run the catalogue and loans, students search and borrow, and volunteers apply without an account.",
      ],
      facts: [
        { k: "Roles", v: "Admin · Faculty · Student · Volunteer" },
        { k: "Persistence", v: "CSV, hand-parsed" },
        { k: "Tests", v: "Core logic covered" },
      ],
    },
  },
  {
    slug: "shopflow",
    index: "003",
    name: "ShopFlow",
    file: "shopflow/",
    kind: "Full-stack product · multi-tenant commerce",
    oneLiner: "An operating system for small sellers: inventory, storefront, payments and an AI-drafted inbox.",
    summary:
      "Built for the sellers who run their business through Instagram DMs and WhatsApp. One account gives a shop its stock, orders, a public store, real checkout, customers and analytics.",
    stack: ["TypeScript", "Next.js 16", "React 19", "Tailwind 4", "Django 5.2", "PostgreSQL", "Stripe", "Anthropic API"],
    status: { label: "Live · V4", tone: "live" },
    links: {
      repo: { href: null, note: "Private repository" },
      live: { href: "https://shopflow-web-ten.vercel.app" },
    },
    plate: "shopflow",
    caption: "plate 03: request path from buyer to webhook-confirmed payment",
    problem: [
      "Small retailers like boutiques, home businesses and Instagram or WhatsApp sellers run on chat threads and spreadsheets. Stock drifts, orders get lost in DMs, and payment status is a guess.",
      "ShopFlow is meant to be the system they'd otherwise never get: correct stock, orders that move from placed to delivered, a store page buyers can use, and help answering customers without handing the conversation to a bot.",
    ],
    mechanism: {
      intro:
        "A Next.js app and a Django API, both on Vercel, over pooled Postgres. Most of the engineering is in the guarantees, not the screens.",
      steps: [
        {
          title: "No tokens in the browser",
          body: "Next.js route handlers keep JWTs in httpOnly cookies and proxy every request. The public store goes through an allow-listed proxy.",
        },
        {
          title: "The server decides the price",
          body: "A cart is only variant IDs and quantities. Totals, shipping and stock are recalculated on every quote and again at checkout, with stock reservations and an auditable ledger.",
        },
        {
          title: "Paid means the provider said so",
          body: "Stripe webhooks are signature-checked and recorded exactly once, so replays are ignored. Refunds count only when Stripe confirms them.",
        },
        {
          title: "Tenancy everywhere",
          body: "Every query is scoped to the signed-in business, with owner/admin/staff roles enforced by the API and tests for cross-business access.",
        },
        {
          title: "ReplyFlow",
          body: "A customer inbox where AI drafts replies from the shop's real prices, stock and order history. A person always reviews and sends.",
        },
      ],
    },
    materials: [
      { name: "Next.js 16 · React 19", use: "Website, storefront, checkout and a server-component dashboard." },
      { name: "Django 5.2", use: "REST API: auth, tenancy, orders, payments, webhooks." },
      { name: "PostgreSQL (Neon)", use: "Pooled relational store for every business." },
      { name: "Stripe", use: "Card checkout and idempotent webhook processing." },
      { name: "Anthropic API", use: "ReplyFlow drafts, grounded in shop data." },
      { name: "Vercel", use: "Hosting for both apps, plus a daily cron job." },
      { name: "Kotlin", use: "A native Android shell around the live site." },
    ],
    role: [
      "Product, architecture and implementation across the web app, the API and the Android shell.",
      "Security model: cookie-held tokens, server-side pricing, webhook verification, tenant scoping.",
    ],
    readout: {
      body: [
        "Version 4 is live. Every data screen has loading, empty, no-results and error states and works from 320 px wide. Features that aren't ready are marked \"coming soon\" instead of being faked.",
      ],
      facts: [
        { k: "Version", v: "V4" },
        { k: "Surfaces", v: "Web · storefront · Android" },
        { k: "Payments", v: "Cash on delivery + Stripe" },
      ],
    },
  },
  {
    slug: "finance-expense-engine",
    index: "004",
    name: "Personal Finance & Expense Engine",
    file: "finance-engine/",
    kind: "Python · data analysis",
    oneLiner: "Turning a raw pile of transactions into recurring patterns and a budget you can read.",
    summary:
      "A Pandas pipeline that cleans transaction data, finds the spending that quietly repeats, and draws budget breakdowns, wrapped in a small GUI.",
    stack: ["Python", "Pandas", "Matplotlib", "Data analysis", "Visualisation", "GUI"],
    status: { label: "In development", tone: "wip" },
    links: {
      repo: { href: "https://github.com/tehsaad/Personal-Finance-Manager" },
      live: { href: null, note: "Desktop / notebook tool" },
    },
    plate: "finance",
    caption: "plate 04: category breakdown, recurring charges flagged (illustrative render)",
    problem: [
      "Bank exports answer \"what happened\" one row at a time. They don't answer the questions that matter: where does the money actually go, and which charges come back every month without anyone noticing?",
    ],
    mechanism: {
      intro: "The pipeline being built: four stages, each a plain Pandas transformation that can be checked in a notebook.",
      steps: [
        { title: "Ingest", body: "Load transaction exports into a DataFrame and normalise dates, amounts and descriptions." },
        { title: "Categorise", body: "Map merchants and descriptions to spending categories." },
        { title: "Detect recurrence", body: "Group by merchant and amount, then look for regular intervals to surface subscriptions and repeating spend." },
        { title: "Visualise", body: "Matplotlib breakdowns by category and over time, shown in a simple GUI." },
      ],
    },
    materials: [
      { name: "Pandas", use: "Cleaning, grouping and the recurrence analysis." },
      { name: "Matplotlib", use: "Budget breakdowns and trend charts." },
      { name: "Jupyter", use: "Exploring the data before it becomes code." },
    ],
    role: ["Solo: analysis design, data pipeline and visualisation."],
    readout: {
      body: [
        "Actively being built. The public repository holds the environment and the first plotting tests, and the engine lands there as each stage works. The chart on this page is an illustrative render, not real data.",
      ],
      facts: [
        { k: "State", v: "Early build" },
        { k: "Stack", v: "Pandas · Matplotlib · Jupyter" },
      ],
    },
  },
];

export const getBuild = (slug: string) => builds.find((b) => b.slug === slug);
