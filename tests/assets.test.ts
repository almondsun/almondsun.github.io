import { test } from 'node:test';
import assert from 'node:assert/strict';
import { verifyAssets, activeIdentityLeaks } from '../scripts/verify-content.ts';

test('all configured media exists locally and original identity is absent from active files', () => {
  const result = verifyAssets();
  assert.deepEqual(result.errors, []);
  assert.ok(Number.isInteger(result.count) && result.count >= 0);
  assert.deepEqual(activeIdentityLeaks(), []);
});

 test('asset audit includes case and presentation slot sources and posters', async () => {
  const { content } = await import('../src/content/index.ts');
  const site = structuredClone(content);
  site.projects[0].media = { hero: { src: '/missing-case.svg', poster: '/missing-poster.svg', alt: 'Case' } };
  site.presentation = { media: { detail: { src: '/missing-presentation.svg', alt: 'Detail' } } };
  const { errors } = verifyAssets(site);
  for (const path of ['/missing-case.svg', '/missing-poster.svg', '/missing-presentation.svg']) {
    assert.ok(errors.some(error => error.includes(path)), path);
  }
});

test('identity audit supports current assets without an obsolete demo directory', async t => {
  const { mkdtempSync, mkdirSync, writeFileSync, rmSync } = await import('node:fs');
  const { tmpdir } = await import('node:os');
  const { join } = await import('node:path');
  const root = mkdtempSync(join(tmpdir(), 'folio-identity-audit-'));
  t.after(() => rmSync(root, { recursive: true }));
  mkdirSync(join(root, 'src/content'), { recursive: true });
  mkdirSync(join(root, 'public/placeholders'), { recursive: true });
  writeFileSync(join(root, 'src/content/site.ts'), 'export const name = "Your Name";');
  writeFileSync(join(root, 'public/placeholders/gray.svg'), '<svg/>');
  assert.deepEqual(activeIdentityLeaks(root), []);
  // A customized demo directory is still audited if an adopter creates one.
  mkdirSync(join(root, 'public/demo'));
  writeFileSync(join(root, 'public/demo/leak.svg'), '<svg><text>Code by Dennis</text></svg>');
  assert.deepEqual(activeIdentityLeaks(root), ['Original identity in active file: public/demo/leak.svg']);
});
