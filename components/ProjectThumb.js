// components/ProjectThumb.js
export default function ProjectThumb({ title, subtitle }) {
  const W = 1200, H = 520, padX = 44, padY = 36;
  const safe = (s) => String(s || "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c1220"/><stop offset="100%" stop-color="#0a0f1a"/>
    </linearGradient>
    <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="table" tableValues="0 0 0 0 0 0.06 0"/></feComponentTransfer></filter>
  </defs>
  <rect width="${W}" height="${H}" rx="28" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" rx="28" filter="url(#noise)"/>
  <g stroke="rgba(56,189,248,0.06)" stroke-width="1">
    ${Array.from({length: Math.ceil(W/48)+1}, (_,i)=>`<line x1="${i*48}" y1="0" x2="${i*48}" y2="${H}"/>`).join("")}
    ${Array.from({length: Math.ceil(H/48)+1}, (_,i)=>`<line x1="0" y1="${i*48}" x2="${W}" y2="${i*48}"/>`).join("")}
  </g>
  <g transform="translate(${padX}, ${padY})">
    <rect width="84" height="40" rx="10" fill="rgba(56,189,248,0.10)" stroke="rgba(56,189,248,0.35)"/>
    <text x="14" y="28" fill="#67e8f9" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="22" font-weight="700">&gt;_</text>
  </g>
  <text x="${padX}" y="${padY+96}" fill="#e5e7eb" font-family="Inter, ui-sans-serif, system-ui" font-size="44" font-weight="800">${safe(title)}</text>
  <text x="${padX}" y="${padY+140}" fill="#9aa3b2" font-family="Inter, ui-sans-serif, system-ui" font-size="22" font-weight="500">${safe(subtitle)}</text>
</svg>`;
  const src = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  return <img src={src} alt={`${title || "Project"} thumbnail`} className="h-full w-full object-cover" loading="lazy" decoding="async" />;
}
