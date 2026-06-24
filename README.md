# thenitishkr.in

Public-interest research and evidence archive documenting DISHA, cyber evidence, government records, constitutional accountability, court filings and case-wise source material.

## Live site

https://thenitishkr.in/

## Evidence policy

The repository separates official records, documented allegations, DISHA assessments, unresolved questions and judicial findings. A procedural court direction must not be described as final judicial confirmation unless the order expressly says so.

## Structure

- `/disha/`
- `/intelligence/`
- `/article-12/`
- `/editorial-standards/`
- `/start-here/`
- `/fact-check/`

## Local preview

Serve this static folder with any local static server, for example:

```bash
python -m http.server 8099
```

## Publishing cycle

Production changes use a pull-request-only cycle:

1. Create a branch from `main`.
2. Make the content or design change.
3. Run `npm run signals`, `npm run audit`, and `npm run release`.
4. Open a pull request.
5. Review the automatic Cloudflare preview on desktop and mobile.
6. Merge only after the `Site quality gate` passes.
7. The production workflow deploys the merged commit, verifies every sitemap URL, and submits canonical URLs to IndexNow.

The quality gate checks titles, descriptions, H1 structure, canonicals, Open Graph/X cards, JSON-LD, internal links, image alt text, image weight, sitemap membership, release-file privacy, Lighthouse SEO and accessibility.

Google discovers production updates through `sitemap.xml`, internal links and canonical URLs. IndexNow accelerates discovery for Bing and compatible engines; it does not replace normal Google crawling.

## Repository configuration

GitHub Actions requires:

- Repository variable `CLOUDFLARE_ACCOUNT_ID`
- Repository variable `CLOUDFLARE_PAGES_PROJECT`
- Repository secret `CLOUDFLARE_API_TOKEN`

The Cloudflare token should be limited to Pages deployment for the relevant account. Never commit it to the repository.

## Corrections

Corrections, clarifications and documentary responses should be reviewed against the source record and published with a dated correction note where appropriate.

## Security and privacy

Do not publish passwords, credentials, private personal data, Aadhaar numbers, unredacted signatures, protected addresses or security-sensitive implementation details.
