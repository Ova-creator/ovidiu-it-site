import Layout from '../components/Layout'
export default function Services(){
  const items=[
    {title:"Framer Websites", bullets:["Mobile-first, Core Web Vitals","Clear copy & CTAs","Deployed on Vercel"]},
    {title:"Real SEO", bullets:["Keyword & intent mapping","Schema & metadata done right","Local SEO & GMB"]},
    {title:"AI Automation", bullets:["Lead → CRM → Email follow-ups","Auto-reports & alerts","Docs & checklists"]},
  ];
  return (
    <Layout>
      <section className="min-h-[60vh] bg-[#0b1222] text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-8">Services</h1>
          <div className="grid md:grid-cols-3 gap-6">
            {items.map((it, idx)=>(
              <div key={idx} className="rounded-2xl border border-white/10 p-6 bg-white/5 backdrop-blur">
                <h3 className="text-xl font-semibold">{it.title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-gray-300 list-disc list-inside">
                  {it.bullets.map((b,i)=>(<li key={i}>{b}</li>))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
