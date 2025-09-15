// app/layout.js
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://ovidiu.it"),
  title: {
    default: "Ovidiu.IT — Cybersecurity & Ethical Hacking",
    template: "%s | Ovidiu.IT",
  },
  description:
    "Networking • Linux • Automation — portfolio of Ovidiu Strinu. Labs, notes, and roadmap to Ethical Hacking.",
  openGraph: { siteName: "Ovidiu.IT", type: "website", locale: "en_GB" },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* BODY ca flex-col ca să țină footerul jos */}
      <body className="min-h-screen bg-[#0b1220] text-zinc-100 antialiased flex flex-col">
        {/* NAVBAR */}
        <header className="sticky top-0 z-40 bg-[#0b1220]/80 backdrop-blur">
          <nav className="container mx-auto flex items-center justify-between px-4 py-3">
            <a href="/" className="flex items-center gap-2">
              <span className="text-white font-mono text-lg">&gt;_</span>
              <span className="font-semibold">Ovidiu.IT</span>
              <span className="hidden sm:inline text-xs text-cyan-300/80">
                Cybersecurity • Networking • Linux
              </span>
            </a>

            <div className="flex items-center gap-5">
              <a href="/" className="hover:opacity-90">Home</a>
              <a href="/projects" className="hover:opacity-90">Projects</a>
              <a href="/learning" className="hover:opacity-90">Learning</a>
              <a href="/about" className="hover:opacity-90">About</a>
              <a href="/contact" className="btn-primary">Contact</a>
            </div>
          </nav>
          {/* Animated divider under navbar */}
          <div className="nav-divider" />
        </header>

        {/* CONTENT */}
        <main className="flex-1">{children}</main>

        {/* Animated divider before footer */}
        <div className="footer-divider" />

        {/* FOOTER */}
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
              <a href="/learning" className="btn-primary">
                 Roadmap
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
