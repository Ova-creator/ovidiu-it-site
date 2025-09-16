// app/about/page.js
export const revalidate = 3600;

export const metadata = {
  title: "About — Ovidiu.IT",
  description:
    "About Ovidiu Strinu — learning path toward Ethical Hacking. Networking, Linux, and Automation.",
  alternates: { canonical: "/about" },
};


export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <section className="bg-grid rounded-2xl p-6 hero-card">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="title-lock">About</span>
        </h1>
        <p className="mt-2 text-zinc-300">
          I’m <strong>Ovidiu Strinu</strong>. I’m building a career in{" "}
          <strong>Cybersecurity &amp; Ethical Hacking</strong> by mastering the
          foundations: <strong>Networking</strong>, <strong>Linux</strong>, and{" "}
          <strong>Automation</strong>.
        </p>
      </section>

      <section className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="card p-4">
          <h2 className="text-lg font-semibold title-lock">Where I am now</h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-zinc-400 space-y-1">
            <li>Networking labs in Cisco Packet Tracer: VLANs, trunking, ROAS.</li>
            <li>Basic Linux: users/groups, permissions, services, journaling.</li>
            <li>Standard &amp; extended ACLs with validation (ping, traceroute, SSH).</li>
            <li>Clear documentation for each lab (steps, results, conclusions).</li>
          </ul>
        </div>

        <div className="card p-4">
          <h2 className="text-lg font-semibold title-lock">Why Ethical Hacking</h2>
          <p className="mt-2 text-sm text-zinc-400">
            I like problems that have proof. Ethical hacking gives me that: build a lab,
            try an idea, validate, document, repeat. My goal is an entry-level role
            where I can keep learning while delivering real, reproducible results.
          </p>
          <div className="mt-3 flex gap-3">
            <a href="/contact" className="btn-primary">Contact</a>
            <a
              href="https://www.linkedin.com/in/ovidiu-strinu/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
