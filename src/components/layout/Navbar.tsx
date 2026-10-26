"use client";

import { AnimatePresence, m } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePreferences } from "@/components/providers/PreferencesProvider";
import { nav } from "@/data/portfolio";
import { ui } from "@/data/ui";

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const sectionIds = nav.map((item) => item.id);

export function Navbar() {
  const { t, locale, setLocale, theme, toggleTheme } = usePreferences();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const controls = (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={() => setLocale(locale === "fr" ? "en" : "fr")}
        aria-label={t(ui.switchLanguage)}
        className="h-9 rounded-full border border-border px-3 font-mono text-xs font-semibold text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
      >
        {locale === "fr" ? "EN" : "FR"}
      </button>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={t(theme === "dark" ? ui.switchToLight : ui.switchToDark)}
        className="grid size-9 place-items-center rounded-full border border-border text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
      >
        {theme === "dark" ? <Sun className="size-4" aria-hidden /> : <Moon className="size-4" aria-hidden />}
      </button>
    </div>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <nav
        aria-label="Navigation principale"
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-4 transition-all duration-300 ${
          scrolled
            ? "h-14 border-border bg-bg/75 shadow-lg shadow-black/10 backdrop-blur-xl"
            : "h-16 border-transparent bg-transparent"
        }`}
      >
        <a href="#accueil" className="font-display text-lg font-bold tracking-tight text-fg" aria-label="Abir El Abed — accueil">
          Abir<span className="text-gradient">.</span>
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "true" : undefined}
                className={`relative rounded-full px-3 py-1.5 text-sm transition-colors ${
                  active === item.id ? "text-fg" : "text-fg-muted hover:text-fg"
                }`}
              >
                {active === item.id && (
                  <m.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-surface-strong"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {t(item.label)}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">{controls}</div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={t(ui.menu)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="grid size-10 place-items-center rounded-full border border-border text-fg lg:hidden"
        >
          <Menu className="size-5" aria-hidden />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t(ui.menu)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-bg/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex h-16 items-center justify-between px-7 pt-3">
              <span className="font-display text-lg font-bold">
                Abir<span className="text-gradient">.</span>
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t(ui.closeMenu)}
                autoFocus
                className="grid size-10 place-items-center rounded-full border border-border"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
            <ul className="mt-6 flex flex-col gap-1 px-7">
              {nav.map((item, i) => (
                <m.li
                  key={item.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className={`block py-2.5 font-display text-2xl font-semibold ${
                      active === item.id ? "text-gradient" : "text-fg"
                    }`}
                  >
                    {t(item.label)}
                  </a>
                </m.li>
              ))}
            </ul>
            <div className="mt-8 px-7">{controls}</div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
