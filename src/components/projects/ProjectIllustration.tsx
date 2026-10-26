import { Brain, HeartPulse, School, ScanSearch, Sprout, Stethoscope, TrendingUp } from "lucide-react";
import type { Project } from "@/data/portfolio";

const icons = {
  brain: Brain,
  school: School,
  stethoscope: Stethoscope,
  heart: HeartPulse,
  scan: ScanSearch,
  sprout: Sprout,
  trending: TrendingUp,
} satisfies Record<Project["icon"], unknown>;

// Dégradés propres à chaque type de projet, dans la palette du site
const gradients: Record<Project["icon"], string> = {
  brain: "from-violet/50 via-pink/25 to-transparent",
  school: "from-violet/55 via-cyan/20 to-transparent",
  stethoscope: "from-cyan/45 via-violet/25 to-transparent",
  heart: "from-pink/50 via-violet/25 to-transparent",
  scan: "from-pink/45 via-cyan/20 to-transparent",
  sprout: "from-emerald-400/40 via-cyan/25 to-transparent",
  trending: "from-violet/50 via-pink/30 to-transparent",
};

/**
 * Illustration abstraite (dégradé, grille et icône) pour les projets sans image.
 * Le positionnement vient de `className` (ex. "absolute inset-0"), "relative" par défaut.
 */
export function ProjectIllustration({ icon, className = "relative" }: { icon: Project["icon"]; className?: string }) {
  const Icon = icons[icon];
  return (
    <div aria-hidden className={`overflow-hidden bg-bg-soft ${className}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[icon]}`} />
      <div className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" />
      {/* nœuds décoratifs */}
      <svg className="absolute inset-0 size-full opacity-40" viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice">
        <g stroke="currentColor" className="text-violet-soft" strokeWidth="0.8" fill="none">
          <path d="M40 60 L130 40 L200 110 L290 70 L360 140" />
          <path d="M60 170 L130 40 M200 110 L150 190 L290 70" />
        </g>
        <g className="fill-cyan">
          {[
            [40, 60],
            [130, 40],
            [200, 110],
            [290, 70],
            [360, 140],
            [60, 170],
            [150, 190],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" />
          ))}
        </g>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="grid size-16 place-items-center rounded-2xl border border-white/15 bg-white/10 text-white shadow-xl backdrop-blur-md light:border-violet/20 light:bg-white/70 light:text-violet">
          <Icon className="size-8" strokeWidth={1.6} />
        </div>
      </div>
    </div>
  );
}
