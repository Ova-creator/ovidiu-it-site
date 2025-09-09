// components/CopyLinkButton.js
"use client";

import { useState } from "react";

export default function CopyLinkButton({ slug }) {
  const [copied, setCopied] = useState(false);

  const link = `${window?.location.origin || ""}/go/${slug}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="btn-ghost text-xs px-3 py-2"
      title="Copy affiliate link"
    >
      {copied ? "Copied!" : "Copy link"}
    </button>
  );
}
