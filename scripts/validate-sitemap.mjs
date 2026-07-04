import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sitemapPath = path.join(root, "sitemap.xml");
const newsSitemapPath = path.join(root, "news-sitemap.xml");
const errors = [];
const warnings = [];

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function pathForUrl(url) {
  const parsed = new URL(url);
  if (parsed.pathname === "/") return path.join(root, "index.html");
  const localPath = path.join(root, decodeURIComponent(parsed.pathname.replace(/^\//, "")));
  if (path.extname(localPath)) return localPath;
  return path.join(localPath, "index.html");
}

function canonicalFromHtml(html) {
  return html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)?.[1]?.trim() || "";
}

function robotsFromHtml(html) {
  return html.match(/<meta\s+[^>]*name=["']robots["'][^>]*content=["']([^"']+)["'][^>]*>/i)?.[1]?.toLowerCase() || "";
}

function localHrefTarget(fromFile, href) {
  const clean = href.split(/[?#]/, 1)[0];
  if (!clean || clean.startsWith("#")) return null;
  if (/^(\/\/|https?:|mailto:|tel:|javascript:)/i.test(clean)) return null;
  const base = clean.startsWith("/")
    ? path.join(root, clean.slice(1))
    : path.resolve(path.dirname(fromFile), clean);
  if (path.extname(base)) return base;
  return path.join(base, "index.html");
}

function hrefsFromHtml(html) {
  return [...html.matchAll(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi)].map((match) => match[1]);
}

function validateSitemapUrls(urls) {
  const seen = new Set();
  for (const loc of urls) {
    if (seen.has(loc)) fail(`sitemap.xml: duplicate URL ${loc}`);
    seen.add(loc);

    let parsed;
    try {
      parsed = new URL(loc);
    } catch {
      fail(`sitemap.xml: invalid URL ${loc}`);
      continue;
    }

    if (parsed.protocol !== "https:") fail(`sitemap.xml: non-HTTPS URL ${loc}`);
    if (parsed.hostname !== "thenitishkr.in") fail(`sitemap.xml: non-canonical host ${loc}`);
    if (parsed.hostname.startsWith("www.")) fail(`sitemap.xml: www host is not canonical ${loc}`);
    if (/\.(html|xml|json|rss|atom)$/i.test(parsed.pathname)) fail(`sitemap.xml: non-page URL ${loc}`);
    if (/pages\.dev|localhost|127\.0\.0\.1|preview/i.test(loc)) fail(`sitemap.xml: preview or local URL ${loc}`);

    const file = pathForUrl(loc);
    if (!fs.existsSync(file)) {
      fail(`sitemap.xml: ${loc} has no local file at ${path.relative(root, file)}`);
      continue;
    }

    if (/\.html$/i.test(file) || path.basename(file).toLowerCase() === "index.html") {
      const html = read(file);
      const canonical = canonicalFromHtml(html);
      if (canonical !== loc) fail(`${path.relative(root, file)}: canonical ${canonical || "missing"} does not match sitemap URL ${loc}`);
      if (robotsFromHtml(html).includes("noindex")) fail(`${path.relative(root, file)}: sitemap URL is marked noindex`);

      for (const href of hrefsFromHtml(html)) {
        const target = localHrefTarget(file, href);
        if (!target) continue;
        if (/\.html(?:[?#]|$)/i.test(href)) fail(`${path.relative(root, file)}: internal link should not use .html URL ${href}`);
        if (!fs.existsSync(target)) fail(`${path.relative(root, file)}: broken local link ${href}`);
      }
    }
  }
}

async function validateRemote(urls) {
  const base = process.env.SITE_BASE_URL?.replace(/\/$/, "");
  if (!base) {
    warn("SITE_BASE_URL not set; skipped live/preview HTTP validation.");
    return;
  }

  for (const canonicalUrl of urls) {
    const parsed = new URL(canonicalUrl);
    const previewUrl = `${base}${parsed.pathname}`;
    let response;
    try {
      response = await fetch(previewUrl, { redirect: "manual" });
    } catch (error) {
      fail(`${previewUrl}: request failed: ${error.message}`);
      continue;
    }

    if (response.status !== 200) {
      fail(`${previewUrl}: expected 200, received ${response.status}`);
      continue;
    }

    const contentType = response.headers.get("content-type") || "";
    if (parsed.pathname.endsWith(".pdf")) {
      if (!contentType.includes("application/pdf")) fail(`${previewUrl}: expected PDF content-type, received ${contentType || "missing"}`);
      continue;
    }

    if (!contentType.includes("text/html")) fail(`${previewUrl}: expected HTML content-type, received ${contentType || "missing"}`);

    const html = await response.text();
    const canonical = canonicalFromHtml(html);
    if (canonical !== canonicalUrl) fail(`${previewUrl}: canonical ${canonical || "missing"} does not match ${canonicalUrl}`);
    if (robotsFromHtml(html).includes("noindex")) fail(`${previewUrl}: page is marked noindex`);
  }
}

if (!fs.existsSync(sitemapPath)) fail("sitemap.xml is missing");
const sitemap = fs.existsSync(sitemapPath) ? read(sitemapPath) : "";
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());

if (!urls.length) fail("sitemap.xml has no <loc> entries");
validateSitemapUrls(urls);
await validateRemote(urls);

if (fs.existsSync(newsSitemapPath)) {
  const newsSitemap = read(newsSitemapPath);
  if (!/<urlset\b/i.test(newsSitemap)) fail("news-sitemap.xml: missing <urlset> root tag");
  const newsUrls = [...newsSitemap.matchAll(/<url>\s*([\s\S]*?)\s*<\/url>/g)].map((match) => match[1]);
  if (!newsUrls.length) fail("news-sitemap.xml: missing <url> entries");
  for (const [index, entry] of newsUrls.entries()) {
    const position = index + 1;
    const loc = entry.match(/<loc>([^<]+)<\/loc>/)?.[1]?.trim();
    const publicationDate = entry.match(/<news:publication_date>([^<]+)<\/news:publication_date>/)?.[1]?.trim();
    const title = entry.match(/<news:title>([^<]+)<\/news:title>/)?.[1]?.trim();
    if (!/<news:news>[\s\S]*<\/news:news>/i.test(entry)) fail(`news-sitemap.xml: entry ${position} missing <news:news>`);
    if (!/<news:publication>[\s\S]*<\/news:publication>/i.test(entry)) fail(`news-sitemap.xml: entry ${position} missing <news:publication>`);
    if (!/<news:name>[^<]+<\/news:name>/i.test(entry)) fail(`news-sitemap.xml: entry ${position} missing <news:name>`);
    if (!/<news:language>[^<]+<\/news:language>/i.test(entry)) fail(`news-sitemap.xml: entry ${position} missing <news:language>`);
    if (!loc) fail(`news-sitemap.xml: entry ${position} missing <loc>`);
    if (!publicationDate) fail(`news-sitemap.xml: entry ${position} missing <news:publication_date>`);
    if (publicationDate && Number.isNaN(Date.parse(publicationDate))) {
      fail(`news-sitemap.xml: entry ${position} has invalid publication date ${publicationDate}`);
    }
    if (!title) fail(`news-sitemap.xml: entry ${position} missing <news:title>`);
  }
}

for (const warning of warnings) console.warn(`Warning: ${warning}`);

if (errors.length) {
  console.error("Sitemap validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Sitemap validation passed for ${urls.length} URLs.`);
