// scripts/gen-favicon.mjs
import sharp from "sharp";
import toIco from "to-ico";
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

// folosește un PNG 512x512 cu sigla ta (>_) ca sursă
const SRC = "public/icon-512.png"; // creează acest fișier cu sigla ta
const OUT_DIR = "public";

async function run() {
  mkdirSync(OUT_DIR, { recursive: true });

  const sizes = [16, 32, 48];
  const pngBuffers = await Promise.all(
    sizes.map((s) => sharp(SRC).resize(s, s).png().toBuffer())
  );

  // salvează PNG-urile (opțional)
  for (let i = 0; i < sizes.length; i++) {
    writeFileSync(resolve(OUT_DIR, `favicon-${sizes[i]}.png`), pngBuffers[i]);
  }

  // ICO din cele 3 PNG-uri
  const icoBuffer = await toIco(pngBuffers);
  writeFileSync(resolve(OUT_DIR, "favicon.ico"), icoBuffer);

  console.log("✅ Generated public/favicon.ico and PNG variants.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
