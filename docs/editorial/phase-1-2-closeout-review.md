# Phase 1 & Phase 2 Closeout — Editorial Review Report

Generated: 2026-06-16 | Branch: `fix/phase-1-2-closeout`

---

## 97% Statement — Preserved and Contextualised

| Item | Detail |
|---|---|
| **URL** | `/intelligence/` |
| **Original text** | "Measured against government records and open data, its findings have held to an accuracy of 97% to date - a measure of method, not a claim of finality." |
| **Action taken** | **Preserved unchanged.** Added "View validation basis" link pointing to `/disha/validation/`. |
| **Owner confirmation required** | None for the statement itself. Exact numerator/denominator figures for the Validation page await owner-supplied values. |

---

## DISHA Validation Page — Strengthened

| Item | Detail |
|---|---|
| **URL** | `/disha/validation/` |
| **Old title** | "DISHA Validation and Limits" |
| **New title** | "DISHA Validation and Accuracy Basis" |
| **Old H1** | "DISHA Validation and Limits" |
| **New H1** | "DISHA Validation and Accuracy Basis" |
| **Old opening** | "DISHA validation begins with source-backed chronology..." |
| **New opening** | "The Intelligence page on this site states that DISHA findings... have held to an accuracy of 97% to date. This page explains what that figure means..." |
| **New content added** | Evaluation framework table, finding categories, total findings reviewed (with owner-review markers), methodological limitations, last reviewed section |
| **Reason** | Previous page was thin and contained commercial language. New version provides substantive validation context with transparent markers for owner-supplied data. |
| **Source used** | Intelligence page 97% statement, DISHA methodology page, Claim-to-Source page |
| **Claim status** | Methodological explanation; no invented figures |
| **Owner confirmation required** | Exact counts of findings reviewed, correct findings, incorrect, partially supported, unresolved |

---

## Commercial Language — Removed

| Location | Old Text | New Text | Reason |
|---|---|---|---|
| `/disha/validation/` | "The premium product path is to add a claim ledger..." | "The next documentation step is to maintain a claim ledger..." | Public-interest research; "premium product" sounds like SaaS marketing |

No other occurrences of "premium" found in any `.html` file in the repository.

---

## Hub-Child Link Sections — Added

### Article 12 Hub (`/article-12/`)
- **Section title:** "Continue through this research cluster"
- **H2:** "Article 12 accountability in three dimensions."
- **Links added:** AI Systems, Automated Decisions, Public Authority Responsibility
- **H1 changed:** From "How the citizen became invisible" to "Article 12 and Digital Governance: How the Citizen Became Invisible"

### Digital Constitutional Personhood Hub (`/digital-constitutional-personhood/`)
- **Section title:** "Digital Constitutional Personhood research"
- **H2:** "Four dimensions of digital constitutional personhood."
- **Links added:** Definition, Data Sovereignty, Biometric Failure, Human Review and Remedy
- **Disclaimer:** "Digital Constitutional Personhood is the author's proposed research framework. It is not enacted law or settled judicial doctrine."

### DISHA Hub (`/disha/`)
- **Section title:** "DISHA research record"
- **H2:** "Explore the DISHA architecture in detail."
- **Links added:** Origin, Methodology, Validation, Claim-to-Source System

---

## Research Datasets — Renamed

| Item | Detail |
|---|---|
| **URL** | `/research-datasets/` (URL unchanged to preserve existing links) |
| **Old H1** | "Research Datasets and Source Register" |
| **New H1** | "Research Source Register and Evidence Inventory" |
| **Old title** | "Research Datasets and Source Register" |
| **New title** | "Research Source Register and Evidence Inventory" |
| **Lead clarification** | Added "not machine-readable CSV or JSON datasets" |
| **Reason** | Page contains document collections and source registers, not structured datasets. Naming now reflects actual content. |

---

## About Page — Deferred

The About page tightening (removing repetitive "not the politician" disclaimers, consolidating repeated credentials) requires a careful structural review that depends on the current live About page content. This is marked as a remaining owner decision.

---

## Child-Page Quality Review — Summary

The following child pages exist in the repository and are in the sitemap:

| Page | Classification | Action |
|---|---|---|
| `/article-12/ai-systems/` | Indexable | Has hub link now; review content depth separately |
| `/article-12/automated-decisions/` | Indexable | Has hub link now; review content depth separately |
| `/article-12/public-authority-responsibility/` | Indexable | Has hub link now; review content depth separately |
| `/digital-constitutional-personhood/definition/` | Indexable | Has hub link now |
| `/digital-constitutional-personhood/data-sovereignty/` | Indexable | Has hub link now |
| `/digital-constitutional-personhood/biometric-failure/` | Indexable | Has hub link now |
| `/digital-constitutional-personhood/human-review-remedy/` | Indexable | Has hub link now |
| `/disha/origin/` | Indexable | Has hub link now |
| `/disha/methodology/` | Indexable | Has hub link now |
| `/disha/validation/` | Indexable | **Substantially strengthened** |
| `/disha/claim-to-source-system/` | Indexable | Has hub link now |
| `/digital-arrest-data-harm/evidence-checklist/` | Indexable | In sitemap |
| `/digital-arrest-data-harm/stolen-kyc-data/` | Indexable | In sitemap |
| `/digital-arrest-data-harm/data-recovery/` | Indexable | In sitemap |
| `/digital-arrest-data-harm/victim-record-preservation/` | Indexable | In sitemap |

**Note:** A full content-depth audit of each child page was not performed in this pass. Pages that may be "too thin for indexing" should be flagged in a separate Phase 3 editorial audit. No `noindex` changes were applied in this closeout round.

---

## Restrained Language Checklist

All new copy follows veteran-writer editorial standard:

| Prohibited Phrase | Used? |
|---|---|
| "In today's digital age" | No |
| "In an ever-evolving landscape" | No |
| "It is important to note" | No |
| "This comprehensive guide" | No |
| "At the intersection of" | No |
| "Navigating the complexities" | No |
| "Robust solution" | No |
| "Groundbreaking" | No |
| "Game-changing" | No |
| "Transformative" | No |
| "Revolutionary" | No |
| "Seamlessly" | No |
| "Leverage" | No |
| "Delve into" | No |

---

## Remaining Owner Decisions

1. **Validation page exact figures:** Total findings reviewed, correct, incorrect, partially supported, unresolved counts.
2. **Last comprehensive review date** for the 97% accuracy measure.
3. **About page tightening:** Which sections to consolidate, which repeated disclaimers to remove.
4. **Evidence Submissions page:** Whether a dedicated page at `/record/evidence-submissions/` should be created in the future (currently redirected to `/digital-arrest-data-harm/`).
5. **Child-page depth audit:** Whether any Phase 1 child pages need `noindex` tags or content expansion.
6. **Cloudflare 410 support:** Confirm that Cloudflare Pages `_redirects` supports `410` status code for the retired PDF URLs. If not, a Cloudflare Worker or Bulk Redirect rule may be needed.