/* eslint-disable @next/next/no-img-element -- static export: images are pre-sized WebP files */
import { Motion } from "@/components/Motion";
import { imageSrc, journey, linkHref, plain, principles, profile, projects, site, skills, STATUS_LABELS, type Project } from "@/data/site";

const featured = projects.filter((p) => p.featured);
const smaller = projects.filter((p) => !p.featured);
const withShots = projects.filter((p) => p.media.length);
const heroShots = ["codebasegpt", "daybreak", "orbit", "findost", "hamqadam", "shopflow"]
  .map((slug) => withShots.find((p) => p.slug === slug))
  .filter((p): p is Project => Boolean(p));

const MANIFESTO = "Computer Science undergraduate at NUST SEECS, Islamabad, building AI, systems, and full-stack software projects.";
const TECHNOLOGIES = [...new Set(projects.flatMap((p) => p.stack))];
const TICKER = TECHNOLOGIES.slice(0, 22);
const CARD_THEMES = ["vermilion", "cobalt", "citron", "jade", "bone", "violet", "rose", "night"];

function Letters({ text }: { text: string }) {
  return (
    <span className="letters" aria-hidden="true">
      {[...text].map((c, i) => (
        <span className="letter" data-letter key={i}>
          {c}
        </span>
      ))}
    </span>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="links">
      {project.links.map((l) => (
        <a key={l.url} className="link-pill" data-magnetic href={linkHref(l.url)} target="_blank" rel="noopener">
          {l.label}
          <span aria-hidden="true"> ↗</span>
          <span className="sr-only"> for {project.name} (opens in a new tab)</span>
        </a>
      ))}
    </div>
  );
}

function Shot({ project }: { project: Project }) {
  const m = project.media[0];
  return <img src={imageSrc(m.url)} alt={m.alt} width={m.width} height={m.height} loading="lazy" decoding="async" />;
}

export default function Home() {
  const deployed = projects.filter((p) => p.status === "deployed").length;
  const years = journey.filter((j) => j.kind !== "planned");
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Motion />
      <div className="progress" data-progress aria-hidden="true" />
      <div className="cursor" data-cursor aria-hidden="true" />
      <header className="nav">
        <a href="#top" className="nav-mark" aria-label="Saad Rizwan, back to top">
          TS<span>●</span>
        </a>
        <nav aria-label="Sections">
          <a href="#work">Work</a>
          <a href="#more">More</a>
          <a href="#journey">Journey</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="top" data-hero aria-labelledby="hero-title">
          <div className="hero-glow" data-glow aria-hidden="true" />
          <div className="hero-shots" aria-hidden="true">
            {heroShots.map((p, i) => (
              <figure className="hero-shot" data-hero-shot={i} key={p.slug}>
                <img src={imageSrc(p.media[0].url)} alt="" width={1200} height={750} decoding="async" />
              </figure>
            ))}
          </div>
          <div className="hero-copy">
            <p className="kicker" data-intro>
              {profile.headline} · {profile.location}
            </p>
            <h1 id="hero-title" className="hero-title" aria-label={profile.name}>
              <span className="hero-line" data-hero-line="left">
                <Letters text="SAAD" />
              </span>
              <span className="hero-line hero-line-2" data-hero-line="right">
                <Letters text="RIZWAN" />
              </span>
            </h1>
            <div className="hero-foot" data-intro>
              <p>{profile.availability}</p>
              <a href="#work" className="scroll-cue">
                Scroll<span aria-hidden="true"> ↓</span>
              </a>
            </div>
          </div>
        </section>

        <section className="ticker" aria-label="Technologies used">
          <div className="ticker-track" data-ticker>
            {[0, 1].map((n) => (
              <p key={n} aria-hidden={n === 1 ? "true" : undefined}>
                {TICKER.map((t) => (
                  <span key={t}>
                    {t}
                    <i aria-hidden="true">✦</i>
                  </span>
                ))}
              </p>
            ))}
          </div>
        </section>

        <section className="manifesto" data-manifesto aria-labelledby="about-title">
          <div className="manifesto-inner">
            <h2 id="about-title" className="kicker">
              About
            </h2>
            <p className="manifesto-text">
              {MANIFESTO.split(" ").map((w, i) => (
                <span key={i}>
                  <span data-word>{w}</span>{" "}
                </span>
              ))}
            </p>
            <dl className="stats">
              <div>
                <dt>Projects here</dt>
                <dd data-count={projects.length}>{projects.length}</dd>
              </div>
              <div>
                <dt>Deployed</dt>
                <dd data-count={deployed}>{deployed}</dd>
              </div>
              <div>
                <dt>Technologies</dt>
                <dd data-count={TECHNOLOGIES.length}>{TECHNOLOGIES.length}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section id="work" className="work" aria-labelledby="work-title">
          <header className="section-head">
            <p className="kicker">Selected work</p>
            <h2 id="work-title" data-rise>
              Built, shipped, <em>open to inspect.</em>
            </h2>
          </header>
          <div className="stack">
            {featured.map((p, i) => (
              <article className={`stack-card theme-${CARD_THEMES[i % CARD_THEMES.length]}`} data-stack-card style={{ "--i": i } as React.CSSProperties} key={p.slug} aria-labelledby={`${p.slug}-title`}>
                <div className="stack-copy">
                  <p className="stack-meta">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <span>{p.category}</span>
                    <span className="status">{STATUS_LABELS[p.status]}</span>
                  </p>
                  <h3 id={`${p.slug}-title`}>{p.name}</h3>
                  <p className="stack-tagline">{plain(p.tagline)}</p>
                  <ul className="pills" aria-label="Technologies">
                    {p.stack.slice(0, 6).map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  <ProjectLinks project={p} />
                </div>
                <div className="stack-visual" data-stack-visual>
                  {p.media[0] ? <Shot project={p} /> : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="more" className="slides" data-slides aria-labelledby="more-title">
          <div className="slides-pin">
            <header className="slides-head">
              <p className="kicker">Also built</p>
              <h2 id="more-title">
                Smaller builds. <em>Same care.</em>
              </h2>
            </header>
            <div className="slides-track" data-slides-track>
              {smaller.map((p) => (
                <article className="slide" data-slide key={p.slug} aria-labelledby={`${p.slug}-title`}>
                  <div className="slide-visual">
                    {p.media[0] ? <Shot project={p} /> : <span className="slide-name" aria-hidden="true">{p.name}</span>}
                  </div>
                  <p className="stack-meta">
                    <span>{p.category}</span>
                    <span className="status">{STATUS_LABELS[p.status]}</span>
                  </p>
                  <h3 id={`${p.slug}-title`}>{p.name}</h3>
                  <p>{plain(p.tagline)}</p>
                  <ProjectLinks project={p} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="deck" data-deck aria-labelledby="principles-title">
          <div className="deck-pin">
            <header>
              <p className="kicker">How I build</p>
              <h2 id="principles-title">Four rules I keep.</h2>
            </header>
            <div className="deck-cards">
              {principles.map((p, i) => (
                <article className="deck-card" data-deck-card key={p.id}>
                  <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{p.title}</h3>
                  <p>{plain(p.body)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="skills" aria-labelledby="skills-title">
          <h2 id="skills-title" className="kicker">
            Toolbox
          </h2>
          {skills.map((s, i) => (
            <div className="skill-row" data-skill-row={i % 2 ? "right" : "left"} key={s.id}>
              <h3>{s.domain}</h3>
              <p>{s.items.join("  /  ")}</p>
            </div>
          ))}
        </section>

        <section id="journey" className="journey" data-journey aria-labelledby="journey-title">
          <header className="section-head">
            <p className="kicker">Journey</p>
            <h2 id="journey-title" data-rise>
              {years[0].heading}
            </h2>
          </header>
          <div className="timeline">
            <div className="timeline-line" aria-hidden="true">
              <span data-timeline-fill />
            </div>
            <ol>
              {years
                .flatMap((y) => y.entries)
                .map((e) => (
                  <li key={e.title} data-timeline-item>
                    <time>{e.dateLabel}</time>
                    <div>
                      <h3>{e.title}</h3>
                      <p>{plain(e.body)}</p>
                    </div>
                  </li>
                ))}
            </ol>
          </div>
        </section>

        <section id="contact" className="contact" aria-labelledby="contact-title">
          <p className="kicker">{profile.availability}</p>
          <h2 id="contact-title" className="contact-title" data-contact-title>
            Say hello.
          </h2>
          <div className="contact-actions">
            <a className="contact-primary" data-magnetic href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <a className="link-pill" data-magnetic href={site.linkedin} target="_blank" rel="noopener">
              LinkedIn<span aria-hidden="true"> ↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a className="link-pill" data-magnetic href={site.github} target="_blank" rel="noopener">
              GitHub<span aria-hidden="true"> ↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a className="link-pill" data-magnetic href={site.caseStudies}>
              Full case studies<span aria-hidden="true"> ↗</span>
            </a>
          </div>
        </section>
      </main>
      <footer className="footer">
        <span>
          {profile.name} ({profile.handle})
        </span>
        <span>{profile.location}</span>
      </footer>
    </>
  );
}
