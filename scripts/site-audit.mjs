import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const site = "https://thenitishkr.in";
const ignoredDirectories = new Set([".git", ".github", "audit", "dist", "node_modules", "scripts"]);
const errors = [];
const warnings = [];

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name.startsWith(".") || ignoredDirectories.has(entry.name)) return [];
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(absolute);
    return entry.isFile() && entry.name.endsWith(".html") ? [absolute] : [];
  });
}

function relative(file) {
  return path.relative(root, file).replaceAll("\\", "/");
}

function expectedCanonical(file) {
  const name = relative(file);
  return name === "index.html"
    ? `${site}/`
    : `${site}/${name.replace(/\/index\.html$/, "")}/`;
}

function match(html, pattern) {
  return html.match(pattern)?.[1]?.trim() || "";
}

function localTarget(fromFile, href) {
  const clean = href.split(/[?#]/, 1)[0];
  if (!clean || clean.startsWith("#")) return null;
  if (/^(\/\/|https?:|mailto:|tel:|javascript:)/i.test(clean)) return null;
  const base = clean.startsWith("/")
    ? path.join(root, clean.slice(1))
    : path.resolve(path.dirname(fromFile), clean);
  if (path.extname(base)) return base;
  return path.join(base, "index.html");
}

const files = walk(root);
const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");

for (const file of files) {
  const name = relative(file);
  const html = fs.readFileSync(file, "utf8");
  const title = match(html, /<title>([\s\S]*?)<\/title>/i);
  const description = match(
    html,
    /<meta\s+name=["']description["']\s+content=["']([^"']*)["'][^>]*>/i,
  );
  const canonical = match(
    html,
    /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["'][^>]*>/i,
  );
  const robots = match(
    html,
    /<meta\s+name=["']robots["']\s+content=["']([^"']*)["'][^>]*>/i,
  );
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  const jsonBlocks = [
    ...html.matchAll(
      /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ];

  if (!title) errors.push(`${name}: missing title`);
  if (title.length > 60) errors.push(`${name}: title is ${title.length} characters`);
  if (!description) errors.push(`${name}: missing meta description`);
  if (description.length > 160) {
    errors.push(`${name}: meta description is ${description.length} characters`);
  }
  if (h1Count !== 1) errors.push(`${name}: expected one H1, found ${h1Count}`);
  if (canonical !== expectedCanonical(file)) {
    errors.push(`${name}: canonical must be ${expectedCanonical(file)}`);
  }
  if (!/name=["']twitter:card["']/i.test(html)) {
    errors.push(`${name}: missing X/Twitter card metadata`);
  }
  if (!/property=["']og:title["']/i.test(html) || !/property=["']og:image["']/i.test(html)) {
    errors.push(`${name}: incomplete Open Graph metadata`);
  }
  if (!jsonBlocks.length) errors.push(`${name}: missing JSON-LD`);
  for (const [index, block] of jsonBlocks.entries()) {
    try {
      JSON.parse(block[1]);
    } catch (error) {
      errors.push(`${name}: invalid JSON-LD block ${index + 1}: ${error.message}`);
    }
  }

  const indexable = !robots.toLowerCase().includes("noindex");
  if (indexable && !sitemap.includes(`<loc>${canonical}</loc>`)) {
    errors.push(`${name}: canonical URL is absent from sitemap.xml`);
  }
  if (!indexable && sitemap.includes(`<loc>${canonical}</loc>`)) {
    errors.push(`${name}: noindex URL must not appear in sitemap.xml`);
  }

  for (const image of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = image[0];
    if (!/\balt=["'][^"']*["']/i.test(tag)) errors.push(`${name}: image missing alt attribute`);
    if (!/\bwidth=["']\d+["']/i.test(tag) || !/\bheight=["']\d+["']/i.test(tag)) {
      errors.push(`${name}: image missing fixed width and height attributes`);
    }
    if (/\bloading=["']eager["']/i.test(tag) && !/\bfetchpriority=["']high["']/i.test(tag)) {
      warnings.push(`${name}: eager image should declare fetchpriority="high"`);
    }
    const source = match(tag, /\bsrc=["']([^"']+)["']/i);
    if (!source || /^https?:/i.test(source) || source.startsWith("data:")) continue;
    const target = localTarget(file, source);
    if (!target || !fs.existsSync(target)) {
      errors.push(`${name}: missing image ${source}`);
      continue;
    }
    if (fs.statSync(target).size > 1_000_000) {
      errors.push(`${name}: referenced image exceeds 1 MB: ${source}`);
    }
  }

  for (const link of html.matchAll(/\bhref=["']([^"']+)["']/gi)) {
    const target = localTarget(file, link[1]);
    if (target && !fs.existsSync(target)) errors.push(`${name}: broken internal link ${link[1]}`);
  }

  if (/\.html(?:["'#?]|$)/i.test(canonical)) {
    errors.push(`${name}: canonical leaks .html`);
  }
  if (!/<main\b/i.test(html)) warnings.push(`${name}: no main landmark`);
}

for (const required of ["robots.txt", "sitemap.xml", "news-sitemap.xml", "feed.xml", "llms.txt"]) {
  if (!fs.existsSync(path.join(root, required))) errors.push(`missing required discovery file: ${required}`);
}

if (warnings.length) {
  console.warn(`Warnings (${warnings.length}):\n- ${warnings.join("\n- ")}`);
}
if (errors.length) {
  console.error(`Audit failed (${errors.length}):\n- ${errors.join("\n- ")}`);
  process.exit(1);
}

console.log(`Audit passed: ${files.length} pages checked for SEO, AEO, accessibility structure, schema, links and image weight.`);
