// components/ExternalButton.js
export default function ExternalButton({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm text-zinc-200 hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-[0_0_10px_rgba(0,229,255,0.35)] transition"
    >
      {children}
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path fill="currentColor" d="M14 3h7v7h-2V6.414l-9.293 9.293-1.414-1.414L17.586 5H14V3z"/>
        <path fill="currentColor" d="M5 5h6v2H7v10h10v-4h2v6H5z"/>
      </svg>
    </a>
  );
}
