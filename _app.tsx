import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Ovidiu Strinu — SEO, Framer Websites & AI Automation</title>
        <meta name="description" content="Build a modern Framer website, rank higher on Google, and automate repetitive tasks with AI." />
        <link rel="canonical" href="https://ovidiu.it.com/" />
        <meta property="og:title" content="SEO, Framer Websites & AI Automation" />
        <meta property="og:description" content="Modern Framer websites, real SEO, and automations to grow faster." />
        <meta property="og:url" content="https://ovidiu.it.com/" />
        <meta property="og:image" content="/og.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
