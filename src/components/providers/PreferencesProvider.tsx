"use client";

import { MotionConfig } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { L, Locale } from "@/data/portfolio";

type Theme = "dark" | "light";

type Preferences = {
  locale: Locale;
  theme: Theme;
  setLocale: (locale: Locale) => void;
  toggleTheme: () => void;
  /** Renvoie la traduction d'un texte { fr, en } dans la langue courante */
  t: (text: L) => string;
};

const PreferencesContext = createContext<Preferences | null>(null);

const LOCALE_KEY = "abir-locale";
const THEME_KEY = "abir-theme";

function readStorage(key: string) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // stockage indisponible (navigation privée) : le choix reste valable pour la session
  }
}

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");
  const [theme, setTheme] = useState<Theme>("dark");

  // Restaure les choix du visiteur après l'hydratation
  useEffect(() => {
    const storedLocale = readStorage(LOCALE_KEY);
    if (storedLocale === "en" || storedLocale === "fr") setLocaleState(storedLocale);
    const storedTheme = document.documentElement.dataset.theme;
    if (storedTheme === "light" || storedTheme === "dark") setTheme(storedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    writeStorage(LOCALE_KEY, next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      writeStorage(THEME_KEY, next);
      return next;
    });
  }, []);

  const value = useMemo<Preferences>(
    () => ({ locale, theme, setLocale, toggleTheme, t: (text) => text[locale] }),
    [locale, theme, setLocale, toggleTheme],
  );

  return (
    <PreferencesContext.Provider value={value}>
      {/* Respecte « réduire les animations » sans changer le HTML rendu (pas d'écart serveur / client) */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error("usePreferences doit être utilisé dans <PreferencesProvider>");
  return ctx;
}

/** Script inline exécuté avant le rendu pour éviter un flash de thème */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");document.documentElement.dataset.theme=t==="light"?"light":"dark";}catch(e){document.documentElement.dataset.theme="dark";}})();`;
