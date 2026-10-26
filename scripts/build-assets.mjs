// Génère les images dérivées à partir de ../portfolio-kit/assets :
//  1. recadre les captures de slides Smart Finance sur la zone de l'application ;
//  2. crée l'image Open Graph (public/og.jpg, 1200×630).
// Usage : npm run assets
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const kit = path.join(root, "..", "portfolio-kit", "assets");
const pub = path.join(root, "public");

// 1. Recadrages (originaux conservés dans portfolio-kit)
const crops = {
  "smart-finance-accueil.png": { left: 178, top: 80, width: 654, height: 447 },
  "smart-finance-chat.png": { left: 57, top: 72, width: 851, height: 388 },
  "smart-finance-modeles.png": { left: 410, top: 80, width: 360, height: 432 },
};

for (const [file, box] of Object.entries(crops)) {
  const info = await sharp(path.join(kit, "projets", file)).extract(box).png().toFile(path.join(pub, "projets", file));
  console.log(`projets/${file}`, `${info.width}x${info.height}`);
}

// La slide « upload » contient deux captures côte à côte sur fond blanc :
// on les recompose sur un fond sombre assorti au site.
{
  const src = path.join(kit, "projets", "smart-finance-upload.png");
  const left = await sharp(src).extract({ left: 67, top: 101, width: 400, height: 326 }).toBuffer();
  const right = await sharp(src).extract({ left: 500, top: 199, width: 410, height: 284 }).toBuffer();
  const pad = 16;
  const width = pad + 400 + pad + 410 + pad;
  const height = pad + 326 + pad;
  const info = await sharp({ create: { width, height, channels: 3, background: "#0c1226" } })
    .composite([
      { input: left, left: pad, top: pad },
      { input: right, left: pad + 400 + pad, top: pad + 326 - 284 },
    ])
    .png()
    .toFile(path.join(pub, "projets", "smart-finance-upload.png"));
  console.log("projets/smart-finance-upload.png", `${info.width}x${info.height}`);
}

// Photo du certificat EY × UIK : recadrage sur le certificat (sans le mur au-dessus)
{
  const info = await sharp(path.join(kit, "certifications", "hackathon-ey-ai4-new-generation.png"))
    .extract({ left: 0, top: 330, width: 800, height: 640 })
    .png()
    .toFile(path.join(pub, "certifications", "hackathon-ey-ai4-new-generation.png"));
  console.log("certifications/hackathon-ey-ai4-new-generation.png", `${info.width}x${info.height}`);
}

// Fond du site (cerveau + réseau) : PNG lourd converti en JPEG
{
  const info = await sharp(path.join(kit, "fond", "cerveau-reseau.png"))
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(pub, "fond", "cerveau-reseau.jpg"));
  console.log("fond/cerveau-reseau.jpg", `${info.width}x${info.height}`);
}

// 2. Image Open Graph
const W = 1200;
const H = 630;
const photoW = 430;
const photoH = 530;
const photoX = W - photoW - 60;
const photoY = (H - photoH) / 2;
const radius = 36;

const background = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g1" cx="0.15" cy="0.1" r="0.7">
      <stop offset="0" stop-color="#8b5cf6" stop-opacity="0.45"/>
      <stop offset="1" stop-color="#8b5cf6" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2" cx="0.85" cy="0.9" r="0.6">
      <stop offset="0" stop-color="#ec4899" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#ec4899" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="brand" x1="0" x2="1">
      <stop offset="0" stop-color="#a78bfa"/>
      <stop offset="1" stop-color="#f472b6"/>
    </linearGradient>
    <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#8b5cf6"/>
      <stop offset="0.5" stop-color="#ec4899"/>
      <stop offset="1" stop-color="#22d3ee"/>
    </linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#ffffff" stroke-opacity="0.05"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="#070b1a"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>
  <rect width="100%" height="100%" fill="url(#g1)"/>
  <rect width="100%" height="100%" fill="url(#g2)"/>
  <rect x="${photoX - 3}" y="${photoY - 3}" width="${photoW + 6}" height="${photoH + 6}" rx="${radius + 3}" fill="url(#ring)"/>
  <text x="70" y="200" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#22d3ee" letter-spacing="4">AI ENGINEER · DATA SCIENCE</text>
  <text x="66" y="290" font-family="Segoe UI, Arial, sans-serif" font-size="78" font-weight="700" fill="#e8eaf6">Abir El Abed</text>
  <text x="70" y="350" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="600" fill="url(#brand)">Ingénieure IA</text>
  <text x="70" y="420" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#a3a9c7">LLMs · RAG · Multi-agents</text>
  <text x="70" y="456" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#a3a9c7">Deep Learning · IA explicable (XAI)</text>
  <rect x="70" y="500" width="80" height="4" rx="2" fill="url(#brand)"/>
</svg>`);

const mask = Buffer.from(
  `<svg width="${photoW}" height="${photoH}"><rect width="${photoW}" height="${photoH}" rx="${radius}" fill="#fff"/></svg>`,
);
const photo = await sharp(path.join(kit, "profil", "image-abir.jpg"))
  .resize(photoW, photoH, { fit: "cover", position: "top" })
  .composite([{ input: mask, blend: "dest-in" }])
  .png()
  .toBuffer();

await sharp(background)
  .composite([{ input: photo, left: photoX, top: photoY }])
  .jpeg({ quality: 88 })
  .toFile(path.join(pub, "og.jpg"));
console.log("og.jpg", `${W}x${H}`);
