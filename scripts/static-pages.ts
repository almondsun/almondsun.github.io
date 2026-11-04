import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { content } from '../src/content/index.ts';
import { assertContent } from '../src/content/validation.ts';

// Pages has no server-side SPA rewrite: emit the existing application at known paths.
assertContent(content);
const dist = resolve('dist');
const html = readFileSync(join(dist, 'index.html'), 'utf8');
const routes = ['work', 'about', 'contact', 'archive', 'styleguide', 'error', 'success',
  ...content.projects.map(project => `work/${project.slug}`)];
for (const route of routes) {
  const directory = join(dist, route);
  mkdirSync(directory, { recursive: true });
  writeFileSync(join(directory, 'index.html'), html);
}
writeFileSync(join(dist, '404.html'), html);
console.log(`Prepared ${routes.length} static route entries and the 404 fallback.`);
