"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

function NavItem({ href, children }) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname.startsWith(href));
  return (
    <Link href={href} className={`link ${active ? "link-active" : ""}`}>
      {children}
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0b1324cc] backdrop-blur">
      <div className="container flex items-center justify-between py-3">
        {/* Logo + lacăt + tagline */}
        <Link href="/" className="brand group flex items-center gap-2">
          {/* Lacăt mic, cyan */}
          <span className="brand-lock inline-flex h-5 w-5 items-center justify-center" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-[var(--accent)]">
              <path
                d="M7 10V8a5 5 0 0 1 10 0v2m-9 0h8a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Zm5 4v2"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="text-xl font-semibold">Ovidiu.IT</span>
          <span className="text-xs text-[var(--accent)]">Cybersecurity • Networking • Linux</span>
          <span className="sr-only">Home</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <NavItem href="/">Home</NavItem>
          <NavItem href="/projects">Projects</NavItem>
          <NavItem href="/learning">Learning</NavItem>
          <NavItem href="/about">About</NavItem>
          <Link href="/contact" className="btn-primary">Contact</Link>
        </nav>

        {/* Burger */}
        <button
          aria-label="Open menu"
          className="md:hidden btn-ghost"
          onClick={() => setOpen(true)}
        >
          Menu
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur" onClick={() => setOpen(false)}>
          <div
            className="absolute right-0 top-0 h-full w-80 border-l border-white/10 bg-[#0f172a] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="text-lg font-semibold">Menu</span>
              <button className="btn-ghost" onClick={() => setOpen(false)}>Close</button>
            </div>
            <div className="grid gap-3">
              <NavItem href="/">Home</NavItem>
              <NavItem href="/projects">Projects</NavItem>
              <NavItem href="/learning">Learning</NavItem>
              <NavItem href="/about">About</NavItem>
              <NavItem href="/blog">Blog</NavItem>
              <Link href="/contact" className="btn-primary">Contact</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
