# Personalize the template

The fictional portfolio is ordinary editable source code. Change the exported content, components, styles, or motion to suit the project; the typed content model is a helpful starting point, not a restriction on what the source can become.

## Quick path

1. Edit `src/content/site.ts` for the name, introduction, contact details, services, categories, archive, and colors.
2. Edit `src/content/projects.ts` to add, remove, rename, or reorder projects.
3. Put your own media under `public/`, then use local root-relative paths in the appropriate named slot; see [faithful layouts](layouts.md).
4. Run `node --test tests/content.test.ts` to check the current content and the editable-data examples.

## Content shape

Each project has a unique URL slug, a summary, roles, zero or more categories, a thumbnail, and an ordered list of sections. Categories are data: add any number and choose IDs that match the lowercase slug pattern, then assign those IDs to projects. A project without categories remains visible under All.

Faithful case pages select one of eleven preserved compositions through `layout` and bind `media`/`copy` maps to named slots. `sections` remains available for the compatible standalone `Section` component; it does not replace the faithful case composition.

Supported standalone section types are:

| Type | Fields | Use |
| --- | --- | --- |
| `text` | `heading`, `body` | A project story or introduction |
| `image` | `media` | One image or illustration |
| `device` | `media` | An image presented in a device frame |
| `video` | `media` | A local video asset when one is available |
| `gallery` | `items: Media[]` | An ordered group of local images |

Media provides `src` and descriptive `alt` text; `poster` is optional. Use local root-relative asset paths. `validateContent` checks the data shape, required copy, category references, unique slugs, local media paths, allowed link schemes, time zone, and theme colors. The validation is pure and does not read files or contact a service. A build or runtime can use it to explain mistakes, but it does not prevent editing the source. The default faithful cases use named media/copy slots; changing `Project.sections` alone does not change those layouts. The exported `Section` component is a reusable extension for adopters who explicitly render extra sections in a layout. To add a section type, extend `ProjectSection`, its renderer and validation; you can also replace the content model entirely.

## Contact behavior

The example email uses the reserved `example.com` domain. Contact validation is local demonstration behavior only; it does not submit or deliver a message. The contact object may be omitted when a project has no contact channel.

## Verification

`node --test tests/content.test.ts` exercises the data validator, including empty collections, arbitrary category additions, malformed references, unsafe links, and missing required fields. Local media-file existence is a separate filesystem check; `validateContent` intentionally stays portable and side-effect free.
