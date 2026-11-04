import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
import { readFileSync } from 'node:fs';
import { fixture } from './fixtures/content.ts';
import { content } from '../src/content/index.ts';
import { validateContent } from '../src/content/validation.ts';

async function withRenderer(check: (render: (path: string, site?: typeof content) => string) => void) {
  const server = await createServer({ logLevel: 'silent', server: { middlewareMode: true, hmr: false, watch: null } });
  try {
    const { PortfolioPages } = await server.ssrLoadModule('/src/pages.tsx');
    check((path, site = content) => renderToStaticMarkup(createElement(PortfolioPages, { site, path, includeLoader: false })));
  } finally { await server.close(); }
}

test('approved editorial copy renders in its actual Home and About locations', async () => {
  await withRenderer(render => {
    const home = render('/');
    for (const text of ['Software, Data', '&amp; Automation', 'I build software that brings data, tools and AI models together to make complex processes easier.', 'An engineering and mathematics student drawn to complex systems, practical problem-solving and building things from scratch.']) assert.ok(home.includes(text), text);
    const about = render('/about');
    for (const text of ['Understanding systems.', 'Building useful things.', 'What I work with', 'Engineering &amp; Mathematics', 'pursuing a double-degree path in Mathematics at Universidad Nacional de Colombia']) assert.ok(about.includes(text), text);
    assert.doesNotMatch(about, /awwwards-badge|>Awwwards</);
    for (const pillar of content.services) {
      assert.ok(about.includes(pillar.title.replaceAll('&', '&amp;')));
      assert.ok(about.includes(pillar.description.replaceAll('&', '&amp;').replaceAll("'", '&#x27;')));
    }
  });
});

test('short giant heading does not replace full identity and missing slot preserves legacy name', async () => {
  await withRenderer(render => {
    const home = render('/');
    assert.match(home, /<h1[^>]*>Martín Ramírez<span class="spacer">—<\/span><\/h1>/);
    assert.ok(home.includes('Ramírez Espinosa'));
    assert.equal(content.identity.name, 'Martín Ramírez Espinosa');
    assert.equal(content.identity.portrait?.alt, 'Portrait of Martín Ramírez Espinosa');
    const alternate = structuredClone(fixture);
    assert.ok(render('/', alternate).includes('>Fixture Person<span'));
  });
});

test('secondary HTTPS contact preserves phone-only behavior and omits absent controls in every affected layout', async () => {
  await withRenderer(render => {
    for (const path of ['/', '/about', '/contact', '/work', '/archive', '/styleguide', '/success']) {
      const html = render(path);
      assert.ok(html.includes('href="https://www.instagram.com/mitin_ra/"'), path);
      assert.ok(html.includes('@mitin_ra'), path);
      assert.doesNotMatch(html, /tel:|555 010|https:\/\/example.com\/(?:awwwards|instagram|twitter|linkedin)/, path);
      const legacy = structuredClone(fixture);
      legacy.contact = { phone: '+1 202 555 0100' };
      assert.ok(render(path, legacy).includes('href="tel:+12025550100"'), path);
      const absent = structuredClone(fixture);
      absent.contact = { email: 'fixture@example.org' };
      const without = render(path, absent);
      assert.doesNotMatch(without, /href="tel:|data-secondary-contact|href="#"[^>]*>[^<]*<span[^>]*>\s*<span[^>]*><\/span>/, path);
    }
  });
});

test('secondary contact reuses link validation without changing existing social or phone validation', () => {
  const candidate = structuredClone(fixture) as any;
  candidate.contact = { phone: '+1 202 555 0100', social: [{ label: 'Website', href: 'https://example.org' }], secondaryLink: { label: 'Profile', href: 'javascript:alert(1)' } };
  assert.ok(validateContent(candidate).some(e => e.includes('contact.secondaryLink')));
  for (const value of [null, {}, { label: '', href: 'https://example.org' }, { label: 'Profile', href: '//example.org' }]) {
    candidate.contact.secondaryLink = value;
    assert.ok(validateContent(candidate).some(e => e.includes('contact.secondaryLink')));
  }
  candidate.contact.secondaryLink = { label: 'Profile', href: 'https://example.org/profile' };
  assert.deepEqual(validateContent(candidate), []);
  delete candidate.contact.secondaryLink;
  assert.deepEqual(validateContent(candidate), []);
  candidate.contact.phone = '';
  assert.ok(validateContent(candidate).some(e => e.includes('contact.phone')));
  candidate.contact.phone = '+1 202 555 0100';
  candidate.contact.social[0].href = 'javascript:alert(1)';
  assert.ok(validateContent(candidate).some(e => e.includes('contact.social')));
});

test('contact profile details, clock, metadata and draft warning match approved scope', async () => {
  assert.equal(content.identity.timeZone, 'America/Bogota');
  assert.equal(content.presentation?.clockPlaceholder, '--:--');
  assert.equal(content.contact?.email, 'maramirezes@unal.edu.co');
  assert.deepEqual(content.contact?.social, [{ label: 'GitHub', href: 'https://github.com/almondsun' }, { label: 'Instagram', href: 'https://www.instagram.com/mitin_ra/' }]);
  assert.match(readFileSync('index.html', 'utf8'), /The personal portfolio of Martín Ramírez Espinosa, focused on software, data and automation\./);
  assert.ok(readFileSync('src/main.tsx', 'utf8').includes('Portfolio in progress · Project and archive entries are demonstration examples. The form does not send messages.'));
  await withRenderer(render => {
    const contact = render('/contact');
    for (const text of ['Let’s connect and exchange ideas.', 'Profile Details', 'Based in Colombia', 'Software, Data &amp; Automation']) assert.ok(contact.includes(text), text);
    assert.doesNotMatch(contact, /Business Details|Your project details|Your details/);
  });
});
