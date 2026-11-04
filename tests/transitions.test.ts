import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createTransitions } from '../src/transitions.ts';
import { wheelDistance, parallaxAxis } from '../src/scroll.ts';
const tick = () => new Promise(resolve => setImmediate(resolve));
test('cover completes before latest destination commits and animations never overlap', async () => {
  let finish!: () => void;
  const events: string[] = [];
  const transitions = createTransitions<string>({ cover: () => new Promise<void>(resolve => { events.push('cover'); finish = resolve; }), commit: async href => { events.push(href); }, reveal: async () => { events.push('reveal'); } });
  transitions.request('/work'); transitions.request('/about');
  assert.deepEqual(events, ['cover']);
  finish(); await tick();
  assert.deepEqual(events, ['cover', '/about', 'reveal']);
  transitions.dispose();
});
test('disposing a covered request prevents its late commit', async () => {
  let finish!: () => void; let commits = 0;
  const transitions = createTransitions<string>({ cover: () => new Promise<void>(resolve => { finish = resolve; }), commit: async () => { commits++; }, reveal: async () => {} });
  transitions.request('/work'); transitions.dispose(); finish(); await tick();
  assert.equal(commits, 0);
});
test('requests during reveal are serialized into a new covering cycle', async () => {
  let finish!: () => void; const events: string[] = [];
  const transitions = createTransitions<string>({ cover: async () => { events.push('cover'); }, commit: async href => { events.push(href); }, reveal: () => new Promise<void>(resolve => { finish = resolve; }) });
  transitions.request('/work'); await tick(); transitions.request('/about');
  assert.deepEqual(events, ['cover', '/work']); finish(); await tick();
  assert.deepEqual(events, ['cover', '/work', 'cover', '/about']); transitions.dispose(); finish();
});
test('wheel normalization preserves direction and handles browser delta modes', () => {
  assert.equal(wheelDistance(600, 0, 900), 48);
  assert.equal(wheelDistance(-3, 1, 900), -3.84);
  assert.equal(wheelDistance(1, 2, 900), 72);
  assert.equal(parallaxAxis('horizontal'), 'x'); assert.equal(parallaxAxis(undefined), 'y');
});
