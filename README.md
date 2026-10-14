# The Bench: TehSaad's portfolio

A working lab bench of real builds, navigated like a filesystem. Next.js 16 · TypeScript · Tailwind CSS 4.
There are no UI or animation libraries. Interactions are hand-written canvas, SVG and CSS.

## Concept

- **Sections are paths:** `~/bench`, `~/operator`, `~/builds`, `~/vision`, `~/materials`, `~/scratch`, `~/signal`.
  The top bar shows the current path, and `⌘K` / `/` opens an index (command palette) to jump anywhere.
- **Projects are build sheets:** each is laid out as a lab report (problem → mechanism → materials → my role →
  readout). On the home page a sheet opens in a native `<dialog>` with a View Transition morph. Every sheet also
  exists as a static page at `/builds/[slug]`.
- **Instrument language:** registration marks, a scroll-depth ruler (CSS scroll timeline, no JS), coordinate readouts.
- **Type:** Instrument Serif (display) · Geist (text) · Geist Mono (labels). **Colour:** carbon, bone, one signal orange.

## Interactive pieces

| Piece | Where | How |
| --- | --- | --- |
| Air-draw canvas | hero | Pointer/touch leaves a decaying ink trail; draws a demo stroke until touched; pauses off-screen |
| Hand model | `~/vision` | 21 MediaPipe-topology landmarks, finger toggles → finger-state vector → gesture → action |
| Stack matrix | `~/materials` | Technology × build table; hover/pin a build to highlight what it's made of |
| Experiment filter | `~/scratch` | Filter by kind |

All motion respects `prefers-reduced-motion`. Content is visible without JavaScript.

## Editing content

Everything lives in `data/`, separate from the UI:

- `data/site.ts`: name, links. **`linkedin` and `email` are `null`.** Fill them in and they appear; until then
  they're hidden in production (and shown as reminders in `npm run dev`).
- `data/builds.ts`: the four case studies. Set `links.repo.href` / `links.live.href` when a link exists.
- `data/experiments.ts`: `experiments` (scratch cards) and `hackathons` (empty until there's a real entry).
- `data/stack.ts`: the materials matrix.

Canonical URLs, the sitemap and OG tags use https://tehsaad.me. Set `NEXT_PUBLIC_SITE_URL` at build time to override it.

## Deploying

The site is a static export (`output: "export"`) served by GitHub Pages at https://tehsaad.me.
Every push to `main` runs `.github/workflows/deploy.yml`, which builds `out/` and publishes it.
`public/CNAME` keeps the custom domain attached.

## Structure

```
app/          routes, metadata, sitemap, robots, OG image, icon
sections/     one file per page section
components/   shared UI (TopBar, CommandPalette, BuildsHost, HandLab, StackMatrix, plates/…)
data/         all content
lib/          hand geometry, hooks, helpers
styles/       design tokens + global CSS
```

## Scripts

`npm run dev` · `npm run build` · `npm start` · `npm run lint` · `npm run type-check`
