"use client";

import { useEffect, useRef, useState } from "react";
import { BONES, FINGERS, HAND_BOX, TIP_IDS, handLandmarks, palmPath, readGesture, type Curls } from "@/lib/hand";
import { useReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/cn";

const PRESETS: { label: string; up: boolean[] }[] = [
  { label: "Draw", up: [false, true, false, false, false] },
  { label: "Hover", up: [false, true, true, false, false] },
  { label: "Open palm", up: [true, true, true, true, true] },
  { label: "Fist", up: [false, false, false, false, false] },
];

const toCurls = (up: boolean[]) => up.map((u) => (u ? 0 : 1)) as Curls;
const { x: VX, y: VY, w: VW, h: VH } = HAND_BOX;
const guides = `M${VX + 8} ${VY + 26} V${VY + 8} H${VX + 26} M${VX + VW - 26} ${VY + 8} H${VX + VW - 8} V${VY + 26} M${VX + VW - 8} ${VY + VH - 26} V${VY + VH - 8} H${VX + VW - 26} M${VX + 26} ${VY + VH - 8} H${VX + 8} V${VY + VH - 26}`;

export function HandLab() {
  const reduced = useReducedMotion();
  const [up, setUp] = useState<boolean[]>(PRESETS[0].up);
  const [curls, setCurls] = useState<Curls>(toCurls(PRESETS[0].up));
  const current = useRef<Curls>(toCurls(PRESETS[0].up));

  // Ease each finger toward its target pose.
  useEffect(() => {
    const target = toCurls(up);
    if (reduced) {
      current.current = target;
      const id = requestAnimationFrame(() => setCurls(target));
      return () => cancelAnimationFrame(id);
    }
    let raf = 0;
    const step = () => {
      const next = current.current.map((c, i) => c + (target[i] - c) * 0.16) as Curls;
      const done = next.every((c, i) => Math.abs(c - target[i]) < 0.004);
      current.current = done ? target : next;
      setCurls(current.current);
      if (!done) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [up, reduced]);

  const pts = handLandmarks(curls);
  const gesture = readGesture(up);
  const vector = up.map((u) => (u ? 1 : 0)).join(" ");
  const toggle = (i: number) => setUp((u) => u.map((v, k) => (k === i ? !v : v)));

  return (
    <div className="grid gap-px border border-line bg-line lg:grid-cols-12">
      {/* stage */}
      <div className="reg min-w-0 bg-ink-1 lg:col-span-7">
        <span aria-hidden className="reg-b" />
        <div className="label flex items-center justify-between border-b border-line px-4 py-3 text-dim">
          <span>
            <span className="text-signal">●</span> hand model · mediapipe topology
          </span>
          <span className="hidden sm:inline">tap a fingertip</span>
        </div>
        <div className="bg-grid relative">
          <svg
            viewBox={`${VX} ${VY} ${VW} ${VH}`}
            className="mx-auto block h-[min(64vh,500px)] w-full py-4"
            role="img"
            aria-label={`Hand model with ${FINGERS.filter((_, i) => up[i]).join(", ") || "no fingers"} raised. Reads as ${gesture.name}.`}
          >
            <g className="stroke-line-strong" fill="none">
              <path d={guides} />
            </g>
            <path d={palmPath(pts)} className="fill-bone/[0.06] stroke-bone/20" strokeLinejoin="round" />
            <g strokeLinecap="round">
              {BONES.map(([a, b]) => (
                <line
                  key={`${a}-${b}`}
                  x1={pts[a].x}
                  y1={pts[a].y}
                  x2={pts[b].x}
                  y2={pts[b].y}
                  className="stroke-bone/60"
                  strokeWidth="2"
                />
              ))}
            </g>
            {pts.map((p, i) => {
              const tipOf = TIP_IDS.indexOf(i);
              const isTip = tipOf >= 0;
              const raised = isTip && up[tipOf];
              return (
                <g key={i}>
                  {isTip && (
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="22"
                      className="cursor-pointer fill-transparent"
                      onClick={() => toggle(tipOf)}
                      aria-hidden
                    />
                  )}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isTip ? 6 : 3.5}
                    className={cn(
                      "pointer-events-none",
                      raised ? "fill-signal" : isTip ? "fill-ink stroke-signal" : "fill-ink stroke-bone",
                    )}
                    strokeWidth="1.4"
                  />
                  {(isTip || i === 0) && (
                    <text
                      x={p.x + (i < 5 ? 11 : -11)}
                      y={p.y + (i === 0 ? 16 : 3)}
                      textAnchor={i < 5 ? "start" : "end"}
                      className={cn("pointer-events-none font-mono text-[9px]", raised ? "fill-signal" : "fill-bone-2")}
                    >
                      {i}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
        <div className="grid grid-cols-5 border-t border-line" role="group" aria-label="Raise or lower fingers">
          {FINGERS.map((f, i) => (
            <button
              key={f}
              type="button"
              aria-pressed={up[i]}
              onClick={() => toggle(i)}
              className={cn(
                "label h-12 border-r border-line transition-colors last:border-r-0",
                up[i] ? "bg-signal/10 text-signal" : "text-dim hover:text-bone",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* readout */}
      <div className="flex min-w-0 flex-col bg-ink lg:col-span-5">
        <div className="label border-b border-line px-5 py-3 text-dim">readout · per frame</div>
        <ol className="divide-y divide-line">
          {[
            { k: "capture", v: "webcam frame, mirrored" },
            { k: "detect", v: "1 hand found" },
            { k: "landmarks", v: "21 points (x, y, z)" },
            { k: "finger states", v: `[ ${vector} ]`, hot: true },
            { k: "gesture", v: gesture.name, hot: true },
            { k: "action", v: gesture.action, hot: true },
          ].map((r, i) => (
            <li key={r.k} className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 px-5 py-3">
              <span className="label text-dim">
                {String(i + 1).padStart(2, "0")} {r.k}
              </span>
              <span className={cn("font-mono text-sm", r.hot ? "text-bone" : "text-bone-2")} aria-live={r.k === "action" ? "polite" : undefined}>
                {r.v}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-auto border-t border-line">
          <div className="flex flex-wrap gap-px border-b border-line bg-line" role="group" aria-label="Pose presets">
            {PRESETS.map((p) => {
              const on = p.up.every((v, i) => v === up[i]);
              return (
                <button
                  key={p.label}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setUp(p.up)}
                  className={cn(
                    "label h-11 flex-1 bg-ink px-3 transition-colors",
                    on ? "text-signal" : "text-bone-2 hover:text-bone",
                  )}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
          <pre className="overflow-x-auto px-5 py-5 font-mono text-[0.78rem] leading-relaxed text-bone-2">
            <code>
              <span className="text-dim"># the core idea, simplified{"\n"}</span>
              <span className="text-dim"># a finger is up if its tip sits above its PIP joint{"\n"}</span>
              tips, pips = [<span className="text-signal">8, 12, 16, 20</span>], [6, 10, 14, 18]{"\n"}
              up = [lm[t].y &lt; lm[p].y <span className="text-signal">for</span> t, p <span className="text-signal">in</span> zip(tips, pips)]{"\n"}
              gesture = RULES.get(tuple(up), <span className="text-bone">&quot;none&quot;</span>)
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
