# Phase 3 — Search Engine Owner Actions

Generated: 2026-06-16 | Branch: `seo/phase-3-discovery-distribution`

---

## Google Search Console

| Action | Reason | Repository Dependency | Permission Required | Expected Result | How to Verify |
|---|---|---|---|---|---|
| Verify site ownership | Required to submit sitemap and see indexing data | `a0151dcfc802e79c4c6818a68dfd9fef.txt` already at root | Google account with site admin | Ownership confirmed | Green checkmark in GSC |
| Submit `sitemap.xml` | Informs Google of all indexable pages | `sitemap.xml` (39 URLs, valid XML) | GSC ownership | Sitemap accepted, URLs queued for crawl | GSC → Sitemaps → Status: Success |
| Submit `news-sitemap.xml` | For Google News discovery | `news-sitemap.xml` (1 article) | GSC ownership | News sitemap accepted | GSC → Sitemaps → News sitemap status |
| Inspect `/article-12/` | Verify indexing of key research page | Canonical URL in header | GSC ownership | URL is indexed | GSC → URL Inspection → "URL is on Google" |
| Inspect `/disha/validation/` | Verify 97% validation page indexed | Newly strengthened page | GSC ownership | Indexed | GSC → URL Inspection |
| Inspect `/intelligence/` | Verify primary archive indexed | Core page | GSC ownership | Indexed | GSC → URL Inspection |
| Review coverage report | Find any crawl errors or exclusions | — | GSC ownership | No unexpected errors | GSC → Indexing → Pages |
| Review Core Web Vitals | Performance audit | — | GSC ownership | Passes for all pages | GSC → Experience → Core Web Vitals |
| Export query data | Understand search traffic | — | GSC ownership | Query metrics | GSC → Performance → Export |

---

## Bing Webmaster Tools

| Action | Reason | Repository Dependency | Permission Required | Expected Result | How to Verify |
|---|---|---|---|---|---|
| Verify site | Required for sitemap submission | `msvalidate.01` meta already in homepage `<head>` | Microsoft account | Ownership verified | Green status in Bing WMT |
| Submit `sitemap.xml` | Inform Bing of all indexable pages | `sitemap.xml` | Bing WMT ownership | Sitemap accepted | Bing WMT → Sitemaps → Success |
| Submit `news-sitemap.xml` | For Bing News | `news-sitemap.xml` | Bing WMT ownership | Accepted | Bing WMT → Sitemaps |
| Validate IndexNow | Confirm IndexNow integration | `a0151dcfc802e79c4c6818a68dfd9fef.txt` + IndexNow API endpoint | Bing WMT ownership | IndexNow active | Bing WMT → IndexNow → Active |
| Inspect priority URLs | Verify key pages indexed | — | Bing WMT ownership | Indexed | Bing WMT → URL Inspection |
| Review crawl errors | Fix any issues | — | Bing WMT ownership | No errors | Bing WMT → Reports → Site Scan |

---

## IndexNow Configuration (Already Active)

| Item | Status |
|---|---|
| Key file | ✅ `a0151dcfc802e79c4c6818a68dfd9fef.txt` at root |
| Submission script | ✅ `scripts/submit-indexnow.mjs` |
| Payload file | ✅ `indexnow-payload.json` |
| Manual submission | ✅ Ran via `npm run indexnow` |

**Note:** IndexNow is a push protocol. URLs must be submitted each time content changes. The key is public by protocol design — this is normal and expected. Create an `INDEXNOW_KEY` environment variable in CI for automated production-only submissions (the key value is already public; the env var enables automation).

---

## ORCID Profile Update

| Action | Reason | How |
|---|---|---|
| Add website | Link to thenitishkr.in | ORCID → Edit profile → Websites → Add `https://thenitishkr.in/` |
| Add works | List published books and research | ORCID → Works → Add → Manual entry |
| Verify alternate name | `thenitishkr` listed as alternate name | ORCID → Names → Add "Also known as" |
| Add Wikidata link | Link Q140001166 | ORCID → Identifiers → Add Wikidata |

---

## Wikidata Entity Update

| Action | Status |
|---|---|
| Official website (`P856`) | ✅ Already present (Q140001166) |
| DISHA entity (`Q140167664`) | ✅ Already linked via `sameAs` |
| Books as works | Owner to add `P800` (notable work) claims if independently verifiable |
| ORCID (`P496`) | Owner to verify link is bidirectional |

**Do not add claims** without independently verifiable sources. Wikidata requires citations from reliable published sources.

---

## Duplicate RSS Removed

| Action | Status |
|---|---|
| `/rss.xml` → redirect to `/feed.xml` | ✅ Added to `_redirects` (301) |

---

## Not Yet Available (Owner Decision Required)

| Service | What's Needed |
|---|---|
| Zenodo / OSF | Account creation; dataset/paper deposit when ready |
| GitHub Releases | Tagged version; release notes; approved attachment packages |
| DOI creation | Via Zenodo/OSF after deposit (DOI not invented) |