// Cloudflare Pages Function — server-side RSS proxy
// Route: /rss-proxy?feed=site|substack|policy|legal
// site feed: no cache (always fresh). External feeds: 15-min edge cache.

const FEEDS = {
  site:   'https://thenitishkr.in/feed.xml',                          // own archive — always fresh
  substack: 'https://thenitishkr.substack.com/feed',                  // official author feed
  policy: 'https://www.thehindu.com/news/national/feeder/default.rss', // The Hindu national
  legal:  'https://feeds.feedburner.com/livelaw/llsc',                 // Live Law Supreme Court
};

function parseItems(xmlText, max) {
  const items = [];
  const itemRx = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = itemRx.exec(xmlText)) !== null && items.length < (max || 8)) {
    const block = m[1];
    const get = (tag) => {
      const r = block.match(
        new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([^<]*)<\\/${tag}>`)
      );
      return r ? (r[1] || r[2] || '').trim() : '';
    };
    const title   = get('title');
    const pubDate = get('pubDate');
    const rawDescription = get('description');
    const encodedContent = get('content:encoded');
    const description = rawDescription.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, 200);
    const enclosure = block.match(/<enclosure[^>]+url=["']([^"']+)["']/i);
    const media = block.match(/<media:(?:content|thumbnail)[^>]+url=["']([^"']+)["']/i);
    const embeddedImage = (encodedContent || rawDescription).match(/<img[^>]+src=["']([^"']+)["']/i);
    const thumbnail = enclosure?.[1] || media?.[1] || embeddedImage?.[1] || '';
    // link: handle both <link>url</link> and atom <link href="url"/>
    let link = get('link');
    if (!link) {
      const lm = block.match(/<link[^>]+href="([^"]+)"/);
      if (lm) link = lm[1];
    }
    if (title && link && link.startsWith('http')) {
      items.push({ title, link, pubDate, description, thumbnail });
    }
  }
  return items;
}

export async function onRequest(context) {
  const { request } = context;
  const url  = new URL(request.url);
  const key  = url.searchParams.get('feed');

  if (!key || !FEEDS[key]) {
    return new Response(JSON.stringify({ error: 'Invalid feed key. Use: site, substack, policy, legal' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }

  const isSite = key === 'site';

  // For external feeds only — try edge cache first
  if (!isSite) {
    const cache    = caches.default;
    const cacheKey = new Request(`https://rss-cache.internal/v3/${key}`);
    const cached   = await cache.match(cacheKey);
    if (cached) return cached;

    try {
      const res = await fetch(FEEDS[key], {
        headers: { 'User-Agent': 'thenitishkr-rss/1.0' },
        cf: { cacheTtl: 900, cacheEverything: true },
      });
      if (!res.ok) throw new Error(`Upstream HTTP ${res.status}`);
      const xml   = await res.text();
      const items = parseItems(xml, key === 'substack' ? 20 : 8);
      const body  = JSON.stringify({ ok: true, feed: key, items });
      const response = new Response(body, {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=900',
          'Access-Control-Allow-Origin': 'https://thenitishkr.in',
        },
      });
      context.waitUntil(cache.put(cacheKey, response.clone()));
      return response;
    } catch (err) {
      return new Response(JSON.stringify({ ok: false, error: err.message }), {
        status: 502, headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  // Own site feed — always fresh, no cache
  try {
    const res = await fetch(FEEDS.site, {
      headers: { 'User-Agent': 'thenitishkr-rss/1.0' },
    });
    if (!res.ok) throw new Error(`Site feed HTTP ${res.status}`);
    const xml   = await res.text();
    const items = parseItems(xml, 11); // show all own items
    return new Response(JSON.stringify({ ok: true, feed: 'site', items }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
        'Access-Control-Allow-Origin': 'https://thenitishkr.in',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 502, headers: { 'Content-Type': 'application/json' },
    });
  }
}
