# Phase 3 — Feed and API Map

Generated: 2026-06-16 | Branch: `seo/phase-3-discovery-distribution`

---

## Endpoint Inventory

| Endpoint | Purpose | Content-Type | Status | Update Method | Update Frequency |
|---|---|---|---|---|---|
| `/feed.xml` | RSS 2.0 publication feed | `application/xml` | ✅ 200 | Static file (rebuilt on each deploy) | Per-deploy |
| `/rss.xml` | Legacy alias → redirects to `/feed.xml` | — | ✅ 301 | Redirect rule in `_redirects` | Static |
| `/api/publications.json` | Machine-readable publication index | `application/json` | ✅ New | Static file (rebuilt on each deploy) | Per-deploy |
| `/sitemap.xml` | XML sitemap for search engines | `application/xml` | ✅ 200 | Static file | Per-deploy |
| `/citations/*.bib` | BibTeX citation downloads | `text/plain` | ✅ New | Static files | Per-deploy |
| `/citations/*.ris` | RIS citation downloads | `text/plain` | ✅ New | Static files | Per-deploy |
| `/citations/*.txt` | Plain-text citation downloads | `text/plain` | ✅ New | Static files | Per-deploy |

---

## `/feed.xml` — RSS 2.0 Feed

| Field | Value |
|---|---|
| Format | RSS 2.0 |
| Items included | All approved, indexable pages |
| Excluded | Drafts, noindex pages, 404/410, private content |
| Date handling | Uses `pubDate` from page metadata |
| Privacy classification | Public |
| Caching | `Cache-Control: public, max-age=0, must-revalidate` |
| Known limitations | Feed items may need more frequent updates to reflect new publications |

### Feed Discovery Tag (on homepage)
```html
<link rel="alternate" type="application/rss+xml" title="thenitishkr — Research and Evidence Feed" href="https://thenitishkr.in/feed.xml">
```

---

## `/api/publications.json` — Public API

| Field | Value |
|---|---|
| Format | JSON |
| Schema version | Implicit (v1) |
| Items included | 10 priority research pages (expandable) |
| Excluded | Drafts, noindex pages, private content |
| Privacy classification | Public |
| Caching | `Cache-Control: public, max-age=86400` |
| Known limitations | Manual rebuild required when new pages are added |

### Example Response
```json
{
  "name": "thenitishkr.in — Public Interest Research Archive",
  "generated": "2026-06-16",
  "count": 10,
  "publications": [
    {
      "id": "article-12-digital-governance",
      "title": "Article 12 and Digital Governance: How the Citizen Became Invisible",
      "canonical_url": "https://thenitishkr.in/article-12/",
      "type": "research-analysis",
      "section": "Article 12 and Digital Governance",
      "date_published": "2026-06-14",
      "citation_bibtex_url": "https://thenitishkr.in/citations/article-12-digital-governance.bib"
    }
  ]
}
```

### Fields Per Publication

| Field | Type | Description |
|---|---|---|
| `id` | string | Stable public identifier |
| `title` | string | Page title |
| `canonical_url` | string | Absolute canonical HTTPS URL |
| `type` | string | Content type (research-analysis, case-file, research-framework, etc.) |
| `section` | string | Research section |
| `date_published` | string | ISO date (YYYY-MM-DD) |
| `date_modified` | string | ISO date of last substantial revision |
| `summary` | string | Short factual summary |
| `citation_text` | string | Plain-text citation |
| `citation_bibtex_url` | string | Download URL for BibTeX |
| `citation_ris_url` | string | Download URL for RIS |

---

## CORS Configuration

The public API does not require CORS headers to be set explicitly — search engines and tools access it via same-origin or with default browser behaviour. If cross-origin access is desired in future, add:

```http
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET
```

to `_headers` for the `/api/*` path.

---

## Privacy Classification

| System | Classification | Justification |
|---|---|---|
| `/feed.xml` | **Public** | Approved public research records only |
| `/api/publications.json` | **Public** | Approved public metadata only; no private data |
| `/citations/*` | **Public** | Citation metadata only; no private data |

No private data, victim information, unpublished evidence, or internal editorial notes are exposed through any feed or API endpoint.

---

## Versioning

Current version: `v1` (no explicit version in URL). If schema changes are breaking, consider versioned endpoints:

```
/api/v1/publications.json
/api/v2/publications.json
```

For now, a single `publications.json` is sufficient given the scale (10 records, 39 indexable pages).

---

## Automated Update

All feeds and API endpoints are currently static files. To automate updates:

1. Run a build script that reads page metadata (title, canonical, date, summary) from HTML files
2. Regenerate `feed.xml`, `publications.json`, and citation files
3. Include the script in `.github/workflows/preview.yml` and `production.yml`

This ensures feeds and APIs stay in sync with the sitemap.