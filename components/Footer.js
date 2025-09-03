// components/Footer.js
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black/60">
      <div className="mx-auto max-w-6xl px-4 py-3">
        {/* Top row */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">Ovidiu.IT</span>
            <span className="text-[11px] text-pink-400">Next.js • SEO • Automation</span>
          </div>
          <Link href="/contact" className="btn-ghost rounded-lg px-3 py-1.5 text-sm">
            Request a quote
          </Link>
        </div>

        {/* Middle row */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 text-xs md:text-sm">
          <nav className="flex flex-wrap items-center gap-3">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/services" className="hover:underline">Services</Link>
            <Link href="/projects" className="hover:underline">Projects</Link>
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/blog" className="hover:underline">Blog</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </nav>

          <div className="text-white/70">
            <p className="mb-1">What you get:</p>
            <ul className="space-y-0.5">
              <li>• Fast, SEO-ready websites</li>
              <li>• Clean code (Next.js + Vercel)</li>
              <li>• Automations that save time</li>
            </ul>
          </div>

          <div>
            <p className="mb-1 text-white/70">Find us</p>
            <a
              href="https://www.linkedin.com/company/ovidiuit/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-4 border-t border-white/10 pt-3 text-xs text-white/60">
          © {year} Ovidiu.IT — All rights reserved.
        </div>
      </div>
    </footer>
  );
}
