# Hindi Opportunity Audit — thenitishkr.in

**Audit date:** 2026-06-16
**Method:** Evaluate whether Hindi-language versions of selected pages are viable

---

## 1. Guiding Principles

- Do not automatically translate the entire site
- Only create Hindi pages where genuine human-reviewed Hindi content can be maintained
- A Hindi page must have its own canonical URL, correct language attribute, correct hreflang, matching English alternate where applicable, equivalent evidence status
- No machine-translated legal claims without human review
- Research actual Hindi search demand — do not translate English keywords literally

---

## 2. Current Hindi Status

| Resource | Status |
|---|---|
| `/hi` path | ✅ 301 redirect to `/` (placeholder for future Hindi site) |
| Hindi language pages | None |
| hreflang tags | None |
| `lang` attribute on any page | `en` only |
| Hindi content | None in repository |
| Hindi translation review process | Not established |

---

## 3. Hindi Search Demand Research

Owner should run Google Trends searches for these Hindi queries:

| Hindi Query | English Translation | Google Trends Check |
|---|---|---|
| `डिजिटल अरेस्ट क्या है` | What is digital arrest | India, past 12 months |
| `डिजिटल अरेस्ट सबूत` | Digital arrest evidence | India, past 12 months |
| `डिजिटल अरेस्ट से बचाव` | Protection from digital arrest | India, past 12 months |
| `साइबर फ्रॉड कैसे रिपोर्ट करें` | How to report cyber fraud | India, past 12 months |
| `डेटा चोरी शिकायत` | Data theft complaint | India, past 12 months |
| `बायोमेट्रिक फेल होने पर क्या करें` | What to do when biometric fails | India, past 12 months |
| `आधार कार्ड गलती सुधार` | Aadhaar card error correction | India, past 12 months |
| `सरकारी डेटाबेस में नाम सुधार` | Name correction in government database | India, past 12 months |

**Do not:** Claim search volume for Hindi queries without real Google Trends data.

---

## 4. Candidate Hindi Pages (Prioritised by Public Value)

### Priority Candidates (Require Human Review)

| # | Page | Reason for Hindi | Risk |
|---|---|---|---|
| H1 | Digital arrest evidence checklist | Direct public service — victims may prefer Hindi | High — must not misstate legal guidance |
| H2 | Victim record preservation guide | Direct public service — practical guidance | High — must preserve evidence standards |
| H3 | Biometric failure — rights and remedy | Citizen problem — rights awareness in Hindi | High — must remain accurate |
| H4 | Data recovery after identity misuse | Practical guide for affected citizens | High — must be factual |

### Deferred Candidates (Lower Urgency)

| # | Page | Reason | Risk |
|---|---|---|---|
| H5 | DISHA Intelligence Architecture | Technical research — English is appropriate | Low urgency |
| H6 | Digital Constitutional Personhood | Academic framework — English is appropriate | Low urgency |
| H7 | Article 12 analysis | Legal analysis — English is appropriate | Low urgency |

**Candidates H5–H7 should not be translated until core public-service translations are established and reviewed.**

---

## 5. Implementation Requirements

For each Hindi page created:

| Requirement | Details |
|---|---|
| URL structure | `https://thenitishkr.in/hi/` (directory-based) or `https://thenitishkr.in/hi/page-name/` |
| Language attribute | `<html lang="hi">` |
| HTML lang | `hi` |
| X-default hreflang | Link from `/page/` to `/hi/page-name/` |
| Hindi hreflang | `<link rel="alternate" hreflang="hi" href="https://thenitishkr.in/hi/page-name/">` |
| English hreflang | `<link rel="alternate" hreflang="en" href="https://thenitishkr.in/page/">` |
| Canonical URL | Self-referencing canonical |
| Author | Same author (Nitish Kumar) |
| Publication date | New date for Hindi version |
| Modified date | Tracked separately |
| Evidence status | Equivalent to English version |
| Translation quality | Human-reviewed; not machine-translated |
| Claim-status classification | Same evidence badges |
| Citation blocks | Provide citations in Hindi format |
| Internal links | Link to Hindi versions of related pages |

---

## 6. Editorial Review Workflow Required

Before any Hindi page goes live:

1. **Draft translation** by human translator (not machine translation)
2. **Legal/evidence review** — verify all claims remain accurate in Hindi
3. **Language review** — verify natural Hindi, no stilted literal translation
4. **SEO review** — verify hreflang, canonical, URL structure
5. **Preview** — confirm rendering on desktop and mobile
6. **Publisher** — owner publishes to production
7. **Post-publish** — verify indexation and no duplicate content issues

---

## 7. Risk Assessment — Hindi Translation

| Risk | Mitigation |
|---|---|
| Machine-translated legal claims cause harm | Only publish human-reviewed content |
| Duplicate content (EN/HI) | Correct hreflang implementation eliminates this risk |
| Inconsistent evidence status | Evidence badges and citations must be translated with same accuracy |
| Unnatural Hindi (literal translation) | Language review required before publishing |
| Unverifiable search demand | Only create pages where real Hindi search demand is confirmed via Google Trends |

---

## 8. Recommendation

| Action | Timeline | Owner |
|---|---|---|
| Run Google Trends for Hindi queries | Before any creation | Owner |
| Establish Hindi editorial review process | Before any creation | Owner |
| Create 1 Hindi page (evidence checklist) as pilot | After demand confirmed + review process established | Owner |
| Monitor pilot for 60 days | After publication | Owner |
| Expand to H2–H4 if pilot successful | After 60-day review | Owner |

**Do not create any Hindi pages until real demand data and a human-review workflow exist.**

**Current recommendation: Monitor only.** No Hindi pages should be created in Pass B based on evidence available today.