"use client";

import { ArrowUp } from "lucide-react";
import { usePreferences } from "@/components/providers/PreferencesProvider";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { profile } from "@/data/portfolio";
import { ui } from "@/data/ui";

export function Footer() {
  const { t } = usePreferences();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-sm text-fg-subtle">
          © {new Date().getFullYear()} {profile.name} — {t(ui.footer.rights)}
        </p>
        <div className="flex items-center gap-3">
          <SocialLinks />
          <a
            href="#accueil"
            aria-label={t(ui.footer.backToTop)}
            className="grid size-10 place-items-center rounded-full bg-gradient-brand text-white shadow-lg shadow-violet/25 transition-transform hover:-translate-y-0.5"
          >
            <ArrowUp className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
