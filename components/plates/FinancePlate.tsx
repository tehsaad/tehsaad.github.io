/** Illustrative render (synthetic shapes, not real data): category split + a timeline with recurring charges flagged. */
export function FinancePlate() {
  const cats = [
    { k: "Food", w: 150 },
    { k: "Transport", w: 96 },
    { k: "Subscriptions", w: 70, hot: true },
    { k: "Study", w: 118 },
    { k: "Other", w: 54 },
  ];
  const days = Array.from({ length: 36 }, (_, i) => i);
  const height = (i: number) => 12 + ((i * 37) % 23) + (i % 7 === 0 ? 18 : 0);
  const recurring = (i: number) => i % 12 === 3;

  return (
    <svg viewBox="0 0 640 440" className="h-full w-full" role="img" aria-label="Illustrative chart with synthetic shapes: spending split by category and a transaction timeline where recurring charges are flagged">
      <text x="36" y="40" className="fill-dim font-mono text-[9.5px] tracking-widest">df.groupby(&quot;category&quot;).amount.sum()</text>
      <text x="604" y="40" textAnchor="end" className="fill-signal font-mono text-[9.5px] tracking-widest">ILLUSTRATIVE · NOT REAL DATA</text>

      {cats.map((c, i) => (
        <g key={c.k}>
          <text x="36" y={86 + i * 34} className={`${c.hot ? "fill-signal" : "fill-bone-2"} font-sans text-[12px]`}>
            {c.k}
          </text>
          <rect x="150" y={74 + i * 34} width={c.w * 2.2} height="16" className={c.hot ? "fill-signal" : "fill-bone/55"} />
          <line x1="150" y1={98 + i * 34} x2="604" y2={98 + i * 34} className="stroke-line" />
        </g>
      ))}

      <text x="36" y="282" className="fill-dim font-mono text-[9.5px] tracking-widest">TRANSACTIONS OVER TIME</text>
      <line x1="36" y1="380" x2="604" y2="380" className="stroke-line-strong" />
      {days.map((i) => (
        <rect
          key={i}
          x={40 + i * 15.6}
          y={380 - height(i) * 2.4}
          width="8"
          height={height(i) * 2.4}
          className={recurring(i) ? "fill-signal" : "fill-line-strong"}
        />
      ))}
      {days.filter(recurring).map((i) => (
        <g key={`r${i}`}>
          <line x1={44 + i * 15.6} y1="300" x2={44 + i * 15.6} y2="314" className="stroke-signal" />
          <text x={44 + i * 15.6} y="296" textAnchor="middle" className="fill-signal font-mono text-[8px] tracking-widest">
            RECURS
          </text>
        </g>
      ))}
      <text x="36" y="404" className="fill-dim font-mono text-[9px] tracking-widest">SAME MERCHANT · SAME AMOUNT · REGULAR INTERVAL → FLAG</text>
    </svg>
  );
}
