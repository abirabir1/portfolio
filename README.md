# Portfolio — Abir El Abed

Portfolio personnel d'Abir El Abed, ingénieure IA (Data Science & Intelligence Artificielle).

**Stack** : Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · lucide-react · déploiement Vercel.
Bilingue FR / EN (français par défaut), mode sombre par défaut avec mode clair.

---

## Lancer le projet en local

Prérequis : [Node.js](https://nodejs.org) 20 ou plus récent.

```bash
npm install
npm run dev
```

Puis ouvrez <http://localhost:3000>.

Autres commandes :

| Commande | Rôle |
|---|---|
| `npm run build` | Build de production (à lancer avant de déployer pour vérifier qu'il n'y a pas d'erreur) |
| `npm run start` | Sert le build de production en local |
| `npm run lint` | Vérifie le code avec ESLint |
| `npm run assets` | Régénère les images recadrées de Smart Finance et l'image Open Graph |
| `npm run cv` | Régénère le CV PDF (`public/cv/`) : texte dans `scripts/build-cv.mjs`, liens repris de `src/data/portfolio.ts`, photo ronde et QR code vers le site (nécessite Google Chrome) |

---

## Modifier le contenu

**Tout le contenu est dans [`src/data/portfolio.ts`](src/data/portfolio.ts).** Vous n'avez pas besoin de toucher aux composants.

- Chaque texte traduisible s'écrit `{ fr: "…", en: "…" }`.
- **Un lien vide (`""`) est automatiquement masqué sur le site.** Remplissez-le et le bouton apparaît.
- Les libellés d'interface (boutons, titres de section, messages du formulaire) sont dans [`src/data/ui.ts`](src/data/ui.ts).

### Champs « À AJOUTER »

Cherchez `À AJOUTER` dans `src/data/portfolio.ts` :

| Champ | Effet une fois rempli |
|---|---|
| `profile.siteUrl` | URL publique utilisée pour le SEO, le sitemap et l'image Open Graph |
| `profile.formspreeId` | Le formulaire de contact envoie les messages via Formspree (sinon il ouvre la messagerie du visiteur avec le message pré-rempli) |
| `hackathons[…].presentation` | Affiche le bouton « Voir la présentation » (lien Canva en lecture seule) |
| `certifications[…].verifyUrl` | Affiche le bouton « Vérifier » sur la certification |
| `certifications[…].issuer` | Affiche l'organisme (IT Project Management) |

### Ajouter un projet

Ajoutez un objet dans le tableau `projects` :

```ts
{
  id: "mon-projet",
  icon: "brain",               // illustration générée si pas d'image : brain, school, stethoscope, heart, scan, sprout, trending
  title: { fr: "…", en: "…" },
  summary: { fr: "…", en: "…" },
  description: [{ fr: "…", en: "…" }],
  categories: ["llm"],          // llm, dl ou ml (pour les filtres)
  tags: ["Python", "PyTorch"],
  github: "https://github.com/…", // "" pour masquer le bouton
  // cover / gallery : facultatifs (images dans public/projets/)
}
```

### Ajouter une certification avec image

1. Déposez l'image dans `public/certifications/`.
2. Ajoutez un objet dans `certifications` avec `image: { src, alt, width, height }` et `verifyUrl`.

---

## Formulaire de contact (Formspree)

1. Créez un compte gratuit sur <https://formspree.io> et un nouveau formulaire relié à `abirabed969@gmail.com`.
2. Copiez l'identifiant du formulaire (la partie après `/f/` dans l'URL, ex. `xyzabcd`).
3. Collez-le dans `profile.formspreeId`.

Tant que ce champ est vide, le formulaire reste utilisable : il ouvre la messagerie du visiteur avec le message pré-rempli.

---

## Déployer sur Vercel

1. Poussez ce dossier sur un dépôt GitHub.
2. Sur <https://vercel.com/new>, importez le dépôt. Vercel détecte Next.js automatiquement. Si le dépôt contient d'autres dossiers, choisissez `portfolio` comme **Root Directory**.
3. Cliquez sur **Deploy**.
4. Une fois l'URL obtenue (ex. `https://abir-el-abed.vercel.app`), renseignez-la dans `profile.siteUrl`, puis poussez à nouveau.

Chaque `git push` sur la branche principale redéploie le site automatiquement.

---

## Structure

```text
src/
├── app/                 # layout (SEO, polices, thème), page, sitemap, robots
├── components/
│   ├── certifications/  # CertificationCard
│   ├── experience/      # TimelineItem, PipelineDiagram
│   ├── hero/            # NeuralBackground, Typewriter, Counter
│   ├── layout/          # Navbar, Footer, SkipLink
│   ├── projects/        # ProjectCard, ProjectModal, ProjectIllustration
│   ├── providers/       # langue + thème
│   ├── sections/        # une section par fichier
│   ├── seo/             # données structurées schema.org
│   └── ui/              # Section, SectionTitle, Reveal, Modal, Lightbox, Tag, SocialLinks
├── data/
│   ├── portfolio.ts     # ← tout le contenu
│   └── ui.ts            # libellés d'interface FR / EN
└── lib/site.ts          # URL publique du site
public/                  # photo, CV, captures de projets, certificats, image Open Graph
scripts/                 # génération des images (recadrage, Open Graph) et du CV PDF
```
