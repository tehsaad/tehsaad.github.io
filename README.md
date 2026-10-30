# tehsaad.me

Saad Rizwan's animated portfolio landing page. Next.js 16 static export, deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

- **Motion:** `components/Motion.tsx` holds all of it (GSAP ScrollTrigger and Lenis). The markup in `app/page.tsx` is complete without it, so visitors with reduced motion or no JavaScript get a plain, readable page.
- **Content:** `data/portfolio.json` is a copy of what www.tehsaad.site has published. Refresh it with `node scripts/sync-content.mjs`, then commit.
- **Screenshots:** `public/work/`, the same files as `assets/img/work/` in the main portfolio repo. Copy new ones over when a project gets one.

```bash
npm install
npm run dev
```
