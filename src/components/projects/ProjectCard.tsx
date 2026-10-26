"use client";

import { ArrowUpRight, Lock, Star } from "lucide-react";
import Image from "next/image";
import { usePreferences } from "@/components/providers/PreferencesProvider";
import { GithubIcon } from "@/components/ui/SocialLinks";
import { TagList } from "@/components/ui/Tag";
import type { Project } from "@/data/portfolio";
import { ui } from "@/data/ui";
import { ProjectIllustration } from "./ProjectIllustration";

type ProjectCardProps = { project: Project; onOpen: () => void };

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const { t } = usePreferences();
  const featured = project.featured;

  return (
    <article
      className={`glass glow-border group flex h-full flex-col overflow-hidden rounded-3xl transition-transform duration-300 hover:-translate-y-1 ${
        featured ? "lg:grid lg:grid-cols-[1.2fr_1fr]" : ""
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? "aspect-video lg:aspect-auto lg:min-h-full" : "aspect-video"}`}>
        {project.cover ? (
          <Image
            src={project.cover.src}
            alt={t(project.cover.alt)}
            fill
            sizes={featured ? "(min-width: 1024px) 640px, 100vw" : "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"}
            className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <ProjectIllustration icon={project.icon} className="absolute inset-0" />
        )}
        {(featured || project.highlight) && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-gradient-brand px-3 py-1 text-xs font-semibold text-white shadow-lg">
            {featured && <Star className="size-3.5 fill-current" aria-hidden />}
            {featured ? t(ui.projects.featured) : t(project.highlight!)}
          </span>
        )}
      </div>

      <div className={`flex flex-1 flex-col p-5 sm:p-6 ${featured ? "lg:p-8" : ""}`}>
        <h3 className={`font-display font-semibold text-fg ${featured ? "text-2xl" : "text-lg"}`}>{t(project.title)}</h3>
        <p className={`mt-3 flex-1 leading-relaxed text-fg-muted ${featured ? "" : "text-sm"}`}>{t(project.summary)}</p>
        <TagList tags={project.tags} className="mt-5" />

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onOpen}
            className="inline-flex h-10 items-center gap-1.5 rounded-full bg-gradient-brand px-4 text-sm font-semibold text-white shadow-md shadow-violet/25 transition-shadow hover:shadow-lg hover:shadow-pink/30"
          >
            {t(ui.projects.details)}
            <ArrowUpRight className="size-4" aria-hidden />
            <span className="sr-only">: {t(project.title)}</span>
          </button>
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border-strong px-4 text-sm font-semibold text-fg transition-colors hover:border-violet/60"
            >
              <GithubIcon className="size-4" />
              {t(ui.projects.github)}
              <span className="sr-only">: {t(project.title)}</span>
            </a>
          ) : (
            project.privateNote && (
              <span className="inline-flex h-10 items-center gap-1.5 rounded-full border border-dashed border-border-strong px-4 text-xs font-medium text-fg-subtle">
                <Lock className="size-3.5" aria-hidden />
                {t(project.privateNote)}
              </span>
            )
          )}
        </div>
      </div>
    </article>
  );
}
