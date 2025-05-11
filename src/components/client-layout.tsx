"use client";

import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Loader } from "@/components/loader";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";

interface ClientLayoutProps {
  children: ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show loader for 2 seconds
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {children}
      <Toaster />
      <ScrollToTopButton />
    </>
  );
}
