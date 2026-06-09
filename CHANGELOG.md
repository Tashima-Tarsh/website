# Change Log

## Local evidence trust upgrade - 2026-06-09

- Created local branch `evidence-trust-upgrade`.
- Added initial `EVIDENCE-INVENTORY.md` for public PDF evidence files.
- Added repository documentation: `README.md`, `SECURITY.md`, `CONTRIBUTING.md`.
- Added `/start-here/` and `/fact-check/` local pages.
- Added reusable evidence-status, source-register, page-version and accessibility CSS.
- Cleaned `robots.txt` to standard sitemap directives.
- Corrected the DISHA page to separate the 25 April 2012 foundation sketch from the 2013 Bihar Council institutional record.
- Replaced broad DISHA implementation labels with narrower status language: implemented research component, documented architecture, and policy-gated capability.
- Replaced `DISHA OS - Top Confidential` with `Restricted technical repository.`
- Added Bihar Council record metadata on the DISHA page: date, issuer/custodian, reference number, and limited evidentiary meaning.
- Added DISHA foundation and Bihar Council documentary image records to `EVIDENCE-INVENTORY.md`.

## Manual verification still required

- Complete case-by-case inventory of every HTML source link.
- Populate exact source-register tables on all 13 intelligence case pages after page/paragraph-level source verification.
- Verify issuing authority, dates, reference numbers and evidentiary meaning for each PDF where metadata is not visible in the repository.
- Review sensitive personal-data exposure before each public PDF or asset is published.
- Update GitHub repository description, website and topics manually in GitHub Settings.

## Verification notes

- `EVIDENCE-INVENTORY.md` is expanded but not final. The remaining court, RTI, CAG, CPGRAMS, PMO, ministry, audit, letter and email records require source-by-source metadata confirmation before the changelog can mark them complete.
- Exact source-register tables must not be invented from page summaries; each row needs a visible source, date, issuer/custodian, reference number if available, and limited evidentiary meaning.
- Local sitemap XML parsed successfully and includes the core public pages plus all 13 intelligence case URLs.
- Local canonical tags are present and use trailing-slash production URLs.
- Live `robots.txt` and `sitemap.xml` return HTTP 200.
- Live response headers include `X-Content-Type-Options: nosniff` and `Referrer-Policy: strict-origin-when-cross-origin`; HSTS and explicit frame-protection headers are still not present in the live Cloudflare response.
- Local text privacy keyword scan was rerun across public text/code files. It found policy/disclaimer references to sensitive terms, not newly exposed secrets in the changed files. Public PDFs still require document-level redaction review before they can be certified clean.
