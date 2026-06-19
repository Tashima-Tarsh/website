import https from "node:https";

const site = "thenitishkr.in";
console.log("=".repeat(80));
console.log("CLOUDFLARE PASS A — Production HTTP Audit");
console.log("Date:", new Date().toISOString());
console.log("=".repeat(80));

function fetchUrl(url, label, maxRedirects = 5) {
  return new Promise((resolve) => {
    let currentUrl = url;
    let redirectCount = 0;
    const hops = [];

    function doFetch(reqUrl) {
      const parsed = new URL(reqUrl);
      const opts = {
        hostname: parsed.hostname,
        path: parsed.pathname + parsed.search,
        method: "GET",
        headers: {
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "User-Agent": "Mozilla/5.0 (thenitishkr-cloudflare-audit)",
        },
      };

      https.get(opts, (res) => {
        const hop = {
          url: reqUrl,
          status: res.statusCode,
          contentType: res.headers["content-type"] || "",
          location: res.headers["location"] || "",
          cacheControl: res.headers["cache-control"] || "",
          cfCache: res.headers["cf-cache-status"] || "",
          xRobots: res.headers["x-robots-tag"] || "",
          age: res.headers["age"] || "",
        };
        hops.push(hop);

        if (
          redirectCount < maxRedirects &&
          [301, 302, 303, 307, 308].includes(res.statusCode) &&
          res.headers["location"]
        ) {
          redirectCount++;
          const nextUrl = new URL(res.headers["location"], reqUrl).href;
          res.resume();
          doFetch(nextUrl);
        } else {
          let body = "";
          res.on("data", (d) => (body += d));
          res.on("end", () => {
            const text = body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 150);
            resolve({ label, hops, finalStatus: hops[hops.length - 1].status, finalCT: hops[hops.length - 1].contentType, bodySig: text, finalCache: hops[hops.length - 1].cacheControl, finalCF: hops[hops.length - 1].cfCache, finalRobots: hops[hops.length - 1].xRobots });
          });
        }
      }).on("error", (e) => resolve({ label, error: e.message }));
    }

    doFetch(currentUrl);
  });
}

const tests = [
  // Core pages
  { url: `https://${site}/`, label: "Homepage" },
  { url: `https://www.${site}/`, label: "www redirect" },
  { url: `https://${site}/robots.txt`, label: "robots.txt" },
  { url: `https://${site}/sitemap.xml`, label: "sitemap.xml" },
  { url: `https://${site}/feed.xml`, label: "feed.xml" },
  { url: `https://${site}/rss.xml`, label: "rss.xml (dup)" },

  // Research pages
  { url: `https://${site}/article-12/`, label: "Article 12" },
  { url: `https://${site}/disha/`, label: "DISHA" },
  { url: `https://${site}/intelligence/`, label: "Intelligence" },
  { url: `https://${site}/about/`, label: "About" },

  // Static assets
  { url: `https://${site}/styles.css?v=20260613`, label: "CSS" },
  { url: `https://${site}/script.js?v=20260609media`, label: "JS" },
  { url: `https://${site}/assets/portrait.webp`, label: "Image" },
  { url: `https://${site}/favicon.ico?v=tnk-20260610`, label: "Favicon" },

  // API / citations
  { url: `https://${site}/api/publications.json`, label: "API" },
  { url: `https://${site}/citations/article-12-digital-governance.bib`, label: "Citation BibTeX" },

  // Unknown routes
  { url: `https://${site}/this-route-must-not-exist-cloudflare-audit`, label: "Unknown route" },
  { url: `https://${site}/random/nonexistent/path/test`, label: "Unknown deep path" },
  { url: `https://${site}/assets/records/intelligence/nonexistent-file-test.pdf`, label: "Unknown PDF" },

  // Retired PDFs
  { url: `https://${site}/assets/records/intelligence/mity2.pdf`, label: "Retired PDF 1" },
  { url: `https://${site}/assets/records/intelligence/pil-annexure-book-evidence-traced-final.pdf`, label: "Retired PDF 2" },
  { url: `https://${site}/assets/records/intelligence/master-forensic-jamtara-digital-arrest-record-2012-2026.pdf`, label: "Retired PDF 3" },
  { url: `https://${site}/assets/records/intelligence/wrt-crl-pil-1632026-2.pdf`, label: "Retired PDF 4" },

  // Legacy routes
  { url: `https://${site}/what-is-digital-constitutional-personhood`, label: "Legacy DCP" },
  { url: `https://${site}/what-is-citizen-not-found`, label: "Legacy CitizenNF" },
  { url: `https://${site}/record/evidence-submissions`, label: "Legacy Evidence Subs" },

  // Preview (if accessible)
  { url: `https://9581b29e.thenitishkr-static.pages.dev/`, label: "Preview homepage" },
  { url: `https://9581b29e.thenitishkr-static.pages.dev/article-12/`, label: "Preview Article 12" },
];

for (const t of tests) {
  const r = await fetchUrl(t.url, t.label);
  console.log(`\n--- ${r.label} ---`);
  console.log(`  URL: ${t.url}`);
  if (r.error) { console.log(`  ERROR: ${r.error}`); continue; }
  console.log(`  Hops: ${r.hops.length}`);
  r.hops.forEach((h, i) => console.log(`  [${i + 1}] ${h.url.slice(0, 80)} → ${h.status} CF:${h.cfCache || '-'} XR:${h.xRobots || '-'}`));
  console.log(`  Final: ${r.finalStatus} CT:${(r.finalCT||'').slice(0,50)} Cache:${(r.finalCache||'').slice(0, 60)}`);
  if (r.bodySig) console.log(`  Body: ${r.bodySig.slice(0, 120)}`);
}

console.log("\n✅ Audit complete.");