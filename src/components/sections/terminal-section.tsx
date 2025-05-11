"use client";

import { useState, useRef, useEffect } from 'react';
import { Section } from "@/components/section";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Terminal, CornerDownLeft } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface OutputLine {
  id: number;
  type: 'input' | 'output' | 'error' | 'link';
  text: string;
  href?: string;
}

export function TerminalSection() {
  const [inputValue, setInputValue] = useState('');
  const [outputLines, setOutputLines] = useState<OutputLine[]>([
    { id: Date.now(), type: 'output', text: 'Welcome to DevCard Interactive Terminal!' },
    { id: Date.now() + 1, type: 'output', text: "Type 'help' to see available commands." },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const outputEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    outputEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [outputLines]);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);


  const processCommand = (command: string) => {
    const newLines: OutputLine[] = [...outputLines, { id: Date.now(), type: 'input', text: `> ${command}` }];
    let response: OutputLine[] = [];

    switch (command.toLowerCase().trim()) {
      case 'help':
        response = [
          { id: Date.now() + 1, type: 'output', text: 'Available commands:' },
          { id: Date.now() + 2, type: 'output', text: '  help       - Show this help message' },
          { id: Date.now() + 3, type: 'output', text: '  about      - Navigate to About section' },
          { id: Date.now() + 4, type: 'output', text: '  projects   - Navigate to Projects section' },
          { id: Date.now() + 5, type: 'output', text: '  contact    - Navigate to Contact section' },
          { id: Date.now() + 6, type: 'output', text: '  clear      - Clear the terminal' },
          { id: Date.now() + 7, type: 'output', text: '  whoami     - Display user info' },
          { id: Date.now() + 8, type: 'output', text: '  date       - Display current date' },
        ];
        break;
      case 'about':
        response = [{ id: Date.now() + 1, type: 'link', text: 'Navigating to About section...', href: '#about' }];
        break;
      case 'projects':
        response = [{ id: Date.now() + 1, type: 'link', text: 'Navigating to Projects section...', href: '#projects' }];
        break;
      case 'contact':
        response = [{ id: Date.now() + 1, type: 'link', text: 'Navigating to Contact section...', href: '#contact' }];
        break;
      case 'clear':
        setOutputLines([]);
        return;
      case 'whoami':
        response = [{ id: Date.now() + 1, type: 'output', text: 'user: noam\nhost: devcard.portfolio\nstatus: Awesome Developer Student' }];
        break;
      case 'date':
        response = [{id: Date.now() + 1, type: 'output', text: new Date().toLocaleString() }];
        break;
      default:
        response = [{ id: Date.now() + 1, type: 'error', text: `Command not found: ${command}. Type 'help'.` }];
    }
    setOutputLines([...newLines, ...response]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    processCommand(inputValue);
    if (inputValue.trim() !== commandHistory[commandHistory.length -1]) {
        setCommandHistory(prev => [...prev, inputValue.trim()]);
    }
    setHistoryIndex(-1); // Reset history index
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (commandHistory.length === 0) return;

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : commandHistory.length - 1;
      setHistoryIndex(newIndex);
      setInputValue(commandHistory[commandHistory.length - 1 - newIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = historyIndex > 0 ? historyIndex - 1 : -1;
      setHistoryIndex(newIndex);
      setInputValue(newIndex === -1 ? '' : commandHistory[commandHistory.length - 1 - newIndex] || '');
    }
  };

  return (
    <Section id="terminal" className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-8 text-center text-primary flex items-center justify-center gap-3">
        <Terminal size={36} /> Terminal Interactif
      </h2>
      <motion.div 
        className="bg-card p-4 md:p-6 rounded-lg shadow-xl border border-border max-h-[60vh] flex flex-col"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="terminal-output flex-grow overflow-y-auto pr-2 space-y-1 text-sm md:text-base mb-4 h-96">
          {outputLines.map(line => (
            <div key={line.id} className="whitespace-pre-wrap break-words">
              {line.type === 'link' && line.href ? (
                <Link href={line.href} className="text-primary hover:underline cursor-pointer" onClick={() => setTimeout(() => inputRef.current?.focus(), 0)}>
                  {line.text}
                </Link>
              ) : (
                <span className={
                  line.type === 'input' ? 'text-accent' :
                  line.type === 'error' ? 'text-destructive' :
                  'text-foreground/90'
                }>
                  {line.text}
                </span>
              )}
            </div>
          ))}
          <div ref={outputEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-2 border-t border-border">
          <span className="text-primary font-semibold hidden sm:inline">&gt;</span>
          <Input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tapez une commande..."
            className="flex-grow bg-background focus:ring-accent text-base"
            autoComplete="off"
            spellCheck="false"
          />
          <Button type="submit" variant="outline" size="icon" aria-label="Submit command">
            <CornerDownLeft size={18} />
          </Button>
        </form>
      </motion.div>
    </Section>
  );
}
