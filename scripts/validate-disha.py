import re

content = open('d:\\website\\disha\\index.html', 'r', encoding='utf-8').read()

print('=== VALIDATION REPORT ===')
print()

# H1 count
h1s = re.findall(r'<h1[^>]*>', content)
print(f'H1 count: {len(h1s)}')

# Heading structure
h_levels = re.findall(r'<(h[1-6])[^>]*>', content)
from collections import Counter
h_counts = Counter(h_levels)
for level in ['h1','h2','h3','h4','h5','h6']:
    print(f'  {level}: {h_counts.get(level, 0)}')

# Foundation image usage
foundation_refs = content.count('disha-foundation.webp')
print(f'\nFoundation image references: {foundation_refs}')
if foundation_refs > 1:
    print('  WARNING: Foundation image used more than once')

# JSON-LD
ldjson_blocks = content.count('application/ld+json')
print(f'JSON-LD blocks: {ldjson_blocks}')
if ldjson_blocks != 1:
    print('  WARNING: Should be exactly 1 JSON-LD block')

# Required sections
required = [
    'what-is-disha', 'origin', 'bihar-council-record', 'timeline',
    'evidence-chain', 'cognitive-engine', 'architecture', 'yudh-vyuha',
    'no-first-use', 'user-brain', 'constitutional-intelligence', 'nyaya',
    'setu-varuna', 'sovereign-resilience', 'memory-learning', 'methodology',
    'claim-to-source', 'validation', 'research-lineage', 'public-protected',
    'system-map', 'faq'
]
print('\nRequired sections:')
for r in required:
    status = 'OK' if r in content else 'MISSING'
    print(f'  [{status}] {r}')

# Canonical
canonical = re.search(r'canonical[^>]+href="([^"]+)"', content)
print(f'\nCanonical: {canonical.group(1) if canonical else "NOT FOUND"}')

# Title tag
title = re.search(r'<title>([^<]+)</title>', content)
print(f'Title: {title.group(1) if title else "NOT FOUND"}')

# Meta description
meta_desc = re.search(r'<meta name="description"[^>]+content="([^"]+)"', content)
desc_text = meta_desc.group(1) if meta_desc else "NOT FOUND"
print(f'Meta description: {desc_text[:80]}...' if len(desc_text) > 80 else f'Meta description: {desc_text}')

# Check for disallowed promotional words
disallowed = ['world\'s first', 'revolutionary', 'groundbreaking', 'unmatched', 'unprecedented', 'futuristic', 'game-changing']
print('\nPromotional word check:')
for word in disallowed:
    if word.lower() in content.lower():
        print(f'  FOUND: "{word}"')

# Check for protected layer exposure
if 'protected internal control layer' not in content.lower() and 'protected internal' not in content.lower():
    print('  WARNING: Protected layer mention missing')

# Check Bihar Council wording
if 'adoption' in content.lower() and 'bihar council' in content.lower():
    lines = [l.strip() for l in content.split('\n') if 'adoption' in l.lower() and 'bihar' in l.lower()]
    if lines:
        print(f'\nBihar Council adoption mentions: {len(lines)}')
        for l in lines[:3]:
            print(f'  -> {l[:120]}')

# Check 97% explanation
if 'methodological consistency' not in content.lower():
    print('  WARNING: 97% explanation missing "methodological consistency"')

# Check semantic elements
semantic_checks = {
    '<main': 'main element',
    '<figure': 'figure element',
    '<figcaption': 'figcaption element',
    '<time ': 'time element',
    '<dl>': 'dl element (check)',
    '<details': 'details element',
    '<blockquote': 'blockquote element',
    '<nav': 'nav element'
}
print('\nSemantic elements:')
for tag, name in semantic_checks.items():
    count = content.count(tag)
    print(f'  {name}: {count}')

# Internal links
internal_links = [
    '/disha/origin/', '/disha/methodology/', '/disha/validation/',
    '/disha/claim-to-source-system/', '/disha/cognitive-engine/',
    '/disha/vyuha-defense-engine/', '/disha/no-first-use-policy/',
    '/disha/nyaya/', '/disha/setu-varuna/', '/disha/research-lineage/',
    '/disha/whitepaper/', '/intelligence/', '/about/'
]
print('\nInternal links:')
for link in internal_links:
    status = 'OK' if link in content else 'MISSING'
    print(f'  [{status}] {link}')

# Image alt text check
alts = re.findall(r'alt="([^"]*)"', content)
empty_alts = [a for a in alts if a == '']
print(f'\nImages with empty alt text: {len(empty_alts)}/{len(alts)}')

# Check schema types
schema_types = ['WebSite', 'WebPage', 'TechArticle', 'SoftwareApplication', 'Person', 'BreadcrumbList', 'ImageObject', 'FAQPage']
print('\nSchema.org types in JSON-LD:')
for st in schema_types:
    if f'"@{st}"' in content or f'"{st}"' in content:
        print(f'  [OK] {st}')
    else:
        print(f'  [MISSING] {st}')

print('\n=== VALIDATION COMPLETE ===')