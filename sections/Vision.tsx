import { HandLab } from "@/components/HandLab";
import { SectionHead } from "@/components/SectionHead";

/** The AI track, as a signal chain: each build pushed into a different kind of input. */
const chain = [
  {
    input: "pixels",
    build: "Air Draw Controller",
    technique: "Hand landmarks → rule-based gestures, in real time",
    lesson: "Latency is a feature. A correct answer 300 ms late feels broken.",
  },
  {
    input: "speech",
    build: "J.A.R.V.I.S. & F.R.I.D.A.Y.",
    technique: "Parallel speech recognition → language detection → intents",
    lesson: "Real users code-switch. English, Hindi and Hinglish in one sentence is normal.",
  },
  {
    input: "documents",
    build: "AI Resume Analyzer",
    technique: "LLM + strict JSON schema, with an offline heuristic fallback",
    lesson: "An LLM is just a component. Validate its output like any other untrusted input.",
  },
  {
    input: "conversations",
    build: "ShopFlow · ReplyFlow",
    technique: "Drafts grounded in real prices, stock and order history",
    lesson: "Keep a human in the loop where trust and money are involved.",
  },
];

export function Vision() {
  return (
    <section id="vision" aria-labelledby="vision-title" className="px-gutter py-section mx-auto max-w-[1600px]">
      <SectionHead
        id="vision-title"
        path="~/vision"
        meta="lab · interactive"
        title={
          <>
            Teaching a machine
            <br />
            <em className="text-bone-2">to read a hand.</em>
          </>
        }
      >
        This is the reasoning behind Air Draw, made something you can poke at. A vision model returns 21 points per
        hand. Everything after that is geometry and judgement. Raise and lower fingers below to watch the pipeline
        decide what you meant.
      </SectionHead>

      <div className="mt-16 md:mt-24" data-reveal>
        <HandLab />
        <p className="label mt-4 text-dim">
          Landmark indices follow MediaPipe Hands. The gesture table is illustrative: the same family of rules, simplified
          for the page.
        </p>
      </div>

      <div className="mt-24 md:mt-32">
        <div className="grid gap-6 md:grid-cols-12" data-reveal>
          <p className="label text-signal md:col-span-3">signal chain</p>
          <h3 className="font-serif text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] text-bone md:col-span-9">
            Every AI build so far has meant learning to understand a new kind of input.
          </h3>
        </div>
        <ol className="mt-12 border-t border-line">
          {chain.map((c, i) => (
            <li
              key={c.input}
              data-reveal
              style={{ "--d": `${i * 70}ms` } as React.CSSProperties}
              className="group grid gap-3 border-b border-line py-7 md:grid-cols-12 md:gap-6"
            >
              <p className="label flex items-center gap-3 text-dim md:col-span-3">
                <span className="text-signal">in:</span>
                <span className="font-serif text-3xl tracking-normal text-bone normal-case italic transition-colors group-hover:text-signal">
                  {c.input}
                </span>
              </p>
              <div className="md:col-span-4">
                <p className="text-bone">{c.build}</p>
                <p className="mt-1 text-[0.95rem] text-dim">{c.technique}</p>
              </div>
              <p className="text-[0.95rem] leading-relaxed text-bone-2 md:col-span-5">
                <span className="label mr-2 text-dim">learned</span>
                {c.lesson}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
