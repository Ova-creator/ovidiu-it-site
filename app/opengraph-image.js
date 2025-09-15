// app/opengraph-image.js
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// acceptăm ?title=...&subtitle=...
export default function OpengraphImage({ searchParams }) {
  const title =
    decodeURIComponent(searchParams?.title || "Ovidiu.IT — Cybersecurity & Ethical Hacking");
  const subtitle =
    decodeURIComponent(searchParams?.subtitle || "Cybersecurity • Networking • Linux");

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#0b1220",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(600px 300px at 20% 5%, rgba(56,189,248,0.18), transparent 60%), radial-gradient(600px 300px at 80% 10%, rgba(59,130,246,0.16), transparent 60%)",
          }}
        />
        <div
          style={{
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
            fontSize: 180,
            color: "#E5E7EB",
            letterSpacing: "-4px",
            marginBottom: 16,
          }}
        >
          &gt;_ Ovidiu.IT
        </div>
        <div
          style={{
            fontFamily:
              "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, 'Helvetica Neue'",
            fontSize: 50,
            color: "rgb(212,212,216)",
            marginBottom: 8,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily:
              "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, 'Helvetica Neue'",
            fontSize: 34,
            color: "rgb(56,189,248)",
          }}
        >
          {subtitle}
        </div>
      </div>
    ),
    { ...size }
  );
}
