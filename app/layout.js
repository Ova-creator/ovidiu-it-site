// app/layout.js
import "./globals.css";
import Script from "next/script";
import SiteHeader from "../components/SiteHeader";
import ScrollProgressBar from "../components/ScrollProgressBar";

const siteUrl = "https://ovidiu.it.com";
const siteName = "Ovidiu.IT";
const siteDescription =
  "Fast, clean, SEO-ready websites in Next.js. Technical SEO and automations that actually save time.";

// SEO metadata
export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Next.js, SEO & Automation`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  openGraph: {
    title: `${siteName} — Next.js, SEO & Automation`,
    description: siteDescription,
    url: siteUrl,
    siteName: siteName,
    images: [
      {
        url: `${siteUrl}/og-image-1200x630.png`,
        width: 1200,
        height: 630,
        alt: `${siteName} — Websites that Perform & Convert`,
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Next.js, SEO & Automation`,
    description: siteDescription,
    images: [`${siteUrl}/og-image-1200x630.png`],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

// Viewport colors
export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon & OG image preload */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preload" as="image" href="/og-image-1200x630.png" />
      </head>
      <body className="bg-black text-white antialiased">
        <ScrollProgressBar />
        <SiteHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
