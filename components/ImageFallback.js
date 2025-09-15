// components/ImageFallback.js
import { cn } from "../lib/cn";

export default function ImageFallback({ className }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl flex items-center justify-center",
        className
      )}
      style={{
        background:
          "radial-gradient(120% 80% at 10% 0%, rgba(56,189,248,0.14), transparent 60%), radial-gradient(120% 80% at 90% 0%, rgba(59,130,246,0.12), transparent 60%), rgba(24,24,27,0.6)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
      aria-hidden="true"
    >
      <span className="font-mono text-zinc-300/80 text-3xl select-none">&gt;_</span>
    </div>
  );
}
