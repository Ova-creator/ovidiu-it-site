// app/about/page.js
export const metadata = {
  title: "About — Ovidiu.IT",
  description:
    "Ovidiu Strinu — Cybersecurity & Ethical Hacking portfolio. Networking labs, Linux practice, and entry-level career goals.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* HERO */}
      <section className="hero-card rounded-2xl px-6 py-8">
        <h1 className="text-3xl font-bold title-lock">About</h1>
        <p className="mt-3 max-w-3xl text-zinc-200">
          I’m <strong>Ovidiu Strinu</strong>. I’m building a career in{" "}
          <strong>Cybersecurity & Ethical Hacking</strong> by mastering the
          foundations: <strong>Networking</strong> and <strong>Linux</strong>.
          I like projects with clear verification, clean documentation, and
          measurable progress.
        </p>
      </section>

      {/* CARDS */}
      <section className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="card rounded-2xl p-5">
          <h2 className="mb-2 text-lg font-semibold text-zinc-100">
            Where I am now
          </h2>
          <ul className="mt-2 space-y-2 text-sm text-zinc-300">
            <li>• Networking labs in Cisco Packet Tracer: VLANs, trunking, ROAS.</li>
            <li>• Basic Linux: users/groups, permissions, services, logs.</li>
            <li>• Standard & extended ACLs with validation (ping, traceroute, SSH).</li>
            <li>• Clear write-ups for each lab (steps, results, conclusions).</li>
          </ul>
        </div>

        <div className="card rounded-2xl p-5">
          <h2 className="mb-2 text-lg font-semibold text-zinc-100">
            Why Ethical Hacking
          </h2>
          <p className="mt-2 text-sm text-zinc-300">
            I like problems that have proof. Ethical hacking gives me that: build
            a lab, try an idea, validate, document, repeat. My goal is an
            entry-level role where I can keep learning while delivering
            reproducible results.
          </p>
        </div>
      </section>

      {/* NEW SECTION */}
      <section className="mt-8 card rounded-2xl p-5">
        <h2 className="mb-2 text-lg font-semibold text-zinc-100">
          What I’m looking for
        </h2>
        <ul className="mt-2 space-y-2 text-sm text-zinc-300">
          <li>• Entry-level opportunities in cybersecurity or IT support.</li>
          <li>• A place where I can apply networking & Linux skills hands-on.</li>
          <li>• A team that values learning, documentation, and growth.</li>
        </ul>
      </section>
    </div>
  );
}
