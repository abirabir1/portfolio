import type { L } from "@/data/portfolio";
import { SectionTitle } from "./SectionTitle";

type SectionProps = {
  id: string;
  eyebrow: L;
  title: L;
  intro?: L;
  children: React.ReactNode;
  className?: string;
};

/** Conteneur standard d'une section : ancre, titre et largeur maximale */
export function Section({ id, eyebrow, title, intro, children, className = "" }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`relative py-16 sm:py-24 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle id={`${id}-title`} eyebrow={eyebrow} title={title} intro={intro} />
        {children}
      </div>
    </section>
  );
}
