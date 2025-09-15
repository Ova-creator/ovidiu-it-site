// app/contact/page.js
export const metadata = {
  title: "Contact — Ovidiu.IT",
  description: "Get in touch with Ovidiu Strinu. Email and LinkedIn for opportunities and collaborations.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Hero */}
      <section className="bg-grid rounded-2xl p-6 hero-card">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="title-lock">Contact</span>
        </h1>
        <p className="mt-2 text-zinc-300">
          The fastest way to reach me is by email. I usually reply within{" "}
          <strong>24–48 hours</strong>. For networking and opportunities, feel free to connect on LinkedIn.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <a href="mailto:digital@ovidiu.it" className="btn-primary">digital@ovidiu.it</a>
          <a
            href="https://www.linkedin.com/in/ovidiu-strinu/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            LinkedIn
          </a>
        </div>
      </section>

      {/* Info cards */}
      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="card p-5">
          <h2 className="text-lg font-semibold title-lock">What to include</h2>
          <ul className="mt-3 list-disc pl-6 text-sm text-zinc-400 space-y-1">
            <li>Short context about your project or role</li>
            <li>Timeline and preferred communication channel</li>
            <li>Any links or documents that help me prepare</li>
          </ul>
        </div>

        <div className="card p-5">
          <h2 className="text-lg font-semibold title-lock">Availability</h2>
          <p className="mt-3 text-sm text-zinc-400">
            I’m currently focused on learning and building my cybersecurity portfolio.
            I’m open to <strong>entry-level / internship</strong> opportunities and
            practical collaboration on labs, notes, or automation.
          </p>
        </div>
      </section>
    </div>
  );
}
