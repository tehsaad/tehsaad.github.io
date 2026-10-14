import type { BuildStatusTone } from "@/data/builds";
import { cn } from "@/lib/cn";

const TONE: Record<BuildStatusTone, string> = {
  live: "bg-signal pulse-dot",
  stable: "bg-bone",
  prototype: "border border-bone",
  wip: "border border-dashed border-signal",
};

export function StatusMark({ tone, label, className }: { tone: BuildStatusTone; label: string; className?: string }) {
  return (
    <span className={cn("label inline-flex items-center gap-2 text-bone-2", className)}>
      <span aria-hidden className={cn("inline-block size-2 rounded-full", TONE[tone])} />
      {label}
    </span>
  );
}
