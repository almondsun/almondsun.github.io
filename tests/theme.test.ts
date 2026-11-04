import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';

const cssRoot = resolve(import.meta.dirname, '../public/assets/css');
const styleguide = readFileSync(resolve(cssRoot, 'styleguide.css'), 'utf8');
const index = readFileSync(resolve(import.meta.dirname, '../index.html'), 'utf8');

test('reference typography retains six weight/style faces rather than substituting system UI', () => {
  assert.equal((styleguide.match(/@font-face/g) || []).length, 6);
  for (const name of ['Regular', 'Italic', 'Light', 'LightItalic', 'Bold', 'BoldItalic']) {
    assert.ok(existsSync(resolve(cssRoot, '../fonts', `NeueMontreal-${name}.otf`)));
  }
  assert.match(styleguide, /font-family: 'Dennis Sans'/);
  assert.match(index, /rel="preload"[^>]+NeueMontreal-Regular/);
});

test('reference palette and original geometry hooks are preserved', () => {
  assert.match(styleguide, /--color-dark:\s*#1C1D20/i);
  assert.match(styleguide, /--color-light:\s*#FFFFFF/i);
  assert.match(styleguide, /--color-blue:\s*#455CE9/i);
  assert.match(styleguide, /\.btn-round/);
  assert.match(styleguide, /\.btn-hamburger/);
});

test('all retained CSS file URLs resolve to presentation assets', () => {
  for (const name of readdirSync(cssRoot).filter(name => name.endsWith('.css'))) {
    const css = readFileSync(resolve(cssRoot, name), 'utf8');
    for (const match of css.matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
      const url = match[1];
      if (url.startsWith('../')) assert.ok(existsSync(resolve(cssRoot, url)), `${name}: ${url}`);
      assert.doesNotMatch(url, /DSC\d|Kien_Team|home-item|drone-site/);
    }
  }
});

test('index is neutral and keeps local-only scripts, resources and form policy', () => {
  assert.doesNotMatch(index, /Dennis Snellenberg|dennissnellenberg\.com/);
  assert.match(index, /Content-Security-Policy/);
  assert.match(index, /form-action 'none'/);
});
