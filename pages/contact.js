import Head from 'next/head'
import Navbar from '../components/Navbar'

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact – Ovidiu.IT</title>
        <meta name="description" content="Get in touch with the Ovidiu.IT team for SEO, automation and web development solutions." />
      </Head>
      <Navbar />
      <main className="p-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-gray-300">Reach us at <a href="mailto:digital@ovidiu.it.com" className="text-blue-400 underline">digital@ovidiu.it.com</a></p>
      </main>
    </>
  );
}