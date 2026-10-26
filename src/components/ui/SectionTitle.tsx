"use client";

import { usePreferences } from "@/components/providers/PreferencesProvider";
import type { L } from "@/data/portfolio";
import { Reveal } from "./Reveal";

type SectionTitleProps = {
  eyebrow: L;
  title: L;
  intro?: L;
  id?: string;
};

export function SectionTitle({ eyebrow, title, intro, id }: SectionTitleProps) {
  const { t } = usePreferences();
  return (
    <Reveal className="mb-12 max-w-2xl">
      <p className="mb-3 flex items-center gap-3 font-mono text-xs font-medium tracking-[0.2em] text-cyan uppercase">
        <span aria-hidden className="h-px w-8 bg-gradient-brand" />
        {t(eyebrow)}
      </p>
      <h2 id={id} className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
        {t(title)}
      </h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-fg-muted">{t(intro)}</p>}
    </Reveal>
  );
}
