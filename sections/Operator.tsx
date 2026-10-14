import { SectionHead } from "@/components/SectionHead";

const notes = [
  {
    key: "builds",
    text: (
      <>
        Software you can actually run: a hand-tracking drawing tool, a Qt desktop system with real roles and rules, a
        commerce platform that takes <em className="text-signal">real payments</em>.
      </>
    ),
  },
  {
    key: "explores",
    text: (
      <>
        Computer vision and applied AI. Getting a machine to understand a <em>hand</em>, a <em>voice</em>, a{" "}
        <em>document</em>, and then do something useful with what it understood.
      </>
    ),
  },
  {
    key: "learning",
    text: (
      <>
        C++ properly, meaning ownership, the standard library and what the compiler actually does. Plus the unglamorous
        half of the web: auth, payments, data that must never be wrong.
      </>
    ),
  },
  {
    key: "drawn to",
    text: (
      <>
        Problems where the interface is the hard part. Input that isn&apos;t a keyboard. Systems where a bug costs
        someone real money.
      </>
    ),
  },
  {
    key: "becoming",
    text: (
      <>
        An engineer who can take an idea from a notebook sketch to a deployed system, and{" "}
        <em className="text-signal">explain every layer</em> on the way down.
      </>
    ),
  },
];

const habits = [
  "Read the source before the tutorial",
  "Design the empty and error states first",
  "Never fake a number on a screen",
  "Ship it, then measure it",
];

export function Operator() {
  return (
    <section id="operator" aria-labelledby="operator-title" className="px-gutter py-section mx-auto max-w-[1600px]">
      <SectionHead
        id="operator-title"
        path="~/operator"
        meta="readme.md · who's building"
        title={
          <>
            Curious first.
            <br />
            <em className="text-bone-2">Then I open an editor.</em>
          </>
        }
      />

      <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-6">
        <aside className="md:col-span-3" data-reveal>
          <div className="md:sticky md:top-[calc(var(--bar-h)+2rem)]">
            <p className="label mb-4 text-dim">working rules</p>
            <ul className="space-y-3 border-l border-line pl-4">
              {habits.map((h) => (
                <li key={h} className="text-[0.95rem] leading-snug text-bone-2">
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <dl className="md:col-span-9">
          {notes.map((n, i) => (
            <div
              key={n.key}
              data-reveal
              style={{ "--d": `${i * 60}ms` } as React.CSSProperties}
              className="group grid gap-3 border-t border-line py-8 first:border-t-0 first:pt-0 sm:grid-cols-[9rem_1fr] sm:gap-8 md:py-10"
            >
              <dt className="label pt-2 text-dim transition-colors group-hover:text-signal">{n.key}</dt>
              <dd className="font-serif text-[clamp(1.6rem,2.9vw,2.6rem)] leading-[1.12] text-bone">{n.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
