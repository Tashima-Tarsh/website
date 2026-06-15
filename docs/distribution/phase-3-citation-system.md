# Phase 3 — Citation System

Generated: 2026-06-16 | Branch: `seo/phase-3-discovery-distribution`

---

## Overview

10 priority research pages now include inline citation blocks with downloadable BibTeX, RIS, and plain-text citation files. A `CITATION.cff` file documents repository-level citation metadata.

---

## Pages with Citation Support

| Page | Slug | Formats |
|---|---|---|
| `/article-12/` | `article-12-digital-governance` | BibTeX, RIS, Plain text, Inline copy |
| `/digital-constitutional-personhood/` | `digital-constitutional-personhood` | BibTeX, RIS, Plain text, Inline copy |
| `/digital-constitutional-personhood/definition/` | `digital-constitutional-personhood-definition` | BibTeX, RIS, Plain text, Inline copy |
| `/disha/` | `disha-intelligence-architecture` | BibTeX, RIS, Plain text, Inline copy |
| `/disha/methodology/` | `disha-methodology` | BibTeX, RIS, Plain text, Inline copy |
| `/disha/validation/` | `disha-validation` | BibTeX, RIS, Plain text, Inline copy |
| `/disha/claim-to-source-system/` | `disha-claim-to-source` | BibTeX, RIS, Plain text, Inline copy |
| `/intelligence/` | `intelligence-archive` | BibTeX, RIS, Plain text, Inline copy |
| `/intelligence/meity-digital-governance/` | `intelligence-meity-digital-governance` | BibTeX, RIS, Plain text, Inline copy |
| `/books/` | `books` | BibTeX, RIS, Plain text, Inline copy |

---

## File Locations

```
/citations/
├── article-12-digital-governance.bib
├── article-12-digital-governance.ris
├── article-12-digital-governance.txt
├── digital-constitutional-personhood.bib
├── digital-constitutional-personhood.ris
├── digital-constitutional-personhood.txt
├── digital-constitutional-personhood-definition.bib
├── digital-constitutional-personhood-definition.ris
├── digital-constitutional-personhood-definition.txt
├── disha-intelligence-architecture.bib
├── disha-intelligence-architecture.ris
├── disha-intelligence-architecture.txt
├── disha-methodology.bib
├── disha-methodology.ris
├── disha-methodology.txt
├── disha-validation.bib
├── disha-validation.ris
├── disha-validation.txt
├── disha-claim-to-source.bib
├── disha-claim-to-source.ris
├── disha-claim-to-source.txt
├── intelligence-archive.bib
├── intelligence-archive.ris
├── intelligence-archive.txt
├── intelligence-meity-digital-governance.bib
├── intelligence-meity-digital-governance.ris
├── intelligence-meity-digital-governance.txt
├── books.bib
├── books.ris
└── books.txt
```

---

## Citation Format

### Plain Text
```
Nitish Kumar (@thenitishkr). "Article 12 and Digital Governance: How the Citizen Became Invisible." thenitishkr.in, 2026-06-14. https://thenitishkr.in/article-12/
```

### BibTeX
```bibtex
@misc{thenitishkr_article_12_digital_governance,
  author    = {Nitish Kumar},
  title     = {{Article 12 and Digital Governance: How the Citizen Became Invisible}},
  howpublished = {\url{https://thenitishkr.in/article-12/}},
  year      = {2026},
  month     = {jun},
  note      = {thenitishkr.in public-interest research archive. ORCID: https://orcid.org/0009-0004-6840-4463.}
}
```

### RIS
```
TY  - ELEC
AU  - Nitish Kumar
TI  - Article 12 and Digital Governance: How the Citizen Became Invisible
T2  - thenitishkr.in
PY  - 2026
DA  - 2026-06-14
UR  - https://thenitishkr.in/article-12/
PB  - thenitishkr.in
AB  - Article 12 research by Nitish Kumar: how public authorities grow...
N1  - Public-interest research archive. ORCID: https://orcid.org/0009-0004-6840-4463.
ER  -
```

---

## In-Page Citation Block

Each priority page includes a citation section before `</main>`:

```html
<section class="section citation-block" aria-labelledby="cite-heading">
  <p class="eyebrow">Cite this page</p>
  <h2 id="cite-heading">Research citation</h2>
  <pre class="citation-text">[CITATION TEXT]</pre>
  <div class="hero-actions">
    <button class="button secondary" type="button" data-copy-citation>Copy citation</button>
    <a class="button secondary" href="/citations/SLUG.bib" download>Download BibTeX</a>
    <a class="button secondary" href="/citations/SLUG.ris" download>Download RIS</a>
    <a class="button secondary" href="/citations/SLUG.txt" download>Download plain text</a>
  </div>
</section>
```

---

## Citation Accessibility

| Feature | Status |
|---|---|
| Keyboard-operable buttons | ✅ (standard `<button>` and `<a download>`) |
| Copy via Clipboard API | Pending (JS handler not yet added to `script.js`; downloads work as-is) |
| No third-party tracking | ✅ |
| Canonical URLs only | ✅ |
| No invented DOIs | ✅ |

---

## Validation

| Check | Status |
|---|---|
| BibTeX syntax valid | ✅ (standard `@misc` entry) |
| RIS syntax valid | ✅ (standard `TY - ELEC` record) |
| Author matches Person entity | ✅ (`Nitish Kumar` / `thenitishkr`) |
| Canonical URLs match pages | ✅ |
| No DOI invented | ✅ |
| No ISBN invented | ✅ (ISBNs on Books page are real) |
| Dates match page metadata | ✅ |
| File encoding | ✅ UTF-8 |

---

## Known Limitations

- Citation files are generated once and not automatically synced with page changes
- Copy-to-clipboard interaction not yet implemented in `script.js`
- Only 10 pages have citation support; others may be added in future