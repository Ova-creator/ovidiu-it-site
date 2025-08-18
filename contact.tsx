import Layout from '../components/Layout'
import { FormEvent } from 'react'

export default function Contact(){
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const fd = new FormData(form)
    const payload = Object.fromEntries(fd.entries())
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (res.ok) { alert('Sent. Check your inbox!'); form.reset() } else { alert('Failed to send. Try again.') }
  }

  return (
    <Layout>
      <section className="min-h-[60vh] bg-[#0f172a] text-white py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-6">Contact</h1>
          <p className="text-gray-300">
            Email me at <a href="mailto:digital@ovidiu.it.com" className="underline underline-offset-4">digital@ovidiu.it.com</a> or use the form below.
          </p>
          <form className="mt-8 space-y-4" onSubmit={submit as any}>
            <input type="text" name="company" className="hidden" tabIndex={-1} />
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input name="name" required className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input type="email" name="email" required className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm mb-1">Message</label>
              <textarea name="message" rows={5} required className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400" placeholder="What do you want to build?" />
            </div>
            <button className="px-6 py-3 rounded-xl font-semibold bg-cyan-400 text-black shadow-lg hover:shadow-cyan-400/50 transition" type="submit">Send message</button>
          </form>
        </div>
      </section>
    </Layout>
  )
}
