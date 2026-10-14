import type { Build, BuildLink } from "@/data/builds";
import { cn } from "@/lib/cn";

function One({ link, label, primary }: { link: BuildLink; label: string; primary?: boolean }) {
  if (!link.href) {
    return (
      <span
        className="label inline-flex h-10 cursor-not-allowed items-center gap-2 border border-dashed border-line-strong px-4 text-dim"
        aria-disabled="true"
        title={link.note}
      >
        <span className="text-bone-2">{label}</span>
        <span aria-hidden>·</span>
        {link.note ?? "Not available yet"}
      </span>
    );
  }
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "label group inline-flex h-10 items-center gap-2 border px-4 transition-colors",
        primary
          ? "border-signal bg-signal text-ink hover:bg-transparent hover:text-signal"
          : "border-line-strong text-bone hover:border-signal hover:text-signal",
      )}
    >
      {label}
      <span aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        ↗
      </span>
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

export function BuildLinks({ build, className }: { build: Build; className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <One link={build.links.live} label="Live" primary />
      <One link={build.links.repo} label="Source" />
    </div>
  );
}
