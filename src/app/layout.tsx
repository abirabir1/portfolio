import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { PreferencesProvider, themeInitScript } from "@/components/providers/PreferencesProvider";
import { profile } from "@/data/portfolio";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], display: "swap" });
// Police secondaire (petits libellés) : pas préchargée, pour laisser la bande passante à la photo du hero
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const title = `${profile.name} — ${profile.role.fr}`;
const description =
  "Ingénieure IA spécialisée en LLMs, RAG, systèmes multi-agents, Deep Learning et IA explicable. Projets chiffrés, podiums en hackathon et certifications vérifiables.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s · ${profile.name}` },
  description,
  keywords: [
    "Abir El Abed",
    "Ingénieure IA",
    "AI Engineer",
    "Data Science",
    "LLM",
    "RAG",
    "Multi-agents",
    "Deep Learning",
    "XAI",
    "Tunisie",
  ],
  authors: [{ name: profile.name, url: profile.socials.linkedin }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    url: "/",
    siteName: profile.name,
    title,
    description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: profile.name }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#070b1a" },
    { media: "(prefers-color-scheme: light)", color: "#f7f7fc" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      data-theme="dark"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-dvh overflow-x-clip antialiased">
        {/* Applique le thème mémorisé avant l'affichage (évite un flash) ; Next l'injecte dans <head> */}
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <PreferencesProvider>{children}</PreferencesProvider>
      </body>
    </html>
  );
}
