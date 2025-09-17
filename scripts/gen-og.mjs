// scripts/gen-og.mjs
// Generează public/og/og-default.png (1200x630) dintr-un SVG aliniat cu brandul.
// Fix: escapăm caracterele XML (&, <, >, ", ') ca să nu pice parserul.

import { Resvg } from "@resvg/resvg-js";
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const W = 1200, H = 630;

// --- Textul tău (poți modifica liber) ---
const title = "Ovidiu.IT";
const headline = "Cybersecurity & Ethical Hacking Portfolio";
const subline = "Networking • Linux • Ethical Hacking";

// Escape pentru XML/SVG
function esc(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// SVG SAFE — grid + gradient + >_ logo + texturi discrete
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#0a0f1c"/>
    </linearGradient>

    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="rgba(56,189,248,0.06)" stroke-width="1"/>
    </pattern>

    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer>
        <feFuncA type="table" tableValues="0 0 0 0 0 0.05 0"/>
      </feComponentTransfer>
    </filter>

    <filter id="glow">
      <feGaussianBlur stdDeviation="4" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="url(#grad)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" filter="url(#noise)" opacity="0.6"/>

  <!-- Accent top line -->
  <rect x="0" y="0" width="${W}" height="6" fill="rgba(56,189,248,0.28)"/>

  <!-- Logo line: >_ Ovidiu.IT -->
  <g transform="translate(120, 200)">
    <rect x="-12" y="-12" width="96" height="48" rx="12" fill="rgba(56,189,248,0.10)" stroke="rgba(56,189,248,0.35)"/>
    <text x="6" y="22" fill="#67e8f9" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="28" font-weight="800">&gt;_</text>

    <text x="120" y="22" fill="#ffffff" font-family="Inter, system-ui, -apple-system, Segoe UI, Roboto" font-size="64" font-weight="900" filter="url(#glow)">
      ${esc(title)}
    </text>
  </g>

  <!-- Headline -->
  <text x="120" y="300" fill="#e5e7eb" font-family="Inter, system-ui, -apple-system, Segoe UI, Roboto"
    font-size="34" font-weight="800">${esc(headline)}</text>

  <!-- Subline -->
  <text x="120" y="352" fill="#a3b3c4" font-family="Inter, system-ui, -apple-system, Segoe UI, Roboto"
    font-size="24" font-weight="600">${esc(subline)}</text>

  <!-- Subtle bottom edge -->
  <rect x="0" y="${H-8}" width="${W}" height="8" fill="rgba(56,189,248,0.22)"/>
</svg>
`;

const outDir = resolve(process.cwd(), "public", "og");
mkdirSync(outDir, { recursive: true });

const resvg = new Resvg(svg, {
  fitTo: { mode: "width", value: W },
  background: "transparent",
});
const pngData = resvg.render().asPng();
const outPath = resolve(outDir, "og-default.png");
writeFileSync(outPath, pngData);

console.log(`✅ OG generated: ${outPath}`);
