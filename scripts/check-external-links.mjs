import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const contentRoots = ["article-12", "digital-constitutional-personhood", "intelligence", "news"];
const ignoredHosts = /(?:thenitishkr\.in|substack\.com|medium\.com|linkedin\.com|facebook\.com|instagram\.com|twitter\.com|x\.com|reddit\.com|quora\.com|amazon\.|github\.com|orcid\.org|wikidata\.org)$/i;
const dynamicGovernmentHosts = new Set(["cybercrime.gov.in", "www.cybercrime.gov.in", "i4c.mha.gov.in", "pib.gov.in", "www.indiacode.nic.in", "www.sci.gov.in"]);

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(absolute);
    return entry.isFile() && entry.name === "index.html" ? [absolute] : [];
  });
}

function routeFor(file) {
  return `/${path.relative(root, path.dirname(file)).replaceAll("\\", "/")}/`;
}

const references = [];
for (const contentRoot of contentRoots) {
  const directory = path.join(root, contentRoot);
  if (!fs.existsSync(directory)) continue;
  for (const file of walk(directory)) {
    const html = fs.readFileSync(file, "utf8");
    if (/name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)) continue;
    for (const match of html.matchAll(/<a\b[^>]*href=["'](https?:\/\/[^"']+)/gi)) {
      const url = new URL(match[1].replaceAll("&amp;", "&"));
      if (ignoredHosts.test(url.hostname)) continue;
      references.push({ route: routeFor(file), url: url.href });
    }
  }
}

const unique = [...new Map(references.map((reference) => [reference.url, reference])).values()];

async function check(reference) {
  try {
    const response = await fetch(reference.url, {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
      headers: { "user-agent": "Mozilla/5.0 thenitishkr-source-audit/1.0" },
    });
    return { ...reference, status: response.status };
  } catch (error) {
    return { ...reference, status: 0, error: error.name };
  }
}

const results = [];
for (let index = 0; index < unique.length; index += 12) {
  results.push(...await Promise.all(unique.slice(index, index + 12).map(check)));
}

const confirmedBroken = results.filter(({ status, url }) => {
  if (dynamicGovernmentHosts.has(new URL(url).hostname)) return false;
  return status === 404 || status === 410;
});
const restricted = results.filter(({ status }) => status === 0 || [401, 403, 406, 429].includes(status));

console.log(`Checked ${results.length} unique external source links.`);
console.log(`${results.filter(({ status }) => status >= 200 && status < 400).length} responded normally; ${restricted.length} blocked or timed out.`);
if (confirmedBroken.length) {
  for (const item of confirmedBroken) console.error(`${item.status} ${item.url} <- ${item.route}`);
  process.exitCode = 1;
} else {
  console.log("No confirmed 404 or 410 source links found.");
}
