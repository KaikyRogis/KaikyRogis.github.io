import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";
import sharp from "sharp";

const baseURL = process.env.CAPTURE_BASE_URL ?? "http://127.0.0.1:4173";
const outputRoot = path.resolve("tmp/capture-qa");
const viewports = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
};
const sections = [
  ["content", "01-hero"],
  ["about", "02-manifesto"],
  ["capabilities", "03-capabilities"],
  ["projects", "04-project-rail"],
  ["sintegrapro", "05-sintegrapro"],
  ["ominisafety", "06-ominisafety"],
  ["finance-os", "07-finance-os"],
  ["omnichat", "08-omnichat"],
  ["labs", "09-kaiky-labs"],
  ["experience", "10-experience"],
  ["skills", "11-skills"],
  ["education", "12-education"],
  ["contact", "13-contact"],
];

async function isReachable() {
  try {
    return (await fetch(baseURL)).ok;
  } catch {
    return false;
  }
}

async function waitForServer() {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (await isReachable()) return;
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Servidor de captura indisponível em ${baseURL}`);
}

async function perceptualHash(file) {
  const pixels = await sharp(file)
    .resize(16, 16, { fit: "fill" })
    .greyscale()
    .raw()
    .toBuffer();
  const mean = pixels.reduce((sum, value) => sum + value, 0) / pixels.length;
  return [...pixels].map((value) => (value >= mean ? "1" : "0")).join("");
}

function similarity(left, right) {
  let equal = 0;
  for (let index = 0; index < left.length; index += 1)
    if (left[index] === right[index]) equal += 1;
  return equal / left.length;
}

async function assertUnique(files) {
  const records = [];
  for (const file of files) {
    const bytes = await readFile(file);
    records.push({
      file,
      exact: createHash("sha256").update(bytes).digest("hex"),
      perceptual: await perceptualHash(file),
    });
  }
  const collisions = [];
  for (let left = 0; left < records.length; left += 1) {
    for (let right = left + 1; right < records.length; right += 1) {
      const score = similarity(
        records[left].perceptual,
        records[right].perceptual,
      );
      if (records[left].exact === records[right].exact || score >= 0.97)
        collisions.push(
          `${path.basename(records[left].file)} x ${path.basename(records[right].file)} (${score.toFixed(3)})`,
        );
    }
  }
  if (collisions.length)
    throw new Error(
      `Capturas repetidas ou quase idênticas:\n${collisions.join("\n")}`,
    );
}

async function preparePage(page) {
  await page.addInitScript(() => {
    sessionStorage.setItem("kaiky-os-visited", "1");
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(baseURL, { waitUntil: "networkidle" });
  await page.evaluate(
    () => (document.documentElement.dataset.capture = "true"),
  );
  await page.waitForSelector("main.motion-off");
  await page.waitForTimeout(100);
  await page.evaluate(async () => {
    await document.fonts.ready;
    const images = [...document.images];
    images.forEach((image) => (image.loading = "eager"));
    await Promise.race([
      Promise.all(
        images
          .filter((image) => !image.complete)
          .map(
            (image) =>
              new Promise((resolve) => {
                image.addEventListener("load", resolve, { once: true });
                image.addEventListener("error", resolve, { once: true });
              }),
          ),
      ),
      new Promise((resolve) => setTimeout(resolve, 15_000)),
    ]);
  });
}

async function captureSections(browser, name, viewport) {
  const folder = path.join(outputRoot, name);
  await mkdir(folder, { recursive: true });
  const context = await browser.newContext({
    viewport,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await preparePage(page);
  const files = [];
  for (const [id, filename] of sections) {
    const section = page.locator(`#${id}`);
    await section.scrollIntoViewIfNeeded();
    await page.evaluate(() =>
      document.activeElement instanceof HTMLElement
        ? document.activeElement.blur()
        : undefined,
    );
    await page.waitForTimeout(60);
    const file = path.join(folder, `${filename}-${name}.png`);
    await section.screenshot({ path: file, animations: "disabled" });
    files.push(file);
    console.log(`${name}: #${id}`);
  }
  const footer = page.locator("footer").last();
  const footerFile = path.join(folder, `14-footer-${name}.png`);
  await footer.scrollIntoViewIfNeeded();
  await footer.screenshot({ path: footerFile, animations: "disabled" });
  files.push(footerFile);
  await assertUnique(files);
  await context.close();
  return files;
}

async function captureMobileEvidence(browser) {
  const videoDir = path.join(outputRoot, "mobile-evidence");
  await mkdir(videoDir, { recursive: true });
  const context = await browser.newContext({
    viewport: viewports.mobile,
    reducedMotion: "reduce",
    recordVideo: { dir: videoDir, size: viewports.mobile },
  });
  await context.tracing.start({ screenshots: true, snapshots: true });
  const page = await context.newPage();
  await preparePage(page);
  const height = await page.evaluate(
    () => document.documentElement.scrollHeight,
  );
  for (let y = 0; y < height; y += 240) {
    await page.evaluate((position) => window.scrollTo(0, position), y);
    await page.waitForTimeout(45);
  }
  await page.evaluate(() =>
    window.scrollTo(0, document.documentElement.scrollHeight),
  );
  await page.waitForTimeout(300);
  await context.tracing.stop({
    path: path.join(videoDir, "mobile-scroll-trace.zip"),
  });
  const video = page.video();
  await context.close();
  const source = await video.path();
  const target = path.join(videoDir, "mobile-continuous-scroll.webm");
  const videoBytes = await readFile(source);
  await writeFile(target, videoBytes);
  if (source !== target) await rm(source, { force: true });
  return { trace: "mobile-scroll-trace.zip", video: path.basename(target) };
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });
let server;
if (!(await isReachable())) {
  server = spawn("npx", ["serve", "out", "-l", "4173", "--no-clipboard"], {
    shell: true,
    stdio: "ignore",
  });
  await waitForServer();
}

const browser = await chromium.launch({ headless: true });
try {
  const desktop = await captureSections(browser, "desktop", viewports.desktop);
  const mobile = await captureSections(browser, "mobile", viewports.mobile);
  const evidence = await captureMobileEvidence(browser);
  await writeFile(
    path.join(outputRoot, "manifest.json"),
    `${JSON.stringify(
      {
        version: "2.4.1",
        generatedAt: new Date().toISOString(),
        baseURL,
        desktop: desktop.map((file) => path.basename(file)),
        mobile: mobile.map((file) => path.basename(file)),
        evidence,
      },
      null,
      2,
    )}\n`,
  );
  console.log(
    `Capture QA aprovado: ${desktop.length} desktop, ${mobile.length} mobile, vídeo e trace em ${outputRoot}`,
  );
} finally {
  await browser.close();
  server?.kill();
}
