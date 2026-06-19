// Cloudflare Pages Function — server-side RSS proxy
// Route: /rss-proxy?feed=policy|regional|legal
// Fetches RSS server-side (no CORS), parses XML, returns JSON, caches 30 min

const FEEDS = {
  policy: 'https://pib.gov.in/RssMain.aspx?ModId=6&Lang=1&Regid=3',        // PIB — Govt of India press releases
  regional: 'https://www.thehindu.com/news/national/feeder/default.rss',    // The Hindu — National
  legal: 'https://feeds.feedburner.com/livelaw/llsc',                        // Live Law — Supreme Court
};

const CACHE_SECONDS = 1800; // 30 minutes

function parseItems(xmlText) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(xmlText)) !== null && items.length < 8) {
    const block = match[1];
    const get = (tag) => {
      const m = block.match(new RegExp(`<${tag}(?:[^>]*)><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}(?:[^>]*)>([^<]*)<\\/${tag}>`));
      return m ? (m[1] || m[2] || '').trim() : '';
    };
    const title = get('title');
    const link  = get('link') || block.match(/<link\s*\/?>(.*?)<\/link>|<link>(.*?)<\/link>/)?.[1] || '';
    const pubDate = get('pubDate');
    const description = get('description').replace(/<[^>]+>/g, '').slice(0, 180);

    if (title && link && link.startsWith('http')) {
      items.push({ title, link, pubDate, description });
    }
  }
  return items;
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const feedKey = url.searchParams.get('feed');

  if (!feedKey || !FEEDS[feedKey]) {
    return new Response(JSON.stringify({ error: 'Invalid feed key' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const cacheKey = new Request(`https://rss-cache.internal/${feedKey}`);
  const cache = caches.default;
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  try {
    const res = await fetch(FEEDS[feedKey], {
      headers: { 'User-Agent': 'thenitishkr-rss-reader/1.0' },
      cf: { cacheTtl: CACHE_SECONDS, cacheEverything: true },
    });
    if (!res.ok) throw new Error(`Upstream ${res.status}`);
    const xml = await res.text();
    const items = parseItems(xml);

    const payload = JSON.stringify({ ok: true, feed: feedKey, items });
    const response = new Response(payload, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': `public, max-age=${CACHE_SECONDS}`,
        'Access-Control-Allow-Origin': 'https://thenitishkr.in',
      },
    });
    context.waitUntil(cache.put(cacheKey, response.clone()));
    return response;
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
