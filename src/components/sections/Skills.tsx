"use client";

import { Bot, Brain, Code2, Database, Layers, Server } from "lucide-react";
import { usePreferences } from "@/components/providers/PreferencesProvider";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { type SkillGroup, skills } from "@/data/portfolio";
import { ui } from "@/data/ui";

const icons = {
  code: Code2,
  brain: Brain,
  layers: Layers,
  bot: Bot,
  database: Database,
  server: Server,
} satisfies Record<SkillGroup["icon"], unknown>;

export function Skills() {
  const { t } = usePreferences();
  return (
    <Section id="competences" {...ui.sections.skills}>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => {
          const Icon = icons[group.icon];
          return (
            <li key={group.id}>
              <Reveal delay={i * 0.05} className="h-full">
                <article className="glass glow-border h-full rounded-2xl p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-xl border border-violet/30 bg-violet/10 text-violet-soft">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="font-display text-lg font-semibold text-fg">{t(group.title)}</h3>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-fg transition-colors hover:border-cyan/50 hover:text-cyan"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
