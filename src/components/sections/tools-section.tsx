"use client";

import { Section } from "@/components/section";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeXml, TerminalSquare, GitFork, StickyNote, LayoutGrid, Database } from "lucide-react"; // Using CodeXml for VS Code, GitFork for Git
import type { LucideIcon } from "lucide-react";

interface Tool {
  name: string;
  category: string;
  icon: LucideIcon;
  keywords?: string[];
}

const favoriteTools: Tool[] = [
  { name: "VS Code", category: "Éditeur de code", icon: CodeXml, keywords: ["IDE", "Extensions", "Debugging"] },
  { name: "Git & GitHub", category: "Version Control", icon: GitFork, keywords: ["Collaboration", "Branches", "CI/CD"] },
  { name: "Zsh + Oh My Zsh", category: "Terminal", icon: TerminalSquare, keywords: ["Shell", "Productivité", "CLI"] },
  { name: "Notion", category: "Organisation", icon: StickyNote, keywords: ["Documentation", "Gestion de projet", "Notes"] },
  { name: "Figma", category: "Design UI/UX", icon: LayoutGrid, keywords: ["Prototypage", "Interface", "Collaboration"] },
  { name: "Docker", category: "Conteneurisation", icon: Database, keywords: ["Déploiement", "Environnements", "Isolation"] },
];

export function ToolsSection() {
  return (
    <Section id="tools" className="max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold mb-12 text-center text-primary">Mes Outils Préférés</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {favoriteTools.map((tool, index) => (
          <Card key={index} className="bg-card hover:shadow-primary/20 hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <CardHeader className="flex-row items-center gap-4 pb-4">
              <tool.icon size={36} className="text-accent" />
              <div>
                <CardTitle className="text-xl text-primary">{tool.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{tool.category}</p>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              {tool.keywords && tool.keywords.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tool.keywords.map(keyword => (
                    <Badge key={keyword} variant="outline" className="text-xs border-primary/30 text-primary/80">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
