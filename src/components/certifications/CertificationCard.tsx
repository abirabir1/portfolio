"use client";

import { BadgeCheck, CalendarDays, ExternalLink, FileText, KeyRound, Maximize2 } from "lucide-react";
import Image from "next/image";
import { usePreferences } from "@/components/providers/PreferencesProvider";
import type { Certification } from "@/data/portfolio";
import { ui } from "@/data/ui";

type CertificationCardProps = { cert: Certification; onOpenImage?: () => void };

export function VerifyLinks({ cert }: { cert: Certification }) {
  const { t } = usePreferences();
  if (!cert.verifyUrl && !cert.credentialId && !cert.pdf) return null;
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {cert.verifyUrl && (
        <a
          href={cert.verifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3.5 text-xs font-semibold text-emerald-300 transition-colors hover:bg-emerald-400/20 light:text-emerald-700"
        >
          <BadgeCheck className="size-4" aria-hidden />
          {t(ui.certifications.verify)}
          <ExternalLink className="size-3.5" aria-hidden />
          <span className="sr-only">: {t(cert.title)}</span>
        </a>
      )}
      {cert.pdf && (
        <a
          href={cert.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border-strong px-3.5 text-xs font-semibold text-fg transition-colors hover:border-violet/60"
        >
          <FileText className="size-4" aria-hidden />
          {t(ui.certifications.viewPdf)}
          <span className="sr-only">: {t(cert.title)}</span>
        </a>
      )}
      {cert.credentialId && (
        <p className="flex w-full items-start gap-2 rounded-xl border border-border bg-surface px-3 py-2">
          <KeyRound className="mt-0.5 size-3.5 shrink-0 text-cyan" aria-hidden />
          <span className="min-w-0">
            <span className="block text-[11px] text-fg-subtle">{t(ui.certifications.credentialId)}</span>
            <span className="block font-mono text-xs break-all text-fg select-all">{cert.credentialId}</span>
          </span>
        </p>
      )}
    </div>
  );
}

export function CertificationCard({ cert, onOpenImage }: CertificationCardProps) {
  const { t } = usePreferences();

  return (
    <article className="glass glow-border flex h-full flex-col overflow-hidden rounded-2xl">
      {cert.image ? (
        <button
          type="button"
          onClick={onOpenImage}
          className="group relative block aspect-[16/9] w-full overflow-hidden border-b border-border bg-white"
        >
          <Image
            src={cert.image.src}
            alt={t(cert.image.alt)}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <span className="absolute inset-0 grid place-items-center bg-black/0 text-white opacity-0 transition-all group-hover:bg-black/45 group-hover:opacity-100 group-focus-visible:bg-black/45 group-focus-visible:opacity-100">
            <span className="flex items-center gap-2 text-sm font-semibold">
              <Maximize2 className="size-5" aria-hidden />
              {t(ui.certifications.viewCertificate)}
            </span>
          </span>
        </button>
      ) : null}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start gap-3">
          {!cert.image && (
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-brand text-white shadow-md shadow-violet/25">
              <BadgeCheck className="size-5" aria-hidden />
            </span>
          )}
          <div className="min-w-0">
            <h3 className="font-display font-semibold leading-snug text-fg">{t(cert.title)}</h3>
            {cert.issuer && <p className="mt-0.5 text-sm text-violet-soft">{cert.issuer}</p>}
          </div>
        </div>
        {cert.date && (
          <p className="mt-3 flex items-center gap-1.5 font-mono text-xs text-fg-subtle">
            <CalendarDays className="size-3.5" aria-hidden />
            {t(cert.date)}
          </p>
        )}
        {cert.description && <p className="mt-3 text-sm leading-relaxed text-fg-muted">{t(cert.description)}</p>}
        <div className="mt-auto">
          <VerifyLinks cert={cert} />
        </div>
      </div>
    </article>
  );
}
