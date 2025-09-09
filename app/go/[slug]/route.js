// app/go/[slug]/route.js
import { NextResponse } from "next/server";
import { getAffiliateBySlug } from "../../../data/affiliates";

/**
 * Redirector 302 / HTML tracking mode
 * - default: 302 with X-Robots-Tag: noindex,follow
 * - ?track=1: serve HTML that logs to localStorage, then redirects
 */
export async function GET(req, { params }) {
  const { slug } = params || {};
  const item = getAffiliateBySlug?.(slug);

  // fallback dacă slug nu există
  const fallback = new URL("/", req.url);

  // compune destinația cu UTM
  let destUrl;
  try {
    const base = new URL(item?.url || fallback);
    base.searchParams.set("utm_source", "ovidiu.it");
    base.searchParams.set("utm_medium", "tools");
    base.searchParams.set("utm_campaign", "affiliates");
    base.searchParams.set("utm_content", slug || "");
    destUrl = base.toString();
  } catch {
    destUrl = fallback.toString();
  }

  const url = new URL(req.url);
  const trackMode = url.searchParams.get("track") === "1";

  // Header comun — blocăm indexarea dar permitem follow
  const commonHeaders = {
    "X-Robots-Tag": "noindex, follow",
    "Referrer-Policy": "no-referrer-when-downgrade",
  };

  if (!trackMode) {
    // 302 clasic
    const res = NextResponse.redirect(destUrl, 302);
    Object.entries(commonHeaders).forEach(([k, v]) => res.headers.set(k, v));
    return res;
  }

  // HTML tracking mode — scrie în localStorage și apoi redirect
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="robots" content="noindex,follow">
    <meta http-equiv="refresh" content="0;url=${destUrl.replace(/"/g, "&quot;")}">
    <title>Redirecting…</title>
    <style>html{background:#0b0b0d;color:#e9e9ef}body{font:14px/1.4 system-ui,Segoe UI,Roboto,Helvetica,Arial}</style>
  </head>
  <body>
    <noscript>Redirecting… <a href="${destUrl.replace(/"/g, "&quot;")}">Continue</a></noscript>
    <script>
      try{
        var arr = JSON.parse(localStorage.getItem("toolsClicks")||"[]");
        arr.push({ slug: ${JSON.stringify(slug||"")}, ts: Date.now() });
        localStorage.setItem("toolsClicks", JSON.stringify(arr));
      }catch(e){}
      location.replace(${JSON.stringify(destUrl)});
    </script>
  </body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      ...commonHeaders,
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
