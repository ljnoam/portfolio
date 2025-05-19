
"use client";

import { Section } from "@/components/section";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Briefcase, GraduationCap, Lightbulb, CodeXml } from "lucide-react"; 
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
    title: "Bachelor en informatique",
    description: "Formation en alternance à l'ECE Paris, spécialisée en Data Science et IA.",
    icon: GraduationCap,
    category: "education",
  },
  {
    year: "2023",
    title: "Auto-formation Next.js & TypeScript",
    description: "Développement de projets personnels pour maîtriser Next.js, TypeScript et Tailwind CSS.",
    icon: Lightbulb,
    category: "learning",
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
