/**
 * Identity + contact. Anything set to `null` is simply not rendered in production —
 * fill it in when you want it public. Nothing here is guessed.
 */
export const site = {
  name: "TehSaad",
  handle: "tehsaad",
  role: "Computer Science Student · AI & Software Developer",
  location: "Islamabad, PK",
  timeZone: "Asia/Karachi",
  tzLabel: "PKT",
  /** Explicit override → the GitHub Pages custom domain. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tehsaad.me",
  description:
    "TehSaad — computer science student building computer-vision interfaces, C++/Qt desktop software and full-stack products. A working bench of real builds.",
  links: {
    github: "https://github.com/tehsaad",
    /** e.g. "https://www.linkedin.com/in/your-handle" */
    linkedin: null as string | null,
    /** e.g. "you@domain.com" — kept null until you decide to publish it. */
    email: null as string | null,
  },
} as const;

export type SectionId = "bench" | "operator" | "builds" | "vision" | "materials" | "scratch" | "signal";

/** The bench is navigated like a filesystem: every section is a path. */
export const sections: { id: SectionId; path: string; title: string; hint: string }[] = [
  { id: "bench", path: "~/bench", title: "Bench", hint: "start here" },
  { id: "operator", path: "~/operator", title: "Operator", hint: "who's building" },
  { id: "builds", path: "~/builds", title: "Builds", hint: "four case files" },
  { id: "vision", path: "~/vision", title: "Vision lab", hint: "how a machine reads a hand" },
  { id: "materials", path: "~/materials", title: "Materials", hint: "stack × builds" },
  { id: "scratch", path: "~/scratch", title: "Scratch", hint: "experiments + hackathons" },
  { id: "signal", path: "~/signal", title: "Signal", hint: "get in touch" },
];
