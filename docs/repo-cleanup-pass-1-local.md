# Full Repository Cleanup Pass 1 - Local Audit

Date: 2026-07-10
Scope: thenitishkr.in full repository and full static site.
Mode: local only. No live push.

## Executive Finding

The repository currently serves a static website, but the release pipeline is not pure manual static HTML. GitHub Actions uses Node scripts to:

- audit HTML, metadata, schema, accessibility structure and links;
- regenerate sitemap.xml, news-sitemap.xml, image-sitemap.xml, feed.xml and rss.xml;
- generate indexnow-payload.json;
- prepare the Cloudflare Pages release folder in dist/;
- verify live sitemap URLs after deployment;
- submit canonical URLs to IndexNow.

Therefore, deleting package.json, scripts/, ai-feeder-engine.js or the Node dependency today would break the current production workflow. The safe zero-debt path is phased:

1. Clean the served artifact immediately.
2. Stabilise the source tooling so it does not create bad machine output.
3. Replace the Node workflow only if the maintainer accepts a different manual release process.

## Current File Map

Approximate source tree excluding node_modules and dist:

- 82 HTML pages.
- 113 WebP images.
- 51 PNG images.
- 32 JPG images.
- 14 PDFs.
- 10 CSS files.
- 4 JavaScript files.
- 5 XML discovery files.
- 20 JSON files.
- 43 Markdown documentation/audit files.
- 13 .mjs automation scripts.

Release artifact after cleanup:

- static HTML pages;
- CSS and minimal JavaScript used by pages;
- images and fonts referenced by pages;
- PDF evidence files intentionally public;
- robots.txt, sitemap.xml, news-sitemap.xml, image-sitemap.xml, feed.xml, rss.xml;
- llms.txt, humans.txt, ai.txt, api.txt;
- _headers and _redirects;
- favicon, manifest files and citation files;
- required IndexNow key file at the configured key location.

## Cruft and Debt Register

### Safe to Exclude From Served Artifact Now

These are no longer copied into dist/:

- $null
  - Empty accidental file. No site function.
- _astro/
  - No current page references the generated Astro CSS files.
- final-push.bat
  - Old local deployment helper. Not a public site asset.
- cloudflare-audit.mjs and cloudflare-dns-audit.mjs
  - Maintenance scripts, not public assets.
- .lighthouseci/
  - Local/reporting cache. Not public.
- package.json and package-lock.json
  - Source workflow files only. Not public.
- node_modules/
  - Dependency cache. Never public.
- scripts/
  - Source release tooling. Never public.
- audit/
  - Private audit evidence. Not public.
- all Markdown files, including EVIDENCE-INVENTORY.md
  - Repository documentation, not rendered public site content.
- indexnow-key.txt
  - Duplicate key file. The configured IndexNow key location uses a0151dcfc802e79c4c6818a68dfd9fef.txt.

### Must Keep in Served Artifact

- a0151dcfc802e79c4c6818a68dfd9fef.txt
  - Required by IndexNow because indexnow-payload.json points to this keyLocation.
- _headers and _redirects
  - Required for Cloudflare security headers, caching rules, PDF behaviour, noindex routes and redirects.
- robots.txt, sitemap.xml, image-sitemap.xml, news-sitemap.xml, feed.xml, rss.xml
  - Search discovery layer.
- llms.txt, humans.txt, ai.txt, api.txt, api/publications.json and api/news.json
  - Machine-readable discovery and public metadata.
- assets/docs/*.pdf
  - Public evidence/documents intentionally linked from pages.

### Do Not Delete From Source Yet

- package.json, package-lock.json
  - Required by current GitHub Actions.
- scripts/
  - Required by audit, release, sitemap, live verification and IndexNow.
- ai-feeder-engine.js
  - Required by current release workflow for feed, sitemap and IndexNow payload generation.
- lighthouserc.json
  - Required by current quality workflow.
- .github/workflows/
  - Required to deploy and verify production.

Deleting these source files is a Phase 2 workflow migration, not a safe Phase 1 cleanup.

## Local Fixes Applied in This Pass

- scripts/prepare-release.mjs now excludes repository cruft from dist/.
- ai-feeder-engine.js now reads meta content safely when titles contain apostrophes.
- scripts/apply-schema-harness.mjs now avoids injecting duplicate article schema into pages that already have complete page-specific schema.

## Full-Site Local Validation

Commands run locally:

- npm run release
- npm run audit
- npm run validate:sitemap

Results:

- release artifact generated in dist/;
- audit passed for 82 pages;
- sitemap validation passed for 74 URLs;
- local home returned 200;
- local news article returned 200;
- local feed returned 200;
- local news sitemap returned 200.

## Proposed Final Clean Structure

```text
/
  index.html
  404.html
  410.html
  _headers
  _redirects
  robots.txt
  sitemap.xml
  image-sitemap.xml
  news-sitemap.xml
  feed.xml
  rss.xml
  llms.txt
  humans.txt
  ai.txt
  api.txt
  manifest.json
  site.webmanifest
  favicon.ico
  favicon.svg
  apple-touch-icon.png
  CITATION.cff
  styles.css
  editorial-preview.css
  case-live-professional.css
  framework-live-professional.css
  script.js
  /assets/
  /images/
  /api/
  /about/
  /article-12/
  /authors/
  /bibliography/
  /books/
  /citations/
  /contact/
  /corrections-policy/
  /digital-arrest-data-harm/
  /digital-constitutional-personhood/
  /disha/
  /editorial-policy/
  /editorial-standards/
  /fact-check/
  /intelligence/
  /news/
  /ownership-and-funding/
  /privacy-policy/
  /research-datasets/
  /sitemap/
  /start-here/
  /statement/
  /terms/
```

## Phase 2 Decision Needed

If the maintainer still wants the source repo to contain no Node tooling at all, the deployment model must change first. Options:

1. Manual static mode:
   - commit generated XML/feed files by hand;
   - remove GitHub Actions build steps;
   - deploy the repository root directly.
2. Minimal static-plus-validation mode:
   - keep Node only in CI for validation and generation;
   - keep the served artifact clean;
   - do not publish tooling.

Recommendation: keep option 2 for now. It is more reliable for search, feeds, sitemaps, noindex checks and IndexNow.
