import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
import { fixture } from './fixtures/content.ts';
import { content, validateContent } from '../src/content/index.ts';

test('components render all routes, project sections and two independent profiles', async () => {
  const server = await createServer({ logLevel: 'silent', server: { middlewareMode: true, hmr: false, watch: null } });
  try {
    const { PortfolioPages, Section, resolvePage } = await server.ssrLoadModule('/src/pages.tsx');
    const render = (site: typeof content, path: string) => renderToStaticMarkup(createElement(PortfolioPages, { site, path }));
    for (const path of ['/', '/work', '/about', '/contact', '/archive', '/styleguide', '/success', '/error', ...content.projects.map(p => `/work/${p.slug}`)]) {
      const html = render(content, path);
      assert.match(html, /<main/); assert.match(html, /<h1/);
      assert.doesNotMatch(html, /Dennis Snellenberg|dennissnellenberg\.com|\/media\/pages\//i);
      assert.ok(resolvePage(content, path).title);
    }
    const categoryFixture = structuredClone(fixture);
    categoryFixture.categories.push({ id: 'all', label: 'Special collection' });
    categoryFixture.projects[0].categories = ['all'];
    const categoryHtml = render(categoryFixture, '/work');
    assert.match(categoryHtml, /data-category="all"[\s\S]*?Special collection<div class="count-nr">1<\/div>/);
    assert.equal((categoryHtml.match(/aria-pressed="true"/g) || []).length, 2);
    assert.match(render(content, '/'), /class="loading-container"/);
    const second = structuredClone(fixture);
    second.identity.name = 'Taylor Sample'; second.identity.timeZone = 'Pacific/Auckland';
    second.contact = undefined; second.identity.portrait = undefined;
    second.projects = []; second.archive = []; second.categories = [];
    assert.deepEqual(validateContent(second), []);
    assert.match(render(second, '/'), /Taylor Sample/);
    assert.doesNotMatch(render(second, '/contact'), /hello@example.com|Alex Example|mailto:/);
    assert.ok(render(second, '/work').includes(second.copy.emptyWork));
    assert.ok(render(second, '/archive').includes(second.copy.emptyArchive));
    assert.ok(render(second, '/not-found').includes(second.copy.errorTitle));
    for (const type of ['image', 'device', 'video']) {
      const html = renderToStaticMarkup(createElement(Section, { section: { type, media: { src: '/demo/sample.webm', alt: 'Sample media' } } }));
      assert.match(html, /Sample media/);
      if (type === 'video') assert.match(html, /<video[^>]*controls/);
    }
  } finally { await server.close(); }
});

test('short transition labels do not replace editable page titles', async () => {
  const server = await createServer({ logLevel: 'silent', server: { middlewareMode: true, hmr: false, watch: null } });
  try {
    const { resolvePage } = await server.ssrLoadModule('/src/pages.tsx');
    for (const [path, transitionLabel] of Object.entries({ '/': 'Home', '/work': 'Work', '/about': 'About', '/contact': 'Contact', '/archive': 'Archive', '/styleguide': 'Styleguide', '/success': 'Success', '/error': 'Error', '/missing': 'Error' })) {
      assert.equal(resolvePage(content, path).transitionLabel, transitionLabel);
    }
    assert.equal(resolvePage(content, '/work').title, content.copy.workTitle);
    assert.equal(resolvePage(content, '/success').title, 'Thank you');
    const site = structuredClone(content); site.projects[0].title = 'Custom project title';
    assert.equal(resolvePage(site, `/work/${site.projects[0].slug}`).transitionLabel, 'Custom project title');
  } finally { await server.close(); }
});
