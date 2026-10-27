// Génère le CV PDF (public/cv/CV-Abir-El-Abed.pdf) à partir de src/data/portfolio.ts :
// même contenu que le site, photo de profil et QR code vers le portfolio.
// Usage : npm run cv   (nécessite Google Chrome ; chemin modifiable via CHROME_PATH)
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import qrcode from "qrcode-generator";
import sharp from "sharp";
import { about, certifications, education, experience, hackathons, profile, projects, skills, stats } from "../src/data/portfolio.ts";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const output = path.join(root, "public", profile.cv);

// Numéro affiché uniquement sur le CV (pas sur le site)
const phone = "+216 50 538 371";

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    // « 266 000 » ne doit pas être coupé en fin de ligne
    .replace(/(\d) (\d{3})/g, "$1&nbsp;$2");
const fr = (l) => esc(l.fr);
const bareUrl = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

// Photo : recadrée sur le haut du corps, embarquée en JPEG léger
const photo = await sharp(path.join(root, "public", profile.aboutPhoto.src))
  .flatten({ background: "#ffffff" })
  .extract({ left: 17, top: 0, width: 400, height: 440 })
  .resize(300)
  .jpeg({ quality: 86 })
  .toBuffer();
const photoUri = `data:image/jpeg;base64,${photo.toString("base64")}`;

// QR code vers le portfolio
const qr = qrcode(0, "M");
qr.addData(profile.siteUrl);
qr.make();
const qrSvg = qr.createSvgTag({ cellSize: 4, margin: 0, scalable: true });

const icon = {
  mail: '<path d="M4 6h16v12H4z"/><path d="m4 7 8 6 8-6"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
};
const svg = (name) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${icon[name]}</svg>`;

const contacts = [
  ["mail", profile.email, `mailto:${profile.email}`],
  ["phone", phone, `tel:${phone.replace(/\s/g, "")}`],
  ["globe", bareUrl(profile.siteUrl), profile.siteUrl],
  ["link", bareUrl(profile.socials.linkedin), profile.socials.linkedin],
  ["link", bareUrl(profile.socials.github), profile.socials.github],
  ["pin", profile.location.fr, null],
]
  .map(([i, label, href]) => `<li>${svg(i)}${href ? `<a href="${esc(href)}">${esc(label)}</a>` : esc(label)}</li>`)
  .join("");

const nf = new Intl.NumberFormat("fr-FR");
const keyFigures = stats
  .map((s) => `<div class="kpi"><b>${nf.format(s.value)}${esc(s.suffix ?? "")}</b><span>${fr(s.label)}</span></div>`)
  .join("");

const experienceHtml = experience
  .map(
    (e) => `
  <article class="entry${e.featured ? " featured" : ""}">
    <header><h3>${fr(e.title)}</h3><time>${fr(e.period)}</time></header>
    <p class="org">${esc(e.org)}${e.location ? ` · ${fr(e.location)}` : ""}</p>
    ${e.summary ? `<p class="summary">${fr(e.summary)}</p>` : ""}
    ${e.bullets?.length ? `<ul>${e.bullets.map((b) => `<li>${fr(b)}</li>`).join("")}</ul>` : ""}
  </article>`,
  )
  .join("");

// EducaNet figure déjà dans l'expérience
const projectsHtml = projects
  .filter((p) => p.id !== "educanet")
  .map(
    (p) => `
  <article class="project">
    <h3>${fr(p.title)}${p.highlight ? ` <em>${fr(p.highlight)}</em>` : ""}</h3>
    <p>${fr(p.summary)}</p>
    <p class="tags">${p.tags.map(esc).join(" · ")}</p>
  </article>`,
  )
  .join("");

const hackathonsHtml = hackathons
  .map(
    (h) => `
  <li><b>${h.rankLabel ? `${fr(h.rankLabel)} — ` : ""}${fr(h.title)}</b>${h.date ? ` <span class="muted">(${fr(h.date)})</span>` : ""}<br>${fr(h.summary)}</li>`,
  )
  .join("");

const educationHtml = education
  .map(
    (e) => `
  <div class="side-entry"><b>${fr(e.title)}</b><span>${esc(e.org)} · ${fr(e.location)}</span><time>${fr(e.period)}</time></div>`,
  )
  .join("");

const skillsHtml = skills
  .map((g) => `<div class="skill"><b>${fr(g.title)}</b><span>${g.items.map(esc).join(" · ")}</span></div>`)
  .join("");

const certsHtml = certifications
  .map(
    (c) =>
      `<li><b>${fr(c.title)}</b>${c.issuer || c.date ? `<span>${[c.issuer && esc(c.issuer), c.date && fr(c.date)].filter(Boolean).join(" · ")}</span>` : ""}</li>`,
  )
  .join("");

const languagesHtml = about.languages.map((l) => `<li><b>${fr(l.name)}</b> — ${fr(l.level)}</li>`).join("");

const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>CV — ${esc(profile.name)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=block" rel="stylesheet">
<style>
  /* Marges hautes sur les pages suivantes ; le fond de la colonne latérale se répète sur chaque page */
  @page { size: A4; margin: 10mm 0 8mm; }
  @page :first { margin-top: 0; }
  :root {
    --ink: #141632; --muted: #4a4f72; --subtle: #6b7094;
    --violet: #6d28d9; --pink: #db2777; --line: #e3e4f0; --side: #f4f3fb;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: linear-gradient(to right, #fff calc(100% - 64mm), var(--side) 0); }
  body { font-family: Inter, "Segoe UI", Arial, sans-serif; font-size: 9pt; line-height: 1.42; color: var(--ink); }
  a { color: inherit; text-decoration: none; }
  h1, h2, h3 { font-family: "Space Grotesk", Inter, sans-serif; }

  .page { display: grid; grid-template-columns: 1fr 64mm; }
  .page::before { content: ""; grid-column: 1 / -1; height: 3mm; background: linear-gradient(90deg, var(--violet), var(--pink)); }

  /* En-tête */
  .head { grid-column: 1 / -1; background: #fff; display: grid; grid-template-columns: 30mm 1fr 27mm; gap: 7mm; align-items: center; padding: 8mm 12mm 6mm; border-bottom: 1px solid var(--line); }
  .photo { width: 30mm; height: 33mm; border-radius: 4mm; object-fit: cover; object-position: top; border: 0.6mm solid #ede9fe; }
  h1 { font-size: 25pt; line-height: 1.05; letter-spacing: -0.02em; }
  .role { margin-top: 1.2mm; font-size: 10.5pt; font-weight: 600; color: var(--violet); }
  .contacts { list-style: none; display: grid; grid-template-columns: auto auto; gap: 1mm 6mm; margin-top: 3mm; font-size: 8.3pt; color: var(--muted); }
  .contacts li { display: flex; align-items: center; gap: 1.6mm; white-space: nowrap; }
  .contacts svg { width: 3.3mm; height: 3.3mm; color: var(--violet); flex: none; }
  .qr { text-align: center; }
  .qr svg { width: 25mm; height: 25mm; display: block; margin: 0 auto; }
  .qr svg path, .qr svg rect[fill="black"] { fill: var(--ink); }
  .qr span { display: block; margin-top: 1.4mm; font-size: 7pt; line-height: 1.25; color: var(--subtle); }

  /* Colonnes */
  .main { padding: 6mm 8mm 8mm 12mm; }
  .side { padding: 6mm 8mm 8mm 7mm; }
  section + section { margin-top: 5mm; }
  h2 { display: flex; align-items: center; gap: 2mm; font-size: 10.5pt; text-transform: uppercase; letter-spacing: 0.08em; color: var(--violet); margin-bottom: 2.5mm; break-after: avoid; }
  h2::after { content: ""; flex: 1; height: 1px; background: var(--line); }
  .side h2::after { background: #dcd9ef; }
  .muted { color: var(--subtle); }

  .profile p { color: var(--muted); }
  .kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2mm; margin-top: 3mm; }
  .kpi { border: 1px solid var(--line); border-radius: 2mm; padding: 1.8mm 2.5mm; }
  .kpi b { display: block; font-family: "Space Grotesk", sans-serif; font-size: 12pt; color: var(--violet); }
  .kpi span { font-size: 7.3pt; color: var(--subtle); }

  .entry { break-inside: avoid; }
  .entry + .entry { margin-top: 3.2mm; }
  .entry header { display: flex; justify-content: space-between; gap: 3mm; align-items: baseline; }
  h3 { font-size: 9.8pt; }
  .entry time { flex: none; font-size: 8pt; color: var(--subtle); font-style: italic; }
  .org { font-weight: 600; color: var(--pink); font-size: 8.6pt; }
  .summary { font-style: italic; color: var(--muted); margin-top: 0.5mm; }
  ul { padding-left: 4mm; margin-top: 1mm; }
  li::marker { color: var(--violet); }
  .main li + li { margin-top: 0.5mm; }

  .project { break-inside: avoid; }
  .project + .project { margin-top: 2.4mm; }
  .project em { font-style: normal; font-family: Inter, sans-serif; font-size: 7.3pt; font-weight: 600; color: #fff; background: linear-gradient(90deg, var(--violet), var(--pink)); border-radius: 1.5mm; padding: 0.3mm 1.5mm; vertical-align: 1px; }
  .project p { color: var(--muted); }
  .project .tags { font-size: 7.6pt; color: var(--subtle); margin-top: 0.3mm; }
  .hackathons li { break-inside: avoid; color: var(--muted); }
  .hackathons li b { color: var(--ink); }
  .hackathons li + li { margin-top: 1.4mm; }

  .side-entry { display: flex; flex-direction: column; break-inside: avoid; }
  .side-entry + .side-entry { margin-top: 2.5mm; }
  .side-entry span { color: var(--muted); }
  .side-entry time { font-size: 8pt; color: var(--subtle); font-style: italic; }
  .skill + .skill { margin-top: 2mm; }
  .skill b { display: block; font-size: 8.4pt; }
  .skill span { color: var(--muted); }
  .side ul { list-style: none; padding: 0; }
  .side li { break-inside: avoid; }
  .side li + li { margin-top: 1.6mm; }
  .certs li span { display: block; font-size: 7.8pt; color: var(--subtle); }
</style>
</head>
<body>
<div class="page">
  <header class="head">
    <img class="photo" src="${photoUri}" alt="${fr(profile.aboutPhoto.alt)}">
    <div>
      <h1>${esc(profile.name)}</h1>
      <p class="role">${fr(profile.role)}</p>
      <ul class="contacts">${contacts}</ul>
    </div>
    <a class="qr" href="${esc(profile.siteUrl)}">${qrSvg}<span>Scannez pour voir<br>mon portfolio</span></a>
  </header>

  <main class="main">
    <section class="profile">
      <h2>Profil</h2>
      <p>${fr(about.paragraphs[0])} ${fr(about.paragraphs[2])}</p>
      <div class="kpis">${keyFigures}</div>
    </section>
    <section><h2>Expérience</h2>${experienceHtml}</section>
    <section><h2>Projets</h2>${projectsHtml}</section>
    <section class="hackathons"><h2>Hackathons &amp; distinctions</h2><ul>${hackathonsHtml}</ul></section>
  </main>

  <aside class="side">
    <section><h2>Formation</h2>${educationHtml}</section>
    <section><h2>Compétences</h2>${skillsHtml}</section>
    <section class="certs"><h2>Certifications</h2><ul>${certsHtml}</ul></section>
    <section><h2>Langues</h2><ul>${languagesHtml}</ul></section>
  </aside>
</div>
</body>
</html>`;

// Rendu PDF avec Chrome sans interface
const chrome =
  process.env.CHROME_PATH ??
  ["C:/Program Files/Google/Chrome/Application/chrome.exe", "/usr/bin/google-chrome", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"].find(
    existsSync,
  );
if (!chrome) throw new Error("Google Chrome introuvable : définissez CHROME_PATH");

const dir = mkdtempSync(path.join(tmpdir(), "cv-"));
const htmlFile = path.join(dir, "cv.html");
writeFileSync(htmlFile, html);
if (process.argv.includes("--html")) writeFileSync(path.join(root, "cv-preview.html"), html);
try {
  execFileSync(chrome, [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    "--virtual-time-budget=15000",
    `--user-data-dir=${path.join(dir, "profile")}`,
    `--print-to-pdf=${output}`,
    `file:///${htmlFile.replace(/\\/g, "/")}`,
  ], { stdio: "ignore" });
} finally {
  rmSync(dir, { recursive: true, force: true });
}
console.log("CV généré :", path.relative(root, output));
