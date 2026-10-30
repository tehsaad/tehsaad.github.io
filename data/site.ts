import portfolio from "./portfolio.json";

export const { projects, profile, skills, principles, journey } = portfolio;

export type Project = (typeof projects)[number];

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tehsaad.me",
  caseStudies: "https://www.tehsaad.site/projects.html",
  description:
    "Saad Rizwan (TehSaad), a Computer Science undergraduate at NUST SEECS, Islamabad, building AI, systems, and full-stack software projects.",
  github: profile.social.find((s) => s.kind === "github")!.url,
  linkedin: profile.social.find((s) => s.kind === "linkedin")!.url,
};

export const STATUS_LABELS: Record<string, string> = {
  deployed: "Deployed",
  completed: "Completed",
  experiment: "Experiment",
  "in-development": "In Development",
};

/** Screenshots live at the same file names as on the main site, under /work. */
export function imageSrc(url: string) {
  return "/work/" + url.split("/").pop();
}

/** Game links are relative to the main site. */
export function linkHref(url: string) {
  return /^https?:/.test(url) ? url : `https://www.tehsaad.site/${url}`;
}

/** The CMS allows `code` marks; this page shows them as plain text. */
export function plain(text: string) {
  return text.replace(/[`*]/g, "");
}
