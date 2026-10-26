import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SiteBackground } from "@/components/layout/SiteBackground";
import { SkipLink } from "@/components/layout/SkipLink";
import { About } from "@/components/sections/About";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hackathons } from "@/components/sections/Hackathons";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { JsonLd } from "@/components/seo/JsonLd";
import { Suspense } from "react";

/*
 * Chaque <Suspense> crée une frontière d'hydratation : React active les sections une par une
 * en rendant la main au navigateur entre deux, au lieu d'un long blocage avant le premier affichage.
 */
export default function Home() {
  return (
    <>
      <SiteBackground />
      <SkipLink />
      <Suspense>
        <Navbar />
      </Suspense>
      <main id="contenu" tabIndex={-1} className="outline-none">
        <Suspense>
          <Hero />
        </Suspense>
        <Suspense>
          <About />
        </Suspense>
        <Suspense>
          <Experience />
        </Suspense>
        <Suspense>
          <Projects />
        </Suspense>
        <Suspense>
          <Hackathons />
        </Suspense>
        <Suspense>
          <Certifications />
        </Suspense>
        <Suspense>
          <Skills />
        </Suspense>
        <Suspense>
          <Contact />
        </Suspense>
      </main>
      <Suspense>
        <Footer />
      </Suspense>
      <JsonLd />
    </>
  );
}
