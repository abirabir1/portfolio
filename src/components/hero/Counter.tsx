"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import type { Locale } from "@/data/portfolio";

type CounterProps = { value: number; suffix?: string; locale: Locale };

/**
 * Compteur animé qui démarre lorsqu'il entre dans l'écran.
 * Le texte est mis à jour directement dans le DOM (pas de rendu React à chaque image).
 */
export function Counter({ value, suffix = "", locale }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const format = new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-US");

  useEffect(() => {
    const el = numberRef.current;
    if (!inView || !el) return;
    const render = (v: number) => {
      el.textContent = format.format(Math.round(v)) + suffix;
    };
    if (reduce) {
      render(value);
      return;
    }
    const controls = animate(0, value, { duration: 1.8, ease: [0.16, 1, 0.3, 1], onUpdate: render });
    return () => controls.stop();
    // format dépend uniquement de locale
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, suffix, locale, reduce]);

  return (
    <span ref={ref}>
      {/* Valeur finale pour les lecteurs d'écran et les moteurs de recherche */}
      <span className="sr-only">
        {format.format(value)}
        {suffix}
      </span>
      <span ref={numberRef} aria-hidden className="tabular-nums">
        {format.format(0)}
        {suffix}
      </span>
    </span>
  );
}
