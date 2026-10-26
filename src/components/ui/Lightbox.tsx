"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { usePreferences } from "@/components/providers/PreferencesProvider";
import type { GalleryImage } from "@/data/portfolio";
import { ui } from "@/data/ui";
import { Modal } from "./Modal";

type LightboxProps = {
  images: GalleryImage[];
  /** Index de l'image ouverte, ou null si la lightbox est fermée */
  index: number | null;
  onChange: (index: number | null) => void;
  /** Contenu optionnel affiché sous l'image (ex. lien de vérification) */
  footer?: React.ReactNode;
};

export function Lightbox({ images, index, onChange, footer }: LightboxProps) {
  const { t } = usePreferences();
  const open = index !== null;
  const image = open ? images[index] : null;
  const many = images.length > 1;

  const go = (delta: number) => {
    if (index === null) return;
    onChange((index + delta + images.length) % images.length);
  };

  useEffect(() => {
    if (!open || !many) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <Modal
      open={open}
      onClose={() => onChange(null)}
      label={image ? t(image.alt) : ""}
      closeLabel={t(ui.lightbox.close)}
      className="max-w-5xl"
    >
      {image && (
        <figure className="p-4 pt-16 sm:p-8 sm:pt-16">
          <div className="relative overflow-hidden rounded-xl bg-white/5">
            <Image
              src={image.src}
              alt={t(image.alt)}
              width={image.width}
              height={image.height}
              sizes="(min-width: 1024px) 960px, 100vw"
              className="mx-auto h-auto max-h-[68dvh] w-auto object-contain"
            />
            {many && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label={t(ui.lightbox.previous)}
                  className="absolute top-1/2 left-2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white backdrop-blur hover:bg-black/80"
                >
                  <ChevronLeft className="size-5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label={t(ui.lightbox.next)}
                  className="absolute top-1/2 right-2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white backdrop-blur hover:bg-black/80"
                >
                  <ChevronRight className="size-5" aria-hidden />
                </button>
              </>
            )}
          </div>
          <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-fg-muted">
            <span>{t(image.alt)}</span>
            {many && (
              <span className="font-mono text-xs text-fg-subtle">
                {index! + 1} / {images.length}
              </span>
            )}
          </figcaption>
          {footer}
        </figure>
      )}
    </Modal>
  );
}
