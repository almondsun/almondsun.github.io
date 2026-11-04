import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
import { readFileSync, mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fixture } from './fixtures/content.ts';
import { content } from '../src/content/index.ts';

test('hero and circular portrait are independent across every page family, with legacy fallback', async () => {
  const server = await createServer({ logLevel: 'silent', server: { middlewareMode: true, hmr: false, watch: null } });
  try {
    const { PortfolioPages } = await server.ssrLoadModule('/src/pages.tsx');
    const site = structuredClone(fixture);
    site.identity.portrait = { src: '/hero-test.png', alt: 'Hero portrait' };
    site.presentation = { media: { 'profile-picture': { src: '/avatar-test.png', alt: 'Avatar portrait' } } };
    const render = (path: string) => renderToStaticMarkup(createElement(PortfolioPages, { site, path }));
    for (const path of ['/', '/work', '/about', '/contact', '/archive', '/styleguide', '/error', '/success', ...Array.from({ length: 11 }, (_, index) => {
      const project = { ...structuredClone(fixture.projects[0]), slug: `case-${index + 1}`, layout: index + 1 };
      site.projects.push(project); return `/work/${project.slug}`;
    })]) {
      const html = render(path);
      if (html.includes('class="profile-picture"')) assert.match(html, /url\(\/avatar-test\.png\)/, path);
      assert.doesNotMatch(html, /background-image:url\(\/hero-test\.png\)/, path);
    }
    assert.match(render('/'), /src="\/hero-test.png"/);
    site.presentation = undefined;
    assert.match(render('/contact'), /url\(\/hero-test\.png\)/);
    delete site.identity.portrait;
    assert.match(render('/contact'), /url\(\/placeholders\/810x810.svg\)/);
  } finally { await server.close(); }
});

test('selected public identity and independent portraits are configured', () => {
  assert.equal(content.identity.name, 'Martín Ramírez Espinosa');
  assert.equal(content.identity.location, 'Colombia');
  assert.equal(content.contact?.email, 'maramirezes@unal.edu.co');
  assert.equal(content.identity.portrait?.src, '/media/hero.png');
  assert.equal(content.presentation?.media?.['profile-picture']?.src, '/media/avatar.png');
  assert.deepEqual(content.presentation?.locationLines, ['Located', 'in', 'Colombia']);
  const css = readFileSync('src/app.css', 'utf8');
  assert.match(css, /height:\s*110vh/);
  assert.match(css, /max-width:\s*none/);
  assert.match(css, /object-fit:\s*contain/);
  assert.match(readFileSync('src/main.tsx', 'utf8'), /Draft portfolio.*demonstration.*form does not send/s);
});

test('static deployment emits identical entry HTML for every known route and the 404 page', () => {
  const scratch = mkdtempSync(join(tmpdir(), 'folio-entries-test-'));
  try {
    mkdirSync(join(scratch, 'dist'));
    const html = '<!doctype html><html lang="en"><script src="/assets/app.js"></script></html>';
    writeFileSync(join(scratch, 'dist/index.html'), html);
    const result = spawnSync(process.execPath, [resolve('scripts/static-pages.ts')], { cwd: scratch, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    for (const route of ['work', 'about', 'contact', 'archive', 'styleguide', 'error', 'success', ...content.projects.map(p => `work/${p.slug}`)]) {
      assert.equal(readFileSync(join(scratch, 'dist', route, 'index.html'), 'utf8'), html, route);
    }
    assert.equal(readFileSync(join(scratch, 'dist/404.html'), 'utf8'), html);
  } finally { rmSync(scratch, { recursive: true, force: true }); }
});
