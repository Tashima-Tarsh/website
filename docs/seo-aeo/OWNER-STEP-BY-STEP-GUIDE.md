# Owner Step-by-Step Guide — SEO/AEO Owner Actions

**Created:** 2026-06-16
**Purpose:** Walk through each owner action in order. Each step has direct links and exact instructions.

---

## PREREQUISITE: First, merge the PR

Before anything else, deploy your code changes:

1. Open https://github.com/Tashima-Tarsh/website/pull/46
2. Click **"Squash and merge"** → confirm
3. Wait ~2 minutes for Cloudflare Pages to auto-deploy
4. Verify the site loads: https://thenitishkr.in/

---

## STEP 1: Google Search Console

**What it does:** Tells you what people search to find your site, which pages rank, and how often.

### 1a — Add your site to GSC

1. Go to https://search.google.com/search-console
2. Sign in with your Google account (the one used for GA4 `G-YJ314E1YHG`)
3. Click **"Add property"** → choose **"URL prefix"**
4. Enter `https://thenitishkr.in`
5. Verification method: choose **"HTML tag"**
6. Copy the meta tag Google gives you (looks like `<meta name="google-site-verification" content="...">`)

**Save this meta tag in the homepage:**

Open `index.html` in your editor. Add the Google verification `<meta>` tag right after this line (around line 22):

```html
  <meta name="msvalidate.01" content="A96FB222179B2086591EDB93382DCCC0">
```

Add a new line after it:

```html
  <meta name="google-site-verification" content="YOUR_GOOGLE_CODE_HERE">
```

Save → commit → push. Or you can use DNS TXT record verification (ask if you prefer that).

### 1b — Submit sitemaps

1. In Google Search Console, go to **"Sitemaps"** (left sidebar)
2. In the "Add a new sitemap" field, enter: `sitemap.xml`
3. Click Submit
4. Repeat: add `news-sitemap.xml`

### 1c — Inspect key URLs

1. In GSC, paste each URL into the search bar at the top:
   - `https://thenitishkr.in/`
   - `https://thenitishkr.in/article-12/`
   - `https://thenitishkr.in/disha/`
   - `https://thenitishkr.in/digital-constitutional-personhood/`
   - `https://thenitishkr.in/intelligence/`
2. For each, click **"Request Indexing"** — this tells Google to crawl them now

### 1d — Check indexing status

1. Go to **"Indexing" → "Pages"** in GSC
2. Look at "Indexed" count vs "Not indexed"
3. If any important pages are "Not indexed", use URL Inspection tool on them

### 1e — Export query data

1. Go to **"Performance"** in GSC
2. Set date range: **Last 28 days**
3. Click **"Export"** (top right) → **"Download as CSV"**
4. Save to `private-data/search-console/queries-28d-2026-06-16.csv`
5. Repeat with date range **"Last 90 days"**
6. Save as `private-data/search-console/queries-90d-2026-06-16.csv`

---

## STEP 2: Bing Webmaster Tools

**What it does:** Same as GSC but for Bing search + enables IndexNow for faster crawling.

### 2a — Add site to Bing WMT

1. Go to https://www.bing.com/webmasters
2. Sign in with Microsoft account (or sign in with Google)
3. Click **"Add a site"** → enter `https://thenitishkr.in`
4. Verification: choose **"HTML meta tag"**
5. **You don't need to add the meta tag** — it's already in your homepage:
   ```html
   <meta name="msvalidate.01" content="A96FB222179B2086591EDB93382DCCC0">
   ```
6. Click **"Verify"** — Bing will find the meta tag

### 2b — Submit sitemaps

1. In Bing WMT, go to **"Sitemaps"**
2. Submit:
   - `https://thenitishkr.in/sitemap.xml`
   - `https://thenitishkr.in/news-sitemap.xml`

### 2c — Check IndexNow

1. In Bing WMT, go to **"IndexNow"**
2. Confirm it shows **"Active"**
3. You should see recent submissions

### 2d — Run Site Scan

1. In Bing WMT, go to **"Site Scan"**
2. Run a scan
3. Review any errors or warnings

### 2e — Export data

1. Go to **"Search Performance"** → export as CSV
2. Save to `private-data/bing/search-keywords-28d-2026-06-16.csv`

---

## STEP 3: Run Google Trends Research

**What it does:** Shows whether people are actually searching for your topics and if interest is growing.

### 3a — Branded terms (who you are)

Go to https://trends.google.com → search each term one at a time:

| Term | Geography | Time |
|---|---|---|
| `thenitishkr` | India | Past 12 months |
| `Nitish Kumar DISHA` | India | Past 12 months |
| `Digital Constitutional Personhood` | India | Past 12 months |

**Take a screenshot** of each results page. Save in `private-data/trends/`.

### 3b — Topic terms (what you write about)

| Term | Geography | Time |
|---|---|---|
| `digital arrest India` | India | Past 12 months |
| `Article 12 constitutional accountability` | India | Past 12 months |
| `MeitY PIL stolen data` | India | Past 30 days |
| `biometric authentication failure` | India | Past 12 months |

### 3c — Compare India vs Worldwide

Search `"DISHA Intelligence Architecture"` with "Past 5 years" — click "Compare" → add "Worldwide". Is interest India-only or global?

### 3d — Hindi queries (for future Hindi pages)

| Term | Geography | Time |
|---|---|---|
| `डिजिटल अरेस्ट` | India | Past 12 months |
| `साइबर फ्रॉड कैसे रिपोर्ट करें` | India | Past 12 months |

**Interpretation:**
- **"Interest over time" rising** = more people searching = good time to publish
- **"Interest over time" flat** = steady demand
- **"Interest over time" falling** = may not be worth creating new content
- **If Trends shows 0 data** = not enough searches = don't create content targeting that term

---

## STEP 4: Run SERP Research

**What it does:** Shows what currently ranks for your target queries so you know what you're competing against.

### 4a — How to search (critical for accurate results)

1. Open **Chrome Incognito window** (Ctrl+Shift+N)
2. Do NOT sign into Google
3. Optional but better: use a VPN set to India, or use `&gl=IN` parameter

### 4b — Queries to search

For each query, search and **take a screenshot** of results:

#### Priority 1 — Your brand and concepts
1. `thenitishkr`
2. `Digital Constitutional Personhood`
3. `DISHA Intelligence Architecture`

#### Priority 2 — Your research topics
4. `Article 12 digital governance India`
5. `digital arrest evidence checklist`
6. `biometric authentication failure rights India`
7. `W.P. Crl. 163/2026`
8. `Supreme Court data stolen Indian citizens`

### 4c — What to note for each query

| Question | Your Answer |
|---|---|
| Does Google show an **AI Overview** at top? | Yes/No |
| Does the AI Overview cite thenitishkr.in? | Yes/No |
| What **format** are the top results? (news, government, academic, PDF) | List types |
| Are there **People Also Ask** questions? | Write down the questions |
| What **position** does thenitishkr.in appear? | Position # or "not found" |

### 4d — Save results

Save screenshots to `private-data/serp/` with this naming:
```
serp-digital-constitutional-personhood-2026-06-16.png
serp-article-12-digital-governance-2026-06-16.png
```

---

## SUMMARY — EXECUTION ORDER

| Order | Step | Time |
|---|---|---|
| **0** | Merge PR #46 on GitHub (one click) | 30 seconds |
| **1a** | Add GSC property | 5 minutes |
| **1b** | Submit sitemaps to GSC | 2 minutes |
| **1c** | Request indexing for 5 URLs | 2 minutes |
| **1e** | Export GSC query data | 3 minutes |
| **2a** | Verify Bing WMT (already set up) | 1 minute |
| **2b** | Submit sitemaps to Bing | 1 minute |
| **2d** | Run Bing Site Scan | 3 minutes |
| **2e** | Export Bing data | 2 minutes |
| **3** | Run Google Trends for 10 terms (~1 min each) | 15 minutes |
| **4** | Run SERP research for 8 queries (~2 min each) | 20 minutes |

**Total time:** ~1 hour

**After this, you'll have your complete baseline.** We can then use this data to refine strategy.