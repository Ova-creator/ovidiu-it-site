// app/live/seo/page.js

export const metadata = {
  title: "Technical SEO — Live Demo | Ovidiu.IT",
  description:
    "See how clean metadata, JSON-LD, sitemaps & robots work together. Plus quick CWV & accessibility passes we ship with every project.",
  alternates: { canonical: "/live/seo" },

  // Social previews (point to the static OG image you added in /public/og/)
  openGraph: {
    url: "/live/seo",
    type: "website",
    title: "Technical SEO — Live Demo | Ovidiu.IT",
    description:
      "Metadata, JSON-LD, sitemaps, robots and solid social cards — the tech SEO foundation we ship by default.",
    images: [{ url: "/og/og-image-1200x630.png", width: 1200, height: 630, alt: "Ovidiu.IT — Technical SEO" }],
    siteName: "Ovidiu.IT",
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical SEO — Live Demo | Ovidiu.IT",
    description:
      "Metadata, JSON-LD, sitemaps, robots and solid social cards — the tech SEO foundation we ship by default.",
    images: ["/og/og-image-1200x630.png"],
  },
};

const jsonLdSample = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sample Brand",
  url: "https://example.com",
  sameAs: ["https://www.linkedin.com/company/example"],
};

const robotsTxt = `User-agent: *
Allow: /
Sitemap: https://example.com/sitemap.xml`;

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://example.com/</loc></url>
  <url><loc>https://example.com/services</loc></url>
  <url><loc>https://example.com/projects</loc></url>
</urlset>`;

export default function SeoLiveDemo() {
  return (
    <main className="container mx-auto px-4 py-10">
      {/* HERO */}
      <section className="hero-card card-luxe mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold">Technical SEO — Live Demo</h1>
        <p className="mt-2 text-zinc-300">
          The essentials we implement on every project: clean metadata, JSON-LD, sitemaps & robots — plus a quick CWV
          and accessibility pass.
        </p>
      </section>

      {/* BEFORE / AFTER */}
      <section className="grid lg:grid-cols-2 gap-6 mb-8">
        <article className="card-luxe">
          <h2 className="text-xl font-semibold mb-2">Before cleanup</h2>
          <ul className="list-disc ml-5 space-y-1 text-zinc-300">
            <li>Generic titles & duplicate descriptions</li>
            <li>No JSON-LD, weak social previews</li>
            <li>robots.txt / sitemap incomplete or missing</li>
            <li>Unoptimised images, layout shifts on hero</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <span className="px-2 py-1 rounded-full bg-[rgba(255,255,255,.06)] border border-[var(--card-border)]">
              CWV: LCP ~3.5s
            </span>
            <span className="px-2 py-1 rounded-full bg-[rgba(255,255,255,.06)] border border-[var(--card-border)]">
              CLS ~0.18
            </span>
            <span className="px-2 py-1 rounded-full bg-[rgba(255,255,255,.06)] border border-[var(--card-border)]">
              Index coverage: ~60%
            </span>
          </div>
        </article>

        <article className="card-luxe">
          <h2 className="text-xl font-semibold mb-2">After cleanup</h2>
          <ul className="list-disc ml-5 space-y-1 text-zinc-300">
            <li>Focused titles & unique descriptions</li>
            <li>JSON-LD (Organization / Website / Service / FAQ) + OG/Twitter</li>
            <li>Curated robots.txt & sitemap</li>
            <li>Next/Image with sizes; preloaded fonts; a11y fixes</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <span className="px-2 py-1 rounded-full bg-[rgba(255,255,255,.06)] border border-[var(--card-border)]">
              CWV: LCP ≤2.1s
            </span>
            <span className="px-2 py-1 rounded-full bg-[rgba(255,255,255,.06)] border border-[var(--card-border)]">
              CLS ≤0.03
            </span>
            <span className="px-2 py-1 rounded-full bg-[rgba(255,255,255,.06)] border border-[var(--card-border)]">
              Index coverage: ~100%
            </span>
          </div>
        </article>
      </section>

      {/* 3-COLUMN EXAMPLES */}
      <section className="grid lg:grid-cols-3 gap-6">
        <article className="card-luxe">
          <h2 className="text-xl font-semibold mb-2">Metadata & JSON-LD</h2>
          <p className="text-zinc-300 mb-3">
            Clean titles & descriptions, strong social previews and structured data search engines love.
          </p>
          <details className="rounded-xl border border-[var(--card-border)] bg-[rgba(255,255,255,.03)]">
            <summary className="cursor-pointer px-4 py-3 font-medium list-none">JSON-LD sample</summary>
            <pre className="p-4 overflow-x-auto text-sm text-zinc-200">
              <code>{JSON.stringify(jsonLdSample, null, 2)}</code>
            </pre>
          </details>
        </article>

        <article className="card-luxe">
          <h2 className="text-xl font-semibold mb-2">Crawl setup</h2>
          <p className="text-zinc-300 mb-3">Tidy robots & a sitemap index for clean crawling and fast discovery.</p>
          <details className="mb-2 rounded-xl border border-[var(--card-border)] bg-[rgba(255,255,255,.03)]">
            <summary className="cursor-pointer px-4 py-3 font-medium list-none">robots.txt</summary>
            <pre className="p-4 overflow-x-auto text-sm text-zinc-200">
              <code>{robotsTxt}</code>
            </pre>
          </details>
          <details className="rounded-xl border border-[var(--card-border)] bg-[rgba(255,255,255,.03)]">
            <summary className="cursor-pointer px-4 py-3 font-medium list-none">sitemap.xml</summary>
            <pre className="p-4 overflow-x-auto text-sm text-zinc-200">
              <code>{sitemapXml}</code>
            </pre>
          </details>
        </article>

        <article className="card-luxe">
          <h2 className="text-xl font-semibold mb-2">CWV & accessibility</h2>
          <ul className="list-disc ml-5 space-y-1 text-zinc-300">
            <li>Next/Image with proper <code>sizes</code> & <code>priority</code></li>
            <li>Preload essential fonts</li>
            <li>Visible focus ring & skip-link</li>
            <li>Lean bundles — no unused JS</li>
          </ul>
          <div className="mt-4 flex gap-2">
            <a className="btn-primary" href="/contact">Request audit</a>
            <a className="btn-ghost" href="/projects">Back to Projects</a>
          </div>
        </article>
      </section>
    </main>
  );
}
