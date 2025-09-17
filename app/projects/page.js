// app/projects/page.js
import ProjectThumb from "../../components/ProjectThumb";

export const metadata = {
  title: "Projects — Ovidiu.IT",
  description:
    "Selected networking and Linux projects: VLANs, ROAS, ACLs, and Linux basics.",
  alternates: { canonical: "/projects" },
};

const projects = [
  {
    title: "VLAN & Trunking Configuration",
    description:
      "Configured VLANs and Trunk links in Cisco Packet Tracer to segment networks and enable inter-switch communication. Verified with ping, traceroute, and Telnet.",
    tech: "Cisco Packet Tracer • VLANs • Trunking • Telnet",
  },
  {
    title: "ROAS Networking Project",
    description:
      "Implemented Router-on-a-Stick (ROAS) with inter-VLAN routing. Verified connectivity and routing rules across isolated VLANs.",
    tech: "Cisco Packet Tracer • ROAS • VLANs • Routing",
  },
  {
    title: "Office Network Segmentation with ACLs",
    description:
      "Designed an enterprise-like office topology with VLANs, ROAS, and directional ACLs. Ensured strict access control between departments.",
    tech: "Cisco Packet Tracer • ACLs • VLANs • ROAS",
  },
  {
    title: "Linux Basics: Filesystem & Commands",
    description:
      "Practiced Linux essentials: creating users, navigating the filesystem, and managing files with basic commands (mkdir, touch, rm, adduser).",
    tech: "Linux CLI • Users • Filesystem • Commands",
  },
];

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold title-lock">Featured Projects</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <article
            key={i}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm transition hover:bg-white/10"
          >
            <div className="mb-4 h-36 w-full overflow-hidden rounded-xl">
              <ProjectThumb title={p.title} subtitle={p.tech} />
            </div>
            <h2 className="mb-2 text-lg font-semibold text-white">{p.title}</h2>
            <p className="mb-3 text-sm leading-relaxed text-zinc-300">
              {p.description}
            </p>
            <p className="text-xs text-cyan-400">{p.tech}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
