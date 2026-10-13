// Generates responsive AVIF/WebP variants for every property image.
// Usage: npm run optimize:images
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const publicDir = path.join(root, "public");
const outDir = path.join(publicDir, "optimized");
const manifestPath = path.join(root, "src/data/imageManifest.json");
const WIDTHS = [640, 960, 1280, 1920];

const data = await fs.readFile(path.join(root, "src/data/properties.ts"), "utf8");
const images = [...new Set([...data.matchAll(/"image":\s*"([^"]+)"/g)].map((m) => m[1]))];

const manifest = {};
for (const src of images) {
  const input = path.join(publicDir, src);
  const meta = await sharp(input).metadata();
  const base = src.replace(/^\//, "").replace(/\.[^.]+$/, "");
  // Never upscale; always include the source width if it's smaller than the largest target
  const widths = WIDTHS.filter((w) => w < meta.width);
  widths.push(Math.min(meta.width, WIDTHS.at(-1)));

  await fs.mkdir(path.dirname(path.join(outDir, base)), { recursive: true });
  for (const w of widths) {
    const pipeline = sharp(input).rotate().resize({ width: w, withoutEnlargement: true }).sharpen({ sigma: 0.5 });
    await pipeline.clone().avif({ quality: 60, effort: 5 }).toFile(path.join(outDir, `${base}-${w}.avif`));
    await pipeline.clone().webp({ quality: 82 }).toFile(path.join(outDir, `${base}-${w}.webp`));
  }
  manifest[src] = { base: `/optimized/${base}`, widths, ratio: +(meta.height / meta.width).toFixed(4) };
  console.log(`${src} -> ${widths.join(", ")}`);
}

await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(`Wrote ${Object.keys(manifest).length} entries to ${path.relative(root, manifestPath)}`);
