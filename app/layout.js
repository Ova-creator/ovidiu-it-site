// app/layout.js
import "./globals.css";
import Navbar from "../components/Navbar";
import SITE from "../lib/site"; // { name, url, ogImage, description }

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Cybersecurity & Ethical Hacking`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description, // "Cybersecurity & Ethical Hacking ... Networking and Linux ..."
  alternates: { canonical: "/" },

  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Cybersecurity & Ethical Hacking`,
    description: SITE.description,
    images: [
      {
        // format recomandat: relativ + metadataBase => URL absolut corect
        url: SITE.ogImage,            // "/og/og-default.png"
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
    images: [SITE.ogImage], // "/og/og-default.png"
  },

  icons: {
    icon: [
      { url: '/favicon.ico?v=2' },
      { url: '/favicon-32x32.png?v=2', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png?v=2', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png?v=2', sizes: '180x180' }],
    other: [{ rel: 'mask-icon', url: '/safari-pinned-tab.svg?v=2', color: '#0ea5b7' }],
  },
  openGraph: {
    // …
    images: [{ url: 'https://ovidiu.it.com/og/og-default.png?v=2', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://ovidiu.it.com/og/og-default.png?v=2'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gradient-to-b from-[#0f172a] to-[#0a0f1c] text-white antialiased">
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto px-6">{children}</main>

        {/* Divider animat aliniat cu brand-ul */}
        <div className="footer-divider" />

        {/* Footer simplu + CTA LinkedIn / Skills */}
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
              {/* Păstrăm ruta /learning, etichetată Skills */}
              <a href="/learning" className="btn-primary">Skills</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
