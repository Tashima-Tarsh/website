# Measurement Plan — thenitishkr.in

**Audit date:** 2026-06-16
**Status:** ⚠️ Requires GSC and Bing WMT data (owner to provide) for baseline metrics

---

## 1. Measurement Schedule

| Phase | Timing | Purpose |
|---|---|---|
| **Deployment verification** | Immediately after implementing any change | Confirm no regressions (broken links, missing headers, validation errors) |
| **14 complete days** | 2 weeks post-deployment | Early signal detection (crawl changes, indexation changes) |
| **28 complete days** | 4 weeks post-deployment | First meaningful comparison with baseline |
| **56 complete days** | 8 weeks post-deployment | Medium-term trend establishment |
| **90 complete days** | ~3 months post-deployment | Statistically reliable performance assessment |

---

## 2. Metrics to Track

### Search Console Metrics (when available)

| Metric | Source | Baseline | Target (90-day) |
|---|---|---|---|
| Total impressions (28d) | GSC Query report | Unknown | Increase from baseline |
| Total clicks (28d) | GSC Query report | Unknown | Increase from baseline |
| Average CTR | GSC Query report | Unknown | Maintain or increase |
| Average position (top queries) | GSC Query report | Unknown | Improve for P4–10 queries |
| Branded queries % share | GSC Query report | Unknown | Maintain ≥ threshold |
| Non-branded queries growth | GSC Query report | Unknown | Increase |
| Pages indexed | GSC Indexing report | Unknown | Maintain all indexable pages |
| sitemap.xml processing status | GSC Sitemaps | Unknown | All submitted URLs indexed |
| News-sitemap.xml processing status | GSC Sitemaps | Unknown | All submitted news articles indexed |
| Core Web Vitals (passed %) | GSC Experience | Unknown | ≥ 80% Good on all dimensions |

### Bing Webmaster Tools Metrics (when available)

| Metric | Source | Baseline | Target (90-day) |
|---|---|---|---|
| Total impressions (28d) | Bing WMT | Unknown | Increase from baseline |
| Total clicks (28d) | Bing WMT | Unknown | Increase from baseline |
| Pages indexed in Bing | Bing WMT | Unknown | Maintain |
| IndexNow submission success rate | Bing WMT | Unknown | ≥ 95% |
| Bing referrals | Analytics | Unknown | Increase |

### AI Search / Answer Engine Metrics

| Metric | Method | Baseline | Target (90-day) |
|---|---|---|---|
| ChatGPT search citations | Manual testing of 5 priority queries | Unknown | Site appears in ≥ 1 answer |
| Copilot citations | Manual testing of 5 priority queries | Unknown | Site appears in ≥ 1 answer |
| Perplexity citations | Manual testing of 5 priority queries | Unknown | Site appears in ≥ 1 answer |
| Featured snippets | SERP audit of 5 priority queries | Unknown | Site appears in ≥ 1 snippet |

### Engagement and Brand Metrics

| Metric | Source | Baseline | Target (90-day) |
|---|---|---|---|
| Branded search volume (est.) | GSC Query report | Unknown | Increase from baseline |
| ORCID profile views | ORCID stats | Unknown | Increase |
| Wikidata page views | Wikidata stats | Unknown | Increase |
| CITATION.cff downloads | GitHub traffic | Unknown | Increase |
| API publications.json requests | Analytics (if tracked) | Unknown | Unknown |

---

## 3. Change-Specific Metrics

| Change ID | Primary Metric | Guardrail Metric | Minimum Review Period |
|---|---|---|---|
| **SEO-001** | Retired PDF URL returns intended status | Index coverage of retired URLs | 14 days |
| **SEO-002** | X-Robots-Tag is single-valued per page | No pages lose indexation | 14 days |
| **SEO-003** | Error pages not in index | Normal pages still indexed | 14 days |
| **SEO-004** (Article 12 schema) | Google Rich Results Test passes | No schema validation warnings | 14 days |
| **SEO-005** (Intelligence schema) | Google Rich Results Test passes | No schema validation warnings | 14 days |
| **AEO-001** (Article 12 definition) | Article 12 page appears for "Article 12 Infected" query | No decrease in existing impressions | 28 days |
| **AEO-002** (Evidence checklist purpose) | Evidence checklist page appears for "digital arrest evidence checklist" | No decrease in existing impressions | 28 days |
| **LINK-001/2/3** (Internal links) | New links are clickable and contextual | No broken internal links | 14 days |
| **ENTITY-001** (Remove Organization) | Knowledge Graph still shows Person + WebSite | No entity confusion | 28 days |
| **CONTENT-001** (Media kit) | Media kit downloadable; page visits | No sensitive data exposed | 14 days |

### Guardrail Metrics

For every change, monitor these guardrail metrics. If any guardrail is violated, the change should be rolled back or investigated:

| Guardrail | Trigger | Action |
|---|---|---|
| Total impressions decline > 10% vs baseline | GSC Query report 28-day | Investigate — may be unrelated; roll back if correlated with change |
| Total clicks decline > 10% vs baseline | GSC Query report 28-day | Investigate — may be unrelated; roll back if correlated with change |
| Indexed pages drop | GSC Indexing report | Investigate cause; could be unrelated |
| 404/500 errors increase | Analytics / GSC | Fix immediately |
| Schema validation errors | Google Rich Results Test | Fix within 48 hours |
| Duplicate content issue | GSC / manual check | Fix immediately |
| User report of broken feature | Owner notification | Fix immediately |

---

## 4. Rollback Conditions

| Condition | Action |
|---|---|
| New page causes indexation loss for other pages | Revert page |
| Schema change causes validation errors | Revert schema change |
| Content change introduces factual error | Revert content |
| Redirect causes infinite loop | Revert redirect |
| Performance degradation (LCP > 4s) | Revert if correlated |
| Analytics shows negative trend at 28-day review | Investigate before reverting |

---

## 5. Review Checkpoints

### 14-Day Review

```text
Check:
- [ ] All pages still return 200
- [ ] No new 404/500 errors
- [ ] Redirects still work
- [ ] sitemap.xml validates
- [ ] robots.txt serves correctly
- [ ] No schema validation errors
- [ ] GSC: no new errors in Indexing report
- [ ] Bing: IndexNow submissions accepted
- [ ] Manual check: changes visible and correct
```

### 28-Day Review

```text
Check:
- [ ] All 14-day checks
- [ ] GSC impressions (28d) vs baseline
- [ ] GSC clicks (28d) vs baseline
- [ ] GSC CTR (28d) vs baseline
- [ ] GSC average position (28d) vs baseline
- [ ] Bing impressions (28d) vs baseline
- [ ] Bing clicks (28d) vs baseline
- [ ] Featured snippet appearances
- [ ] AI answer citations (manual check)
- [ ] Branded vs non-branded query split
- [ ] Top 10 queries list
- [ ] Any new competitors appearing
```

### 56-Day Review

```text
Check:
- [ ] All 28-day checks
- [ ] Trend direction established (up/flat/down)
- [ ] Content updates applied (if any)
- [ ] External citations or references noted
- [ ] Wikidata entries created (if applicable)
- [ ] ORCID profile updated
```

### 90-Day Review

```text
Check:
- [ ] All 56-day checks
- [ ] Statistical significance assessment
- [ ] Final determination: keep, modify, or roll back each change
- [ ] Documentation of lessons learned
- [ ] Updated audit documents with new baseline
- [ ] Plan for Pass C (if needed)
```

---

## 6. Reporting Template

Use this template for each review checkpoint:

```markdown
# Measurement Review — YYYY-MM-DD

## Summary
Total changes implemented: [N]
Total changes kept: [N]
Total changes rolled back: [N]

## Search Console (28-day)
- Impressions: [X] (change: +/-%)
- Clicks: [X] (change: +/-%)
- CTR: [X]% (change: +/-pp)
- Avg position: [X] (change: +/-)
- Branded query share: [X]%
- Non-branded query share: [X]%

## Bing (28-day)
- Impressions: [X]
- Clicks: [X]
- CTR: [X]%

## AI Search
- ChatGPT search: [present/absent]
- Copilot: [present/absent]
- Perplexity: [present/absent]
- Featured snippets: [N]

## Change Status
| ID | Status | Notes |
|---|---|---|
| AEO-001 | Active | — |
| SEO-004 | Rolled back | Caused validation error Y; fixed and redeployed |

## Guardrail Check
- [ ] Total impressions within guardrail (-10%)?
- [ ] Total clicks within guardrail (-10%)?
- [ ] Pages indexed stable?
- [ ] Errors/404s stable?
- [ ] Schema validated?

## Decisions
- Keep all changes: [Yes/No/Partial]
- New baseline established: [Yes/No]
- Next actions: [...]