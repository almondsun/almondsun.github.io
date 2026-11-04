// Run through the installed official Playwright CLI against an isolated loopback preview.
async page => {
  const origin = new URL(page.url()).origin;
  if (!/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) throw new Error('A loopback preview is required');
  const failures = [], pageErrors = [], requests = [];
  const onError = error => pageErrors.push(error.message);
  const onRequest = request => {
    if (request.method() !== 'GET' || (!request.url().startsWith(origin + '/') && !request.url().startsWith('data:'))) requests.push({ method: request.method(), url: request.url() });
  };
  const onResponse = response => { if (response.status() >= 400) failures.push(`HTTP ${response.status()} ${response.url()}`); };
  const check = (condition, message) => { if (!condition) failures.push(message); };
  const settle = async () => {
    await page.locator('main h1').waitFor();
    await page.waitForFunction(() => !document.documentElement.classList.contains('is-transitioning'));
    await page.evaluate(() => document.fonts.ready);
  };
  page.on('pageerror', onError); page.on('request', onRequest); page.on('response', onResponse);
  try {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(origin + '/work'); await settle();
    const projects = await page.locator('.work-tiles a[href^="/work/"]').evaluateAll(links => [...new Set(links.map(a => a.getAttribute('href')))]);
    check(projects.length > 0, 'Expected the shipped placeholder projects');
    const routes = ['/', '/work', '/about', '/contact', '/archive', '/styleguide', '/error', '/success', ...projects];
    for (const width of [390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const route of routes) {
        await page.goto(origin + route); await settle();
        const state = await page.evaluate(() => ({
          mains: document.querySelectorAll('main').length,
          overflow: document.documentElement.scrollWidth > innerWidth + 1,
          leaks: /Dennis|Snellenberg|\/media\/pages\//i.test(document.body.innerText),
          broken: [...document.images].some(image => {
            const box = image.getBoundingClientRect();
            return image.currentSrc && box.width > 0 && box.height > 0 && image.complete && image.naturalWidth === 0;
          }),
        }));
        check(state.mains === 1 && !state.overflow && !state.leaks && !state.broken, `${width} ${route}: ${JSON.stringify(state)}`);
      }
    }
    await page.goto(origin + '/work'); await settle();
    const categories = await page.locator('.toggle-row [data-category]').evaluateAll(buttons => buttons.map(button => button.dataset.category));
    for (const category of categories) {
      const button = page.locator('.toggle-row [data-category]');
      const index = categories.indexOf(category);
      await button.nth(index).click();
      await page.waitForFunction(category => [...document.querySelectorAll('.work-tiles li[data-project]')].every(item => item.classList.contains('visible') === JSON.parse(item.dataset.categories).includes(category)), category);
      check(await button.nth(index).getAttribute('aria-pressed') === 'true', `Filter ${category} state`);
    }
    await page.locator('[data-filter-all]').click();
    await page.waitForFunction(() => [...document.querySelectorAll('.work-tiles li[data-project]')].every(item => item.classList.contains('visible')));
    for (const [button, section] of [['.columns-btn', '.grid-columns-part'], ['.rows-btn', '.grid-rows-part']]) {
      await page.locator(button).click();
      await page.waitForFunction(selector => document.querySelector(selector).classList.contains('visible'), section);
      check(await page.locator(button).getAttribute('aria-pressed') === 'true', `${button} state`);
    }
    await page.locator('.grid-rows-part a[href^="/work/"]').first().click();
    await settle(); check(new URL(page.url()).pathname === projects[0], 'First project navigation');
    await page.goBack(); await settle(); check(new URL(page.url()).pathname === '/work', 'Project Back navigation');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(origin + '/'); await settle();
    await page.locator('.nav-bar .btn-menu').click();
    check(await page.locator('main').evaluate(main => main.classList.contains('nav-active')), 'Mobile menu open');
    await page.keyboard.press('Escape');
    check(!await page.locator('main').evaluate(main => main.classList.contains('nav-active')), 'Mobile menu Escape');
    await page.goto(origin + '/contact'); await settle();
    await page.locator('input[type="submit"]').click();
    check(await page.locator('.field-error').count() === 3, 'Local contact validation');
    await page.locator('[name="name"]').fill('Test Example');
    await page.locator('[name="email"]').fill('test@example.com');
    await page.locator('[name="message"]').fill('This message remains local.');
    await page.locator('input[type="submit"]').click();
    await page.waitForURL(origin + '/success'); await settle();
    check(requests.length === 0, 'Unexpected external or non-GET request');
    check(pageErrors.length === 0, 'Page errors: ' + pageErrors.join('; '));
    if (failures.length) throw new Error(JSON.stringify({ failures, requests }));
    return { routeViewportChecks: routes.length * 3, projects: projects.length, categories: categories.length, failures, pageErrors, requests };
  } finally {
    page.off('pageerror', onError); page.off('request', onRequest); page.off('response', onResponse);
  }
}
