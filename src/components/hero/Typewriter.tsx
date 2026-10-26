"use client";

import { useEffect, useState } from "react";

/**
 * Effet machine à écrire qui alterne entre plusieurs expressions.
 * Passez une `key` (ex. la langue) pour le réinitialiser, et un tableau `words` stable (useMemo).
 */
export function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const word = words[index % words.length];
    if (reduceMotion) {
      const id = setTimeout(() => setIndex((i) => i + 1), 2500);
      setText(word);
      return () => clearTimeout(id);
    }
    let delay = deleting ? 40 : 85;
    if (!deleting && text === word) delay = 1800;
    if (deleting && text === "") delay = 300;

    const id = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      }
    }, delay);
    return () => clearTimeout(id);
  }, [text, deleting, index, words, reduceMotion]);

  return (
    <span className="inline-flex items-baseline">
      {/* Les lecteurs d'écran annoncent la liste complète une seule fois */}
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden className="text-gradient">
        {text}
      </span>
      <span aria-hidden className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.12em] animate-pulse bg-pink" />
    </span>
  );
}
