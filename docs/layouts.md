# Faithful layouts

The template keeps the reference presentation, not its owner's content. Its gray hero has no portrait. Original font aliases, CSS classes, SVG paths, layout wrappers, device frames and scroll attributes are presentation contracts, not personal profile data.

## Edit your content

| Change | Source |
| --- | --- |
| Name, role, biography, timezone | `src/content/site.ts` → `identity` |
| Three location-hanger lines | `presentation.locationLines` |
| Contact and social destinations | `contact` |
| Main headings and introductions | `copy` (use `\n` between original heading lines) |
| Services | `services` |
| Projects, categories and archive | `src/content/projects.ts` and `site.ts` |
| Additional neutral page copy | `src/content/layout-copy.ts`, overridden by `presentation.text` |
| Case-specific text overrides | A project's `copy` map, using the same slot key |
| Case composition | A project's `layout`, from 1 through 11 |
| Case metadata | `title`, `roles`, `credits`, `location`, `year`, `externalUrl` |

The work rows, grid and floating thumbnails read the **same ordered project array**. Home reads its first four entries; case navigation reads the next entry, wrapping at the end. Categories come from data, not a fixed pair of filters. Empty collections are supported. The default Design/Development counts are 7/11, with 11 neutral projects and 66 neutral archive entries to retain reference density.

## Replace media without changing geometry

Each ordinary layout contains explicit `mediaFor` calls. Their slot names are the editable map keys. For example, `Case01.tsx` has `image-1`, `image-2`, `video-3` and additional slots. Set them on that project's `media` map:

```ts
media: {
  'image-1': { src: '/your-media/header.webp', alt: 'Describe the project image' },
  'video-3': { src: '/your-media/demo.mp4', poster: '/your-media/poster.webp', alt: 'Describe the demonstration' },
}
```

Page media uses the same mechanism through `presentation.media`; its keys are prefixed with the page name. The source file shows the exact slot and fallback dimensions. Keep the existing image wrappers, intrinsic dimensions, object positioning, overlays and device chrome. Local SVG fallbacks are flat gray surfaces, not new artwork. Empty video slots have no video URL and show a gray poster; supplying a real local video activates the existing playback behavior. A video's poster belongs to the **same** media slot as its source.

`identity.portrait` is optional and intentionally absent. Supplying it fills the original hero image surface. Project `sections` remains a compatible content field; the faithful case composition uses its explicit named media/copy slots rather than reconstructing a simplified gallery from that field.

## Change structure

`src/layouts/*.tsx` are ordinary editable React components using nested `createElement` calls. There is no HTML string injection, capture JSON, custom layout language or AST interpreter in production. `PortfolioPages` only selects a component; `resolvePage` keeps the existing route contract.

The persistent application loader belongs outside transformed `main`. Full server-rendered composition defaults to including a loader sibling; the application passes `includeLoader={false}` and owns its persistent loader separately.

Edit the layout components directly. Development and production builds use these maintained sources without external capture inputs or generation tools.

## Verification

Run `node --test tests/layouts.test.ts` for shell/route hooks, every case family, arbitrary collection sizes, synchronized media views, next-case/media bindings, absent original identity and safe slot validation. Typecheck with `tsc --noEmit`. Pixel geometry and animation timing require the separate browser comparison; these source tests do not prove pixel parity.
