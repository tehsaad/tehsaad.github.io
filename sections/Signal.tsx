import { site } from "@/data/site";

type Row = { k: string; v: string; href: string | null; hint: string };

export function Signal() {
  const rows: Row[] = [
    { k: "github", v: "github.com/tehsaad", href: site.links.github, hint: "the source of truth" },
    {
      k: "linkedin",
      v: "LinkedIn",
      href: site.links.linkedin,
      hint: "add your profile URL in data/site.ts",
    },
    {
      k: "email",
      v: site.links.email ?? "Email",
      href: site.links.email ? `mailto:${site.links.email}` : null,
      hint: "add your address in data/site.ts",
    },
  ];
  const isDev = process.env.NODE_ENV !== "production";
  const visible = rows.filter((r) => r.href || isDev);

  return (
    <section id="signal" aria-labelledby="signal-title" className="px-gutter mx-auto max-w-[1600px] pt-[var(--section-y)] pb-16">
      <div className="border-t border-line pt-5">
        <p className="label" data-reveal>
          <span className="text-signal">~/signal</span>
          <br />
          <span className="text-dim">open channel</span>
        </p>
      </div>

      <h2 id="signal-title" className="display mt-12 text-[clamp(3.6rem,13vw,14rem)] text-bone" data-reveal>
        Bring me the
        <br />
        <em className="text-signal">strange</em> idea.
      </h2>

      <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-6">
        <p className="max-w-[40ch] text-lg leading-relaxed text-bone-2 md:col-span-4" data-reveal>
          Internships, hackathon teams, collaborations, or a good argument about C++. If it involves building something
          that doesn&apos;t exist yet, I&apos;m interested.
        </p>

        <ul className="md:col-span-8" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
          {visible.map((r) => (
            <li key={r.k} className="border-t border-line last:border-b">
              {r.href ? (
                <a
                  href={r.href}
                  target={r.href.startsWith("http") ? "_blank" : undefined}
                  rel={r.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group grid grid-cols-[5.5rem_1fr_auto] items-baseline gap-4 py-5 sm:grid-cols-[8rem_1fr_auto] md:py-7"
                >
                  <span className="label text-dim transition-colors group-hover:text-signal">{r.k}</span>
                  <span className="relative w-fit font-serif text-[clamp(1.7rem,4.2vw,3.6rem)] leading-none text-bone">
                    {r.v}
                    <span
                      aria-hidden
                      className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                    />
                  </span>
                  <span aria-hidden className="font-mono text-bone-2 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-signal">
                    ↗
                  </span>
                  {r.href.startsWith("http") && <span className="sr-only">(opens in a new tab)</span>}
                </a>
              ) : (
                <div className="grid grid-cols-[5.5rem_1fr] items-baseline gap-4 py-5 opacity-60 sm:grid-cols-[8rem_1fr] md:py-7">
                  <span className="label text-dim">{r.k}</span>
                  <span>
                    <span className="font-serif text-[clamp(1.7rem,4.2vw,3.6rem)] leading-none text-dim line-through decoration-1">
                      {r.v}
                    </span>
                    <span className="label ml-3 text-signal">dev only · {r.hint}</span>
                  </span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
