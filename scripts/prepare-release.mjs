import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const output = path.join(root, "dist");
const excludedNames = new Set([
  "$null",
  ".git",
  ".github",
  ".lighthouseci",
  "_astro",
  "audit",
  "cloudflare-audit.mjs",
  "cloudflare-dns-audit.mjs",
  "dist",
  "final-push.bat",
  "indexnow-key.txt",
  "node_modules",
  "scripts",
  "SITE-AUDIT-2026-PREVIEW.md",
  "ai-feeder-engine.js",
  "package-lock.json",
  "lighthouserc.json",
  "package.json",
]);

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

function copy(directory, destination) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (
      excludedNames.has(entry.name) ||
      (entry.name.endsWith(".md") && entry.name !== "EVIDENCE-INVENTORY.md")
    ) {
      continue;
    }
    if (entry.name.startsWith("screenshot-")) continue;
    const source = path.join(directory, entry.name);
    const target = path.join(destination, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(target, { recursive: true });
      copy(source, target);
    } else {
      fs.copyFileSync(source, target);
    }
  }
}

copy(root, output);

const publicEvidenceInventory = path.join(output, "EVIDENCE-INVENTORY.md");
if (!fs.existsSync(publicEvidenceInventory)) {
  throw new Error("Public evidence inventory is missing from the release artifact.");
}

console.log(`Prepared Cloudflare release in ${output}.`);
