// components/ProjectCard.js
// Card neutru care respectă .card, fără a rupe design system-ul.
// Link policy: intern same-tab; extern new-tab + rel noopener noreferrer.

function isExternal(url) {
  try {
    const u = new URL(url);
    return Boolean(u.protocol === "http:" || u.protocol === "https:");
  } catch {
    return false;
  }
}

function formatDate(iso) {
  if (!iso) return null;
  try {
    const d = new Date(iso);
    // Ex: 2025-09-14 → 14 Sep 2025
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return null;
  }
}

export default function ProjectCard({ project: p }) {
  const href = p?.url || null;
  const dateStr = formatDate(p?.date);

  const CardInner = (
    <>
      {/* Cover (opțional) */}
      {p?.cover && (
        <div className="relative mb-3 h-40 w-full overflow-hidden rounded-xl bg-zinc-900/50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.cover}
            alt={`${p.title || "Project"} cover`}
            className="h-full w-full object-cover opacity-90"
            loading="lazy"
          />
        </div>
      )}

      <h3 className="text-lg font-semibold">{p?.title || "Untitled"}</h3>

      {p?.summary ? (
        <p className="mt-1 text-sm text-zinc-400">{p.summary}</p>
      ) : null}

      {/* Badges row: status / tags / date */}
      {(p?.status || (p?.tags && p.tags.length > 0) || dateStr) && (
        <div className="mb-2 mt-3 flex flex-wrap gap-2">
          {p?.status && (
            <span className="rounded-md border border-white/10 px-2 py-0.5 text-xs text-zinc-300">
              {p.status}
            </span>
          )}
          {Array.isArray(p?.tags) &&
            p.tags.map((t) => (
              <span
                key={t}
                className="rounded-md border border-white/10 px-2 py-0.5 text-xs text-zinc-300"
              >
                {t}
              </span>
            ))}
          {dateStr && (
            <span className="rounded-md border border-white/10 px-2 py-0.5 text-xs text-zinc-300">
              {dateStr}
            </span>
          )}
        </div>
      )}
    </>
  );

  // Link wrapper cu respectarea Link Policy
  if (href) {
    if (isExternal(href)) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="card hover:shadow-lg transition"
        >
          {CardInner}
        </a>
      );
    }
    return (
      <a href={href} className="card hover:shadow-lg transition">
        {CardInner}
      </a>
    );
  }

  // Fără link
  return <div className="card hover:shadow-lg transition">{CardInner}</div>;
}
