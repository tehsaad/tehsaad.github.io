"use client";

import { Fragment, useState } from "react";
import { matrixColumns, stack, type ColumnId } from "@/data/stack";
import { cn } from "@/lib/cn";

export function StackMatrix() {
  const [hoverCol, setHoverCol] = useState<ColumnId | null>(null);
  const [pinned, setPinned] = useState<ColumnId | null>(null);
  const [hoverRow, setHoverRow] = useState<string | null>(null);
  const focus = pinned ?? hoverCol;

  const count = (id: ColumnId) => stack.reduce((n, g) => n + g.items.filter((it) => it.uses.includes(id)).length, 0);

  return (
    <>
      {/* ── Desktop / tablet: the matrix ───────────────────────── */}
      <div className="hidden md:block">
        <div className="label mb-4 flex items-center justify-between text-dim">
          <span>
            {pinned ? (
              <>
                showing what <span className="text-signal">{matrixColumns.find((c) => c.id === pinned)?.label}</span> is
                made of: {count(pinned)} materials
              </>
            ) : (
              "hover a row or column · click a build to pin it"
            )}
          </span>
          {pinned && (
            <button type="button" onClick={() => setPinned(null)} className="label text-bone-2 hover:text-signal">
              clear ×
            </button>
          )}
        </div>
        <table className="w-full border-collapse text-left" onMouseLeave={() => (setHoverCol(null), setHoverRow(null))}>
          <caption className="sr-only">Technologies by area, and which builds use each one</caption>
          <thead>
            <tr className="border-b border-line-strong">
              <th scope="col" className="label w-[34%] py-3 pr-4 font-normal text-dim">
                material
              </th>
              {matrixColumns.map((c) => (
                <th key={c.id} scope="col" className="p-0 font-normal">
                  <button
                    type="button"
                    aria-pressed={pinned === c.id}
                    onMouseEnter={() => setHoverCol(c.id)}
                    onFocus={() => setHoverCol(c.id)}
                    onBlur={() => setHoverCol(null)}
                    onClick={() => setPinned((p) => (p === c.id ? null : c.id))}
                    className={cn(
                      "label w-full px-2 py-3 text-center transition-colors",
                      focus === c.id ? "text-signal" : "text-bone-2 hover:text-bone",
                    )}
                  >
                    {c.label}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stack.map((g) => (
              <Fragment key={g.area}>
                <tr>
                  <th colSpan={matrixColumns.length + 1} scope="colgroup" className="pt-8 pb-2 text-left font-normal">
                    <span className="font-serif text-2xl text-bone">{g.area}</span>
                    <span className="label ml-4 text-dim">{g.note}</span>
                  </th>
                </tr>
                {g.items.map((it) => {
                  const dim = focus && !it.uses.includes(focus);
                  const rowOn = hoverRow === it.name;
                  return (
                    <tr
                      key={it.name}
                      onMouseEnter={() => setHoverRow(it.name)}
                      className={cn("border-t border-line transition-opacity duration-300", dim && "opacity-25")}
                    >
                      <th scope="row" className={cn("py-2.5 pr-4 font-mono text-[0.8rem] font-normal transition-colors", rowOn ? "text-signal" : "text-bone")}>
                        {it.name}
                      </th>
                      {matrixColumns.map((c) => {
                        const used = it.uses.includes(c.id);
                        const colOn = focus === c.id;
                        return (
                          <td key={c.id} className={cn("text-center transition-colors", colOn && "bg-ink-1")}>
                            {used ? (
                              <span
                                className={cn(
                                  "inline-block size-2.5 transition-all duration-300",
                                  rowOn || colOn ? "scale-125 bg-signal" : "bg-bone",
                                )}
                              >
                                <span className="sr-only">used in {c.label}</span>
                              </span>
                            ) : (
                              <span aria-hidden className={cn("inline-block h-px w-2", rowOn ? "bg-line-strong" : "bg-line")} />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Phones: grouped list, same data ─────────────────────── */}
      <div className="md:hidden">
        {stack.map((g) => (
          <section key={g.area} className="border-t border-line py-6" aria-label={g.area}>
            <h3 className="font-serif text-2xl text-bone">{g.area}</h3>
            <p className="label mt-1 text-dim">{g.note}</p>
            <ul className="mt-4 space-y-3">
              {g.items.map((it) => (
                <li key={it.name}>
                  <p className="font-mono text-[0.85rem] text-bone">{it.name}</p>
                  <p className="label mt-1 text-dim">
                    used in{" "}
                    {it.uses
                      .map((u) => matrixColumns.find((c) => c.id === u)?.label)
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
