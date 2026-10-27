// Génère le CV PDF (public/cv/CV-Abir-El-Abed.pdf) au style « classique » (LaTeX) :
// photo ronde, QR code vers le portfolio et liens cliquables.
// Le texte du CV est rédigé ici ; les liens (site, LinkedIn, GitHub, e-mail) viennent de src/data/portfolio.ts.
// Usage : npm run cv   (nécessite Google Chrome ; chemin modifiable via CHROME_PATH)
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import qrcode from "qrcode-generator";
import sharp from "sharp";
import { profile, projects } from "../src/data/portfolio.ts";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const output = path.join(root, "public", profile.cv);

// Numéro affiché uniquement sur le CV (pas sur le site)
const phone = "+216 50 538 371";

const bareUrl = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
const link = (url, label = bareUrl(url)) => `<a href="${url}">${label}</a>`;
const github = (id) => projects.find((p) => p.id === id)?.github ?? "";

// Photo ronde : visage et épaules
const photo = await sharp(path.join(root, "public", profile.photo.src))
  .extract({ left: 62, top: 0, width: 900, height: 900 })
  .resize(320)
  .jpeg({ quality: 86 })
  .toBuffer();
const photoUri = `data:image/jpeg;base64,${photo.toString("base64")}`;

// QR code vers le portfolio
const qr = qrcode(0, "M");
qr.addData(profile.siteUrl);
qr.make();
const qrSvg = qr.createSvgTag({ cellSize: 4, margin: 0, scalable: true });

const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>CV — ${profile.name}</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/aaaakshat/cm-web-fonts@latest/font/Serif/cmun-serif.css">
<style>
  @page { size: A4; margin: 7mm 13mm 6mm; }
  :root { --ink: #111; --blue: #2c4a7e; --link: #3c5fb0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: "Computer Modern Serif", "Latin Modern Roman", Georgia, serif; font-size: 9.35pt; line-height: 1.2; color: var(--ink); }
  a { color: var(--link); text-decoration: none; }
  b { font-weight: bold; }

  /* En-tête : photo · identité · QR code */
  .head { display: grid; grid-template-columns: 28mm 1fr 24mm; align-items: center; gap: 3mm; }
  .photo { width: 28mm; height: 28mm; border-radius: 50%; object-fit: cover; }
  .id { text-align: center; white-space: nowrap; }
  .id p { font-size: 9.3pt; }
  h1 { font-size: 21pt; font-weight: bold; letter-spacing: 0.04em; line-height: 1.1; }
  .id .title { font-size: 10.3pt; margin-top: 0.6mm; }
  .tags { margin-top: 0.2mm; }
  .contact { margin-top: 0.8mm; }
  .sep { margin: 0 1.2mm; }
  .qr { display: flex; flex-direction: column; align-items: center; color: var(--ink); }
  .qr svg { width: 20mm; height: 20mm; }
  .qr svg path, .qr svg rect[fill="black"] { fill: var(--ink); }
  .qr span { margin-top: 1mm; font-size: 7.5pt; font-style: italic; text-align: center; line-height: 1.15; }

  .intro { margin-top: 2mm; text-align: justify; }

  h2 { margin-top: 1.6mm; margin-bottom: 0.7mm; font-size: 10.8pt; font-weight: normal; color: var(--blue); border-bottom: 0.8px solid var(--ink); padding-bottom: 0.2mm; break-after: avoid; }
  .row { display: flex; justify-content: space-between; gap: 4mm; }
  .row > :last-child { flex: none; }
  .date { font-style: italic; }
  .job { margin-top: 0.7mm; break-inside: avoid; }
  .job h3, .project h3 { font-size: 9.35pt; font-weight: bold; }
  ul { padding-left: 4mm; }
  li { margin-top: 0.1mm; }
  li::marker { font-size: 8pt; }
  .tech { font-style: italic; }
  .project { margin-top: 0.7mm; break-inside: avoid; }
  .skills p + p { margin-top: 0.1mm; }
  .certs { text-align: justify; }
  .certs .dot { margin: 0 1.4mm; }
  sup { font-size: 0.7em; line-height: 0; }
</style>
</head>
<body>
  <header class="head">
    <img class="photo" src="${photoUri}" alt="Abir El Abed">
    <div class="id">
      <h1>EL ABED ABIR</h1>
      <p class="title">INGÉNIEURE IA</p>
      <p class="tags">IA | DATA SCIENCE | IA GÉNÉRATIVE | SYSTÈMES MULTI-AGENTS</p>
      <p class="contact">Tunisie<span class="sep">|</span>${link(`tel:${phone.replace(/\s/g, "")}`, phone).replace(/<a /, '<a style="color:inherit" ')}<span class="sep">|</span>${link(`mailto:${profile.email}`, profile.email)}</p>
      <p>${link(profile.socials.linkedin)}<span class="sep">|</span>${link(profile.socials.github)}<span class="sep">|</span>${link(profile.siteUrl)}</p>
    </div>
    <a class="qr" href="${profile.siteUrl}">${qrSvg}<span>Scannez pour voir<br>mon portfolio</span></a>
  </header>

  <p class="intro">Ingénieure IA, je conçois des solutions data-driven concrètes, des pipelines LLM multi-agents et du RAG jusqu'au Deep Learning appliqué à la vision et à la santé. Mon PFE chez EducaNet exploite plus de 266&nbsp;000 enregistrements scolaires et génère automatiquement plus de 540 rapports pédagogiques. Deux fois sur le podium en hackathon, attentive à l'explicabilité des modèles (XAI), je recherche une première opportunité sur des projets IA à fort impact.</p>

  <h2>Formation</h2>
  <div class="row"><p><b>Université Ibn Khaldoun (UIK) –</b> Diplôme d'ingénieur en Informatique, Data Science et IA</p><p>2023 – 2026</p></div>
  <div class="row"><p><b>ISET Kairouan –</b> Licence en Informatique, Multimédia et Développement Web</p><p>2019 – 2022</p></div>

  <h2>Expérience professionnelle</h2>
  <div class="job">
    <div class="row"><h3>Stage de fin d'études : EducaNet</h3><p class="date">Févr. – Août 2026</p></div>
    <h3>Ingénieure IA stagiaire, plateforme d'analyse pédagogique</h3>
    <ul>
      <li>Plateforme d'analyse de données scolaires et de génération automatisée de rapports pédagogiques : <b>pipeline multi-agents</b> (Analyse → Décision → Rapport) basé sur des LLMs, exploitant plus de <b>266&nbsp;000 enregistrements</b> scolaires.</li>
      <li>Intégration multi-fournisseurs de LLMs (<b>Ollama, Groq, Gemini</b>) avec benchmark comparatif de 4 modèles.</li>
      <li>Génération automatisée de <b>plus de 540 rapports PDF</b> personnalisés (ReportLab), avec un taux de réussite <b>supérieur à 95&nbsp;%</b>.</li>
      <li><b>Chatbot RAG</b> et tableau de bord interactif (HTML/JS/Chart.js) (510 élèves, 27 classes) ; base de données multi-tenant.</li>
    </ul>
  </div>
  <div class="job">
    <div class="row"><h3>Stage d'été : Multiverse IA, Sousse</h3><p class="date">Été 2025</p></div>
    <h3>Détection automatisée de lésions aviaires, Deep Learning</h3>
    <ul>
      <li>Détection automatisée de lésions aviaires par <b>Deep Learning</b> (classification, anomalies).</li>
      <li>Annotation et constitution de jeux de données, enrichis par un <b>scraping multi-sources</b>.</li>
    </ul>
  </div>
  <div class="job">
    <div class="row"><h3>Stage : TuniTech</h3><p class="date">Oct. 2022</p></div>
    <h3>Stagiaire développeuse full stack</h3>
    <ul><li>Développement de modules ERP (RH, Finance, Comptabilité) et de tableaux de bord analytiques.</li></ul>
  </div>
  <div class="job">
    <div class="row"><h3>Stage : SW Consulting</h3><p class="date">Févr. – Juin 2022</p></div>
    <h3>Stagiaire développeuse web</h3>
    <ul><li>Conception d'une plateforme web reliant transporteurs et clients, avec messagerie, notifications et emailing.</li></ul>
  </div>

  <h2>Compétences techniques</h2>
  <div class="skills">
    <p><b>Langages de programmation :</b> Python, JavaScript, SQL</p>
    <p><b>Intelligence artificielle :</b> Machine Learning, Deep Learning, NLP, Vision par ordinateur, LLMs, IA générative, Systèmes multi-agents, RAG, Prompt Engineering, IA explicable (LIME, SHAP)</p>
    <p><b>Frameworks IA :</b> PyTorch, TensorFlow, Scikit-learn, LangChain</p>
    <p><b>LLMs et API :</b> Ollama, Groq, Gemini, Llama 3, DeepSeek-R1, GPT</p>
    <p><b>Data et outils :</b> Pandas, NumPy, Matplotlib, Chart.js, FastAPI, Streamlit, ReportLab, Git, GitHub</p>
    <p><b>Langues :</b> arabe (langue maternelle), français (courant), anglais (intermédiaire)</p>
  </div>

  <h2>Projets</h2>
  <div class="project">
    <h3>Smart Finance : assistant financier IA <span style="font-weight:normal">(projet intégré, en collaboration avec la startup MitaversIA)</span></h3>
    <ul><li>Système multi-agents et RAG extrayant les informations clés de rapports financiers PDF (10-Q, bilans, transcripts) et répondant aux questions en langage naturel, en local pour la confidentialité des données ; comparaison DeepSeek-R1, Llama 3 et GPT-3. <span class="tech">Python, LangChain, Ollama, RAG, Streamlit</span> – ${link(github("smart-finance"))}</li></ul>
  </div>
  <div class="project">
    <h3>ClariMed : simplification intelligente de documents médicaux</h3>
    <ul><li>Transformation de textes médicaux complexes en langage accessible (FR/EN), avec chatbot explicatif et niveaux de risque. <span class="tech">NLP, T5, LLMs, RAG.</span></li></ul>
  </div>
  <div class="project">
    <h3>Détection du cancer du sein</h3>
    <ul><li>Modèle CNN atteignant <b>94&nbsp;% de précision</b> pour la détection précoce du cancer du sein. <span class="tech">Deep Learning, ResNet101.</span></li></ul>
  </div>
  <div class="project">
    <h3>Prédiction du risque de maladies cardiaques</h3>
    <ul><li>Modèle de Machine Learning prédisant le risque cardiaque à partir de données cliniques pour améliorer le diagnostic précoce. <span class="tech">Python, Scikit-learn</span> – ${link(github("heart-disease"))}</li></ul>
  </div>

  <h2>Distinctions et hackathons</h2>
  <ul>
    <li><b>2<sup>e</sup> place – Hackathon AI 4 The Blue Horizons :</b> solution IA pour l'hydroponie, développée en équipe.</li>
    <li><div class="row"><p><b>3<sup>e</sup> place – Hackathon national AI 4 The New Generation (EY Tunisie × UIK) :</b> recrutement intelligent pour l'évaluation technique des candidats EY (LLMs, LangChain) ; 19 équipes de 10 écoles.</p><p class="date">Déc. 2024</p></div></li>
    <li><div class="row"><p><b>DeepTech Winter Academy – UIK :</b> IA et Deep Learning, NVIDIA Deep Learning Bootcamp.</p><p class="date">Déc. 2024</p></div></li>
  </ul>

  <h2>Certifications</h2>
  <p class="certs">${[
    "Explainable AI (XAI) – Duke University, mai 2025",
    "Deep Learning with PyTorch – IBM, mai 2025",
    "Fundamentals of Deep Learning – NVIDIA, déc. 2024",
    "IBM AI Engineering",
    "Google Advanced Data Analytics",
    "Microsoft Azure ML for Data Scientists",
    "Data Science – T3alem.tn",
    "IT Project Management",
  ].join('<span class="dot">•</span>')}</p>
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
