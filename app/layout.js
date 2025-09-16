import "./globals.css";
import Navbar from "../components/Navbar";
import { SITE_URL } from "../lib/site";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Ovidiu.IT — Cybersecurity & Ethical Hacking", template: "%s | Ovidiu.IT" },
  description:
    "Networking • Linux • Automation — portfolio of Ovidiu Strinu. Labs, notes, and roadmap to Ethical Hacking.",
  openGraph: {
    title: "Ovidiu.IT — Cybersecurity & Ethical Hacking",
    description:
      "Networking • Linux • Automation — portfolio of Ovidiu Strinu.",
    url: SITE_URL,
    siteName: "Ovidiu.IT",
    images: [
      {
        url: `${SITE_URL}/og-default.png`,   // ✅ absolut, PNG static
        width: 1200,
        height: 630,
        alt: ">_ Ovidiu.IT",
        type: "image/png",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ovidiu.IT — Cybersecurity & Ethical Hacking",
    description:
      "Networking • Linux • Automation — portfolio of Ovidiu Strinu.",
    images: [`${SITE_URL}/og-default.png`],  // ✅ absolut
  },
  alternates: { canonical: "/" },
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0b1220] text-zinc-100 antialiased flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <div className="footer-divider" />
        <footer className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-zinc-400">© {new Date().getFullYear()} Ovidiu Strinu</p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/ovidiu-strinu/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                LinkedIn
              </a>
              <a href="/learning" className="btn-primary">🚀 Roadmap</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
