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
    await page.evaluate(() => {
      const projects = document.querySelector<HTMLElement>("#projects");
      if (projects)
        window.scrollTo({ top: projects.offsetTop, behavior: "auto" });
    });
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

test("hero identity stays visible and desktop rail cards fit vertically", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.addInitScript(() =>
    sessionStorage.setItem("kaiky-os-visited", "1"),
  );
  await page.goto("/");

  const heroCopy = page.locator(".hero-copy");
  await expect(heroCopy).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /Kaiky Rogis/i }),
  ).toBeVisible();
  expect(
    await heroCopy.evaluate((node) => getComputedStyle(node).opacity),
  ).toBe("1");

  const projectsIntro = page.locator("#projects > .projects-intro");
  expect(
    await projectsIntro.evaluate((node) => getComputedStyle(node).position),
  ).toBe("absolute");

  await page.locator("#projects").scrollIntoViewIfNeeded();
  const cardBoxes = await page
    .locator("[data-project-card]")
    .evaluateAll((cards) =>
      cards.map((card) => card.getBoundingClientRect().toJSON()),
    );
  for (const box of cardBoxes) {
    expect(box.height).toBeLessThanOrEqual(730);
    expect(box.y).toBeGreaterThanOrEqual(68);
    expect(box.bottom).toBeLessThanOrEqual(900);
  }
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
  await page.locator("#ominisafety .gallery-feature-image").click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
});

test("project galleries keep complete images and switch the featured evidence", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.addInitScript(() =>
    sessionStorage.setItem("kaiky-os-visited", "1"),
  );
  await page.goto("/");
  const gallery = page.locator("#ominisafety .project-gallery");
  await gallery.scrollIntoViewIfNeeded();

  const featured = gallery.locator(".gallery-feature-image img");
  await expect(featured).toHaveAttribute("src", /gestao-empresas/);
  expect(
    await featured.evaluate((node) => getComputedStyle(node).objectFit),
  ).toBe("contain");

  const thumbnails = gallery.locator(".gallery-filmstrip > button");
  await expect(thumbnails).toHaveCount(2);
  await thumbnails.nth(1).click();
  await expect(featured).toHaveAttribute("src", /catalogo-ehs/);
  await expect(thumbnails.nth(1)).toHaveAttribute("aria-pressed", "true");

  for (const selector of [
    "#ominisafety .project-evidence img",
    '[data-project-card="ominisafety"] .project-card-evidence img',
    "#ominisafety .gallery-thumb-image img",
  ]) {
    expect(
      await page
        .locator(selector)
        .first()
        .evaluate((node) => getComputedStyle(node).objectFit),
    ).toBe("contain");
  }
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

test("project card opens the matching evidence with cinematic fallback", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => {
    sessionStorage.setItem("kaiky-os-visited", "1");
    Object.defineProperty(document, "startViewTransition", {
      value: undefined,
      configurable: true,
    });
  });
  await page.goto("/");
  const card = page.locator('[data-project-card="sintegrapro"]');
  await card.scrollIntoViewIfNeeded();
  await card.getByRole("button", { name: "ABRIR ESTUDO" }).click();
  await expect(page.locator("#sintegrapro .project-evidence")).toBeInViewport({
    ratio: 0.25,
  });
});

test("manual motion control keeps project evidence fully visible", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() =>
    sessionStorage.setItem("kaiky-os-visited", "1"),
  );
  await page.goto("/");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await page.getByRole("button", { name: "Desativar animações" }).click();
  await page.getByRole("button", { name: "Fechar menu" }).click();
  await page.locator("#ominisafety").scrollIntoViewIfNeeded();
  const evidence = page.locator("#ominisafety .project-evidence");
  await expect(evidence).toBeVisible();
  expect(
    await evidence.evaluate((node) => getComputedStyle(node).opacity),
  ).toBe("1");
  await expect(page.locator("main")).toHaveClass(/motion-off/);
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

test("contact navigation remains active at the end of the page", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.addInitScript(() =>
    sessionStorage.setItem("kaiky-os-visited", "1"),
  );
  await page.goto("/");
  await page.getByRole("button", { name: "Contato", exact: true }).click();
  await expect
    .poll(
      () =>
        page.locator("#contact").evaluate((node) => {
          const rect = node.getBoundingClientRect();
          const readingLine = window.innerHeight * 0.35;
          return rect.top <= readingLine && rect.bottom > readingLine;
        }),
      { timeout: 10_000 },
    )
    .toBe(true);
  await expect(
    page.getByRole("button", { name: "Contato", exact: true }),
  ).toHaveAttribute("aria-current", "location");
  await expect(
    page.getByRole("button", { name: "Formação", exact: true }),
  ).not.toHaveAttribute("aria-current", "location");
});

test("Finance OS transactions screenshot has accurate accessible text", async ({
  page,
}) => {
  await page.addInitScript(() =>
    sessionStorage.setItem("kaiky-os-visited", "1"),
  );

  await page.goto("/");
  const ptImage = page
    .getByRole("img", {
      name: "Movimentações demonstrativas do Finance OS",
    })
    .first();
  await expect(ptImage).toBeVisible();
  await expect(ptImage).toHaveAttribute(
    "src",
    /\/projects\/finance-os\/movimentacoes\.webp$/,
  );

  await page.goto("/en/");
  await expect(
    page
      .getByRole("img", {
        name: "Finance OS demonstration transactions",
      })
      .first(),
  ).toBeVisible();
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

test("professional experience contains no unverified RB1 or RB4 claim", async ({
  page,
}) => {
  await page.addInitScript(() =>
    sessionStorage.setItem("kaiky-os-visited", "1"),
  );

  await page.goto("/");
  const ptExperience = page.locator("#experience");
  await expect(ptExperience).toContainText(
    "Vivência com sistemas corporativos como SAP, Tasy e Ronda",
  );
  await expect(ptExperience).not.toContainText(/RB1|RB4|Inox/i);

  await page.goto("/en/");
  const enExperience = page.locator("#experience");
  await expect(enExperience).toContainText(
    "Experience with corporate systems such as SAP, Tasy and Ronda",
  );
  await expect(enExperience).not.toContainText(/RB1|RB4|Inox/i);
});
