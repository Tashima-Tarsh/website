/**
 * Batch update script for all sub-pages with new navigation and footer.
 * Run: node scripts/update-pages.mjs
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const NEW_CSS = '/styles.css?v=20260618';
const OLD_CSS = '/styles.css?v=20260613';

const NEW_NAV = `<div class="nav-links" data-nav-links>
        <div class="nav-item">
          <a href="/disha/">DISHA</a>
          <div class="nav-dropdown">
            <a href="/disha/">Overview<small>DISHA Intelligence Architecture</small></a>
            <a href="/disha/origin/">Origin<small>Conceived in 2012</small></a>
            <a href="/disha/#architecture">Architecture<small>System design</small></a>
            <a href="/disha/methodology/">Methodology<small>Research method</small></a>
            <a href="/disha/claim-to-source-system/">Claim-to-Source System<small>Evidence mapping</small></a>
            <a href="/disha/validation/">Validation<small>97% corroboration rate</small></a>
          </div>
        </div>
        <div class="nav-item">
          <a href="/intelligence/">Intelligence</a>
          <div class="nav-dropdown">
            <a href="/intelligence/">All Case Files<small>13 intelligence case files</small></a>
            <a href="/intelligence/meity-digital-governance/">Featured Investigation<small>W.P.(Crl.) No. 163/2026</small></a>
            <a href="/intelligence/#case-files">Case Timeline<small>2013-2026</small></a>
            <a href="/intelligence/#official-record-trail">Supreme Court Records<small>Petition trail</small></a>
          </div>
        </div>
        <div class="nav-item">
          <a href="/research-datasets/">Evidence</a>
          <div class="nav-dropdown">
            <a href="/research-datasets/">Evidence Register<small>Research Source Register</small></a>
            <a href="/research-datasets/#government-records">Government Records<small>Official documents</small></a>
            <a href="/research-datasets/#court-records">Court Records<small>Legal proceedings</small></a>
            <a href="/research-datasets/#rti-records">RTI Records<small>Right to Information</small></a>
            <a href="/research-datasets/#audit-records">Audit Records<small>Financial audits</small></a>
            <a href="/research-datasets/#institutional-records">Institutional Records<small>Organisational data</small></a>
          </div>
        </div>
        <div class="nav-item">
          <a href="/article-12/">Frameworks</a>
          <div class="nav-dropdown">
            <a href="/article-12/">Article 12<small>Constitutional accountability</small></a>
            <a href="/digital-constitutional-personhood/">Digital Personhood<small>Citizen data rights</small></a>
            <a href="/digital-arrest-data-harm/">Digital Arrest & Data Harm<small>Citizen protection</small></a>
          </div>
        </div>
        <div class="nav-item">
          <a href="/books/">Publications</a>
          <div class="nav-dropdown">
            <a href="/books/">Books<small>Authored works</small></a>
            <a href="/news/">News and Analysis<small>Research commentary</small></a>
            <a href="/news/#press-coverage">Press Coverage<small>Press mentions</small></a>
          </div>
        </div>
        <div class="nav-item">
          <a href="/about/">About</a>
          <div class="nav-dropdown">
            <a href="/about/">About Nitish Kumar<small>Researcher & author</small></a>
            <a href="/editorial-standards/">Editorial Standards<small>Research integrity</small></a>
            <a href="/editorial-standards/#corrections">Corrections<small>Accuracy policy</small></a>
            <a href="/about/#contact">Contact<small>Get in touch</small></a>
            <a href="/sitemap/">Research Index<small>Site map</small></a>
          </div>
        </div>
      </div>
      <a class="nav-cta" href="/intelligence/">Open the Archive</a>`;

const NEW_FOOTER = `    <footer class="site-footer">
    <div class="section">
      <div>
        <div class="footer-logo">THENITISHKR</div>
        <p class="footer-kicker">INDIA | RESEARCH - EVIDENCE - INTELLIGENCE</p>
        <p class="muted" style="margin-top:14px">&copy; 2026 Nitish Kumar (thenitishkr). All Rights Reserved.</p>
      </div>
      <div class="footer-links" aria-label="Footer navigation">
        <a href="/about/">About</a>
        <a href="/editorial-standards/">Editorial Standards</a>
        <a href="/sitemap/">Research Index</a>
        <a href="/editorial-standards/#corrections">Corrections</a>
        <a href="/about/#contact">Contact</a>
        <a href="/privacy-policy/">Privacy</a>
        <a href="/terms/">Terms</a>
        <a href="https://orcid.org/0009-0004-6840-4463" target="_blank">ORCID</a>
        <a href="https://www.linkedin.com/in/thenitishkr" target="_blank">LinkedIn</a>
        <a href="https://x.com/thenitishkr" target="_blank">X</a>
        <a href="https://thenitishkr.substack.com" target="_blank">Substack</a>
      </div>
    </div>
  </footer>`;

const NEW_SCRIPT = '/script.js?v=20260618';

// Pages to update
const pages = [
  'about/index.html',
  'article-12/index.html',
  'books/index.html',
  'news/index.html',
  'media/index.html',
  'digital-constitutional-personhood/index.html',
  'digital-arrest-data-harm/index.html',
  'editorial-standards/index.html',
  'fact-check/index.html',
  'start-here/index.html',
  'privacy-policy/index.html',
  'terms/index.html',
  'sitemap/index.html',
  'research-datasets/index.html',
];

function updateFile(filePath) {
  const fullPath = join(root, filePath);
  if (!existsSync(fullPath)) {
    console.log(`⚠️  SKIP (not found): ${filePath}`);
    return false;
  }
  let content = readFileSync(fullPath, 'utf-8');
  if (!content.includes('class="nav-links"')) {
    console.log(`⚠️  SKIP (no nav): ${filePath}`);
    return false;
  }

  // 1. Add skip-link after <body>
  content = content.replace('<body>', '<body>\n  <a class="skip-link" href="#main-content">Skip to main content</a>');

  // 2. Add main-content id to <main>
  content = content.replace('<main>', '<main id="main-content">').replace('<main id="main-content" id="main-content">', '<main id="main-content">');

  // 3. Update CSS path
  content = content.replace(OLD_CSS, NEW_CSS);

  // 4. Replace old nav-links with new dropdown nav
  const oldNavRegex = /<div class="nav-links" data-nav-links>.*?<\/div>\s*<a class="nav-cta"[^>]*>[^<]*<\/a>/s;
  content = content.replace(oldNavRegex, NEW_NAV);

  // 5. Replace old footer with new focused footer (match old footer start to end)
  const footerEnd = '</footer>';
  const oldFooterStart = content.lastIndexOf('<footer class="site-footer">');
  const oldFooterEnd = content.indexOf(footerEnd, oldFooterStart);
  if (oldFooterStart !== -1 && oldFooterEnd !== -1) {
    const beforeFooter = content.substring(0, oldFooterStart);
    const afterFooter = content.substring(oldFooterEnd + footerEnd.length);
    content = beforeFooter + NEW_FOOTER + afterFooter;
  }

  // 6. Update script version
  content = content.replace(/script\.js\?v=20260609\w*/g, NEW_SCRIPT);

  // 7. Fix double main-content ids
  content = content.replace(/id="main-content" id="main-content"/g, 'id="main-content"');

  writeFileSync(fullPath, content, 'utf-8');
  console.log(`✅ UPDATED: ${filePath}`);
  return true;
}

console.log('=== Updating sub-pages with new navigation and footer ===\n');
let count = 0;
for (const page of pages) {
  if (updateFile(page)) count++;
}
console.log(`\n=== ${count}/${pages.length} pages updated ===`);
console.log('=== Done. Now manually update individual case files under intelligence/*/ ===');
