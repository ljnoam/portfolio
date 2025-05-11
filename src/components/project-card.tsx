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
      whileHover={{ 
        y: -8, 
        scale: 1.05,
        boxShadow: "0 20px 25px -5px rgba(var(--primary-hsl, 212 100% 67% / 0.1), 0.1), 0 8px 10px -6px rgba(var(--primary-hsl, 212 100% 67% / 0.1), 0.1)" 
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="h-full group"
    >
      <Card className="h-full flex flex-col bg-card hover:border-primary/50 transition-colors duration-300 shadow-lg overflow-hidden relative">
        <div className="relative w-full h-48">
          <Image
            src={project.imageUrl}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={project.imageHint}
            className="transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
             <div className="flex flex-wrap gap-2 justify-center">
              {project.stack.slice(0, 4).map((tech) => ( // Show limited stack in overlay
                <Badge key={tech} variant="secondary" className="bg-background/70 border-accent/50 text-accent hover:bg-accent/20 text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <CardHeader>
          <CardTitle className="text-2xl text-primary">{project.title}</CardTitle>
          <CardDescription className="text-foreground/80 pt-1 h-20 overflow-hidden text-ellipsis"> {/* Fixed height for description */}
            {project.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.stack.map((tech) => (
              <Badge key={tech} variant="secondary" className="bg-card border-accent/30 text-accent hover:bg-accent/10">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-start gap-3 mt-auto pt-4 border-t border-border">
          {project.githubLink && (
            <Button asChild variant="outline" size="sm">
              <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> GitHub
              </Link>
            </Button>
          )}
          {project.demoLink && (
            <Button asChild variant="default" size="sm">
              <Link href={project.demoLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> Démo
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
