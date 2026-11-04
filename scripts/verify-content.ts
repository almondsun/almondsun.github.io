import { existsSync, readFileSync, readdirSync, realpathSync, statSync } from 'node:fs';
import { resolve, relative, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';
import { content, validateContent, type Media, type SiteContent } from '../src/content/index.ts';

const root = fileURLToPath(new URL('../', import.meta.url));
const publicRoot = realpathSync(resolve(root, 'public'));
export function verifyAssets(site: SiteContent = content) {
  const errors = validateContent(site);
  const assets = new Set<string>();
  const add = (media?: Media) => { if (media) { assets.add(media.src); if (media.poster) assets.add(media.poster); } };
  add(site.identity.portrait);
  Object.values(site.presentation?.media ?? {}).forEach(add);
  site.projects.forEach(project => {
    add(project.thumbnail);
    Object.values(project.media ?? {}).forEach(add);
    project.sections.forEach(section => {
      if (section.type === 'gallery') section.items.forEach(add);
      else if (section.type !== 'text') add(section.media);
    });
  });
  for (const asset of assets) {
    const path = resolve(publicRoot, '.' + asset);
    if (!existsSync(path)) { errors.push(`Missing local media: ${asset}`); continue; }
    const local = relative(publicRoot, realpathSync(path));
    if (local.startsWith('..') || isAbsolute(local) || !statSync(path).isFile()) errors.push(`Media must be a local file inside public/: ${asset}`);
  }
  return { errors, count: assets.size };
}
export function activeIdentityLeaks(projectRoot = root) {
  const errors: string[] = [];
  const forbidden = /dennissnellenberg|snellenberg|Code by Dennis|\/media\/pages\//i;
  function scan(dir: string) {
    for (const name of readdirSync(dir)) {
      const path = resolve(dir, name);
      if (statSync(path).isDirectory()) scan(path);
      else if (/\.(tsx?|json|svg|html|css)$/.test(name)) {
        // Preserve copyright/provenance comments; they are not rendered site content.
        const source = readFileSync(path, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
        if (forbidden.test(source)) errors.push(`Original identity in active file: ${relative(projectRoot, path).split('\\').join('/')}`);
      }
    }
  }
  // Identity lives in editable content; legacy presentation class/font names are intentional.
  scan(resolve(projectRoot, 'src/content'));
  scan(resolve(projectRoot, 'public/placeholders'));
  // Retired demo artwork is not required; still audit this folder if an adopter adds it.
  const demo = resolve(projectRoot, 'public/demo');
  if (existsSync(demo)) scan(demo);
  return errors;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { errors, count } = verifyAssets();
  errors.push(...activeIdentityLeaks());
  if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
  else console.log(`Verified editable content and ${count} local media files; no active reference identity.`);
}
