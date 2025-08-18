/* eslint-disable @next/next/no-img-element */
import Script from 'next/script'
import Layout from '../components/Layout'

export default function Home() {
  const ld = {
    "@context":"https://schema.org",
    "@type":"ProfessionalService",
    name:"Ovidiu Strinu — Digital Growth & Automation",
    url:"https://ovidiu.it.com/",
    email:"digital@ovidiu.it.com",
    areaServed:"EU/UK",
    serviceType:["SEO","Framer Websites","AI Automation"],
    sameAs:["https://www.linkedin.com/in/ovidiustrinu"]
  };

  return (
    <Layout>
      <Script id="ld-json" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/keyboard-bg.jpg')] bg-cover bg-center opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#0f172a]/70 to-[#0ea5e9]/40" />
        </div>

        <div className="relative z-10 text-center max-w-3xl px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
            SEO. Framer Websites. AI Automations.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-200">
            Clean design, search visibility, and automated workflows that remove repetitive tasks.
            Launch faster. Rank higher. Work smarter.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <a href="mailto:digital@ovidiu.it.com" className="px-6 py-3 rounded-xl font-semibold bg-cyan-400 text-black shadow-lg hover:shadow-cyan-400/50 transition">
              Book a Free Strategy Call
            </a>
            <a href="/contact" className="px-6 py-3 rounded-xl font-semibold border border-white/40 hover:bg-white/10 transition">
              Get a Quote
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="relative bg-[#0b1222] text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Services built for speed & growth</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              ["Framer Websites","Lightning-fast one-pagers or full sites. Clean UI, strong UX, optimized for conversions."],
              ["Real SEO","Technical, on-page & local SEO. Schema, sitemaps, indexing, and a content plan you can execute."],
              ["AI Automation","Zapier/Make flows, lead routing, reply-assist, reporting & CRM hygiene—without busywork."]
            ].map(([title, text], i) => (
              <div key={i} className="rounded-2xl border border-white/10 p-6 bg-white/5 backdrop-blur">
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-gray-300">{text}</p>
                <a className="inline-block mt-4 text-cyan-400 underline underline-offset-4" href="/services">Learn more</a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
