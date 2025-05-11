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
      whileHover={{ y: -8, boxShadow: "0 10px 15px -3px rgba(var(--primary-hsl), 0.1), 0 4px 6px -2px rgba(var(--primary-hsl), 0.05)" }}
      transition={{ type: "spring", stiffness: 300 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col bg-card hover:border-primary/50 transition-colors duration-300 shadow-lg overflow-hidden">
        <div className="relative w-full h-48">
          <Image
            src={project.imageUrl}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={project.imageHint}
          />
        </div>
        <CardHeader>
          <CardTitle className="text-2xl text-primary">{project.title}</CardTitle>
          <CardDescription className="text-foreground/80 pt-1">{project.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.stack.map((tech) => (
              <Badge key={tech} variant="secondary" className="bg-background border-accent/30 text-accent hover:bg-accent/10">
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
