// app/og/route.js
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
export const alt = "Ovidiu.IT — OG";
export const size = { width: 1200, height: 630 };

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "https://ovidiu.it.com";

// (opțional) înlocuiește cu fontul tău din /public/fonts/…  — Inter-Bold ca fallback
async function loadFont(weight = 700) {
  try {
    const url = new URL("../../public/fonts/Inter-Bold.ttf", import.meta.url);
    const res = await fetch(url);
    if (!res.ok) throw new Error("font fetch failed");
    const data = await res.arrayBuffer();
    return { name: "Inter", data, weight, style: "normal" };
  } catch {
    return undefined;
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const title =
    searchParams.get("title") ||
    "Ovidiu.IT — Next.js, SEO & Automation";

  const subtitle =
    searchParams.get("subtitle") ||
    "Fast, clean, SEO-ready websites in Next.js. Technical SEO & automations that save time.";

  const strap = searchParams.get("strap") || "In AI we trust";

  // Poți pune alt logo în /public/og/og-default.png
  const logo = `${SITE}/og/og-default.png`;

  const font = await loadFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px",
          background:
            "radial-gradient(1200px 630px at 90% -10%, #5b21b6 0%, #111118 60%)",
          color: "white",
          fontFamily: font ? "Inter" : "sans-serif",
        }}
      >
        {/* top bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img
            src={logo}
            width={64}
            height={64}
            style={{ borderRadius: 16, border: "2px solid rgba(255,255,255,.18)" }}
          />
          <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: 0.2 }}>
            Ovidiu.<span style={{ color: "#c084fc" }}>IT</span>
          </div>
          <div
            style={{
              marginLeft: "auto",
              fontSize: 20,
              color: "rgba(255,255,255,.7)",
            }}
          >
            {strap}
          </div>
        </div>

        {/* title + subtitle */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 900,
              lineHeight: 1.1,
              textShadow: "0 6px 22px rgba(0,0,0,.35)",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 30,
              color: "rgba(255,255,255,.85)",
              maxWidth: 980,
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            color: "rgba(255,255,255,.8)",
            fontSize: 24,
          }}
        >
          <div
            style={{
              padding: "10px 16px",
              borderRadius: 12,
              background: "rgba(255,255,255,.06)",
              border: "1px solid rgba(255,255,255,.12)",
            }}
          >
            Next.js · Technical SEO · Automations
          </div>
          <div style={{ marginLeft: "auto", fontWeight: 700 }}>{SITE.replace(/^https?:\/\//, "")}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font ? [font] : [],
    }
  );
}
