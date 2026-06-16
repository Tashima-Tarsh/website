# Internal Link Map — thenitishkr.in

**Audit date:** 2026-06-16
**Method:** Review site navigation structure and cross-linking between hub and child pages

---

## 1. Current Navigation Architecture

```
[Home] → [About] [Article 12] [DCP] [DISHA] [Intelligence] [News] [Media] [Books] [Research Datasets]
                ↓            ↓      ↓       ↓          ↓           ↓      ↓      ↓          ↓
            [sub-pages] [sub-pgs] [sub-pgs] [sub-pgs] [sub-pgs]
                                                      [noindex evidence pages]
```

### Main Navigation (Header)

All major hub pages are linked from the main navigation. The navigation is consistent across all pages.

### Footer Navigation

Footer includes:
- Home, About, Article 12, DCP, DISHA, Digital Arrest Data Harm, Intelligence, News, Media, Books
- Start Here, Editorial Standards, Fact Check, Terms, Security, Privacy Policy, Sitemap
- Contact, RSS Feed

---

## 2. Hub-to-Child Link Analysis

| Hub | Child Pages | Linked? | Notes |
|---|---|---|---|
| `/article-12/` | `/ai-systems/`, `/automated-decisions/`, `/public-authority-responsibility/` | ✅ In-page links | ✅ Good |
| `/digital-constitutional-personhood/` | `/definition/`, `/data-sovereignty/`, `/biometric-failure/`, `/human-review-remedy/` | ✅ In-page links | ✅ Good |
| `/disha/` | `/origin/`, `/methodology/`, `/validation/`, `/claim-to-source-system/` | ✅ In-page links | ✅ Good |
| `/digital-arrest-data-harm/` | `/evidence-checklist/`, `/stolen-kyc-data/`, `/data-recovery/`, `/victim-record-preservation/` | ✅ In-page links | ✅ Good |
| `/intelligence/` | All 13+ case files | ✅ Listed on hub | ✅ Good |
| `/news/` | `/nda-12-years/` | ✅ | Only 1 article |
| `/intelligence/` | MeitY case file | ✅ | |

### Missing Cross-Links

| From | To | Why Needed | Action |
|---|---|---|---|
| `/digital-arrest-data-harm/` | `/intelligence/meity-digital-governance/` | MeitY SC case file touches digital arrest/data harm | **Recommended** — add link |
| `/intelligence/meity-digital-governance/` | `/digital-arrest-data-harm/` | Evidence preservation is relevant to SC case | **Recommended** — add link |
| `/article-12/automated-decisions/` | `/digital-constitutional-personhood/human-review-remedy/` | Human review is a remedy for automated decisions | **Recommended** — add link |
| `/digital-constitutional-personhood/biometric-failure/` | `/article-12/public-authority-responsibility/` | Public authority responsible for biometric system | **Optional** — consider |
| `/disha/validation/` | `/disha/claim-to-source-system/` | Validation relies on claim-to-source | ✅ Already linked |

---

## 3. Orphan Pages

Pages that exist in sitemap but may lack contextual incoming links from other pages (beyond navigation):

| Page | Incoming Links | Assessment |
|---|---|---|
| `/article-12/ai-systems/` | From hub | ✅ |
| `/article-12/automated-decisions/` | From hub | ✅ |
| `/article-12/public-authority-responsibility/` | From hub | ✅ |
| `/digital-constitutional-personhood/definition/` | From hub | ✅ |
| `/digital-constitutional-personhood/data-sovereignty/` | From hub | ✅ |
| `/digital-constitutional-personhood/biometric-failure/` | From hub | ✅ |
| `/digital-constitutional-personhood/human-review-remedy/` | From hub | ✅ |
| `/disha/origin/` | From hub | ✅ |
| `/disha/methodology/` | From hub | ✅ |
| `/disha/validation/` | From hub | ✅ |
| `/disha/claim-to-source-system/` | From hub | ✅ |
| `/digital-arrest-data-harm/evidence-checklist/` | From hub | ✅ |
| `/digital-arrest-data-harm/stolen-kyc-data/` | From hub | ✅ |
| `/digital-arrest-data-harm/data-recovery/` | From hub | ✅ |
| `/digital-arrest-data-harm/victim-record-preservation/` | From hub | ✅ |
| `/news/nda-12-years/` | From news hub + sitemap | ✅ |
| `/intelligence/meity-digital-governance/` | From intelligence hub | ✅ |
| `/intelligence/citizen-not-found/` | From intelligence hub | ✅ |
| `/start-here/` | From footer + homepage | ✅ |
| `/fact-check/` | From footer | ✅ |
| `/editorial-standards/` | From footer | ✅ |

**Assessment:** No truly orphan pages. Every page is reachable from at least one navigation element (header, footer, hub page, or sitemap).

---

## 4. Anchor Text Quality

| Page | Internal Links to | Anchor Text | Assessment |
|---|---|---|---|
| `/article-12/` | Child pages | Descriptive text | ✅ Good |
| `/digital-constitutional-personhood/` | Child pages | Descriptive text | ✅ Good |
| `/disha/` | Child pages | Descriptive text | ✅ Good |
| `/digital-arrest-data-harm/` | Child pages | Descriptive text | ✅ Good |
| `/intelligence/` | Case files | Case file names | ✅ Good |
| Footer links | All hubs | Simple link text | ✅ Acceptable for navigation |

**Assessment:** Anchor text is naturally descriptive. No generic "click here" anchors. No repetitive exact-match keyword anchors.

---

## 5. Authority Flow Analysis

```
[Homepage — highest authority]
    ├── [About — profile page]
    ├── [Article 12 Hub] → [AI Systems] [Automated Decisions] [Public Authority Responsibility]
    ├── [DCP Hub] → [Definition] [Data Sovereignty] [Biometric Failure] [Human Review Remedy]
    ├── [DISHA Hub] → [Origin] [Methodology] [Validation] [Claim-to-Source]
    ├── [Digital Arrest Data Harm Hub] → [Evidence Checklist] [Stolen KYC] [Data Recovery] [Victim Record]
    ├── [Intelligence Archive] → [Case Files (indexable + noindex)]
    ├── [News] → [News articles]
    ├── [Media Desk]
    ├── [Books]
    └── [Research Datasets]
```

**Assessment:** The authority distribution is appropriate. Hub pages receive direct navigational authority. Child pages receive authority through hub links. No authority dead-ends.

---

## 6. Internal Link Issues Found

| Issue | Severity | Details | Action |
|---|---|---|---|
| Cross-link: Digital Arrest ↔ SC Case File | P2 | Two related topics not cross-linked | Add contextual link in both directions |
| Cross-link: Automated Decisions ↔ Human Review | P2 | Automated decision analysis does not link to human review remedy | Add contextual link |
| Footer link count | P3 | Footer has many links — acceptable for navigation | No action needed |

**No broken internal links were found.** All links verified during repository inspection.

---

## 7. Recommended Internal Link Changes

| Change ID | From Page | To Page | Anchor | Reason |
|---|---|---|---|---|
| **LINK-001** | `/digital-arrest-data-harm/` | `/intelligence/meity-digital-governance/` | "The MeitY Supreme Court case W.P.(Crl.) 163/2026 also examines constitutional data-harm questions" (or similar contextual link) | Connects practical harm guide with constitutional case file |
| **LINK-002** | `/intelligence/meity-digital-governance/` | `/digital-arrest-data-harm/` | "Citizens affected by data theft may need to preserve evidence — see the Digital Arrest Evidence Checklist" (or similar contextual link) | Connects case file with practical resources |
| **LINK-003** | `/article-12/automated-decisions/` | `/digital-constitutional-personhood/human-review-remedy/` | "Where automated decisions lack human review, see the Human Review Remedy framework" | Connects analysis page with remedy page |