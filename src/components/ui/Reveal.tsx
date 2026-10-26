"use client";

import { motion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** Décalage vertical de départ, en pixels */
  y?: number;
};

/**
 * Apparition douce au scroll. Si l'utilisateur préfère réduire les animations,
 * le <MotionConfig reducedMotion="user"> global supprime le déplacement (fondu seul).
 */
export function Reveal({ children, delay = 0, className, y = 24 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
