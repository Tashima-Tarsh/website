import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const site = "https://thenitishkr.in";
const ignoredDirs = new Set([".git", ".github", "audit", "dist", "node_modules", "scripts"]);

const person = {
  "@type": "Person",
  "@id": `${site}/#person`,
  name: "Nitish Kumar",
  alternateName: ["thenitishkr", "Nitish Kumar (thenitishkr)"],
  url: `${site}/about/`,
  image: `${site}/assets/images/nitish-kumar-thenitishkr.jpg`,
  jobTitle: [
    "Independent Public-Interest Researcher",
    "Author",
    "National Cyber Security Scholar",
    "Inventor of DISHA Intelligence 6.6",
  ],
  nationality: { "@type": "Country", name: "India" },
  identifier: [
    {
      "@type": "PropertyValue",
      propertyID: "ORCID",
      value: "0009-0004-6840-4463",
      url: "https://orcid.org/0009-0004-6840-4463",
    },
    {
      "@type": "PropertyValue",
      propertyID: "Wikidata",
      value: "Q140001166",
      url: "https://www.wikidata.org/wiki/Q140001166",
    },
  ],
  sameAs: [
    "https://orcid.org/0009-0004-6840-4463",
    "https://www.wikidata.org/wiki/Q140001166",
    "https://x.com/thenitishkr",
    "https://www.linkedin.com/in/thenitishkr",
    "https://in.linkedin.com/in/thenitishkr",
    "https://thenitishkr.substack.com",
    "https://medium.com/@thenitishkr",
    "https://github.com/Tashima-Tarsh",
    "https://www.instagram.com/thenitishkr",
    "https://www.facebook.com/thenitishkr",
    "https://www.reddit.com/user/Ok-File-6559/",
    "https://www.quora.com/profile/Nitish-Kumar-11545",
    "https://www.amazon.com/author/nikukr",
  ],
  disambiguatingDescription:
    "Nitish Kumar (thenitishkr), independent public-interest researcher, author, National Cyber Security Scholar, and inventor of DISHA Intelligence 6.6; distinct from Nitish Kumar the Bihar politician.",
  knowsAbout: [
    "DISHA Intelligence 6.6",
    "DISHA Intelligence Architecture",
    "Article 12 constitutional accountability",
    "Digital Constitutional Personhood",
    "Digital governance",
    "Citizen-data harm",
    "Public records",
    "Evidence intelligence",
    "Cyber defence",
  ],
};

const website = {
  "@type": "WebSite",
  "@id": `${site}/#website`,
  name: "thenitishkr.in",
  alternateName: ["thenitishkr", "DISHA Intelligence", "DISHA Intelligence 6.6"],
  url: `${site}/`,
  inLanguage: "en-IN",
  publisher: { "@id": `${site}/#person` },
  potentialAction: {
    "@type": "SearchAction",
    target: `${site}/sitemap/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name.startsWith(".") || ignoredDirs.has(entry.name)) return [];
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(absolute);
    return entry.isFile() && entry.name === "index.html" ? [absolute] : [];
  });
}

function rel(file) {
  return path.relative(root, file).replaceAll("\\", "/");
}

function canonicalFor(file) {
  const relative = rel(file);
  return relative === "index.html"
    ? `${site}/`
    : `${site}/${relative.replace(/\/index\.html$/, "")}/`;
}

function text(value) {
  return String(value || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function match(html, pattern) {
  return html.match(pattern)?.[1]?.trim() || "";
}

function titleFor(html, file) {
  return text(
    match(html, /<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i) ||
      match(html, /<title>([\s\S]*?)<\/title>/i) ||
      path.basename(path.dirname(file)),
  );
}

function descriptionFor(html) {
  return text(match(html, /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i));
}

function h1For(html) {
  return text(match(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i));
}

function dateFrom(html, key) {
  return (
    match(html, new RegExp(`"${key}"\\s*:\\s*"([^"]+)"`, "i")) ||
    match(html, /<meta\s+property=["']article:modified_time["']\s+content=["']([^"']+)["']/i) ||
    ""
  );
}

function isNoindex(html) {
  return /<meta\s+name=["']robots["']\s+content=["'][^"']*noindex/i.test(html);
}

function pageType(canonical, html) {
  const slug = new URL(canonical).pathname;
  if (slug.startsWith("/news/") && slug !== "/news/") return "NewsArticle";
  if (slug.startsWith("/intelligence/documents/")) return "DigitalDocument";
  if (slug.startsWith("/intelligence/") && slug !== "/intelligence/") return "Report";
  if (slug.startsWith("/disha/") && slug !== "/disha/") return "TechArticle";
  if (slug.startsWith("/article-12/") || slug.startsWith("/digital-constitutional-personhood/")) {
    return "ScholarlyArticle";
  }
  if (/"@type"\s*:\s*"FAQPage"/i.test(html)) return "WebPage";
  return "WebPage";
}

function breadcrumbName(segment) {
  const names = {
    disha: "DISHA",
    intelligence: "Intelligence",
    news: "News",
    "article-12": "Article 12",
    "digital-constitutional-personhood": "Digital Constitutional Personhood",
    "digital-arrest-data-harm": "Digital Arrest and Data Harm",
    documents: "Documents",
    about: "About",
    books: "Books",
    bibliography: "Bibliography",
  };
  return names[segment] || segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function breadcrumb(canonical, title) {
  const pathname = new URL(canonical).pathname.replace(/^\/|\/$/g, "");
  const segments = pathname ? pathname.split("/") : [];
  const items = [{ "@type": "ListItem", position: 1, name: "Home", item: `${site}/` }];
  let current = "";
  segments.forEach((segment, index) => {
    current += `/${segment}`;
    items.push({
      "@type": "ListItem",
      position: index + 2,
      name: index === segments.length - 1 ? title : breadcrumbName(segment),
      item: `${site}${current}/`,
    });
  });
  return {
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: items,
  };
}

function imageFor(html) {
  const src =
    match(html, /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i) ||
    match(html, /<img\b[^>]*\bsrc=["']([^"']+)["']/i);
  if (!src) return "";
  if (/^https?:\/\//i.test(src)) return src;
  if (src.startsWith("/")) return `${site}${src.split(/[?#]/, 1)[0]}`;
  return "";
}

function pageNode(type, canonical, title, description, html) {
  const base = {
    "@type": type,
    "@id": `${canonical}#schema-harness-page`,
    url: canonical,
    name: title,
    headline: h1For(html) || title,
    description,
    inLanguage: "en-IN",
    isPartOf: { "@id": `${site}/#website` },
    mainEntityOfPage: canonical,
    author: { "@id": `${site}/#person` },
    publisher: { "@id": `${site}/#person` },
    breadcrumb: { "@id": `${canonical}#breadcrumb` },
    isAccessibleForFree: true,
  };
  const published = dateFrom(html, "datePublished");
  const modified = dateFrom(html, "dateModified");
  if (published) base.datePublished = published;
  if (modified || published) base.dateModified = modified || published;
  const image = imageFor(html);
  if (image) base.image = image;
  if (type === "DigitalDocument") {
    base.encodingFormat = "text/html";
  }
  return base;
}

function updateFile(file) {
  let html = fs.readFileSync(file, "utf8");
  html = html
    .replaceAll("https://thenitishkr.in/#nitish-kumar-thenitishkr", `${site}/#person`)
    .replaceAll("https://thenitishkr.in/#nitish-kumar", `${site}/#person`);

  const canonical =
    match(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["'][^>]*>/i) ||
    canonicalFor(file);
  if (isNoindex(html)) return { changed: false, skipped: true };

  const title = titleFor(html, file);
  const description = descriptionFor(html);
  const type = pageType(canonical, html);
  const graph = [
    website,
    person,
    pageNode(type, canonical, title, description, html),
    breadcrumb(canonical, title),
  ];

  const block = `  <script id="entity-consolidation-schema" type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  })}</script>`;

  const previous = html;
  if (/<script\s+id=["']entity-consolidation-schema["'][\s\S]*?<\/script>/i.test(html)) {
    html = html.replace(/  <script\s+id=["']entity-consolidation-schema["'][\s\S]*?<\/script>/i, block);
  } else {
    html = html.replace(/<\/head>/i, `${block}\n</head>`);
  }

  if (html !== previous) {
    fs.writeFileSync(file, html);
    return { changed: true, skipped: false };
  }
  return { changed: false, skipped: false };
}

let changed = 0;
let skipped = 0;
for (const file of walk(root)) {
  const result = updateFile(file);
  if (result.changed) changed += 1;
  if (result.skipped) skipped += 1;
}

console.log(`Applied entity schema harness to ${changed} pages; skipped ${skipped} noindex pages.`);
