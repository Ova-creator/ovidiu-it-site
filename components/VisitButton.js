// components/VisitButton.js
"use client";

import Link from "next/link";

// trimite cta_click către GA4 (gtag sau GTM)
function trackVisit(slug) {
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "cta_click", {
        category: "tools",
        label: slug,
        value: 1,
      });
    }
    if (typeof window !== "undefined" && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "cta_click",
        category: "tools",
        label: slug,
        value: 1,
      });
    }
  } catch {}
}

export default function VisitButton({ href, slug }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored nofollow"
      className="btn-primary"
      onClick={() => trackVisit(slug)}
    >
      Visit
    </Link>
  );
}
