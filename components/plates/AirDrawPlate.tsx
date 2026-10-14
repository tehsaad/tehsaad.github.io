import { BONES, handLandmarks, palmPath } from "@/lib/hand";

/** A hand caught mid-stroke: index raised as the pen, the stroke trailing from its tip. */
export function AirDrawPlate() {
  const pts = handLandmarks([0.9, 0, 1, 1, 1]).map((p) => ({ x: p.x * 0.92 + 250, y: p.y * 0.92 - 30 }));
  const tip = pts[8];
  const xs = pts.map((p) => p.x);
  const ys = pts.map((p) => p.y);
  const box = { x: Math.min(...xs) - 22, y: Math.min(...ys) - 22, x2: Math.max(...xs) + 22, y2: Math.max(...ys) + 18 };

  return (
    <svg viewBox="0 0 640 440" className="h-full w-full" role="img" aria-label="Illustration: a hand skeleton of 21 tracked points drawing a stroke with the index fingertip">
      {/* webcam frame guides */}
      <g className="stroke-line-strong" fill="none" strokeWidth="1">
        <path d="M40 60 V40 H60 M580 40 H600 V60 M600 380 V400 H580 M60 400 H40 V380" />
      </g>
      <text x="40" y="28" className="fill-dim font-mono text-[10px] tracking-widest">CAM 0 · MIRRORED</text>
      <text x="600" y="28" textAnchor="end" className="fill-dim font-mono text-[10px] tracking-widest">● REC</text>

      {/* the stroke so far */}
      <path
        d={`M84 330 C 112 220, 182 204, 208 266 S 262 356, 300 280 S 380 120, ${tip.x} ${tip.y}`}
        fill="none"
        className="stroke-signal"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path d="M84 330 C 112 220, 182 204, 208 266" fill="none" className="stroke-signal/30" strokeWidth="10" strokeLinecap="round" />

      {/* detection box */}
      <rect x={box.x} y={box.y} width={box.x2 - box.x} height={box.y2 - box.y} fill="none" className="stroke-bone/40" strokeDasharray="3 5" />
      <text x={box.x} y={box.y - 8} className="fill-bone-2 font-mono text-[10px] tracking-widest">HAND · RIGHT</text>

      <path d={palmPath(pts)} className="fill-bone/[0.06] stroke-bone/20" strokeLinejoin="round" />
      {/* skeleton */}
      <g className="stroke-bone/70" strokeWidth="1.5" strokeLinecap="round">
        {BONES.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={pts[a].x} y1={pts[a].y} x2={pts[b].x} y2={pts[b].y} />
        ))}
      </g>
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={i === 8 ? 6 : 3} className={i === 8 ? "fill-signal" : "fill-ink stroke-bone"} strokeWidth="1.2" />
      ))}
      <circle cx={tip.x} cy={tip.y} r="15" fill="none" className="stroke-signal" strokeWidth="1" />
      <text x={tip.x + 22} y={tip.y + 4} className="fill-signal font-mono text-[10px] tracking-widest">8 · INDEX_TIP</text>
      <text x={pts[0].x + 14} y={pts[0].y + 4} className="fill-dim font-mono text-[10px] tracking-widest">0 · WRIST</text>

      <g className="font-mono text-[10px] tracking-widest">
        <text x="40" y="424" className="fill-dim">LANDMARKS 21</text>
        <text x="190" y="424" className="fill-dim">FINGERS [0 1 0 0 0]</text>
        <text x="600" y="424" textAnchor="end" className="fill-bone">GESTURE → DRAW</text>
      </g>
    </svg>
  );
}
