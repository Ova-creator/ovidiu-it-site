import Head from 'next/head'
import Navbar from '../components/Navbar'

export default function About() {
  return (
    <>
      <Head>
        <title>About Us – Ovidiu.IT</title>
        <meta name="description" content="Learn more about Ovidiu.IT and our mission to build fast, SEO-optimized websites using Framer and automation." />
      </Head>
      <Navbar />
      <main className="p-10 text-center">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg text-gray-300">
          We’re a passionate team that builds lightning-fast websites using Framer, SEO, and automation tools.
        </p>
      </main>
    </>
  );
}