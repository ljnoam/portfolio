
"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggleButton } from "@/components/theme-toggle-button";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#timeline", label: "Timeline" },
  { href: "#tools", label: "Tools" },
  { href: "#terminal", label: "Terminal" },
  { href: "#contact", label: "Contact" },
];

const NAVBAR_HEIGHT = "4rem"; 

export function Navigation() {
  const [activeSection, setActiveSection] = useState<string>("");
  const navRef = useRef<HTMLElement>(null);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = "";
      NAV_LINKS.forEach((link) => {
        const sectionId = link.href.substring(1);
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
          const navHeight = navRef.current?.offsetHeight || parseFloat(NAVBAR_HEIGHT) * 16; 
          const threshold = window.innerHeight * 0.4; 
          if (sectionElement.getBoundingClientRect().top - navHeight < threshold) {
            currentSection = sectionId;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 

    if (navRef.current) {
        document.documentElement.style.setProperty('--navbar-height', `${navRef.current.offsetHeight}px`);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out",
        "py-4",
        "bg-background/80 backdrop-blur-md" 
      )}
      style={{ height: NAVBAR_HEIGHT }}
    >
      <div className="container mx-auto px-8 sm:px-10 md:px-12 lg:px-16 flex items-center justify-between h-full">
        <Link 
          href="#hero" 
          className="flex items-center gap-2 text-xl font-bold text-primary hover:text-primary/80 transition-colors" 
          aria-label="Go to top of page"
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
        >
          <motion.span 
            animate={{ 
              color: isLogoHovered ? "hsl(var(--accent))" : "hsl(var(--primary))",
              scale: isLogoHovered ? 1.1 : 1,
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Noam
          </motion.span>
        </Link>
        <ul className="hidden md:flex items-center space-x-4 md:space-x-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "text-sm md:text-base font-medium transition-colors hover:text-primary",
                  activeSection === link.href.substring(1)
                    ? "text-primary"
                    : "text-foreground/80"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <ThemeToggleButton />
          {/* Mobile menu button can be added here if needed later */}
        </div>
      </div>
    </nav>
  );
}
