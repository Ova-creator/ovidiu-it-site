import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-gray-900 p-4 text-white flex justify-center space-x-6 shadow-md">
      <Link href="/" className="hover:underline">Home</Link>
      <Link href="/about" className="hover:underline">About</Link>
      <Link href="/services" className="hover:underline">Services</Link>
      <Link href="/contact" className="hover:underline">Contact</Link>
    </nav>
  )
}