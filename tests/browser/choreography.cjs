// Run through the installed official Playwright CLI's run-code --filename option.
// Open an isolated loopback preview first; no original-site mutation is performed.
async page => {
  const base = new URL(page.url()).origin;
  if (!/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(base)) throw new Error('A loopback preview is required');
  await page.bringToFront();
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(base + '/');
  const cold = await page.evaluate(() => new Promise(resolve => {
    const start = performance.now(); let phase;
    function tick() {
      const screen = document.querySelector('.loading-screen').getBoundingClientRect();
      if (screen.y < -400 && screen.y > -500 && !phase) {
        phase = { screen: screen.y, entry: new DOMMatrixReadOnly(getComputedStyle(document.querySelector('main .once-in')).transform).m42 };
      }
      if (performance.now() - start < 4400) requestAnimationFrame(tick); else resolve(phase);
    }
    requestAnimationFrame(tick);
  }));
  if (!cold || cold.entry < 100 || cold.entry > 260) throw new Error('Cold Home entry was overwritten by parallax: ' + JSON.stringify(cold));
  const late = await page.evaluate(() => new Promise(resolve => {
    const descriptor = Object.getOwnPropertyDescriptor(Document.prototype, 'title');
    const start = performance.now(); let mount = null; let movement = null;
    Object.defineProperty(document, 'title', { configurable: true, get() { return descriptor.get.call(this); }, set(value) {
      if (value.startsWith('Creating')) {
        const until = performance.now() + 250;
        while (performance.now() < until) { /* Deliberately emulate expensive synchronous layout work. */ }
        mount = performance.now() - start;
      }
      return descriptor.set.call(this, value);
    } });
    function tick() {
      const y = new DOMMatrixReadOnly(getComputedStyle(document.querySelector('main .once-in')).transform).m42;
      if (mount !== null && location.pathname === '/work' && movement === null && y < 449) movement = performance.now() - start;
      if (performance.now() - start < 3400) requestAnimationFrame(tick);
      else { delete document.title; resolve({ mount, movement, hold: movement - mount }); }
    }
    document.querySelector('.nav-bar a[href="/work"]').click(); requestAnimationFrame(tick);
  }));
  if (!late.mount || !late.movement || late.hold < 780) throw new Error('Late mount shortened the entry hold: ' + JSON.stringify(late));
  return { cold, late };
}
