import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { TimelineSection } from "@/components/sections/timeline-section";
import { ToolsSection } from "@/components/sections/tools-section";
import { TerminalSection } from "@/components/sections/terminal-section";
import { ContactSection } from "@/components/sections/contact-section";
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main className="flex flex-col">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <TimelineSection />
        <ToolsSection />
        <TerminalSection />
        <ContactSection />
      </main>
      <footer className="py-8 px-6 sm:px-8 md:px-10 lg:px-12 text-center text-muted-foreground text-sm border-t border-border bg-card">
        <div className="font-mono text-left max-w-md mx-auto mb-4">
          <p className="text-primary">
            <span className="text-accent">noam@portfolio</span>:<span className="text-primary">~</span>$ whoami
          </p>
          <p>Noam - Développeur Web & Étudiant en Informatique</p>
          <p className="text-primary">
             <span className="text-accent">noam@portfolio</span>:<span className="text-primary">~</span>$ <span className="blinking-cursor">_</span>
          </p>
        </div>
        <div className="flex justify-center items-center space-x-4 mb-4">
          <Link href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile"> {/* Replace yourusername */}
            <Github className="h-6 w-6 text-foreground/70 hover:text-primary transition-colors" />
          </Link>
          <Link href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile"> {/* Replace yourusername */}
            <Linkedin className="h-6 w-6 text-foreground/70 hover:text-primary transition-colors" />
          </Link>
        </div>
        <p>&copy; {new Date().getFullYear()} Noam. Tous droits réservés.</p>
        <p>Construit avec Next.js, Tailwind CSS et beaucoup de <span className="text-accent">&lt;3</span>.</p>
      </footer>
    </>
  );
}
