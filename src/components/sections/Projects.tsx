"use client";

import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { usePreferences } from "@/components/providers/PreferencesProvider";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { type Project, type ProjectCategory, projectFilters, projects } from "@/data/portfolio";
import { ui } from "@/data/ui";

export function Projects() {
  const { t } = usePreferences();
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all");
  const [selected, setSelected] = useState<Project | null>(null);

  const visible = projects.filter((p) => filter === "all" || p.categories.includes(filter));

  return (
    <Section id="projets" {...ui.sections.projects}>
      <Reveal>
        <div role="group" aria-label={t(ui.projects.filterLabel)} className="mb-10 flex flex-wrap gap-2">
          {projectFilters.map((f) => {
            const count = f.id === "all" ? projects.length : projects.filter((p) => p.categories.includes(f.id as ProjectCategory)).length;
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={active}
                className={`relative h-10 rounded-full px-4 text-sm font-medium transition-colors ${
                  active ? "text-white" : "border border-border text-fg-muted hover:border-border-strong hover:text-fg"
                }`}
              >
                {active && (
                  <m.span
                    layoutId="project-filter"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-brand"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {t(f.label)} <span className="ml-1 font-mono text-xs opacity-70">{count}</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <m.ul layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <m.li
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className={project.featured ? "sm:col-span-2 lg:col-span-3" : ""}
            >
              <ProjectCard project={project} onOpen={() => setSelected(project)} />
            </m.li>
          ))}
        </AnimatePresence>
      </m.ul>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}
