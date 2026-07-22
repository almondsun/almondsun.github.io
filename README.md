# Martín Ramírez Espinosa — portfolio

The source for a fast, accessible, and evidence-led engineering portfolio built with Astro.

## Local development

```bash
npm ci
npx playwright install chromium
npm run dev
```

Run the complete validation path with `npm run check`. It verifies formatting, Astro and TypeScript
contracts, the production build, responsive browser behavior, and automated accessibility checks.

Project claims live in `src/data/projects.ts`. The homepage deliberately features four projects;
the Projects page presents six. Every claim should remain supportable by the linked repository or
published project evidence.

The technical-artifact index lives in `src/data/notes.ts`. It curates existing public architecture
notes, handbooks, and experiment reports without presenting them as a publication list or promising
a blog schedule. Reusable profile artwork, including the LinkedIn banner source and export, lives in
`public/brand/`.

The site has no analytics, cookies, contact form, remote fonts, or visitor tracking. Contact is
limited to the already-public university email and GitHub account.

## Deployment

The production site is published at [almondsun.github.io](https://almondsun.github.io). Changes to
`main` are built and deployed by `.github/workflows/pages.yml`; the GitHub Pages source must remain
set to **GitHub Actions** rather than a branch-based Jekyll build.

The professional portrait is stored locally as an optimized, metadata-stripped WebP. The deployed
site does not fetch profile imagery or other personal assets from third-party services at runtime.
