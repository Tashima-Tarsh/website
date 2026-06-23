import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const site = "https://thenitishkr.in";
const excludedDirs = new Set([".git", ".github", "node_modules", "dist", "audit", "scripts"]);
const excludedDocNames = new Set(["disha-whitepaper-what-it-can-what-it-did.pdf"]);

function walk(dir, visit) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (excludedDirs.has(entry.name)) continue;
      walk(path.join(dir, entry.name), visit);
      continue;
    }
    visit(path.join(dir, entry.name));
  }
}

function escapeXml(value) {
  return String(value || "").replace(/[<>&"']/g, (c) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "\"": "&quot;",
    "'": "&apos;",
  })[c]);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function extract(html, regex) {
  return html.match(regex)?.[1]?.trim() || "";
}

function htmlItems() {
  const items = [];
  walk(root, (file) => {
    if (path.basename(file) !== "index.html") return;
    const html = read(file);
    const canonical = extract(html, /<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
    const robots = extract(html, /<meta\s+[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i).toLowerCase();
    if (!canonical || robots.includes("noindex")) return;

    items.push({
      url: canonical,
      title: extract(html, /<title>([^<]+)<\/title>/i),
      description: extract(html, /<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i),
      mtime: fs.statSync(file).mtime,
    });
  });
  return items.sort((a, b) => a.url.localeCompare(b.url));
}

function docItems() {
  const docsDir = path.join(root, "assets", "docs");
  if (!fs.existsSync(docsDir)) return [];

  return fs.readdirSync(docsDir)
    .filter((name) => /\.pdf$/i.test(name) && !excludedDocNames.has(name))
    .sort((a, b) => a.localeCompare(b))
    .map((name) => ({
      url: `${site}/assets/docs/${encodeURIComponent(name)}`,
      mtime: fs.statSync(path.join(docsDir, name)).mtime,
    }));
}

function buildSitemap(pages, docs) {
  const entries = [
    ...pages.map((item) => `  <url><loc>${escapeXml(item.url)}</loc><lastmod>${item.mtime.toISOString().slice(0, 10)}</lastmod><changefreq>weekly</changefreq><priority>${item.url === `${site}/` ? "1.0" : "0.8"}</priority></url>`),
    ...docs.map((item) => `  <url><loc>${escapeXml(item.url)}</loc><lastmod>${item.mtime.toISOString().slice(0, 10)}</lastmod><changefreq>monthly</changefreq><priority>0.5</priority></url>`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`;
  fs.writeFileSync(path.join(root, "sitemap.xml"), xml);
}

function buildFeed(pages) {
  const items = [...pages]
    .sort((a, b) => b.mtime - a.mtime)
    .slice(0, 60)
    .map((item) => `<item><title>${escapeXml(item.title || item.url)}</title><link>${escapeXml(item.url)}</link><guid isPermaLink="true">${escapeXml(item.url)}</guid><pubDate>${item.mtime.toUTCString()}</pubDate><description>${escapeXml(item.description || "Public-interest article and evidence record from thenitishkr.in")}</description></item>`)
    .join("\n");

  const now = new Date().toUTCString();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>thenitishkr.in articles and evidence records</title><link>${site}/</link><description>Article 12, DISHA, digital constitutional personhood, and intelligence case records from thenitishkr.in.</description><lastBuildDate>${now}</lastBuildDate>\n${items}\n</channel></rss>\n`;
  fs.writeFileSync(path.join(root, "feed.xml"), xml);
  fs.writeFileSync(path.join(root, "rss.xml"), xml);
}

const pages = htmlItems();
const docs = docItems();
buildSitemap(pages, docs);
buildFeed(pages);
console.log(`Generated discovery files for ${pages.length} pages and ${docs.length} docs.`);
