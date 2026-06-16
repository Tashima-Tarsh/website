# Live Site Audit — thenitishkr.in
**Audit date:** 2026-06-16 06:12 IST
**PR #46 status:** MERGED (2026-06-16 00:28 UTC)
**Site status:** LIVE on Cloudflare Pages

---

## 1. Technical Health (Post-PR #46)

| Check | Status | Details |
|---|---|---|
| Homepage HTTP | ✅ 200 OK | x-robots-tag: index, follow |
| Article 12 HTTP | ✅ 200 OK | x-robots-tag: index, follow |
| News page HTTP | ✅ 200 OK | x-robots-tag: index, follow |
| robots.txt | ✅ 200 OK | Proper headers, CSP present |
| X-Robots-Tag | ✅ FIXED | Global `index, follow` (SEO-002 merged) |
| Error pages | ✅ noindex | 404 and 410 pages (SEO-003 merged) |
| Article 12 schema | ✅ FIXED | No `NewsArticle` (SEO-004 merged) |
| Organization schema | ✅ REMOVED | Homepage clean (ENTITY-001 merged) |
| hasPart duplicates | ✅ FIXED | Intelligence schema cleaned (SEO-005 merged) |
| Cross-links | ✅ ADDED | LINK-001/2/3 merged |

---

## 2. News Situation — Critical Finding

### What you have:
- **media-coverage.json**: 20 major news outlets covered the PIL story (PTI, Economic Times, Tribune, Deccan Herald, etc.)
- **news-sitemap.xml**: Only **1 article** — "12 Years of NDA Excellence"
- **news/index.html**: Shows 6 items but only 1 is an actual news article

### The problem:
Your research attracted coverage from **20 major Indian media outlets** — that's significant. But the news situation has two separate issues:

**Issue A: Google News Indexing**
- Google News requires a dedicated `news-sitemap.xml` with recent articles
- Your news-sitemap has only **1 entry** — very thin for Google News
- To appear in Google News, you need to publish **regular, original news articles** (not just analysis)
- Google News favors sites that publish **2-3+ articles per week** on current events

**Issue B: Media Coverage Not Linking Back**
- The 20 news outlets covered the PIL story independently
- They used the standard PTI wire report format — **none linked to thenitishkr.in**
- This is expected: PTI syndication stories don't link to petitioners
- You can't control this — but you CAN create your own news coverage that links to your research

### What to do:
1. **Publish more news articles** — Aim for 1-2 per week on current events related to your research
2. **Use NewsArticle schema** on actual news articles (not research pages)
3. **Submit each new article** to IndexNow immediately
4. **Pitch directly to journalists** — Offer to be quoted as expert source
5. **Create a press page** with your availability for comment

---

## 3. Where You Stand Now

### Strengths:
| Asset | Status |
|---|---|
| 20 media citations in media-coverage.json | ✅ Strong credibility signal |
| 31 pages indexed | ✅ Solid for a research archive |
| 7 sitemap entries in Google News format | ⚠️ Thin (only 1 real news article) |
| Article 12 Infected concept | ✅ Unique — first-mover advantage |
| DISHA Intelligence Architecture | ✅ Novel methodology — no competition |
| Digital Constitutional Personhood | ✅ Novel concept — first-mover |
| Cross-linking between topics | ✅ Fixed in PR #46 |
| Schema markup | ✅ Person, Article, FAQ, Breadcrumb |
| Bing Webmaster Tools | ⚠️ Needs owner verification |
| Google Search Console | ⚠️ Needs owner setup |

### Weaknesses:
| Gap | Impact |
|---|---|
| Only 1 news article in news-sitemap | Google News won't index heavily |
| No GSC data available | Can't measure organic performance |
| No Bing WMT data available | Can't measure Bing performance |
| No media kit / press page | Journalists can't easily cite you |
| Limited Hindi content | Missing large search audience |
| No backlink-building strategy | Competitors may outrank over time |

---

## 4. Immediate Priorities (Owner Actions)

### Priority 1: Set up measurement (1 hour)
Follow `docs/seo-aeo/OWNER-STEP-BY-STEP-GUIDE.md`:
1. Merge PR ✅ DONE
2. Set up Google Search Console
3. Set up Bing Webmaster Tools
4. Export baseline data

### Priority 2: Increase news output (ongoing)
- Publish 1-2 news articles per week
- Target breaking news in digital governance, data protection, Supreme Court
- Use `NewsArticle` schema on news articles
- Submit to IndexNow immediately after publishing

### Priority 3: Create media resources (this week)
- Create `/press/` page with:
  - Author bio and credentials
  - Key research highlights
  - Contact for interviews
  - downloadable press kit
- Link to this from homepage and about page

---

## 5. Competitive Position

### Your niche:
You occupy a unique position at the intersection of:
- **Constitutional law** + **digital governance**
- **Cyber forensics** + **public records**
- **AI/automation** + **citizen rights**

### Competition:
| Competitor Type | Threat Level | Why |
|---|---|---|
| Major news outlets (ET, Tribune) | Low | They cover events, not deep research |
| Legal blogs (SCC, Bar) | Medium | They cover legal analysis |
| Government portals | Low | They're the subject, not the analyst |
| Other researchers | Very Low | No one else publishes this specific research |

### Your moat:
1. **DISHA Intelligence Architecture** — your proprietary methodology
2. **Article 12 Infected** — your original framework
3. **Digital Constitutional Personhood** — your defined concept
4. **20 media citations** — credibility that can't be replicated
5. **Court records** — primary source documentation

---

## 6. Next Steps for You

1. **Right now:** Set up GSC and Bing WMT (1 hour)
2. **This week:** Create a press page at `/press/`
3. **This week:** Write 1-2 news articles on current events
4. **Ongoing:** Publish 1-2 news articles per week
5. **Monthly:** Export GSC data and review performance
6. **Quarterly:** Re-audit and adjust strategy

---

*This audit will be updated when GSC/Bing data becomes available.*