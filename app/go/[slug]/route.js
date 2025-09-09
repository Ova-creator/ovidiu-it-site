// app/go/[slug]/route.js
import { NextResponse } from "next/server";
import { getAffiliateBySlug } from "../../../data/affiliates";

/**
 * Redirector 302 → /go/:slug
 * - UTM standardizate (source=ovidiu.it, medium=tools, campaign=affiliates)
 * - X-Robots-Tag noindex,follow (evităm "Page with redirect" în GSC)
 */
export async function GET(req, { params }) {
  const { slug } = params || {};
  const item = getAffiliateBySlug?.(slug);

  // Fallback dacă slug-ul nu e găsit
  if (!item) {
    const res = NextResponse.redirect(new URL("/", req.url), 302);
    res.headers.set("X-Robots-Tag", "noindex, follow");
    return res;
  }

  try {
    const url = new URL(item.url);
    url.searchParams.set("utm_source", "ovidiu.it");
    url.searchParams.set("utm_medium", "tools");
    url.searchParams.set("utm_campaign", "affiliates");
    url.searchParams.set("utm_content", slug);

    const res = NextResponse.redirect(url.toString(), 302);
    res.headers.set("X-Robots-Tag", "noindex, follow");
    res.headers.set("Referrer-Policy", "no-referrer-when-downgrade");
    return res;
  } catch {
    const res = NextResponse.redirect(new URL("/", req.url), 302);
    res.headers.set("X-Robots-Tag", "noindex, follow");
    return res;
  }
}
