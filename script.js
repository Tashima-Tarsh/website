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

function normalizeItem(item, source) {
  const content = item.content || item.description || "";
  return {
    source,
    title: textFromHtml(item.title || "Untitled"),
    link: item.link || item.guid || "#",
    date: item.pubDate ? new Date(item.pubDate) : null,
    summary: textFromHtml(content).slice(0, 180),
    image: item.thumbnail || item.enclosure?.link || firstImageFromHtml(content) || "assets/record.webp"
  };
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
  const jsonResponse = await fetchWithTimeout("https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(feed.url), 12000);
  if (jsonResponse.ok) {
    const data = await jsonResponse.json();
    const items = (data.items || []).map((item) => normalizeItem(item, feed.source));
    if (items.length) return items;
  }

  const rawUrls = [
    "https://api.allorigins.win/raw?url=" + encodeURIComponent(feed.url),
    "https://api.codetabs.com/v1/proxy?quest=" + encodeURIComponent(feed.url)
  ];

  for (const url of rawUrls) {
    const response = await fetchWithTimeout(url, 9000);
    if (!response.ok) continue;
    const items = parseRss(await response.text(), feed.source);
    if (items.length) return items;
  }

  return [];
}

function renderPublications(items) {
  if (!publicationGrid) return;
  if (!items.length) {
    publicationGrid.innerHTML = '<div class="publication-status">Unable to load live publications right now. Substack and Medium feeds remain linked from the footer.</div>';
    return;
  }

  publicationGrid.innerHTML = items.map((item) => {
    const date = item.date && !Number.isNaN(item.date.valueOf())
      ? item.date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
      : "Latest";
    return `
      <article class="publication-card reveal is-visible">
        <a href="${item.link}" target="_blank" rel="noopener">
          <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" loading="lazy" decoding="async">
        </a>
        <div class="publication-body">
          <span class="publication-meta">${escapeHtml(item.source)} · ${escapeHtml(date)}</span>
          <h3><a href="${escapeHtml(item.link)}" target="_blank" rel="noopener">${escapeHtml(item.title)}</a></h3>
          <p>${escapeHtml(item.summary)}</p>
        </div>
      </article>
    `;
  }).join("");
}

function renderMediaCoverage(items) {
  if (!mediaGrid) return;
  if (!items.length) {
    mediaGrid.innerHTML = '<div class="publication-status">No media coverage items found.</div>';
    return;
  }

  mediaGrid.innerHTML = items.map((item, index) => {
    const image = item.remote_image || item.thumbnail || "assets/court.webp";
    return `
    <article class="media-card reveal is-visible">
      <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener">
        <img data-media-image="${index}" src="${escapeHtml(image)}" alt="${escapeHtml(item.outlet + ': ' + item.headline)}" loading="lazy" decoding="async">
      </a>
      <div class="media-body">
        <span class="media-outlet">${escapeHtml(item.outlet)} · ${escapeHtml(item.source_type || 'Coverage')}</span>
        <h3><a href="${escapeHtml(item.url)}" target="_blank" rel="noopener">${escapeHtml(item.headline)}</a></h3>
        <p>${escapeHtml(item.summary || '')}</p>
        <div class="media-actions">
          <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener">Source</a>
          <a href="${escapeHtml(item.archive_url || item.url)}" target="_blank" rel="noopener">Archive</a>
        </div>
      </div>
    </article>
  `;
  }).join("");

  items.forEach((item, index) => {
    if (item.remote_image) return;
    resolveMediaImage(item.url).then((image) => {
      if (!image) return;
      const element = mediaGrid.querySelector(`[data-media-image="${index}"]`);
      if (element) element.src = image;
    });
  });
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
          <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" loading="${index < 4 ? 'eager' : 'lazy'}" decoding="async">
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
    const image = item.remote_image || item.thumbnail || "assets/court.webp";
    return `
      <article class="media-card reveal is-visible">
        <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener">
          <img data-media-image="${index}" src="${escapeHtml(image)}" alt="${escapeHtml(item.outlet + ': ' + item.headline)}" loading="${index < 4 ? 'eager' : 'lazy'}" decoding="async">
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
        if (element) element.src = image;
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
    image: item.remote_image || item.thumbnail || undefined,
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
    const response = await fetch("media-coverage.json");
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
      .sort((a, b) => (b.date || 0) - (a.date || 0));

    renderPublications(items);
  } catch (_) {
    renderPublications([]);
  }
}

loadPublications();
loadMediaCoverage();
