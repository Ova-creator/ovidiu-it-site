// components/Footer.js
export default function Footer() {
  const year = new Date().getFullYear();
  const li = "https://www.linkedin.com/in/ovidiu-strinu-b94ab51b2";

  return (
    <footer className="footer-accent border-t border-white/10">
      <div className="container flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-zinc-300 text-sm">© {year} Ovidiu Strinu</p>
          <p className="text-zinc-500 text-xs">Cybersecurity • Networking • Linux</p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={li}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm text-zinc-200 hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-[0_0_10px_rgba(0,229,255,0.35)] transition"
            aria-label="LinkedIn Profile — opens in a new tab"
          >
            {/* LinkedIn minimal icon */}
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path fill="currentColor" d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V24h-4V8.5zm7.5 0h3.84v2.11h.05c.53-.95 1.84-1.95 3.79-1.95 4.05 0 4.8 2.66 4.8 6.12V24h-4v-6.84c0-1.63-.03-3.74-2.28-3.74-2.28 0-2.63 1.78-2.63 3.62V24h-4V8.5z"/>
            </svg>
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
