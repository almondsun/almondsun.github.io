import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = ["/", "/projects/", "/notes/", "/about/"] as const;

for (const route of routes) {
  test(`${route} renders without serious accessibility violations`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("h1")).toBeVisible();
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(
      results.violations.filter((violation) =>
        ["serious", "critical"].includes(violation.impact ?? ""),
      ),
    ).toEqual([]);
  });
}

test("primary navigation reaches every public page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Projects", exact: true }).click();
  await expect(page).toHaveURL(/\/projects\/$/);
  await page.getByRole("link", { name: "Notes", exact: true }).click();
  await expect(page).toHaveURL(/\/notes\/$/);
  await page.getByRole("link", { name: "About", exact: true }).click();
  await expect(page).toHaveURL(/\/about\/$/);
  await page.getByRole("link", { name: /Martín Ramírez Espinosa, home/ }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("theme selection persists across navigation", async ({ page }) => {
  await page.goto("/");
  const initialTheme = await page.locator("html").getAttribute("data-theme");
  await page.getByRole("button", { name: /Use .* theme/ }).click();
  const selectedTheme = await page.locator("html").getAttribute("data-theme");
  expect(selectedTheme).not.toBe(initialTheme);
  await page.goto("/projects/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", selectedTheme ?? "");
});

test("all project images load", async ({ page }) => {
  await page.goto("/projects/");
  const images = page.locator(".project-image img");
  await expect(images).toHaveCount(6);
  for (let index = 0; index < 6; index += 1) {
    await images.nth(index).scrollIntoViewIfNeeded();
    await expect(images.nth(index)).toHaveJSProperty("complete", true);
    expect(
      await images.nth(index).evaluate((image: HTMLImageElement) => image.naturalWidth),
    ).toBeGreaterThan(0);
  }
});

test("technical notes expose six real public artifacts", async ({ page }) => {
  await page.goto("/notes/");
  const notes = page.locator(".note-card");
  await expect(notes).toHaveCount(6);
  const links = notes.getByRole("link", { name: /Read the artifact/ });
  await expect(links).toHaveCount(6);
  for (let index = 0; index < 6; index += 1) {
    await expect(links.nth(index)).toHaveAttribute("href", /^https:\/\//);
  }
});

test("home surfaces three featured technical notes", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".note-grid .note-card")).toHaveCount(3);
});

test("professional identity metadata links GitHub, LinkedIn, and GCPDS", async ({ page }) => {
  await page.goto("/");
  const identity = await page.locator('script[type="application/ld+json"]').textContent();
  expect(identity).toContain("https://github.com/almondsun");
  expect(identity).toContain("https://www.linkedin.com/in/martin-ramirez-espinosa/");
  expect(identity).toContain("Grupo de Control y Procesamiento Digital de Señales (GCPDS)");
});

test("the primary portrait loads", async ({ page }) => {
  await page.goto("/");
  const portrait = page.getByAltText("Portrait of Martín Ramírez Espinosa");
  await expect(portrait).toBeVisible();
  await expect(portrait).toHaveJSProperty("complete", true);
  expect(await portrait.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBe(1086);
});

test("unknown routes use the custom 404 page", async ({ page }) => {
  const response = await page.goto("/definitely-not-a-page/");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { level: 1, name: "This page does not exist." }),
  ).toBeVisible();
});
