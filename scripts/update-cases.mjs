/**
 * Batch update intelligence case files and other sub-pages.
 * Run: node scripts/update-cases.mjs
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

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

function updateFile(filePath) {
  if (!existsSync(filePath)) return;
  let content = readFileSync(filePath, 'utf-8');
  if (!content.includes('class="nav-links"')) { console.log('  SKIP (no nav): ' + filePath); return; }
  content = content.replace('<body>', '<body>\n  <a class="skip-link" href="#main-content">Skip to main content</a>');
  content = content.replace('<main>', '<main id="main-content">').replace('id="main-content" id="main-content"', 'id="main-content"');
  const oldNavRegex = /<div class="nav-links" data-nav-links>.*?<\/div>\s*<a class="nav-cta"[^>]*>[^<]*<\/a>/s;
  content = content.replace(oldNavRegex, NEW_NAV);
  const footerEnd = '</footer>';
  const oldFooterStart = content.lastIndexOf('<footer class="site-footer">');
  const oldFooterEnd = content.indexOf(footerEnd, oldFooterStart);
  if (oldFooterStart !== -1 && oldFooterEnd !== -1) {
    content = content.substring(0, oldFooterStart) + NEW_FOOTER + content.substring(oldFooterEnd + footerEnd.length);
  }
  content = content.replace(/script\.js\?v=20260609\w*/g, '/script.js?v=20260618');
  content = content.replace(/styles\.css\?v=20260613/g, '/styles.css?v=20260618');
  writeFileSync(filePath, content, 'utf-8');
  console.log('  ✅ ' + filePath);
}

console.log('=== Updating intelligence case files ===');
const intelDir = join(root, 'intelligence');
const caseDirs = readdirSync(intelDir).filter(d => d !== 'index.html' && statSync(join(intelDir, d)).isDirectory());
caseDirs.forEach(d => updateFile(join(intelDir, d, 'index.html')));

console.log('\n=== Updating framework sub-pages ===');
const extras = [
  'article-12/ai-systems', 'article-12/automated-decisions', 'article-12/public-authority-responsibility',
  'digital-constitutional-personhood/biometric-failure', 'digital-constitutional-personhood/data-sovereignty',
  'digital-constitutional-personhood/definition', 'digital-constitutional-personhood/human-review-remedy',
  'digital-arrest-data-harm/data-recovery', 'digital-arrest-data-harm/evidence-checklist',
  'digital-arrest-data-harm/stolen-kyc-data', 'digital-arrest-data-harm/victim-record-preservation',
  'disha/origin', 'disha/methodology', 'disha/claim-to-source-system', 'disha/validation',
  'intelligence/citizen-not-found'
];
extras.forEach(d => updateFile(join(root, d, 'index.html')));

console.log('\n=== All done ===');
