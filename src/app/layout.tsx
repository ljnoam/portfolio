import type { Metadata } from 'next';
import { GeistSans, GeistMono } from 'next/font/google'; // Corrected import names
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Added Toaster

const geistSans = GeistSans({ // Corrected variable name
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = GeistMono({ // Corrected variable name
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DevCard | Your Name', // Updated title
  description: 'A personal portfolio showcasing development skills and projects.', // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-mono antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
