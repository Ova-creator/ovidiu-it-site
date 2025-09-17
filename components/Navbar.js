// components/Navbar.js
"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // închide meniul când schimbă dimensiunea ecranului (ex. rotate)
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#0b1220]/80 backdrop-blur">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Brand */}
        <a href="/" className="flex items-center gap-2">
          <span className="text-white font-mono text-lg">&gt;_</span>
          <span className="font-semibold">Ovidiu.IT</span>
          <span className="hidden sm:inline text-xs text-cyan-300/80">
            Cybersecurity • Networking • Linux
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-5">
          <a href="/" className="hover:text-cyan-400">Home</a>
          <a href="/projects" className="hover:text-cyan-400">Projects</a>
          <a href="/learning" className="hover:text-cyan-400">Skills</a>
          <a href="/about" className="hover:text-cyan-400">About</a>
          <a href="/contact" className="btn-primary">Contact</a>
        </div>

        {/* Mobile burger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open ? "true" : "false"}
          className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 hover:border-white/20"
          onClick={() => setOpen((s) => !s)}
        >
          <span className="sr-only">Toggle navigation</span>
          <svg
            width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="text-zinc-200"
          >
            {open ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Linia animată sub navbar (rămâne identică) */}
      <div className="nav-divider" />

      {/* Mobile menu drawer */}
      {open && (
        <div className="lg:hidden border-t border-white/10 bg-[#0b1220]/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-2">
            <a href="/" className="py-2 hover:opacity-90" onClick={() => setOpen(false)}>Home</a>
            <a href="/projects" className="py-2 hover:opacity-90" onClick={() => setOpen(false)}>Projects</a>
            <a href="/learning" className="py-2 hover:opacity-90" onClick={() => setOpen(false)}>Skills</a>
            <a href="/about" className="py-2 hover:opacity-90" onClick={() => setOpen(false)}>About</a>
            <a href="/contact" className="btn-primary w-max" onClick={() => setOpen(false)}>Contact</a>
          </div>
        </div>
      )}
    </header>
  );
}
