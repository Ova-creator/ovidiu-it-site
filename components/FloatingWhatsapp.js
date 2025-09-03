"use client";
export default function FloatingWhatsApp({ url }) {
  return (
    <a href={url} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"
       className="fixed bottom-6 right-6 z-50 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl w-14 h-14 grid place-items-center">
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M20.52 3.48c-4.66-4.64-12.21-4.64-16.87 0-4.27 4.27-4.64 10.88-1.11 15.57l-1.54 5.67 5.82-1.52c4.53 3.07 10.7 2.56 14.71-1.45 4.66-4.66 4.66-12.21-.01-16.27zm-8.27 18.02c-2.04 0-4.04-.55-5.79-1.61l-.41-.24-3.45.9.92-3.38-.25-.43c-2.88-4.82-1.41-11.03 3.37-14.2 4.84-3.22 11.37-2.06 14.86 2.65 3.52 4.74 2.58 11.4-2.15 15.05-2 1.56-4.44 2.26-7.1 2.26z"/>
      </svg>
    </a>
  );
}
