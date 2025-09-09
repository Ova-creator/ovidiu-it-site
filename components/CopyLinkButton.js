// components/CopyLinkButton.js
"use client";

import { useState } from "react";

export default function CopyLinkButton({ slug }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      // accesăm window doar la click (client-only), niciodată în render
      const origin =
        typeof window !== "undefined" ? window.location.origin : "";
      const link = `${origin}/go/${slug}`;
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="btn-ghost text-xs px-3 py-2"
      title="Copy affiliate link"
    >
      {copied ? "Copied!" : "Copy link"}
    </button>
  );
}
