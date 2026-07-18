import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = ["/", "/projects/", "/about/"] as const;

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

test("unknown routes use the custom 404 page", async ({ page }) => {
  const response = await page.goto("/definitely-not-a-page/");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { level: 1, name: "This page does not exist." }),
  ).toBeVisible();
});
