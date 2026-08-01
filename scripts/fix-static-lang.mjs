import { readFileSync, writeFileSync } from "node:fs";

const file = "out/en/index.html";
const html = readFileSync(file, "utf8");
writeFileSync(file, html.replace('<html lang="pt-BR">', '<html lang="en">'));
console.log("Set the exported English document language to en.");
