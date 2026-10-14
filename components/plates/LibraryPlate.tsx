/** A Qt Widgets dashboard sketched as a wireframe, with the layer stack beside it. */
export function LibraryPlate() {
  const nav = ["Overview", "Books", "Loans", "Members", "Volunteers", "History"];
  const rows = [0, 1, 2, 3, 4];
  const layers = ["ui/  Qt Widgets", "core/  Library", "storage/  CSV", "model/  C++17"];

  return (
    <svg viewBox="0 0 640 440" className="h-full w-full" role="img" aria-label="Illustration: wireframe of the Qt library dashboard next to its four-layer architecture">
      {/* window */}
      <g>
        <rect x="32" y="40" width="420" height="340" className="fill-ink stroke-line-strong" />
        <rect x="32" y="40" width="420" height="26" className="fill-ink-2 stroke-line-strong" />
        <text x="44" y="57" className="fill-bone-2 font-mono text-[9.5px] tracking-wider">LMS_GUI · Dashboard</text>
        <g className="fill-line-strong">
          <rect x="410" y="50" width="8" height="8" />
          <rect x="424" y="50" width="8" height="8" />
          <rect x="438" y="50" width="8" height="8" className="fill-signal/70" />
        </g>

        {/* sidebar */}
        <rect x="32" y="66" width="104" height="314" className="fill-ink-1 stroke-line" />
        <rect x="42" y="78" width="54" height="14" className="fill-signal" />
        <text x="47" y="88.5" className="fill-ink font-mono text-[8.5px] font-bold tracking-widest">ADMIN</text>
        {nav.map((n, i) => (
          <g key={n}>
            {i === 1 && <rect x="32" y={106 + i * 26} width="3" height="20" className="fill-signal" />}
            <text x="46" y={120 + i * 26} className={`${i === 1 ? "fill-bone" : "fill-dim"} font-sans text-[11px]`}>
              {n}
            </text>
          </g>
        ))}

        {/* stat cards (labels only: no invented numbers) */}
        {["On shelf", "On loan", "Overdue"].map((s, i) => (
          <g key={s}>
            <rect x={150 + i * 98} y="80" width="88" height="54" className="fill-ink-1 stroke-line" />
            <text x={160 + i * 98} y="98" className="fill-dim font-mono text-[8.5px] tracking-widest">{s.toUpperCase()}</text>
            <rect x={160 + i * 98} y="110" width={[40, 26, 14][i]} height="10" className={i === 2 ? "fill-signal/80" : "fill-bone/60"} />
          </g>
        ))}

        {/* books table */}
        <rect x="150" y="148" width="284" height="218" className="fill-ink-1 stroke-line" />
        <g className="font-mono text-[8.5px] tracking-widest">
          <text x="160" y="166" className="fill-dim">TITLE</text>
          <text x="300" y="166" className="fill-dim">STATUS</text>
          <text x="378" y="166" className="fill-dim">DUE</text>
        </g>
        <line x1="150" y1="174" x2="434" y2="174" className="stroke-line" />
        {rows.map((r) => (
          <g key={r}>
            <rect x="160" y={186 + r * 34} width={[110, 84, 120, 70, 96][r]} height="7" className="fill-bone/45" />
            <rect x="160" y={198 + r * 34} width={[60, 50, 40, 66, 48][r]} height="5" className="fill-line-strong" />
            <rect
              x="300"
              y={186 + r * 34}
              width="50"
              height="13"
              className={r === 2 ? "fill-signal/15 stroke-signal" : "fill-none stroke-line-strong"}
            />
            <text x="306" y={195.5 + r * 34} className={`${r === 2 ? "fill-signal" : "fill-dim"} font-mono text-[7.5px] tracking-wider`}>
              {r === 2 ? "LATE" : r % 2 ? "ON LOAN" : "SHELF"}
            </text>
            <rect x="378" y={189 + r * 34} width="36" height="6" className="fill-line-strong" />
          </g>
        ))}
      </g>

      {/* layer stack */}
      <text x="482" y="58" className="fill-dim font-mono text-[9.5px] tracking-widest">LAYERS</text>
      {layers.map((l, i) => (
        <g key={l}>
          <rect x="482" y={72 + i * 76} width="128" height="52" className={i === 1 ? "fill-signal/10 stroke-signal" : "fill-ink-1 stroke-line-strong"} />
          <text x="492" y={102 + i * 76} className={`${i === 1 ? "fill-signal" : "fill-bone-2"} font-mono text-[10px]`}>
            {l}
          </text>
          {i < 3 && <line x1="546" y1={124 + i * 76} x2="546" y2={148 + i * 76} className="stroke-line-strong" strokeDasharray="2 3" />}
        </g>
      ))}
      <text x="482" y="400" className="fill-dim font-mono text-[9px] tracking-widest">GUI → CORE ONLY</text>
      <text x="32" y="404" className="fill-dim font-mono text-[9px] tracking-widest">ROLE: ADMIN · LOAN 14D · MAX 5 BOOKS</text>
    </svg>
  );
}
