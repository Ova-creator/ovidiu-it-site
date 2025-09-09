// components/VisitButton.js
"use client";

import Link from "next/link";

function trackGA(slug) {
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "cta_click", { category: "tools", label: slug, value: 1 });
    }
    if (typeof window !== "undefined" && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: "cta_click", category: "tools", label: slug, value: 1 });
    }
  } catch {}
}

function trackLocal(slug) {
  try {
    const key = "toolsClicks";
    const now = Date.now();
    const prev = JSON.parse(localStorage.getItem(key) || "[]");
    prev.push({ slug, ts: now });
    localStorage.setItem(key, JSON.stringify(prev));
  } catch {}
}

export default function VisitButton({ href, slug }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored nofollow"
      className="btn-primary"
      onClick={() => {
        trackGA(slug);
        trackLocal(slug);
      }}
    >
      Visit
    </Link>
  );
}
