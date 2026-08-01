import { existsSync, readFileSync, readdirSync } from "node:fs";
import { extname, join, resolve } from "node:path";

const root = resolve("out");
const htmlFiles = [];
function walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (extname(entry.name) === ".html") htmlFiles.push(path);
  }
}
walk(root);
const failures = [];
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const ids = new Set(
    [...html.matchAll(/\sid=["']([^"']+)["']/g)].map((match) => match[1]),
  );
  for (const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/g)) {
    const reference = match[1];
    if (/^(?:https?:|mailto:|data:|blob:)/.test(reference)) continue;
    const [pathname, hash] = reference.split("#");
    if (!pathname && hash && !ids.has(hash))
      failures.push(`${file}: missing #${hash}`);
    if (!pathname || pathname.startsWith("_next/")) continue;
    const clean = pathname.split("?")[0].replace(/^\//, "");
    const target = resolve(root, clean);
    if (
      ![target, join(target, "index.html"), `${target}.html`].some(existsSync)
    )
      failures.push(`${file}: missing ${reference}`);
  }
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(
  `Validated ${htmlFiles.length} HTML files with no broken internal links.`,
);
