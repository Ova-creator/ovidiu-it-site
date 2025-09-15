import Image from "next/image";

export default function ProjectsCard({ title, description, status, date, url, cover }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-lg bg-zinc-900/40 p-4 shadow-md hover:bg-zinc-900/60 transition"
    >
      {cover && (
        <div className="mb-3 relative w-full h-48 overflow-hidden rounded-md">
          <Image
            src={cover}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false} // normal la carduri
          />
        </div>
      )}
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-zinc-400 mt-1">{description}</p>
      <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
        <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">{status}</span>
        <span>{date}</span>
      </div>
    </a>
  );
}
