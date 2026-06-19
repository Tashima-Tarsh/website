# Entity Audit — thenitishkr.in

**Audit date:** 2026-06-16
**Method:** Cross-reference Person entity across all pages, structured data, citation files, external identifiers

---

## 1. Primary Person Entity

| Property | Value | Sources |
|---|---|---|
| **Name** | Nitish Kumar | All pages |
| **Alias** | thenitishkr | All pages, homepage, canonical URLs |
| **@id** | `https://thenitishkr.in/#nitish-kumar-thenitishkr` | JSON-LD on every page with Person schema |
| **Description** | "Independent researcher, constitutional accountability, digital governance" | About page, homepage |
| **ORCID** | `https://orcid.org/0009-0004-6840-4463` | About page, API, all pages |
| **Wikidata** | `https://www.wikidata.org/wiki/Q130765113` | Homepage JSON-LD + visible link |
| **X (Twitter)** | `@thenitishkr` | About page, all OG tags |
| **GitHub** | `Tashima-Tarsh` | About page |
| **LinkedIn** | `https://linkedin.com/in/thenitishkr` | About page |
| **Substack** | `@thenitishkr` | About page |
| **Email** | `nitish@thenitishkr.in` | About page, JSON-LD |

---

## 2. Entity Consistency Check

### Person Schema Consistency Across Pages

| Page | Person `@id` | Name | ORCID | Wikidata | JobTitle | Status |
|---|---|---|---|---|---|---|
| Home | ✅ | ✅ | ✅ | ✅ | ✅ "Independent researcher, constitutional accountability, digital governance" | ✅ |
| About | ✅ | ✅ | ✅ | ✅ | ✅ "Independent researcher | Manager — Digital Transformation, EY" | ✅ (JobTitle includes both research and employment) |
| Article 12 | ✅ | ✅ | ✅ | ✅ | ✅ "Independent researcher, constitutional accountability, digital governance" | ✅ |
| DCP | ✅ | ✅ | ✅ | ✅ | ✅ "Independent researcher, constitutional accountability, digital governance" | ✅ |
| DISHA | ✅ | ✅ | ✅ | ✅ | ✅ "Independent researcher, constitutional accountability, digital governance" | ✅ |
| Intelligence | ✅ | ✅ | ✅ | ✅ | ✅ "Independent researcher, constitutional accountability, digital governance" | ✅ |
| DISHA Validation | ✅ | ✅ | ✅ | ✅ | ✅ "Independent researcher, constitutional accountability, digital governance" | ✅ |
| Evidence Checklist | ✅ | ✅ | ✅ | ✅ | ✅ "Independent researcher, constitutional accountability, digital governance" | ✅ |

**Assessment:** Person entity is highly consistent across all major pages. Same `@id`, same author reference, same identifier links.

### JobTitle — Potential Issue

The **About page** JobTitle differs from all other pages:

- **All other pages:** `"Independent researcher, constitutional accountability, digital governance"`
- **About page:** `"Independent researcher | Manager — Digital Transformation, EY"`

The About page is the most authoritative profile page. Including the EY role in the Person schema may cause Google to associate the Person entity with EY as an affiliation. This is not inherently wrong (the About page is transparent about current and past employment), but it creates an inconsistency:

- Google may treat "Independent researcher" as the primary identity (more pages use this)
- But the About page schema includes EY, which may surface the EY association

**Recommendation:** If this is a public-interest research archive that is independent of any employer, consider either:
1. Removing the EY role from the Person schema (keep visible in the narrative text on About page — Google will still understand it from visible page content)
2. Or keeping it if the EY association is intentionally part of the public research identity

The task instructions say: **"Do not invent titles, qualifications or affiliations."** The EY role is real and verifiable. The question is whether it should be in structured data.

---

## 3. Organization Entity

| Property | Value |
|---|---|
| **@type** | Organization |
| **name** | "thenitishkr — Public Interest Research" |
| **url** | `https://thenitishkr.in` |
| **foundingDate** | 2013 |
| **foundingLocation** | India |
| **logo** | `/apple-touch-icon.png` |
| **sameAs** | X, LinkedIn, GitHub, Substack, ORCID, Wikidata |
| **founder** | Nitish Kumar |

**Risk:** This Organization schema represents "thenitishkr — Public Interest Research" as a formal entity. However:
- There is no registered legal entity named "thenitishkr — Public Interest Research"
- The site is a personal research archive
- The Organization type may confuse search engines into treating the site as an institutional entity with institutional authority

**Recommendation:** Either:
1. Remove the Organization schema (keep the site as a personal research archive)
2. Or add a `"nonprofitStatus"` property with `Nonprofit501c3` equivalent for India (if applicable)
3. Or change to `WebSite` type with `author` pointing to Person

---

## 4. Book Entities

| Book | ISBN | Status |
|---|---|---|
| **Era of Stupidity: Citizen Not Found** | 978-93-5250-000-6 | ✅ Two entries in Books DB + Wikidata |
| **Sleeping Guardian: India Lost Justice** | 978-93-5250-000-6 | ⚠️ Same ISBN as Era of Stupidity (confirmed in GitHub issues: both books share ISBN due to publisher error) |

**Issue:** Both books share the same ISBN `978-93-5250-000-6`. This is a known real-world issue documented in the GitHub repository. However, schema consumers may treat this as an error because ISBNs are expected to be unique per publication.

**Recommendation:** Document this known ISBN issue in the structured data text on the Books page to pre-empt validation errors. Do not fabricate alternate ISBNs.

---

## 5. Framework/Concept Entities (Terms Coined by Site)

| Entity | First Page | Existing Page | Wikidata? | Notes |
|---|---|---|---|---|
| **Digital Constitutional Personhood** | `/digital-constitutional-personhood/` | ✅ | Not verified | Search: "Digital Constitutional Personhood" — if entity is in Wikidata, should link |
| **DISHA Intelligence Architecture** | `/disha/` | ✅ | Not verified | Search: "DISHA Intelligence Architecture" — should be Wikidata entity |
| **Article 12 Infected** | `/article-12/` | ✅ | Not verified | Site-created term; may not be in external KBs |
| **Claim-to-Source System** | `/disha/claim-to-source-system/` | ✅ | Not verified | Methodology entity |
| **Citizen Not Found** | `/intelligence/citizen-not-found/` | ✅ | Not verified | Book title + intelligence case file concept |

**Recommendation:** Verify whether these entities exist in Wikidata. If not, consider creating Wikidata entries for:
1. Digital Constitutional Personhood (Q-prefixed entity)
2. DISHA Intelligence Architecture (Q-prefixed entity)
3. Thenitishkr as a researcher (already exists: Q130765113)

---

## 6. External Entity Consistency

| Platform | URL | Status |
|---|---|---|
| Wikidata | `https://www.wikidata.org/wiki/Q130765113` | ✅ Linked in homepage JSON-LD + visible text link |
| ORCID | `https://orcid.org/0009-0004-6840-4463` | ✅ Linked in all pages JSON-LD |
| Country book entry on Wikidata? | Unknown | Owner to check if "Era of Stupidity" has Wikidata entry |
| Google Knowledge Graph | Unknown | Search: `Nitish Kumar` + `thenitishkr` — check if Knowledge Panel shows researcher or politician |

---

## 7. Entity Disambiguation Risk

| Risk | Detail |
|---|---|
| **Politician confusion** | "Nitish Kumar" is also the name of the current Chief Minister of Bihar (Nitish Kumar, born 1951). This is a highly prominent political figure. Search results for "Nitish Kumar" without disambiguation may surface the CM. |
| **Existing mitigation** | Site uses "thenitishkr" as distinct alias; About page header says "Independent researcher, constitutional accountability, digital governance — not the politician"; ORCID and Wikidata IDs differentiate |
| **Remaining risk** | Google may still associate the name with the politician. Knowledge Panels may not differentiate. |
| **Action** | Monitor Google Knowledge Graph for the researcher. If a Knowledge Panel shows only the politician's information, consider Wikipedia or other authoritative entity-building signals (but per instructions: do not create fake profiles). |

---

## 8. Entity Consistency Issues

| Issue | Severity | Action |
|---|---|---|
| Person JobTitle inconsistency (researcher vs EY Manager) | P2 — Minor | Owner to decide: keep both in schema or use consistent "Independent researcher" only |
| Organization schema on Home | P1 — Medium | Remove or properly describe — personal archive, not a legal entity |
| Books share ISBN | P2 — Minor | Document on Books page |
| Wikidata entries for frameworks | P1 — Medium | Consider creating Wikidata entries for owned concepts |
| Politician disambiguation | P1 — Medium | Monitor Google Knowledge Graph |

---

## 9. Recommended Entity Changes

| ID | Change | Risk | Owner Approval |
|---|---|---|---|
| **ENTITY-001** | Remove Organization schema from Homepage JSON-LD (keep as WebSite + Person authored by) | Low — prevents misleading entity classification | Required |
| **ENTITY-002** | Verify Wikidata entries for Digital Constitutional Personhood and DISHA Intelligence Architecture | Low — improves entity recognition in knowledge bases | Required |
| **ENTITY-003** | Document shared ISBN on Books page in visible text | Low — pre-empts validation concerns | Required |
| **ENTITY-004** | Monitor Knowledge Graph — if researcher not identified, consider path to Google Knowledge Panel recognition (legitimate, not fabricated) | Medium — requires legitimate criteria | Required |