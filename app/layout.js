// app/layout.js
import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  metadataBase: new URL("https://ovidiu.it"),
  title: { default: "Ovidiu.IT — Cybersecurity & Ethical Hacking", template: "%s | Ovidiu.IT" },
  description:
    "Networking • Linux • Automation — portfolio of Ovidiu Strinu. Labs, notes, and roadmap to Ethical Hacking.",
  openGraph: { siteName: "Ovidiu.IT", type: "website", locale: "en_GB" },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  icons: {
    icon: "/icon.svg",                 // favicon tab (SVG)
    apple: "/apple-icon.png",          // iOS home screen (PNG 180×180)
  },
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
