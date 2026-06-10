# Contributing

Contributions must preserve legal precision, source citation and privacy.

## Pull requests

Do not push content changes directly to `main`. Create a branch and open a pull request. The pull request must pass the site quality gate and should be reviewed through its isolated Cloudflare preview before merge.

Run these checks locally:

```bash
npm run signals
npm run audit
npm run release
```

Generated discovery files (`sitemap.xml`, `news-sitemap.xml`, `feed.xml`, `rss.xml`, and `indexnow-payload.json`) should remain committed so reviewers can inspect search-distribution changes.

## Source citation

Consequential factual statements should identify the issuing authority, document title, reference number, date, relevant page or paragraph, and direct source link where available.

## Evidence status

Separate official records, corroborated records, documented allegations, DISHA assessments, unresolved questions, judicial findings and commentary.

## Privacy

Do not publish passwords, private identifiers, unredacted signatures, protected addresses, biometric identifiers, bank details or third-party personal records unless clearly public and necessary. Prefer redacted copies with redaction notes.

## Legal precision

Do not describe a procedural court order as final adjudication unless the order expressly says so. Do not invent dates, amounts, holdings, reference numbers or source URLs.
