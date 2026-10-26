"use client";

import { m } from "framer-motion";
import { Database, FileText } from "lucide-react";
import { Fragment } from "react";
import { usePreferences } from "@/components/providers/PreferencesProvider";
import { educanetPipeline as pipeline } from "@/data/portfolio";

/** Connecteur animé : une particule parcourt le lien entre deux étapes */
function Connector({ delay }: { delay: number }) {
  return (
    <div
      aria-hidden
      className="relative h-6 w-px shrink-0 self-center bg-border-strong sm:h-px sm:w-auto sm:min-w-6 sm:flex-1 sm:self-auto"
    >
      {/* Particules masquées en CSS si « réduire les animations » : même HTML côté serveur et client */}
      {/* vertical sur mobile */}
      <m.span
        className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_8px_var(--cyan)] motion-reduce:hidden sm:hidden"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 1.6, repeat: Infinity, delay, ease: "easeInOut" }}
      />
      {/* horizontal à partir de sm */}
      <m.span
        className="absolute top-1/2 hidden size-1.5 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_8px_var(--cyan)] sm:block motion-reduce:sm:hidden"
        animate={{ left: ["0%", "100%"] }}
        transition={{ duration: 1.6, repeat: Infinity, delay, ease: "easeInOut" }}
      />
    </div>
  );
}

export function PipelineDiagram() {
  const { t } = usePreferences();
  return (
    <figure
      role="img"
      aria-label={t(pipeline.ariaLabel)}
      className="mt-6 flex flex-col items-stretch rounded-xl border border-border bg-bg/40 p-4 sm:flex-row sm:items-center"
    >
      <div className="flex items-center gap-2.5 rounded-lg border border-cyan/30 bg-cyan/5 px-3 py-2">
        <Database className="size-4 shrink-0 text-cyan" aria-hidden />
        <div className="leading-tight">
          <p className="font-mono text-sm font-bold text-fg">{pipeline.input.value}</p>
          <p className="text-[11px] text-fg-subtle">{t(pipeline.input.label)}</p>
        </div>
      </div>

      {pipeline.agents.map((agent, i) => (
        <Fragment key={agent.name.fr}>
          <Connector delay={i * 0.4} />
          <div className="rounded-lg border border-violet/40 bg-violet/10 px-3 py-2 text-center">
            <p className="font-display text-sm font-semibold text-fg">{t(agent.name)}</p>
            <p className="font-mono text-[10px] tracking-wide text-violet-soft uppercase">{t(agent.hint)}</p>
          </div>
        </Fragment>
      ))}

      <Connector delay={1.2} />
      <div className="flex items-center gap-2.5 rounded-lg border border-pink/30 bg-pink/5 px-3 py-2">
        <FileText className="size-4 shrink-0 text-pink" aria-hidden />
        <div className="leading-tight">
          <p className="font-mono text-sm font-bold text-fg">{pipeline.output.value}</p>
          <p className="text-[11px] text-fg-subtle">{t(pipeline.output.label)}</p>
        </div>
      </div>
    </figure>
  );
}
