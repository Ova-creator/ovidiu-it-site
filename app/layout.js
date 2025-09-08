// app/layout.js
import "./globals.css";
import Script from "next/script";
import dynamic from "next/dynamic";
import SiteHeader from "../components/SiteHeader";
import Footer from "../components/Footer";
import ScrollProgressBar from "../components/ScrollProgressBar";
import { siteUrl, abs } from "../lib/site";

const FloatingWhatsapp = dynamic(() => import("../components/FloatingWhatsapp"), {
  ssr: false,
  loading: () => null,
});

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B0B0F" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ovidiu.IT — Next.js, SEO & Automations",
    template: "%s | Ovidiu.IT",
  },
  description:
    "Affordable web design & SEO in the UK. Next.js expert building fast, secure, SEO-ready sites and time-saving automations.",
  alternates: { canonical: abs("/") },
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
        url: abs("/og/og-image-1200x630.png"),
        width: 1200,
        height: 630,
        alt: "Ovidiu.IT — Next.js, SEO & Automations",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ovidiu.IT — Next.js, SEO & Automations",
    description:
      "Fast, clean, SEO-ready websites in Next.js. Technical SEO and automations that actually save time.",
    images: [abs("/og/og-image-1200x630.png")],
  },
};

export default function RootLayout({ children }) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className="scroll-smooth">
      {/* Impact.com site verification */}
      <head>
        <meta
          name="impact-site-verification"
          content="REPLACE_WITH_IMPACT_CODE"
        />
      </head>

      <body className="min-h-screen flex flex-col">
        <ScrollProgressBar />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsapp />

        {/* JSON-LD Organization */}
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
              sameAs: ["https://www.linkedin.com/company/ovidiuit/"],
              logo: abs("/icon.png"),
            }),
          }}
        />

        {/* GA4 – injectăm doar dacă există ID-ul în env */}
        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { anonymize_ip: true });
              `}
            </Script>

            {/* Event delegation: ascultăm click-uri pe elemente cu data-ga-event */}
            <Script id="ga4-events" strategy="afterInteractive">
              {`
                document.addEventListener('click', function(e){
                  var el = e.target.closest('[data-ga-event]');
                  if(!el) return;
                  var name = el.getAttribute('data-ga-event');
                  var params = el.getAttribute('data-ga-params');
                  try { params = params ? JSON.parse(params) : {}; } catch(_) { params = {}; }
                  if (window.gtag) { gtag('event', name, params); }
                }, { passive: true });
              `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
