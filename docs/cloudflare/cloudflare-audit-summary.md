# Cloudflare Pass A — Read-Only Audit Summary

Generated: 2026-06-16 | Auditor: automated read-only

---

## Baseline

| Field | Value |
|---|---|
| **Repository commit** | `3778da9` (Phase 3 merged, on `main`) |
| **Framework** | Static HTML/CSS/JS |
| **Cloudflare product detected** | Cloudflare Pages (via `wrangler-action@v3` in CI) |
| **No `wrangler.toml` found** | Configuration via GitHub Actions (`CLOUDFLARE_PAGES_PROJECT`) |
| **Build command** | `npm run release` (outputs to `dist/`) |
| **Production branch** | `main` |
| **Preview branch pattern** | `pr-{number}` |
| **Production canonical hostname** | `thenitishkr.in` |
| **Apex proxy status** | Proxied (Cloudflare IPs: 172.67.199.118, 104.21.74.55) |
| **www proxy status** | Proxied (same IPs as apex) |
| **Nameservers** | `daphne.ns.cloudflare.com`, `roan.ns.cloudflare.com` |
| **SSL certificate** | Let's Encrypt via Cloudflare (WE1), TLSv1.3, expires 2026-09-05 |
| **Email** | Google Workspace (MX: aspmx.l.google.com) |
| **API token status** | Not yet active (created recently — may need propagation) |

---

## 1. Executive Summary

| Finding | Count/Status |
|---|---|
| Production deployment found | ✅ `thenitishkr.in` (Cloudflare Pages, `main` branch) |
| Approved preview found | ✅ `https://9581b29e.thenitishkr-static.pages.dev/` |
| Extra public URLs found | 1 — `www.thenitishkr.in` (correctly redirects) |
| Stale deployments found | ⚠️ Unknown (requires API access) |
| DNS conflicts found | 0 |
| Routing conflicts found | 0 |
| Cache problems found | 0 (HTML `max-age=0`, assets `max-age=31536000` with `immutable`) |
| Crawler blocks found | ⚠️ Unknown (requires API — WAF/Bot Fight mode check) |
| AI crawler policy found | ⚠️ Unknown (requires API — AI Crawl Control check) |
| Security conflicts found | 0 |
| Ranking risks found | 2 (retired PDFs return 404 not 410; preview is indexable) |

---

## 2. Public URL Matrix

| URL | Resource | Type | HTTP | Indexable | Disposition |
|---|---|---|---|---|---|
| `https://thenitishkr.in/` | Pages (main) | Production | 200 | ✅ Yes | Keep |
| `https://www.thenitishkr.in/` | Redirect rule | Redirect | 301→apex | N/A | Keep (correct) |
| `https://9581b29e.thenitishkr-static.pages.dev/` | Pages (pr-44) | Preview | 200 | ❌ **Should not be** | Fix: add noindex |
| Apex A records | `172.67.199.118`, `104.21.74.55` | Proxy IPs | N/A | N/A | Keep |
| MX records | Google Workspace | Email | N/A | N/A | **Must preserve** |

---

## 3. DNS Audit

### Website Records

| Hostname | Type | Target | Proxy | TTL | Purpose | Keep? |
|---|---|---|---|---|---|---|
| `thenitishkr.in` | A | 172.67.199.118, 104.21.74.55 | ✅ | 300 | Production website | ✅ Keep |
| `thenitishkr.in` | AAAA | 2606:4700:3034::6815:4a37, 2606:4700:3035::ac43:c776 | ✅ | 300 | IPv6 | ✅ Keep |
| `www.thenitishkr.in` | A | 172.67.199.118, 104.21.74.55 (not CNAME) | ✅ | 300 | www redirect | ✅ Keep |

### Email Records

| Hostname | Type | Target | Must Preserve |
|---|---|---|---|
| `thenitishkr.in` | MX | aspmx.l.google.com (1), alt1/alt2 (5), alt3/alt4 (10) | ✅ Yes |
| `thenitishkr.in` | TXT | `v=spf1 include:_spf.google.com ~all` | ✅ Yes |
| `_dmarc.thenitishkr.in` | TXT | `v=DMARC1; p=quarantine; adkim=r; aspf=r` | ✅ Yes |

### Verification Records

| Hostname | TXT Value | Purpose |
|---|---|---|
| `thenitishkr.in` | `google-site-verification=DfqiH68GqDWf0...` | Google Search Console |
| `thenitishkr.in` | `google-site-verification=VXUoTWbhhxAy...` | Google Search Console (second) |

### Infrastructure

| Record | Value |
|---|---|
| NS | `daphne.ns.cloudflare.com`, `roan.ns.cloudflare.com` |
| SOA | `daphne.ns.cloudflare.com` |
| CAA | **None** (no Certificate Authority Authorization records) |

### Observations
- Both apex and www use A records (not CNAME) — both are Cloudflare-proxied
- No CAA records — consider adding for security: `0 issue "letsencrypt.org"` and `0 issue "cloudflare.com"`
- Two Google Search Console verification TXT records — may indicate re-verification

---

## 4. SSL/TLS

| Field | Value |
|---|---|
| Certificate subject | `thenitishkr.in` |
| Issuer | WE1 (Let's Encrypt via Cloudflare) |
| TLS version | TLSv1.3 |
| Valid from | 2026-06-07 |
| Valid to | 2026-09-05 |
| Subject Alt Names | `DNS:thenitishkr.in` only |
| HSTS | Enabled (`max-age=31536000` via `_headers`) |
| Mixed content risk | Low (CSP: `default-src 'self'`) |

---

## 5. Workers & Pages Inventory

### Detected via CI Configuration

| Product | Status |
|---|---|
| Cloudflare Pages | ✅ Active (`wrangler-action@v3` deploys to Pages) |
| Pages project name | `${{ vars.CLOUDFLARE_PAGES_PROJECT }}` (value unknown without API) |
| Workers | Not detected in repository (no `wrangler.toml`, no Worker source) |
| Worker routes | Not applicable (Pages-only deployment) |
| Custom domains | `thenitishkr.in` (production), `www.thenitishkr.in` (redirect) |
| Pages.dev domain | ⚠️ Unknown (requires API) |
| Preview URL pattern | `{hash}.thenitishkr-static.pages.dev` |

### ⚠️ Missing (requires API access)
- Exact Pages project name
- All active/inactive deployments
- Pages.dev production hostname status
- Branch aliases
- Build environment variable names (not values)

---

## 6. Redirect Audit

| Source | Type | Target | Status | Hops |
|---|---|---|---|---|
| `www.thenitishkr.in/` | 301 | `https://thenitishkr.in/` | ✅ | 1 |
| `/rss.xml` | 301 | `/feed.xml` | ✅ | 1 |
| `/what-is-digital-constitutional-personhood` | 301 | `/digital-constitutional-personhood/` | ✅ | 1 |
| `/what-is-citizen-not-found` | 301 | `/intelligence/citizen-not-found/` | ✅ | 1 |
| `/record/evidence-submissions` | 301 | `/digital-arrest-data-harm/` | ✅ | 1 |
| `/article-12.html` | 301 | `/article-12/` | ✅ | 1 |
| 32 legacy `.html` and flat-file routes | 301 | Various canonical URLs | ✅ | 1 |

**Redirect chain analysis:** All redirects are single-hop. No chains or loops detected.

---

## 7. Cache Configuration Audit

### Current Cache Policies (from `_headers` and production responses)

| Resource Type | Cache-Control | CF-Cache-Status | Policy |
|---|---|---|---|
| HTML (`/*`) | `public, max-age=0, must-revalidate` | `DYNAMIC` | No edge cache; browser revalidates always | ✅ Correct |
| CSS/JS (non-versioned) | `public, max-age=14400, must-revalidate` | `REVALIDATED` | 4-hour edge cache | ✅ Reasonable |
| Images (`/assets/images/*`) | `public, max-age=31536000, immutable` | `HIT` | 1-year edge cache | ✅ Correct |
| Documents (`/assets/docs/*`) | `public, max-age=86400, must-revalidate` | — | 24-hour edge cache | ✅ Reasonable |
| Other assets (`/assets/*`) | `public, max-age=31536000, immutable` | — | 1-year edge cache | ⚠️ Overly broad |
| 404 pages | `no-store` | `DYNAMIC` / `BYPASS` | No cache | ✅ Correct |
| Sitemap/Feed | `public, max-age=0, must-revalidate` | `DYNAMIC` | No cache | ✅ Correct |
| robots.txt | `public, max-age=14400, must-revalidate` | `REVALIDATED` | 4-hour edge cache | ✅ Reasonable |

### Test Results (Double Request Verification)

| URL | First CF-Cache | Second CF-Cache |
|---|---|---|
| `/` | DYNAMIC | DYNAMIC (correct — revalidates) |
| `/styles.css` | REVALIDATED | REVALIDATED (correct) |
| `/assets/portrait.webp` | HIT | HIT (correct — cached) |
| `/robots.txt` | REVALIDATED | REVALIDATED (correct) |

### Issues
- `max-age=31536000` with `immutable` on `/assets/*` catch-all is overly aggressive — it covers non-versioned assets and could stale them indefinitely. The existing `_headers` already has specific rules for `images` and `docs` — the wildcard may override intended shorter TTLs.

---

## 8. 404 & 410 Test Results

| URL | Expected | Actual | Content-Type | Issue |
|---|---|---|---|---|
| Unknown route | 404 | 404 | text/html | ✅ Correct |
| Unknown deep path | 404 | 404 | text/html | ✅ Correct |
| Unknown PDF path | 404 | 404 | text/html | ✅ Correct |
| Retired PDF #1 | **410** | **404** | text/html | 🔴 Wrong status — `_redirects` 410 rule not taking effect |
| Retired PDF #2 | **410** | **404** | text/html | 🔴 Same issue |
| Retired PDF #3 | **410** | **404** | text/html | 🔴 Same issue |
| Retired PDF #4 | **410** | **404** | text/html | 🔴 Same issue |

**Root cause:** Cloudflare Pages `_redirects` may not support 410 status code via plain-text format. The 410 rules in `_redirects` are being ignored. This requires a **Cloudflare Bulk Redirect Rule** or **Wrangler configuration** with 410 support.

---

## 9. Preview Indexing Issue

| Preview URL | X-Robots-Tag | Risk |
|---|---|---|
| `https://9581b29e.thenitishkr-static.pages.dev/` | `index, follow` | 🔴 Preview content is indexable by search engines |

**Required fix:** Add `X-Robots-Tag: noindex, nofollow` to the preview branch via `_headers` or Cloudflare Pages configuration.

---

## 10. Crawler & AI Visibility (Limited Audit)

### What I Can Confirm Without API

| Check | Status |
|---|---|
| `robots.txt` allows all public content | ✅ `Allow: /` |
| Sitemap declared in `robots.txt` | ✅ |
| Production HTML has `X-Robots-Tag: index, follow` | ✅ |
| 8 intelligence pages have `X-Robots-Tag: noindex, follow` | ✅ (intentionally not in sitemap) |
| `robots.txt` does not block any crawler | ✅ |

### ⚠️ Cannot Confirm Without API
- WAF Bot Fight Mode status
- AI Crawl Control settings
- Verified bot classification
- Crawler-specific firewall rules
- Rate limiting configuration
- Country/ASN blocks
- Super Bot Fight Mode

---

## 11. Numbered Change Set (Pass B Preparation)

| ID | Resource | Current | Proposed | Reason | Risk |
|---|---|---|---|---|---|
| **CF-001** | Retired PDF 410 rules | 404 (HTML) | 410 Gone (text/plain) | `_redirects` 410 not supported; need Bulk Redirect | Low |
| **CF-002** | Preview indexing | `X-Robots-Tag: index, follow` | `X-Robots-Tag: noindex, nofollow` | Prevent search indexing of preview | Low |
| **CF-003** | `www` DNS | A records (same IPs as apex) | Consider CNAME to authenticate through Pages | Consistency | Low |
| **CF-004** | CAA records | None | `0 issue "letsencrypt.org"` + `0 issue "cloudflare.com"` | Security best practice | Low |
| **CF-005** | pages.dev production URL | Unknown | Disable or redirect to `thenitishkr.in` | Avoid duplicate content | Medium |
| **CF-006** | Old preview deployments | Unknown | Delete stale previews | Reduce public exposure | Medium |

---

## 12. Token Specification for Pass B

**Required read permissions (already needed for audit completion):**
- `Zone:Read`
- `DNS:Read`
- `Workers:Read`
- `Pages:Read`
- `Firewall Rules:Read`

**Required write permissions for approved changes:**
- For CF-001: `Zone:Edit` (Bulk Redirect Rules or equivalent)
- For CF-002: `Pages:Edit` (add preview headers)
- For CF-003: `DNS:Edit` (optional — low priority)
- For CF-004: `DNS:Edit` (optional)
- For CF-005: `Pages:Edit` (optional)
- For CF-006: `Pages:Edit` (optional)

---

## 13. Remaining Owner Actions (Post-Pass B)

| Action | Priority |
|---|---|
| Verify Google Search Console and submit sitemaps | High |
| Verify Bing Webmaster Tools and submit sitemaps | Medium |
| Review AI Crawl Control settings once API accessible | Medium |
| Consider `llms.txt` for AI discovery | Low |
| Review if `pages.dev` production URL exists | Medium |
| Enable Tiered Cache and Brotli if available | Low |