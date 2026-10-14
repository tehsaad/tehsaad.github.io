/**
 * A ruler down the left edge that reads scroll depth. Pure CSS: a scroll-driven
 * animation moves the needle, so there's no scroll listener at all.
 * Hidden on small screens and in browsers without scroll timelines.
 */
export function DepthGauge() {
  return (
    <div
      aria-hidden
      className="depth-gauge pointer-events-none fixed top-[calc(var(--bar-h)+2rem)] bottom-8 left-3 z-40 w-4"
    >
      <div className="absolute inset-y-0 left-0 w-2 [background:repeating-linear-gradient(to_bottom,var(--color-line-strong)_0_1px,transparent_1px_12px)]" />
      <div className="absolute inset-y-0 left-0 w-3.5 [background:repeating-linear-gradient(to_bottom,var(--color-dim)_0_1px,transparent_1px_60px)]" />
      <div className="depth-needle absolute left-0 h-px w-4 bg-signal" />
      <style>{`
        .depth-gauge { display: none; }
        @supports (animation-timeline: scroll()) {
          @media (min-width: 80rem) { .depth-gauge { display: block; } }
          .depth-needle {
            top: 0;
            animation: needle linear both;
            animation-timeline: scroll(root);
          }
          @keyframes needle { to { top: 100%; } }
        }
      `}</style>
    </div>
  );
}
