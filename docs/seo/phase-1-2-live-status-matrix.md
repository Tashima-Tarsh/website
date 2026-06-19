# Phase 1 & Phase 2 Live Status Matrix

Generated: 2026-06-16 | Branch: `fix/phase-1-2-closeout`

## Routing Status

| URL | Expected | Actual (Live) | Fixed in Preview | Content-Type | Redirect Dest | Canonical | Sitemap | Result |
|---|---|---|---|---|---|---|---|---|
| `/` | 200 | 200 | 200 (unchanged) | text/html | — | `/` | Yes | ✅ |
| `www.thenitishkr.in/` | 301→`/` | 301→`/` | 301→`/` (unchanged) | — | `/` | `/` | — | ✅ |
| `/article-12` | 308→`/article-12/` | 308→`/article-12/` | 308→`/article-12/` | — | `/article-12/` | `/article-12/` | Yes | ✅ |
| `/article-12.html` | 301→`/article-12/` | 301→`/article-12/` | 301→`/article-12/` | — | `/article-12/` | `/article-12/` | — | ✅ |
| `/what-is-digital-constitutional-personhood` | 301→`/digital-constitutional-personhood/` | 301→`/digital-constitutional-personhood/` | 301→`/digital-constitutional-personhood/` | — | `/digital-constitutional-personhood/` | — | ✅ |
| `/what-is-digital-constitutional-personhood.html` | 301→`/digital-constitutional-personhood/` | **404** ❌ | **301→`/digital-constitutional-personhood/`** ✅ | — | `/digital-constitutional-personhood/` | — | — | 🔧 FIXED |
| `/what-is-citizen-not-found` | 301→`/intelligence/citizen-not-found/` | **404** ❌ | **301→`/intelligence/citizen-not-found/`** ✅ | — | `/intelligence/citizen-not-found/` | — | — | 🔧 FIXED |
| `/what-is-citizen-not-found.html` | 301→`/intelligence/citizen-not-found/` | **404** ❌ | **301→`/intelligence/citizen-not-found/`** ✅ | — | `/intelligence/citizen-not-found/` | — | — | 🔧 FIXED |
| `/record/evidence-submissions` | 301→`/digital-arrest-data-harm/` | **404** ❌ | **301→`/digital-arrest-data-harm/`** ✅ | — | `/digital-arrest-data-harm/` | — | — | 🔧 FIXED |
| `/record/evidence-submissions.html` | 301→`/digital-arrest-data-harm/` | **404** ❌ | **301→`/digital-arrest-data-harm/`** ✅ | — | `/digital-arrest-data-harm/` | — | — | 🔧 FIXED |
| `/record/evidence-submissions/` | 301→`/digital-arrest-data-harm/` | **404** ❌ | **301→`/digital-arrest-data-harm/`** ✅ | — | `/digital-arrest-data-harm/` | — | — | 🔧 FIXED |
| `/sitemap.xml` | 200 | 200 | 200 (unchanged) | application/xml | — | — | robots.txt | ✅ |
| `/sitemap/` | 200 | 200 | 200 (unchanged) | text/html | — | `/sitemap/` | Yes | ✅ |
| `/robots.txt` | 200 | 200 | 200 (unchanged) | text/plain | — | — | — | ✅ |
| `/feed.xml` | 200 | 200 | 200 (unchanged) | application/xml | — | — | — | ✅ |
| Unknown routes | 404 | 404 | 404 (unchanged) | text/html | — | — | — | ✅ |

## Retired PDF Status

| URL | Live Status | Fixed Status | X-Robots-Tag | Removed from Sitemap | Removed from Internal Links |
|---|---|---|---|---|---|
| `/assets/records/intelligence/mity2.pdf` | 404 (HTML) ❌ | **410 Gone** ✅ | noindex, nofollow | ✅ (never in sitemap) | ✅ |
| `/assets/records/intelligence/pil-annexure-book-evidence-traced-final.pdf` | 404 (HTML) ❌ | **410 Gone** ✅ | noindex, nofollow | ✅ | ✅ |
| `/assets/records/intelligence/master-forensic-jamtara-digital-arrest-record-2012-2026.pdf` | 404 (HTML) ❌ | **410 Gone** ✅ | noindex, nofollow | ✅ | ✅ |
| `/assets/records/intelligence/wrt-crl-pil-1632026-2.pdf` | 404 (HTML) ❌ | **410 Gone** ✅ | noindex, nofollow | ✅ | ✅ |

## Sitemap Summary

- URL count: 42
- All HTTPS, all `thenitishkr.in`
- No redirects in sitemap: ✅
- No `noindex` pages in sitemap: ✅
- No retired PDF URLs: ✅
- No legacy `.html` URLs: ✅
- No preview hostnames: ✅
- All `lastmod` values: 2026-06-14 or 2026-06-16

## Footer Link Audit

All 27 pages updated: "Sitemap" → "Research Index" linking to `/sitemap/`