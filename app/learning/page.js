// app/learning/page.js
export const metadata = {
  title: "Skills — Ovidiu.IT",
  description:
    "Core skills across Networking, Linux, and Security tools — focused and hands-on.",
  alternates: { canonical: "/learning" },
};

function Pill({ title, items }) {
  return (
    <div className="card rounded-2xl p-5">
      <h3 className="text-lg font-semibold text-zinc-100">{title}</h3>
      <ul className="mt-2 space-y-1 text-sm text-zinc-300">
        {items.map((t, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-cyan-400">•</span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SkillsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="hero-card rounded-2xl px-6 py-6 mb-6">
        <h1 className="text-3xl font-bold title-lock">Skills</h1>
        <p className="mt-2 max-w-2xl text-zinc-300">
          Practical capabilities I’m using to build security-focused projects.
          Scope is narrow and results-oriented.
        </p>
      </section>

      <div className="grid gap-6 sm:grid-cols-2">
        <Pill
          title="Networking"
          items={[
            "VLAN design & Trunk links",
            "Inter-VLAN routing (ROAS)",
            "ACLs for segmented access",
            "Validation: ping, traceroute, Telnet",
          ]}
        />
        <Pill
          title="Linux"
          items={[
            "Users, groups, permissions",
            "Filesystem & process basics",
            "Service management & logs",
            "Shell fluency (mkdir, touch, grep, etc.)",
          ]}
        />
        <Pill
          title="Security Tools"
          items={[
            "Nmap essentials (host/service discovery)",
            "Basic detection / fail-patterns",
            "Small automations for checks & reporting",
          ]}
        />
        <Pill
          title="Approach"
          items={[
            "Hands-on labs with clear verification",
            "Document only what works",
            "Keep scope tight, iterate steadily",
          ]}
        />
      </div>

      <div className="mt-8 card rounded-2xl p-5">
        <h2 className="text-base font-semibold text-zinc-100">
          What I’m focusing on next
        </h2>
        <p className="text-sm text-zinc-300">
          More advanced routing topics and stronger Linux administration. Once a
          module is validated, it becomes a case study on the Projects page.
        </p>
      </div>
    </div>
  );
}
