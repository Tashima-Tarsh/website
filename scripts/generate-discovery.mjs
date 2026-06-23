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

function datePublished(html) {
  return extract(html, /"datePublished"\s*:\s*"([^"]+)"/i)
    || extract(html, /<meta\s+[^>]*property=["']article:published_time["'][^>]*content=["']([^"']+)["']/i);
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
      published: datePublished(html),
      isNews: /"@type"\s*:\s*(?:"(?:Analysis|Reportage)?NewsArticle"|\[[^\]]*"(?:Analysis|Reportage)?NewsArticle")/i.test(html),
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

function buildSitemap(pages) {
  const entries = [
    ...pages.map((item) => `  <url><loc>${escapeXml(item.url)}</loc><lastmod>${item.mtime.toISOString().slice(0, 10)}</lastmod><changefreq>weekly</changefreq><priority>${item.url === `${site}/` ? "1.0" : "0.8"}</priority></url>`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`;
  fs.writeFileSync(path.join(root, "sitemap.xml"), xml);
}

function buildNewsSitemap(pages) {
  const cutoff = Date.now() - (48 * 60 * 60 * 1000);
  const newsPages = pages
    .filter((item) => item.isNews && item.published && Date.parse(item.published) >= cutoff)
    .sort((a, b) => Date.parse(b.published) - Date.parse(a.published))
    .slice(0, 1000);

  const file = path.join(root, "news-sitemap.xml");
  if (!newsPages.length) {
    if (fs.existsSync(file)) fs.unlinkSync(file);
    return false;
  }

  const entries = newsPages.map((item) => `  <url>
    <loc>${escapeXml(item.url)}</loc>
    <news:news>
      <news:publication>
        <news:name>thenitishkr</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${escapeXml(item.published)}</news:publication_date>
      <news:title>${escapeXml(item.title)}</news:title>
    </news:news>
  </url>`).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n${entries}\n</urlset>\n`;
  fs.writeFileSync(file, xml);
  return true;
}

function updateRobots(hasNewsSitemap) {
  const file = path.join(root, "robots.txt");
  if (!fs.existsSync(file)) return;
  const cleaned = read(file)
    .replace(/(?:\r?\n)?Sitemap: https:\/\/thenitishkr\.in\/news-sitemap\.xml\s*/g, "\n")
    .trimEnd();
  const content = `${cleaned}${hasNewsSitemap ? "\nSitemap: https://thenitishkr.in/news-sitemap.xml" : ""}\n`;
  fs.writeFileSync(file, content);
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
buildSitemap(pages);
const hasNewsSitemap = buildNewsSitemap(pages);
updateRobots(hasNewsSitemap);
buildFeed(pages);
console.log(`Generated discovery files for ${pages.length} pages, ${docs.length} docs,${hasNewsSitemap ? " active news sitemap," : ""} and feed outputs.`);
