"use client";

import { useState } from "react";
import MobileMenu from "./MobileMenu";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="max-w-6xl mx-auto w-full px-4 h-16 flex items-center justify-between">
        <a href="/" className="logo-stack" aria-label="Ovidiu.IT Home">
          <span className="logo-line">Ovidiu<span className="logo-dot">.IT</span></span>
          <span className="logo-sub">In AI we trust</span>
        </a>

        {/* Nav desktop */}
        <nav className="hidden md:flex gap-6" aria-label="Primary">
          <a href="/" className="nav-link">Home</a>
          <a href="/services" className="nav-link">Services</a>
          <a href="/projects" className="nav-link">Projects</a>
          <a href="/about" className="nav-link">About</a>
          <a href="/blog" className="nav-link">Blog</a>
          <a href="/tools" className="nav-link">Tools</a>
          <a href="/contact" className="nav-link">Contact</a>
          

        </nav>

        {/* Burger (mobile) */}
        <button
          type="button"
          aria-label="Open menu"
          className="md:hidden rounded-lg border border-white/10 p-2"
          onClick={() => setOpen(true)}
        >
          {/* SVG hamburger, fără librării externe */}
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Drawer mobil */}
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
