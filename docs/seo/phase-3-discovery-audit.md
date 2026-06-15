# Phase 3 — Discovery Audit

Generated: 2026-06-16 | Branch: `seo/phase-3-discovery-distribution`
Baseline: `main` at the Phase 1/2 closeout commit

## Gate Verification

| Check | Status | Evidence |
|---|---|---|
| Unknown URLs return 404 | ✅ | Tested 3 nonexistent routes → 404 |
| Retired PDFs return 410 | ✅ | 4 URLs in `_redirects` with 410 |
| No retired PDF serves homepage HTML | ✅ | 410 returns text/plain |
| DCP legacy URLs redirect directly | ✅ | 1 hop, 301 |
| Evidence Submissions routing intentional | ✅ | 301→`/digital-arrest-data-harm/` |
| 97% statement + Validation page consistent | ✅ | Statement preserved; validation page contextualises |
| sitemap.xml validates | ✅ | 39 canonical URLs, valid XML |
| Sitemap excludes redirects/noindex/404/410 | ✅ | Verified |
| Phase 1/2 build/tests pass | ✅ | `npm run audit` passes (48 pages) |

---

## Discovery Feature Inventory

| Feature | Route/File | HTTP | Content-Type | Problem | Risk | Recommended Action |
|---|---|---|---|---|---|---|
| Robots | `/robots.txt` | 200 | text/plain | None | Low | Keep as-is |
| XML Sitemap | `/sitemap.xml` | 200 | application/xml | None | Low | Keep as-is |
| News Sitemap | `/news-sitemap.xml` | 200 | application/xml | Only 1 article | Low | Add more news articles as published |
| Human Sitemap | `/sitemap/` | 200 | text/html | None | Low | Keep as-is |
| RSS Feed | `/feed.xml` | 200 | application/xml | None | Low | Validate; add Atom discovery tag option |
| RSS Duplicate | `/rss.xml` | 200 | application/xml | Duplicate of feed.xml | Medium — duplicate content | Add 301 redirect to `/feed.xml` |
| Atom Feed | `/feed.atom` | 404 | text/html (404 page) | Not built | Low | Do not build (RSS sufficient) |
| JSON Feed | `/feed.json` | 404 | text/html (404 page) | Not built | Low | Not needed; JSON API covers programmatic access |
| Feed discovery tags | In `<head>` of pages | — | — | Only RSS tag present on homepage | Low | Add to all section hubs |
| Public API | `/api/publications.json` | 404 | text/html (404 page) | Not built | Medium — missing machine-readable record | Build |
| IndexNow Key | `a0151dcfc802e79c4c6818a68dfd9fef.txt` | 200 | text/plain | Key is public (by protocol design) | Low | Keep |
| IndexNow Script | `scripts/submit-indexnow.mjs` | — | — | Works; uses indexnow-payload.json | Low | Keep; add CI workflow note |
| Citation Files | None | — | — | No .bib, .ris, .txt, CITATION.cff | High — research not citable | Build for priority pages |
| Datasets | `/research-datasets/` | 200 | text/html | Source register, not structured datasets | Low | Renamed; classify honestly |
| Dataset CSVs | None | — | — | No genuine datasets exist | Low | Document honestly; owner to create if desired |
| Media Desk | `/media/` | 200 | text/html | Coverage list only; no downloadable kit | Medium — journalists lack resources | Add downloadable media kit section |
| Analytics | GA4 + Ahrefs | Active | — | Two platforms | Low | Document; consider consolidating |
| Search Console | `a0151dcfc802e79c4c6818a68dfd9fef.txt` | 200 | text/plain | Serves dual purpose (IndexNow + GSC) | Low | Owner to verify in GSC |
| Bing verification | None found | — | — | No Bing-specific verification file | Medium | Add `msvalidate.01` meta (already in homepage) or XML file |
| ORCID | `0009-0004-6840-4463` | Linked | — | Present on all pages | Low | Keep |
| Wikidata | `Q140001166` | Linked | — | Present in sameAs | Low | Keep |
| GitHub Releases | None | — | — | No tagged releases | Low | Owner decision |
| Zenodo / OSF | None | — | — | Not used | Low | Owner decision |
| CITATION.cff | None | — | — | Missing | Medium | Create |
| Social metadata | Open Graph + Twitter Cards | Present | — | Covers all major pages | Low | Keep; verify image assets exist |

---

## Production Behaviour Summary

| System | Status |
|---|---|
| Search engine crawling | Enabled (robots.txt allows all) |
| Sitemap discovery | Via robots.txt + IndexNow ping |
| Feed syndication | RSS 2.0 at `/feed.xml` |
| Structured data | JSON-LD on all major pages (Person, Article, Breadcrumb, FAQ, Collection) |
| Social sharing | Open Graph + Twitter Cards with approved images |

---

## Issues Requiring Fix

| Priority | Issue | File(s) |
|---|---|---|
| P0 | Duplicate RSS at `/rss.xml` | Add 301→`/feed.xml` in `_redirects` |
| P0 | No citation infrastructure | Create citation files for 10 priority pages |
| P0 | No machine-readable API | Create `/api/publications.json` |
| P1 | No CITATION.cff | Create |
| P1 | Media Desk lacks downloadable assets | Add media resources section |
| P1 | No Phase 3 documentation exists | Create all required docs |

---

## External Access Required (Owner Actions)

| Service | Action |
|---|---|
| Google Search Console | Verify ownership; submit sitemap; inspect indexing |
| Bing Webmaster Tools | Verify site; submit sitemap; validate IndexNow |
| ORCID | Update profile with website, frameworks, publications |
| Wikidata | Update entity with verified claims |
| Zenodo/OSF | Create records for datasets when ready (owner decision) |
| GitHub Releases | Tag and publish releases when approved (owner decision) |
| Analytics | Review GA4 dashboard; consider event tracking |