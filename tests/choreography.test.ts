import test from 'node:test';
import assert from 'node:assert/strict';
import gsap from 'gsap';
import { cover, reveal, enter, cold, coldProfile, type Surfaces } from '../src/choreography.ts';

function surfaces() {
  return { screen: { top: '100%' }, top: { height: '0vh' }, bottom: { height: '0vh' },
    words: { opacity: 0, y: 0 }, label: { textContent: '' } } satisfies Surfaces;
}
const near = (actual: number, expected: number, tolerance = .001) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} != ${expected}`);

test('cover commits at500ms with simultaneous10vh top cap at both breakpoints', () => {
  for (const mobile of [false, true]) {
    const e = surfaces(); const tl = gsap.timeline({ paused: true }); cover(tl, e, mobile);
    near(tl.duration(), .5); tl.seek(.4); assert.equal(e.top.height, '10vh');
    tl.seek(.5); assert.equal(e.screen.top, '0%'); assert.equal(e.bottom.height, mobile ? '5vh' : '10vh'); tl.kill();
  }
});

test('normal reveal overlaps rising words and curtain rather than jumping the words', () => {
  const e = surfaces(); e.screen.top = '0%'; e.top.height = '10vh'; e.bottom.height = '10vh';
  const tl = gsap.timeline({ paused: true }); reveal(tl, e);
  near(tl.duration(), 1.7); tl.seek(.05); near(e.words.opacity, 0); near(e.words.y, 0);
  tl.seek(.25); assert.ok(e.words.opacity > .7 && e.words.opacity < .8); assert.ok(e.words.y < -35 && e.words.y > -40);
  tl.seek(.65); assert.equal(e.screen.top, '0%'); near(e.words.opacity, .999);
  tl.seek(.85); assert.equal(e.top.height, '0vh');
  tl.seek(1.25); near(e.words.opacity, 0);
  tl.seek(1.45); assert.equal(e.screen.top, '-100%');
  tl.seek(1.7); assert.equal(e.bottom.height, '0vh'); tl.kill();
});

test('normal incoming content holds800ms after mount and is still moving at half reveal', () => {
  for (const mobile of [false, true]) {
    const entry = { y: 0, clearProps: '' }; const tl = gsap.timeline({ paused: true });
    enter(tl, [entry], { mobile, height: 900, delay: .8, duration: 1, stagger: .05 });
    tl.seek(.8); near(entry.y, mobile ? 180 : 450);
    tl.seek(1.05); assert.ok(entry.y > (mobile ? 25 : 65)); assert.ok(entry.y < (mobile ? 40 : 100));
    tl.seek(1.8); near(entry.y, 0); tl.kill();
  }
});


test('cold Home preserves nine-word choreography and supports empty/single/custom lists', () => {
  const words = ['Hello', 'Bonjour', 'Welcome', 'Ciao', 'Olá', 'Hi', 'Hallå', 'Guten tag', 'Hallo'];
  const profile = coldProfile(true, words, 'Home'); near(profile.exit, 2.32); near(profile.entryDelay, 2.52);
  assert.equal(profile.duration, 1.5); assert.equal(profile.stagger, .07);
  for (const list of [[], ['Hello'], ['Hello', 'Welcome', 'Hi']]) {
    const p = coldProfile(true, list, 'Home'); assert.ok(p.words.length >= 1);
    near(p.exit, 1.12 + .15 * (p.words.length - 1));
    const e = surfaces(); const tl = gsap.timeline({ paused: true }); cold(tl, e, p, true);
    tl.seek(.9); assert.equal(e.label.textContent, p.words[0]);
    tl.seek(p.exit); assert.equal(e.label.textContent, p.words.at(-1));
    tl.seek(p.exit + 1); assert.equal(e.screen.top, '-100%'); assert.equal(e.bottom.height, '0vh'); tl.kill();
  }
  const e = surfaces(); const tl = gsap.timeline({ paused: true }); cold(tl, e, profile, false);
  tl.seek(.5); near(e.words.opacity, 0); near(e.words.y, -50);
  tl.seek(1.3); near(e.words.opacity, 1); tl.seek(2.11); assert.equal(e.label.textContent, 'Hallo');
  tl.seek(2.52); assert.equal(e.screen.top === '0%', false);
  tl.seek(2.82); near(e.words.opacity, 0); near(tl.duration(), 3.32); tl.kill();
});

test('cold internal pages have500ms exit,700ms entry and10vh mobile offset', () => {
  const profile = coldProfile(false, ['Hello'], 'Work');
  assert.deepEqual(profile.words, ['Work']); near(profile.exit, .5); near(profile.entryDelay, .7);
  assert.equal(profile.duration, 1); assert.equal(profile.stagger, .05);
  const e = surfaces(); const tl = gsap.timeline({ paused: true }); cold(tl, e, profile, true);
  tl.seek(.5); assert.equal(e.screen.top, '0%'); near(e.words.opacity, 1);
  tl.seek(1); near(e.words.opacity, 0); tl.seek(1.5); assert.equal(e.bottom.height, '0vh'); tl.kill();
  const target = { y: 0, clearProps: '' }; const entry = gsap.timeline({ paused: true });
  enter(entry, target, { mobile: true, height: 844, delay: profile.entryDelay, duration: profile.duration, stagger: profile.stagger, cold: true });
  entry.seek(.7); near(target.y, 84.4); entry.seek(1.7); near(target.y, 0); entry.kill();
});

test('normal clocks recover handoff slack without shortening the mount-relative entry hold', async () => {
  const { normalClocks } = await import('../src/choreography.ts');
  const fast = normalClocks(1000, 1560, 1600);
  near(fast.revealTime, .04); near(fast.entryDelay, .76);
  near(fast.revealTime + fast.entryDelay, .8);
  const delayed = normalClocks(1000, 1810, 1850);
  near(delayed.revealTime, .04); near(delayed.entryDelay, .76);
  near(delayed.revealTime + delayed.entryDelay, .8);
  // A mount beyond the planned curtain exit must restart under full coverage.
  assert.deepEqual(normalClocks(1000, 2300, 2320), { revealTime: 0, entryDelay: .8 });
  assert.deepEqual(normalClocks(1000, 1500, 1500), { revealTime: 0, entryDelay: .8 });
  const e = surfaces(); e.screen.top = '0%';
  const tl = gsap.timeline({ paused: true }); reveal(tl, e);
  tl.seek(normalClocks(1000, 1560, 1600).revealTime);
  near(e.words.opacity, 0); // Shared post-mount time has not reached the50ms word start.
  tl.seek(.1);
  assert.ok(e.words.opacity > 0 && e.words.opacity < 1);
  assert.equal(e.screen.top, '0%');
  tl.kill();
});
