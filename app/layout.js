// app/layout.js
import "./globals.css";
import Script from "next/script";
import SiteHeader from "../components/SiteHeader";
import ScrollProgressBar from "../components/ScrollProgressBar";
import { siteUrl, abs } from "../lib/site";

// ———————————————————————————————————————
// Viewport (mutăm themeColor aici ca să scăpăm de warning-ul Next.js)
export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B0B0F" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

// ———————————————————————————————————————
// Metadata globală (Open Graph + Twitter folosesc PNG-ul static din /public/og/)
export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ovidiu.IT — Next.js, SEO & Automations",
    template: "%s | Ovidiu.IT",
  },
  description:
    "Affordable web design & SEO in the UK. Next.js expert building fast, secure, SEO-ready sites and smart automations.",
  alternates: {
    canonical: abs("/"),
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
      { url: "/android-chrome-192x192.png", sizes: "192x192" },
      { url: "/android-chrome-512x512.png", sizes: "512x512" },
    ],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg" }],
  },

  // — Open Graph (folosește PNG-ul static)
  openGraph: {
    type: "website",
    url: abs("/"),
    siteName: "Ovidiu.IT",
    title: "Ovidiu.IT — Next.js, SEO & Automations",
    description:
      "Fast, clean, SEO-ready websites in Next.js. Technical SEO and automations that actually save time.",
    locale: "en_GB",
    images: [
      {
        url: abs("/og/og-image-1200x630.png"), // <= asigură-te că există în /public/og/
        width: 1200,
        height: 630,
        alt: "Ovidiu.IT — Next.js, SEO & Automations",
        type: "image/png",
      },
    ],
  },

  // — Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@",
    creator: "@",
    title: "Ovidiu.IT — Next.js, SEO & Automations",
    description:
      "Fast, clean, SEO-ready websites in Next.js. Technical SEO and automations that actually save time.",
    images: [abs("/og/og-image-1200x630.png")], // PNG static
  },

  // Robots rămâne gestionat separat în app/robots.js (deja îl ai)
};

// ———————————————————————————————————————
// Root layout
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <ScrollProgressBar />
        <SiteHeader />

        <main>{children}</main>

        {/* JSON-LD global minim (opțional) */}
        <Script
          id="org-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Ovidiu.IT",
              url: siteUrl,
              sameAs: [
                "https://www.linkedin.com/company/ovidiuit/",
                // adaugă dacă ai și alte profile
              ],
              logo: abs("/icon.png"),
            }),
          }}
        />
      </body>
    </html>
  );
}
