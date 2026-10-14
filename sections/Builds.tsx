import { BuildsHost } from "@/components/BuildsHost";
import { BuildLinks } from "@/components/BuildLinks";
import { CaseStudy } from "@/components/CaseStudy";
import { Plate } from "@/components/plates";
import { SectionHead } from "@/components/SectionHead";
import { StatusMark } from "@/components/StatusMark";
import { builds, type Build } from "@/data/builds";

function BuildRow({ build, flip }: { build: Build; flip: boolean }) {
  return (
    <article
      aria-labelledby={`b-${build.slug}`}
      className="grid items-center gap-10 border-t border-line py-16 md:grid-cols-12 md:gap-6 md:py-24"
    >
      <div className={`md:col-span-5 ${flip ? "md:order-2 md:col-start-8" : ""}`} data-reveal>
        <p className="label flex items-center gap-3 text-dim">
          <span className="text-signal">build.{build.index}</span>
          <span aria-hidden className="h-px w-8 bg-line-strong" />
          {build.file}
        </p>
        <h3 id={`b-${build.slug}`} className="display mt-5 text-[clamp(2.6rem,5.4vw,5.2rem)] text-bone">
          {build.name}
        </h3>
        <p className="label mt-4 text-bone-2">{build.kind}</p>
        <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-bone-2">{build.summary}</p>

        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Stack">
          {build.stack.map((t) => (
            <li key={t} className="label border border-line px-2 py-1 text-dim">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-5">
          <StatusMark tone={build.status.tone} label={build.status.label} />
          <a
            href={`/builds/${build.slug}`}
            data-open-build={build.slug}
            className="group inline-flex w-fit items-baseline gap-4 border-b border-bone pb-1.5 font-serif text-2xl text-bone transition-colors hover:border-signal hover:text-signal"
          >
            Explore the build sheet
            <span aria-hidden className="font-mono text-base transition-transform duration-500 group-hover:translate-x-1.5">
              →
            </span>
          </a>
          <BuildLinks build={build} />
        </div>
      </div>

      <div className={`md:col-span-7 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-6"}`}>
        <a
          href={`/builds/${build.slug}`}
          data-open-build={build.slug}
          tabIndex={-1}
          aria-hidden
          className="group drift block [--drift:28px]"
        >
          <Plate
            kind={build.plate}
            caption={build.caption}
            frameProps={{
              "data-plate": build.slug,
              className:
                "transition-[transform,border-color] duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5 group-hover:border-line-strong group-hover:[--reg-c:var(--color-signal)]",
            }}
          />
          <span className="label pointer-events-none mt-[-1.6rem] mr-3 block translate-y-1 text-right text-signal opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            open build sheet →
          </span>
        </a>
      </div>
    </article>
  );
}

export function Builds() {
  const sheets = Object.fromEntries(builds.map((b) => [b.slug, <CaseStudy key={b.slug} build={b} plateName="build-plate" />]));
  const titles = Object.fromEntries(builds.map((b) => [b.slug, b.name]));

  return (
    <section id="builds" aria-labelledby="builds-title" className="px-gutter py-section mx-auto max-w-[1600px]">
      <SectionHead
        id="builds-title"
        path="~/builds"
        meta={`${builds.length} case files · ls -la`}
        title={
          <>
            Four builds,
            <br />
            <em className="text-bone-2">taken apart.</em>
          </>
        }
      >
        Each one has a full build sheet covering what problem it solves, how it works, what it&apos;s made of, what I did,
        and where it honestly stands today.
      </SectionHead>

      <BuildsHost order={builds.map((b) => b.slug)} titles={titles} sheets={sheets}>
        <div className="mt-16 md:mt-24">
          {builds.map((b, i) => (
            <BuildRow key={b.slug} build={b} flip={i % 2 === 1} />
          ))}
        </div>
      </BuildsHost>
    </section>
  );
}
