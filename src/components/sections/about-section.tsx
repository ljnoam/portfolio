import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/section";
import { Code, Database, Brain, Server,Smartphone } from "lucide-react";

const techStack = [
  { name: "JavaScript", icon: <Code size={18} /> },
  { name: "TypeScript", icon: <Code size={18} /> },
  { name: "React", icon: <Smartphone size={18} /> },
  { name: "Next.js", icon: <Smartphone size={18} /> },
  { name: "Node.js", icon: <Server size={18} /> },
  { name: "Python", icon: <Code size={18} /> },
  { name: "SQL", icon: <Database size={18} /> },
  { name: "NoSQL", icon: <Database size={18} /> },
  { name: "Tailwind CSS", icon: <Code size={18} /> },
  { name: "Machine Learning", icon: <Brain size={18} /> },
];

export function AboutSection() {
  return (
    <Section id="about" className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-8 text-center text-primary">À propos de moi</h2>
      <div className="space-y-6 text-lg text-foreground/90 leading-relaxed text-center md:text-left">
        <p>
          Passionné par le développement web et l'analyse de données, je suis actuellement étudiant en informatique, toujours à la recherche de nouveaux défis et de technologies émergentes. Mon objectif est de concevoir des applications performantes, intuitives et esthétiques.
        </p>
        <p>
          J'aime transformer des idées complexes en solutions concrètes, que ce soit en construisant des interfaces utilisateur interactives ou en explorant de vastes ensembles de données pour en extraire des informations précieuses. Curieux et autodidacte, je m'efforce continuellement d'améliorer mes compétences.
        </p>
      </div>
      <div className="mt-12">
        <h3 className="text-2xl font-semibold mb-6 text-center text-accent">Compétences Techniques</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {techStack.map((tech) => (
            <Badge key={tech.name} variant="secondary" className="text-sm px-4 py-2 flex items-center gap-2 bg-card border-primary/30 hover:bg-primary/10">
              {tech.icon}
              {tech.name}
            </Badge>
          ))}
        </div>
      </div>
    </Section>
  );
}
