// app/learning/page.js
export const revalidate = 3600;

export const metadata = {
  title: "Learning — Roadmap to Ethical Hacking",
  description:
    "My personal roadmap: Networking, Linux, and Automation foundations, moving step by step into Ethical Hacking.",
  alternates: { canonical: "/learning" },
};

function Check({ children }) {
  return (
    <li className="flex gap-2">
      <span className="mt-0.5 h-4 w-4 rounded-full border border-cyan-400/50" />
      <span className="text-sm text-zinc-300">{children}</span>
    </li>
  );
}

export default function LearningPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <header className="bg-grid rounded-2xl p-6 hero-card">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="title-lock">Learning Roadmap</span>
        </h1>
        <p className="mt-2 text-zinc-400">
          My step-by-step journey toward <strong>Ethical Hacking</strong> — strong foundations first, then offensive methodology.
        </p>
        <nav className="mt-4 flex flex-wrap gap-3">
          <a href="#now" className="btn-outline">Now</a>
          <a href="#plan" className="btn-outline">30/60/90 Plan</a>
          <a href="#tools" className="btn-outline">Tools</a>
          <a href="#routine" className="btn-outline">Daily Routine</a>
        </nav>
      </header>

      <section id="now" className="mt-10">
        <h2 className="section-title title-lock">What I’m learning now</h2>
        <hr className="hr-glow mb-4" />
        <div className="grid gap-6 md:grid-cols-3">
          <div className="card p-4">
            <h3 className="font-medium">Networking</h3>
            <ul className="mt-2 space-y-2">
              <Check>VLANs, trunking (802.1Q), and ROAS configurations</Check>
              <Check>Standard &amp; extended ACLs with correct ordering</Check>
              <Check>Validation with ping, traceroute, SSH, DNS</Check>
            </ul>
          </div>
          <div className="card p-4">
            <h3 className="font-medium">Linux</h3>
            <ul className="mt-2 space-y-2">
              <Check>Users, groups, permissions, and sudoers</Check>
              <Check>Systemd services, journaling, log triage</Check>
              <Check>Basic firewalls: iptables / nftables</Check>
            </ul>
          </div>
          <div className="card p-4">
            <h3 className="font-medium">Automation</h3>
            <ul className="mt-2 space-y-2">
              <Check>Small scripts to speed up verification</Check>
              <Check>Clear notes and reproducible steps</Check>
              <Check>Workflow optimizations (task runners, aliases)</Check>
            </ul>
          </div>
        </div>
      </section>

      <section id="plan" className="mt-12">
        <h2 className="section-title title-lock">30/60/90 Day Plan</h2>
        <hr className="hr-glow mb-4" />
        <div className="grid gap-6 md:grid-cols-3">
          <div className="card p-4">
            <h3 className="font-medium">First 30 days — Foundations</h3>
            <ul className="mt-2 list-disc pl-5 text-sm text-zinc-400 space-y-1">
              <li>Solidify VLAN/Trunk/ROAS with 3 documented labs.</li>
              <li>Linux basics: users, permissions, services.</li>
              <li>SSH-only management + mini hardening checklist.</li>
            </ul>
          </div>
          <div className="card p-4">
            <h3 className="font-medium">Days 31–60 — Security focus</h3>
            <ul className="mt-2 list-disc pl-5 text-sm text-zinc-400 space-y-1">
              <li>ACL scenarios with precise allow/deny rules.</li>
              <li>Linux firewall + journaling filters.</li>
              <li>Automation: script to run validations &amp; export results.</li>
            </ul>
          </div>
          <div className="card p-4">
            <h3 className="font-medium">Days 61–90 — Ethical Hacking intro</h3>
            <ul className="mt-2 list-disc pl-5 text-sm text-zinc-400 space-y-1">
              <li>Offensive methodology: recon → exploit basics → report.</li>
              <li>Tools: nmap, ffuf, Hydra, Burp (community edition).</li>
              <li>2 complete write-ups for offensive labs.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="tools" className="mt-12">
        <h2 className="section-title title-lock">Tools I use right now</h2>
        <hr className="hr-glow mb-4" />
        <div className="grid gap-6 md:grid-cols-3">
          <div className="card p-4">
            <h3 className="font-medium">Networking &amp; Traffic</h3>
            <ul className="mt-2 list-disc pl-5 text-sm text-zinc-400 space-y-1">
              <li>Cisco Packet Tracer (switching &amp; routing labs)</li>
              <li>Wireshark (filters, packet walkthroughs)</li>
              <li>nmap (host discovery, basic scans)</li>
            </ul>
          </div>
          <div className="card p-4">
            <h3 className="font-medium">Linux &amp; Shell</h3>
            <ul className="mt-2 list-disc pl-5 text-sm text-zinc-400 space-y-1">
              <li>Debian/Ubuntu, systemd, journald</li>
              <li>OpenSSH, sudoers, iptables/nftables</li>
              <li>Bash, small Python scripts</li>
            </ul>
          </div>
          <div className="card p-4">
            <h3 className="font-medium">Automation &amp; Workflow</h3>
            <ul className="mt-2 list-disc pl-5 text-sm text-zinc-400 space-y-1">
              <li>Task runners / simple Make-like scripts</li>
              <li>VS Code, Git, Markdown/Notion for notes</li>
              <li>Burp (community), ffuf, Hydra — learning phase</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="routine" className="mt-12">
        <h2 className="section-title title-lock">Daily Routine (60–90 min)</h2>
        <hr className="hr-glow mb-4" />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-4">
            <h3 className="font-medium">Practice</h3>
            <ul className="mt-2 list-disc pl-5 text-sm text-zinc-400 space-y-1">
              <li>30–45 min lab (networking or Linux) with validation &amp; screenshots.</li>
              <li>15–20 min writing clear notes.</li>
              <li>10–15 min review/refactor from yesterday’s work.</li>
            </ul>
          </div>
          <div className="card p-4">
            <h3 className="font-medium">Delivery standard</h3>
            <ul className="mt-2 list-disc pl-5 text-sm text-zinc-400 space-y-1">
              <li>Each lab has: purpose → steps → results → conclusion.</li>
              <li>Only verifiable labs go into the portfolio.</li>
              <li>Clarity improves every iteration (naming, screenshots, diagrams).</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
