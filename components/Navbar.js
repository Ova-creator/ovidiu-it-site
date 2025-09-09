"use client";

import Link from "next/link";
import { useState } from "react";
import { getSafeLinkedInUrl } from "../lib/safeLinkedInUrl";

const linkedInUrl = getSafeLinkedInUrl(process.env.NEXT_PUBLIC_LINKEDIN_URL);

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo + tagline */}
        <Link href="/" className="flex items-center gap-3">
          <span className="text-xl font-semibold">Ovidiu.IT</span>
          <span className="text-xs text-pink-400">SEO • Automation • Next.js</span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="hover:opacity-80">Home</Link>
          <Link href="/services" className="hover:opacity-80">Services</Link>
          <Link href="/projects" className="hover:opacity-80">Projects</Link>
          <Link href="/about" className="hover:opacity-80">About</Link>
          <Link href="/tools" className="hover:opacity-80 flex items-center gap-1">
            Tools <span className="badge-new">New</span>
          </Link>
          <Link href="/contact" className="btn-primary">Get a Quote</Link>
          <Link href="/blog" className="btn-ghost">Blog</Link>

          {/* LinkedIn — extern, conform Link Policy */}
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:opacity-80"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(linkedInUrl, "_blank", "noopener,noreferrer");
            }}
          >
            LinkedIn
          </a>
        </nav>

        {/* Burger mobil */}
        <button
          aria-label="Open menu"
          className="md:hidden rounded-lg border border-white/10 p-2"
          onClick={() => setOpen(true)}
        >
          <span className="i-lucide-menu h-5 w-5" />
        </button>
      </div>

      {/* Drawer mobil */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur">
          <div className="absolute right-0 top-0 h-full w-80 border-l border-white/10 bg-neutral-900 p-6">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-lg font-semibold">Menu</span>
              <button
                aria-label="Close menu"
                className="rounded-lg border border-white/10 p-2"
                onClick={() => setOpen(false)}
              >
                <span className="i-lucide-x h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-3">
              <Link href="/" onClick={() => setOpen(false)} className="block py-2">Home</Link>
              <Link href="/services" onClick={() => setOpen(false)} className="block py-2">Services</Link>
              <Link href="/projects" onClick={() => setOpen(false)} className="block py-2">Projects</Link>
              <Link href="/about" onClick={() => setOpen(false)} className="block py-2">About</Link>
              <Link href="/tools" onClick={() => setOpen(false)} className="block py-2">Tools</Link>
              <Link href="/contact" onClick={() => setOpen(false)} className="block py-2">Contact</Link>

              {/* LinkedIn — extern */}
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-2"
                onClick={() => setOpen(false)}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
