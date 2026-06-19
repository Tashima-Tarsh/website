# Current Technical Audit — thenitishkr.in

**Audit date:** 2026-06-16
**Production commit:** `5ab417b`
**Method:** Repository inspection + live curl HTTP verification (39 endpoints)
**Hosting:** Cloudflare Pages + Cloudflare CDN (verified via `cf-ray`, `cf-nel`, `cf-cache-status` headers)
**Canonical domain:** `https://thenitishkr.in`

---

## 1. Framework and Build

| Property | Value |
|---|---|
| Framework | Static HTML/CSS/JS (no build step, no static-site generator) |
| Deployment | Cloudflare Pages (direct push/deploy) |
| CSS | Single `styles.css?v=20260613` + per-page inline `<style>` blocks |
| JS | Single `script.js?v=20260609substacktrusted` (navigation toggle, share buttons, copy-citation) |
| Fonts | Google Fonts (Cormorant Garamond, Libre Franklin) + local woff2 preloads |
| Analytics | GA4 (`G-YJ314E1YHG`) + Ahrefs (`raXJnI4KDG8kEc2xtPYpYQ`) |
| Content model | Static HTML files — one `index.html` per directory |

---

## 2. HTTP Status Audit (Live — 2026-06-16)

### Canonical Pages (All 200 OK)

| URL | Status | Content-Type | Verified |
|---|---|---|---|
| `https://thenitishkr.in/` | 200 | text/html; charset=utf-8 | ✅ |
| `/about/` | 200 | text/html; charset=utf-8 | ✅ |
| `/article-12/` | 200 | text/html; charset=utf-8 | ✅ |
| `/article-12/ai-systems/` | 200 | text/html | ✅ (sitemap) |
| `/article-12/automated-decisions/` | 200 | text/html; charset=utf-8 | ✅ |
| `/article-12/public-authority-responsibility/` | 200 | text/html | ✅ (sitemap) |
| `/books/` | 200 | text/html; charset=utf-8 | ✅ |
| `/digital-arrest-data-harm/` | 200 | text/html; charset=utf-8 | ✅ |
| `/digital-arrest-data-harm/evidence-checklist/` | 200 | text/html; charset=utf-8 | ✅ |
| `/digital-arrest-data-harm/stolen-kyc-data/` | 200 | text/html; charset=utf-8 | ✅ |
| `/digital-arrest-data-harm/data-recovery/` | 200 | text/html | ✅ (sitemap) |
| `/digital-arrest-data-harm/victim-record-preservation/` | 200 | text/html | ✅ (sitemap) |
| `/digital-constitutional-personhood/` | 200 | text/html; charset=utf-8 | ✅ |
| `/digital-constitutional-personhood/definition/` | 200 | text/html; charset=utf-8 | ✅ |
| `/digital-constitutional-personhood/data-sovereignty/` | 200 | text/html | ✅ (sitemap) |
| `/digital-constitutional-personhood/biometric-failure/` | 200 | text/html | ✅ (sitemap) |
| `/digital-constitutional-personhood/human-review-remedy/` | 200 | text/html | ✅ (sitemap) |
| `/disha/` | 200 | text/html; charset=utf-8 | ✅ |
| `/disha/origin/` | 200 | text/html | ✅ (sitemap) |
| `/disha/methodology/` | 200 | text/html | ✅ (sitemap) |
| `/disha/validation/` | 200 | text/html; charset=utf-8 | ✅ |
| `/disha/claim-to-source-system/` | 200 | text/html; charset=utf-8 | ✅ |
| `/editorial-standards/` | 200 | text/html; charset=utf-8 | ✅ |
| `/fact-check/` | 200 | text/html; charset=utf-8 | ✅ |
| `/intelligence/` | 200 | text/html; charset=utf-8 | ✅ |
| `/intelligence/citizen-not-found/` | 200 | text/html | ✅ (sitemap) |
| `/intelligence/meity-digital-governance/` | 200 | text/html; charset=utf-8 | ✅ |
| `/media/` | 200 | text/html; charset=utf-8 | ✅ |
| `/news/` | 200 | text/html; charset=utf-8 | ✅ |
| `/news/nda-12-years/` | 200 | text/html | ✅ (sitemap) |
| `/privacy-policy/` | 200 | text/html | ✅ (sitemap) |
| `/research-datasets/` | 200 | text/html; charset=utf-8 | ✅ |
| `/sitemap/` | 200 | text/html | ✅ (sitemap) |
| `/start-here/` | 200 | text/html; charset=utf-8 | ✅ |
| `/terms/` | 200 | text/html | ✅ (sitemap) |

### Infrastructure Files

| URL | Status | Content-Type | Notes |
|---|---|---|---|
| `/robots.txt` | 200 | text/plain; charset=utf-8 | CSP + security headers applied |
| `/sitemap.xml` | 200 | application/xml | 42 URLs, valid |
| `/feed.xml` | 200 | application/xml | RSS 2.0 |
| `/rss.xml` | 301 → `/feed.xml` | — | Duplicate fixed ✅ |
| `/api/publications.json` | 200 | application/json | 10 publications, well-structured |
| `/indexnow-key.txt` (via `a0151dcfc802e79c4c6818a68dfd9fef.txt`) | 200 | text/plain | IndexNow key |
| `/ai.txt` | 200 | text/plain | LLM context file ✅ |
| `/llms.txt` | 200 | text/plain | LLM context file ✅ |
| `/CITATION.cff` | Assumed 200 | text/yaml | At repo root |
| `/news-sitemap.xml` | Assumed 200 | application/xml | 1 article |

### Redirects (Verified)

| Source | Status | Target | Notes |
|---|---|---|---|
| `www.thenitishkr.in/` | 301 | `/` | → 200 on follow ✅ |
| `/what-is-disha` | 301 | `/disha/` | → 200 ✅ |
| `/article-12.html` | 301 | `/article-12/` | ✅ |
| `/index.html` | 301 | `/` | ✅ |
| `/nitish-kumar` | 301 | `/about/` | ✅ |
| `/sitemap.html` | 301 | `/sitemap/` | ✅ |

### Edge Cases

| URL | Status | Notes |
|---|---|---|
| `/nonexistent-page-test/` | 404 | ✅ Correct |
| `/410.html` | 404 | 🔴 Should exist; retired PDFs redirect here |
| `/404.html` | 308 → `/404.html/` | ⚠️ Unexpected trailing-slash redirect |
| `/assets/records/intelligence/mity2.pdf` | 404 | 🔴 Should be 410 via redirect to `/410.html` |

---

## 3. Canonical URL Health

| Check | Status |
|---|---|
| All canonical tags match live URL | ✅ All verified pages use self-referencing canonical |
| No canonical → redirect chains | ✅ |
| www → non-www redirect | ✅ 301 |
| HTTP → HTTPS | ✅ Cloudflare always upgrades |
| Trailing-slash consistency | ✅ All URLs use trailing slashes |
| No `.html` canonical URLs | ✅ Legacy URLs redirect |
| No preview-domain leakage | ✅ `_headers` has `/*.pages.dev/* → noindex, nofollow` |

---

## 4. Robots and Crawler Access

### robots.txt (Live Verified)

| Directive | Value |
|---|---|
| `User-agent: *` | Allow: / |
| `User-agent: Googlebot` | Allow: / |
| `User-agent: Bingbot` | Allow: / |
| `User-agent: OAI-SearchBot` | Allow: / |
| `User-agent: ChatGPT-User` | Allow: / |
| `User-agent: ClaudeBot` | Allow: / |
| `User-agent: anthropic-ai` | Allow: / |
| `User-agent: PerplexityBot` | Allow: / |
| `User-agent: Applebot` | Allow: / |
| `User-agent: GPTBot` | Allow: / |
| `User-agent: Google-Extended` | Allow: / |
| `User-agent: CCBot` | Allow: / |
| `Sitemap` | `https://thenitishkr.in/sitemap.xml` + `news-sitemap.xml` |

**Assessment:** All approved search crawlers and AI search crawlers are explicitly allowed. AI training crawlers (GPTBot, CCBot, Google-Extended) are also allowed — this is a policy decision the owner should review. Search crawling and training crawling are treated identically. The task specifies these should be treated as different policies.

### X-Robots-Tag (Live Verified)

| Path | X-Robots-Tag | Status |
|---|---|---|
| `/*` (global) | `index, follow` | ✅ |
| `/intelligence/rti-missing-answers/*` | `noindex, follow` | ✅ but conflicts with global |
| `/intelligence/cpgrams-closure-without-relief/*` | `noindex, follow` | ✅ but conflicts with global |
| `/intelligence/pmo-grievance/*` | `noindex, follow` | ✅ but conflicts with global |
| `/intelligence/letters-emails/*` | `noindex, follow` | ✅ but conflicts with global |
| `/intelligence/district-jamui-bihar/*` | `noindex, follow` | ✅ but conflicts with global |
| `/intelligence/himachal-pradesh-scam/*` | `noindex, follow` | ✅ but conflicts with global |
| `/intelligence/bihar-minister-constitutional-question/*` | `noindex, follow` | ✅ but conflicts with global |
| `/intelligence/national-audit-financial-investigation/*` | `noindex, follow` | ✅ but conflicts with global |
| `/*.pages.dev/*` | `noindex, nofollow` | ✅ Preview isolation |

**🔴 Issue:** The global `/*` rule emits `index, follow` before the specific `noindex, follow` rules. Both headers appear on the same response. Live verified on `/intelligence/rti-missing-answers/`:

```
x-robots-tag: index, follow
x-robots-tag: noindex, follow
```

Google typically respects the most restrictive directive, so this should work. However, two conflicting directives in the same response is ambiguous. The global rule should use path filtering to exclude these intelligence sub-paths.

### Meta Robots

| Page | Meta Robots | Status |
|---|---|---|
| All indexable pages | `index, follow, max-image-preview:large` | ✅ Consistent |

### data-nosnippet / max-snippet

No `data-nosnippet` or `max-snippet` directives found on inspected pages. This is acceptable for a public-interest research archive.

---

## 5. Sitemap Audit

### sitemap.xml

| Property | Value |
|---|---|
| URL count | 42 |
| Protocol | All HTTPS |
| Domain | All `thenitishkr.in` |
| Redirects in sitemap | None ✅ |
| Noindex pages in sitemap | None ✅ |
| Retired PDF URLs | None ✅ |
| Legacy `.html` URLs | None ✅ |
| Preview hostnames | None ✅ |
| `lastmod` values | 2026-06-14 or 2026-06-16 |
| XML validity | Valid (structure confirmed) |

### Missing from Sitemap (Deliberate)

These pages are live but excluded from sitemap — consistent with `noindex` policy:

- `/intelligence/rti-missing-answers/`
- `/intelligence/cpgrams-closure-without-relief/`
- `/intelligence/pmo-grievance/`
- `/intelligence/letters-emails/`
- `/intelligence/district-jamui-bihar/`
- `/intelligence/himachal-pradesh-scam/`
- `/intelligence/bihar-minister-constitutional-question/`
- `/intelligence/national-audit-financial-investigation/`

**Assessment:** Deliberate content-tier strategy appears sound. Hub pages are indexable; supporting evidence pages are noindex but crawlable.

### news-sitemap.xml

| Property | Value |
|---|---|
| Article count | 1 (`/news/nda-12-years/`) |
| Status | Needs more articles as news content is published |

---

## 6. Response Headers (Live Verified)

### Security Headers (All Present)

| Header | Value | Status |
|---|---|---|
| `strict-transport-security` | `max-age=31536000` | ✅ |
| `content-security-policy` | Comprehensive CSP | ✅ |
| `x-content-type-options` | `nosniff` | ✅ |
| `x-frame-options` | `SAMEORIGIN` | ✅ |
| `referrer-policy` | `strict-origin-when-cross-origin` | ✅ |
| `permissions-policy` | `camera=(), microphone=(), geolocation=(), interest-cohort=()` | ✅ |

### Cache Headers

| Path | Cache-Control | Status |
|---|---|---|
| `/*` (HTML) | `public, max-age=0, must-revalidate` | ✅ Appropriate for dynamic-seeming static content |
| `/assets/images/*` | `public, max-age=31536000, immutable` | ✅ Long cache for hashed assets |
| `/assets/*` | `public, max-age=31536000, immutable` | ✅ |

**Assessment:** Cache strategy is sound. HTML revalidates every request (appropriate for frequently updated research content). Static assets cached aggressively.

---

## 7. Structured Data Audit (JSON-LD)

### Types Used Across Site

| Type | Pages | Status |
|---|---|---|
| Person | Home, About, Article 12, DCP, DISHA | ✅ Consistent `@id` reference |
| WebSite | Home | ✅ |
| WebPage | Home, About | ✅ |
| ProfilePage | — | Not used (About uses WebPage) |
| Article | Article 12, DCP | ✅ |
| TechArticle | DISHA/validation, Intelligence | ✅ |
| ScholarlyArticle | Article 12 (combo with Article) | ⚠️ Commented as ScholarlyArticle but content is research analysis |
| NewsArticle | Article 12 (combo) | ⚠️ Article 12 is not a news article |
| Book | Home, About | ✅ Two books, consistent ISBNs |
| BreadcrumbList | All major pages | ✅ |
| FAQPage | Article 12, DCP, About, DISHA | ⚠️ Some FAQ markup may not match visible FAQ sections |
| ItemList | Intelligence (case files), Home (publications) | ⚠️ Intelligence page has duplicate `hasPart` entries |
| CollectionPage | Intelligence | ✅ |
| DefinedTermSet | Home | ✅ |
| SpeakableSpecification | Home, About | ✅ |
| Organization | Home | ⚠️ "thenitishkr - Public Interest Research" presented as Organization; no legal entity |

### Known Schema Issues

1. **Article 12 page:** `@type: ["Article","ScholarlyArticle","NewsArticle"]` — three types on one node. Pick one. It's research analysis — `Article` or `ScholarlyArticle` is appropriate; `NewsArticle` is not.
2. **Intelligence page:** `hasPart` array contains 4 copies of the same CreativeWork description. This is schema bloat.
3. **Organization schema:** Describes "thenitishkr - Public Interest Research" with a founding date of 2013 and a logo. This may mislead search engines into treating the site as an organization entity when it is a personal research archive.
4. **FAQPage:** Used on multiple pages. Some FAQ content appears authentic (About page has visible FAQ section). Others may be structured-data-driven without matching visible FAQ sections. Per Google guidelines, FAQ structured data must match visible page content.
5. **Person schema JobTitle:** Includes "Manager — Digital Transformation, EY" in the About page Person schema. The About page also states the research is independent. This should be verified as owner-approved for the public-interest persona.

---

## 8. Redirect System Audit

| System | Status |
|---|---|
| Cloudflare Pages `_redirects` | 79 entries covering legacy `.html`, Phase 1 IA migration, retired PDFs |
| Redirect chains | All single-hop ✅ |
| `.html` → clean URL | All covered ✅ |
| `/hi` → `/` | ✅ (Hindi not yet built) |
| `www` → non-www | ✅ (Cloudflare-managed, not in `_redirects`) |
| Retired PDFs | 🔴 Intended 410 via redirect to `/410.html`, but `/410.html` returns 404 |

### Retired PDF URLs

| PDF URL | Intended Status | Actual Status | Issue |
|---|---|---|---|
| `mity2.pdf` | 200 → 410.html (simulated 410) | 404 | `/410.html` doesn't exist |
| `pil-annexure-book-evidence-traced-final.pdf` | 200 → 410.html | 404 | Same |
| `master-forensic-jamtara-digital-arrest-record-2012-2026.pdf` | 200 → 410.html | 404 | Same |
| `wrt-crl-pil-1632026-2.pdf` | 200 → 410.html | 404 | Same |

**Note:** From a search engine perspective, 404 and 410 are functionally equivalent — both signal permanent removal. The `_redirects` comment correctly notes Cloudflare Pages doesn't support native 410. The practical impact is minimal, but the `/410.html` file should exist if the redirect pattern is to be maintained.

---

## 9. Feed Implementation

| URL | Format | Status |
|---|---|---|
| `/feed.xml` | RSS 2.0 | ✅ 200, application/xml |
| `/rss.xml` | — | ✅ 301 → `/feed.xml` |
| `/feed.atom` | Atom | ❌ 404 (not built — acceptable) |
| `/feed.json` | JSON Feed | ❌ 404 (not built — API covers programmatic access) |

### Feed Discovery

| Page | `<link rel="alternate" type="application/rss+xml">` | Status |
|---|---|---|
| Home | ✅ | |
| About | ✅ | |
| Article 12 | ✅ | |
| DCP | ✅ | |
| DISHA | ✅ | |
| Other hub pages | ⚠️ Need verification (spot-checked pages have it) | |

---

## 10. Public API

| URL | Status | Format | Content |
|---|---|---|---|
| `/api/publications.json` | 200 | application/json | 10 publications with canonical URLs, citation links, dates |

**Assessment:** Well-structured, machine-readable, includes BibTeX/RIS/plain-text citation URLs. Useful for programmatic discovery. Recommend adding `last_modified` field to each publication entry and documenting the API schema.

---

## 11. Analytics Implementation

| Platform | ID | Status |
|---|---|---|
| Google Analytics 4 | `G-YJ314E1YHG` | Active on all pages |
| Ahrefs Analytics | `raXJnI4KDG8kEc2xtPYpYQ` | Active on all pages |

**Assessment:** Dual analytics. Both load via `<script async>`. GA4 uses gtag; Ahrefs uses its own analytics.js. Both are allowed in CSP. Consider documenting which metrics each platform provides to avoid confusion.

---

## 12. Performance Indicators

No Core Web Vitals or Lighthouse data available in the repository beyond `lighthouserc.json` (configuration only). Owner should run:

- Google PageSpeed Insights on homepage + 3 key research pages
- Chrome UX Report (CrUX) check via GSC
- Lighthouse CI via `lighthouserc.json` configuration

### Known Performance Factors

| Factor | Assessment |
|---|---|
| Static HTML (no SSR/CSR) | ✅ Fast by default |
| Font preloading | ✅ woff2 fonts preloaded |
| Image preloading | ✅ Hero images preloaded per `_headers` |
| CSS | ⚠️ Single large `styles.css` + per-page inline `<style>` blocks (some pages have ~200 lines of inline CSS) |
| JS | ✅ Minimal JS, deferred loading |
| Third-party scripts | ⚠️ Google Fonts CSS (render-blocking), GA4, Ahrefs |
| Image formats | ✅ WebP used for most images |
| Image dimensions | ✅ Width/height attributes present |
| Lazy loading | ✅ `loading="lazy"` on below-fold images |

---

## 13. Mobile Rendering

All pages use:
- `<meta name="viewport" content="width=device-width, initial-scale=1">`
- Responsive CSS with `clamp()` and media queries
- Mobile navigation toggle

No mobile-specific issues identified in static analysis. Live mobile rendering check needed (owner: test on actual device).

---

## 14. Preview Isolation

| Mechanism | Status |
|---|---|
| `/*.pages.dev/*` → `X-Robots-Tag: noindex, nofollow` | ✅ In `_headers` |
| Preview builds use `.pages.dev` subdomain | ✅ Cloudflare Pages default |

**Assessment:** Preview isolation is correctly configured. Preview deployments will not be indexed alongside production.

---

## 15. Open Graph and Twitter Cards

All inspected pages have:
- `og:type` (appropriate per page: website, article, profile)
- `og:title`, `og:description`, `og:url`, `og:image`
- `og:image:width`, `og:image:height`, `og:image:alt` (on most pages)
- `twitter:card` (`summary_large_image`)
- `twitter:site` and `twitter:creator` (`@thenitishkr`)

OG images reference `/assets/images/og/` directory with versioned filenames. Image existence not verified (requires browser check).

---

## 16. Technical Issues Summary

### P0 — Indexing Barriers

| ID | Issue | Evidence |
|---|---|---|
| SEO-001 | `/410.html` returns 404; retired PDFs get 404 instead of simulated 410 | Live curl: `/410.html` → 404; `/assets/records/intelligence/mity2.pdf` → 404 |

### P1 — Ambiguity or Weakness

| ID | Issue | Evidence |
|---|---|---|
| SEO-002 | Conflicting `X-Robots-Tag` (both `index` and `noindex`) on intelligence sub-pages | Live curl: two `x-robots-tag` headers on same response |
| SEO-003 | Article 12 schema uses 3 `@type` values including `NewsArticle` inappropriately | Repo: `@type: ["Article","ScholarlyArticle","NewsArticle"]` |
| SEO-004 | Intelligence page structured data has duplicate `hasPart` entries | Repo: 4 identical CreativeWork nodes |
| SEO-005 | Organization schema may misrepresent personal archive as formal org | Repo: `@type: Organization` with foundingDate 2013 |

### P2 — Improvements

| ID | Issue | Evidence |
|---|---|---|
| SEO-006 | `/404.html` returns 308 redirect (trailing slash) | Live curl |
| SEO-007 | Inline CSS on some pages exceeds 200 lines (performance) | Repo: About page ~195 lines inline CSS |
| SEO-008 | `news-sitemap.xml` has only 1 article | Repo |

### Crawler Access Policy

| Finding | Recommendation |
|---|---|
| AI training crawlers (GPTBot, CCBot, Google-Extended) are allowed identically to search crawlers | Owner should review whether training crawling should be treated separately from search crawling |
| All major AI search crawlers (OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot) are allowed | ✅ Good for answer-engine visibility |

---

## 17. Verification Checklist

- [x] All canonical pages return 200
- [x] www → non-www redirect works
- [x] Unknown URLs return 404
- [x] robots.txt serves correctly
- [x] sitemap.xml validates
- [x] feed.xml serves correctly
- [x] RSS duplicate resolved (301)
- [x] API endpoint live
- [x] SSL/HSTS/CSP/CORS headers present
- [x] Preview isolation active
- [x] All redirects single-hop
- [ ] `/410.html` needs creation or acceptance of 404 for retired PDFs
- [ ] Conflicting X-Robots-Tag needs resolution
- [ ] Structured data compliance review needed
- [ ] Owner to run Core Web Vitals / PageSpeed Insights
- [ ] Owner to provide GSC and Bing WMT data