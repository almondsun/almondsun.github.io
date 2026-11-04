import { useLayoutEffect, useRef, useState, type MouseEvent } from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { mountMotion } from './motion';
import { mountInteractions } from './interactions';
import { createTransitions } from './transitions';
import { cover, reveal, enter, positionEntry, cold, coldProfile, normalClocks, type Entry } from './choreography';
import './app.css';
import { content } from './content/index.ts';
import { assertContent } from './content/validation.ts';
import { PortfolioPages, resolvePage } from './pages';
assertContent(content);
type Destination = { href: string; pop?: boolean };
function Portfolio() {
  const location = useLocation();
  const navigate = useNavigate();
  const locationHref = location.pathname + location.search + location.hash;
  const [displayed, setDisplayed] = useState(locationHref);
  const root = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  const current = useRef(displayed);
  const mounted = useRef<(() => void) | null>(null);
  const mountedAt = useRef(0);
  const interactionController = useRef<ReturnType<typeof mountInteractions> | null>(null);
  const entrySettled = useRef<(() => void) | null>(null);
  const navigation = useRef<ReturnType<typeof createTransitions<Destination>> | null>(null);
  const path = displayed.split(/[?#]/)[0].replace(/\/$/, '') || '/';
  const page = resolvePage(content, path);
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = `${page.title} — ${content.identity.name}`;
    mountedAt.current = performance.now();
    const entryTargets = root.current!.querySelectorAll('.once-in');
    const interactions = mountInteractions(root.current!, () => navigation.current?.request({ href: '/success' }));
    interactionController.current = interactions;
    let settle!: () => void;
    const settled = new Promise<void>(resolve => { settle = resolve; });
    entrySettled.current = settle;
    const motion = mountMotion(root.current!, false, content.identity.timeZone, settled);
    mounted.current?.(); mounted.current = null;
    return () => { gsap.killTweensOf(entryTargets); settle(); motion(); interactions(); interactionController.current = null; };
  }, [displayed, page.title]);
  useLayoutEffect(() => {
    const loader = layer.current!;
    const screen = loader.querySelector('.loading-screen')!;
    const words = loader.querySelector('.loading-words')!;
    const label = loader.querySelector<HTMLElement>('[data-loading-label]')!;
    const top = loader.querySelector('.rounded-div-wrap.top')!;
    const bottom = loader.querySelector('.rounded-div-wrap.bottom')!;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let disposed = false;
    let active: gsap.core.Timeline | null = null;
    let entry: gsap.core.Timeline | null = null;
    let finish: (() => void) | null = null;
    let frame: number | null = null;
    let coverStarted = 0;
    const lock = (locked: boolean) => {
      document.documentElement.classList.toggle('is-transitioning', locked);
      document.documentElement.style.cursor = locked ? 'wait' : '';
      document.body.style.overflow = locked ? 'hidden' : '';
      loader.style.pointerEvents = 'none';
    };
    const play = (build: (timeline: gsap.core.Timeline) => number | void) => new Promise<void>(resolve => {
      finish = resolve;
      // Anchor both tracks to a fresh browser/GSAP frame, not the tick preceding React work.
      frame = requestAnimationFrame(() => {
        frame = null;
        if (disposed || reduced.matches) { finish = null; resolve(); return; }
        active = gsap.timeline({ paused: true, onComplete: () => { active = null; finish = null; resolve(); } });
        const position = build(active) || 0;
        active.play(position);
      });
    });
    const focus = () => {
      const heading = root.current?.querySelector('h1');
      if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
    };
    const surfaces = { screen, words, label, top, bottom };
    const animateEntry = (profile: Partial<Entry> = {}) => {
      entry?.kill();
      if (!reduced.matches) {
        entry = gsap.timeline({ onComplete: () => entrySettled.current?.() });
        enter(entry, root.current!.querySelectorAll('.once-in'), {
          mobile: innerWidth <= 540, height: innerHeight, delay: 0, duration: 1, stagger: .05, ...profile,
        });
      } else entrySettled.current?.();
    };
    lock(true);
    gsap.set(screen, { top: 0 });
    gsap.set(label.parentElement, { display: 'block' });
    const profile = coldProfile(path === '/', content.copy.greetings, page.transitionLabel);
    gsap.set(words, { opacity: profile.home ? 0 : 1, y: -50 });
    label.textContent = profile.words[0];
    if (!reduced.matches) positionEntry(root.current!.querySelectorAll('.once-in'), { mobile: innerWidth <= 540, height: innerHeight, cold: true });
    else entrySettled.current?.();
    const initial = reduced.matches ? Promise.resolve() : play(timeline => {
      animateEntry({ cold: true, delay: profile.entryDelay, duration: profile.duration, stagger: profile.stagger });
      cold(timeline, surfaces, profile, innerWidth <= 540);
    });
    const ready = initial.then(() => {
      if (!disposed) { if (reduced.matches) gsap.set(screen, { top: '100%' }); lock(false); }
    });
    navigation.current = createTransitions<Destination>({
      cover: async () => {
        await ready;
        if (disposed) return;
        lock(true);
        if (reduced.matches) { interactionController.current?.closeForNavigation(); gsap.set(screen, { top: 0 }); return; }
        await play(timeline => {
          interactionController.current?.closeForNavigation();
          coverStarted = performance.now();
          cover(timeline, surfaces, innerWidth <= 540);
        });
      },
      commit: async destination => {
        if (disposed) return;
        const previous = current.current;
        current.current = destination.href;
        label.textContent = resolvePage(content, destination.href.split(/[?#]/)[0]).transitionLabel;
        gsap.set(words, { opacity: 0, y: 0 });
        if (destination.href !== previous) {
          const committed = new Promise<void>(resolve => { mounted.current = resolve; });
          // Coverage is complete: commit both route states in this turn instead of
          // adding a concurrent-render scheduling gap to every transition.
          flushSync(() => {
            setDisplayed(destination.href);
            if (!destination.pop) navigate(destination.href);
          });
          await committed;
          lock(true);
        }
        entry?.kill();
        if (!reduced.matches) positionEntry(root.current!.querySelectorAll('.once-in'), { mobile: innerWidth <= 540, height: innerHeight });
        else entrySettled.current?.();
      },
      reveal: async () => {
        if (disposed) return;
        if (!reduced.matches) await play(timeline => {
          const clocks = normalClocks(coverStarted, mountedAt.current, performance.now());
          animateEntry({ delay: clocks.entryDelay });
          reveal(timeline, surfaces);
          return clocks.revealTime;
        });
        if (!disposed) { gsap.set(screen, { top: '100%' }); lock(false); focus(); }
      },
      error: () => { lock(false); gsap.set(screen, { top: '100%' }); },
    });
    const preference = () => { if (reduced.matches) { if (frame !== null) { cancelAnimationFrame(frame); frame = null; finish?.(); finish = null; } active?.progress(1); entry?.kill(); entrySettled.current?.(); gsap.killTweensOf(root.current!.querySelectorAll('.once-in')); gsap.set(root.current!.querySelectorAll('.once-in'), { clearProps: 'transform' }); } };
    reduced.addEventListener('change', preference);
    return () => {
      disposed = true; if (frame !== null) cancelAnimationFrame(frame); navigation.current?.dispose(); active?.kill(); entry?.kill(); finish?.(); mounted.current?.();
      gsap.killTweensOf(root.current?.querySelectorAll('.once-in') || []);
      reduced.removeEventListener('change', preference); lock(false);
    };
  }, []);
  useLayoutEffect(() => {
    if (locationHref !== current.current) navigation.current?.request({ href: locationHref, pop: true });
  }, [locationHref]);
  function followLink(event: MouseEvent<HTMLDivElement>) {
    const anchor = (event.target as Element).closest('a');
    if (!anchor || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const raw = anchor.getAttribute('href');
    if (!raw || raw.startsWith('#') || anchor.hasAttribute('download') || anchor.target === '_blank') return;
    const url = new URL(raw, window.location.href);
    if (url.origin !== window.location.origin || /^\/(assets|media|demo)\//.test(url.pathname)) return;
    event.preventDefault();
    const href = url.pathname + url.search + url.hash;
    if (href !== current.current || navigation.current?.busy) navigation.current?.request({ href });
  }
  return <>
    <aside className="draft-notice" aria-label="Draft notice">Draft portfolio · Projects and remaining content are demonstration examples. The form does not send messages.</aside>
    <a className="skip-link" href="#page-content">Skip to content</a>
    <div ref={layer} className="loading-container" aria-hidden="true"><div className="loading-screen">
      <div className="rounded-div-wrap top"><div className="rounded-div" /></div>
      <div className="loading-words"><h2 className="active"><span className="dot" /><span data-loading-label>{page.transitionLabel}</span></h2></div>
      <div className="rounded-div-wrap bottom"><div className="rounded-div" /></div>
    </div></div>
    <div ref={root} id="page-content" onClickCapture={followLink}><PortfolioPages site={content} path={path} includeLoader={false} /></div>
  </>;
}
createRoot(document.getElementById('root')!).render(<BrowserRouter><Portfolio /></BrowserRouter>);
