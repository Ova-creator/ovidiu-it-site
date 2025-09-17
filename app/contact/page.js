// app/contact/page.js
export const metadata = {
  title: "Contact — Ovidiu.IT",
  description: "Get in touch for collaborations, internships, or junior roles.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="hero-card rounded-2xl px-6 py-8">
        <h1 className="text-3xl font-bold title-lock">Contact</h1>

        <p className="mt-3 max-w-2xl text-zinc-200">
          Email:{" "}
          <a className="underline hover:text-cyan-300" href="mailto:digital@ovidiuit.com">
            digital@ovidiuit.com
          </a>
          <br />
          LinkedIn:{" "}
          <a
            className="underline hover:text-cyan-300"
            href="https://www.linkedin.com/in/ovidiu-strinu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            add me for opportunities and collaborations
          </a>
          .
        </p>

        <div className="mt-5">
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
    </div>
  );
}
