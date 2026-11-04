import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';

const root = new URL('../', import.meta.url);
test('distributed assets exclude rejected demo artwork and the unused landscape placeholder', () => {
  for (const path of ['public/demo/alex-portrait.svg', 'public/demo/common-ground.svg',
    'public/demo/field-notes.svg', 'public/demo/orbit-studio.svg', 'public/placeholders/landscape.svg']) {
    assert.equal(existsSync(new URL(path, root)), false, path);
  }
});
test('application lifecycle styles have an application name rather than a replica entry point', () => {
  const source = readFileSync(new URL('src/main.tsx', root), 'utf8');
  assert.match(source, /import '\.\/app\.css'/);
  assert.doesNotMatch(source, /import '\.\/replica\.css'/);
  assert.equal(existsSync(new URL('src/replica.css', root)), false);
});

test('browser smoke coverage uses the current template rather than obsolete navigation hooks', () => {
  assert.equal(existsSync(new URL('tests/browser.smoke.js', root)), false);
  const probe = readFileSync(new URL('tests/browser/template.cjs', root), 'utf8');
  for (const hook of ['.work-tiles', '.columns-btn', '.rows-btn', '.nav-bar .btn-menu', '/success']) assert.ok(probe.includes(hook), hook);
  assert.doesNotMatch(probe, /\.template-nav|Grid view/);
});

test('every retained stylesheet URL and layout placeholder resolves locally', () => {
  const publicRoot = new URL('public/', root);
  const styles = new URL('public/assets/css/', root);
  for (const file of readdirSync(styles).filter(file => file.endsWith('.css'))) {
    const stylesheet = new URL(file, styles);
    const source = readFileSync(stylesheet, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
    for (const match of source.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) {
      const href = match[1].trim();
      if (/^(data:|https?:|#)/.test(href)) continue;
      const asset = href.startsWith('/') ? new URL('.' + href, publicRoot) : new URL(href, stylesheet);
      assert.equal(existsSync(asset), true, `${file}: ${href}`);
    }
  }
  const layouts = new URL('src/layouts/', root);
  for (const file of readdirSync(layouts).filter(file => /\.tsx?$/.test(file))) {
    const source = readFileSync(new URL(file, layouts), 'utf8');
    for (const match of source.matchAll(/\/placeholders\/[A-Za-z0-9_.-]+\.svg/g)) {
      assert.equal(existsSync(new URL('.' + match[0], publicRoot)), true, `${file}: ${match[0]}`);
    }
  }
});

test('the template no longer distributes the retired capture compiler or its instructions', () => {
  assert.equal(existsSync(new URL('scripts/generate-layouts.py', root)), false);
  const guide = readFileSync(new URL('docs/layouts.md', root), 'utf8');
  assert.doesNotMatch(guide, /generate-layouts\.py|normalized JSON input/);
});

test('consumer documentation excludes implementation journals and machine-local audit paths', () => {
  for (const path of ['odd/tasks/full-site-replica.md', 'odd/tasks/reusable-template.md', 'odd/tasks/fidelity-restoration.md']) {
    assert.equal(existsSync(new URL(path, root)), false, path);
  }
  assert.match(readFileSync(new URL('.gitignore', root), 'utf8'), /^\/odd\/$/m);
  const guide = readFileSync(new URL('docs/fidelity-verification.md', root), 'utf8');
  assert.doesNotMatch(guide, /\/tmp\/|\/home\/|## (Choreography update|Final polish verification|Delivery evidence)/);
  assert.match(guide, /50[–-]62/);
});
