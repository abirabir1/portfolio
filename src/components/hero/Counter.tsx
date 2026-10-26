"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/data/portfolio";

type CounterProps = { value: number; suffix?: string; locale: Locale };

const DURATION = 1800;
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - 2 ** (-10 * t));

/**
 * Compteur animé qui démarre lorsqu'il entre dans l'écran.
 * Le texte est mis à jour directement dans le DOM (pas de rendu React à chaque image).
 */
export function Counter({ value, suffix = "", locale }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const format = new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-US");

  useEffect(() => {
    const el = numberRef.current;
    if (!ref.current || !el) return;
    const fmt = new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-US");
    const render = (v: number) => {
      el.textContent = fmt.format(Math.round(v)) + suffix;
    };
    let frame = 0;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        render(value);
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / DURATION, 1);
        render(value * easeOutExpo(t));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, suffix, locale]);

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
