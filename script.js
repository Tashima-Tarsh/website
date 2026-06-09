const navToggle = document.querySelector("[data-menu-toggle]");
const navLinks = document.querySelector("[data-nav-links]");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const publicationGrid = document.querySelector("[data-publication-grid]");
const mediaGrid = document.querySelector("[data-media-grid]");
const ALLOWED_PUBLICATION_URLS = new Set([
  "https://thenitishkr.substack.com/p/we-record-everything-we-remember",
  "https://thenitishkr.substack.com/p/india-arrested-the-operators-but",
  "https://thenitishkr.substack.com/p/india-followed-the-money-i-followed",
  "https://thenitishkr.medium.com/india-followed-the-money-he-followed-the-data-106c0fa40190",
  "https://medium.com/@thenitishkr/india-followed-the-money-he-followed-the-data-106c0fa40190"
]);
const TRUSTED_PUBLICATIONS = [
  {
    source: "Substack",
    title: "We Record Everything. We Remember Almost Nothing.",
    link: "https://thenitishkr.substack.com/p/we-record-everything-we-remember",
    date: new Date("2026-06-03T06:09:01+05:30"),
    summary: "A cybersecurity researcher took the question to the Supreme Court. On 19 May 2026, the Court handed it to the government. The question is bigger than either of them.",
    image: "https://substackcdn.com/image/fetch/$s_!1nrT!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F15cbdc89-e59d-420b-9738-0248865e73b7_1536x1024.png"
  },
  {
    source: "Substack",
    title: "India Arrested the Operators. But Did It Miss the Architecture?",
    link: "https://thenitishkr.substack.com/p/india-arrested-the-operators-but",
    date: new Date("2026-05-24T05:21:28+05:30"),
    summary: "Supreme Court asked MeitY to examine a PIL raising questions about Chinese-linked cyber networks, data extraction, and India's unfinished cyber investigation.",
    image: "https://substackcdn.com/image/fetch/$s_!TAZa!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7349c51f-1210-405a-9be7-7c5e8e586296_1536x1024.png"
  },
  {
    source: "Substack",
    title: "India Followed the Money. I Followed the Data.",
    link: "https://thenitishkr.substack.com/p/india-followed-the-money-i-followed",
    date: new Date("2026-05-23T05:29:41+05:30"),
    summary: "Supreme Court sent the cyber-security petition to MeitY. The next submission raises a bigger question about India's data-layer national security risk.",
    image: "https://substackcdn.com/image/fetch/$s_!mWru!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbe7e4f54-8ce8-46f2-affd-45410e5b3cd2_1536x1024.png"
  },
  {
    source: "Medium",
    title: "India Followed the Money. He Followed the Data.",
    link: "https://thenitishkr.medium.com/india-followed-the-money-he-followed-the-data-106c0fa40190",
    date: new Date("2026-06-03T00:00:00+05:30"),
    summary: "A public-interest record on money trails, data trails, and the evidence architecture behind constitutional accountability.",
    image: "https://cdn-images-1.medium.com/max/1024/1*IIE11lc9f6FumGfDKroiIQ.png"
  }
];

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function textFromHtml(value) {
  const template = document.createElement("template");
  template.innerHTML = value || "";
  return (template.content.textContent || "").replace(/\s+/g, " ").trim();
}

function firstImageFromHtml(value) {
  const match = String(value || "").match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : "";
}

function metaImageFromHtml(value, baseUrl) {
  const html = String(value || "");
  const patterns = [
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i,
    /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["'][^>]*>/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["'][^>]*>/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["'][^>]*>/i
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match && match[1]) {
      try { return new URL(match[1], baseUrl).href; } catch (_) { return match[1]; }
    }
  }
  return "";
}

function optimizeImageUrl(url) {
  const value = String(url || "");
  if (!value) return value;
  return value
    .replace(/width-1200,height-630/g, "width-640,height-360")
    .replace(/fit-in\/1200x675/g, "fit-in/640x360")
    .replace(/\/jpg\/large\/high/g, "/jpg/medium/high")
    .replace(/w=1200/g, "w=640");
}

function normalizeItem(item, source) {
  const content = item.content || item.description || "";
  const remoteImage = item.thumbnail || item.enclosure?.link || firstImageFromHtml(content);
  return {
    source,
    title: textFromHtml(item.title || "Untitled"),
    link: item.link || item.guid || "#",
    date: item.pubDate ? new Date(item.pubDate) : null,
    summary: textFromHtml(content).slice(0, 180),
    image: remoteImage ? optimizeImageUrl(remoteImage) : "/assets/record.webp"
  };
}

function canonicalPublicationUrl(url) {
  try {
    const parsed = new URL(url);
    parsed.search = "";
    parsed.hash = "";
    return parsed.href.replace(/\/$/, "");
  } catch (_) {
    return String(url || "").replace(/[?#].*$/, "").replace(/\/$/, "");
  }
}

function updateItemListSchema(id, name, items, mapper) {
  const element = document.getElementById(id);
  if (!element) return;
  element.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: mapper(item)
    }))
  });
}

function readXmlText(node, selector) {
  return node.querySelector(selector)?.textContent?.trim() || "";
}

function parseRss(xmlText, source) {
  const xml = new DOMParser().parseFromString(xmlText, "application/xml");
  return [...xml.querySelectorAll("item")].map((item) => {
    const content = readXmlText(item, "encoded") || readXmlText(item, "description");
    const enclosure = item.querySelector("enclosure[url]")?.getAttribute("url") || "";
    const media = item.querySelector("thumbnail, content[url]")?.getAttribute("url") || "";
    return normalizeItem({
      title: readXmlText(item, "title"),
      link: readXmlText(item, "link"),
      guid: readXmlText(item, "guid"),
      pubDate: readXmlText(item, "pubDate") || readXmlText(item, "date"),
      description: content,
      thumbnail: media || enclosure || firstImageFromHtml(content)
    }, source);
  });
}

async function fetchWithTimeout(url, timeout = 9000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function loadFeed(feed) {
  const freshFeedUrl = feed.url + (feed.url.includes("?") ? "&" : "?") + "t=" + Date.now();
  const jsonResponse = await fetchWithTimeout("https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(freshFeedUrl), 12000);
  if (jsonResponse.ok) {
    const data = await jsonResponse.json();
    const items = (data.items || []).map((item) => normalizeItem(item, feed.source));
    if (items.length) return items;
  }

  const rawUrls = [
    "https://api.allorigins.win/raw?url=" + encodeURIComponent(freshFeedUrl),
    "https://api.codetabs.com/v1/proxy?quest=" + encodeURIComponent(freshFeedUrl)
  ];

  for (const url of rawUrls) {
    const response = await fetchWithTimeout(url, 9000);
    if (!response.ok) continue;
    const items = parseRss(await response.text(), feed.source);
    if (items.length) return items;
  }

  return [];
}

function renderPagedArchive(container, items, renderCard, options = {}) {
  const featured = items.slice(0, 4);
  if (container.dataset.archiveMode === "compact") {
    container.innerHTML = `<div class="archive-featured">${featured.map((item, index) => renderCard(item, index)).join("")}</div>`;
    if (options.onPageRender) options.onPageRender(featured, 0);
    return;
  }

  const remaining = items.slice(4);
  const perPage = options.perPage || 4;
  const pageCount = Math.ceil(remaining.length / perPage);

  container.innerHTML = `
    <div class="archive-featured">${featured.map((item, index) => renderCard(item, index)).join("")}</div>
    ${remaining.length ? '<div class="archive-sequence" data-archive-sequence></div>' : ""}
    ${pageCount > 1 ? `<div class="archive-pagination" data-archive-pagination aria-label="${escapeHtml(options.label || "Archive pages")}"></div>` : ""}
  `;

  const sequence = container.querySelector("[data-archive-sequence]");
  const pagination = container.querySelector("[data-archive-pagination]");

  const renderPage = (page) => {
    if (!sequence) return;
    const start = (page - 1) * perPage;
    const pageItems = remaining.slice(start, start + perPage);
    sequence.innerHTML = pageItems.map((item, index) => renderCard(item, start + index + 4)).join("");
    if (pagination) {
      pagination.querySelectorAll("button").forEach((button) => {
        button.classList.toggle("is-active", Number(button.dataset.page) === page);
      });
    }
    if (options.onPageRender) options.onPageRender(pageItems, start + 4);
  };

  if (pagination) {
    pagination.innerHTML = Array.from({ length: pageCount }, (_, index) => {
      const page = index + 1;
      return `<button type="button" data-page="${page}" aria-label="Show page ${page}">${page}</button>`;
    }).join("");
    pagination.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-page]");
      if (!button) return;
      renderPage(Number(button.dataset.page));
    });
  }

  renderPage(1);
}

function renderPublications(items) {
  if (!publicationGrid) return;
  if (!items.length) {
    publicationGrid.innerHTML = '<div class="publication-status">Unable to load live publications right now. Substack and Medium feeds remain linked from the footer.</div>';
    return;
  }

  const renderCard = (item, index) => {
    const date = item.date && !Number.isNaN(item.date.valueOf())
      ? item.date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
      : "Latest";
    return `
      <article class="publication-card reveal is-visible">
        <a href="${escapeHtml(item.link)}" target="_blank" rel="noopener">
          <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" loading="lazy" decoding="async" width="640" height="360" sizes="(max-width: 760px) 92vw, (max-width: 1100px) 45vw, 320px" fetchpriority="low">
        </a>
        <div class="publication-body">
          <span class="publication-meta">${escapeHtml(item.source)} | ${escapeHtml(date)}</span>
          <h3><a href="${escapeHtml(item.link)}" target="_blank" rel="noopener">${escapeHtml(item.title)}</a></h3>
          <p>${escapeHtml(item.summary)}</p>
        </div>
      </article>
    `;
  };

  renderPagedArchive(publicationGrid, items, renderCard, {
    label: "Substack and Medium archive pages",
    perPage: 4
  });

  updateItemListSchema("publication-schema", "thenitishkr Substack and Medium publications", items, (item) => ({
    "@type": "Article",
    headline: item.title,
    url: item.link,
    image: item.image,
    datePublished: item.date && !Number.isNaN(item.date.valueOf()) ? item.date.toISOString() : undefined,
    author: { "@type": "Person", name: "Nitish Kumar", alternateName: "thenitishkr" },
    publisher: { "@type": "Organization", name: item.source }
  }));
}

function renderMediaCoverage(items) {
  if (!mediaGrid) return;
  if (!items.length) {
    mediaGrid.innerHTML = '<div class="publication-status">No media coverage items found.</div>';
    return;
  }

  const renderCard = (item, index) => {
    const image = optimizeImageUrl(item.remote_image || item.thumbnail || "/assets/court.webp");
    return `
      <article class="media-card reveal is-visible">
        <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener">
          <img data-media-image="${index}" src="${escapeHtml(image)}" alt="${escapeHtml(item.outlet + ': ' + item.headline)}" loading="lazy" decoding="async" width="640" height="360" sizes="(max-width: 760px) 92vw, (max-width: 1100px) 45vw, 320px" fetchpriority="low">
        </a>
        <div class="media-body">
          <span class="media-outlet">${escapeHtml(item.outlet)} | ${escapeHtml(item.source_type || 'Coverage')}</span>
          <h3><a href="${escapeHtml(item.url)}" target="_blank" rel="noopener">${escapeHtml(item.headline)}</a></h3>
          <p>${escapeHtml(item.summary || '')}</p>
          <div class="media-actions">
            <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener">Source</a>
            <a href="${escapeHtml(item.archive_url || item.url)}" target="_blank" rel="noopener">Archive</a>
          </div>
        </div>
      </article>
    `;
  };

  const resolveVisibleImages = (visibleItems, startIndex) => {
    visibleItems.forEach((item, index) => {
      if (item.remote_image) return;
      const imageIndex = startIndex + index;
      resolveMediaImage(item.url).then((image) => {
        if (!image) return;
        const element = mediaGrid.querySelector(`[data-media-image="${imageIndex}"]`);
        if (element) element.src = optimizeImageUrl(image);
      });
    });
  };

  renderPagedArchive(mediaGrid, items, renderCard, {
    label: "Media coverage archive pages",
    perPage: 4,
    onPageRender: resolveVisibleImages
  });
  resolveVisibleImages(items.slice(0, 4), 0);

  updateItemListSchema("media-schema", "thenitishkr media coverage archive", items, (item) => ({
    "@type": "NewsArticle",
    headline: item.headline,
    url: item.url,
    image: optimizeImageUrl(item.remote_image || item.thumbnail || undefined),
    datePublished: item.published_date,
    description: item.summary,
    publisher: { "@type": "Organization", name: item.outlet },
    author: { "@type": "Organization", name: item.outlet }
  }));
}

async function resolveMediaImage(url) {
  const proxies = [
    "https://api.allorigins.win/raw?url=" + encodeURIComponent(url),
    "https://api.codetabs.com/v1/proxy?quest=" + encodeURIComponent(url)
  ];

  for (const proxyUrl of proxies) {
    try {
      const response = await fetchWithTimeout(proxyUrl, 7000);
      if (!response.ok) continue;
      const image = metaImageFromHtml(await response.text(), url);
      if (image) return image;
    } catch (_) {}
  }
  return "";
}

async function loadMediaCoverage() {
  if (!mediaGrid) return;
  try {
    const response = await fetch("/media-coverage.json?v=20260609media", { cache: "no-store" });
    if (!response.ok) throw new Error("media");
    renderMediaCoverage(await response.json());
  } catch (_) {
    mediaGrid.innerHTML = '<div class="publication-status">Unable to load media coverage.</div>';
  }
}

async function loadPublications() {
  if (!publicationGrid) return;
  const feeds = [
    { source: "Substack", url: "https://thenitishkr.substack.com/feed" },
    { source: "Medium", url: "https://medium.com/feed/@thenitishkr" }
  ];
  try {
    const results = await Promise.allSettled(feeds.map(async (feed) => {
      return loadFeed(feed);
    }));

    const items = results
      .filter((result) => result.status === "fulfilled")
      .flatMap((result) => result.value)
      .filter((item) => ALLOWED_PUBLICATION_URLS.has(canonicalPublicationUrl(item.link)))
      .sort((a, b) => (b.date || 0) - (a.date || 0));

    const approved = new Map();
    [...items, ...TRUSTED_PUBLICATIONS].forEach((item) => {
      const key = canonicalPublicationUrl(item.link);
      if (!ALLOWED_PUBLICATION_URLS.has(key) || approved.has(key)) return;
      approved.set(key, { ...item, image: optimizeImageUrl(item.image) });
    });

    renderPublications([...approved.values()].sort((a, b) => (b.date || 0) - (a.date || 0)));
  } catch (_) {
    renderPublications(TRUSTED_PUBLICATIONS.map((item) => ({ ...item, image: optimizeImageUrl(item.image) })));
  }
}

function loadWhenNearViewport(element, callback) {
  if (!element) return;
  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    callback();
  };
  if (!("IntersectionObserver" in window)) {
    start();
    return;
  }
  const loader = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    loader.disconnect();
    start();
  }, { rootMargin: "600px 0px" });
  loader.observe(element);
}

loadPublications();
loadWhenNearViewport(mediaGrid, loadMediaCoverage);

const RELATED_RECORDS = {
  "intelligence-ndma-disaster-governance": [
    ["Case 03", "NITI Aayog / Certification & Funds", "intelligence-niti-aayog-certification-funds"],
    ["Case 04", "ODF / False Justification", "intelligence-odf-false-justification"],
    ["Framework", "Article 12 accountability", "article-12"]
  ],
  "intelligence-meity-digital-governance": [
    ["Framework", "Digital Constitutional Personhood", "digital-constitutional-personhood"],
    ["Case 12", "SIR / Constitutional Scam Allegation", "intelligence-sir-constitutional-scam"],
    ["Archive", "DISHA Intelligence Archive", "intelligence"]
  ],
  "intelligence-niti-aayog-certification-funds": [
    ["Case 04", "ODF / False Justification", "intelligence-odf-false-justification"],
    ["Case 01", "NDMA / Disaster Governance", "intelligence-ndma-disaster-governance"],
    ["Framework", "Article 12 accountability", "article-12"]
  ],
  "intelligence-odf-false-justification": [
    ["Case 03", "NITI Aayog / Certification & Funds", "intelligence-niti-aayog-certification-funds"],
    ["Case 01", "NDMA / Disaster Governance", "intelligence-ndma-disaster-governance"],
    ["Archive", "DISHA Intelligence Archive", "intelligence"]
  ],
  "intelligence-sir-constitutional-scam": [
    ["Case 02", "MeitY / Digital Governance", "intelligence-meity-digital-governance"],
    ["Framework", "Digital Constitutional Personhood", "digital-constitutional-personhood"],
    ["Framework", "Article 12 accountability", "article-12"]
  ]
};

const DEFAULT_RELATED = [
  ["Archive", "DISHA Intelligence Archive", "intelligence"],
  ["Framework", "Article 12 accountability", "article-12"],
  ["System", "DISHA Intelligence Architecture", "disha"]
];

function canonicalUrl() {
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical && canonical.href) return canonical.href;
  return window.location.href.replace(/\/index\.html$/, "/").replace(/\.html($|[?#])/, "$1");
}

function pageTitle() {
  const ogTitle = document.querySelector('meta[property="og:title"]');
  return (ogTitle && ogTitle.content) || document.title.replace(/\s*\|\s*thenitishkr.*$/i, "");
}

function currentSlug() {
  const path = window.location.pathname.replace(/\/$/, "");
  const slug = path.split("/").pop() || "index";
  return slug.replace(/\.html$/, "");
}

function htmlToId(text) {
  return text.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 64);
}

function readingMinutes(main) {
  const words = (main.textContent || "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

function installReadingProgress() {
  if (document.querySelector(".reading-progress")) return;
  const progress = document.createElement("div");
  progress.className = "reading-progress";
  progress.setAttribute("aria-hidden", "true");
  progress.innerHTML = "<span></span>";
  document.body.prepend(progress);
  const bar = progress.querySelector("span");
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const value = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
    bar.style.width = `${value}%`;
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

function installRecordToolkit() {
  const main = document.querySelector("main");
  if (!main || document.querySelector(".record-toolkit")) return;
  const slug = currentSlug();
  const isCase = slug.startsWith("intelligence-") && slug !== "intelligence";
  const isRecord = isCase || main.classList.contains("case-study-page") || document.querySelector("#source-pdf, #source-documents");
  if (!isRecord) {
    installReadingProgress();
    return;
  }

  installReadingProgress();
  const headings = Array.from(main.querySelectorAll("h2, h3"))
    .filter((heading) => heading.textContent.trim().length > 0)
    .slice(0, 9);
  headings.forEach((heading) => {
    if (!heading.id) heading.id = htmlToId(heading.textContent);
  });

  const sourceTarget = document.querySelector("#source-pdf, #source-documents, [id*='source']");
  const toolkit = document.createElement("section");
  toolkit.className = "section record-toolkit";
  toolkit.setAttribute("aria-label", "Record reading tools");
  const tocLinks = headings.map((heading) => `<a href="#${heading.id}">${escapeHtml(heading.textContent.trim())}</a>`).join("");
  toolkit.innerHTML = `
    <div class="record-toolkit-grid">
      <div class="record-tool-card">
        <span class="label">Reader tools</span>
        <strong>${readingMinutes(main)} min read</strong>
        <p>Follow the record, verify the source path, and cite the page from its canonical address.</p>
      </div>
      <nav class="record-toc" aria-label="On this record">
        <span>On this record</span>
        ${tocLinks || '<a href="#top">Record overview</a>'}
      </nav>
      <div class="evidence-badges" aria-label="Evidence framing">
        <span>Verified records</span>
        <span>Documented allegations</span>
        <span>Research analysis</span>
        <span>Public commentary</span>
      </div>
      ${sourceTarget ? `<a class="source-jump" href="#${sourceTarget.id}">Jump to source file</a>` : ""}
    </div>`;
  main.insertBefore(toolkit, main.children[1] || main.firstChild);
}

function installRelatedRecords() {
  const slug = currentSlug();
  if (!slug.startsWith("intelligence-") || slug === "intelligence" || document.querySelector(".related-records")) return;
  const records = RELATED_RECORDS[slug] || DEFAULT_RELATED;
  const block = document.createElement("section");
  block.className = "section related-records";
  block.setAttribute("aria-label", "Related records");
  block.innerHTML = `
    <p class="eyebrow">Related records</p>
    <h2>Continue the evidence path.</h2>
    <div class="related-record-grid">
      ${records.map(([label, title, href]) => `
        <a class="related-record-card" href="${href}">
          <span>${escapeHtml(label)}</span>
          <strong>${escapeHtml(title)}</strong>
        </a>`).join("")}
    </div>`;
  const share = document.querySelector(".share-follow");
  if (share) share.parentNode.insertBefore(block, share);
}

function installTrustCitation() {
  const slug = currentSlug();
  const isRecord = slug.startsWith("intelligence-") && slug !== "intelligence";
  if (!isRecord || document.querySelector(".trust-citation")) return;
  const title = pageTitle();
  const url = canonicalUrl();
  const accessed = new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
  const citation = `Nitish Kumar (thenitishkr), "${title}", thenitishkr.in, ${url}, accessed ${accessed}.`;
  const block = document.createElement("section");
  block.className = "section trust-citation";
  block.setAttribute("aria-label", "Trust and citation");
  block.innerHTML = `
    <div>
      <p class="eyebrow">Trust / citation</p>
      <h2>Cite this public-interest record.</h2>
      <p>This record distinguishes verified source material, documented allegations, research analysis, and public commentary. It is maintained for research, documentation, journalism, and lawful public-interest review.</p>
      <p class="citation-text">${escapeHtml(citation)}</p>
    </div>
    <div class="citation-actions">
      <a class="btn ghost" href="https://orcid.org/0009-0004-6840-4463" target="_blank" rel="noopener">ORCID record</a>
      <button class="btn" type="button" data-copy-citation="${escapeHtml(citation)}">Copy citation</button>
    </div>`;
  const related = document.querySelector(".related-records");
  const share = document.querySelector(".share-follow");
  if (share) share.parentNode.insertBefore(block, share);
  else if (related) related.after(block);
}

installRecordToolkit();
installRelatedRecords();
installTrustCitation();

document.querySelectorAll('[data-share-x], [data-share-linkedin]').forEach((link) => {
  const url = encodeURIComponent(canonicalUrl());
  if (link.hasAttribute('data-share-x')) link.href = `https://x.com/intent/tweet?url=${url}&text=${encodeURIComponent(pageTitle())}`;
  if (link.hasAttribute('data-share-linkedin')) link.href = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${encodeURIComponent(pageTitle())}`;
});

document.querySelectorAll('[data-copy-link], [data-copy-citation]').forEach((button) => {
  button.addEventListener('click', async () => {
    const original = button.textContent;
    const value = button.getAttribute("data-copy-citation") || canonicalUrl();
    try {
      await navigator.clipboard.writeText(value);
      button.textContent = button.hasAttribute("data-copy-citation") ? 'Citation copied' : 'Link copied';
      setTimeout(() => { button.textContent = original; }, 1800);
    } catch (_) {
      button.textContent = 'Copy failed';
      setTimeout(() => { button.textContent = original; }, 1800);
    }
  });
});
