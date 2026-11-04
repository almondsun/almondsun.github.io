import gsap from 'gsap';
import { mountWheelNormalization, parallaxAxis } from './scroll';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

/** All motion, timers and listeners belong to one route and are disposed together. */
export function mountMotion(root: HTMLElement, _firstVisit: boolean, timeZone = 'UTC', entrySettled?: Promise<void>) {
  const listeners = new AbortController();
  const signal = listeners.signal;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const select = (selector: string) => root.querySelector<HTMLElement>(selector);
  const all = (selector: string) => [...root.querySelectorAll<HTMLElement>(selector)];
  const main = select('main')!;
  const content = select('.main-wrap');
  const smoother = content && fine.matches && innerWidth > 1024 && !reduced.matches
    ? ScrollSmoother.create({ wrapper: main, content, smooth: 1.1, smoothTouch: 0 }) : null;
  const updateViewport = () => {
    document.documentElement.style.setProperty('--vh', `${innerHeight * .01}px`);
    main.classList.toggle('touch', !fine.matches);
    main.classList.toggle('no-touch', fine.matches);
  };
  updateViewport();
  mountWheelNormalization(root, signal);
  window.addEventListener('resize', updateViewport, { signal });

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const element = entry.target as HTMLElement;
      if (entry.isIntersecting) {
        if (element.dataset.bg) element.style.backgroundImage = `url("${element.dataset.bg}")`;
        if (element.dataset.src) element.setAttribute('src', element.dataset.src);
        if (element.dataset.srcset) element.setAttribute('srcset', element.dataset.srcset);
        if (element instanceof HTMLVideoElement) {
          if (!reduced.matches) void element.play().catch(() => undefined);
        } else {
          element.classList.add('loaded');
          observer.unobserve(element);
        }
      } else if (element instanceof HTMLVideoElement) element.pause();
    }
  }, { rootMargin: '400px' });
  all('[data-bg], [data-src], [data-srcset], video').forEach(el => observer.observe(el));
  all('video').forEach(video => {
    (video as HTMLVideoElement).muted = true;
    (video as HTMLVideoElement).playsInline = true;
    (video as HTMLVideoElement).preload = 'metadata';
  });

  const clock = new Intl.DateTimeFormat('en-US', {
    timeZone, timeZoneName: 'short', hour: '2-digit', minute: '2-digit',
  });
  const updateTime = () => all('#timeSpan').forEach(el => { el.textContent = clock.format(new Date()); });
  updateTime();
  const interval = window.setInterval(updateTime, 30_000);
  const onScroll = () => main.classList.toggle('scrolled', scrollY > innerHeight * .3);
  onScroll();
  window.addEventListener('scroll', onScroll, { signal, passive: true });

  const deferredParallax: Array<() => void> = [];
  const context = gsap.context(() => {
    if (reduced.matches) return;

    const name = select('.big-name .name-wrap');
    if (name) {
      const duplicate = name.cloneNode(true) as HTMLElement;
      duplicate.dataset.replicaClone = 'true';
      duplicate.setAttribute('aria-hidden', 'true');
      name.after(duplicate);
      const position = () => gsap.set(duplicate, { position: 'absolute', top: name.offsetTop,
        left: name.offsetLeft + name.offsetWidth });
      position();
      window.addEventListener('resize', position, { signal });
      const roll = gsap.to([name, duplicate], { xPercent: -100, duration: 18, repeat: -1, ease: 'none' });
      ScrollTrigger.create({ onUpdate: self => roll.timeScale(self.direction) });
    }
    all('.fade-in.animate, .span-lines.animate').forEach(element => {
      gsap.from(element, { y: 36, opacity: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: element, start: 'top 95%', toggleActions: 'play none none reset' } });
    });
    const arrow = select('.home-header .arrow');
    if (arrow) gsap.to(arrow, { rotation: 90, ease: 'none', scrollTrigger: {
      trigger: '.home-header', start: 'bottom bottom', end: 'bottom top', scrub: true,
    } });
    const aboutArrow = select('.about-image .arrow');
    if (aboutArrow) gsap.to(aboutArrow, { rotation: 60, ease: 'none', scrollTrigger: {
      trigger: '.single-about-image', start: 'top bottom', end: 'bottom top', scrub: true,
    } });
    const badge = select('[data-rotating-badge] svg, .awwwards-badge svg');
    if (badge) gsap.to(badge, { rotation: -90, scrollTrigger: {
      trigger: '.awwwards-badge', start: 'top bottom', end: 'bottom top', scrub: true,
    } });
    const rounded = select('.footer-rounded-div .rounded-div-wrap');
    if (rounded) gsap.to(rounded, { height: 0, ease: 'none', scrollTrigger: {
      trigger: '.footer-wrap', start: 'top bottom', end: 'bottom bottom', scrub: true,
    } });
    all('[data-scroll-speed]').forEach(element => {
      const speed = Number(element.dataset.scrollSpeed) || 0;
      if (!speed || innerWidth <= 720) return;
      const axis = parallaxAxis(element.dataset.scrollDirection);
      const header = element.closest('.home-header');
      const position = element.dataset.scrollPosition;
      const offsets = (element.dataset.scrollOffset || '0,0').split(',').map(value => Number.parseFloat(value) || 0);
      const start = position === 'top' || header ? `top top+=${offsets[0]}%` : `top bottom-=${offsets[0]}%`;
      const end = position === 'bottom' ? `bottom bottom+=${offsets[1] || 0}%` : `bottom top+=${offsets[1] || 0}%`;
      const parallax = () => {
        gsap.fromTo(element, { [axis]: header ? 0 : speed * 16 }, {
          [axis]: -speed * (header ? 60 : 16), ease: 'none',
          scrollTrigger: { trigger: header || element, start, end, scrub: true },
        });
      };
      // Entry and parallax must not concurrently own the same transform.
      if (entrySettled && element.matches('.once-in')) deferredParallax.push(parallax);
      else parallax();
    });
  }, root);

  entrySettled?.then(() => {
    if (signal.aborted || reduced.matches || !deferredParallax.length) return;
    context.add(() => deferredParallax.forEach(animate => animate()));
    ScrollTrigger.refresh();
  });

  if (fine.matches && !reduced.matches) {
    all('.btn-click.magnetic').forEach(element => {
      const fill = element.querySelector('.btn-fill');
      const text = element.querySelector('.btn-text-inner.change');
      element.addEventListener('pointerenter', () => { if (reduced.matches) return; context.add(() => {
        if (fill) gsap.fromTo(fill, { y: '76%' }, { y: '0%', duration: .6, ease: 'power2.inOut', overwrite: true });
        if (text) gsap.to(text, { color: '#fff', duration: .3, overwrite: true });
      }); }, { signal });
      element.addEventListener('pointerleave', () => { if (reduced.matches) return; context.add(() => {
        if (fill) gsap.to(fill, { y: '-76%', duration: .6, ease: 'power2.inOut', overwrite: true });
        if (text) gsap.to(text, { clearProps: 'color', duration: .3, overwrite: true });
      }); }, { signal });
    });
    const cursors = all('.mouse-pos-list-image, .mouse-pos-list-btn, .mouse-pos-list-span');
    context.add(() => {
      const setters = cursors.map(el => ({ x: gsap.quickTo(el, 'left', { duration: .35, ease: 'power2.out' }),
        y: gsap.quickTo(el, 'top', { duration: .35, ease: 'power2.out' }) }));
      root.addEventListener('pointermove', event => { if (reduced.matches) return; setters.forEach(set => {
        set.x(event.clientX); set.y(event.clientY);
      }); }, { signal });
    });
    all('.mouse-pos-list-image-wrap li, .single-tile-wrap a, .mouse-pos-list-archive a, .next-case-btn').forEach(element => {
      const floating = element.matches('.mouse-pos-list-image-wrap li');
      element.addEventListener('pointerenter', () => {
        if (reduced.matches) return;
        cursors.forEach(cursor => cursor.classList.add(floating ? 'active' : 'active-big'));
        if (floating) {
          const siblings = all('.mouse-pos-list-image-wrap li');
          const index = siblings.indexOf(element);
          context.add(() => gsap.to(all('.float-image-wrap'), {
            y: `${index * -100 / Math.max(siblings.length, 1)}%`, duration: .6, ease: 'power2.inOut',
          }));
        }
      }, { signal });
      element.addEventListener('pointerleave', () => cursors.forEach(cursor => {
        cursor.classList.remove('active', 'active-big');
      }), { signal });
    });
    all('.magnetic').forEach(element => {
      const text = element.querySelector('.btn-text');
      element.addEventListener('pointermove', event => {
        if (reduced.matches) return;
        const bounds = element.getBoundingClientRect();
        const x = (event.clientX - bounds.left - bounds.width / 2) / bounds.width;
        const y = (event.clientY - bounds.top - bounds.height / 2) / bounds.height;
        context.add(() => {
          gsap.to(element, { x: x * Number(element.dataset.strength || 20), y: y * Number(element.dataset.strength || 20), duration: 1.5, ease: 'power4.out', overwrite: true });
          if (text) gsap.to(text, { x: x * Number(element.dataset.strengthText || 10), y: y * Number(element.dataset.strengthText || 10), duration: 1.5, ease: 'power4.out', overwrite: true });
        });
      }, { signal });
      element.addEventListener('pointerleave', () => { if (reduced.matches) return; context.add(() => {
        gsap.to([element, ...(text ? [text] : [])], { x: 0, y: 0, duration: 1.5, ease: 'elastic.out(1,.4)', overwrite: true });
      }); }, { signal });
    });
  }
  const onMotionChange = () => {
    if (reduced.matches) {
      context.revert();
      smoother?.kill();
      all('[data-replica-clone]').forEach(el => el.remove());
      const loader = select('.loading-screen');
      if (loader) loader.style.top = '-130%';
      all('video').forEach(video => (video as HTMLVideoElement).pause());
    }
  };
  reduced.addEventListener('change', onMotionChange, { signal });
  document.fonts.ready.then(() => { if (!signal.aborted) ScrollTrigger.refresh(); });
  return () => {
    listeners.abort();
    window.clearInterval(interval);
    observer.disconnect();
    all('video').forEach(video => (video as HTMLVideoElement).pause());
    context.revert();
    smoother?.kill();
    all('[data-replica-clone]').forEach(el => el.remove());
  };
}
