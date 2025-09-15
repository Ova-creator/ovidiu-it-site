// generate-og.js — OG image 1200x630, hacker grid + cyan glow “>_ Ovidiu.IT”
const { createCanvas } = require("canvas");
const fs = require("fs");

const W = 1200;
const H = 630;

const canvas = createCanvas(W, H);
const ctx = canvas.getContext("2d");

// ---- Background gradient (Kali dark) ----
const bg = ctx.createLinearGradient(0, 0, W, H);
bg.addColorStop(0, "#0b1220");
bg.addColorStop(1, "#020617");
ctx.fillStyle = bg;
ctx.fillRect(0, 0, W, H);

// ---- Subtle hacker grid ----
ctx.strokeStyle = "rgba(56,189,248,0.08)"; // cyan low opacity
ctx.lineWidth = 1;
const grid = 40;
for (let x = 0; x <= W; x += grid) {
  ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
}
for (let y = 0; y <= H; y += grid) {
  ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
}

// ---- Cyan light streaks (accents sus/jos) ----
const barH = 10;
const cyanMid = "rgba(56,189,248,0.38)";
const cyanEdge = "rgba(56,189,248,0.00)";
const topGrad = ctx.createLinearGradient(0, 0, W, 0);
topGrad.addColorStop(0, cyanEdge);
topGrad.addColorStop(0.5, cyanMid);
topGrad.addColorStop(1, cyanEdge);

ctx.fillStyle = topGrad;
ctx.fillRect(0, 18, W, barH);

const botGrad = ctx.createLinearGradient(W, 0, 0, 0);
botGrad.addColorStop(0, cyanEdge);
botGrad.addColorStop(0.5, cyanMid);
botGrad.addColorStop(1, cyanEdge);
ctx.fillStyle = botGrad;
ctx.fillRect(0, H - 28, W, barH);

// ---- Diagonal glow sweep ( foarte subtil ) ----
const sweep = ctx.createLinearGradient(0, 0, W, H);
sweep.addColorStop(0.15, "rgba(56,189,248,0.10)");
sweep.addColorStop(0.5, "rgba(56,189,248,0.00)");
sweep.addColorStop(0.85, "rgba(56,189,248,0.10)");
ctx.fillStyle = sweep;
ctx.fillRect(0, 0, W, H);

// Helper: desen cu glow
function drawGlowText(text, x, y, { font, fill, glowColor, blur = 24, passes = 3, align = "left" }) {
  ctx.textAlign = align;
  ctx.textBaseline = "alphabetic";
  ctx.font = font;

  // straturi de glow
  ctx.fillStyle = glowColor;
  for (let i = 0; i < passes; i++) {
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = blur * (1 - i / passes);
    ctx.fillText(text, x, y);
  }
  // text principal
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.fillStyle = fill;
  ctx.fillText(text, x, y);
}

// ---- Logo “>_” (cyan glow mare) ----
drawGlowText(">_", 140, 190, {
  font: "bold 110px 'Courier New', monospace",
  fill: "#7dd3fc",        // cyan light
  glowColor: "rgba(56,189,248,0.85)",
  blur: 36,
  passes: 4,
  align: "left",
});

// ---- Titlu “Ovidiu.IT” (alb cu glow rece) ----
drawGlowText("Ovidiu.IT", 300, 190, {
  font: "800 86px 'Segoe UI', Arial, sans-serif",
  fill: "#ffffff",
  glowColor: "rgba(186,230,253,0.5)",
  blur: 22,
  passes: 3,
  align: "left",
});

// ---- Subtitle principal ----
drawGlowText("Cybersecurity & Ethical Hacking Portfolio", 140, 330, {
  font: "600 44px 'Segoe UI', Arial, sans-serif",
  fill: "#e5e7eb",
  glowColor: "rgba(56,189,248,0.35)",
  blur: 16,
  passes: 2,
  align: "left",
});

// ---- Tagline ----
ctx.fillStyle = "#a1a1aa";
ctx.font = "500 30px 'Segoe UI', Arial, sans-serif";
ctx.textAlign = "left";
ctx.fillText("Networking • Linux • Automation • Ethical Hacking", 140, 400);

// ---- Export ----
const buffer = canvas.toBuffer("image/png");
fs.mkdirSync("./public", { recursive: true });
fs.writeFileSync("./public/og-default.png", buffer);
console.log("✅ OG image TRĂSNET generat: public/og-default.png");
