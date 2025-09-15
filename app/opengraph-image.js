// app/opengraph-image.js
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Acceptă ?title=...&subtitle=...
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
        {/* Benzi cyan discrete (compatibile cu next/og) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "10px",
            background:
              "linear-gradient(90deg, rgba(56,189,248,0), rgba(56,189,248,0.35), rgba(56,189,248,0))",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "10px",
            background:
              "linear-gradient(270deg, rgba(56,189,248,0), rgba(56,189,248,0.35), rgba(56,189,248,0))",
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
            textAlign: "center",
            paddingLeft: 40,
            paddingRight: 40,
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
            textAlign: "center",
            paddingLeft: 40,
            paddingRight: 40,
          }}
        >
          {subtitle}
        </div>
      </div>
    ),
    { ...size }
  );
}
