"use client";

import { useState } from "react";
import { experiments, type ExperimentKind } from "@/data/experiments";
import { cn } from "@/lib/cn";

const KINDS = ["All", ...Array.from(new Set(experiments.map((e) => e.kind)))] as const;

export function ScratchBoard() {
  const [kind, setKind] = useState<ExperimentKind | "All">("All");
  const list = kind === "All" ? experiments : experiments.filter((e) => e.kind === kind);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter experiments">
        {KINDS.map((k) => {
          const n = k === "All" ? experiments.length : experiments.filter((e) => e.kind === k).length;
          return (
            <button
              key={k}
              type="button"
              aria-pressed={kind === k}
              onClick={() => setKind(k as ExperimentKind | "All")}
              className={cn(
                "label h-9 border px-3 transition-colors",
                kind === k ? "border-signal bg-signal text-ink" : "border-line-strong text-bone-2 hover:border-bone hover:text-bone",
              )}
            >
              {k} <span className={kind === k ? "text-ink/60" : "text-dim"}>{n}</span>
            </button>
          );
        })}
      </div>

      <ul className="mt-8 grid border-t border-l border-line sm:grid-cols-2 xl:grid-cols-3" aria-live="polite">
        {list.map((e) => (
          <li key={e.id} className="group flex flex-col border-r border-b border-line bg-ink p-6 transition-colors hover:bg-ink-1 md:p-7">
            <div className="label flex items-center justify-between gap-3 text-dim">
              <span className="text-signal">{e.kind}</span>
              <span>{e.state}</span>
            </div>
            <h3 className="mt-8 text-xl text-bone">{e.title}</h3>
            <p className="mt-3 font-serif text-[1.45rem] leading-[1.15] text-bone-2 italic">“{e.question}”</p>
            <p className="mt-4 text-[0.92rem] leading-relaxed text-dim">{e.note}</p>
            <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Stack">
              {e.stack.map((t) => (
                <li key={t} className="label border border-line px-2 py-1 text-bone-2">
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-6">
              {e.href ? (
                <a
                  href={e.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label inline-flex items-center gap-2 text-bone transition-colors hover:text-signal"
                >
                  view source ↗<span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : (
                <span className="label text-dim">{e.hrefNote ?? "you're looking at it"}</span>
              )}
            </div>
          </li>
        ))}
        {kind === "All" && (
          <li className="flex flex-col justify-between border-r border-b border-line p-6 md:p-7" aria-label="Next experiment slot">
            <p className="label text-dim">
              <span className="text-signal">~/scratch/next</span> · open slot
            </p>
            <p className="mt-10 font-serif text-[1.9rem] leading-[1.1] text-bone-2">
              The next question is already open in an editor<span aria-hidden className="caret" />
            </p>
          </li>
        )}
      </ul>
    </div>
  );
}
