import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("public/projects");
const errors = [];
async function visit(directory) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, item.name);
    if (item.isDirectory()) await visit(file);
    else if (/\.(png|jpe?g)$/i.test(item.name))
      errors.push(`${path.relative(root, file)} deve ser WebP/AVIF`);
    else if (/\.(webp|avif)$/i.test(item.name)) {
      const { size } = await stat(file);
      const limit = 450 * 1024;
      if (size > limit)
        errors.push(
          `${path.relative(root, file)} excede 450 KB (${Math.ceil(size / 1024)} KB)`,
        );
    }
  }
}
await visit(root);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(
  "Image budget approved: project assets are WebP/AVIF and within 450 KB.",
);
