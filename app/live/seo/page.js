// app/live/seo/page.js
import Script from "next/script";

export const metadata = {
  title: "Live: SEO Checklist & Fixes | Ovidiu.IT",
  description:
    "Practical, technical SEO for Next.js sites: metadata, JSON-LD, sitemaps, robots, CWV, and clean information architecture.",
  alternates: { canonical: "/live/seo" },
  openGraph: {
    images: [{ url: "/og?t=Live%20SEO&s=Technical%20Foundations%20for%20Next.js", width: 1200, height: 630 }],
  },
  twitter: { images: ["/og?t=Live%20SEO&s=Technical%20Foundations%20for%20Next.js"] },
};

const items = [
  "Titles, meta descriptions, and social previews (OG/Twitter).",
  "Structured data: Organization, WebSite, FAQ, Breadcrumbs.",
  "Sitemaps & robots tuned; canonical and alternates in place.",
  "Core Web Vitals: images, fonts, script strategy, cache.",
  "Clean IA, accessible components, and clear CTAs.",
];

export default function LiveSEO() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Live SEO checklist for Next.js",
    about: ["Technical SEO", "Core Web Vitals", "Metadata", "JSON-LD"],
  };

  return (
    <>
      <Script
        id="jsonld-live-seo"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="container mx-auto px-4 py-12">
        <section className="hero-card card-luxe text-center mb-10">
          <p className="text-xs sm:text-sm text-zinc-300 mb-2">
            Ovidiu.IT — Next.js + SEO
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.15] mx-auto max-w-3xl">
            Live SEO — <span className="text-[var(--accent)]">Technical</span> foundations for Next.js
          </h1>
          <p className="mt-3 text-zinc-300 mx-auto max-w-2xl">
            Real-world fixes you can deploy today: metadata, JSON-LD, CWV,
            sitemaps/robots and accessible, conversion-focused UI.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <a href="/contact" className="btn-primary">Get a Quote</a>
            <a href="/services/seo-uk" className="btn-ghost">SEO Services UK</a>
            <a href="/blog/seo-best-practices-uk-2025" className="btn-ghost">Best Practices 2025</a>
          </div>
        </section>

        <section className="card-luxe">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            What we check (and fix)
          </h2>
          <ul className="list-disc ml-5 space-y-2 text-zinc-300">
            {items.map((li, i) => (
              <li key={i}>{li}</li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
