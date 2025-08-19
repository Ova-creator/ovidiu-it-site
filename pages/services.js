import Head from 'next/head'
import Navbar from '../components/Navbar'

export default function Services() {
  return (
    <>
      <Head>
        <title>Our Services – Ovidiu.IT</title>
        <meta name="description" content="Discover the services Ovidiu.IT offers: SEO, automation and Framer-based website development." />
      </Head>
      <Navbar />
      <main className="p-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <ul className="text-lg text-gray-300 space-y-2">
          <li>✔️ Full SEO optimization</li>
          <li>✔️ Web Automation Systems</li>
          <li>✔️ Lightning-fast Framer Websites</li>
        </ul>
      </main>
    </>
  );
}