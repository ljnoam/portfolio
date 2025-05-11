
"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Code2 } from "lucide-react";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const NAVBAR_HEIGHT = "4rem"; // Define navbar height as a CSS variable or const

export function Navigation() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Navbar background effect on scroll
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Active section highlighting
      let currentSection = "";
      NAV_LINKS.forEach((link) => {
        const sectionId = link.href.substring(1);
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
          const navHeight = navRef.current?.offsetHeight || parseFloat(NAVBAR_HEIGHT) * 16; // Fallback to parsing rem
          if (sectionElement.offsetTop - navHeight <= window.scrollY) {
            currentSection = sectionId;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    // Set initial active section
    handleScroll();

    // Set navbar height CSS variable
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
        "bg-transparent" // Always transparent
      )}
      style={{ height: NAVBAR_HEIGHT }}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-full">
        <Link href="#hero" className="flex items-center gap-2 text-xl font-bold text-primary hover:text-primary/80 transition-colors" aria-label="Go to top of page">
          <Code2 size={28} />
          <span>DevCard</span>
        </Link>
        <ul className="flex items-center space-x-4 md:space-x-6">
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
      </div>
    </nav>
  );
}
