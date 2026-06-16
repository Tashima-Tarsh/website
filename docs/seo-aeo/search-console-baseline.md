# Search Console Baseline — thenitishkr.in

**Audit date:** 2026-06-16
**Status:** ⚠️ No Google Search Console data exports found in repository
**Private data path:** `private-data/search-console/` (gitignored — empty)

---

## 1. Data Availability

| Data Source | Status | Action Required |
|---|---|---|
| GSC property verified | Unknown | Owner to verify in GSC |
| Query data export | ❌ Not available | Owner to export from GSC |
| Page data export | ❌ Not available | Owner to export from GSC |
| Country data | ❌ Not available | Owner to export from GSC |
| Device data | ❌ Not available | Owner to export from GSC |
| Search appearance | ❌ Not available | Owner to export from GSC |
| Core Web Vitals | ❌ Not available | Owner to check GSC → Experience |
| Indexing report | ❌ Not available | Owner to check GSC → Indexing → Pages |
| Sitemap submission status | Unknown | Owner to verify in GSC → Sitemaps |

---

## 2. Recommended GSC Exports

Owner should export the following from Google Search Console and save to `private-data/search-console/` (gitignored):

### Export 1: Query Report
- **Period:** Last 28 complete days (2026-05-19 to 2026-06-15)
- **Format:** CSV or Google Sheets
- **Columns:** Query, Clicks, Impressions, CTR, Average Position
- **Filters:** Web search type, India (or remove country filter to see worldwide)

### Export 2: Page Report
- **Period:** Last 28 complete days
- **Format:** CSV
- **Columns:** Page, Clicks, Impressions, CTR, Average Position

### Export 3: Country Report
- **Period:** Last 28 complete days
- **Format:** CSV
- **Columns:** Country, Clicks, Impressions, CTR, Average Position

### Export 4: Comparison Periods

| Comparison | Period 1 | Period 2 | Purpose |
|---|---|---|---|
| Month-over-month | Last 28 days | Previous 28 days | Short-term trends |
| Quarter-over-quarter | Last 90 days | Previous 90 days | Medium-term trends |
| Year-long | Last 12 months | — | Annual baseline |

---

## 3. Expected Query Categories (Based on Site Content)

Without actual GSC data, these query categories are expected based on site content structure. Owner to verify with real data.

### Branded Queries (Expected)

| Query Pattern | Primary Page |
|---|---|
| `thenitishkr` | `/` |
| `Nitish Kumar thenitishkr` | `/about/` |
| `Nitish Kumar researcher` | `/about/` |
| `Nitish Kumar DISHA` | `/disha/` or `/about/` |
| `Nitish Kumar Article 12` | `/article-12/` |
| `Nitish Kumar Digital Constitutional Personhood` | `/digital-constitutional-personhood/` |
| `thenitishkr.in` | `/` |

### Owned-Concept Queries (Expected)

| Query Pattern | Primary Page |
|---|---|
| `Digital Constitutional Personhood` | `/digital-constitutional-personhood/` |
| `DISHA Intelligence Architecture` | `/disha/` |
| `DISHA architecture` | `/disha/` |
| `Article 12 Infected` | `/article-12/` |
| `claim-to-source system` | `/disha/claim-to-source-system/` |
| `Citizen Not Found digital identity` | `/intelligence/citizen-not-found/` |

### Legal and Constitutional Queries (Expected)

| Query Pattern | Primary Page |
|---|---|
| `Article 12 digital governance India` | `/article-12/` |
| `Article 12 AI systems` | `/article-12/ai-systems/` |
| `constitutional accountability automated decisions India` | `/article-12/automated-decisions/` |
| `public authority responsibility software India` | `/article-12/public-authority-responsibility/` |
| `digital constitutional personhood India` | `/digital-constitutional-personhood/` |
| `biometric authentication failure rights India` | `/digital-constitutional-personhood/biometric-failure/` |

### Citizen-Problem Queries (Expected)

| Query Pattern | Primary Page |
|---|---|
| `digital arrest evidence checklist` | `/digital-arrest-data-harm/evidence-checklist/` |
| `stolen KYC digital arrest` | `/digital-arrest-data-harm/stolen-kyc-data/` |
| `digital arrest victim documentation` | `/digital-arrest-data-harm/victim-record-preservation/` |
| `data recovery identity misuse India` | `/digital-arrest-data-harm/data-recovery/` |
| `human review automated public decision` | `/digital-constitutional-personhood/human-review-remedy/` |

### Current-Event Queries (Expected)

| Query Pattern | Primary Page |
|---|---|
| `W.P. Crl. 163/2026` | `/intelligence/meity-digital-governance/` |
| `Supreme Court data stolen Indian citizens` | `/intelligence/meity-digital-governance/` |
| `MeitY PIL stolen data` | `/intelligence/meity-digital-governance/` |
| `digital arrest India Supreme Court` | `/digital-arrest-data-harm/` |
| `SC MeitY examination representation` | `/intelligence/meity-digital-governance/` |

---

## 4. Page Classification Template

When GSC data becomes available, classify each canonical page using this framework:

| Classification | Criteria | Action |
|---|---|---|
| **High impressions, low CTR** | Impressions > 100, CTR < 2% | Improve title/description relevance |
| **Positions 1–3** | Avg position ≤ 3 | Defend; track competitor changes |
| **Positions 4–10** | Avg position 4–10 | Improve content depth; internal links |
| **Positions 11–20** | Avg position 11–20 | Near-ranking — strengthen page; add supporting evidence |
| **Positions 21–40** | Avg position 21–40 | Monitor; may need content restructuring |
| **High CTR, low impressions** | CTR > 5%, impressions < 50 | Expand topic coverage; promote internally |
| **Declining impressions** | Impressions falling vs prior period | Check competitor changes; update content |
| **Declining clicks** | Clicks falling, impressions stable | Check title/description attractiveness |
| **Growing page** | Both impressions and clicks rising | Invest in further improvement |
| **Indexed but no impressions** | In index, zero impressions | Verify content matches real queries |
| **No data** | Not in GSC at all | Check indexation; review robots/sitemap |

---

## 5. Owner Action Items

### Immediate (This Week)

1. **Verify GSC ownership** — Check that `https://thenitishkr.in` is verified in Google Search Console
   - Verification token: `a0151dcfc802e79c4c6818a68dfd9fef.txt` already at root (used for IndexNow; may also serve GSC)
   - Alternative: DNS TXT record or HTML meta tag (`msvalidate.01` meta already in homepage for Bing)

2. **Submit sitemaps** — In GSC → Sitemaps:
   - Submit `https://thenitishkr.in/sitemap.xml`
   - Submit `https://thenitishkr.in/news-sitemap.xml`

3. **Inspect key URLs** — Use GSC URL Inspection tool on:
   - `https://thenitishkr.in/`
   - `https://thenitishkr.in/disha/validation/`
   - `https://thenitishkr.in/intelligence/`
   - `https://thenitishkr.in/article-12/`
   - `https://thenitishkr.in/digital-constitutional-personhood/`

4. **Review Indexing report** — GSC → Indexing → Pages
   - Confirm no unexpected errors
   - Verify all expected indexable pages are indexed
   - Check that `noindex` intelligence sub-pages are excluded

5. **Export query data** — Export the query report for the periods listed above and save to `private-data/search-console/`

### Ongoing

6. **Export data monthly** — Set calendar reminder to export GSC data on the 1st of each month
7. **Review Core Web Vitals** — GSC → Experience → Core Web Vitals
8. **Track branded vs non-branded split** — Classify queries as branded (containing "thenitishkr", "nitish kumar") vs non-branded

---

## 6. Data Schema for `private-data/search-console/`

When exporting data, save files using this naming convention:

```
private-data/search-console/
  queries-28d-YYYY-MM-DD.csv
  pages-28d-YYYY-MM-DD.csv
  countries-28d-YYYY-MM-DD.csv
  queries-90d-YYYY-MM-DD.csv
  pages-90d-YYYY-MM-DD.csv
  index-coverage-YYYY-MM-DD.csv
  core-web-vitals-YYYY-MM-DD.csv
```

**Important:** These files contain potentially sensitive query data. They are gitignored via the project's `.gitignore`. Do not commit raw exports.

---

## 7. Sanitised Aggregate (For Committed Reports)

Once real data is available, sanitised aggregates can be committed to `docs/seo-aeo/` in this format:

| Query Category | Clicks | Impressions | CTR | Avg Position | Trend |
|---|---|---|---|---|---|
| Branded | [sum] | [sum] | [calc] | [avg] | [arrow] |
| Owned-concept | [sum] | [sum] | [calc] | [avg] | [arrow] |
| Legal/constitutional | [sum] | [sum] | [calc] | [avg] | [arrow] |
| Citizen-problem | [sum] | [sum] | [calc] | [avg] | [arrow] |
| Current-event | [sum] | [sum] | [calc] | [avg] | [arrow] |

Individual queries with low impression counts (<10 in 28 days) should not be listed individually in committed reports to avoid exposing thin query data.

---

## 8. Baseline Status

| Metric | Current Value | Source |
|---|---|---|
| GSC property verified | Unknown | Owner to confirm |
| Sitemaps submitted | Unknown | Owner to confirm |
| Pages indexed | Unknown | Owner to check GSC |
| Top query (branded) | Unknown | Requires GSC export |
| Top query (non-branded) | Unknown | Requires GSC export |
| Average CTR | Unknown | Requires GSC export |
| Average position | Unknown | Requires GSC export |
| 28-day click total | Unknown | Requires GSC export |
| 28-day impression total | Unknown | Requires GSC export |

**This document will be updated when owner provides GSC data.**