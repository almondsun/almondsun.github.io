/** Normalize wheel units before applying the observed desktop Locomotive gain. */
export function wheelDistance(delta: number, mode: number, viewport: number) {
  return delta * (mode === 1 ? 16 : mode === 2 ? viewport : 1) * .08;
}
export function parallaxAxis(direction?: string) { return direction === 'horizontal' ? 'x' : 'y'; }
export function mountWheelNormalization(root: HTMLElement, signal: AbortSignal) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  window.addEventListener('wheel', event => {
    if (reduced.matches || innerWidth <= 1024 || !matchMedia('(hover: hover) and (pointer: fine)').matches || event.ctrlKey) return;
    if (document.documentElement.classList.contains('is-transitioning') || root.querySelector('.nav-active')) { event.preventDefault(); return; }
    const target = event.target instanceof Element ? event.target : null;
    if (target?.closest('input, textarea, select, [contenteditable="true"]')) return;
    for (let node = target; node && node !== document.body; node = node.parentElement) {
      if (/(auto|scroll)/.test(getComputedStyle(node).overflowY) && node.scrollHeight > node.clientHeight) return;
    }
    event.preventDefault();
    window.scrollBy({ top: wheelDistance(event.deltaY, event.deltaMode, innerHeight), behavior: 'instant' });
  }, { passive: false, signal });
}
