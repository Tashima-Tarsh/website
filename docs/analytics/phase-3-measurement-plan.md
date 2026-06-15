# Phase 3 — Measurement Plan

Generated: 2026-06-16 | Branch: `seo/phase-3-discovery-distribution`

---

## Current Analytics Stack

| System | Scope | Status |
|---|---|---|
| Google Analytics 4 (GA4) | `G-YJ314E1YHG` | Active on all pages |
| Ahrefs Analytics | `raXJnI4KDG8kEc2xtPYpYQ` | Active on all pages |
| Cloudflare Web Analytics | Not detected | Not installed |

---

## Privacy Baseline

| Requirement | Status |
|---|---|
| No fingerprinting | ✅ |
| No session replay | ✅ |
| No hidden ad pixels | ✅ |
| No cross-site profiling through custom code | ✅ |
| No victim-data tracking | ✅ |
| No personal document tracking | ✅ |
| No raw IP logging through custom code | ✅ |
| Consent not required (no PII collected) | ✅ |

---

## Recommended Custom Events

### Citation Events

| Event Name | Trigger | Parameters | Privacy Risk | Status |
|---|---|---|---|---|
| `citation_copy` | User clicks "Copy citation" | `page`, `citation_type` (plain/bib/ris) | Low | Not implemented |
| `citation_download` | User downloads citation file | `page`, `format` (bib/ris/txt) | Low | Not implemented |

### Dataset Events

| Event Name | Trigger | Parameters | Privacy Risk | Status |
|---|---|---|---|---|
| `dataset_download` | User downloads dataset | `dataset_id`, `format` | Low | No datasets exist yet |

### Research Engagement Events

| Event Name | Trigger | Parameters | Privacy Risk | Status |
|---|---|---|---|---|
| `case_file_open` | User navigates to intelligence case file | `case_number`, `case_title` | Low | Not implemented |
| `evidence_checklist_open` | User opens evidence checklist page | `page` | Low | Not implemented |
| `media_kit_download` | User downloads media resource | `asset_name` | Low | Not implemented |
| `source_document_open` | User opens linked source PDF | `source_name` | Low | Not implemented |
| `feed_subscription` | User navigates to RSS feed | — | Low | Not implemented |
| `book_link_click` | User clicks book link (Amazon, etc.) | `book_title`, `platform` | Low | Not implemented |

### Research Distribution Events

| Event Name | Trigger | Parameters | Privacy Risk | Status |
|---|---|---|---|---|
| `social_share` | User clicks share button (X, LinkedIn) | `platform`, `page` | Low | Not implemented |

---

## Event Taxonomy Rules

| Rule | Description |
|---|---|
| Canonical URL only | Use `page` parameter with canonical path, not full URL with query strings |
| No PII | Never include names, emails, phone numbers, identity numbers |
| No victim data | Never track evidence-specific identifiers or complaint numbers |
| No raw query strings | Strip search parameters from event data |
| Preview isolation | All events disabled on preview deployments |
| Consent-respecting | Events only fire if GA4 consent is active |

---

## Implementation Status

| System | Status | Notes |
|---|---|---|
| GA4 base pageview | ✅ Active | Via gtag.js snippet |
| Ahrefs analytics | ✅ Active | Via analytics.js snippet |
| Custom events | ⚠️ Not implemented | Planned but requires JS event handlers |
| Preview isolation | ⚠️ Depends on deploy | Preview should use separate GA4 property or disable events |

---

## Preview Behaviour

| Environment | GA4 | Ahrefs | Custom Events |
|---|---|---|---|
| Production (`thenitishkr.in`) | Active | Active | When implemented |
| Cloudflare Pages preview | Active (same property) | Active (same property) | Disabled |
| Local development | Manual only | Manual only | Disabled |

**Recommendation:** Use a separate GA4 measurement ID for preview builds to prevent preview data from polluting production analytics. Add to CI:

```yaml
env:
  GA_MEASUREMENT_ID: ${{ github.ref == 'refs/heads/main' && 'G-YJ314E1YHG' || '' }}
```

---

## Retention

| Data Type | Retention | Reason |
|---|---|---|
| GA4 standard data | 14 months (default) | Standard analytics |
| Ahrefs data | Per Ahrefs policy | Third-party |
| No custom data stored | N/A | No custom backend |

---

## Policy Update Requirements

Current privacy policy (`/privacy-policy/`) should be reviewed if custom events are added. No policy changes needed for this phase (no new tracking added).

---

## Owner Actions

| Action | Priority |
|---|---|
| Review GA4 dashboard for current traffic | Medium |
| Consider separate GA4 property for preview | Low |
| Approve custom event implementation | Low (no urgency) |
| Review Ahrefs analytics coverage | Low |