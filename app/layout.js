import "./globals.css";
import Script from "next/script";
import SiteHeader from "../components/SiteHeader";
import ScrollProgressBar from "../components/ScrollProgressBar";
import { siteUrl } from "../lib/site"; // ← rămâne doar importul, fără const local

// app/layout.js
export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0b" },
  ],
};

export const metadata = {
  title: "Ovidiu.IT — Next.js + SEO",
  description: "Fast, SEO-ready websites that actually convert. Premium Next.js websites with automation and technical SEO.",
  openGraph: {
    title: "Ovidiu.IT — Next.js + SEO",
    description: "Fast, SEO-ready websites that actually convert. Premium Next.js websites with automation and technical SEO.",
    url: "https://ovidiu.it.com",
    siteName: "Ovidiu.IT",
    images: [
      {
        url: "https://ovidiu.it.com/og-default.png",
        width: 1200,
        height: 630,
        alt: "Ovidiu.IT Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ovidiu.IT — Next.js + SEO",
    description: "Fast, SEO-ready websites that actually convert. Premium Next.js websites with automation and technical SEO.",
    images: ["https://ovidiu.it.com/og-default.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0b0b0d" />
        {/* JSON-LD: Organization */}
        <Script
          id="jsonld-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Ovidiu.IT",
              url: "https://ovidiu.it.com",
              sameAs: [
                process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/company/ovidiuit/",
                "https://github.com/Ova-creator"
              ]
            })
          }}
        />
        {/* JSON-LD: WebSite */}
        <Script
          id="jsonld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Ovidiu.IT",
              url: "https://ovidiu.it.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://ovidiu.it.com/?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>

      <body className="min-h-screen flex flex-col">
        <div className="site-bg" aria-hidden="true" />
        <ScrollProgressBar />
        <a href="#main" className="skip-link">Skip to content</a>

        <div className="accent-bar" />
        <SiteHeader />

        <main id="main" className="flex-1 pb-28">{children}</main>

        <footer className="site-footer">
          <div className="max-w-6xl mx-auto w-full px-4 py-6 flex items-center justify-between gap-6">
            <span className="text-sm text-zinc-400">
              Ovidiu<span className="logo-dot">.IT</span> —{" "}
              <span className="logo-sub inline">In AI we trust</span>
            </span>
            <nav className="flex flex-wrap items-center gap-4 text-sm" aria-label="Footer">
              <a href="/services" className="footer-link">Services</a>
              <a href="/projects" className="footer-link">Projects</a>
              <a href="/about" className="footer-link">About</a>
              <a href="/contact" className="footer-link">Contact</a>
              <a href="/blog" className="footer-link">Blog</a>
              <a
                href={process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/company/ovidiuit/"}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                LinkedIn
              </a>
              <a href="https://wa.me/" className="footer-link">WhatsApp</a>
              <a href="mailto:digital@ovidiu.it.com" className="mailto">digital@ovidiu.it.com</a>
            </nav>
          </div>
        </footer>

        <div className="sticky-cta" aria-label="Quick actions">
          <a href="/contact" className="btn-primary" aria-label="Get a Quote">Get a Quote</a>
          <a href="https://wa.me/" className="btn-ghost" aria-label="WhatsApp">WhatsApp</a>
        </div>
      </body>
    </html>
  );
}
