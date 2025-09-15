// app/layout.js
import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Ovidiu.IT — Cybersecurity & Ethical Hacking Portfolio",
  description: "Kali-inspired portfolio: networking labs, Linux hardening, and automation for ethical hacking.",
  openGraph: {
    title: "Ovidiu.IT — Cybersecurity & Ethical Hacking Portfolio",
    description: "Kali-inspired portfolio: networking labs, Linux hardening, and automation for ethical hacking.",
    url: "https://ovidiu.it/",
    siteName: "Ovidiu.IT",
    images: [
      {
        url: "/og-default.png", // ✅ static image
        width: 1200,
        height: 630,
        alt: "Ovidiu.IT — Cybersecurity & Ethical Hacking Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ovidiu.IT — Cybersecurity & Ethical Hacking Portfolio",
    description: "Kali-inspired portfolio: networking labs, Linux hardening, and automation for ethical hacking.",
    images: ["/og-default.png"], // ✅ static image
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
