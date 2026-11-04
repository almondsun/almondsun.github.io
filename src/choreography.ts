import gsap from 'gsap';

/** Original presentation tracks; the route controller retains navigation ownership. */
export type Surfaces = {
  screen: gsap.TweenTarget; top: gsap.TweenTarget; bottom: gsap.TweenTarget;
  words: gsap.TweenTarget; label: { textContent: string | null };
};
export type Entry = { mobile: boolean; height: number; delay: number; duration: number; stagger: number; cold?: boolean };

export function positionEntry(targets: gsap.TweenTarget, profile: Pick<Entry, 'mobile' | 'height' | 'cold'>) {
  const offset = profile.mobile ? (profile.cold ? .1 : .2) : .5;
  gsap.set(targets, { y: profile.height * offset });
}

export function enter(timeline: gsap.core.Timeline, targets: gsap.TweenTarget, profile: Entry) {
  positionEntry(targets, profile);
  timeline.to(targets, { y: 0, duration: profile.duration, stagger: profile.stagger,
    ease: 'expo.out', clearProps: 'transform' }, profile.delay);
}

export function cover(timeline: gsap.core.Timeline, e: Surfaces, mobile: boolean) {
  timeline.set(e.screen, { top: '100%' }, 0);
  timeline.set(e.words, { opacity: 0, y: 0 }, 0);
  timeline.set(e.top, { height: '0vh' }, 0);
  timeline.set(e.bottom, { height: mobile ? '5vh' : '10vh' }, 0);
  timeline.to(e.screen, { top: '0%', duration: .5, ease: 'power4.in' }, 0);
  timeline.to(e.top, { height: '10vh', duration: .4, ease: 'power4.in' }, 0);
}

/** Compensate post-mount setup on both tracks, not physical mount latency.
 * A shared covered-layout origin preserves entry/curtain geometry and the800ms hold.
 */
export function normalClocks(coverStarted: number, mountedAt: number, now: number) {
  if (now >= coverStarted + 1150) return { revealTime: 0, entryDelay: .8 };
  const elapsed = Math.max(0, (now - Math.max(coverStarted + 500, mountedAt)) / 1000);
  return { revealTime: elapsed, entryDelay: Math.max(0, .8 - elapsed) };
}

/** Continuation at the covered mount barrier,500ms into normal navigation. */
export function reveal(timeline: gsap.core.Timeline, e: Surfaces) {
  timeline.fromTo(e.words, { opacity: 0, y: 0 }, { opacity: 1, y: -50, duration: .8, ease: 'power4.out' }, .05);
  timeline.to(e.screen, { top: '-100%', duration: .8, ease: 'power3.inOut' }, .65);
  timeline.to(e.words, { opacity: 0, duration: .6, ease: 'none' }, .65);
  timeline.set(e.top, { height: '0vh' }, .85);
  timeline.to(e.bottom, { height: '0vh', duration: .85, ease: 'power3.inOut' }, .85);
}

export function coldProfile(home: boolean, greetings: readonly string[], label: string) {
  const words = home && greetings.length ? [...greetings] : [label];
  const exit = home ? (1120 + 150 * (words.length - 1)) / 1000 : .5;
  return { home, words, exit, entryDelay: exit + .2, duration: home ? 1.5 : 1, stagger: home ? .07 : .05 };
}

export function cold(timeline: gsap.core.Timeline, e: Surfaces, profile: ReturnType<typeof coldProfile>, mobile: boolean) {
  timeline.set(e.screen, { top: '0%' }, 0);
  timeline.set(e.top, { height: '0vh' }, 0);
  timeline.set(e.bottom, { height: mobile ? '5vh' : '10vh' }, 0);
  timeline.set(e.words, { opacity: profile.home ? 0 : 1, y: -50 }, 0);
  timeline.set(e.label, { textContent: profile.words[0] }, 0);
  if (profile.home) {
    timeline.to(e.words, { opacity: 1, duration: .8, ease: 'power4.out' }, .5);
    profile.words.slice(0, -1).forEach((word, index) => timeline.set(e.label, { textContent: word }, .9 + index * .15));
    timeline.set(e.label, { textContent: profile.words.at(-1) }, .91 + (profile.words.length - 1) * .15);
  }
  timeline.to(e.screen, { top: '-100%', duration: .8, ease: 'power4.inOut' }, profile.exit);
  timeline.to(e.words, { opacity: 0, duration: .3, ease: 'none' }, profile.exit + .2);
  timeline.to(e.bottom, { height: '0vh', duration: 1, ease: 'power4.inOut' }, profile.exit);
}
