import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Ovidiu | SEO, Automation & Framer</title>
        <meta name="description" content="We build lightning-fast websites with SEO, Automation and Framer. Get in touch with us!" />
        <meta property="og:title" content="Ovidiu | SEO, Automation & Framer" />
        <meta property="og:description" content="Professional web solutions with zero hassle." />
        <meta property="og:image" content="/cover.jpg" />
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to Ovidiu.IT 🎯</h1>
        <p className="text-xl mb-4">We deliver SEO, Automation & Framer websites with zero setup costs.</p>
        <img src="/cover.jpg" alt="Background" className="rounded-lg shadow-lg w-full max-w-3xl" />
      </main>
    </>
  )
}
