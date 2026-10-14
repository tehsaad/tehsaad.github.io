import { HeroCanvas } from "@/components/HeroCanvas";
import { site } from "@/data/site";

const strip = [
  {
    k: "who",
    v: "A computer science student in Islamabad who would rather open the source than read the summary.",
  },
  {
    k: "builds",
    v: "Hand-tracking interfaces, C++/Qt desktop software, and a live multi-tenant commerce platform.",
  },
  {
    k: "difference",
    v: "Every concept I study ends up as something that compiles, ships, or at least breaks in an interesting way.",
  },
];

export function Hero() {
  return (
    <section
      id="bench"
      aria-labelledby="hero-title"
      className="bg-grid relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-[var(--bar-h)] [touch-action:pan-y]"
    >
      <HeroCanvas />

      <div className="px-gutter pointer-events-none relative mx-auto flex w-full max-w-[1600px] flex-1 flex-col">
        <div className="label fade-in flex items-start justify-between gap-6 pt-8 text-dim md:pt-12" style={{ "--d": "100ms" } as React.CSSProperties}>
          <p>
            <span className="text-bone">{site.name}</span>
            <span className="hidden sm:inline"> · </span>
            <br className="sm:hidden" />
            <span>{site.role}</span>
          </p>
          <p className="hidden text-right md:block">
            fig. 0: move your cursor.
            <br />
            this is Air Draw, with a pointer for a hand.
          </p>
        </div>

        <h1
          id="hero-title"
          className="display mt-auto pt-16 text-[clamp(3.25rem,min(15.5vw,19svh),13.5rem)] text-bone md:pt-24"
        >
          <span className="sr-only">TehSaad: </span>
          <span className="rise">
            <span style={{ "--d": "150ms" } as React.CSSProperties}>I learn things</span>
          </span>
          <span className="rise pl-[0.9em] md:pl-[1.6em]">
            <span style={{ "--d": "260ms" } as React.CSSProperties}>by making</span>
          </span>
          <span className="rise">
            <span style={{ "--d": "370ms" } as React.CSSProperties}>
              them <em className="text-signal">run.</em>
              <span aria-hidden className="caret" />
            </span>
          </span>
        </h1>

        <div className="fade-in mt-12 grid gap-px border-t border-line pb-8 sm:grid-cols-3 md:mt-16" style={{ "--d": "700ms" } as React.CSSProperties}>
          {strip.map((s, i) => (
            <div key={s.k} className={`pt-4 sm:pr-8 ${i > 0 ? "border-line sm:border-l sm:pl-6" : ""}`}>
              <p className="label mb-2 text-signal">{`// ${s.k}`}</p>
              <p className="max-w-[38ch] text-[0.95rem] leading-relaxed text-bone-2">{s.v}</p>
            </div>
          ))}
        </div>

        <div className="label flex items-center justify-between border-t border-line py-4 text-dim">
          <span className="flex items-center gap-2">
            <span aria-hidden className="pulse-dot inline-block size-1.5 rounded-full bg-signal" />
            bench is live · 4 case files below
          </span>
          <a href="#operator" className="pointer-events-auto text-bone-2 transition-colors hover:text-signal">
            scroll ↓
          </a>
        </div>
      </div>
    </section>
  );
}
