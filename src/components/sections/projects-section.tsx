import { Section } from "@/components/section";
import { ProjectCard, type Project } from "@/components/project-card";

const projectsData: Project[] = [
  {
    title: "Traveloo – Planner de Vacances en Ligne",
    description:
      "Application web full-stack pour planifier, organiser et partager ses vacances. Interface moderne en React, avec un backend Python pour la gestion des utilisateurs, destinations et itinéraires.",
    stack: ["React", "Tailwind CSS", "Python", "REST API", "Full Stack"],
    demoLink: "https://traveloo.fr",
    imageUrl: "/travel_planner.png",
    imageHint: "interface de planification de voyage",
  },
  {
    title: "Scraper Produits Decathlon",
    description:
      "Un scraper web en Python qui collecte automatiquement les données de produits sur le site Decathlon (nom, prix, liens...)!",
    stack: ["Python", "Selenium", "Pandas", "Web Scraping"],
    githubLink: "https://github.com/ljnoam/decathlon_scraper",
    imageUrl: "/decathlon.png",
    imageHint: "code terminal et produits en ligne",
  },
  {
    title: "Réservation de Billets TGV",
    description:
      "Application console en C++ pour réserver des billets de TGV avec gestion des trains, horaires, types de billets, annulations, ...",
    stack: ["C++", "CMake", "Programmation Orientée Objet", "Fichiers texte"],
    githubLink: "https://github.com/ljnoam/projet_tgv",
    imageUrl: "tgv.png",
    imageHint: "terminal application",
  },
];

export function ProjectsSection() {
  return (
    <Section id="projects">
      <h2 className="text-4xl font-bold mb-12 text-center text-primary">
        Mes principaux projets
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </Section>
  );
}
