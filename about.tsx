import Layout from '../components/Layout'
export default function About(){
  return (
    <Layout>
      <section className="min-h-[60vh] bg-[#0f172a] text-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-6">About</h1>
          <p className="text-gray-300 leading-relaxed">
            I help businesses ship fast Framer websites, rank higher with real SEO, and automate workflows using AI.
            No fluff. Clean build, measurable outcomes, and a simple process.
          </p>
        </div>
      </section>
    </Layout>
  )
}
