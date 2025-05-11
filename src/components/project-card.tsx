
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

export interface Project {
  title: string;
  description: string;
  stack: string[];
  githubLink?: string;
  demoLink?: string;
  imageUrl: string;
  imageHint: string;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="h-full group"
    >
      <Card className="h-full flex flex-col bg-card hover:border-primary/60 transition-all duration-300 ease-out shadow-lg hover:shadow-primary/15 overflow-hidden">
        <div className="relative w-full h-48 sm:h-52 overflow-hidden border-b border-border">
          <Image
            src={project.imageUrl}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={project.imageHint}
            className="transition-transform duration-350 ease-in-out group-hover:scale-105"
          />
        </div>
        
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg font-semibold text-primary group-hover:text-primary/90 transition-colors line-clamp-2">
            {project.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-4 pt-2 flex-grow flex flex-col">
          <CardDescription className="text-sm text-foreground/70 mb-4 leading-relaxed line-clamp-3">
            {project.description}
          </CardDescription>
          
          <div className="mt-auto">
            <h4 className="text-xs font-medium text-muted-foreground mb-2">Technologies:</h4>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="text-xs border-accent/40 text-accent/90 bg-accent/10 hover:bg-accent/20 px-2 py-0.5"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-3 flex justify-start gap-2 border-t border-border/70">
          {project.githubLink && (
            <Button asChild variant="ghost" size="sm" className="text-foreground/80 hover:text-primary hover:bg-primary/10">
              <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                <Github className="mr-1.5 h-3.5 w-3.5" /> GitHub
              </Link>
            </Button>
          )}
          {project.demoLink && (
            <Button asChild variant="outline" size="sm" className="hover:border-primary/70 hover:text-primary">
              <Link href={project.demoLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Démo
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

