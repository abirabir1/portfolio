"use client";

import { TimelineItem } from "@/components/experience/TimelineItem";
import { Section } from "@/components/ui/Section";
import { experience } from "@/data/portfolio";
import { ui } from "@/data/ui";

export function Experience() {
  return (
    <Section id="experience" {...ui.sections.experience}>
      <ol className="relative space-y-8 before:absolute before:top-2 before:bottom-2 before:left-4 before:w-px before:bg-gradient-to-b before:from-violet before:via-pink/50 before:to-transparent sm:before:left-6">
        {experience.map((item, i) => (
          <TimelineItem key={item.id} item={item} index={i} />
        ))}
      </ol>
    </Section>
  );
}
