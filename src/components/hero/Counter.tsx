"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/data/portfolio";

type CounterProps = { value: number; suffix?: string; locale: Locale };

/** Compteur animé qui démarre lorsqu'il entre dans l'écran */
export function Counter({ value, suffix = "", locale }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  const format = new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-US");
  return (
    <span ref={ref}>
      {/* Valeur finale pour les lecteurs d'écran et les moteurs de recherche */}
      <span className="sr-only">
        {format.format(value)}
        {suffix}
      </span>
      <span aria-hidden className="tabular-nums">
        {format.format(display)}
        {suffix}
      </span>
    </span>
  );
}
