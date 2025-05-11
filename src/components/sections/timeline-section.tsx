"use client";

import { Section } from "@/components/section";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Briefcase, GraduationCap, Lightbulb, CodeXml } from "lucide-react"; // Using CodeXml as a general dev icon
import type { LucideIcon } from "lucide-react";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category?: "work" | "education" | "learning";
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "2023 - Présent",
    title: "Master Informatique",
    description: "Approfondissement en développement logiciel, intelligence artificielle et gestion de projet.",
    icon: GraduationCap,
    category: "education",
  },
  {
    year: "2022",
    title: "Auto-formation Next.js & TypeScript",
    description: "Développement de projets personnels pour maîtriser Next.js, TypeScript et Tailwind CSS.",
    icon: Lightbulb,
    category: "learning",
  },
  {
    year: "2021 - 2023",
    title: "Licence Informatique",
    description: "Bases solides en algorithmique, structures de données, bases de données et développement web.",
    icon: GraduationCap,
    category: "education",
  },
  {
    year: "Été 2022",
    title: "Stage Développeur Web - Alpha Tech",
    description: "Participation au développement d'une application React pour la gestion client, intégration d'API.",
    icon: Briefcase,
    category: "work",
  },
  {
    year: "2020",
    title: "Découverte de Python et Data Science",
    description: "Premiers pas en programmation avec Python, exploration de Pandas et Matplotlib pour l'analyse de données.",
    icon: CodeXml,
    category: "learning",
  },
];

export function TimelineSection() {
  const getIconColor = (category?: "work" | "education" | "learning") => {
    switch (category) {
      case "work":
        return "text-primary"; // Blue for work
      case "education":
        return "text-accent";  // Orange-Pink for education
      case "learning":
        return "text-green-500"; // Green for learning (custom color, or use theme)
      default:
        return "text-foreground";
    }
  };

  return (
    <Section id="timeline" className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-12 text-center text-primary">Mon Parcours</h2>
      <div className="relative pl-6 after:absolute after:inset-y-0 after:w-0.5 after:bg-border after:left-0">
        {timelineEvents.map((event, index) => (
          <div key={index} className="relative pl-8 mb-10 group">
            <div className="absolute left-[-22px] top-1 z-10 flex items-center justify-center w-10 h-10 bg-background rounded-full border-2 border-primary group-hover:border-accent transition-colors">
              <event.icon size={20} className={cn("transition-colors", getIconColor(event.category), "group-hover:text-accent")} />
            </div>
            <Card className="bg-card hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-between items-center mb-1">
                  <CardTitle className="text-xl text-accent group-hover:text-primary transition-colors">{event.title}</CardTitle>
                  <span className="text-sm text-muted-foreground">{event.year}</span>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-foreground/80">{event.description}</CardDescription>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </Section>
  );
}
