# Phase 2 Entity Map

**Baseline Commit**: ca07750  
**Branch**: seo/phase-2-content-authority  
**Date**: 2026-06-16

---

## Entity Strategy

Phase 2 must establish ONE consistent author entity across all pages, with proper `sameAs` links and authority signals. The site must distinguish Nitish Kumar (thenitishkr) from the Bihar politician Nitish Kumar.

---

## Primary Entity: Person

### Entity ID
```
https://thenitishkr.in/#person
```

### Required Fields (Verified)
| Field | Current Value | Status | Phase 2 Action |
|-------|---------------|--------|---|
| **name** | Nitish Kumar | ✓ Verified | Keep |
| **alternateName** | thenitishkr; Nitish Kumar (thenitishkr) | ✓ Verified | Keep; ensure consistent across pages |
| **url** | https://thenitishkr.in/ | ✓ Verified | Keep |
| **image** | /assets/images/nitish-kumar-thenitishkr.jpg | ✓ Verified | Keep; ensure single version across pages |
| **description** | Independent researcher, author, DISHA inventor, National Cyber Security Scholar | ✓ Verified | Keep; ensure all pages use same or similar |
| **disambiguatingDescription** | Not the Bihar politician; DISHA inventor; researcher | ✓ Verified | Keep prominent on About page; use on homepage if needed |
| **jobTitle** | Multiple titles | ⚠️ Needs verification | See below |
| **nationality** | IN (India) | ✓ Verified | Keep |
| **address** | Chandigarh, Punjab, India | ✓ Verified | Keep |
| **email** | nitish@thenitishkr.in | ✓ Verified | Keep visible on Media Desk |
| **knowsAbout** | [Array of topics] | ✓ Verified | Keep current list |
| **hasCredential** | National Cyber Security Scholar (Cert ID 00112) | ✓ Verified | Keep; ensure date range accurate |
| **sameAs** | See next section | ⚠️ Needs review | Verify all links are live and current |

### Critical: Job Titles Requiring Verification

Current schema lists:
- "Independent Public-Interest Researcher"
- "National Cyber Security Scholar"
- "Author"
- "Inventor of DISHA Intelligence Architecture"
- "Manager — Digital Transformation, EY"

**Phase 2 Action Required**: 
- ✓ Keep first 4 (verified or self-descriptive)
- ⚠️ VERIFY: Is "Manager—Digital Transformation, EY" still current? Date range?

---

## sameAs Links (Authority & Verification)

### Current sameAs Links in About Page Schema

| Link | Type | Verification Status | Phase 2 Action |
|------|------|---|---|
| https://www.wikidata.org/wiki/Q140001166 | Wikidata entity | ✓ Verified | Keep; ensure page exists and links back |
| https://orcid.org/0009-0004-6840-4463 | ORCID ID | ✓ Verified | Keep; ensure profile is current |
| https://x.com/thenitishkr | Social media | ✓ Verified | Keep; account is active |
| https://www.linkedin.com/in/thenitishkr | Social media | ✓ Verified | Keep; profile is current |
| https://thenitishkr.substack.com | Publication platform | ✓ Verified | Keep; active publication |
| https://medium.com/@thenitishkr | Publication platform | ✓ Verified | Keep; recent posts exist |
| https://github.com/Tashima-Tarsh | Code repository | ✓ Verified | Keep; if still accurate |
| https://www.reddit.com/user/Ok-File-6559/ | Social media | ✓ Verified | Keep; if still active |
| https://www.quora.com/profile/Nitish-Kumar-11545 | Q&A platform | ✓ Verified | Keep; if still active |
| https://www.credly.com/users/nitish-kumar.57fd1000/badges | Credential badge | ✓ Verified | Keep; link to National Cyber Security Scholar badge |
| https://wa.me/919142197135 | WhatsApp contact | ⚠️ Verify | Keep if current contact method |
| https://www.amazon.com/author/nikukr | Amazon author page | ✓ Verified | Keep; link to books |

### Links to Add (If Not Present)

1. **Wikipedia** — If Wikipedia article exists for thenitishkr/Nitish Kumar researcher
2. **Goodreads** — If author profile exists (books are published)
3. **Instagram** — Already in footer; add to sameAs if not present
4. **Facebook** — Already in footer; add to sameAs if not present

### Links to Review/Remove

- Any dead links or outdated profiles
- Any profiles that don't clearly identify the independent researcher

**Phase 2 Action**: Audit all sameAs links; verify they link back to thenitishkr.in (rel="me" or external confirmation)

---

## Secondary Entities: Authored Works

### Book Entity 1: Era of Stupidity

**Current Status**: Referenced in Person schema as authored work

**Fields to Verify**:
- Exact title: "Era of Stupidity: Citizen Not Found"
- ISBN: 978-93-5592-012-6
- Publication date: Verify year
- Publisher: Verify name
- Description: Current? Accurate?

**Phase 2 Action**: Ensure Book schema on Books page is complete and matches person entity

### Book Entity 2: Sleeping Guardian

**Current Status**: Referenced in Person schema as authored work

**Fields to Verify**:
- Exact title: "Sleeping Guardian: India Lost Justice"
- ISBN: 979-8274694070
- Publication date: Verify year
- Publisher: Verify name
- Description: Current? Accurate?

**Phase 2 Action**: Ensure Book schema on Books page is complete and matches person entity

---

## Defined Terms

Currently, the site defines:
1. **DISHA Intelligence Architecture** — Author-originated term
2. **Article 12 Infected** — Author-originated concept
3. **Digital Constitutional Personhood** — Author-proposed framework

### DefinedTermSet Schema

Current ID: `https://thenitishkr.in/#defined-terms`

**Phase 2 Action**: Ensure:
- All defined terms are labeled as "author-originated" or "author-proposed" where appropriate
- sameAs links (e.g., Wikidata for DISHA) are included where they exist
- Related pages link to these definitions

---

## Framework Entities

### Article 12 Infected

**Current Status**: Defined term in schema; concept presented on Article 12 hub

**Key Points**:
- Clearly labeled as author's research concept
- Not presented as law or official doctrine
- Linked to supporting case files

**Phase 2 Action**: Ensure distinction is clear on hub page between:
1. Article 12 constitutional text
2. Established Article 12 doctrine
3. Author's "Article 12 Infected" concept
4. Unresolved legal questions

### Digital Constitutional Personhood

**Current Status**: Defined term in schema; framework pages exist

**Key Points**:
- MUST be labeled as "author-proposed framework"
- MUST NOT be presented as law, policy, or judicially recognized
- MUST clearly state "unless evidence shows otherwise"

**Phase 2 Action**: Audit all pages in cluster for accurate status labels

### DISHA Intelligence Architecture

**Current Status**: Defined term in schema; research cluster exists

**Key Points**:
- Clearly attributed to author as inventor
- Operational details explained in Methodology page
- Validation claims must be supported by evidence or removed

**Phase 2 Action**: 
1. Verify Methodology page describes actual operational method (not invented)
2. Ensure Validation page discloses sample size, methodology, limitations, or is marked "requires verification"
3. Ensure Origin page documents when DISHA was first conceived (2012?)
4. Ensure all accuracy or success claims are properly sourced

---

## ProfilePage Implementation

### About Page as ProfilePage

**Current Status**: About page uses FAQPage + Person schema

**Phase 2 Action**: Consider adding ProfilePage schema if it improves profile clarity:

```json
{
  "@type": "ProfilePage",
  "@id": "https://thenitishkr.in/about/",
  "mainEntity": {
    "@id": "https://thenitishkr.in/#person"
  }
}
```

This makes search engines more confident the About page is the authoritative profile for this person.

---

## Organization Entity (Not Recommended)

The site does NOT appear to represent an organization. No "Organization" entity should be created unless the site becomes:
- A registered non-profit
- A research institute
- A company
- A publication house with multiple staff

**Phase 2 Action**: Do NOT add Organization entity for personal research site.

---

## Website Entity

### Current Status
Website entity exists in some pages

**Current ID**: May vary by page (should be unified)

**Phase 2 Action**: Ensure single unified Website entity:

```json
{
  "@type": "WebSite",
  "@id": "https://thenitishkr.in/#website",
  "name": "thenitishkr - Constitutional Accountability, Digital Governance, Cyber Evidence Research",
  "url": "https://thenitishkr.in/",
  "publisher": {
    "@id": "https://thenitishkr.in/#person"
  },
  "inLanguage": "en-IN"
}
```

---

## Breadcrumb & Navigation Entities

### Current Status
Breadcrumb schema present on all pages

**Phase 2 Action**: Verify:
- All canonical URLs in breadcrumbs match `<link rel="canonical">`
- All positions are correct (home=1, current=last)
- No orphaned pages in sitemap without breadcrumbs

---

## Entity Consistency Audit

### Across All Pages:

| Element | Consistency Check | Phase 2 Action |
|---------|---|---|
| **Author name** | "Nitish Kumar" — must always include "(thenitishkr)" on first mention | Audit all pages; standardize |
| **Person ID** | All pages should reference `https://thenitishkr.in/#person` | Verify consistency |
| **Profile image** | Single image file; consistent across pages | Audit; use one version |
| **Job title** | Keep consistent; don't vary substantially | Standardize across pages |
| **Description** | Keep similar; brief, factual | Audit; ensure similar across pages |
| **sameAs links** | Same list on all pages OR single authoritative list on About | Recommend unified list on About; reference from other pages |

---

## Phase 2 Entity Changes Summary

### Must Complete
1. ✅ Verify all sameAs links are live and accurate
2. ✅ Verify National Cyber Security Scholar credential and date
3. ✅ Verify current employment status and job titles
4. ✅ Ensure DISHA Origin page documents 2012 conception (or correct date)
5. ✅ Ensure Article 12 Infected concept is clearly author-originated
6. ✅ Ensure Digital Constitutional Personhood is labeled "author-proposed framework"

### Should Complete
1. Add ProfilePage schema to About page
2. Unify Website entity across all pages
3. Add missing sameAs links (Wikipedia, Goodreads if applicable)
4. Ensure all Wikidata links point to entity and have reciprocal links

### Can Complete Later
1. Create Wikipedia article for thenitishkr if appropriate
2. Create Goodreads author profile if books available there
3. Update Wikidata with newest publications

---

## Verification Checklist for Owner

- [ ] "Manager—Digital Transformation, EY" — still accurate and current? Date range?
- [ ] WhatsApp contact (+91-9142197135) — still preferred contact method?
- [ ] All sameAs links — still accurate and active?
- [ ] DISHA origin — 2012 as first conception date?
- [ ] Article 12 Infected — first published when? Author-originated concept confirmed?
- [ ] Digital Constitutional Personhood — author-proposed framework? First presented when? Current legal status (not enacted, not judicially recognized)?

