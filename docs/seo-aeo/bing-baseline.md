# Bing Webmaster Tools Baseline — thenitishkr.in

**Audit date:** 2026-06-16
**Status:** ⚠️ No Bing Webmaster Tools data exports found in repository
**Private data path:** `private-data/bing/` (gitignored — empty)

---

## 1. Data Availability

| Data Source | Status | Action Required |
|---|---|---|
| Bing WMT property verified | Unknown | Owner to verify in Bing WMT |
| Search keywords | ❌ Not available | Owner to export from Bing WMT |
| Search pages | ❌ Not available | Owner to export from Bing WMT |
| Impressions | ❌ Not available | Owner to export from Bing WMT |
| Clicks | ❌ Not available | Owner to export from Bing WMT |
| Crawl requests | ❌ Not available | Owner to check Bing WMT |
| Indexation status | Unknown | Owner to check Bing WMT |
| IndexNow submissions | ✅ Active (key file + script in repo) | Owner to confirm in Bing WMT |
| Blocked URLs | Unknown | Owner to check Bing WMT |
| SEO Reports | Unknown | Owner to check Bing WMT |
| Site Scan findings | Unknown | Owner to check Bing WMT |

---

## 2. Bing Verification Status

| Mechanism | Status |
|---|---|
| `msvalidate.01` meta tag | ✅ Present in homepage `<head>`: `A96FB222179B2086591EDB93382DCCC0` |
| XML file verification | Not present |
| DNS TXT record | Unknown (owner to check) |

**Owner action:** Log into Bing Webmaster Tools and confirm `https://thenitishkr.in` is verified. If not, the `msvalidate.01` meta tag is already in the homepage source.

---

## 3. IndexNow Status

IndexNow is configured in the repository:

| Component | Status |
|---|---|
| Key file | ✅ `a0151dcfc802e79c4c6818a68dfd9fef.txt` at root |
| Submission script | ✅ `scripts/submit-indexnow.mjs` |
| Payload file | ✅ `indexnow-payload.json` |
| API endpoint | `https://www.bing.com/indexnow` (standard) |

**Owner action:** Log into Bing WMT → IndexNow and confirm:
- IndexNow is listed as "Active"
- Recent submissions are visible
- No submission errors

**Note:** The IndexNow key is public by protocol design. The key file at the root is normal and expected. Do not treat the public key as a secret.

---

## 4. Recommended Bing WMT Exports

Owner should export the following from Bing Webmaster Tools and save to `private-data/bing/` (gitignored):

### Export 1: Search Keywords
- **Period:** Last 28 complete days
- **Format:** CSV
- **Columns:** Query, Clicks, Impressions, CTR, Average Position

### Export 2: Search Pages
- **Period:** Last 28 complete days
- **Format:** CSV
- **Columns:** URL, Clicks, Impressions, CTR, Average Position

### Export 3: Crawl Information
- **URLs submitted:** Via IndexNow and sitemap
- **URLs crawled:** Master crawl data
- **URLs with errors:** Any crawl errors or blocks

---

## 5. Bing-Specific Opportunities

### Bing Chat / Copilot Visibility

Bing's Copilot (GPT-4 powered) draws from Bing's search index. Pages indexed in Bing are eligible for Copilot citation. Factors that influence Copilot visibility:

| Factor | Site Status | Recommendation |
|---|---|---|
| Indexed in Bing | Unknown (owner to verify) | Submit sitemap + IndexNow |
| Structured data quality | Mixed (see technical audit) | Fix schema issues |
| Page clarity and citations | Good (citation blocks present) | Maintain |
| Page authority signals | Entity consistent (ORCID/Wikidata) | Already strong |
| Freshness signals | lastmod in sitemap, dates on pages | Good |

### IndexNow Best Practices

| Practice | Recommendation |
|---|---|
| Submission timing | Submit only when content actually changes |
| Payload scope | Limit to changed URLs, not full sitemap |
| Duplicate submissions | Avoid resubmitting unchanged URLs |
| Automation | Use CI workflow for production-only submissions |

---

## 6. Bing vs Google Query Patterns (Framework)

When both GSC and Bing WMT data are available, compare:

| Dimension | Google | Bing | Insight |
|---|---|---|---|
| Top queries | [GSC data] | [Bing WMT data] | Do different engines surface different intents? |
| Average CTR | [GSC data] | [Bing WMT data] | Which engine has better engagement? |
| Impression volume | [GSC data] | [Bing WMT data] | Relative search share in India |
| Click volume | [GSC data] | [Bing WMT data] | Actual traffic contribution |
| Query types | [GSC data] | [Bing WMT data] | Bing may have different demographic/intent patterns |

In India, Google's search market share is >95%. Bing traffic will be significantly lower. However, Bing powers Copilot, which has unique visibility value for answer-engine eligibility.

---

## 7. Owner Action Items

### Immediate (This Week)

1. **Verify Bing WMT ownership** — Log into Bing Webmaster Tools and confirm site is verified
   - The `msvalidate.01` meta tag is already in the homepage

2. **Submit sitemaps** — In Bing WMT → Sitemaps:
   - Submit `https://thenitishkr.in/sitemap.xml`
   - Submit `https://thenitishkr.in/news-sitemap.xml`

3. **Validate IndexNow** — In Bing WMT → IndexNow:
   - Confirm status shows "Active"
   - Verify recent submissions are received

4. **Run Site Scan** — Bing WMT → Site Scan
   - Review any errors or warnings
   - Fix critical issues

5. **Review crawl errors** — Bing WMT → Reports
   - Check for blocked URLs, crawl errors

6. **Export search data** — Export keyword and page reports and save to `private-data/bing/`

### Ongoing

7. **Monitor IndexNow** — Verify submissions are accepted after each content update
8. **Compare with Google** — When GSC data is also available, compare query patterns
9. **Check Copilot citations** — Periodically test Copilot queries for site content appearance

---

## 8. Data Schema for `private-data/bing/`

```
private-data/bing/
  search-keywords-28d-YYYY-MM-DD.csv
  search-pages-28d-YYYY-MM-DD.csv
  crawl-info-YYYY-MM-DD.csv
  site-scan-YYYY-MM-DD.csv
```

**Important:** These files are gitignored. Do not commit raw exports.

---

## 9. Baseline Status

| Metric | Current Value | Source |
|---|---|---|
| Bing WMT property verified | Unknown | Owner to confirm |
| Sitemaps submitted | Unknown | Owner to confirm |
| IndexNow active | ✅ (key + script present) | Owner to confirm in WMT |
| Pages indexed in Bing | Unknown | Owner to check WMT |
| Top query (Bing) | Unknown | Requires Bing WMT export |
| Bing clicks (28 days) | Unknown | Requires Bing WMT export |
| Bing impressions (28 days) | Unknown | Requires Bing WMT export |
| Site Scan errors | Unknown | Owner to run scan |
| Copilot citation appearances | Unknown | Requires manual testing |

**This document will be updated when owner provides Bing WMT data.**