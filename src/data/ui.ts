import type { L } from "./portfolio";

/** Libellés d'interface (boutons, titres de section, messages) */
export const ui = {
  skipToContent: { fr: "Aller au contenu", en: "Skip to content" },
  menu: { fr: "Menu", en: "Menu" },
  closeMenu: { fr: "Fermer le menu", en: "Close menu" },
  switchLanguage: { fr: "Switch to English", en: "Passer en français" },
  switchToLight: { fr: "Passer en mode clair", en: "Switch to light mode" },
  switchToDark: { fr: "Passer en mode sombre", en: "Switch to dark mode" },

  hero: {
    greeting: { fr: "Bonjour, je suis", en: "Hi, I'm" },
    specialisedIn: { fr: "Spécialisée en", en: "Specialised in" },
    viewProjects: { fr: "Voir mes projets", en: "View my projects" },
    downloadCv: { fr: "Télécharger mon CV", en: "Download my CV" },
  },

  sections: {
    about: { eyebrow: { fr: "À propos", en: "About" }, title: { fr: "Des données aux décisions", en: "From data to decisions" } },
    journey: { eyebrow: { fr: "Parcours", en: "Journey" }, title: { fr: "Formation", en: "Education" } },
    experience: {
      eyebrow: { fr: "Expérience", en: "Experience" },
      title: { fr: "Expérience professionnelle", en: "Professional experience" },
    },
    projects: { eyebrow: { fr: "Projets", en: "Projects" }, title: { fr: "Ce que j'ai construit", en: "What I've built" } },
    hackathons: {
      eyebrow: { fr: "Hackathons", en: "Hackathons" },
      title: { fr: "Hackathons & événements", en: "Hackathons & events" },
    },
    certifications: {
      eyebrow: { fr: "Certifications", en: "Certifications" },
      title: { fr: "Certifications vérifiables", en: "Verifiable certifications" },
    },
    skills: { eyebrow: { fr: "Compétences", en: "Skills" }, title: { fr: "Ma boîte à outils", en: "My toolbox" } },
    contact: { eyebrow: { fr: "Contact", en: "Contact" }, title: { fr: "Travaillons ensemble", en: "Let's work together" } },
  },

  about: {
    location: { fr: "Localisation", en: "Location" },
    languages: { fr: "Langues", en: "Languages" },
  },

  experience: { featured: { fr: "Expérience phare", en: "Key experience" } },

  projects: {
    featured: { fr: "Projet vedette", en: "Featured project" },
    details: { fr: "Détails", en: "Details" },
    github: { fr: "GitHub", en: "GitHub" },
    context: { fr: "Contexte", en: "Context" },
    objectives: { fr: "Objectifs", en: "Objectives" },
    models: { fr: "Modèles comparés", en: "Models compared" },
    gallery: { fr: "Galerie", en: "Gallery" },
    close: { fr: "Fermer", en: "Close" },
    filterLabel: { fr: "Filtrer les projets", en: "Filter projects" },
  },

  hackathons: {
    presentation: { fr: "Voir la présentation", en: "View the presentation" },
    training: { fr: "Formation", en: "Training" },
  },

  certifications: {
    verify: { fr: "Vérifier", en: "Verify" },
    credentialId: { fr: "ID de vérification", en: "Credential ID" },
    viewPdf: { fr: "Voir le PDF", en: "View PDF" },
    viewCertificate: { fr: "Voir le certificat", en: "View certificate" },
  },

  contact: {
    intro: {
      fr: "Une opportunité en IA, data ou ML ? Une question sur un projet ? Écrivez-moi, je réponds rapidement.",
      en: "An AI, data or ML opportunity? A question about a project? Write to me, I reply quickly.",
    },
    email: { fr: "Email", en: "Email" },
    name: { fr: "Nom", en: "Name" },
    message: { fr: "Message", en: "Message" },
    subject: { fr: "Sujet", en: "Subject" },
    send: { fr: "Envoyer le message", en: "Send message" },
    sending: { fr: "Envoi…", en: "Sending…" },
    success: { fr: "Merci ! Votre message a bien été envoyé.", en: "Thank you! Your message has been sent." },
    error: {
      fr: "L'envoi a échoué. Vous pouvez m'écrire directement par email.",
      en: "Sending failed. You can email me directly.",
    },
    required: { fr: "Ce champ est requis.", en: "This field is required." },
    invalidEmail: { fr: "Adresse email invalide.", en: "Invalid email address." },
    tooShort: { fr: "Votre message est un peu court (10 caractères minimum).", en: "Your message is a bit short (10 characters minimum)." },
  },

  footer: {
    rights: { fr: "Ingénieure IA", en: "AI Engineer" },
    backToTop: { fr: "Retour en haut", en: "Back to top" },
  },

  lightbox: {
    close: { fr: "Fermer", en: "Close" },
    previous: { fr: "Image précédente", en: "Previous image" },
    next: { fr: "Image suivante", en: "Next image" },
  },
} satisfies Record<string, unknown>;

export type { L };
