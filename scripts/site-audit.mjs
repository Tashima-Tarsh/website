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

function visibleMarkup(html) {
  return html
    .replace(/<head\b[\s\S]*?<\/head>/i, "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
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
const homepage = fs.readFileSync(path.join(root, "index.html"), "utf8");

if (!homepage.includes('<meta name="archive-successor" content="Diksha Sharma">')) {
  errors.push("index.html: missing non-visible archive successor metadata");
}

const aboutPage = fs.readFileSync(path.join(root, "about", "index.html"), "utf8");
if ((aboutPage.match(/"name":"Diksha Sharma"/g) || []).length !== 2) {
  errors.push("about/index.html: publication co-author metadata must retain two records");
}

for (const authorityUrl of [
  "https://orcid.org/0009-0004-6840-4463",
  "https://www.wikidata.org/wiki/Q140001166",
  "https://www.linkedin.com/in/thenitishkr",
  "https://thenitishkr.substack.com",
  "https://medium.com/@thenitishkr",
  "https://www.amazon.com/author/nikukr",
]) {
  if (!homepage.includes(authorityUrl)) {
    errors.push(`index.html: missing identity authority URL ${authorityUrl}`);
  }
}

if (
  !homepage.includes(
    "https://www.verdictum.in/supreme-court/cyber-security-consultant-plea-destruction-stolen-personal-data-indian-citizens-1614263",
  )
) {
  errors.push("index.html: missing independent Verdictum coverage reference");
}

for (const isbn of ["978-93-5592-012-6", "979-8274694070"]) {
  if (!homepage.includes(`"isbn":"${isbn}"`)) {
    errors.push(`index.html: missing authored book ISBN ${isbn}`);
  }
}

const dishaPage = fs.readFileSync(path.join(root, "disha", "index.html"), "utf8");
for (const requiredVisibleDishaSignal of [
  'id="what-is-disha"',
  'id="research-lineage"',
  'id="disha-faq"',
  "Prof. Dr. Meenakshi Sharma",
  "Geo-spatial Data Structure for Explosive Detection",
  "GIS Capacity in the Government Sector",
]) {
  if (!dishaPage.includes(requiredVisibleDishaSignal)) {
    errors.push(`disha/index.html: missing visible authority signal ${requiredVisibleDishaSignal}`);
  }
}

const dishaSchemas = [
  ...dishaPage.matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  ),
].flatMap((block, index) => {
  try {
    const parsed = JSON.parse(block[1]);
    return parsed["@graph"] || [parsed];
  } catch (error) {
    errors.push(`disha/index.html: invalid JSON-LD block ${index + 1}: ${error.message}`);
    return [];
  }
});
const dishaSchemaById = new Map(
  dishaSchemas.filter((node) => node && node["@id"]).map((node) => [node["@id"], node]),
);
for (const requiredEntityId of [
  "https://thenitishkr.in/disha/#architecture",
  "https://thenitishkr.in/disha/#advisor-meenakshi-sharma",
  "https://thenitishkr.in/disha/#faq",
]) {
  if (!dishaSchemaById.has(requiredEntityId)) {
    errors.push(`disha/index.html: missing structured authority entity ${requiredEntityId}`);
  }
}
const architectureEntity = dishaSchemaById.get("https://thenitishkr.in/disha/#architecture");
if (architectureEntity?.["@type"] !== "CreativeWork") {
  errors.push("disha/index.html: DISHA architecture entity must be CreativeWork");
}
if (architectureEntity?.sameAs !== "https://www.wikidata.org/wiki/Q140167664") {
  errors.push("disha/index.html: DISHA architecture must link to Wikidata Q140167664");
}
if (
  architectureEntity?.subjectOf?.["@type"] !== "Report" ||
  architectureEntity.subjectOf.url !==
    "https://thenitishkr.in/assets/docs/disha-whitepaper-what-it-can-what-it-did-v66.pdf" ||
  architectureEntity.subjectOf.author?.["@id"] !== "https://thenitishkr.in/#person"
) {
  errors.push("disha/index.html: DISHA architecture must identify its authored whitepaper report");
}
const dishaFaqEntity = dishaSchemaById.get("https://thenitishkr.in/disha/#faq");
if (dishaFaqEntity?.["@type"] !== "FAQPage" || dishaFaqEntity.mainEntity?.length !== 4) {
  errors.push("disha/index.html: DISHA FAQ schema must contain four questions");
}
for (const node of dishaSchemas) {
  if (
    node.mainEntityOfPage === "https://thenitishkr.in/disha" ||
    node.mainEntityOfPage?.["@id"] === "https://thenitishkr.in/disha"
  ) {
    errors.push("disha/index.html: schema mainEntityOfPage must match trailing-slash canonical");
  }
  if (
    node["@type"] === "ImageObject" &&
    node.contentUrl?.endsWith(".webp") &&
    node.encodingFormat !== "image/webp"
  ) {
    errors.push(`disha/index.html: WebP image has incorrect encodingFormat ${node.contentUrl}`);
  }
}
if (dishaPage.includes('id="press-news-schema"')) {
  errors.push("disha/index.html: static research page must not use NewsArticle schema");
}

const booksPage = fs.readFileSync(path.join(root, "books", "index.html"), "utf8");
const booksAuthoritySchemaText = match(
  booksPage,
  /<script\s+id=["']books-authority-schema["'][^>]*>([\s\S]*?)<\/script>/i,
);
if (!booksAuthoritySchemaText) {
  errors.push("books/index.html: missing books authority schema");
} else {
  try {
    const booksAuthoritySchema = JSON.parse(booksAuthoritySchemaText);
    const booksAuthorityGraph = booksAuthoritySchema["@graph"] || [];
    const booksById = new Map(
      booksAuthorityGraph.filter((node) => node?.["@id"]).map((node) => [node["@id"], node]),
    );
    for (const [bookId, expected] of [
      [
        "https://thenitishkr.in/books/#era-of-stupidity",
        {
          name: "Era of Stupidity: Citizen Not Found",
          isbn: "9789355920126",
          wikidata: "https://www.wikidata.org/wiki/Q140167720",
          amazon: "https://www.amazon.in/dp/B0H2T364NF",
        },
      ],
      [
        "https://thenitishkr.in/books/#sleeping-guardian",
        {
          name: "Sleeping Guardian: India Lost Justice",
          isbn: "9798274694070",
          wikidata: "https://www.wikidata.org/wiki/Q140167727",
          amazon: "https://www.amazon.in/dp/B0G2KF9GK3",
        },
      ],
    ]) {
      const book = booksById.get(bookId);
      if (
        book?.["@type"] !== "Book" ||
        book.name !== expected.name ||
        book.isbn !== expected.isbn ||
        book.author?.["@id"] !== "https://thenitishkr.in/#person" ||
        !book.sameAs?.includes(expected.wikidata) ||
        !book.sameAs?.includes(expected.amazon)
      ) {
        errors.push(`books/index.html: incomplete authority schema for ${bookId}`);
      }
    }
    if (booksAuthorityGraph.some((node) => node?.["@type"] === "Person")) {
      errors.push("books/index.html: books authority schema must reuse, not duplicate, the Person node");
    }
  } catch (error) {
    errors.push(`books/index.html: invalid books authority schema: ${error.message}`);
  }
}

const case02Page = fs.readFileSync(
  path.join(root, "intelligence/meity-digital-governance", "index.html"),
  "utf8",
);
for (const requiredCase02Signal of [
  'id="public-source-matrix"',
  'id="authority-bridge"',
  'id="public-record-source-schema"',
]) {
  if (!case02Page.includes(requiredCase02Signal)) {
    errors.push(
      `intelligence/meity-digital-governance/index.html: missing source-matrix signal ${requiredCase02Signal}`,
    );
  }
}
if (!case02Page.includes("Verified by government record:")) {
  errors.push(
    "intelligence/meity-digital-governance/index.html: missing government-record source framing",
  );
}
const case02SourceSchemaText = match(
  case02Page,
  /<script\s+id=["']public-record-source-schema["'][^>]*>([\s\S]*?)<\/script>/i,
);
if (case02SourceSchemaText) {
  try {
    const case02SourceSchema = JSON.parse(case02SourceSchemaText);
    if (
      case02SourceSchema["@type"] !== "ItemList" ||
      case02SourceSchema.numberOfItems !== 8 ||
      case02SourceSchema.itemListElement?.length !== 8
    ) {
      errors.push(
        "intelligence/meity-digital-governance/index.html: public source schema must contain eight verified records",
      );
    } else {
      for (const [index, listEntry] of case02SourceSchema.itemListElement.entries()) {
        const expectedPosition = index + 1;
        const sourceRecord = listEntry?.item;
        if (listEntry?.["@type"] !== "ListItem") {
          errors.push(
            `intelligence/meity-digital-governance/index.html: source schema item ${expectedPosition} must be a ListItem`,
          );
        }
        if (
          !Number.isInteger(listEntry?.position) ||
          listEntry.position !== expectedPosition
        ) {
          errors.push(
            `intelligence/meity-digital-governance/index.html: source schema item ${expectedPosition} has an invalid position`,
          );
        }
        if (
          sourceRecord?.["@type"] !== "CreativeWork" ||
          typeof sourceRecord.name !== "string" ||
          !sourceRecord.name.trim() ||
          typeof sourceRecord.description !== "string" ||
          !sourceRecord.description.trim() ||
          !sourceRecord.citation
        ) {
          errors.push(
            `intelligence/meity-digital-governance/index.html: source schema item ${expectedPosition} is missing required record metadata`,
          );
        }
      }
    }
  } catch (error) {
    errors.push(
      `intelligence/meity-digital-governance/index.html: invalid public source schema: ${error.message}`,
    );
  }
}

for (const file of files) {
  const name = relative(file);
  const html = fs.readFileSync(file, "utf8");
  if (!/G-YJ314E1YHG/.test(html)) {
    errors.push(`${name}: missing GA4 measurement tag G-YJ314E1YHG`);
  }
  const visible = visibleMarkup(html);
  if (/Diksha Sharma/i.test(visible)) {
    errors.push(`${name}: successor or co-author name must not appear in visible content`);
  }
  if (/\bsuccessor\b/i.test(visible)) {
    errors.push(`${name}: successor wording must not appear in visible content`);
  }
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
  const indexable = !robots.toLowerCase().includes("noindex");
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
  if (indexable && canonical !== expectedCanonical(file)) {
    errors.push(`${name}: canonical must be ${expectedCanonical(file)}`);
  }
  if (indexable && !/name=["']twitter:card["']/i.test(html)) {
    errors.push(`${name}: missing X/Twitter card metadata`);
  }
  if (indexable && (!/property=["']og:title["']/i.test(html) || !/property=["']og:image["']/i.test(html))) {
    errors.push(`${name}: incomplete Open Graph metadata`);
  }
  if (indexable && !jsonBlocks.length) errors.push(`${name}: missing JSON-LD`);
  for (const [index, block] of jsonBlocks.entries()) {
    try {
      JSON.parse(block[1]);
    } catch (error) {
      errors.push(`${name}: invalid JSON-LD block ${index + 1}: ${error.message}`);
    }
  }

  if (indexable && canonical && !sitemap.includes(`<loc>${canonical}</loc>`)) {
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

  if (canonical && /\.html(?:["'#?]|$)/i.test(canonical)) {
    errors.push(`${name}: canonical leaks .html`);
  }
  if (!/<main\b/i.test(html)) warnings.push(`${name}: no main landmark`);
}

for (const required of ["robots.txt", "sitemap.xml", "feed.xml", "llms.txt"]) {
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
