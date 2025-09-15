// app/projects/page.js
// Featured sus + Others jos + Filter Bar dinamic (query ?tag=...) + counters (accent cyan)
import { getProjects, getFeaturedProjects } from "../../lib/notion";

function isExternal(url) {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}
function formatDate(iso) {
  if (!iso) return null;
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  } catch {
    return null;
  }
}
function ProjectCard({ project: p }) {
  const href = p?.url || null;
  const dateStr = formatDate(p?.date);

  const Cover = p?.cover ? (
    <div className="relative mb-3 h-48 w-full overflow-hidden rounded-xl bg-zinc-900/50">
      <img src={p.cover} alt={`${p.title || "Project"} cover`} className="h-full w-full object-cover opacity-90" loading="lazy" />
    </div>
  ) : (
    <div
      className="relative mb-3 h-48 w-full overflow-hidden rounded-xl"
      style={{
        background:
          "radial-gradient(120% 80% at 10% 0%, rgba(56,189,248,0.14), transparent 60%), radial-gradient(120% 80% at 90% 0%, rgba(59,130,246,0.12), transparent 60%), rgba(24,24,27,0.6)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    />
  );

  const Inner = (
    <>
      {Cover}
      {p?.featured && (
        <span className="mb-2 inline-block rounded-md border border-white/10 px-2 py-0.5 text-xs text-zinc-300">
          Featured
        </span>
      )}
      <h3 className="text-lg font-semibold">{p?.title || "Untitled"}</h3>
      {p?.summary ? <p className="mt-1 text-sm text-zinc-400">{p.summary}</p> : null}

      {(p?.status || (p?.tags && p.tags.length > 0) || dateStr) && (
        <div className="mb-2 mt-3 flex flex-wrap gap-2">
          {p?.status && (
            <span className="rounded-md border border-white/10 px-2 py-0.5 text-xs text-zinc-300">{p.status}</span>
          )}
          {Array.isArray(p?.tags) &&
            p.tags.map((t) => (
              <span key={t} className="rounded-md border border-white/10 px-2 py-0.5 text-xs text-zinc-300">
                {t}
              </span>
            ))}
          {dateStr && (
            <span className="rounded-md border border-white/10 px-2 py-0.5 text-xs text-zinc-300">{dateStr}</span>
          )}
        </div>
      )}
    </>
  );

  if (href) {
    if (isExternal(href)) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="card hover:shadow-lg transition">
          {Inner}
        </a>
      );
    }
    return (
      <a href={href} className="card hover:shadow-lg transition">
        {Inner}
      </a>
    );
  }
  return <div className="card hover:shadow-lg transition">{Inner}</div>;
}

function orderTags(allTags) {
  const priority = ["Networking", "Linux", "Automation"];
  const set = new Set(allTags);
  const pr = priority.filter((t) => set.has(t));
  const rest = [...set].filter((t) => !priority.includes(t)).sort((a, b) => a.localeCompare(b));
  return [...pr, ...rest];
}
function FilterBar({ activeTag, tags, tagCounts }) {
  const ordered = orderTags(tags);
  const allCount = Object.values(tagCounts).reduce((acc, v) => acc + v, 0);

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      <span className="text-sm text-zinc-400 mr-2">Filter by tag:</span>

      <a
        href="/projects"
        className={
          "rounded-md border px-3 py-1 text-sm " +
          (activeTag ? "border-white/10 text-zinc-300 hover:border-white/20" : "border-cyan-400/40 text-cyan-300")
        }
        aria-current={!activeTag ? "page" : undefined}
      >
        All ({allCount})
      </a>

      {ordered.map((t) => {
        const active = activeTag === t;
        const count = tagCounts[t] || 0;
        return (
          <a
            key={t}
            href={`/projects?tag=${encodeURIComponent(t)}`}
            className={
              "rounded-md border px-3 py-1 text-sm hover:border-white/20 " +
              (active ? "border-cyan-400/40 text-cyan-300" : "border-white/10 text-zinc-300")
            }
            aria-current={active ? "page" : undefined}
          >
            {t} ({count})
          </a>
        );
      })}
    </div>
  );
}

export const metadata = {
  title: "Projects — Case Studies",
  description: "Cybersecurity & Ethical Hacking portfolio — featured labs and full project archive.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage({ searchParams }) {
  const activeTag =
    typeof searchParams?.tag === "string" && searchParams.tag.trim()
      ? decodeURIComponent(searchParams.tag)
      : null;

  const [featuredRaw, allRaw] = await Promise.all([getFeaturedProjects(100), getProjects(200)]);
  const featuredIds = new Set((featuredRaw || []).map((p) => p.id));
  const othersRaw = (allRaw || []).filter((p) => !featuredIds.has(p.id));
  const allProjects = [...(featuredRaw || []), ...(othersRaw || [])];

  const tagCounts = {};
  for (const p of allProjects) {
    for (const t of p.tags || []) {
      tagCounts[t] = (tagCounts[t] || 0) + 1;
    }
  }
  const tags = Object.keys(tagCounts);

  const match = (p) => (activeTag ? (p.tags || []).includes(activeTag) : true);
  const featured = (featuredRaw || []).filter(match);
  const others = (othersRaw || []).filter(match);

  const featuredCount = featured.length;
  const othersCount = others.length;
  const totalShown = featuredCount + othersCount;

  return (
    <div className="container mx-auto px-4 py-10">
      {tags.length > 0 && <FilterBar activeTag={activeTag} tags={tags} tagCounts={tagCounts} />}

      {totalShown === 0 && (
        <div className="rounded-xl border border-white/10 p-4 text-sm text-zinc-400 mb-10">
          No projects tagged <strong>{activeTag}</strong>. Try another filter or{" "}
          <a href="/projects" className="underline">clear filters</a>.
        </div>
      )}

      {featuredCount > 0 && (
        <section className="bg-grid rounded-2xl p-1 pb-0">
          <h1 className="mb-6 mt-5 px-3 text-2xl font-semibold tracking-tight">
            <span className="title-lock">Featured Projects</span>{" "}
            {activeTag ? `· ${activeTag}` : ""} ({featuredCount})
          </h1>
          <div className="mb-12 grid gap-6 px-3 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}

      {othersCount > 0 && (
        <section className="mt-10">
          <h2 className="mb-6 text-xl font-medium tracking-tight title-lock">
            All Projects {activeTag ? `· ${activeTag}` : ""} ({othersCount})
          </h2>
          <hr className="hr-glow mb-6" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
