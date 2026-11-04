# Verification and known limits

The template ships with neutral content and local-only contact behavior. Validate your own content and media before sharing it; source checks alone do not certify visual equivalence to the design reference.

## Local checks

```sh
npm test
npm run verify:content
npm run verify:assets
npm run build
```

The tests cover data validation, route metadata and compositions, motion tracks, local contact, presentation assets, checkout behavior and distribution cleanup. `verify:assets` aliases the content/media audit. Missing configured media is an error; the retired demo directory is not required. If you create a new `public/demo` directory, it is included in the identity audit.

## Browser checks

Start Vite with `npm run dev`. Use an already-installed official Playwright1.64.1 CLI in a temporary working directory, with an ephemeral managed Chromium session, sandbox enabled and service workers blocked. Replace the port and absolute checkout path below as needed; no account or persistent profile is required.

```sh
playwright cli -s=folio-check open http://127.0.0.1:5173/
playwright cli -s=folio-check run-code --filename=/absolute/path/to/folio/tests/browser/template.cjs
playwright cli -s=folio-check run-code --filename=/absolute/path/to/folio/tests/browser/choreography.cjs
playwright cli -s=folio-check run-code --filename=/absolute/path/to/folio/tests/browser/menu-transition.cjs
playwright cli -s=folio-check close
```

- **Template:** all general/project routes at390/768/1440px, current filters and list/grid controls, menu, Back navigation, neutral visible identity and local contact with no external/non-GET requests.
- **Choreography:** cold hero entry and at least800ms of entry hold after an artificially expensive mount.
- **Menu:** real pointer navigation at desktop/mobile breakpoints, Escape focus restoration, coverage lock and final heading focus.

The probes require loopback previews and throw on failure. They neither install browser tooling nor deliver forms. For visual changes, also compare settled and intermediate transition geometry at the same viewport and content, awaiting fonts and masking only dynamic clock text.

## Known limits

- Normal transition words have a measured residual delay of approximately50–62ms relative to the original reference, with roughly one-frame measurement uncertainty. This limitation was accepted for release; strict timing equivalence is not claimed.
- Complete same-content pixel equivalence and original video-playback equivalence are not certified. Neutral text and missing personal media intentionally change wrapping and page height.
- Contact validation and the success route are demonstrations: messages are not sent or stored.
- The build currently reports an advisory production chunk larger than500kB. The reproducible install command is `npm ci --ignore-scripts`; no runtime secrets or backend are required.

See [layout/media editing](layouts.md), [motion behavior](motion.md) and [design provenance](../REFERENCE.md) before changing or redistributing the template.
