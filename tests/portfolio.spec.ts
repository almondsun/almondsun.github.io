import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";

const routes = [
  "/",
  "/projects/",
  "/projects/ragdoll/",
  "/projects/smallm/",
  "/notes/",
  "/about/",
  "/resume/",
] as const;

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

test("home prioritizes the résumé, RAGdoll, and two technical notes", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "View résumé" }).first()).toHaveAttribute(
    "href",
    "/Martin_Ramirez_Espinosa_Resume.pdf",
  );
  await expect(page.getByText(/Available for remote internships/).first()).toBeVisible();
  await expect(page.locator(".project-grid .project-card")).toHaveCount(3);
  await expect(page.locator(".project-grid .project-card").first().getByRole("heading")).toHaveText(
    "RAGdoll",
  );
  await expect(page.locator(".note-grid .note-card")).toHaveCount(2);
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
  expect(await portrait.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(
    0,
  );
  await expect(page.locator(".portrait picture source").first()).toHaveAttribute(
    "srcset",
    /_astro/,
  );
});

test("raster project images use responsive generated sources", async ({ page }) => {
  await page.goto("/projects/");
  const responsivePictures = page.locator(".project-image picture");
  await expect(responsivePictures).toHaveCount(3);
  for (let index = 0; index < 3; index += 1) {
    await expect(responsivePictures.nth(index).locator("source").first()).toHaveAttribute(
      "srcset",
      /_astro/,
    );
  }
});

test("case studies expose decisions, evidence, and limitations", async ({ page }) => {
  for (const slug of ["ragdoll", "smallm"] as const) {
    await page.goto(`/projects/${slug}/`);
    await expect(
      page.getByRole("heading", { name: "The choices that shaped the result." }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "What the evidence supports." })).toBeVisible();
    await expect(page.getByRole("heading", { name: "What remains unproven." })).toBeVisible();
    await expect(page.getByRole("link", { name: /Inspect the source/ })).toHaveAttribute(
      "href",
      /^https:\/\/github\.com\//,
    );
  }
});

test("résumé is readable online and downloadable as a PDF", async ({ page, request }) => {
  await page.goto("/resume/");
  await expect(
    page.getByRole("heading", { level: 1, name: "Martín Ramírez Espinosa" }),
  ).toBeVisible();
  await expect(page.getByText(/Available for remote internships/)).toBeVisible();
  await expect(page.getByRole("heading", { name: "Research & experience" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Download PDF" })).toHaveAttribute(
    "href",
    "/Martin_Ramirez_Espinosa_Resume.pdf",
  );

  const response = await request.get("/Martin_Ramirez_Espinosa_Resume.pdf");
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("application/pdf");
  expect((await response.body()).byteLength).toBeGreaterThan(20_000);
});

test("claim metadata records exact dates and source revisions", async () => {
  const sources = ["src/data/projects.ts", "src/data/caseStudies.ts"].map((path) =>
    readFileSync(path, "utf8"),
  );
  const dates = sources.flatMap((source) =>
    [...source.matchAll(/lastVerified: "([^"]+)"/g)].map((match) => match[1]),
  );
  const revisions = sources.flatMap((source) =>
    [...source.matchAll(/sourceRevision: "([^"]+)"/g)].map((match) => match[1]),
  );

  expect(dates).toHaveLength(8);
  expect(revisions).toHaveLength(8);
  for (const date of dates) expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  for (const revision of revisions) expect(revision).toMatch(/^[0-9a-f]{40}$/);
});

test("same-origin links resolve", async ({ page, request, baseURL }) => {
  const origin = new URL(baseURL ?? "http://127.0.0.1:4321").origin;
  const hrefs = new Set<string>();

  for (const route of routes) {
    await page.goto(route);
    for (const href of await page
      .locator("a[href]")
      .evaluateAll((links) => links.map((link) => (link as HTMLAnchorElement).href))) {
      const url = new URL(href);
      if (url.origin === origin) hrefs.add(`${url.pathname}${url.search}`);
    }
  }

  for (const href of hrefs) {
    const response = await request.get(href);
    expect(response.status(), `${href} should resolve`).toBeLessThan(400);
  }
});

test("unknown routes use the custom 404 page", async ({ page }) => {
  const response = await page.goto("/definitely-not-a-page/");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { level: 1, name: "This page does not exist." }),
  ).toBeVisible();
});
