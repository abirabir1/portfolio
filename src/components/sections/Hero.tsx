"use client";

import { ArrowDown, Download, MapPin } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";
import { Counter } from "@/components/hero/Counter";
import { NeuralBackground } from "@/components/hero/NeuralBackground";
import { Typewriter } from "@/components/hero/Typewriter";
import { usePreferences } from "@/components/providers/PreferencesProvider";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { profile, stats } from "@/data/portfolio";
import { ui } from "@/data/ui";

export function Hero() {
  const { t, locale } = usePreferences();
  const words = useMemo(() => profile.typewriter.map((w) => w[locale]), [locale]);

  // Apparition en CSS (globals.css) : le contenu est peint sans attendre le JavaScript
  const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as React.CSSProperties;

  return (
    <section id="accueil" aria-label={profile.name} className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-36">
      {/* Arrière-plan : grille, halos et réseau de neurones */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] opacity-60" />
        <div className="absolute -top-40 -left-32 size-[34rem] rounded-full bg-violet/25 blur-[120px]" />
        <div className="absolute top-20 -right-40 size-[30rem] rounded-full bg-pink/15 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 size-[22rem] rounded-full bg-cyan/10 blur-[110px]" />
        <NeuralBackground />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:px-8">
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <p
            style={delay(0)}
            className="hero-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1.5 text-xs font-medium text-emerald-300 light:text-emerald-700"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            {t(profile.availability)}
          </p>

          <p style={delay(0.05)} className="hero-fade-up font-mono text-sm text-cyan">
            {t(ui.hero.greeting)}
          </p>
          <h1 className="hero-rise mt-2 font-display text-5xl font-bold tracking-tight text-fg sm:text-6xl lg:text-7xl"
          >
            {profile.name}
          </h1>
          <p style={delay(0.18)} className="hero-fade-up mt-4 font-display text-lg font-medium text-fg sm:text-xl">
            {t(profile.role)}
          </p>

          <p style={delay(0.24)} className="hero-fade-up mt-5 min-h-[2.25rem] font-display text-2xl font-semibold sm:text-3xl">
            <span className="mr-2 text-fg-subtle">{t(ui.hero.specialisedIn)}</span>
            <Typewriter key={locale} words={words} />
          </p>

          <p style={delay(0.3)} className="hero-fade-up mx-auto mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg lg:mx-0">
            {t(profile.tagline)}
          </p>

          <p
            style={delay(0.34)}
            className="hero-fade-up mt-4 inline-flex items-center gap-1.5 text-sm text-fg-subtle"
          >
            <MapPin className="size-4 text-pink" aria-hidden />
            {t(profile.location)}
          </p>

          <div
            style={delay(0.4)}
            className="hero-fade-up mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <a
              href="#projets"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-gradient-brand px-6 font-semibold text-white shadow-lg shadow-violet/30 transition-all hover:shadow-xl hover:shadow-pink/30"
            >
              {t(ui.hero.viewProjects)}
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
            </a>
            <a
              href={profile.cv}
              download
              className="inline-flex h-12 items-center gap-2 rounded-full border border-border-strong bg-surface px-6 font-semibold text-fg backdrop-blur transition-colors hover:border-violet/60"
            >
              <Download className="size-4" aria-hidden />
              {t(ui.hero.downloadCv)}
            </a>
          </div>

          <div style={delay(0.46)} className="hero-fade-up mt-6 flex justify-center lg:justify-start">
            <SocialLinks />
          </div>
        </div>

        {/* Photo dans un cadre arrondi avec anneau en dégradé */}
        <div className="hero-zoom relative order-1 mx-auto w-64 sm:w-80 lg:order-2 lg:w-full lg:max-w-md"
        >
          <div aria-hidden className="absolute -inset-6 rounded-[2.5rem] bg-gradient-brand opacity-30 blur-3xl" />
          <div className="relative rounded-[2rem] bg-[linear-gradient(140deg,var(--violet),var(--pink),var(--cyan))] p-[2px] shadow-2xl shadow-violet/20">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(2rem-2px)] bg-bg-soft">
              <Image
                src={profile.photo.src}
                alt={t(profile.photo.alt)}
                fill
                priority
                sizes="(min-width: 1024px) 448px, (min-width: 640px) 320px, 256px"
                className="object-cover object-[50%_20%]"
              />
            </div>
          </div>
          <div className="absolute -bottom-5 -left-6 z-10 hidden rounded-2xl border border-border-strong bg-bg-soft/90 px-4 py-3 shadow-xl shadow-black/30 backdrop-blur-md sm:block">
            <p className="font-mono text-[11px] tracking-wider text-fg-subtle uppercase">LLMs · RAG · XAI</p>
            <p className="font-display text-sm font-semibold text-fg">{t(profile.shortRole)}</p>
          </div>
        </div>
      </div>

      {/* Compteurs */}
      <div className="mx-auto mt-16 max-w-6xl px-4 sm:mt-20 sm:px-6 lg:px-8">
        <dl
          style={delay(0.55)}
          className="hero-fade-up grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label.fr} className="flex flex-col gap-1 bg-bg-soft/95 px-5 py-5 sm:px-6">
              <dt className="order-2 text-sm text-fg-muted">{t(stat.label)}</dt>
              <dd className="order-1 font-mono text-2xl font-bold text-cyan sm:text-3xl">
                <Counter value={stat.value} suffix={stat.suffix} locale={locale} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
