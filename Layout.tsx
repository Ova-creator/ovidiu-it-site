import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-white">
      <header className="sticky top-0 z-50 bg-[#0f172a]/80 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-bold">Ovidiu</Link>
          <nav className="flex gap-4 text-sm">
            <Link href="/services">Services</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="bg-[#0f172a] text-gray-400 py-8 text-center text-sm">
        © {new Date().getFullYear()} Ovidiu Strinu. SEO • Framer Websites • AI Automation.
      </footer>
    </div>
  )
}
