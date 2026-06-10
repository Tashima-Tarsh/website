const site = process.env.SITE_URL || "https://thenitishkr.in";

async function request(url, options = {}) {
  const response = await fetch(url, { redirect: "manual", ...options });
  return response;
}

const sitemapResponse = await request(`${site}/sitemap.xml`);
if (!sitemapResponse.ok) throw new Error(`sitemap.xml returned ${sitemapResponse.status}`);
const sitemap = await sitemapResponse.text();
const urls = [...sitemap.matchAll(/<loc>(https:\/\/thenitishkr\.in\/[^<]*)<\/loc>/g)].map(
  (match) => match[1],
);

const failures = [];
for (const url of urls) {
  const response = await request(url);
  if (response.status !== 200) failures.push(`${response.status} ${url}`);
}

const www = await request("https://www.thenitishkr.in/intelligence/?release-check=1");
if (www.status !== 301 || www.headers.get("location") !== `${site}/intelligence/?release-check=1`) {
  failures.push("www host does not preserve path and query in a 301 redirect");
}

const home = await request(`${site}/`, { headers: { "accept-encoding": "br, gzip" } });
if (!home.headers.get("content-encoding")) failures.push("homepage is not compressed");
if (!home.headers.get("x-content-type-options")) failures.push("security headers are missing");

if (failures.length) {
  console.error(`Live verification failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log(`Live verification passed: ${urls.length} sitemap URLs, canonical host, compression and security headers.`);
