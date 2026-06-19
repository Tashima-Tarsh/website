# Phase 3 — Dataset Publication Guide

Generated: 2026-06-16 | Branch: `seo/phase-3-discovery-distribution`

---

## Candidate Inventory

All files and pages described as "datasets," "source registers," "evidence inventory," or "records" were inspected.

| Candidate | Location | Classification | Reasoning |
|---|---|---|---|
| Research Source Register | `/research-datasets/` | **Research Source Register** | Lists source files, not structured data |
| EVIDENCE-INVENTORY.md | `/EVIDENCE-INVENTORY.md` | **Evidence Inventory** | Working register of mapped source files |
| DISHA Whitepaper PDF | `/assets/docs/disha-whitepaper...pdf` | **Document Collection** | PDF research document |
| Redacted Writ Petition | `/assets/docs/WRIT_P_CRL_163_2026_REDACTED.pdf` | **Document Collection** | Redacted court record |
| Digital Arrest Root-Cause | `/assets/docs/Digital_Arrest_root_cause_REDACTED.pdf` | **Document Collection** | Redacted research document |
| Forensic Intelligence Report | `/assets/docs/forensic-intelligence-report.pdf` | **Document Collection** | Research document |
| media-coverage.json | `/media-coverage.json` | **Document Collection** | Media coverage metadata |
| indexnow-payload.json | `/indexnow-payload.json` | **Not a dataset** | IndexNow submission payload |
| rss.xml / feed.xml | `/feed.xml` | **Not a dataset** | Publication feed |

---

## Classification Summary

| Category | Count | Items |
|---|---|---|
| Genuine structured datasets (CSV/JSON with data dictionary) | **0** | None found |
| Research source registers | 1 | `/research-datasets/` |
| Evidence inventories | 1 | `EVIDENCE-INVENTORY.md` |
| Document collections (PDFs) | 4 | Whitepaper, writ petition, root-cause, forensic report |
| Not datasets | 3 | IndexNow payload, feeds, media coverage JSON |

---

## Recommended Actions

### Short Term (Already Done)
- ✅ Page renamed from "Research Datasets" to "Research Source Register and Evidence Inventory"
- ✅ Lead text clarifies: "not machine-readable CSV or JSON datasets"
- ✅ No fake datasets created

### Medium Term (Owner Decision Required)
- If genuine datasets are created (e.g., structured case index, authority-responsibility matrix, RTI response statistics), follow the dataset publication template below
- Consider extracting structured data from existing research into CSV/JSON formats with proper documentation

### Long Term (Owner Decision Required)
- Zenodo/OSF deposit for any approved genuine datasets
- DOI creation via repository deposit (not invented)

---

## Genuine Dataset Publication Template

If a genuine dataset is created in future, it should include:

```
dataset-name/
├── README.md           — Title, creator, description, purpose, scope
├── data.csv            — Primary data file
├── data.json           — Alternative machine-readable format
├── data-dictionary.md  — Every column/field defined
├── methodology.md      — How data was collected and processed
├── LICENSE             — Rights statement
├── CITATION.cff        — Dataset-level citation
├── CHANGELOG.md        — Version history
├── checksums.txt       — SHA-256 of each file
```

### Required Fields Per Record
- Title
- Creator (Nitish Kumar / thenitishkr)
- Description
- Purpose
- Geographic scope (India)
- Time coverage
- Version
- Publication date
- Revision date
- Data format
- Data dictionary
- Methodology
- Source methodology
- Known limitations
- Licence status
- Citation
- Privacy review
- Checksum
- Download route
- Related research pages

### Privacy Checklist (Before Publishing Any Dataset)
- [ ] No private victim names
- [ ] No phone numbers
- [ ] No bank details / UPI IDs
- [ ] No email addresses
- [ ] No physical addresses
- [ ] No identity numbers (Aadhaar, PAN, etc.)
- [ ] No biometric details
- [ ] No device IDs
- [ ] No private complaint identifiers
- [ ] No personal metadata
- [ ] No unpublished evidence
- [ ] No internal editorial notes
- [ ] Redactions applied where needed
- [ ] Aggregation applied where needed
- [ ] Privacy review completed and documented
- [ ] Owner approval obtained

---

## Licensing Notes

Current repository materials include:
- **Author-created research** — Owned by Nitish Kumar (thenitishkr)
- **Government public data** — May be subject to Indian government copyright or public-record rules
- **Court document metadata** — Public record; check specific court rules
- **Media-derived facts** — Attributable to source publications

**Current status:** All Rights Reserved. No open licence applied to any dataset or document.

**Owner decision required:** Whether to apply a Creative Commons or other licence to author-created research materials.

---

## Checksums

No checksums generated — no stable public-release datasets exist yet. When genuine datasets are published, SHA-256 checksums should be generated and included in the release package.