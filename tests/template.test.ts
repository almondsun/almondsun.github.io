import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fixture as content } from './fixtures/content.ts';

test('runtime renders editable components without loading raw captured HTML', () => {
  const runtime = readFileSync(new URL('../src/main.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(runtime, /dangerouslySetInnerHTML|reference\/routes|pageFiles/);
  assert.match(runtime, /PortfolioPages/);
});
test('presentation supports all project section variants and content-owned clock', () => {
  const pages = readFileSync(new URL('../src/layouts/Section.tsx', import.meta.url), 'utf8');
  for (const kind of ['text', 'device', 'gallery', 'video']) assert.match(pages, new RegExp(`'${kind}'`));
  const motion = readFileSync(new URL('../src/motion.ts', import.meta.url), 'utf8');
  assert.doesNotMatch(motion, /Europe\/Amsterdam/);
  assert.match(motion, /timeZone/);
});
test('second fictional profile changes only content and supports arbitrary counts', () => {
  const other = structuredClone(content);
  other.identity.name = 'Taylor Sample';
  other.identity.timeZone = 'Pacific/Auckland';
  other.projects = []; other.archive = []; other.categories = [];
  assert.notEqual(other.identity.name, content.identity.name);
  assert.equal(other.projects.length, 0);
});

test('faithful menu retains the original circular control and navigation shell', () => {
  const home = readFileSync(new URL('../src/layouts/Home.tsx', import.meta.url), 'utf8');
  for (const hook of ['btn-hamburger', 'fixed-nav', 'btn-round']) assert.ok(home.includes(hook));
});
