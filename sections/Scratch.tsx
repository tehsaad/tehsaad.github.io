import { ScratchBoard } from "@/components/ScratchBoard";
import { SectionHead } from "@/components/SectionHead";
import { hackathons } from "@/data/experiments";

function HackathonLog() {
  return (
    <div className="mt-24 md:mt-32">
      <div className="grid gap-6 md:grid-cols-12" data-reveal>
        <p className="label md:col-span-3">
          <span className="text-signal">~/scratch/hackathons</span>
          <br />
          <span className="text-dim">AI builds against a clock</span>
        </p>
        <div className="md:col-span-9">
          <h3 className="font-serif text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] text-bone">
            Hackathon log
          </h3>
          <p className="mt-4 max-w-[56ch] text-bone-2">
            I enter AI-focused hackathons to build fast and learn faster. Entries land here once there&apos;s a build worth
            showing, with no placeholder trophies.
          </p>
        </div>
      </div>

      {hackathons.length > 0 ? (
        <ol className="mt-12 border-t border-line">
          {hackathons.map((h) => (
            <li key={`${h.event}-${h.date}`} className="grid gap-3 border-b border-line py-6 md:grid-cols-12 md:gap-6">
              <p className="label text-dim md:col-span-3">
                {h.date}
                <br />
                <span className="text-bone-2">{h.event}</span>
              </p>
              <div className="md:col-span-6">
                <p className="font-serif text-2xl text-bone">{h.build}</p>
                <p className="mt-2 text-bone-2">{h.summary}</p>
                <p className="label mt-3 text-dim">{h.stack.join(" · ")}</p>
              </div>
              <div className="md:col-span-3 md:text-right">
                {h.outcome && <p className="label text-signal">{h.outcome}</p>}
                {h.href && (
                  <a href={h.href} target="_blank" rel="noopener noreferrer" className="label mt-2 inline-block text-bone hover:text-signal">
                    view ↗
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <div className="mt-12 border border-dashed border-line-strong p-6 md:p-10" data-reveal>
          <div className="grid gap-8 md:grid-cols-12 md:gap-6">
            <div className="md:col-span-5">
              <p className="label flex items-center gap-2 text-signal">
                <span aria-hidden className="pulse-dot inline-block size-1.5 rounded-full bg-signal" />
                awaiting first entry
              </p>
              <p className="mt-4 font-serif text-3xl leading-tight text-bone">
                The next one is being built. This slot fills when it ships.
              </p>
            </div>
            <div className="md:col-span-7" aria-hidden>
              <p className="label mb-3 text-dim">entry schema</p>
              <dl className="divide-y divide-dashed divide-line-strong border-y border-dashed border-line-strong font-mono text-[0.8rem]">
                {["event", "date", "build", "stack", "outcome"].map((f) => (
                  <div key={f} className="flex items-center gap-4 py-2.5">
                    <dt className="w-20 text-dim">{f}</dt>
                    <dd className="h-2 flex-1 bg-[repeating-linear-gradient(90deg,var(--color-line-strong)_0_6px,transparent_6px_10px)]" />
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function Scratch() {
  return (
    <section id="scratch" aria-labelledby="scratch-title" className="px-gutter py-section mx-auto max-w-[1600px]">
      <SectionHead
        id="scratch-title"
        path="~/scratch"
        meta="experiments · prototypes · side quests"
        title={
          <>
            Built to find out
            <br />
            <em className="text-bone-2">how it works.</em>
          </>
        }
      >
        Smaller builds, each one started by a single question. Some became tools, all of them taught me something.
      </SectionHead>

      <div className="mt-16 md:mt-20" data-reveal>
        <ScratchBoard />
      </div>

      <HackathonLog />
    </section>
  );
}
