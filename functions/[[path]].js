const GONE_HTML = `<!doctype html>
<html lang="en-IN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>Record Permanently Removed | thenitishkr</title>
  <meta name="description" content="This record has been permanently removed from the thenitishkr public-interest archive.">
  <link rel="stylesheet" href="/styles.css">
  <link rel="stylesheet" href="/editorial-preview.css">
</head>
<body>
  <main class="section not-found-page">
    <p class="eyebrow">Archive notice</p>
    <h1>Record permanently removed.</h1>
    <p class="lead">This file has been permanently retired from the public archive. It is no longer available and will not be restored.</p>
    <div class="hero-actions"><a class="button" href="/">Home</a><a class="button secondary" href="/intelligence/">Intelligence Archive</a></div>
  </main>
</body>
</html>`;

const GONE_PATHS = new Set([
  "/assets/records/intelligence/mity2.pdf",
  "/assets/records/intelligence/pil-annexure-book-evidence-traced-final.pdf",
  "/assets/records/intelligence/master-forensic-jamtara-digital-arrest-record-2012-2026.pdf",
  "/assets/records/intelligence/wrt-crl-pil-1632026-2.pdf",
]);

const REDIRECTS = new Map([
  ["/connect.html", "/about/#contact"],
  ["/record.html", "/intelligence/"],
  ["/chronicle.html", "/intelligence/"],
]);

function responseHeaders(extra = {}) {
  return {
    "x-robots-tag": "noindex, nofollow",
    ...extra,
  };
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const path = url.pathname;

  if (GONE_PATHS.has(path)) {
    return new Response(GONE_HTML, {
      status: 410,
      headers: responseHeaders({
        "content-type": "text/html; charset=UTF-8",
        "cache-control": "no-store",
      }),
    });
  }

  const redirectTarget = REDIRECTS.get(path);
  if (redirectTarget) {
    return Response.redirect(new URL(redirectTarget, url.origin).toString(), 301);
  }

  return context.next();
}
