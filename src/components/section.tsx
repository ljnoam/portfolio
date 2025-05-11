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
        "py-16 md:py-24 min-h-[calc(100vh-var(--navbar-height,4rem))]", // Adjust min-height based on navbar
        "container mx-auto px-4 md:px-6", // Responsive padding
        "scroll-mt-[var(--navbar-height,4rem)]", // Offset for sticky nav
        className
      )}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }} // Trigger animation when 20% of section is visible
      transition={{ duration: 0.5, ease: "easeOut" }}
      {...rest}
    >
      {children}
    </motion.section>
  );
}
