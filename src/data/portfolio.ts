/**
 * Contenu centralisé du portfolio.
 * Modifiez ce fichier pour mettre à jour le site sans toucher aux composants.
 *
 * - Chaque texte traduisible est un objet { fr, en }.
 * - Un lien laissé vide ("") est masqué automatiquement sur le site.
 *   Les champs marqués « À AJOUTER » attendent encore une valeur.
 */

export type Locale = "fr" | "en";
export type L = { fr: string; en: string };

export type Link = { label: L; href: string };

export type Stat = { value: number; suffix?: string; label: L };

export type TimelineEntry = {
  id: string;
  period: L;
  title: L;
  org: string;
  location?: L;
  summary?: L;
  bullets?: L[];
  tags?: string[];
  featured?: boolean;
};

export type ProjectCategory = "llm" | "dl" | "ml";

export type GalleryImage = { src: string; alt: L; width: number; height: number };

export type ModelComparison = {
  name: string;
  pros: L[];
  cons: L[];
};

export type Project = {
  id: string;
  title: L;
  summary: L;
  description: L[];
  context?: L;
  objectives?: L[];
  categories: ProjectCategory[];
  tags: string[];
  /** Image de couverture ; sinon une illustration (dégradé + icône) est générée */
  cover?: GalleryImage;
  /** Icône lucide utilisée pour l'illustration générée */
  icon: "brain" | "school" | "stethoscope" | "heart" | "scan" | "sprout" | "trending";
  gallery?: GalleryImage[];
  models?: ModelComparison[];
  github: string;
  /** Texte affiché à la place du bouton GitHub (ex. projet confidentiel) */
  privateNote?: L;
  featured?: boolean;
  highlight?: L;
};

export type Hackathon = {
  id: string;
  rank?: 1 | 2 | 3;
  rankLabel?: L;
  title: L;
  date?: L;
  summary: L;
  details?: L[];
  image?: GalleryImage;
  /** Illustration générée lorsqu'il n'y a pas d'image */
  icon?: Project["icon"];
  /** Lien Canva en lecture seule — À AJOUTER */
  presentation: string;
  tags?: string[];
};

export type Certification = {
  id: string;
  title: L;
  issuer: string;
  date: L | null;
  description?: L;
  image?: GalleryImage;
  pdf?: string;
  /** URL de vérification (Coursera, etc.) */
  verifyUrl: string;
  /** Identifiant de vérification lorsqu'il n'y a pas d'URL */
  credentialId?: string;
};

export type SkillGroup = {
  id: string;
  title: L;
  icon: "code" | "brain" | "layers" | "bot" | "database" | "server";
  items: string[];
};

// ---------------------------------------------------------------------------

export const profile = {
  name: "Abir El Abed",
  role: {
    fr: "Ingénieure IA — Data Science & Intelligence Artificielle",
    en: "AI Engineer — Data Science & Artificial Intelligence",
  } satisfies L,
  shortRole: { fr: "Ingénieure IA", en: "AI Engineer" } satisfies L,
  availability: {
    fr: "Diplômée 2026 · Ouverte aux opportunités",
    en: "2026 graduate · Open to opportunities",
  } satisfies L,
  typewriter: [
    { fr: "LLMs & RAG", en: "LLMs & RAG" },
    { fr: "Systèmes multi-agents", en: "Multi-agent systems" },
    { fr: "Deep Learning", en: "Deep Learning" },
    { fr: "IA explicable (XAI)", en: "Explainable AI (XAI)" },
  ] satisfies L[],
  tagline: {
    fr: "Je conçois des solutions data-driven à forte valeur ajoutée, des pipelines LLM multi-agents à la vision par ordinateur.",
    en: "I build high-impact, data-driven solutions, from multi-agent LLM pipelines to computer vision.",
  } satisfies L,
  /** Photo du hero et de l'image Open Graph */
  photo: {
    src: "/profil/image-abir.jpg",
    alt: { fr: "Portrait d'Abir El Abed", en: "Portrait of Abir El Abed" },
    width: 1024,
    height: 1536,
  } satisfies GalleryImage,
  /** Photo de la section À propos */
  aboutPhoto: {
    src: "/profil/photo-abir.png",
    alt: { fr: "Portrait d'Abir El Abed, souriante, en tenue professionnelle", en: "Portrait of Abir El Abed, smiling, in professional attire" },
    width: 960,
    height: 1280,
  } satisfies GalleryImage,
  cv: "/cv/CV-Abir-El-Abed.pdf",
  location: { fr: "Tunisie", en: "Tunisia" } satisfies L,
  email: "abirabed969@gmail.com",
  socials: {
    linkedin: "https://www.linkedin.com/in/abir-elabed-028482226/",
    github: "https://github.com/abirabir1",
  },
  siteUrl: "https://abir-el-abed.vercel.app",
  /** ID Formspree (https://formspree.io/f/<id>) */
  formspreeId: "mjyyyrzg",
};

export const stats: Stat[] = [
  { value: 266000, suffix: "+", label: { fr: "enregistrements traités", en: "records processed" } },
  { value: 540, suffix: "+", label: { fr: "rapports générés", en: "reports generated" } },
  { value: 2, label: { fr: "podiums en hackathon", en: "hackathon podiums" } },
  { value: 8, label: { fr: "certifications", en: "certifications" } },
];

export const about = {
  paragraphs: [
    {
      fr: "Ingénieure en Informatique spécialisée en Intelligence Artificielle et Data Science, j'aime transformer des données brutes en solutions utiles, celles qui font gagner du temps et éclairent les décisions.",
      en: "I'm a Computer Engineer specialised in Artificial Intelligence and Data Science. I enjoy turning raw data into useful solutions: the kind that save time and support better decisions.",
    },
    {
      fr: "Mon parcours m'a menée du développement web et full stack jusqu'à l'IA générative : LLMs, RAG, systèmes multi-agents, Deep Learning et IA explicable. Cette double culture me permet de penser un modèle jusqu'à son intégration dans un vrai produit.",
      en: "My path took me from web and full-stack development to generative AI: LLMs, RAG, multi-agent systems, Deep Learning and explainable AI. This dual background helps me think about a model all the way to its integration into a real product.",
    },
    {
      fr: "Je cherche aujourd'hui une première opportunité professionnelle pour mettre ces compétences au service de projets concrets et à fort impact.",
      en: "I'm now looking for my first professional opportunity to put these skills to work on concrete, high-impact projects.",
    },
  ] satisfies L[],
  languages: [
    { name: { fr: "Arabe", en: "Arabic" }, level: { fr: "Langue maternelle", en: "Native" } },
    { name: { fr: "Français", en: "French" }, level: { fr: "Courant", en: "Fluent" } },
    { name: { fr: "Anglais", en: "English" }, level: { fr: "Intermédiaire", en: "Intermediate" } },
  ],
};

export const education: TimelineEntry[] = [
  {
    id: "uik",
    period: { fr: "2023 – 2026", en: "2023 – 2026" },
    title: {
      fr: "Diplôme d'Ingénieur en Informatique — Data Science & IA",
      en: "Engineering Degree in Computer Science — Data Science & AI",
    },
    org: "Université Ibn Khaldoun (UIK)",
    location: { fr: "Tunisie", en: "Tunisia" },
  },
  {
    id: "iset",
    period: { fr: "2019 – 2022", en: "2019 – 2022" },
    title: {
      fr: "Licence en Informatique — Multimédia et Développement Web",
      en: "Bachelor's in Computer Science — Multimedia & Web Development",
    },
    org: "ISET Kairouan",
    location: { fr: "Tunisie", en: "Tunisia" },
  },
];

export const experience: TimelineEntry[] = [
  {
    id: "educanet",
    featured: true,
    period: { fr: "Février – Août 2026", en: "February – August 2026" },
    title: {
      fr: "Ingénieure IA — Projet de Fin d'Études",
      en: "AI Engineer — Final-Year Project",
    },
    org: "EducaNet",
    summary: {
      fr: "Plateforme intelligente d'analyse de données scolaires et de génération automatisée de rapports pédagogiques.",
      en: "Intelligent platform for school data analysis and automated generation of educational reports.",
    },
    bullets: [
      {
        fr: "Pipeline multi-agents (Analyse › Décision › Rapport) basé sur des LLMs, sur 266 000+ enregistrements scolaires",
        en: "LLM-based multi-agent pipeline (Analysis › Decision › Report) over 266,000+ school records",
      },
      {
        fr: "Intégration multi-fournisseurs de LLMs (Ollama, Groq, Gemini) avec benchmark comparatif de 4 modèles",
        en: "Multi-provider LLM integration (Ollama, Groq, Gemini) with a comparative benchmark of 4 models",
      },
      {
        fr: "Génération automatisée de 540+ rapports PDF personnalisés (ReportLab), taux de réussite > 95 %",
        en: "Automated generation of 540+ personalised PDF reports (ReportLab), > 95% success rate",
      },
      {
        fr: "Chatbot RAG et tableau de bord interactif (HTML/JS/Chart.js) couvrant 510 élèves, 27 classes et 6 niveaux",
        en: "RAG chatbot and interactive dashboard (HTML/JS/Chart.js) covering 510 students, 27 classes and 6 grade levels",
      },
      {
        fr: "Architecture de base de données multi-établissements (multi-tenant)",
        en: "Multi-school (multi-tenant) database architecture",
      },
    ],
    tags: ["LLMs", "Multi-agents", "RAG", "Ollama", "Groq", "Gemini", "ReportLab", "Chart.js"],
  },
  {
    id: "multiverse",
    period: { fr: "Été 2025", en: "Summer 2025" },
    title: { fr: "Stagiaire IA", en: "AI Intern" },
    org: "Multiverse IA",
    location: { fr: "Sousse", en: "Sousse" },
    summary: {
      fr: "Détection automatisée de lésions aviaires : annotation, modélisation et scraping multi-sources.",
      en: "Automated detection of poultry lesions: annotation, modelling and multi-source scraping.",
    },
    bullets: [
      { fr: "Système automatisé de détection de lésions aviaires", en: "Automated poultry lesion detection system" },
      {
        fr: "Annotation de données et création de jeux de données d'entraînement",
        en: "Data annotation and creation of training datasets",
      },
      {
        fr: "Modèles de Deep Learning pour la classification et la détection d'anomalies",
        en: "Deep Learning models for classification and anomaly detection",
      },
      { fr: "Scraping multi-sources pour enrichir les données", en: "Multi-source web scraping to enrich the data" },
    ],
    tags: ["Deep Learning", "Computer Vision", "Annotation", "Web Scraping"],
  },
  {
    id: "tunitech",
    period: { fr: "Octobre 2022", en: "October 2022" },
    title: { fr: "Stagiaire Développeuse Full Stack", en: "Full-Stack Developer Intern" },
    org: "TuniTech",
    bullets: [
      { fr: "Modules ERP (RH, Finance, Comptabilité)", en: "ERP modules (HR, Finance, Accounting)" },
      {
        fr: "Tableaux de bord analytiques et systèmes de suivi des tâches",
        en: "Analytics dashboards and task-tracking systems",
      },
    ],
  },
  {
    id: "sw-consulting",
    period: { fr: "Février – Juin 2022", en: "February – June 2022" },
    title: { fr: "Stagiaire Développeuse Web", en: "Web Developer Intern" },
    org: "SW Consulting",
    bullets: [
      { fr: "Plateforme web reliant transporteurs et clients", en: "Web platform connecting carriers and customers" },
      {
        fr: "Intégration de messagerie, notifications et emailing",
        en: "Messaging, notifications and email integration",
      },
    ],
  },
];

/** Schéma du pipeline multi-agents affiché dans l'expérience EducaNet */
export const educanetPipeline = {
  input: { value: "266 000+", label: { fr: "enregistrements scolaires", en: "school records" } },
  agents: [
    { name: { fr: "Analyse", en: "Analysis" }, hint: { fr: "Agent LLM", en: "LLM agent" } },
    { name: { fr: "Décision", en: "Decision" }, hint: { fr: "Agent LLM", en: "LLM agent" } },
    { name: { fr: "Rapport", en: "Report" }, hint: { fr: "Agent LLM", en: "LLM agent" } },
  ],
  output: { value: "540+", label: { fr: "rapports PDF", en: "PDF reports" } },
  ariaLabel: {
    fr: "Pipeline multi-agents : 266 000+ enregistrements scolaires passent par les agents Analyse, Décision puis Rapport pour produire 540+ rapports PDF.",
    en: "Multi-agent pipeline: 266,000+ school records flow through the Analysis, Decision and Report agents to produce 540+ PDF reports.",
  },
} satisfies {
  input: { value: string; label: L };
  agents: { name: L; hint: L }[];
  output: { value: string; label: L };
  ariaLabel: L;
};

export const projectFilters: { id: "all" | ProjectCategory; label: L }[] = [
  { id: "all", label: { fr: "Tous", en: "All" } },
  { id: "llm", label: { fr: "LLM / RAG", en: "LLM / RAG" } },
  { id: "dl", label: { fr: "Deep Learning", en: "Deep Learning" } },
  { id: "ml", label: { fr: "Machine Learning", en: "Machine Learning" } },
];

export const projects: Project[] = [
  {
    id: "smart-finance",
    featured: true,
    icon: "trending",
    title: { fr: "Smart Finance — L'Assistant Financier IA", en: "Smart Finance — The AI Financial Assistant" },
    summary: {
      fr: "Posez vos questions en langage naturel sur des rapports financiers complexes (10-Q, bilans, transcripts) : des agents IA extraient les informations clés.",
      en: "Ask natural-language questions about complex financial reports (10-Q filings, balance sheets, call transcripts): AI agents extract the key information.",
    },
    context: {
      fr: "Projet Intégré Multidisciplinaire (PIM), en collaboration avec la startup MitaversIA. Encadrement professionnel : Dr Amine Mosbah · encadrement académique : Dr Amal Jlassi.",
      en: "Multidisciplinary Integrated Project (PIM), in collaboration with the startup MitaversIA. Industry supervisor: Dr Amine Mosbah · academic supervisor: Dr Amal Jlassi.",
    },
    description: [
      {
        fr: "Smart Finance combine IA, systèmes multi-agents et analyse documentaire pour extraire automatiquement les informations clés de documents financiers complexes : rapports PDF 10-Q, bilans, transcripts d'appels.",
        en: "Smart Finance combines AI, multi-agent systems and document analysis to automatically extract key information from complex financial documents: 10-Q PDF reports, balance sheets, call transcripts.",
      },
      {
        fr: "L'utilisateur choisit une base existante (Amazon, Google, Meta Q3 2024…) ou téléverse son propre PDF, puis pose ses questions en langage naturel.",
        en: "Users pick an existing knowledge base (Amazon, Google, Meta Q3 2024…) or upload their own PDF, then ask questions in natural language.",
      },
    ],
    objectives: [
      { fr: "Réduire le temps d'analyse", en: "Reduce analysis time" },
      { fr: "Renforcer la sécurité des données (traitement local)", en: "Strengthen data security (local processing)" },
      { fr: "Offrir un accès simple aux insights financiers", en: "Provide simple access to financial insights" },
    ],
    models: [
      {
        name: "DeepSeek-R1",
        pros: [
          { fr: "Spécialité : code & finance", en: "Strength: code & finance" },
          { fr: "Open-source", en: "Open-source" },
        ],
        cons: [{ fr: "Limité dans les cas complexes", en: "Limited on complex cases" }],
      },
      {
        name: "Llama 3",
        pros: [
          { fr: "Très bon en génération", en: "Very good at generation" },
          { fr: "Support LangChain / Ollama", en: "LangChain / Ollama support" },
        ],
        cons: [{ fr: "Usage restreint / limité", en: "Restricted / limited usage" }],
      },
      {
        name: "GPT-3 (API)",
        pros: [
          { fr: "Excellente compréhension du langage", en: "Excellent language understanding" },
          { fr: "Multimodal & robuste", en: "Multimodal & robust" },
        ],
        cons: [{ fr: "Coûteux à grande échelle", en: "Costly at scale" }],
      },
    ],
    categories: ["llm"],
    tags: ["LLMs", "LangChain", "RAG", "Multi-agents", "Ollama", "Streamlit"],
    cover: {
      src: "/projets/smart-finance-accueil.png",
      alt: {
        fr: "Écran d'accueil de Smart Finance : choix d'une base de données financière",
        en: "Smart Finance home screen: choosing a financial knowledge base",
      },
      width: 654,
      height: 447,
    },
    gallery: [
      {
        src: "/projets/smart-finance-accueil.png",
        alt: {
          fr: "Accueil : sélection d'une base existante ou téléversement d'un rapport",
          en: "Home: select an existing base or upload a report",
        },
        width: 654,
        height: 447,
      },
      {
        src: "/projets/smart-finance-upload.png",
        alt: {
          fr: "Téléversement et traitement d'un PDF, puis saisie d'une question",
          en: "Uploading and processing a PDF, then asking a question",
        },
        width: 858,
        height: 358,
      },
      {
        src: "/projets/smart-finance-chat.png",
        alt: {
          fr: "Question posée et réponse générée à partir d'un rapport financier",
          en: "A question and the generated answer based on a financial report",
        },
        width: 851,
        height: 388,
      },
      {
        src: "/projets/smart-finance-modeles.png",
        alt: {
          fr: "Comparatif des modèles DeepSeek-R1, Llama 3 et GPT-3",
          en: "Comparison of DeepSeek-R1, Llama 3 and GPT-3",
        },
        width: 360,
        height: 432,
      },
    ],
    github: "https://github.com/abirabir1/financial-analyst-ai-pimS2",
  },
  {
    id: "educanet",
    icon: "school",
    title: { fr: "EducaNet AI — Analyse pédagogique intelligente", en: "EducaNet AI — Intelligent educational analytics" },
    summary: {
      fr: "Pipeline LLM multi-agents qui analyse 266 000+ enregistrements scolaires et génère 540+ rapports pédagogiques personnalisés.",
      en: "Multi-agent LLM pipeline that analyses 266,000+ school records and generates 540+ personalised educational reports.",
    },
    highlight: { fr: "Projet de Fin d'Études", en: "Final-Year Project" },
    description: [
      {
        fr: "Plateforme intelligente d'analyse de données scolaires et de génération automatisée de rapports pédagogiques, réalisée chez EducaNet (février – août 2026).",
        en: "Intelligent platform for school data analysis and automated educational report generation, built at EducaNet (February – August 2026).",
      },
      {
        fr: "Un pipeline multi-agents (Analyse › Décision › Rapport) s'appuie sur plusieurs fournisseurs de LLMs (Ollama, Groq, Gemini), comparés lors d'un benchmark de 4 modèles. Les 540+ rapports PDF sont générés avec ReportLab, avec un taux de réussite supérieur à 95 %.",
        en: "A multi-agent pipeline (Analysis › Decision › Report) relies on several LLM providers (Ollama, Groq, Gemini), compared in a 4-model benchmark. The 540+ PDF reports are generated with ReportLab, with a success rate above 95%.",
      },
      {
        fr: "Un chatbot RAG et un tableau de bord interactif (HTML/JS/Chart.js) couvrent 510 élèves, 27 classes et 6 niveaux, sur une architecture de base de données multi-établissements.",
        en: "A RAG chatbot and an interactive dashboard (HTML/JS/Chart.js) cover 510 students, 27 classes and 6 grade levels, on a multi-school database architecture.",
      },
    ],
    categories: ["llm"],
    tags: ["LLMs", "Multi-agents", "RAG", "Ollama", "Groq", "Gemini", "ReportLab", "Chart.js"],
    github: "",
    privateNote: { fr: "Projet confidentiel · démo sur demande", en: "Confidential project · demo on request" },
  },
  {
    id: "clarimed",
    icon: "stethoscope",
    title: { fr: "ClariMed — Simplification de documents médicaux", en: "ClariMed — Medical document simplification" },
    summary: {
      fr: "Transforme des textes médicaux complexes en langage accessible (FR/EN), avec chatbot explicatif et niveaux de risque.",
      en: "Turns complex medical texts into plain language (FR/EN), with an explanatory chatbot and risk levels.",
    },
    description: [
      {
        fr: "Système NLP combinant T5, LLMs et RAG qui transforme des textes médicaux complexes en langage accessible, en français et en anglais.",
        en: "NLP system combining T5, LLMs and RAG that turns complex medical texts into plain language, in French and English.",
      },
      {
        fr: "Un chatbot explicatif répond aux questions du patient et indique des niveaux de risque.",
        en: "An explanatory chatbot answers patient questions and indicates risk levels.",
      },
    ],
    categories: ["llm"],
    tags: ["NLP", "T5", "LLMs", "RAG"],
    github: "",
    privateNote: { fr: "Code confidentiel · démo sur demande", en: "Confidential code · demo on request" },
  },
  {
    id: "heart-disease",
    icon: "heart",
    title: { fr: "Prédiction du risque de maladies cardiaques", en: "Heart disease risk prediction" },
    summary: {
      fr: "Modèle de Machine Learning qui prédit le risque de maladie cardiaque à partir de données cliniques.",
      en: "Machine Learning model that predicts heart disease risk from clinical data.",
    },
    description: [
      {
        fr: "Modèle de Machine Learning prédisant le risque de maladie cardiaque à partir de données cliniques, pour améliorer le diagnostic précoce.",
        en: "Machine Learning model predicting heart disease risk from clinical data, to support earlier diagnosis.",
      },
    ],
    categories: ["ml"],
    tags: ["Machine Learning", "Scikit-learn", "Santé"],
    github: "https://github.com/abirabir1/PIM-heart-disease",
  },
  {
    id: "breast-cancer",
    icon: "scan",
    title: { fr: "Détection du cancer du sein", en: "Breast cancer detection" },
    summary: {
      fr: "Modèle CNN (ResNet101) atteignant 94 % de précision pour la détection précoce.",
      en: "CNN model (ResNet101) reaching 94% accuracy for early detection.",
    },
    description: [
      {
        fr: "Modèle de Deep Learning basé sur un CNN ResNet101, atteignant 94 % de précision pour la détection précoce du cancer du sein.",
        en: "Deep Learning model based on a ResNet101 CNN, reaching 94% accuracy for early breast cancer detection.",
      },
    ],
    categories: ["dl"],
    tags: ["Deep Learning", "CNN", "ResNet101", "Computer Vision"],
    github: "",
    privateNote: { fr: "Code confidentiel · démo sur demande", en: "Confidential code · demo on request" },
  },
  {
    id: "hydroponics",
    icon: "sprout",
    title: { fr: "Hydroponie intelligente", en: "Smart hydroponics" },
    highlight: { fr: "2e place · AI 4 The Blue Horizons", en: "2nd place · AI 4 The Blue Horizons" },
    summary: {
      fr: "Solution IA pour l'hydroponie, réalisée en équipe lors du hackathon AI 4 The Blue Horizons (2e place).",
      en: "AI solution for hydroponics, built as a team at the AI 4 The Blue Horizons hackathon (2nd place).",
    },
    description: [
      {
        fr: "Solution d'intelligence artificielle appliquée à l'hydroponie, conçue en équipe lors du hackathon AI 4 The Blue Horizons, où elle a obtenu la 2e place.",
        en: "Artificial intelligence solution applied to hydroponics, designed as a team during the AI 4 The Blue Horizons hackathon, where it won 2nd place.",
      },
    ],
    categories: ["ml"],
    tags: ["IA", "Hackathon", "Hydroponie"],
    github: "",
    privateNote: { fr: "Code confidentiel · démo sur demande", en: "Confidential code · demo on request" },
  },
];

export const hackathons: Hackathon[] = [
  {
    id: "blue-horizons",
    icon: "sprout",
    rank: 2,
    rankLabel: { fr: "2e place", en: "2nd place" },
    title: { fr: "Hackathon AI 4 The Blue Horizons", en: "AI 4 The Blue Horizons Hackathon" },
    summary: {
      fr: "Solution IA pour l'hydroponie, réalisée en équipe.",
      en: "AI solution for hydroponics, built as a team.",
    },
    presentation: "", // À AJOUTER : lien Canva en lecture seule
    tags: ["IA", "Hydroponie", "Travail d'équipe"],
  },
  {
    id: "ai4-new-generation",
    rank: 3,
    rankLabel: { fr: "3e place", en: "3rd place" },
    title: {
      fr: "Hackathon national AI 4 The New Generation",
      en: "AI 4 The New Generation national hackathon",
    },
    date: { fr: "22 décembre 2024 · EY Tunisie × UIK", en: "December 22, 2024 · EY Tunisia × UIK" },
    summary: {
      fr: "Un système de recrutement intelligent pour optimiser l'évaluation technique des candidats EY, avec LangChain et des LLMs.",
      en: "An intelligent recruitment system to streamline the technical assessment of EY candidates, built with LangChain and LLMs.",
    },
    details: [{ fr: "19 équipes issues de 10 écoles", en: "19 teams from 10 schools" }],
    image: {
      src: "/certifications/hackathon-ey-ai4-new-generation.png",
      alt: {
        fr: "Certificat de participation au hackathon AI 4 The New Generation (EY × UIK), 22/12/2024",
        en: "Certificate of participation, AI 4 The New Generation hackathon (EY × UIK), 22/12/2024",
      },
      width: 800,
      height: 640,
    },
    presentation: "", // À AJOUTER : lien Canva en lecture seule
    tags: ["LangChain", "LLMs", "Recrutement"],
  },
  {
    id: "deeptech-winter-academy",
    icon: "brain",
    title: { fr: "DeepTech Winter Academy", en: "DeepTech Winter Academy" },
    date: { fr: "Université Ibn Khaldoun", en: "Ibn Khaldoun University" },
    summary: {
      fr: "Formation intensive de 3 jours sur l'IA et le Deep Learning (applications RSE et industrie 4.0), avec le NVIDIA Deep Learning Bootcamp.",
      en: "Intensive 3-day training on AI and Deep Learning (CSR and Industry 4.0 applications), including the NVIDIA Deep Learning Bootcamp.",
    },
    details: [
      { fr: "A mené à la certification NVIDIA Fundamentals of Deep Learning", en: "Led to the NVIDIA Fundamentals of Deep Learning certification" },
    ],
    presentation: "",
    tags: ["Deep Learning", "NVIDIA"],
  },
];

export const certifications: Certification[] = [
  {
    id: "duke-xai",
    title: { fr: "Explainable AI (XAI) — spécialisation 3 cours", en: "Explainable AI (XAI) — 3-course specialization" },
    issuer: "Duke University · Coursera",
    date: { fr: "8 mai 2025", en: "May 8, 2025" },
    description: {
      fr: "Principes de l'IA explicable · LIME, SHAP, Integrated Gradients · interprétation de modèles en vision, NLP et données tabulaires · confiance, transparence et éthique.",
      en: "Principles of explainable AI · LIME, SHAP, Integrated Gradients · model interpretation for vision, NLP and tabular data · trust, transparency and ethics.",
    },
    image: {
      src: "/certifications/duke-explainable-ai.png",
      alt: { fr: "Certificat Duke University — Explainable AI", en: "Duke University certificate — Explainable AI" },
      width: 1772,
      height: 928,
    },
    verifyUrl: "https://coursera.org/verify/specialization/KIBJ7M59OFMC",
  },
  {
    id: "ibm-pytorch",
    title: { fr: "Deep Learning with PyTorch", en: "Deep Learning with PyTorch" },
    issuer: "IBM · Coursera",
    date: { fr: "8 mai 2025", en: "May 8, 2025" },
    description: {
      fr: "Fait partie de la spécialisation IBM « Deep Learning with PyTorch, Keras and TensorFlow ».",
      en: "Part of the IBM “Deep Learning with PyTorch, Keras and TensorFlow” specialization.",
    },
    image: {
      src: "/certifications/ibm-deep-learning-pytorch.png",
      alt: { fr: "Certificat IBM — Deep Learning with PyTorch", en: "IBM certificate — Deep Learning with PyTorch" },
      width: 1772,
      height: 928,
    },
    verifyUrl: "https://coursera.org/verify/JQWLH1P3RC90",
  },
  {
    id: "nvidia-dl",
    title: { fr: "Fundamentals of Deep Learning", en: "Fundamentals of Deep Learning" },
    issuer: "NVIDIA",
    date: { fr: "29 décembre 2024", en: "December 29, 2024" },
    image: {
      src: "/certifications/nvidia-fundamentals-deep-learning.png",
      alt: { fr: "Certificat NVIDIA — Fundamentals of Deep Learning", en: "NVIDIA certificate — Fundamentals of Deep Learning" },
      width: 800,
      height: 645,
    },
    verifyUrl: "",
    credentialId: "w8ZgzG0kR7eBRD96C2JwOg",
  },
  {
    id: "t3alem-ds",
    title: { fr: "Data Science", en: "Data Science" },
    issuer: "T3alem.tn",
    date: null,
    pdf: "/certifications/t3alem-data-science.pdf",
    verifyUrl: "",
  },
  {
    id: "ibm-ai-engineering",
    title: { fr: "IBM AI Engineering", en: "IBM AI Engineering" },
    issuer: "IBM",
    date: null,
    verifyUrl: "", // À AJOUTER
  },
  {
    id: "google-ada",
    title: { fr: "Google Advanced Data Analytics", en: "Google Advanced Data Analytics" },
    issuer: "Google",
    date: null,
    verifyUrl: "", // À AJOUTER
  },
  {
    id: "azure-ml",
    title: { fr: "Microsoft Azure ML for Data Scientists", en: "Microsoft Azure ML for Data Scientists" },
    issuer: "Microsoft",
    date: null,
    verifyUrl: "", // À AJOUTER
  },
  {
    id: "it-pm",
    title: { fr: "IT Project Management", en: "IT Project Management" },
    issuer: "", // À AJOUTER
    date: null,
    verifyUrl: "", // À AJOUTER
  },
];

export const skills: SkillGroup[] = [
  { id: "languages", icon: "code", title: { fr: "Langages", en: "Languages" }, items: ["Python", "JavaScript", "SQL"] },
  {
    id: "ai",
    icon: "brain",
    title: { fr: "IA / ML", en: "AI / ML" },
    items: ["Deep Learning", "NLP", "LLMs", "RAG", "Multi-agents", "XAI (LIME, SHAP)", "Computer Vision"],
  },
  {
    id: "frameworks",
    icon: "layers",
    title: { fr: "Frameworks", en: "Frameworks" },
    items: ["PyTorch", "TensorFlow", "Scikit-learn", "LangChain"],
  },
  {
    id: "llm-tools",
    icon: "bot",
    title: { fr: "LLM & outils", en: "LLM & tools" },
    items: ["Ollama", "Groq", "Gemini", "DeepSeek", "Llama 3", "GPT"],
  },
  { id: "data", icon: "database", title: { fr: "Data", en: "Data" }, items: ["Pandas", "NumPy", "Matplotlib", "Chart.js"] },
  {
    id: "backend",
    icon: "server",
    title: { fr: "Backend & outils", en: "Backend & tools" },
    items: ["FastAPI", "Streamlit", "ReportLab", "Git", "GitHub"],
  },
];

export const nav: { id: string; label: L }[] = [
  { id: "accueil", label: { fr: "Accueil", en: "Home" } },
  { id: "a-propos", label: { fr: "À propos", en: "About" } },
  { id: "experience", label: { fr: "Expérience", en: "Experience" } },
  { id: "projets", label: { fr: "Projets", en: "Projects" } },
  { id: "hackathons", label: { fr: "Hackathons", en: "Hackathons" } },
  { id: "certifications", label: { fr: "Certifications", en: "Certifications" } },
  { id: "competences", label: { fr: "Compétences", en: "Skills" } },
  { id: "contact", label: { fr: "Contact", en: "Contact" } },
];
