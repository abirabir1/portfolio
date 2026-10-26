"use client";

import { Award, CalendarDays, ExternalLink, Maximize2, Users } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ProjectIllustration } from "@/components/projects/ProjectIllustration";
import { usePreferences } from "@/components/providers/PreferencesProvider";
import { Lightbox } from "@/components/ui/Lightbox";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { TagList } from "@/components/ui/Tag";
import { type Hackathon, hackathons } from "@/data/portfolio";
import { ui } from "@/data/ui";

const rankStyles: Record<1 | 2 | 3, { ring: string; text: string; emoji: string }> = {
  1: { ring: "from-gold to-amber-200", text: "text-gold", emoji: "🥇" },
  2: { ring: "from-silver to-white", text: "text-silver", emoji: "🥈" },
  3: { ring: "from-bronze to-orange-200", text: "text-bronze", emoji: "🥉" },
};

function HackathonCard({ item, onOpenImage }: { item: Hackathon; onOpenImage: () => void }) {
  const { t } = usePreferences();
  const rank = item.rank ? rankStyles[item.rank] : null;

  return (
    <article className="glass glow-border flex h-full flex-col overflow-hidden rounded-3xl">
      {!item.image && item.icon && (
        <ProjectIllustration icon={item.icon} className="relative aspect-[4/3] w-full border-b border-border" />
      )}
      {item.image && (
        <button
          type="button"
          onClick={onOpenImage}
          className="group relative block aspect-[4/3] w-full overflow-hidden border-b border-border bg-white"
        >
          <Image
            src={item.image.src}
            alt={t(item.image.alt)}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 grid place-items-center bg-black/0 text-white opacity-0 transition-all group-hover:bg-black/40 group-hover:opacity-100 group-focus-visible:bg-black/40 group-focus-visible:opacity-100">
            <Maximize2 className="size-6" aria-hidden />
          </span>
        </button>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-center gap-3">
          {rank ? (
            <span className={`rounded-full bg-gradient-to-br p-[2px] ${rank.ring}`}>
              <span className="flex items-center gap-1.5 rounded-full bg-bg-soft px-3 py-1 text-sm font-bold">
                <span aria-hidden>{rank.emoji}</span>
                <span className={rank.text}>{item.rankLabel && t(item.rankLabel)}</span>
              </span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-sm font-semibold text-cyan">
              <Award className="size-4" aria-hidden />
              {t(ui.hackathons.training)}
            </span>
          )}
        </div>

        <h3 className="font-display text-xl font-semibold text-fg">{t(item.title)}</h3>
        {item.date && (
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-fg-subtle">
            <CalendarDays className="size-4" aria-hidden />
            {t(item.date)}
          </p>
        )}
        <p className="mt-4 flex-1 leading-relaxed text-fg-muted">{t(item.summary)}</p>

        {item.details && (
          <ul className="mt-4 space-y-1.5">
            {item.details.map((d) => (
              <li key={d.fr} className="flex items-center gap-2 text-sm text-fg-muted">
                <Users className="size-4 shrink-0 text-violet-soft" aria-hidden />
                {t(d)}
              </li>
            ))}
          </ul>
        )}

        {item.tags && <TagList tags={item.tags} className="mt-5" />}

        {item.presentation && (
          <a
            href={item.presentation}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex h-10 w-fit items-center gap-1.5 rounded-full border border-border-strong px-4 text-sm font-semibold text-fg transition-colors hover:border-violet/60"
          >
            {t(ui.hackathons.presentation)}
            <ExternalLink className="size-4" aria-hidden />
          </a>
        )}
      </div>
    </article>
  );
}

export function Hackathons() {
  const [lightbox, setLightbox] = useState<{ images: NonNullable<Hackathon["image"]>[]; index: number } | null>(null);

  return (
    <Section id="hackathons" {...ui.sections.hackathons}>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {hackathons.map((item, i) => (
          <li key={item.id}>
            <Reveal delay={i * 0.08} className="h-full">
              <HackathonCard
                item={item}
                onOpenImage={() => item.image && setLightbox({ images: [item.image], index: 0 })}
              />
            </Reveal>
          </li>
        ))}
      </ul>
      <Lightbox
        images={lightbox?.images ?? []}
        index={lightbox ? lightbox.index : null}
        onChange={(index) => setLightbox(index === null ? null : { ...lightbox!, index })}
      />
    </Section>
  );
}
