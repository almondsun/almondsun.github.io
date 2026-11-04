# Folio

An editable React portfolio template with fictional content. Identity, projects and media are separate from reusable components, layout and motion. Everything is ordinary source code: edit any layer, not only the configuration.

## Run locally

Requires Node.js 22.18+ and npm. No backend, accounts, environment secrets or API keys.

```sh
npm ci --ignore-scripts
npm run dev
```

Open the loopback URL printed by Vite.

```sh
npm test
npm run verify:content
npm run verify:assets
npm run build
npm run preview
```

For browser smoke checks, use an already-installed official Playwright1.64.1 CLI with an ephemeral loopback session. Run from a temporary working directory, using the absolute path to this checkout and the port printed by Vite:

```sh
playwright cli -s=folio-check open http://127.0.0.1:5173/
playwright cli -s=folio-check run-code --filename=/absolute/path/to/folio/tests/browser/template.cjs
playwright cli -s=folio-check close
```

`verify:assets` aliases local content/media verification, including configured media existence and containment. See [verification and known limits](docs/fidelity-verification.md) for browser regressions and accepted differences.

## Make it yours

1. Edit `src/content/site.ts`: identity, biography, contact links, timezone, page copy, services, categories, archive and theme.
2. Edit `src/content/projects.ts`: projects, unique slugs, category IDs, thumbnails, case composition (`layout: 1..11`) and named media/copy slots.
3. Put your own media inside `public/` and reference root-relative paths such as `/my-work/cover.jpg`. Supply descriptive alt text; videos may have a local poster.
4. Run the checks above, then explore every page on desktop and mobile.

Your Name and all default projects are neutral placeholders. Replace or remove the demo email/social links before sharing your portfolio. Optional contact details, portrait, projects and archive can be omitted; empty states are already provided. Category labels, project counts and project routes derive from data rather than fixed template assumptions.

See [faithful layouts and media slots](docs/layouts.md), [motion lifecycle](docs/motion.md), [content editing](docs/content.md) for the interfaces and section examples, and [theme editing](docs/theme.md) for typography, colors and styling. You can also change or replace any component, validation rule, animation or route. No editor, CMS or proprietary template format is imposed.

## Architecture and behavior

- `src/content/`: typed editable data and pure validation. Invalid required fields, duplicate slugs, unknown categories and unsafe URLs produce explicit errors.
- `src/pages.tsx` and `src/layouts/`: faithful route compositions, shared presentation helpers and compatible standalone section renderer. Text is rendered by React, not inserted as raw HTML.
- `src/main.tsx`, `src/motion.ts`, `src/interactions.ts`: routing, transitions, route-owned motion cleanup, menu accessibility and simulated contact.

The general routes are `/`, `/work`, `/about`, `/contact`, `/archive`, `/styleguide`, `/error` and `/success`. Project pages use `/work/:slug`; unknown paths render the configured error page. Work has category filters and list/grid controls. Touch and reduced-motion modes avoid desktop inertia. The clock uses your configured IANA timezone.

**Contact never sends or stores messages.** Validation and the success state are local demonstrations. Email, phone and external social links require the visitor's action. CSP disallows form delivery and external embedded resources; do not add a real delivery service without deliberately changing that boundary.

## Clone and customize

This public preview deploys to https://almondsun.github.io/ through GitHub Actions on pushes to `main`. The Pages source is GitHub Actions. The workflow runs tests, content checks and the lockfile build before uploading `dist`. Known-route HTML entry files and `404.html` preserve client-side routing on static hosting.

Clone the public preview:

```sh
gh repo clone https://github.com/almondsun/almondsun.github.io.git
cd almondsun.github.io
npm ci --ignore-scripts
npm run dev
```

Your own copy can use its own repository and account. No credentials are included. The site is an incremental draft: unselected content remains fictional, and contact forms never deliver messages. The transparent hero and circular portrait have independent bindings. No blanket license is asserted for retained third-party resources.

## Provenance and limits

The structural styling and visual reference originate from Dennis Snellenberg's portfolio; see [REFERENCE.md](REFERENCE.md). Original personal content and project media are not shipped in the active template. Original typography, structural styles, generic device frames and decorative assets are retained; missing media uses flat gray local placeholders. Font aliases and legacy CSS class names are presentation metadata, not visible identity.

Separating content from code does not grant rights over the original visual design or retained styles. Attribution is preserved; no blanket open-source license or third-party ownership transfer is asserted. Review rights before redistribution or public deployment. Earlier revisions remain in Git history; the current tree distributes only the maintained template and its development checks.
