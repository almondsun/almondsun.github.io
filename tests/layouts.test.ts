import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
import { content } from '../src/content/index.ts';

test('faithful page families preserve structural and motion hooks without personal content', async () => {
  const server = await createServer({ logLevel: 'silent', server: { middlewareMode: true, hmr: false, watch: null } });
  try {
    const { PortfolioPages } = await server.ssrLoadModule('/src/pages.tsx');
    const render = (path: string, site = content, includeLoader = true) => renderToStaticMarkup(createElement(PortfolioPages, { site, path, includeLoader }));
    const home = render('/');
    for (const hook of ['loading-container', 'rounded-div-wrap top', 'hanger', 'personal-image', 'mouse-pos-list-image', 'footer-rounded-div', 'btn-round', 'big-name']) assert.ok(home.includes(hook), hook);
    assert.ok(home.indexOf('loading-container') < home.indexOf('<main'));
    assert.doesNotMatch(home, /Dennis Snellenberg|dennissnellenberg\.com|\/media\/pages\/|alex-portrait/);
    assert.ok(!render('/', content, false).includes('loading-container'));
    const work = render('/work');
    for (const hook of ['work-filters', 'grid-rows-part', 'grid-columns-part', 'float-image-wrap']) assert.ok(work.includes(hook), hook);
    const first = content.projects[0];
    assert.ok(work.includes(`/work/${first.slug}`));
    assert.ok(render('/archive').includes('mouse-pos-list-archive'));
    assert.ok(render('/styleguide').includes('section-form'));
    for (const project of content.projects) assert.ok(render(`/work/${project.slug}`).includes('case-top-wrap'));
    const empty = structuredClone(content); empty.projects = []; empty.archive = []; empty.categories = []; empty.contact = undefined;
    assert.doesNotThrow(() => render('/work', empty));
    assert.doesNotThrow(() => render('/archive', empty));
  } finally { await server.close(); }
});

test('all coordinated views and case media bind arbitrary adopter data', async () => {
  const server = await createServer({ logLevel: 'silent', server: { middlewareMode: true, hmr: false, watch: null } });
  try {
    const { PortfolioPages } = await server.ssrLoadModule('/src/pages.tsx');
    const site = structuredClone(content);
    site.identity.name = 'Jamie Portfolio';
    site.presentation = { ...site.presentation, text: { ...site.presentation?.text, 'home-hero-name': 'Jamie Portfolio' } };
    site.categories = [{ id: 'research', label: 'Research' }];
    site.projects = Array.from({ length: 13 }, (_, index) => ({ ...structuredClone(content.projects[index % 11]),
      slug: `custom-${index}`, title: `Custom ${index}`, categories: ['research'], location: 'Custom location', roles: ['Research'] }));
    site.archive = [{ title: 'Custom archive', role: 'Custom role', location: 'Custom city', year: '2030' }];
    site.projects[0].media = { 'image-1': { src: '/placeholders/810x810.svg', alt: 'Custom image' },
      'video-3': { src: '/custom-video.mp4', poster: '/custom-poster.svg', alt: 'Custom video' } };
    const render = (path: string) => renderToStaticMarkup(createElement(PortfolioPages, { site, path }));
    const work = render('/work');
    for (const project of site.projects) assert.equal(work.split(`data-project="${project.slug}"`).length - 1, 3);
    assert.ok(work.includes('data-category="research"'));
    assert.ok(work.includes('Custom location'));
    assert.ok(!work.includes('data-category="design"'));
    const home = render('/');
    assert.equal(home.split('data-project="custom-0"').length - 1, 3);
    assert.ok(!home.includes('data-project="custom-4"'));
    const detail = render('/work/custom-0');
    assert.ok(detail.includes('/work/custom-1'));
    assert.ok(detail.includes('/custom-video.mp4'));
    assert.ok(detail.includes('/custom-poster.svg'));
    assert.ok(render('/archive').includes('Custom role'));
    assert.ok(render('/').includes('Jamie Portfolio'));
    for (const path of ['/', '/work', '/about', '/contact', '/archive', '/styleguide', '/error', ...site.projects.map(p => `/work/${p.slug}`)]) {
      assert.doesNotMatch(render(path), /Dennis|Snellenberg|dennissnellenberg|\/media\/pages\//);
    }
  } finally { await server.close(); }
});

test('editable presentation and case media use the existing safe local content boundary', async () => {
  const { validateContent } = await import('../src/content/validation.ts');
  const site = structuredClone(content);
  site.projects[0].media = { broken: { src: '//external.example/image.svg', alt: 'Unsafe' } };
  site.presentation = { media: { broken: { src: '/one/../secret.svg', alt: 'Unsafe' } } };
  const errors = validateContent(site);
  assert.ok(errors.some(error => error.includes('projects[0].media.broken')));
  assert.ok(errors.some(error => error.includes('presentation.media.broken')));
});
