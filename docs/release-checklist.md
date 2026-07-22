# Portfolio release checklist

Use this checklist whenever a featured repository, case study, résumé claim, or public contact detail
changes materially.

## Claims and evidence

- Re-read the source repository at the `sourceRevision` recorded in `src/data/projects.ts` and
  `src/data/caseStudies.ts`.
- Confirm every numeric claim against a committed result, test report, or documented acceptance run.
- Update `lastVerified` and `sourceRevision` together; never advance either field without reviewing
  the public copy.
- Preserve negative results and limitations. Do not convert citation resolution into an entailment
  claim or a configured provider into a successful live run.
- Add external work only after it is publicly merged or otherwise verifiable by a reviewer.

## Résumé

- Run `npm run resume:build` after editing résumé data or print styles.
- Run `npm run resume:check` and inspect the generated A4 PDF at 100% zoom.
- Confirm the PDF remains one page, text-selectable, grayscale-readable, and free of private phone or
  address information.
- Confirm the stable filename remains `Martin_Ramirez_Espinosa_Resume.pdf`.

## Site and publication

- Run `npm run check`.
- Inspect desktop and mobile layouts in both themes, plus the print résumé.
- Check RAGdoll remains the first featured project and that case-study limitations remain visible.
- Merge only after CI passes, then verify the live résumé URL, case-study routes, responsive images,
  metadata, and external-link workflow.
