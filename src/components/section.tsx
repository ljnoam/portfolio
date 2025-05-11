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
        "py-16 md:py-24 min-h-[calc(100vh-var(--navbar-height,4rem))]", 
        "container mx-auto px-4 md:px-6", 
        "scroll-mt-[var(--navbar-height,4rem)]", 
        className
      )}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }} 
      transition={{ duration: 0.6, ease: "easeOut" }} // Updated duration to 0.6
      {...rest}
    >
      {children}
    </motion.section>
  );
}
