import { Section } from "@/components/section";
import { ProjectCard, type Project } from "@/components/project-card";

const projectsData: Project[] = [
  {
    title: "Portfolio Avancé",
    description: "Ce site web ! Un portfolio personnel statique, moderne et réactif construit avec Next.js et Tailwind CSS.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubLink: "https://github.com/yourusername/devcard-portfolio", // Replace with your actual link
    imageUrl: "https://picsum.photos/seed/portfolio/400/300",
    imageHint: "website user interface"
  },
  {
    title: "Analyse de Données E-commerce",
    description: "Un pipeline d'analyse de données pour un site e-commerce, identifiant les tendances de vente et les comportements clients.",
    stack: ["Python", "Pandas", "Matplotlib", "Jupyter Notebook"],
    githubLink: "https://github.com/yourusername/ecommerce-analysis", // Replace
    imageUrl: "https://picsum.photos/seed/dataviz/400/300",
    imageHint: "data visualization"
  },
  {
    title: "Application Web de Gestion de Tâches",
    description: "Une application full-stack permettant de créer, suivre et gérer des tâches en équipe.",
    stack: ["React", "Node.js", "Express", "MongoDB", "REST API"],
    demoLink: "#", // Replace with actual demo link if available
    imageUrl: "https://picsum.photos/seed/taskapp/400/300",
    imageHint: "application interface"
  },
  {
    title: "Chatbot Intelligent",
    description: "Un chatbot basé sur des techniques de NLP pour répondre aux questions fréquentes des utilisateurs.",
    stack: ["Python", "NLTK", "Scikit-learn", "Flask"],
    githubLink: "https://github.com/yourusername/smart-chatbot", // Replace
    imageUrl: "https://picsum.photos/seed/chatbot/400/300",
    imageHint: "artificial intelligence"
  },
];

export function ProjectsSection() {
  return (
    <Section id="projects">
      <h2 className="text-4xl font-bold mb-12 text-center text-primary">Mes Projets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </Section>
  );
}
