// app/layout.js
import "./globals.css";
import Navbar from "../components/Navbar";
import SITE from "../lib/site";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Cybersecurity & Ethical Hacking`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Cybersecurity & Ethical Hacking`,
    description: SITE.description,
    images: [
      {
        url: SITE.ogImage, // /og/og-default.png (served absolute via metadataBase)
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Ovidiu.IT — Cybersecurity & Ethical Hacking Portfolio",
      },
    ],
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Cybersecurity & Ethical Hacking`,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    // completează dacă ai coduri:
    // google: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    // other: { me: ["mailto:digital@ovidiuit.com"] },
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gradient-to-b from-[#0f172a] to-[#0a0f1c] text-white antialiased">
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto px-6">{children}</main>

        {/* Divider animat (opțional) */}
        <div className="footer-divider" />

        <footer className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-zinc-400">
              © {new Date().getFullYear()} Ovidiu Strinu
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/ovidiu-strinu/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                LinkedIn
              </a>
              <a href="/learning" className="btn-primary">Skills</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
