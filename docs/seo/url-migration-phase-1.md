# Phase 1 URL Migration and Canonical Review

Branch: `seo/phase-1-site-architecture`  
Production domain: `https://thenitishkr.in`  
Review status: Draft for owner approval. Do not merge without review.

## Repository and live-site findings

The repository is a static public-interest research archive. Existing strong routes already cover several target hubs and should not be migrated merely to satisfy a longer directory pattern.

Live production checks performed on 2026-06-16:

- `/` returns the research archive homepage with primary navigation to Article 12, Digital Constitutional Personhood, DISHA, Intelligence, Media, News, Books and About.
- `/article-12/` is an existing content-rich Article 12 accountability page.
- `/digital-constitutional-personhood/` is an existing content-rich framework page.
- `/disha/` is an existing content-rich DISHA architecture and origin page.
- `/intelligence/` is an existing case-file archive.
- Existing `_redirects` already maps `.html` legacy routes and several older shorthand routes to trailing-slash canonicals.
- Existing `sitemap.xml` currently includes PDFs and uses `changefreq` / `priority`; Phase 1 replaces this with a canonical indexable-page sitemap only.
- `robots.txt` already advertises `https://thenitishkr.in/sitemap.xml`.
- Repository preview process is documented in `README.md`: branch + PR + Cloudflare preview, using repository variables and secret (`CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_PAGES_PROJECT`, `CLOUDFLARE_API_TOKEN`).

## Canonical decision table

| Target subject | Existing URL | Existing content quality | Existing backlinks/internal links | Recommended canonical URL | Redirect required | Content merge required | Indexability |
|---|---|---:|---|---|---|---|---|
| Home | `/` | Strong | Primary entry point | `/` | No | Preserve | Index |
| About Nitish Kumar | `/about/` | Strong author/entity page | Footer and homepage links | `/about/` | Legacy aliases already redirect | Preserve | Index |
| Article 12 and Digital Governance | `/article-12/` | Strong | Primary nav, homepage, footer | `/article-12/` | `/article-12-digital-governance/` -> `/article-12/` | Add child links | Index |
| Article 12 and AI Systems | none found | Missing child page | none | `/article-12/ai-systems/` | Preferred long path redirects here | New page from Article 12 + DCP material | Index |
| Automated Decisions | none found | Missing child page | none | `/article-12/automated-decisions/` | Preferred long path redirects here | New page from existing Article 12/DCP material | Index |
| Public Authority Responsibility | none found | Missing child page | none | `/article-12/public-authority-responsibility/` | Preferred long path redirects here | New page from existing Article 12 material | Index |
| Digital Constitutional Personhood | `/digital-constitutional-personhood/` | Strong | Primary nav, homepage, footer | `/digital-constitutional-personhood/` | No | Add child links | Index |
| Definition | material exists in hub | Strong paragraph material | hub links | `/digital-constitutional-personhood/definition/` | No | Extract carefully | Index |
| Data Sovereignty | material exists in hub | Strong paragraph material | hub links | `/digital-constitutional-personhood/data-sovereignty/` | No | Extract carefully | Index |
| Biometric Failure | material exists in hub | Moderate | hub links | `/digital-constitutional-personhood/biometric-failure/` | No | Extract carefully | Index |
| Human Review and Remedy | material exists in hub | Strong | hub links | `/digital-constitutional-personhood/human-review-remedy/` | No | Extract carefully | Index |
| DISHA | `/disha/` | Strong | Primary nav, homepage, footer | `/disha/` | No | Add child links | Index |
| DISHA Origin | material exists in hub | Strong | hub links | `/disha/origin/` | No | Extract from origin sections | Index |
| DISHA Methodology | material exists in hub | Strong | hub links | `/disha/methodology/` | No | Extract from operating-stack/evidence-flow sections | Index |
| DISHA Validation | material exists in hub | Moderate; limitations needed | hub links | `/disha/validation/` | No | Explain evidence limits | Index |
| Claim-to-Source System | material exists in hub + evidence inventory | Moderate | hub and docs | `/disha/claim-to-source-system/` | No | Explain source discipline | Index |
| Digital Arrest and Data Harm | material exists under `/intelligence/meity-digital-governance/` and PDFs | Strong but not a hub | case-file links | `/digital-arrest-data-harm/` | No | Create hub, link case record | Index |
| Evidence Checklist | source material exists | Moderate | new hub | `/digital-arrest-data-harm/evidence-checklist/` | No | Create practical checklist | Index |
| Stolen KYC Data | source material exists | Moderate | new hub | `/digital-arrest-data-harm/stolen-kyc-data/` | No | Careful, no invented claims | Index |
| Data Recovery | source material exists | Moderate | new hub | `/digital-arrest-data-harm/data-recovery/` | No | Explain question, not outcome | Index |
| Victim Record Preservation | source material exists | Moderate | new hub | `/digital-arrest-data-harm/victim-record-preservation/` | No | Create evidence-led page | Index |
| Intelligence Case Files | `/intelligence/` | Strong | Primary nav, homepage, footer | `/intelligence/` | Existing legacy redirects | Preserve | Index |
| Research Datasets | none | Evidence inventory exists; no formal dataset hub | sitemap/footer after Phase 1 | `/research-datasets/` | No | Create source-index hub using existing evidence inventory | Index |
| News and Analysis | `/news/` | Existing | nav/footer | `/news/` | No | Preserve | Index |
| Media Desk | `/media/` | Existing | nav/footer | `/media/` | No | Preserve | Index |
| Books | `/books/` | Existing | nav/footer | `/books/` | No | Preserve | Index |
| Human sitemap | footer link implied | Missing/unclear | footer | `/sitemap/` | `/sitemap.html` if ever used | Create editorial sitemap | Index |

## Redirects added in Phase 1

These redirects avoid duplicate architecture routes while preserving the stronger existing canonical URLs.

| Existing or proposed URL | New canonical URL | Status | Reason |
|---|---|---:|---|
| `/article-12-digital-governance/` | `/article-12/` | 301 | Existing `/article-12/` is established and content-rich. |
| `/article-12-digital-governance/article-12-ai-systems/` | `/article-12/ai-systems/` | 301 | Keep children under established Article 12 hub. |
| `/article-12-digital-governance/automated-decisions/` | `/article-12/automated-decisions/` | 301 | Keep children under established Article 12 hub. |
| `/article-12-digital-governance/public-authority-responsibility/` | `/article-12/public-authority-responsibility/` | 301 | Keep children under established Article 12 hub. |
| `/digital-arrest/` | `/digital-arrest-data-harm/` | 301 | Clearer canonical hub. |
| `/digital-arrest-data-harm.html` | `/digital-arrest-data-harm/` | 301 | Remove legacy file extension. |
| `/datasets/` | `/research-datasets/` | 301 | Use explicit research-datasets label. |
| `/sitemap.html` | `/sitemap/` | 301 | Human-readable sitemap canonical. |

## Sitemap status

- XML sitemap should contain only canonical, indexable, published HTML pages.
- PDFs are intentionally removed from `sitemap.xml`; they remain linked from relevant pages and evidence inventory.
- `news-sitemap.xml`, RSS, feeds and JSON endpoints remain separate discovery surfaces and are not mixed into the canonical XML sitemap.

## Owner-review items

- Confirm whether `/article-12/` should remain the permanent canonical for the Article 12 hub. Recommendation: yes.
- Confirm whether all new child pages should be production-indexable. Recommendation: yes for Phase 1 because each is derived from existing published material and avoids new factual allegations.
- Confirm whether Research Datasets should later become a formal data catalogue with downloadable CSV/JSON files. Phase 1 treats it as a source-and-evidence register, not a new dataset claim.
- Confirm whether Cloudflare preview URL is generated automatically after Draft PR creation; the repository currently documents that process but external Cloudflare credentials are not visible to this environment.
