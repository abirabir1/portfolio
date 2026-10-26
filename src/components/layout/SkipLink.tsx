"use client";

import { usePreferences } from "@/components/providers/PreferencesProvider";
import { ui } from "@/data/ui";

export function SkipLink() {
  const { t } = usePreferences();
  return (
    <a
      href="#contenu"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-violet focus:px-4 focus:py-2 focus:text-white"
    >
      {t(ui.skipToContent)}
    </a>
  );
}
