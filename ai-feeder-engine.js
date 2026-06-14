#!/usr/bin/env node
/* Static publishing engine for thenitishkr.in: sitemap, RSS feed, news sitemap, and IndexNow payloads. */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const SITE = "https://thenitishkr.in";
const INDEXNOW_KEY = "a0151dcfc802e79c4c6818a68dfd9fef";
function releaseTime() {
  try {
    const message = execFileSync("git", ["log", "-1", "--format=%B"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    });
    const marker = message.match(/\[release-time:([^\]]+)\]/i)?.[1];
    if (marker && !Number.isNaN(Date.parse(marker))) return new Date(marker);
  } catch {}
  return new Date();
}
const buildTime = releaseTime();
const now = buildTime.toISOString();
function read(file) { return fs.readFileSync(file, "utf8"); }
function escapeXml(value) { return String(value || "").replace(/[<>&"']/g, c => ({"<":"&lt;",">":"&gt;","&":"&amp;","\"":"&quot;","'":"&apos;"}[c])); }
function canonicalFor(file) {
  if (file === "index.html") return `${SITE}/`;
  if (file.endsWith("/index.html")) return `${SITE}/${file.replace(/\/index\.html$/, "")}/`;
  return `${SITE}/${file.replace(/\.html$/, "")}`;
}
function titleOf(html, fallback) {
  const og = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i);
  const title = html.match(/<title>([^<]+)<\/title>/i);
  return (og && og[1]) || (title && title[1].replace(/\s*\|\s*thenitishkr.*$/i, "")) || fallback;
}
function findHtmlPages(dir = ".") {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    if (entry.name.startsWith(".") || ["node_modules", "assets", "audit", "dist", "preview-news-desk", "scripts"].includes(entry.name)) return [];
    const next = path.join(dir, entry.name);
    if (entry.isDirectory()) return findHtmlPages(next);
    if (!entry.isFile() || !entry.name.endsWith(".html")) return [];
    return [next.replace(/\\/g, "/").replace(/^\.\//, "")];
  });
}
function datePublishedOf(html) {
  return html.match(/"datePublished"\s*:\s*"([^"]+)"/i)?.[1] || "";
}
const headers = fs.existsSync("_headers") ? read("_headers") : "";
const noindexRoutes = headers
  .split(/\r?\n(?=\/)/)
  .filter(block => /X-Robots-Tag:\s*noindex/i.test(block))
  .map(block => block.trim().split(/\r?\n/, 1)[0]);
function isIndexable(file, html) {
  if (/<meta\s+name=["']robots["']\s+content=["'][^"']*noindex/i.test(html)) return false;
  if (file === "index.html") return true;
  const route = `/${file.replace(/\/index\.html$/, "")}/*`;
  return !noindexRoutes.includes(route);
}
function modifiedFor(file) {
  try {
    return execFileSync("git", ["log", "-1", "--format=%cI", "--", file], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim() || fs.statSync(file).mtime.toISOString();
  } catch {
    return fs.statSync(file).mtime.toISOString();
  }
}
const pages = findHtmlPages().map(file => {
  const html = read(file);
  const modified = modifiedFor(file);
  return {
    file,
    url: canonicalFor(file),
    title: titleOf(html, file.replace(/\.html$/, "")),
    published: datePublishedOf(html),
    indexable: isIndexable(file, html),
    modified,
    modifiedDate: modified.slice(0, 10),
    newsEligible: (() => {
      const pathName = file.replace(/\\/g, "/").replace(/(?:index)?\.html$/, "").replace(/\/$/, "");
      const isStaticPage = ["", "about", "media", "disha", "article-12", "books", "editorial-standards", "fact-check", "start-here", "news", "privacy-policy", "terms", "intelligence"].includes(pathName);
      return !isStaticPage && /"@type"\s*:\s*(?:"(?:Analysis)?NewsArticle"|\[[^\]]*"(?:Analysis)?NewsArticle")/i.test(html);
    })()
  };
}).sort((a,b) => a.url.localeCompare(b.url));
const docs = fs.existsSync("assets/docs") ? fs.readdirSync("assets/docs").filter(f => /\.pdf$/i.test(f)).map(f => {
  const file = path.join("assets/docs", f).replace(/\\/g, "/");
  return {
    url: `${SITE}/assets/docs/${encodeURIComponent(f)}`,
    modifiedDate: modifiedFor(file).slice(0, 10)
  };
}) : [];
const sitemapUrls = pages.filter(p => p.indexable).map(p => `  <url><loc>${escapeXml(p.url)}</loc><lastmod>${p.modifiedDate}</lastmod><changefreq>weekly</changefreq><priority>${p.file === "index.html" ? "1.0" : "0.8"}</priority></url>`).concat(docs.map(d => `  <url><loc>${escapeXml(d.url)}</loc><lastmod>${d.modifiedDate}</lastmod><changefreq>monthly</changefreq><priority>0.5</priority></url>`));
fs.writeFileSync("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.join("\n")}\n</urlset>\n`);
const contentPath = p => p.url.replace(`${SITE}/`, "").replace(/\/$/, "");
const articlePages = pages.filter(p => /^(article-12|digital-constitutional-personhood|disha|intelligence|intelligence-)/.test(contentPath(p)));
const feedSlugs = new Set([
  "article-12",
  "digital-constitutional-personhood",
  "disha",
  "intelligence-ndma-disaster-governance",
  "intelligence-meity-digital-governance",
  "intelligence/citizen-not-found",
  "intelligence-niti-aayog-certification-funds",
  "intelligence-odf-false-justification",
  "intelligence-sir-constitutional-scam"
]);
const feedPages = pages
  .filter(p => p.indexable && feedSlugs.has(contentPath(p)))
  .sort((a, b) => new Date(b.published || b.modified) - new Date(a.published || a.modified));
const newsCutoff = buildTime.getTime() - (2 * 24 * 60 * 60 * 1000); // 2 days (48-hour Google News limit)
const newsPages = pages.filter(p => p.indexable && p.newsEligible && p.published && new Date(p.published).getTime() >= newsCutoff).slice(0, 1000);
if (newsPages.length) {
  fs.writeFileSync("news-sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n${newsPages.map(p => `  <url><loc>${escapeXml(p.url)}</loc><news:news><news:publication><news:name>thenitishkr</news:name><news:language>en</news:language></news:publication><news:publication_date>${p.published}</news:publication_date><news:title>${escapeXml(p.title)}</news:title></news:news></url>`).join("\n")}\n</urlset>\n`);
} else if (fs.existsSync("news-sitemap.xml")) {
  fs.unlinkSync("news-sitemap.xml");
}
if (fs.existsSync("robots.txt")) {
  const robots = read("robots.txt")
    .replace(/(?:\r?\n)?Sitemap: https:\/\/thenitishkr\.in\/news-sitemap\.xml\s*/g, "\n")
    .trimEnd();
  fs.writeFileSync(
    "robots.txt",
    `${robots}${newsPages.length ? "\nSitemap: https://thenitishkr.in/news-sitemap.xml" : ""}\n`
  );
}
const feedItems = feedPages.slice(0, 40).map(p => `<item><title>${escapeXml(p.title)}</title><link>${escapeXml(p.url)}</link><guid isPermaLink="true">${escapeXml(p.url)}</guid><pubDate>${new Date(p.published || p.modified).toUTCString()}</pubDate><description>${escapeXml("Public-interest article and evidence record from thenitishkr.in")}</description></item>`).join("\n");
const feedLastBuild = feedPages.length
  ? new Date(Math.max(...feedPages.map(p => new Date(p.modified).getTime())))
  : buildTime;
const feed = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>thenitishkr.in articles and evidence records</title><link>${SITE}/</link><description>Article 12, DISHA, digital constitutional personhood, and intelligence case records from thenitishkr.in.</description><lastBuildDate>${feedLastBuild.toUTCString()}</lastBuildDate>${feedItems}</channel></rss>\n`;
fs.writeFileSync("feed.xml", feed);
fs.writeFileSync("rss.xml", feed);
fs.writeFileSync("indexnow-payload.json", JSON.stringify({ host: "thenitishkr.in", key: INDEXNOW_KEY, keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`, urlList: pages.filter(p => p.indexable).map(p => p.url).slice(0, 1000) }, null, 2));
console.log(`Built ${pages.length} page URLs, ${docs.length} document URLs, feeds${newsPages.length ? ", news sitemap" : ""}, and IndexNow payload at ${now}.`);
