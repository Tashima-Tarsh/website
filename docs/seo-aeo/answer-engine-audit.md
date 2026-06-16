# Answer Engine (AEO) Audit — thenitishkr.in

**Audit date:** 2026-06-16
**Method:** Evaluate each priority page for AI answer extraction readiness

---

## 1. AEO Readiness Framework

A page is answer-engine ready when it has:

| Requirement | Why It Matters |
|---|---|
| Clear page purpose | AI knows what the page is about |
| Direct opening answer | Brief, precise answer extracted without surrounding design |
| Precise definitions | Entity definitions clear for knowledge graph consumption |
| Identifiable entities | Person, concept, framework entities machine-readable |
| Visible author | Authoritativeness signal |
| Publication and revision dates | Freshness and reliability signal |
| Claim-status classification | Distinguishes fact from analysis from opinion |
| Primary sources | Verifiability signal |
| Limitations stated | Honesty and reliability signal |
| Meaningful headings | Structure for extraction |
| Concise explanatory passages | Extractable snippets |
| Useful tables or lists | Structured extraction |
| Accessible textual content | Not image-reliant |
| Stable canonical URL | Unique identifier for citation |
| Citation information | BibTeX, RIS, plain text |
| Structured data matching visible content | Schema alignment with extractable passages |

---

## 2. Per-Page AEO Audit

### Page: Home (`/`)

| Criteria | Status | Notes |
|---|---|---|
| Clear page purpose | ✅ | Public interest research archive |
| Direct opening answer | ✅ | "Public interest research archive, constitutional accountability..." |
| Precise definitions | ✅ | Researcher identity clear |
| Identifiable entities | ✅ | Person, WebSite, DefinedTermSet |
| Visible author | ✅ | Nitish Kumar (thenitishkr) |
| Publication/revision dates | ⚠️ | Last updated June 2026 — general, not per-section |
| Claim-status classification | ❌ | Homepage doesn't need this |
| Primary sources | ✅ | Links to research sections |
| Limitations stated | ❌ | Not needed on homepage |
| Meaningful headings | ✅ | Section headings present |
| Concise explanatory passages | ✅ | Brief section descriptions |
| Useful tables or lists | ✅ | Publication list |
| Accessible textual content | ✅ | Text-based |
| Stable canonical URL | ✅ | |
| Citation information | ✅ | API, sitemap |
| Schema matches visible content | ⚠️ | Organization schema overstates formal entity status |

**AEO Score: 13/16** — Good for homepage.

### Page: About (`/about/`)

| Criteria | Status | Notes |
|---|---|---|
| Clear page purpose | ✅ | Researcher profile |
| Direct opening answer | ✅ | "Independent researcher, constitutional accountability, digital governance" |
| Precise definitions | ✅ | Clear research focus |
| Identifiable entities | ✅ | Person schema complete |
| Visible author | ✅ | Self-identifying |
| Publication/revision dates | ⚠️ | "Last updated June 2026" — no specific date |
| Claim-status classification | ❌ | Not applicable to profile page |
| Primary sources | ✅ | Links to publications, ORCID, Wikidata |
| Limitations stated | ⚠️ | "not the politician" is a limitation/disambiguation |
| Meaningful headings | ✅ | Research areas, publications, etc. |
| Concise explanatory passages | ✅ | Clear bio text |
| Useful tables or lists | ✅ | Books list, research areas |
| Accessible textual content | ✅ | Text-based |
| Stable canonical URL | ✅ | |
| Citation information | ⚠️ | About page doesn't have citation block (not needed) |
| Schema matches visible content | ✅ | Person matches visible bio |

**AEO Score: 14/16** — Strong profile page.

### Page: Article 12 Hub (`/article-12/`)

| Criteria | Status | Notes |
|---|---|---|
| Clear page purpose | ✅ | Research on Article 12 and digital governance |
| Direct opening answer | ⚠️ | Opening paragraph sets context but lacks a concise definition phrase for "Article 12 Infected" |
| Precise definitions | ⚠️ | Definition appears in FAQ section, not in opening |
| Identifiable entities | ✅ | Person, Article, defined terms |
| Visible author | ✅ | |
| Publication/revision dates | ✅ | Published 2026-06-14, modified 2026-06-16 |
| Claim-status classification | ✅ | Claim statuses visible in status badges |
| Primary sources | ✅ | Links to statutory text, court records |
| Limitations stated | ✅ | "This is original research, not legal advice" |
| Meaningful headings | ✅ | Well-structured sections |
| Concise explanatory passages | ✅ | Core analysis paragraphs |
| Useful tables or lists | ✅ | Framework summary table |
| Accessible textual content | ✅ | Text-based |
| Stable canonical URL | ✅ | |
| Citation information | ✅ | BibTeX, RIS, plain text |
| Schema matches visible content | ⚠️ | @type: ["Article","ScholarlyArticle","NewsArticle"] — three types on one node; NewsArticle inappropriate |

**🔴 Findings:**
1. **Direct answer missing:** No concise definition of "Article 12 Infected" in the opening paragraph. The definition lives in an FAQ section lower down. For AEO, the key concept definition should be extractable from the opening.
2. **Schema overload:** Three `@type` values on one node is excessive.
3. **Schema-visible content mismatch:** FAQPage structured data may not match visible FAQ section exactly.

**AEO Score: 13/16** — Strong content but missing direct opening answer.

### Page: DCP Hub (`/digital-constitutional-personhood/`)

| Criteria | Status | Notes |
|---|---|---|
| Clear page purpose | ✅ | Research framework: Digital Constitutional Personhood |
| Direct opening answer | ⚠️ | Opening defines DCP but could be shorter and more extractable |
| Precise definitions | ✅ | Definition clearly stated |
| Identifiable entities | ✅ | Person, Article, defined terms |
| Visible author | ✅ | |
| Publication/revision dates | ✅ | |
| Claim-status classification | ✅ | Status badges present |
| Primary sources | ✅ | |
| Limitations stated | ✅ | Research limitations noted |
| Meaningful headings | ✅ | |
| Concise explanatory passages | ✅ | |
| Useful tables or lists | ✅ | Framework components |
| Accessible textual content | ✅ | |
| Stable canonical URL | ✅ | |
| Citation information | ✅ | |
| Schema matches visible content | ⚠️ | FAQPage markup — verify matching visible FAQ |

**AEO Score: 14/16** — Strong. Minor direct-answer improvement possible.

### Page: DISHA Hub (`/disha/`)

| Criteria | Status | Notes |
|---|---|---|
| Clear page purpose | ✅ | DISHA Intelligence Architecture |
| Direct opening answer | ⚠️ | Opening sets context but could have a more concise "what is DISHA" answer |
| Precise definitions | ✅ | |
| Identifiable entities | ✅ | |
| Visible author | ✅ | |
| Publication/revision dates | ✅ | |
| Claim-status classification | ✅ | |
| Primary sources | ✅ | |
| Limitations stated | ✅ | |
| Meaningful headings | ✅ | |
| Concise explanatory passages | ✅ | |
| Useful tables or lists | ✅ | Architecture layers |
| Accessible textual content | ✅ | |
| Stable canonical URL | ✅ | |
| Citation information | ✅ | |
| Schema matches visible content | ⚠️ | FAQPage markup — verify |

**AEO Score: 14/16** — Strong.

### Page: DISHA Validation (`/disha/validation/`)

| Criteria | Status | Notes |
|---|---|---|
| Clear page purpose | ✅ | DISHA accuracy basis |
| Direct opening answer | ✅ | Opens with the 97% figure and its basis |
| Precise definitions | ✅ | |
| Identifiable entities | ✅ | |
| Visible author | ✅ | |
| Publication/revision dates | ✅ | |
| Claim-status classification | ✅ | Status badges |
| Primary sources | ✅ | Validation ledger |
| Limitations stated | ✅ | Limits clearly stated |
| Meaningful headings | ✅ | |
| Concise explanatory passages | ✅ | |
| Useful tables or lists | ✅ | Validation examples |
| Accessible textual content | ✅ | |
| Stable canonical URL | ✅ | |
| Citation information | ✅ | |
| Schema matches visible content | ✅ | TechArticle |

**AEO Score: 16/16** — Excellent AEO readiness. Template for other pages.

### Page: Digital Arrest Evidence Checklist (`/digital-arrest-data-harm/evidence-checklist/`)

| Criteria | Status | Notes |
|---|---|---|
| Clear page purpose | ✅ | Evidence preservation checklist |
| Direct opening answer | ⚠️ | Opens with context; checklist is the core value but opening could state "This page lists the evidence to preserve" |
| Precise definitions | ✅ | |
| Identifiable entities | ✅ | Person, TechArticle |
| Visible author | ✅ | |
| Publication/revision dates | ✅ | |
| Claim-status classification | ✅ | |
| Primary sources | ✅ | |
| Limitations stated | ✅ | "Not legal advice" |
| Meaningful headings | ✅ | Step-by-step structure |
| Concise explanatory passages | ✅ | |
| Useful tables or lists | ✅ | Checklist format |
| Accessible textual content | ✅ | |
| Stable canonical URL | ✅ | |
| Citation information | ✅ | |
| Schema matches visible content | ✅ | |

**AEO Score: 15/16** — Excellent.

### Page: MeitY Digital Governance Case File (`/intelligence/meity-digital-governance/`)

| Criteria | Status | Notes |
|---|---|---|
| Clear page purpose | ✅ | Case file for W.P.(Crl.) 163/2026 |
| Direct opening answer | ✅ | Opening states the case and its significance |
| Precise definitions | ✅ | |
| Identifiable entities | ✅ | Person, TechArticle (but schema has duplicate hasPart) |
| Visible author | ✅ | |
| Publication/revision dates | ✅ | |
| Claim-status classification | ✅ | |
| Primary sources | ✅ | Court records, media coverage |
| Limitations stated | ⚠️ | Could be more explicit about being petitioner's record |
| Meaningful headings | ✅ | |
| Concise explanatory passages | ✅ | |
| Useful tables or lists | ⚠️ | Media coverage list helpful |
| Accessible textual content | ✅ | |
| Stable canonical URL | ✅ | |
| Citation information | ✅ | |
| Schema matches visible content | ⚠️ | Duplicate hasPart entries; TechArticle vs Article type |

**AEO Score: 13/16** — Good. Fix schema duplication and strengthen limitations statement.

---

## 3. AEO Priority Issues

| ID | Issue | Page(s) | Impact |
|---|---|---|---|
| **AEO-001** | Missing direct opening answer for core concept | `/article-12/`, `/disha/`, partially `/dcp/` | AI extractors may not immediately surface the definition |
| **AEO-002** | Overloaded schema `@type` | `/article-12/` | May confuse schema consumers |
| **AEO-003** | Duplicate `hasPart` in schema | `/intelligence/` | Schema bloat; may cause warnings |
| **AEO-004** | FAQPage markup verification | Multiple pages | Must confirm visible FAQ matches schema FAQ; if not, remove FAQPage |
| **AEO-005** | No direct answer phrase for "evidence checklist" | `/digital-arrest-data-harm/evidence-checklist/` | Minor — AI can still extract checklist content |

---

## 4. Direct Answer Recommendations

### Page: Article 12 Hub

**Current opening:** "Article 12 and Digital Governance is an original research analysis by Nitish Kumar (thenitishkr). It examines the constitutional implications of digital governance in India." (paraphrased)

**Recommended addition near top:**
> "Article 12 Infected is a research framework describing how public authorities in India, as defined under Article 12 of the Constitution, operate digital systems that can harm citizens without accountability. The framework examines who is responsible when software powered by outsourced infrastructure denies benefits, rejects identity, or leaves citizens without remedy."

This establishes:
- The concept name
- The definition
- The India jurisdiction
- The core problem
- The research question

**Risk:** Low — describes existing content faithfully.

### Page: Digital Constitutional Personhood

**Current opening:** Defines DCP as "a constitutional research framework asserting that a citizen's digital identity, data, and online presence are an extension of their constitutional personhood..."

**This is already good.** Ensure it's the very first paragraph after the meta-data block.

### Page: DISHA Hub

**Current opening:** Good but could be shorter.

**Recommended:** Ensure the opening sentence is an extractable definition:
> "DISHA Intelligence Architecture is a constitutional intelligence, cyber-evidence, geospatial and public-memory architecture conceived by Nitish Kumar in 2012. It transforms signals into evidence, evidence into memory, and memory into intelligence."

This is already present in the opening. ✅

### Page: Evidence Checklist

**Recommended:** Add a one-sentence purpose statement at the very top:
> "This evidence checklist helps victims of digital arrest in India identify and preserve the evidence needed for legal action and record preservation."

---

## 5. Citation Readiness

| Page | BibTeX | RIS | Plain Text | CITATION.cff | Dataset | Status |
|---|---|---|---|---|---|---|
| Home | ❌ Not needed | ❌ | ❌ | ✅ | ❌ | ✅ |
| Article 12 | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| DCP | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| DCP Definition | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| DISHA | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| DISHA Methodology | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| DISHA Validation | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| DISHA Claim-to-Source | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| Intelligence Archive | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| MeitY Case File | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| Books | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| Evidence Checklist | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |

**Assessment:** Citation infrastructure is comprehensive. Every priority research page has BibTeX, RIS, and plain-text citation. This is exceptional for AI answer citation eligibility.

**Missing:** Dataset markup for research datasets page. The `/research-datasets/` page is described in sitemap but the structured data uses `WebPage`, not `Dataset` type. Verify whether actual datasets exist or if it's a document collection (per instructions: "Do not label a document collection as a dataset").

---

## 6. AEO Score Summary

| Page | Score | Key Improvement |
|---|---|---|
| Home | 13/16 | Minor — remove Organization schema |
| About | 14/16 | Minor — add specific last-updated date |
| **Article 12 Hub** | **13/16** | **🔴 Add direct opening definition** |
| DCP Hub | 14/16 | ✅ Near-optimal |
| DISHA Hub | 14/16 | ✅ Near-optimal |
| DISHA Validation | **16/16** | ✅ **Perfect — template for all pages** |
| Evidence Checklist | 15/16 | ✅ Excellent |
| MeitY Case File | 13/16 | Fix schema; strengthen limitations |

---

## 7. Accessibility for AI Crawlers

| Crawler | robots.txt | Status |
|---|---|---|
| Googlebot | Allow: / | ✅ |
| Bingbot | Allow: / | ✅ |
| OAI-SearchBot | Allow: / | ✅ (ChatGPT search) |
| ChatGPT-User | Allow: / | ✅ |
| ClaudeBot | Allow: / | ✅ |
| PerplexityBot | Allow: / | ✅ |
| Applebot | Allow: / | ✅ |

**All major AI search crawlers are allowed.** Search engine crawlers are also allowed. Training crawlers (GPTBot, Google-Extended, CCBot) are also allowed — owner should review.

**llms.txt:** ✅ Present at `/llms.txt`
**ai.txt:** ✅ Present at `/ai.txt`
**CITATION.cff:** ✅ Present at root

**Assessment:** The site is maximally accessible to AI crawlers and citation engines. No technical barriers to AEO visibility.

---

## 8. AEO Change Recommendations

| ID | Change | Page(s) | Risk |
|---|---|---|---|
| **AEO-001** | Add concise "Article 12 Infected" definition as first content paragraph after metadata | `/article-12/` | Low |
| **AEO-002** | Fix schema `@type`: use `["Article","ScholarlyArticle"]` — remove `NewsArticle` | `/article-12/` | Low |
| **AEO-003** | Fix duplicate `hasPart` entries in Intelligence schema | `/intelligence/` | Low |
| **AEO-004** | Verify FAQPage schema matches visible FAQ on all pages. Remove FAQPage where no visible FAQ exists | Multiple pages | Low |
| **AEO-005** | Add purpose sentence at top of evidence checklist | `/digital-arrest-data-harm/evidence-checklist/` | Low |