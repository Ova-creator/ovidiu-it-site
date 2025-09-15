// app/blog/rss/route.js
// RSS minimal pentru blog (gol deocamdată). Când adaugi articole, populezi `posts`.
function buildRss({ site, title, description, items }) {
  const escape = (s) =>
    String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const itemsXml = items
    .map(
      (p) => `
  <item>
    <title>${escape(p.title)}</title>
    <link>${escape(p.link)}</link>
    <guid>${escape(p.link)}</guid>
    <description>${escape(p.description)}</description>
    <pubDate>${new Date(p.date).toUTCString()}</pubDate>
  </item>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${escape(title)}</title>
  <link>${escape(site)}</link>
  <description>${escape(description)}</description>${itemsXml}
</channel>
</rss>`;
}

export async function GET() {
  const site = "https://ovidiu.it/"; // schimbă cu domeniul final
  const posts = [
    // EXEMPLE de completat:
    // { title: "Lab: VLAN Trunking Deep Dive", link: `${site}blog/vlan-trunking-deep-dive`, description: "Concepts, configs, troubleshooting.", date: "2025-07-24" },
  ];

  const xml = buildRss({
    site,
    title: "Ovidiu.IT — Blog",
    description: "Writeups & notes on networking, Linux and automation.",
    items: posts,
  });

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}
