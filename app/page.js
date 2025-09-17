// app/page.js
// Home — Clean & focused, based on mentor feedback
// - Mesaj scurt: cine ești + ce faci
// - CTA-uri: Projects / Skills / Contact
// - Fără roadmap, fără latest-labs (le mutăm în Projects curate ulterior)

export const metadata = {
  title: "Cybersecurity & Ethical Hacking Portfolio",
  description:
    "Focused on Networking and Linux. Selected, hands-on projects with clear results.",
  alternates: { canonical: "/" },
};
export default function HomePage() {
  return (
    <>
      {/* HERO SCURT ȘI CLAR */}
      <section className="bg-grid container mx-auto px-4 pt-16 pb-12 text-center rounded-2xl hero-card">
        <h1 className="text-4xl font-extrabold tracking-tight">
          <span className="title-lock">Cybersecurity & Ethical Hacking</span>
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-zinc-300">
          I’m building a career in security by mastering{" "}
          <strong>Networking</strong> and <strong>Linux</strong>. This portfolio
          highlights a few <strong>selected projects</strong> with measurable results.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a href="/projects" className="btn-primary">View Projects</a>
          {/* momentan lăsăm /learning; în Pasul 3 îl transformăm în SKILLS */}
          <a href="/learning" className="btn-outline">Skills</a>
          <a href="/contact" className="btn-outline">Contact</a>
        </div>
      </section>

      {/* MICRO-SECȚIUNE DE POZIȚIONARE (3 piloni — scurt) */}
      <section className="bg-grid container mx-auto px-4 py-10 rounded-2xl mt-8">
        <h2 className="sr-only">Focus pillars</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="card hover:shadow-lg transition">
            <h3 className="text-lg font-semibold">Networking</h3>
            <p className="mt-1 text-sm text-zinc-400">
              VLANs, inter-VLAN routing (ROAS), ACLs. Labs with clear topology and validation.
            </p>
          </div>

          <div className="card hover:shadow-lg transition">
            <h3 className="text-lg font-semibold">Linux</h3>
            <p className="mt-1 text-sm text-zinc-400">
              Users & permissions, services, logging, and firewall baselines.
            </p>
          </div>

          <div className="card hover:shadow-lg transition">
            <h3 className="text-lg font-semibold">Security Tools</h3>
            <p className="mt-1 text-sm text-zinc-400">
              Practical use of nmap, Suricata/Fail2Ban basics, and small automation helpers.
            </p>
          </div>
        </div>
      </section>

      {/* NOTE:
          - Nu mai tragem Featured din Notion pe Home (scăpăm de “prea multe detalii”).
          - Projects curate le afișăm organizat pe /projects în Pasul 2.
      */}
    </>
  );
}
