"use client";

import type { HTMLMotionProps } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps extends HTMLMotionProps<"section"> {
  children: React.ReactNode;
  className?: string;
  id: string;
}

export function Section({ children, className, id, ...rest }: SectionProps) {
  return (
    <motion.section
      id={id}
      className={cn(
        // Espacement vertical uniforme et responsive
        "py-8 sm:py-12 md:py-16 lg:py-20",
        // Largeur et padding horizontaux responsives
        "container mx-auto px-4 sm:px-6 md:px-8 lg:px-12",
        // Décalage pour le scroll
        "scroll-mt-[var(--navbar-height,4rem)]",
        // Ajoute un margin-bottom sauf pour la dernière section
        "last:mb-0 mb-8 sm:mb-12 md:mb-16 lg:mb-20",
        className
      )}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      {...rest}
    >
      {children}
    </motion.section>
  );
}
