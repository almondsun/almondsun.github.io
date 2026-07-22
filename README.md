# Martín Ramírez Espinosa — portfolio

The source for a fast, accessible, and evidence-led engineering portfolio built with Astro.

## Local development

```bash
npm ci
npx playwright install chromium
npm run dev
```

Run the complete validation path with `npm run check`. It verifies formatting, Astro and TypeScript
contracts, the one-page résumé PDF, the production build, responsive browser behavior, and automated
accessibility checks. Regenerate the committed résumé after content or print-style changes with
`npm run resume:build`.

Project claims live in `src/data/projects.ts`. The homepage deliberately features three projects;
the Projects page presents six, with full RAGdoll and smaLLM case studies backed by typed content.
Every claim must remain supportable by the linked repository or published project evidence. Follow
[`docs/release-checklist.md`](docs/release-checklist.md) whenever a featured repository changes.

The technical-artifact index lives in `src/data/notes.ts`. It curates existing public architecture
notes, handbooks, and experiment reports without presenting them as a publication list or promising
a blog schedule. Optimizable page images live under `src/assets/`; stable downloadable artifacts and
reusable profile artwork, including the résumé and LinkedIn banner, live under `public/`.

The site has no analytics, cookies, contact form, remote fonts, or visitor tracking. Contact is
limited to the already-public university email and GitHub account.

## Deployment

The production site is published at [almondsun.github.io](https://almondsun.github.io). Changes to
`main` are built and deployed by `.github/workflows/pages.yml`; the GitHub Pages source must remain
set to **GitHub Actions** rather than a branch-based Jekyll build.

The professional portrait is stored locally as an optimized, metadata-stripped WebP. The deployed
site does not fetch profile imagery or other personal assets from third-party services at runtime.
