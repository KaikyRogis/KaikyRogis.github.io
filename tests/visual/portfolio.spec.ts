import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const viewports = [
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 },
  { width: 1366, height: 768 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
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
    if (viewport.width <= 430)
      await expect(page.locator("#content")).toHaveScreenshot(
        `hero-${viewport.width}x${viewport.height}.png`,
        { maxDiffPixelRatio: 0.04 },
      );
    await page.locator("#projects").scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
    await page.evaluate(() =>
      (document.activeElement as HTMLElement | null)?.blur(),
    );
    await page.waitForTimeout(250);
    await expect(page.locator("#projects")).toHaveScreenshot(
      `projects-${viewport.width}x${viewport.height}.png`,
      { maxDiffPixelRatio: 0.04 },
    );
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth + 1,
    );
    expect(overflow).toBeFalsy();
    for (const slug of ["sintegrapro", "ominisafety", "finance-os", "omnichat"])
      await expect(page.locator(`#${slug}`)).toBeAttached();

    if (viewport.width < 900) {
      const rail = page.locator("#projects .project-rail");
      expect(
        await rail.evaluate((node) => getComputedStyle(node).overflowX),
      ).toBe("auto");
      expect(
        await page
          .locator("#projects .projects-intro")
          .evaluate((node) => getComputedStyle(node).position),
      ).toBe("static");
    }
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

test("primary evidence is not repeated in visible galleries", async ({
  page,
}) => {
  await page.addInitScript(() =>
    sessionStorage.setItem("kaiky-os-visited", "1"),
  );
  await page.goto("/");
  for (const slug of ["sintegrapro", "ominisafety", "finance-os", "omnichat"]) {
    const project = page.locator(`#${slug}`);
    const evidenceSrc = await project
      .locator(".project-evidence img")
      .getAttribute("src");
    const gallerySources = await project
      .locator(".project-gallery img")
      .evaluateAll((images) =>
        images.map((image) => image.getAttribute("src")),
      );
    expect(gallerySources).not.toContain(evidenceSrc);
  }
});

test("status grids omit empty groups and adapt their columns", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.addInitScript(() =>
    sessionStorage.setItem("kaiky-os-visited", "1"),
  );
  await page.goto("/");

  const expectedGroups: Record<string, number> = {
    sintegrapro: 2,
    ominisafety: 3,
    "finance-os": 3,
    omnichat: 3,
  };

  for (const [slug, expected] of Object.entries(expectedGroups)) {
    const grid = page.locator(`#${slug} .project-status-grid`);
    await expect(grid).toHaveAttribute("data-status-groups", String(expected));
    await expect(grid.locator(":scope > section")).toHaveCount(expected);
    await expect(grid.locator(":scope > section:empty")).toHaveCount(0);
  }

  const sintegraGrid = page.locator("#sintegrapro .project-status-grid");
  const columns = await sintegraGrid.evaluate(
    (node) => getComputedStyle(node).gridTemplateColumns.split(" ").length,
  );
  expect(columns).toBe(2);
  await expect(sintegraGrid).toHaveScreenshot(
    "sintegrapro-status-1440x900.png",
  );
});

test("mobile dock avoids contact and footer", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() =>
    sessionStorage.setItem("kaiky-os-visited", "1"),
  );
  await page.goto("/");
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect(page.locator(".section-progress")).not.toHaveClass(/visible/);
  await expect(page.locator(".utility-dock")).toHaveClass(/dock-suppressed/);
});

test("project progress disappears after project cases", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() =>
    sessionStorage.setItem("kaiky-os-visited", "1"),
  );
  await page.goto("/");
  await page.locator("#omnichat").scrollIntoViewIfNeeded();
  await expect(page.locator(".section-progress")).toHaveClass(/visible/);
  await page.locator("#labs").scrollIntoViewIfNeeded();
  await expect(page.locator(".section-progress")).not.toHaveClass(/visible/);
  await page.locator("#experience").scrollIntoViewIfNeeded();
  await expect(page.locator(".section-progress")).not.toHaveClass(/visible/);
});

test("mobile current section label is localized", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() =>
    sessionStorage.setItem("kaiky-os-visited", "1"),
  );

  await page.goto("/");
  await page.locator("#projects").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await expect(page.locator(".mobile-current")).toContainText(
    "SEÇÃO ATUAL · Projetos",
  );
  await expect(
    page.getByRole("button", { name: "03 / Projetos" }),
  ).toHaveAttribute("aria-current", "location");

  await page.goto("/en/");
  await page.locator("#projects").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.locator(".mobile-current")).toContainText(
    "CURRENT SECTION · Projects",
  );
  await expect(
    page.getByRole("button", { name: "03 / Projects" }),
  ).toHaveAttribute("aria-current", "location");
});

test("mobile skills accordion and labs rail are compact", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() =>
    sessionStorage.setItem("kaiky-os-visited", "1"),
  );
  await page.goto("/");
  const skillButtons = page.locator(
    "#skills .skill-grid article > h3 > button",
  );
  await expect(skillButtons.first()).toHaveAttribute("aria-expanded", "true");
  await skillButtons.nth(1).click();
  await expect(skillButtons.nth(1)).toHaveAttribute("aria-expanded", "true");
  expect(
    await page
      .locator("#labs .labs-grid")
      .evaluate((node) => getComputedStyle(node).overflowX),
  ).toBe("auto");
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
