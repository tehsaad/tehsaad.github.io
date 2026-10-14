/** The request path that makes ShopFlow trustworthy: browser → proxy → API → ledger, with Stripe confirming payment. */
export function ShopflowPlate() {
  const node = (x: number, y: number, w: number, title: string, sub: string, hot = false) => (
    <g>
      <rect x={x} y={y} width={w} height="58" className={hot ? "fill-signal/10 stroke-signal" : "fill-ink-1 stroke-line-strong"} />
      <text x={x + 12} y={y + 24} className={`${hot ? "fill-signal" : "fill-bone"} font-sans text-[12.5px]`}>
        {title}
      </text>
      <text x={x + 12} y={y + 42} className="fill-dim font-mono text-[8.5px] tracking-widest">
        {sub}
      </text>
    </g>
  );

  return (
    <svg viewBox="0 0 640 440" className="h-full w-full" role="img" aria-label="Illustration: ShopFlow architecture, from the browser through a Next.js proxy to the Django API and Postgres, with Stripe webhooks confirming payments">
      <defs>
        <marker id="sf-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" className="fill-dim" />
        </marker>
      </defs>
      <text x="36" y="40" className="fill-dim font-mono text-[9.5px] tracking-widest">REQUEST PATH · V4</text>
      <text x="604" y="40" textAnchor="end" className="fill-dim font-mono text-[9.5px] tracking-widest">VERCEL</text>
      <rect x="168" y="56" width="436" height="236" fill="none" className="stroke-line" strokeDasharray="2 4" />

      {node(36, 120, 112, "Buyer / owner", "BROWSER · NO TOKENS")}
      {node(190, 80, 168, "Next.js 16", "PROXY · HTTPONLY JWT")}
      {node(412, 80, 168, "Django 5.2 API", "TENANT-SCOPED", true)}
      {node(412, 210, 168, "Postgres", "STOCK LEDGER · ORDERS")}
      {node(190, 210, 168, "ReplyFlow", "AI DRAFT · HUMAN SENDS")}
      {node(412, 344, 168, "Stripe", "SIGNED WEBHOOKS")}

      <g className="stroke-dim" strokeWidth="1" fill="none" markerEnd="url(#sf-arrow)">
        <path className="sf-flow" d="M148 149 H172 V109 H186" />
        <path className="sf-flow" d="M358 109 H408" />
        <path d="M496 138 V206" />
        <path d="M412 239 H362" />
        <path className="sf-flow" d="M496 344 V292" />
      </g>
      <text x="486" y="324" textAnchor="end" className="fill-signal font-mono text-[8.5px] tracking-widest">PAID ONLY WHEN STRIPE SAYS SO</text>
      <text x="366" y="100" className="fill-dim font-mono text-[8px] tracking-wider">/api/v1</text>
      <text x="36" y="392" className="fill-dim font-mono text-[9px] tracking-widest">CART = IDS + QTY</text>
      <text x="36" y="408" className="fill-dim font-mono text-[9px] tracking-widest">SERVER RE-PRICES EVERY QUOTE</text>
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .sf-flow { stroke-dasharray: 4 5; animation: sf-dash 1.6s linear infinite; stroke: var(--color-signal); }
          @keyframes sf-dash { to { stroke-dashoffset: -18; } }
        }
      `}</style>
    </svg>
  );
}
