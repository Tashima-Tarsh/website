import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const templatePath = path.join(root, "index.html");
const template = fs.readFileSync(templatePath, "utf8");

const bodyStart = template.indexOf("<body>");
const mainStart = template.indexOf('<main id="main-content">');
const footerStart = template.indexOf('<footer class="site-footer">');
const footerEnd = template.indexOf("</footer>", footerStart) + "</footer>".length;
const scriptMatch = template.match(/<script src="\/script\.js\?v=[^"]+" defer><\/script>/);

if (bodyStart === -1 || mainStart === -1 || footerStart === -1 || footerEnd === -1 || !scriptMatch) {
  throw new Error("Could not extract the live HTML shell from index.html");
}

const bodyShell = template.slice(bodyStart + "<body>".length, mainStart);
const footerShell = template.slice(footerStart, footerEnd);
const siteScript = scriptMatch[0];
const launchDateIso = "2026-07-20T00:00:00+05:30";
const launchDateDisplay = "20 July 2026";

const pages = [
  {
    dir: path.join(root, "intelligence", "documents"),
    canonical: "https://thenitishkr.in/intelligence/documents/",
    slugLabel: "Documents",
    title: "Document Records",
    description: "Surprise Element is being prepared for release on 20 July 2026.",
  },
  {
    dir: path.join(root, "intelligence", "documents", "adtech-surveillance-evidence"),
    canonical: "https://thenitishkr.in/intelligence/documents/adtech-surveillance-evidence/",
    slugLabel: "AdTech Surveillance Evidence",
    title: "AdTech Surveillance Evidence",
    description: "This document page is being prepared for release on 20 July 2026.",
  },
  {
    dir: path.join(root, "intelligence", "documents", "apus-android-apk-analysis"),
    canonical: "https://thenitishkr.in/intelligence/documents/apus-android-apk-analysis/",
    slugLabel: "APUS APK Behaviour Analysis",
    title: "APUS APK Behaviour Analysis",
    description: "This document page is being prepared for release on 20 July 2026.",
  },
  {
    dir: path.join(root, "intelligence", "documents", "digital-arrest-root-cause"),
    canonical: "https://thenitishkr.in/intelligence/documents/digital-arrest-root-cause/",
    slugLabel: "Digital Arrest Root Cause",
    title: "Digital Arrest Root Cause",
    description: "This document page is being prepared for release on 20 July 2026.",
  },
  {
    dir: path.join(root, "intelligence", "documents", "digital-dacoit-evidence"),
    canonical: "https://thenitishkr.in/intelligence/documents/digital-dacoit-evidence/",
    slugLabel: "Digital Dacoit Evidence Report",
    title: "Digital Dacoit Evidence Report",
    description: "This document page is being prepared for release on 20 July 2026.",
  },
  {
    dir: path.join(root, "intelligence", "documents", "digital-dacoity-national-importance"),
    canonical: "https://thenitishkr.in/intelligence/documents/digital-dacoity-national-importance/",
    slugLabel: "Digital Dacoity and National Importance",
    title: "Digital Dacoity and National Importance",
    description: "This document page is being prepared for release on 20 July 2026.",
  },
  {
    dir: path.join(root, "intelligence", "documents", "disha-whitepaper"),
    canonical: "https://thenitishkr.in/intelligence/documents/disha-whitepaper/",
    slugLabel: "DISHA Whitepaper",
    title: "DISHA Whitepaper",
    description: "This document page is being prepared for release on 20 July 2026.",
  },
  {
    dir: path.join(root, "intelligence", "documents", "forensic-intelligence-report"),
    canonical: "https://thenitishkr.in/intelligence/documents/forensic-intelligence-report/",
    slugLabel: "Forensic Intelligence Report",
    title: "Forensic Intelligence Report",
    description: "This document page is being prepared for release on 20 July 2026.",
  },
  {
    dir: path.join(root, "intelligence", "documents", "intelligence-report-visual"),
    canonical: "https://thenitishkr.in/intelligence/documents/intelligence-report-visual/",
    slugLabel: "Intelligence Report Visual Record",
    title: "Intelligence Report Visual Record",
    description: "This document page is being prepared for release on 20 July 2026.",
  },
  {
    dir: path.join(root, "intelligence", "documents", "wp-crl-163-2026"),
    canonical: "https://thenitishkr.in/intelligence/documents/wp-crl-163-2026/",
    slugLabel: "W.P.(Crl.) 163/2026",
    title: "W.P.(Crl.) 163/2026",
    description: "This document page is being prepared for release on 20 July 2026.",
  },
  {
    dir: path.join(root, "intelligence", "documents", "wp-crl-394-2025"),
    canonical: "https://thenitishkr.in/intelligence/documents/wp-crl-394-2025/",
    slugLabel: "W.P.(Crl.) 394/2025",
    title: "W.P.(Crl.) 394/2025",
    description: "This document page is being prepared for release on 20 July 2026.",
  },
];

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
  })[char]);
}

function buildBreadcrumb(page) {
  const items = [
    { name: "Home", url: "https://thenitishkr.in/" },
    { name: "Intelligence", url: "https://thenitishkr.in/intelligence/" },
    { name: "Documents", url: "https://thenitishkr.in/intelligence/documents/" },
  ];

  if (page.canonical !== "https://thenitishkr.in/intelligence/documents/") {
    items.push({ name: page.slugLabel, url: page.canonical });
  }

  return items;
}

function buildHead(page) {
  const pageTitle = `${page.title} | thenitishkr`;
  const description = page.description;
  const breadcrumbItems = buildBreadcrumb(page);
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    url: page.canonical,
    description,
    inLanguage: "en-IN",
    dateModified: "2026-06-23T00:00:00+05:30",
  };

  return `<!doctype html>
<html lang="en-IN">
<head>
  <script src="https://analytics.ahrefs.com/analytics.js" data-key="raXJnI4KDG8kEc2xtPYpYQ" async></script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-YJ314E1YHG"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-YJ314E1YHG');
  </script>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" href="/favicon.ico?v=tnk-20260610" sizes="any">
  <link rel="icon" href="/assets/brand/favicon-64.png?v=tnk-20260610" type="image/png" sizes="64x64">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=tnk-20260610" sizes="180x180">
  <title>${escapeHtml(pageTitle)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="manifest" href="/site.webmanifest">
  <meta name="theme-color" content="#062651">
  <link rel="canonical" href="${page.canonical}">
  <link rel="alternate" type="application/rss+xml" title="thenitishkr research and evidence feed" href="https://thenitishkr.in/feed.xml">
  <link rel="me" href="https://x.com/thenitishkr">
  <link rel="me" href="https://www.linkedin.com/in/thenitishkr">
  <link rel="me" href="https://thenitishkr.substack.com">
  <link rel="me" href="https://medium.com/@thenitishkr">
  <link rel="me" href="https://github.com/Tashima-Tarsh">
  <link rel="me" href="https://www.instagram.com/thenitishkr">
  <link rel="me" href="https://www.facebook.com/thenitishkr">
  <link rel="me" href="https://www.reddit.com/user/Ok-File-6559/">
  <link rel="me" href="https://www.quora.com/profile/Nitish-Kumar-11545">
  <link rel="me" href="https://orcid.org/0009-0004-6840-4463">
  <link rel="me" href="https://www.wikidata.org/wiki/Q140001166">
  <link rel="me" href="https://www.amazon.com/author/nikukr">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${page.canonical}">
  <meta property="og:title" content="${escapeHtml(pageTitle)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:image" content="https://thenitishkr.in/assets/images/og/intelligence.png?v=20260608engagement">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@thenitishkr">
  <meta name="twitter:creator" content="@thenitishkr">
  <meta name="twitter:title" content="${escapeHtml(pageTitle)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="https://thenitishkr.in/assets/images/og/intelligence.png?v=20260608engagement">
  <link rel="dns-prefetch" href="https://analytics.ahrefs.com">
  <link rel="dns-prefetch" href="https://www.googletagmanager.com">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Libre+Franklin:wght@400;600;700;800;900&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Libre+Franklin:wght@400;600;700;800;900&display=swap"></noscript>
  <link rel="stylesheet" href="/styles.css?v=20260613">
  <meta name="IndexNow-Verification" content="a0151dcfc802e79c4c6818a68dfd9fef">
  <style>
    .coming-shell {
      max-width: 1200px;
      margin: 0 auto;
      padding: 34px 20px 10px;
    }
    .coming-breadcrumb {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 22px;
      color: var(--muted);
      font-size: 13px;
    }
    .coming-breadcrumb a {
      color: var(--intel-navy, #062651);
      text-decoration: none;
    }
    .coming-panel {
      display: grid;
      grid-template-columns: minmax(0, 1.1fr) minmax(320px, .9fr);
      gap: 24px;
      align-items: stretch;
      margin-bottom: 28px;
    }
    .coming-card,
    .countdown-card,
    .coming-note {
      border: 1px solid rgba(7,26,66,.14);
      border-radius: var(--radius);
      background: #fff;
      box-shadow: var(--shadow);
    }
    .coming-card {
      padding: clamp(28px, 4vw, 42px);
      border-top: 4px solid #12437a;
      background: linear-gradient(180deg, #fffdfa 0%, #ffffff 100%);
    }
    .coming-card h1 {
      margin: 0;
      font-size: clamp(40px, 6vw, 74px);
      line-height: .95;
    }
    .coming-kicker,
    .coming-meta-label {
      display: inline-flex;
      align-items: center;
      padding: 7px 12px;
      border: 1px solid rgba(7,26,66,.14);
      border-radius: 999px;
      background: #fff8ee;
      color: #12437a;
      font-size: 11px;
      font-weight: 900;
      letter-spacing: .12em;
      text-transform: uppercase;
    }
    .coming-line {
      margin: 18px 0 0;
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: clamp(28px, 3.5vw, 42px);
      line-height: 1.12;
      color: #062651;
    }
    .coming-copy {
      max-width: 720px;
      margin-top: 18px;
      color: #353c48;
      font-size: 16px;
      line-height: 1.7;
    }
    .coming-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 24px;
    }
    .countdown-card {
      padding: 26px 24px;
      border-top: 4px solid #062651;
      background: #071a42;
      color: #fffdf8;
    }
    .countdown-card h2 {
      margin: 12px 0 0;
      font-size: 30px;
      line-height: 1.1;
      color: #fff;
    }
    .countdown-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
      margin-top: 22px;
    }
    .countdown-unit {
      padding: 16px 12px;
      border-radius: 16px;
      background: rgba(255,255,255,.08);
      border: 1px solid rgba(255,255,255,.12);
      text-align: center;
    }
    .countdown-value {
      display: block;
      font-size: clamp(28px, 5vw, 44px);
      font-weight: 900;
      line-height: 1;
      letter-spacing: -.03em;
      color: #fff;
    }
    .countdown-label {
      display: block;
      margin-top: 8px;
      font-size: 11px;
      font-weight: 900;
      letter-spacing: .14em;
      text-transform: uppercase;
      color: #c8d4e8;
    }
    .countdown-date {
      margin-top: 18px;
      color: #d8e3f0;
      font-size: 14px;
      line-height: 1.6;
    }
    .coming-note {
      padding: 22px 24px;
      margin-bottom: 34px;
    }
    .coming-note-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 18px;
    }
    .coming-note h3 {
      margin: 12px 0 8px;
      font-size: 20px;
    }
    .coming-note p {
      color: var(--muted);
      font-size: 14px;
      line-height: 1.65;
    }
    .button-row {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
    @media (max-width: 900px) {
      .coming-panel,
      .coming-note-grid,
      .countdown-grid {
        grid-template-columns: 1fr 1fr;
      }
      .coming-panel {
        grid-template-columns: 1fr;
      }
    }
    @media (max-width: 640px) {
      .coming-shell {
        padding-top: 24px;
      }
      .countdown-grid,
      .coming-note-grid {
        grid-template-columns: 1fr 1fr;
      }
    }
  </style>
  <script type="application/ld+json">${JSON.stringify(webpageSchema)}</script>
  <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>
</head>`;
}

function buildMain(page) {
  const breadcrumbItems = buildBreadcrumb(page);
  const crumbs = breadcrumbItems
    .map((item, index) => {
      const isLast = index === breadcrumbItems.length - 1;
      return isLast
        ? `<span aria-current="page">${escapeHtml(item.name)}</span>`
        : `<a href="${new URL(item.url).pathname}">${escapeHtml(item.name)}</a>`;
    })
    .join("<span aria-hidden=\"true\">/</span>");

  const label = page.canonical === "https://thenitishkr.in/intelligence/documents/"
    ? "Document Section"
    : "Reserved Document Route";

  return `<main id="main-content">
  <div class="coming-shell">
    <nav class="coming-breadcrumb" aria-label="Breadcrumb">${crumbs}</nav>
    <section class="coming-panel" aria-labelledby="coming-title">
      <article class="coming-card">
        <span class="coming-kicker">Surprise Element</span>
        <h1 id="coming-title">Coming Soon</h1>
        <p class="coming-line">${escapeHtml(page.title)} will go live on ${launchDateDisplay}.</p>
        <p class="coming-copy">This route is reserved and the final page is now being prepared inside the live HTML site shell. The URL is active, the route is preserved, and the published version will appear automatically when the countdown ends.</p>
        <div class="coming-actions button-row">
          <a class="button" href="/intelligence/">Back to Intelligence Archive</a>
          <a class="button secondary" href="/disha/">Open DISHA</a>
          <a class="button secondary" href="/sitemap/">Research Index</a>
        </div>
      </article>
      <aside class="countdown-card" aria-live="polite">
        <span class="coming-meta-label">${label}</span>
        <h2>Countdown to Launch</h2>
        <div class="countdown-grid" data-countdown="${launchDateIso}">
          <div class="countdown-unit"><span class="countdown-value" data-days>0</span><span class="countdown-label">Days</span></div>
          <div class="countdown-unit"><span class="countdown-value" data-hours>0</span><span class="countdown-label">Hours</span></div>
          <div class="countdown-unit"><span class="countdown-value" data-minutes>0</span><span class="countdown-label">Minutes</span></div>
          <div class="countdown-unit"><span class="countdown-value" data-seconds>0</span><span class="countdown-label">Seconds</span></div>
        </div>
        <p class="countdown-date">Launch target: <strong>${launchDateDisplay}</strong><br>Timezone: India Standard Time</p>
      </aside>
    </section>
    <section class="coming-note" aria-labelledby="coming-note-title">
      <span class="coming-meta-label">Release Note</span>
      <h2 id="coming-note-title">This page is scheduled for publication on ${launchDateDisplay}.</h2>
      <div class="coming-note-grid">
        <article>
          <h3>Reserved route</h3>
          <p>This address is active and will publish the full page here when release is complete.</p>
        </article>
        <article>
          <h3>Archive continuity</h3>
          <p>Existing links can continue to point to this route without any change of address.</p>
        </article>
        <article>
          <h3>Launch timing</h3>
          <p>The countdown reflects the scheduled release date of ${launchDateDisplay}.</p>
        </article>
      </div>
    </section>
  </div>
</main>
<section class="section share-follow" id="archive-links" aria-label="Stay updated">
  <div>
    <p class="eyebrow">Release update</p>
    <h2>Watch this route go live.</h2>
    <p>The URL is already preserved in the archive. When the final page is published, this route will switch from countdown mode to the completed record without changing the address.</p>
  </div>
  <div class="share-actions">
    <a class="button secondary" href="/feed.xml">Follow the feed</a>
    <a class="button secondary" href="/intelligence/">Browse case files</a>
    <a class="button" href="https://thenitishkr.substack.com" target="_blank" aria-label="Get record updates (opens in new tab)" rel="noopener">Get record updates</a>
  </div>
</section>`;
}

const countdownScript = `<script>
  (() => {
    const root = document.querySelector("[data-countdown]");
    if (!root) return;
    const target = new Date(root.getAttribute("data-countdown")).getTime();
    const dayNode = root.querySelector("[data-days]");
    const hourNode = root.querySelector("[data-hours]");
    const minuteNode = root.querySelector("[data-minutes]");
    const secondNode = root.querySelector("[data-seconds]");

    function update() {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      dayNode.textContent = String(days);
      hourNode.textContent = String(hours).padStart(2, "0");
      minuteNode.textContent = String(minutes).padStart(2, "0");
      secondNode.textContent = String(seconds).padStart(2, "0");
    }

    update();
    setInterval(update, 1000);
  })();
</script>`;

for (const page of pages) {
  fs.mkdirSync(page.dir, { recursive: true });
  const html = `${buildHead(page)}
<body>${bodyShell}${buildMain(page)}${footerShell}
${countdownScript}
${siteScript}
</body>
</html>
`;
  fs.writeFileSync(path.join(page.dir, "index.html"), html);
}

console.log(`Rendered ${pages.length} coming-soon document pages with the live HTML shell.`);
