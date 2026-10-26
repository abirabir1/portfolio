import { certifications, profile } from "@/data/portfolio";
import { siteUrl } from "@/lib/site";

/** Données structurées schema.org (Person) pour les moteurs de recherche */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role.fr,
    url: siteUrl,
    image: `${siteUrl}${profile.photo.src}`,
    email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", addressCountry: "TN" },
    sameAs: [profile.socials.linkedin, profile.socials.github].filter(Boolean),
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Université Ibn Khaldoun" },
      { "@type": "CollegeOrUniversity", name: "ISET Kairouan" },
    ],
    knowsAbout: ["LLM", "RAG", "Multi-agent systems", "Deep Learning", "Explainable AI", "Computer Vision", "NLP"],
    hasCredential: certifications.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.title.en,
      ...(c.issuer ? { recognizedBy: { "@type": "Organization", name: c.issuer } } : {}),
      ...(c.verifyUrl ? { url: c.verifyUrl } : {}),
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
