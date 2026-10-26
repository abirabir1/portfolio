"use client";

import { Briefcase, Sparkles } from "lucide-react";
import { usePreferences } from "@/components/providers/PreferencesProvider";
import { Reveal } from "@/components/ui/Reveal";
import { TagList } from "@/components/ui/Tag";
import type { TimelineEntry } from "@/data/portfolio";
import { ui } from "@/data/ui";
import { PipelineDiagram } from "./PipelineDiagram";

export function TimelineItem({ item, index }: { item: TimelineEntry; index: number }) {
  const { t } = usePreferences();
  const featured = item.featured;

  return (
    <li className="relative pl-10 sm:pl-14">
      {/* Point sur la ligne de temps */}
      <span
        aria-hidden
        className={`absolute top-6 left-0 grid size-8 place-items-center rounded-full ring-4 ring-bg sm:left-2 ${
          featured ? "bg-gradient-brand text-white shadow-lg shadow-violet/40" : "border border-border-strong bg-bg-soft text-fg-muted"
        }`}
      >
        {featured ? <Sparkles className="size-4" /> : <Briefcase className="size-3.5" />}
      </span>

      <Reveal delay={Math.min(index * 0.05, 0.2)}>
        <article
          className={`glass glow-border rounded-2xl p-5 transition-colors sm:p-7 ${
            featured ? "border-violet/40 bg-[linear-gradient(140deg,rgb(139_92_246/0.12),rgb(236_72_153/0.06)_60%,transparent)]" : ""
          }`}
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <p className="font-mono text-xs text-cyan">{t(item.period)}</p>
            {featured && (
              <span className="rounded-full bg-gradient-brand px-2.5 py-0.5 text-[11px] font-semibold text-white">
                {t(ui.experience.featured)}
              </span>
            )}
          </div>
          <h3 className="mt-2 font-display text-xl font-semibold text-fg sm:text-2xl">{t(item.title)}</h3>
          <p className="mt-1 text-sm font-medium text-violet-soft">
            {item.org}
            {item.location && <span className="text-fg-subtle"> · {t(item.location)}</span>}
          </p>

          {item.summary && <p className="mt-4 text-fg-muted">{t(item.summary)}</p>}

          {featured && <PipelineDiagram />}

          {item.bullets && (
            <ul className="mt-4 space-y-2">
              {item.bullets.map((b) => (
                <li key={b.fr} className="flex gap-3 text-sm leading-relaxed text-fg-muted">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-pink" />
                  <span>{t(b)}</span>
                </li>
              ))}
            </ul>
          )}

          {item.tags && <TagList tags={item.tags} className="mt-5" />}
        </article>
      </Reveal>
    </li>
  );
}
