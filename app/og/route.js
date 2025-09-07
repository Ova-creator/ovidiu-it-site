// app/og/route.js
import { ImageResponse } from "next/og";

export const runtime = "edge";

// Safe font loader: dacă eșuează, continuăm fără font custom.
async function tryLoadFont(req, weight = 700) {
  try {
    const url = new URL("/fonts/Inter-Bold.ttf", req.url);
    const res = await fetch(url);
    if (!res.ok) throw new Error("font fetch failed");
    const data = await res.arrayBuffer();
    return { name: "Inter", data, weight, style: "normal" };
  } catch (_e) {
    return null; // fallback fără font
  }
}

export async function GET(req) {
  const maybeFont = await tryLoadFont(req);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0B0B0F",
          color: "white",
          alignItems: "center",
          justifyContent: "center",
          padding: 48,
        }}
      >
        <div
          style={{
            maxWidth: 1000,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              fontFamily: maybeFont ? "Inter" : "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell",
              fontSize: 56,
              lineHeight: 1.15,
              fontWeight: 800,
              letterSpacing: -1,
            }}
          >
            Ovidiu.IT — <span style={{ color: "#8BFFBF" }}>Next.js</span>, SEO & Automations
          </div>
          <div style={{ fontSize: 26, color: "#C8CBD0" }}>
            Fast, clean, SEO-ready websites in Next.js. Technical SEO and automations that actually save time.
          </div>
          <div style={{ fontSize: 22, color: "#9da3af" }}>ovidiu.it.com • London, UK</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: maybeFont ? [maybeFont] : [],
    }
  );
}
