import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main className="flex flex-col">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <footer className="py-8 text-center text-muted-foreground text-sm border-t border-border">
        <p>&copy; {new Date().getFullYear()} Noam. Tous droits réservés.</p>
        <p>Construit avec Next.js et Tailwind CSS.</p>
      </footer>
    </>
  );
}
