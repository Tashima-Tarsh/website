#!/usr/bin/env python3
"""Add cross-links between related pages"""

import sys, codecs
sys.stdout = codecs.getwriter('utf-8')(sys.stdout.buffer)

# LINK-002: Add link from MeitY case file to digital-arrest-data-harm
with open('intelligence/meity-digital-governance/index.html', 'r', encoding='utf-8') as f:
    mc = f.read()

if '/digital-arrest-data-harm/' not in mc:
    target = '<section class="section citation-block'
    if target in mc:
        link = '<div class="section"><p class="lead">Citizens affected by data theft may need to preserve evidence \u2014 see the <a href="/digital-arrest-data-harm/">Digital Arrest and Data Harm</a> evidence hub.</p></div>\n'
        mc = mc.replace(target, link + target)
        with open('intelligence/meity-digital-governance/index.html', 'w', encoding='utf-8') as f:
            f.write(mc)
        print('LINK-002: Added MeitY -> digital-arrest link')
    else:
        print('LINK-002: Could not find insertion point')
else:
    print('LINK-002: Already exists')

# Verify
with open('intelligence/meity-digital-governance/index.html', 'r', encoding='utf-8') as f:
    mc = f.read()
print('Verified MeitY -> digital-arrest:', '/digital-arrest-data-harm/' in mc)
print('Auto-dec -> human-review already added:', '/digital-constitutional-personhood/human-review-remedy/' in open('article-12/automated-decisions/index.html', encoding='utf-8').read())
print('Digital-arrest -> MeitY already exists:', '/intelligence/meity-digital-governance/' in open('digital-arrest-data-harm/index.html', encoding='utf-8').read())