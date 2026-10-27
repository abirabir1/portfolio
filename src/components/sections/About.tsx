"use client";

import { GraduationCap, Languages, MapPin } from "lucide-react";
import Image from "next/image";
import { usePreferences } from "@/components/providers/PreferencesProvider";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { about, education, profile } from "@/data/portfolio";
import { ui } from "@/data/ui";

export function About() {
  const { t } = usePreferences();
  return (
    <Section id="a-propos" {...ui.sections.about}>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <Reveal className="mx-auto w-full max-w-sm">
          <div className="glass glow-border relative overflow-hidden rounded-3xl p-2">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-white">
              <Image
                src={profile.aboutPhoto.src}
                alt={t(profile.aboutPhoto.alt)}
                fill
                sizes="(min-width: 1024px) 380px, 90vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal className="space-y-5 text-base leading-relaxed text-fg-muted sm:text-lg">
            {about.paragraphs.map((p) => (
              <p key={p.fr}>{t(p)}</p>
            ))}
          </Reveal>

          <Reveal delay={0.1} className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="glass rounded-2xl p-5">
              <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-fg">
                <MapPin className="size-4 text-pink" aria-hidden />
                {t(ui.about.location)}
              </p>
              <p className="text-fg-muted">{t(profile.location)}</p>
            </div>
            <div className="glass rounded-2xl p-5">
              <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-fg">
                <Languages className="size-4 text-cyan" aria-hidden />
                {t(ui.about.languages)}
              </p>
              <ul className="space-y-1.5">
                {about.languages.map((lang) => (
                  <li key={lang.name.fr} className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-fg">{t(lang.name)}</span>
                    <span className="text-fg-subtle">{t(lang.level)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Formation */}
          <Reveal delay={0.15} className="mt-10">
            <h3 className="mb-5 flex items-center gap-2 font-display text-xl font-semibold text-fg">
              <GraduationCap className="size-5 text-violet-soft" aria-hidden />
              {t(ui.sections.journey.title)}
            </h3>
            <ol className="relative space-y-6 border-l border-border pl-6">
              {education.map((item) => (
                <li key={item.id} className="relative">
                  <span
                    aria-hidden
                    className="absolute top-1.5 -left-[calc(1.5rem+5px)] size-2.5 rounded-full bg-gradient-brand ring-4 ring-bg"
                  />
                  <p className="font-mono text-xs text-cyan">{t(item.period)}</p>
                  <p className="mt-1 font-semibold text-fg">{t(item.title)}</p>
                  <p className="text-sm text-fg-muted">
                    {item.org}
                    {item.location && ` · ${t(item.location)}`}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
