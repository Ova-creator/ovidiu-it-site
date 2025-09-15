// app/page.js
import Image from "next/image";
import { getFeaturedProjects } from "../lib/notion";
import { Shield, Network, Terminal } from "lucide-react";
import ImageFallback from "../components/ImageFallback";

export const revalidate = 60; // cache fetch Notion 1 min

function isExternal(url) {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function ProjectMini({ project: p }) {
  const href = p?.url || null;

  const Inner = (
    <>
      {p?.cover ? (
        <div className="relative mb-3 h-32 w-full overflow-hidden rounded-xl bg-zinc-900/50">
          <Image
            src={p.cover}
            alt={`${p.title || "Project"} cover`}
            fill
            className="object-cover opacity-90"
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            priority={false}
          />
        </div>
      ) : (
        <ImageFallback className="mb-3 h-32 w-full" />
      )}

      <h3 className="text-base font-medium">{p?.title || "Untitled"}</h3>
      {p?.status && (
        <span className="mt-2 inline-block rounded-md border border-white/10 px-2 py-0.5 text-xs text-zinc-300">
          {p.status}
        </span>
      )}
    </>
  );

  if (href) {
    if (isExternal(href)) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="card hover:shadow-lg transition"
        >
          {Inner}
        </a>
      );
    }
    return (
      <a href={href} className="card hover:shadow-lg transition">
        {Inner}
      </a>
    );
  }
  return <div className="card hover:shadow-lg transition">{Inner}</div>;
}

export const metadata = {
  title: "Ovidiu.IT — Cybersecurity & Ethical Hacking Portfolio",
  description:
    "Kali-inspired portfolio: networking labs, Linux hardening, and automation for ethical hacking. Real projects, real progress.",
  alternates: { canonical: "/" },
};

function JsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ovidiu Strinu",
    url: "https://ovidiu.it/",
    jobTitle: "Cybersecurity & Ethical Hacking",
    sameAs: ["https://www.linkedin.com/in/ovidiu-strinu/"],
    knowsAbout: ["Networking", "Linux", "Automation", "Ethical Hacking"],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default async function HomePage() {
  const featured = await getFeaturedProjects(3);

  return (
    <>
      <JsonLd />

      {/* HERO */}
      <section className="bg-grid container mx-auto px-4 pt-16 pb-12 text-center rounded-2xl hero-card">
        <h1 className="text-4xl font-extrabold tracking-tight">
          <span className="title-lock">Cybersecurity &amp; Ethical Hacking</span>
        </h1>
        <p className="mx-auto mt-3 max-w-3xl text-zinc-300">
          Kali-style portfolio focused on <strong>VLANs/Trunking, ROAS, ACLs</strong>,{" "}
          <strong>Linux hardening &amp; services</strong>, and <strong>automation</strong>.
          Hands-on labs, clean documentation, measurable progress.
        </p>

        <div className="mt-5">
          <a
            href="/learning"
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/50 px-4 py-1.5 text-sm text-cyan-300 hover:border-cyan-400/70"
            style={{ boxShadow: "0 0 12px rgba(56,189,248,0.35)" }}
          >
            🚀 Roadmap to Ethical Hacking
          </a>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a href="/projects" className="btn-outline">View Projects</a>
          <a
            href="https://www.linkedin.com/in/ovidiu-strinu/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            LinkedIn
          </a>
          <a href="/contact" className="btn-primary">Contact</a>
        </div>
      </section>

      {/* PILONI — adăugăm un H2 invizibil ca ordinea heading-urilor să fie corectă */}
      <section className="bg-grid container mx-auto px-4 py-10 rounded-2xl mt-8">
        <h2 className="sr-only">Core Pillars</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="card hover:shadow-lg transition">
            <div className="mb-2 flex items-center gap-2">
              <Network className="h-5 w-5 opacity-80" aria-hidden="true" />
              <h3 className="text-lg font-semibold">Networking</h3>
            </div>
            <p className="mt-1 text-sm text-zinc-400">
              VLANs, trunking, ROAS, ACLs — verified with ping, traceroute, Telnet/SSH, DNS.
            </p>
          </div>

          <div className="card hover:shadow-lg transition">
            <div className="mb-2 flex items-center gap-2">
              <Terminal className="h-5 w-5 opacity-80" aria-hidden="true" />
              <h3 className="text-lg font-semibold">Linux</h3>
            </div>
            <p className="mt-1 text-sm text-zinc-400">
              Users/groups, permissions, firewalls, logging, and baseline hardening.
            </p>
          </div>

          <div className="card hover:shadow-lg transition">
            <div className="mb-2 flex items-center gap-2">
              <Shield className="h-5 w-5 opacity-80" aria-hidden="true" />
              <h3 className="text-lg font-semibold">Automation</h3>
            </div>
            <p className="mt-1 text-sm text-zinc-400">
              Small scripts &amp; integrations to speed up checks and reporting.
            </p>
          </div>
        </div>
      </section>

      {/* LATEST FEATURED */}
      <section className="container mx-auto px-4 pb-14 mt-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="section-title title-lock">Latest Featured</h2>
          <a href="/projects" className="btn-outline">View all</a>
        </div>
        <hr className="hr-glow mb-6" />

        {featured && featured.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProjectMini key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-white/10 p-4 text-sm text-zinc-400">
            No featured projects yet. Tick the <strong>Checkbox</strong> in your Notion Projects DB to mark items as Featured.
          </div>
        )}
      </section>
    </>
  );
}
