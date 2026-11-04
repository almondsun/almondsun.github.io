// Run using the official isolated Playwright CLI on an authorized loopback preview.
async page => {
  const base = new URL(page.url()).origin;
  if (!/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(base)) throw new Error('A loopback preview is required');
  const out = [];
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto(base + '/about');
    await page.waitForTimeout(2300);
    await page.mouse.move(width / 2, 700);
    for (let i = 0; i < 15; i++) { await page.mouse.wheel(0, 600); await page.waitForTimeout(100); }
    const toggle = page.locator('.btn-hamburger');
    await toggle.click();
    await page.waitForTimeout(900);
    await page.keyboard.press('Escape');
    const manual = await toggle.evaluate(el => ({ expanded: el.getAttribute('aria-expanded'), focused: document.activeElement === el }));
    if (manual.expanded !== 'false' || !manual.focused) throw new Error('Escape did not restore the toggle focus');
    await toggle.click();
    await page.waitForTimeout(900);
    await page.evaluate(() => {
      const outgoing = document.querySelector('main');
      window.__menuTransition = { rows: [], finished: false };
      const start = performance.now();
      function tick() {
        const screen = document.querySelector('.loading-screen').getBoundingClientRect();
        if (document.querySelector('main') === outgoing && screen.y > 0 && screen.y < innerHeight - 1) {
          window.__menuTransition.rows.push({ nav: outgoing.classList.contains('nav-active'), locked: document.documentElement.classList.contains('is-transitioning'), overflow: document.body.style.overflow, toggleFocused: document.activeElement?.matches('.btn-hamburger, .btn-menu') });
        }
        if (performance.now() - start < 2800) requestAnimationFrame(tick);
        else window.__menuTransition.finished = true;
      }
      requestAnimationFrame(tick);
    });
    await page.locator('.fixed-nav a').filter({ hasText: /^Work$/ }).first().click();
    await page.waitForFunction(() => window.__menuTransition.finished);
    const result = await page.evaluate(() => ({ rows: window.__menuTransition.rows, path: location.pathname, locked: document.documentElement.classList.contains('is-transitioning'), headingFocused: document.activeElement?.tagName === 'H1' }));
    if (!result.rows.length) throw new Error('No outgoing coverage samples observed');
    if (result.rows.some(row => row.nav !== (width <= 540) || !row.locked || row.overflow !== 'hidden' || row.toggleFocused)) throw new Error('Incorrect navigation closure: ' + JSON.stringify({ width, result }));
    if (result.path !== '/work' || result.locked || !result.headingFocused) throw new Error('Navigation did not settle accessibly');
    out.push({ width, samples: result.rows.length, manual, settled: true });
  }
  return out;
}
