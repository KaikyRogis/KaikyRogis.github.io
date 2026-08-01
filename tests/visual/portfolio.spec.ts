import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const viewports = [
  { width: 1366, height: 768 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
];

for (const viewport of viewports) {
  test(`evidence-first ${viewport.width}x${viewport.height}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.addInitScript(() =>
      sessionStorage.setItem("kaiky-os-visited", "1"),
    );
    await page.goto("/");
    await page.locator("#projects").scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
    await expect(page.locator("#projects")).toHaveScreenshot(
      `projects-${viewport.width}x${viewport.height}.png`,
    );
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth + 1,
    );
    expect(overflow).toBeFalsy();
    for (const slug of ["sintegrapro", "ominisafety", "finance-os", "omnichat"])
      await expect(page.locator(`#${slug}`)).toBeAttached();
  });
}

test("rail cards never sit legibly under the intro", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.addInitScript(() =>
    sessionStorage.setItem("kaiky-os-visited", "1"),
  );
  await page.goto("/");
  await page.locator("#projects").scrollIntoViewIfNeeded();
  const intro = page.locator("#projects > .projects-intro");
  const firstCard = page.locator("[data-project-card]").first();
  const [a, b] = await Promise.all([
    intro.boundingBox(),
    firstCard.boundingBox(),
  ]);
  expect(a && b && a.x + a.width > b.x && b.x + b.width > a.x).toBeFalsy();
});

test("professional, reduced motion, English, menu and lightbox", async ({
  page,
}) => {
  await page.setViewportSize({ width: 430, height: 932 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() =>
    sessionStorage.setItem("kaiky-os-visited", "1"),
  );
  await page.goto("/en/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.locator("#mobile-menu")).toBeVisible();
  await page
    .getByRole("button", { name: "Switch to Professional mode" })
    .click();
  await page.getByRole("button", { name: "Close menu" }).click();
  await page.locator("#ominisafety").scrollIntoViewIfNeeded();
  await page
    .locator("#ominisafety .project-gallery figure button")
    .first()
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
});

test("125 percent zoom keeps projects usable", async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.addInitScript(() => {
    sessionStorage.setItem("kaiky-os-visited", "1");
    document.documentElement.style.zoom = "1.25";
  });
  await page.goto("/");
  await page.locator("#projects").scrollIntoViewIfNeeded();
  await expect(page.locator("#projects")).toBeVisible();
});

test("axe has no serious or critical violations", async ({ page }) => {
  await page.addInitScript(() =>
    sessionStorage.setItem("kaiky-os-visited", "1"),
  );
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  expect(
    results.violations.filter((item) =>
      ["serious", "critical"].includes(item.impact ?? ""),
    ),
  ).toEqual([]);
});
