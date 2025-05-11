"use client";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/section";
import { ArrowRight, Briefcase, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function HeroSection() {
  return (
    <Section
      id="hero"
      className="flex flex-col items-center justify-center text-center min-h-screen" // Full viewport height for hero
    >
      <motion.h1
        className="text-5xl md:text-7xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Your Name
      </motion.h1>
      <motion.p
        className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Étudiant en informatique & développeur web et data passionné par la création de solutions innovantes.
      </motion.p>
      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Button asChild size="lg" variant="default">
          <Link href="#projects">
            <Briefcase className="mr-2 h-5 w-5" />
            Voir mes projets
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="#contact">
            <Mail className="mr-2 h-5 w-5" />
            Me contacter
          </Link>
        </Button>
      </motion.div>
      <motion.div 
        className="absolute bottom-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1, repeat: Infinity, repeatType: "reverse", ease:"easeInOut" }}
        >
        <ArrowRight className="h-8 w-8 text-primary rotate-90" />
      </motion.div>
    </Section>
  );
}
