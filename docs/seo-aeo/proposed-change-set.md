# Proposed Change Set — Pass A

**Generated from:** All 14 audit documents
**Status:** ⚠️ Requires owner approval. No changes have been implemented.

---

## 1. Change ID Reference

Change IDs use the format: `CATEGORY-NNN`

| Prefix | Category |
|---|---|
| SEO | Technical / SEO |
| AEO | Answer Engine Optimization |
| ENTITY | Entity consistency |
| CONTENT | Content quality |
| LINK | Internal link |
| DIST | Distribution |
| TREND | Trend-opportunity page |

---

## 2. Implementation Batch Rules

Per the Pass A specification:

> The first implementation batch must be small.
> Maximum initial batch:
> - 3 title or description revisions
> - 2 opening-answer revisions
> - 1 internal-link cluster
> - 1 structured-data correction group
> - 1 original evidence asset
> - 1 current-event or trend page only if it passes every quality gate

The proposed changes below are prioritised accordingly.

---

## 3. P0 — Indexing Barriers

### SEO-001: `/410.html` Returns 404

| Attribute | Value |
|---|---|
| **Page/system** | `/410.html` (retired PDF redirect target) |
| **Current state** | `/410.html` returns 404. Retired PDFs redirect to `/410.html` which resolves to 404. |
| **Proposed change** | Option A: Create `/410.html` with proper content (Gone status explanation) + noindex. Option B: Accept 404 (functionally equivalent to 410 for search engines) and remove the retired PDF redirects from `_redirects`. |
| **Evidence** | Live curl verified |
| **Expected benefit** | Clean retirement signal for deprecated URLs |
| **Risk** | Low — 404 and 410 both signal removal |
| **Measurement** | Verify retired PDF URLs return intended status code |
| **Rollback** | Revert `_redirects` changes or delete `/410.html` |
| **Owner approval** | Required |

---

## 4. P1 — High-Confidence Changes (Recommended for Pass B)

### 4.1 Technical Corrections (SEO)

#### SEO-002: Conflicting X-Robots-Tag

| Attribute | Value |
|---|---|
| **Page/system** | `_headers` file — global `/*` rule conflicts with `noindex` paths |
| **Current state** | Global `/*` sets `X-Robots-Tag: index, follow`. Intelligence noindex sub-paths add `X-Robots-Tag: noindex, follow`. Both headers appear on same response. |
| **Proposed change** | Modify the global `/*` rule to set `X-Robots-Tag` only for indexable paths. Remove the global rule and add explicit `index, follow` rules for each indexable path. |
| **Evidence** | Live curl: two `x-robots-tag` headers on `/intelligence/rti-missing-answers/` and `/intelligence/cpgrams-closure-without-relief/` |
| **Expected benefit** | Clean, unambiguous crawler directives |
| **Risk** | Low — must ensure no indexable page loses its `index` directive |
| **Measurement** | Verify `X-Robots-Tag` is single-valued on every page after change |
| **Rollback** | Revert `_headers` to previous version |
| **Owner approval** | Required |

#### SEO-003: Add noindex to Error Pages

| Attribute | Value |
|---|---|
| **Page/system** | `/404.html`, `/410.html` (once created) |
| **Current state** | `/404.html` returns 308 redirect; no `noindex` directive. `/410.html` doesn't exist. |
| **Proposed change** | Add `X-Robots-Tag: noindex` to error pages. Ensure proper status codes. |
| **Evidence** | Live curl: `/404.html` redirects; `/410.html` returns 404 |
| **Expected benefit** | Error pages excluded from index |
| **Risk** | Low |
| **Owner approval** | Required |

### 4.2 Metadata Revisions (SEO)

#### SEO-004: Article 12 — Remove NewsArticle from Schema @type

| Attribute | Value |
|---|---|
| **Page** | `/article-12/` |
| **Current state** | `@type: ["Article","ScholarlyArticle","NewsArticle"]` |
| **Proposed change** | Change to `@type: ["Article","ScholarlyArticle"]` — remove `NewsArticle`. Article 12 is research analysis, not news. |
| **Evidence** | Repository inspection |
| **Expected benefit** | Schema compliance; accurate content-type signal |
| **Risk** | Low |
| **Measurement** | Validate JSON-LD with Google Rich Results Test after change |
| **Rollback** | Revert JSON-LD edit |
| **Owner approval** | Required |

#### SEO-005: Intelligence Page — Fix Duplicate hasPart

| Attribute | Value |
|---|---|
| **Page** | `/intelligence/` |
| **Current state** | `hasPart` array contains 4 copies of the same CreativeWork description |
| **Proposed change** | Remove duplicate entries. Keep one correct `hasPart` entry per case file. |
| **Evidence** | Repository inspection |
| **Expected benefit** | Clean schema; no validator warnings |
| **Risk** | Low |
| **Measurement** | Validate JSON-LD after change |
| **Rollback** | Revert JSON-LD edit |
| **Owner approval** | Required |

### 4.3 Opening-Answer Revisions (AEO)

#### AEO-001: Add Direct Opening Definition for Article 12 Infected

| Attribute | Value |
|---|---|
| **Page** | `/article-12/` |
| **Current state** | Opening paragraph sets context but lacks a concise "Article 12 Infected" definition. The definition appears in an FAQ section lower down. |
| **Proposed change** | Add a concise definition of "Article 12 Infected" as the first content paragraph after the metadata/status block. The definition should state: "Article 12 Infected is a research framework describing how public authorities in India, as defined under Article 12 of the Constitution, operate digital systems that can harm citizens without accountability." |
| **Evidence** | Answer-engine audit: page scored 13/16; direct answer was the key gap |
| **Expected benefit** | AI extractors can immediately surface the concept definition. Improves featured snippet eligibility. |
| **Risk** | Low — describes existing content faithfully |
| **Measurement** | Monitor indexation and direct-answer eligibility in SERPs |
| **Rollback** | Revert the added paragraph |
| **Owner approval** | Required |

#### AEO-002: Add Purpose Statement to Evidence Checklist

| Attribute | Value |
|---|---|
| **Page** | `/digital-arrest-data-harm/evidence-checklist/` |
| **Current state** | Opens with context about legal framework before reaching the checklist purpose |
| **Proposed change** | Add a one-sentence purpose statement at the very top: "This evidence checklist helps victims of digital arrest in India identify and preserve the evidence needed for legal action and record preservation." |
| **Evidence** | Answer-engine audit: page scored 15/16; minor improvement opportunity |
| **Expected benefit** | Clear extractable purpose statement for AEO |
| **Risk** | Low |
| **Rollback** | Revert the added sentence |
| **Owner approval** | Required |

### 4.4 Internal-Link Cluster (LINK)

#### LINK-001, LINK-002, LINK-003: Cross-Link Cluster

| Attribute | Value |
|---|---|
| **Pages** | `/digital-arrest-data-harm/` ↔ `/intelligence/meity-digital-governance/` and `/article-12/automated-decisions/` → `/digital-constitutional-personhood/human-review-remedy/` |
| **Current state** | No cross-links between these related topics |
| **Proposed change** | Add 3 contextual internal links per internal-link-map |
| **Evidence** | Internal link map: these topics are related but not linked |
| **Expected benefit** | Improved internal authority flow; user navigation between related content |
| **Risk** | Low |
| **Measurement** | Verify links are live and anchor text is contextual |
| **Rollback** | Remove added links |
| **Owner approval** | Required |

### 4.5 Structured Data Correction Group (ENTITY)

#### ENTITY-001: Remove Organization Schema from Homepage

| Attribute | Value |
|---|---|
| **Page** | Homepage (`/`) |
| **Current state** | `@type: Organization` with name "thenitishkr — Public Interest Research", founding date 2013, logo |
| **Proposed change** | Remove the Organization schema. The site is a personal research archive, not a legal entity. Keep Person + WebSite types. |
| **Evidence** | Entity audit: Organization schema may mislead search engine entity classification |
| **Expected benefit** | Accurate entity representation in knowledge graphs |
| **Risk** | Low |
| **Measurement** | Validate JSON-LD after change; monitor Knowledge Graph representation |
| **Rollback** | Revert JSON-LD edit |
| **Owner approval** | Required |

### 4.6 Evidence Asset (CONTENT)

#### CONTENT-001: Media Desk Press Kit

| Attribute | Value |
|---|---|
| **Page/system** | `/media/` |
| **Current state** | Contact info only; no downloadable press materials |
| **Proposed change** | Add a downloadable media kit ZIP containing: fact sheet (PDF), framework descriptions, author bio, key statistics, media coverage summary |
| **Evidence** | Content quality audit + external discovery map |
| **Expected benefit** | Journalists and researchers can access verified information for citations |
| **Risk** | Low — no sensitive data in a media kit |
| **Measurement** | Download counts; media kit page visits |
| **Owner approval** | Required |

---

## 5. P2 — Monitor / Defer

| ID | Description | Reason Deferred |
|---|---|---|
| **SEO-006** | Fix `/404.html` trailing-slash redirect | Low impact — Cloudflare Pages standard behavior |
| **SEO-007** | Inline CSS consolidation | Performance — not an indexation issue |
| **SEO-008** | Add more articles to news-sitemap | Will grow naturally with content |
| **ENTITY-002** | Create Wikidata entries for frameworks | Requires Wikidata account + community process |
| **ENTITY-003** | Document shared ISBN on Books page | Minor — cosmetic improvement |
| **DIST-001** | GitHub Release for CITATION.cff | P2 — no immediate impact |
| **DIST-002** | Run Google Trends for Hindi queries | Owner action — depends on demand |
| **TREND-001** | Strengthen `/article-12/ai-systems/` with AI policy analysis | Requires research; not immediate |
| **TREND-002** | Strengthen `/digital-constitutional-personhood/biometric-failure/` with recent evidence | Requires research; not immediate |

---

## 6. P3 — Experimental / Optional

| ID | Description | Note |
|---|---|---|
| **CONTENT-002** | Check "Transformative" usage context | Cosmetic — not a priority |
| **DIST-003** | Medium syndication (conditional) | Requires canonical strategy |
| **DIST-004** | Zenodo/OSF deposits (conditional) | Requires completed research outputs |

---

## 7. Owner-to-Complete Actions (Not Code Changes)

| ID | Action | Priority |
|---|---|---|
| **OWNER-001** | Verify Google Search Console property | P0 |
| **OWNER-002** | Verify Bing Webmaster Tools property | P0 |
| **OWNER-003** | Submit sitemaps to GSC and Bing WMT | P0 |
| **OWNER-004** | Run Google Trends research (per trend-opportunity-report.md) | P1 |
| **OWNER-005** | Run SERP research (per current-serp-audit.md) | P1 |
| **OWNER-006** | Set up automated IndexNow submission on content change | P1 |
| **OWNER-007** | Export GSC and Bing WMT data to private-data/ | P1 |
| **OWNER-008** | Review AI training crawler policy (allow/disallow GPTBot, CCBot, Google-Extended) | P1 |
| **OWNER-009** | Create GitHub Release for CITATION.cff | P2 |
| **OWNER-010** | Create Wikidata entries for owned concepts | P2 |

---

## 8. Recommended First Batch (If Approved)

Based on the maximum initial batch rules:

| Batch Slot | Change ID | Type |
|---|---|---|
| 1/3 title/description revisions | AEO-001 | Add direct opening definition (not a title revision, but primary content revision) |
| 2/3 title/description revisions | AEO-002 | Add purpose statement to evidence checklist |
| 3/3 title/description revisions | ENTITY-001 | Remove Organization schema (schema correction) |
| 1/2 opening-answer revisions | AEO-001 | (covered above — same change) |
| 2/2 opening-answer revisions | AEO-002 | (covered above — same change) |
| 1/1 internal-link cluster | LINK-001, LINK-002, LINK-003 | 3 cross-links (counts as 1 cluster) |
| 1/1 structured-data group | SEO-004, SEO-005 | 2 schema fixes (counts as 1 group) |
| 1/1 original evidence asset | CONTENT-001 | Media kit creation |
| 0 trend pages | — | No trend page passes all quality gates yet |

**Total unique changes in first batch:** 6 (AEO-001, AEO-002, ENTITY-001, LINK cluster, SEO-004/005, CONTENT-001)

**All changes are focused, limited, and measurable.**