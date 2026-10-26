"use client";

import { useState } from "react";
import { CertificationCard, VerifyLinks } from "@/components/certifications/CertificationCard";
import { Lightbox } from "@/components/ui/Lightbox";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { type Certification, certifications } from "@/data/portfolio";
import { ui } from "@/data/ui";

export function Certifications() {
  const [open, setOpen] = useState<Certification | null>(null);

  // Les certifications avec image d'abord, puis les autres
  const withImage = certifications.filter((c) => c.image);
  const others = certifications.filter((c) => !c.image);

  return (
    <Section id="certifications" {...ui.sections.certifications}>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {withImage.map((cert, i) => (
          <li key={cert.id}>
            <Reveal delay={i * 0.06} className="h-full">
              <CertificationCard cert={cert} onOpenImage={() => setOpen(cert)} />
            </Reveal>
          </li>
        ))}
      </ul>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {others.map((cert, i) => (
          <li key={cert.id}>
            <Reveal delay={i * 0.05} className="h-full">
              <CertificationCard cert={cert} />
            </Reveal>
          </li>
        ))}
      </ul>

      <Lightbox
        images={open?.image ? [open.image] : []}
        index={open ? 0 : null}
        onChange={(index) => index === null && setOpen(null)}
        footer={open ? <VerifyLinks cert={open} /> : null}
      />
    </Section>
  );
}
