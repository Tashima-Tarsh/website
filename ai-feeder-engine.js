#!/usr/bin/env node
/* Static publishing engine for thenitishkr.in: sitemap, RSS feed, news sitemap, and IndexNow payloads. */
const fs = require("fs");
const path = require("path");
const SITE = "https://thenitishkr.in";
const INDEXNOW_KEY = "a0151dcfc802e79c4c6818a68dfd9fef";
const now = new Date().toISOString();
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
    if (entry.name.startsWith(".") || ["node_modules", "assets", "audit", "preview-news-desk"].includes(entry.name)) return [];
    const next = path.join(dir, entry.name);
    if (entry.isDirectory()) return findHtmlPages(next);
    if (!entry.isFile() || !entry.name.endsWith(".html")) return [];
    return [next.replace(/\\/g, "/").replace(/^\.\//, "")];
  });
}
const pages = findHtmlPages().map(file => {
  const html = read(file);
  const stat = fs.statSync(file);
  return { file, url: canonicalFor(file), title: titleOf(html, file.replace(/\.html$/, "")), modified: stat.mtime.toISOString().slice(0,10) };
}).sort((a,b) => a.url.localeCompare(b.url));
const docs = fs.existsSync("assets/docs") ? fs.readdirSync("assets/docs").filter(f => /\.pdf$/i.test(f)).map(f => ({ url: `${SITE}/assets/docs/${encodeURIComponent(f)}`, modified: fs.statSync(path.join("assets/docs", f)).mtime.toISOString().slice(0,10) })) : [];
const sitemapUrls = pages.map(p => `  <url><loc>${escapeXml(p.url)}</loc><lastmod>${p.modified}</lastmod><changefreq>weekly</changefreq><priority>${p.file === "index.html" ? "1.0" : "0.8"}</priority></url>`).concat(docs.map(d => `  <url><loc>${escapeXml(d.url)}</loc><lastmod>${d.modified}</lastmod><changefreq>monthly</changefreq><priority>0.5</priority></url>`));
fs.writeFileSync("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.join("\n")}\n</urlset>\n`);
const contentPath = p => p.url.replace(`${SITE}/`, "").replace(/\/$/, "");
const articlePages = pages.filter(p => /^(article-12|digital-constitutional-personhood|disha|intelligence|intelligence-)/.test(contentPath(p)));
const feedSlugs = new Set([
  "article-12",
  "digital-constitutional-personhood",
  "disha",
  "intelligence-ndma-disaster-governance",
  "intelligence-meity-digital-governance",
  "intelligence-niti-aayog-certification-funds",
  "intelligence-odf-false-justification",
  "intelligence-sir-constitutional-scam"
]);
const feedPages = pages.filter(p => feedSlugs.has(contentPath(p)));
const newsPages = feedPages.slice(0, 1000);
fs.writeFileSync("news-sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n${newsPages.map(p => `  <url><loc>${escapeXml(p.url)}</loc><news:news><news:publication><news:name>thenitishkr</news:name><news:language>en</news:language></news:publication><news:publication_date>${p.modified}</news:publication_date><news:title>${escapeXml(p.title)}</news:title></news:news></url>`).join("\n")}\n</urlset>\n`);
const feedItems = feedPages.slice(0, 40).map(p => `<item><title>${escapeXml(p.title)}</title><link>${escapeXml(p.url)}</link><guid isPermaLink="true">${escapeXml(p.url)}</guid><pubDate>${new Date(p.modified).toUTCString()}</pubDate><description>${escapeXml("Public-interest article and evidence record from thenitishkr.in")}</description></item>`).join("\n");
const feed = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>thenitishkr.in articles and evidence records</title><link>${SITE}/</link><description>Article 12, DISHA, digital constitutional personhood, and intelligence case records from thenitishkr.in.</description><lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${feedItems}</channel></rss>\n`;
fs.writeFileSync("feed.xml", feed);
fs.writeFileSync("rss.xml", feed);
fs.writeFileSync("indexnow-payload.json", JSON.stringify({ host: "thenitishkr.in", key: INDEXNOW_KEY, keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`, urlList: pages.map(p => p.url).slice(0, 1000) }, null, 2));
console.log(`Built ${pages.length} page URLs, ${docs.length} document URLs, feeds, news sitemap, and IndexNow payload at ${now}.`);
