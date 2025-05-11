import { Button } from "@/components/ui/button";
import { Section } from "@/components/section";
import { Mail, Linkedin, Github, Download } from "lucide-react";
import Link from "next/link";

export function ContactSection() {
  return (
    <Section id="contact" className="text-center">
      <h2 className="text-4xl font-bold mb-8 text-primary">Contactez-moi</h2>
      <p className="text-lg text-foreground/80 mb-10 max-w-xl mx-auto">
        N'hésitez pas à me contacter pour toute question, opportunité de collaboration ou simplement pour discuter.
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12">
        <Button asChild size="lg" variant="default">
          <a href="mailto:your.email@example.com"> {/* Replace with your email */}
            <Mail className="mr-2 h-5 w-5" /> Envoyer un email
          </a>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/cv.pdf" target="_blank" download="YourName_CV.pdf"> {/* Ensure cv.pdf is in /public */}
            <Download className="mr-2 h-5 w-5" /> Télécharger mon CV
          </Link>
        </Button>
      </div>
      <div className="flex justify-center items-center space-x-6">
        <Link href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
          <Github className="h-8 w-8 text-foreground/70 hover:text-primary transition-colors" />
        </Link>
        <Link href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
          <Linkedin className="h-8 w-8 text-foreground/70 hover:text-primary transition-colors" />
        </Link>
      </div>
    </Section>
  );
}
