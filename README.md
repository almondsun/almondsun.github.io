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

The site has no analytics, cookies, contact form, remote fonts, or visitor tracking. Contact is
limited to the already-public university email and GitHub account.

## Portrait launch gate

`src/components/Portrait.astro` currently renders a polished `MR` monogram. Before public launch,
replace it with an optimized local portrait derived from a high-resolution professional photograph.
Do not use the current GitHub Snoopy avatar or fetch the portrait remotely at runtime.

## Publication

The repository remains private while the portrait and final visual review are pending. At launch,
rename it to `almondsun.github.io`, make it public, merge the reviewed implementation into `main`,
and enable GitHub Pages through GitHub Actions.
