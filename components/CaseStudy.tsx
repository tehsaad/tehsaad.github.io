import type { Build } from "@/data/builds";
import { builds } from "@/data/builds";
import { BuildLinks } from "./BuildLinks";
import { Plate } from "./plates";
import { StatusMark } from "./StatusMark";

function Block({ n, label, title, children }: { n: string; label: string; title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-6 border-t border-line py-12 md:grid-cols-12 md:gap-6 md:py-16">
      <div className="md:col-span-4 lg:col-span-3">
        <p className="label text-signal">
          {n} · {label}
        </p>
        <h3 className="mt-3 font-serif text-[2rem] leading-none text-bone md:text-[2.4rem]">{title}</h3>
      </div>
      <div className="md:col-span-8 lg:col-span-9">{children}</div>
    </section>
  );
}

/**
 * The build sheet: a lab report for one project. Used inside the home-page dialog
 * and as the standalone /builds/[slug] page, so the content has exactly one source.
 */
export function CaseStudy({ build, headingLevel = "h2", plateName }: { build: Build; headingLevel?: "h1" | "h2"; plateName?: string }) {
  const H = headingLevel;
  const total = String(builds.length).padStart(3, "0");

  return (
    <article className="px-gutter mx-auto max-w-[1400px] pb-24">
      <header className="pt-10 md:pt-16">
        <p className="label text-dim">
          <span className="text-signal">~/builds/{build.file}</span> · build sheet {build.index} / {total}
        </p>
        <H className="display mt-6 text-[clamp(3rem,9vw,8.5rem)] text-bone">{build.name}</H>
        <p className="mt-6 max-w-[38ch] font-serif text-[clamp(1.4rem,2.6vw,2.1rem)] leading-[1.15] text-bone-2 italic">
          {build.oneLiner}
        </p>

        <dl className="mt-10 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
          {[
            { k: "Discipline", v: build.kind },
            { k: "Status", v: <StatusMark tone={build.status.tone} label={build.status.label} /> },
            { k: "Core stack", v: build.stack.slice(0, 3).join(" · ") },
            { k: "Index", v: `${build.index} / ${total}` },
          ].map((m) => (
            <div key={m.k} className="bg-ink p-4">
              <dt className="label text-dim">{m.k}</dt>
              <dd className="mt-2 text-[0.95rem] text-bone">{m.v}</dd>
            </div>
          ))}
        </dl>
        <BuildLinks build={build} className="mt-6" />
      </header>

      <div className="mt-12" style={plateName ? ({ viewTransitionName: plateName } as React.CSSProperties) : undefined}>
        <Plate kind={build.plate} caption={build.caption} />
      </div>

      <div className="mt-16">
        <Block n="01" label="problem" title="Why it exists">
          <div className="max-w-[64ch] space-y-5 text-lg leading-relaxed text-bone-2">
            {build.problem.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </Block>

        <Block n="02" label="mechanism" title="How it works">
          <p className="max-w-[64ch] text-lg leading-relaxed text-bone-2">{build.mechanism.intro}</p>
          <ol className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 xl:grid-cols-[repeat(auto-fit,minmax(13rem,1fr))]">
            {build.mechanism.steps.map((s, i) => (
              <li key={s.title} className="relative bg-ink p-5 md:p-6">
                <p className="label flex items-center gap-2 text-dim">
                  <span className="text-signal">{String(i + 1).padStart(2, "0")}</span>
                  <span aria-hidden className="h-px flex-1 bg-line" />
                </p>
                <p className="mt-4 font-serif text-2xl leading-tight text-bone">{s.title}</p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-bone-2">{s.body}</p>
              </li>
            ))}
          </ol>
        </Block>

        <Block n="03" label="materials" title="What it's made of">
          <ul className="divide-y divide-line border-y border-line">
            {build.materials.map((m) => (
              <li key={m.name} className="grid gap-1 py-4 sm:grid-cols-[14rem_1fr] sm:gap-6">
                <span className="font-mono text-sm text-bone">{m.name}</span>
                <span className="text-bone-2">{m.use}</span>
              </li>
            ))}
          </ul>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Full stack">
            {build.stack.map((t) => (
              <li key={t} className="label border border-line px-2.5 py-1.5 text-bone-2">
                {t}
              </li>
            ))}
          </ul>
        </Block>

        <Block n="04" label="hands on" title="My role">
          <ul className="max-w-[64ch] space-y-4">
            {build.role.map((r) => (
              <li key={r} className="flex gap-4 text-lg leading-relaxed text-bone-2">
                <span aria-hidden className="mt-3 h-px w-5 shrink-0 bg-signal" />
                {r}
              </li>
            ))}
          </ul>
        </Block>

        <Block n="05" label="readout" title="Where it stands">
          <div className="max-w-[64ch] space-y-5 text-lg leading-relaxed text-bone-2">
            {build.readout.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <dl className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-3">
            {build.readout.facts.map((f) => (
              <div key={f.k} className="bg-ink p-4">
                <dt className="label text-dim">{f.k}</dt>
                <dd className="mt-2 font-serif text-2xl leading-tight text-bone">{f.v}</dd>
              </div>
            ))}
          </dl>
          <BuildLinks build={build} className="mt-8" />
        </Block>
      </div>
    </article>
  );
}
