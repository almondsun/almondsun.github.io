import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { validateContact, type ContactValues } from './contact';

export function mountInteractions(root: HTMLElement, onSuccess: () => void) {
  const controller = new AbortController();
  const { signal } = controller;
  const all = (selector: string) => [...root.querySelectorAll<HTMLElement>(selector)];
  const timers = new Set<ReturnType<typeof setTimeout>>();
  const later = (callback: () => void, delay: number) => {
    const timer = setTimeout(() => { timers.delete(timer); callback(); }, delay);
    timers.add(timer);
  };
  const main = root.querySelector('main')!;
  const nav = root.querySelector<HTMLElement>('.fixed-nav');
  const toggles = all('.btn-hamburger, .btn-menu');
  let restoreFocus: HTMLElement | null = null;
  let menuOpen = false;

  function setMenu(open: boolean, navigating = false) {
    menuOpen = open;
    main.classList.toggle('nav-active', open);
    toggles.forEach(el => { el.classList.toggle('active', open); el.setAttribute('aria-expanded', String(open)); });
    if (nav) { nav.inert = !open; nav.setAttribute('aria-hidden', String(!open)); }
    if (!navigating) document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      restoreFocus = document.activeElement as HTMLElement;
      nav?.querySelector<HTMLElement>('a')?.focus({ preventScroll: true });
    } else if (!navigating) restoreFocus?.focus({ preventScroll: true });
  }
  if (nav) { nav.id = 'site-menu'; nav.inert = true; nav.setAttribute('aria-hidden', 'true'); }
  toggles.forEach(el => {
    el.setAttribute('role', 'button'); el.tabIndex = 0;
    el.setAttribute('aria-label', 'Toggle navigation');
    el.setAttribute('aria-controls', 'site-menu'); el.setAttribute('aria-expanded', 'false');
    el.addEventListener('click', () => setMenu(!menuOpen), { signal });
  });
  root.querySelector('.fixed-nav-back')?.addEventListener('click', () => setMenu(false), { signal });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuOpen) setMenu(false);
    if (event.key === 'Tab' && menuOpen && nav) {
      const focusable = [...nav.querySelectorAll<HTMLElement>('a[href], button, [tabindex="0"]')];
      const first = focusable[0], last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
  }, { signal });

  const accessibleControl = (element: HTMLElement) => {
    if (!element.matches('button, input, a[href]')) {
      element.setAttribute('role', 'button'); element.tabIndex = 0;
      element.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); element.click(); }
      }, { signal });
    }
  };
  toggles.forEach(accessibleControl);
  let filterRevision = 0;
  const filterButtons = all('.toggle-row [data-category], .toggle-row [data-filter-all], .toggle-row .all-btn, .toggle-row .design-btn, .toggle-row .development-btn');
  const items = all('.mouse-pos-list-image li, .mouse-pos-list-image-wrap li, .work-tiles li');
  filterButtons.forEach(button => {
    accessibleControl(button);
    button.setAttribute('aria-pressed', String(button.classList.contains('active')));
    button.addEventListener('click', event => {
      event.preventDefault();
      if (button.classList.contains('active')) return;
      const revision = ++filterRevision;
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      filterButtons.forEach(control => {
        const selected = control === button;
        control.classList.toggle('active', selected); control.classList.toggle('not-active', !selected);
        control.setAttribute('aria-pressed', String(selected));
      });
      const category = button.hasAttribute('data-filter-all') || button.classList.contains('all-btn') ? null
        : button.dataset.category || (button.classList.contains('design-btn') ? 'Design' : 'Development');
      const fading = all('.work-tiles li, .work-items li');
      if (!reduced) fading.forEach(item => item.classList.add('tile-fade-out'));
      later(() => {
        if (revision !== filterRevision) return;
        items.forEach(item => {
          let categories: string[] = [];
          try { categories = JSON.parse(item.dataset.categories || '[]'); } catch { /* Legacy markup uses category classes. */ }
          const visible = !category || categories.includes(category) || (!item.dataset.categories && item.classList.contains(category.toLowerCase()));
          item.classList.toggle('visible', visible);
          item.inert = !visible; item.setAttribute('aria-hidden', String(!visible));
        });
        fading.forEach(item => { item.classList.remove('tile-fade-out'); if (!reduced) item.classList.add('tile-fade-in'); });
        window.scrollTo({ top: 0, behavior: 'instant' }); ScrollTrigger.refresh();
      }, reduced ? 0 : 300);
      later(() => { if (revision === filterRevision) { fading.forEach(item => item.classList.remove('tile-fade-in')); ScrollTrigger.refresh(); } }, reduced ? 0 : 700);
    }, { signal });
  });
  let viewRevision = 0;
  const viewButtons = all('.grid-row .rows-btn, .grid-row .columns-btn');
  viewButtons.forEach(button => {
    accessibleControl(button);
    button.setAttribute('aria-pressed', String(button.classList.contains('active')));
    button.addEventListener('click', event => {
      event.preventDefault(); if (button.classList.contains('active')) return;
      const revision = ++viewRevision;
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const columns = button.classList.contains('columns-btn');
      viewButtons.forEach(control => { const selected = control === button; control.classList.toggle('active', selected); control.classList.toggle('not-active', !selected); control.setAttribute('aria-pressed', String(selected)); });
      const fading = all('.grid-fade');
      if (!reduced) fading.forEach(item => item.classList.add('grid-fade-out'));
      window.scrollTo({ top: 0, behavior: 'instant' });
      later(() => {
        if (revision !== viewRevision) return;
        all('.grid-columns-part, .grid-rows-part').forEach(part => {
          const visible = part.classList.contains('grid-columns-part') === columns;
          part.classList.toggle('visible', visible); part.inert = !visible; part.setAttribute('aria-hidden', String(!visible));
        });
        fading.forEach(item => { item.classList.remove('grid-fade-out'); if (!reduced) item.classList.add('grid-fade-in'); });
        ScrollTrigger.refresh();
      }, reduced ? 0 : 300);
      later(() => { if (revision === viewRevision) { fading.forEach(item => item.classList.remove('grid-fade-in')); ScrollTrigger.refresh(); } }, reduced ? 0 : 700);
    }, { signal });
  });
  all('a[target="_blank"]').forEach(link => link.setAttribute('rel', 'noopener noreferrer'));
  all('a[href=""]').forEach(link => link.setAttribute('href', '/'));
  const form = root.querySelector<HTMLFormElement>('form');
  if (form) {
    form.querySelector('.btn-contact-send .btn-click')?.addEventListener('click', event => {
      // The entire round control is clickable even while its magnetic text moves.
      if (!(event.target instanceof HTMLInputElement)) form.requestSubmit();
    }, { signal });
    form.noValidate = true;
    form.removeAttribute('action'); form.removeAttribute('method');
    // Keep labels associated with their editable form controls.
    all('.form-col').forEach(column => {
      const field = column.querySelector<HTMLInputElement | HTMLTextAreaElement>('.field');
      const label = column.querySelector('label');
      if (field && label) label.htmlFor = field.id;
    });
    all('.field').forEach(element => {
      const field = element as HTMLInputElement;
      const onInput = () => {
        field.parentElement?.classList.toggle('not-empty', !!field.value.trim());
        field.removeAttribute('aria-invalid');
        field.removeAttribute('aria-describedby');
        root.querySelector(`#${field.id}-error`)?.remove();
      };
      field.addEventListener('input', onInput, { signal });
      field.addEventListener('blur', onInput, { signal });
    });
    form.addEventListener('submit', event => {
      event.preventDefault();
      all('.field-error').forEach(el => el.remove());
      const data = new FormData(form);
      const values: ContactValues = { name: String(data.get('name') || ''),
        email: String(data.get('email') || ''), message: String(data.get('message') || '') };
      const errors = validateContact(values);
      let first: HTMLElement | null = null;
      for (const [name, message] of Object.entries(errors)) {
        const field = form.elements.namedItem(name);
        if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement)) continue;
        field.setAttribute('aria-invalid', 'true');
        const error = document.createElement('span');
        error.className = 'field-error'; error.id = `${field.id}-error`;
        error.setAttribute('role', 'alert'); error.textContent = message;
        field.setAttribute('aria-describedby', error.id); field.after(error);
        first ??= field;
      }
      if (first) first.focus();
      else onSuccess();
    }, { signal });
  }
  // Preserve the existing callable cleanup; only the transition owner uses this hook.
  return Object.assign(() => { controller.abort(); timers.forEach(clearTimeout); document.body.style.overflow = ''; }, {
    closeForNavigation() { if (innerWidth > 540 && menuOpen) setMenu(false, true); },
  });
}
