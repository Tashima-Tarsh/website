#!/usr/bin/env python3
"""Fix duplicate hasPart entries in intelligence/index.html"""

with open('intelligence/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# The exact pattern to replace - 4 identical CreativeWork entries
old = '''"hasPart":[{"@type":"CreativeWork","name":"DISHA Intelligence Archive: 13 Case Files & Supreme Court Records","description":"DISHA Intelligence Archive presents 13 public-interest case files, Supreme Court petition records, source documents, public-fund accountability, RTI trails, and Article 12 evidence methodology."},{"@type":"CreativeWork","name":"DISHA Intelligence Archive: 13 Case Files & Supreme Court Records","description":"DISHA Intelligence Archive presents 13 public-interest case files, Supreme Court petition records, source documents, public-fund accountability, RTI trails, and Article 12 evidence methodology."},{"@type":"CreativeWork","name":"DISHA Intelligence Archive: 13 Case Files & Supreme Court Records","description":"DISHA Intelligence Archive presents 13 public-interest case files, Supreme Court petition records, source documents, public-fund accountability, RTI trails, and Article 12 evidence methodology."},{"@type":"CreativeWork","name":"DISHA Intelligence Archive: 13 Case Files & Supreme Court Records","description":"DISHA Intelligence Archive presents 13 public-interest case files, Supreme Court petition records, source documents, public-fund accountability, RTI trails, and Article 12 evidence methodology."}]'''

new = '''"hasPart":[]'''

count = content.count(old)
print(f"Found {count} occurrence(s) of the duplicate hasPart pattern")

if count > 0:
    content = content.replace(old, new)
    with open('intelligence/index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("SUCCESS: Replaced duplicate hasPart with empty array")
else:
    print("FAILED: Pattern not found")
    # Try to find what's around hasPart
    idx = content.find('"hasPart"')
    if idx >= 0:
        end_idx = content.find('}]', idx)
        if end_idx >= 0:
            print(f"hasPart block from {idx} to {end_idx+2}")
            block = content[idx:end_idx+2]
            print(f"Block length: {len(block)} characters")
            print(f"First 100: {block[:100]}")
            print(f"Last 100: {block[-100:]}")