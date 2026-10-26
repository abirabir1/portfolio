"use client";

import { Check, Lock, Maximize2, X as Cross } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { usePreferences } from "@/components/providers/PreferencesProvider";
import { Lightbox } from "@/components/ui/Lightbox";
import { Modal } from "@/components/ui/Modal";
import { GithubIcon } from "@/components/ui/SocialLinks";
import { TagList } from "@/components/ui/Tag";
import type { Project } from "@/data/portfolio";
import { ui } from "@/data/ui";
import { ProjectIllustration } from "./ProjectIllustration";

type ProjectModalProps = { project: Project | null; onClose: () => void };

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t } = usePreferences();
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
      <Modal
        open={project !== null}
        onClose={() => {
          setLightbox(null);
          onClose();
        }}
        label={project ? t(project.title) : ""}
        closeLabel={t(ui.projects.close)}
        className="max-w-3xl"
      >
        {project && (
          <article>
            <div className="relative aspect-[16/7] overflow-hidden">
              {project.cover ? (
                <Image
                  src={project.cover.src}
                  alt={t(project.cover.alt)}
                  fill
                  sizes="768px"
                  className="object-cover object-top"
                />
              ) : (
                <ProjectIllustration icon={project.icon} className="absolute inset-0" />
              )}
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg-soft via-bg-soft/20 to-transparent" />
            </div>

            <div className="space-y-8 p-6 sm:p-8">
              <header>
                {project.highlight && (
                  <p className="mb-2 font-mono text-xs tracking-wider text-cyan uppercase">{t(project.highlight)}</p>
                )}
                <h2 className="font-display text-2xl font-bold text-fg sm:text-3xl">{t(project.title)}</h2>
                <TagList tags={project.tags} className="mt-4" />
              </header>

              <div className="space-y-4 leading-relaxed text-fg-muted">
                {project.description.map((p) => (
                  <p key={p.fr}>{t(p)}</p>
                ))}
              </div>

              {project.context && (
                <section>
                  <h3 className="mb-2 font-display text-lg font-semibold text-fg">{t(ui.projects.context)}</h3>
                  <p className="text-sm leading-relaxed text-fg-muted">{t(project.context)}</p>
                </section>
              )}

              {project.objectives && (
                <section>
                  <h3 className="mb-3 font-display text-lg font-semibold text-fg">{t(ui.projects.objectives)}</h3>
                  <ul className="grid gap-2 sm:grid-cols-3">
                    {project.objectives.map((o) => (
                      <li key={o.fr} className="glass rounded-xl p-3 text-sm text-fg-muted">
                        {t(o)}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {project.models && (
                <section>
                  <h3 className="mb-3 font-display text-lg font-semibold text-fg">{t(ui.projects.models)}</h3>
                  <ul className="grid gap-3 sm:grid-cols-3">
                    {project.models.map((m) => (
                      <li key={m.name} className="glass rounded-xl p-4">
                        <p className="font-display font-semibold text-fg">{m.name}</p>
                        <ul className="mt-2 space-y-1.5 text-sm">
                          {m.pros.map((p) => (
                            <li key={p.fr} className="flex gap-2 text-fg-muted">
                              <Check className="mt-0.5 size-4 shrink-0 text-emerald-400" aria-label="+" />
                              {t(p)}
                            </li>
                          ))}
                          {m.cons.map((c) => (
                            <li key={c.fr} className="flex gap-2 text-fg-subtle">
                              <Cross className="mt-0.5 size-4 shrink-0 text-pink" aria-label="−" />
                              {t(c)}
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {project.gallery && project.gallery.length > 0 && (
                <section>
                  <h3 className="mb-3 font-display text-lg font-semibold text-fg">{t(ui.projects.gallery)}</h3>
                  <ul className="grid grid-cols-2 gap-3">
                    {project.gallery.map((img, i) => (
                      <li key={img.src}>
                        <button
                          type="button"
                          onClick={() => setLightbox(i)}
                          className="group relative block aspect-video w-full overflow-hidden rounded-xl border border-border"
                        >
                          <Image src={img.src} alt={t(img.alt)} fill sizes="360px" className="object-cover object-top" />
                          <span className="absolute inset-0 grid place-items-center bg-black/0 text-white opacity-0 transition-all group-hover:bg-black/40 group-hover:opacity-100 group-focus-visible:bg-black/40 group-focus-visible:opacity-100">
                            <Maximize2 className="size-6" aria-hidden />
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <footer className="flex flex-wrap gap-2 border-t border-border pt-6">
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-gradient-brand px-5 font-semibold text-white"
                  >
                    <GithubIcon className="size-4" />
                    {t(ui.projects.github)}
                  </a>
                ) : (
                  project.privateNote && (
                    <span className="inline-flex h-11 items-center gap-2 rounded-full border border-dashed border-border-strong px-5 text-sm text-fg-muted">
                      <Lock className="size-4" aria-hidden />
                      {t(project.privateNote)}
                    </span>
                  )
                )}
              </footer>
            </div>
          </article>
        )}
      </Modal>

      {project?.gallery && <Lightbox images={project.gallery} index={lightbox} onChange={setLightbox} />}
    </>
  );
}
