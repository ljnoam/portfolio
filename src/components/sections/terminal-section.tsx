
"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { Section } from "@/components/section";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Terminal, CornerDownLeft } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface OutputLine {
  id: number;
  type: 'input' | 'output' | 'error' | 'link';
  text: string;
  href?: string;
  isHtml?: boolean; // To allow rendering HTML for specific cases like game options
}

interface GameState {
  active: boolean;
  question: string;
  options: Record<string, string>;
  answer: string;
  step: 'asking' | 'answered';
}

const GITHUB_USERNAME = "noam"; // Replace if needed

export function TerminalSection() {
  const [inputValue, setInputValue] = useState('');
  const [outputLines, setOutputLines] = useState<OutputLine[]>([
    { id: Date.now(), type: 'output', text: 'Welcome to DevCard Interactive Terminal!' },
    { id: Date.now() + 1, type: 'output', text: "Type 'help' to see available commands." },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isHackerMode, setIsHackerMode] = useState(false);
  const [gameState, setGameState] = useState<GameState | null>(null);

  const terminalScrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    const container = terminalScrollRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [outputLines, scrollToBottom]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const playClearSound = () => {
    if (typeof window !== 'undefined' && window.AudioContext) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (audioContext) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(660, audioContext.currentTime); // E5 note
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime); // Quiet volume
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.05); // Play for 50ms
      }
    }
  };

  const processCommand = async (command: string) => {
    const newLinesBase: OutputLine[] = [...outputLines, { id: Date.now(), type: 'input', text: `> ${command}` }];
    setOutputLines(newLinesBase); // Show input immediately
    
    let response: OutputLine[] = [];
    const commandLower = command.toLowerCase().trim();

    switch (commandLower) {
      case 'help':
        response = [
          { id: Date.now() + 1, type: 'output', text: 'Available commands:' },
          { id: Date.now() + 2, type: 'output', text: '  help          - Show this help message' },
          { id: Date.now() + 3, type: 'output', text: '  about         - Navigate to About section' },
          { id: Date.now() + 4, type: 'output', text: '  projects      - Navigate to Projects section' },
          { id: Date.now() + 5, type: 'output', text: '  contact       - Navigate to Contact section' },
          { id: Date.now() + 6, type: 'output', text: '  stack         - Show my tech stack' },
          { id: Date.now() + 7, type: 'output', text: '  cv            - Get a link to my CV' },
          { id: Date.now() + 8, type: 'output', text: '  blog          - Info about my blog' },
          { id: Date.now() + 9, type: 'output', text: '  social        - My social media links' },
          { id: Date.now() + 10, type: 'output', text: '  github        - My latest GitHub repositories' },
          { id: Date.now() + 11, type: 'output', text: '  hacker        - Activate hacker mode' },
          { id: Date.now() + 12, type: 'output', text: '  reset         - Reset terminal appearance' },
          { id: Date.now() + 13, type: 'output', text: '  game          - Play a mini quiz game' },
          { id: Date.now() + 14, type: 'output', text: '  clear         - Clear the terminal' },
          { id: Date.now() + 15, type: 'output', text: '  whoami        - Display user info' },
          { id: Date.now() + 16, type: 'output', text: '  date          - Display current date' },
          { id: Date.now() + 17, type: 'output', text: '  sudo          - ???' },
          { id: Date.now() + 18, type: 'output', text: '  rm -rf /      - ???' },
          { id: Date.now() + 19, type: 'output', text: '  npx           - ???' },
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
        playClearSound();
        setOutputLines([]); // Clears history and current input line
        return; // Return early as we've modified state directly
      case 'whoami':
        response = [{ id: Date.now() + 1, type: 'output', text: 'user: noam\nhost: devcard.portfolio\nstatus: Awesome Developer Student' }];
        break;
      case 'date':
        response = [{ id: Date.now() + 1, type: 'output', text: new Date().toLocaleString() }];
        break;
      case 'stack':
        response = [
            { id: Date.now() + 1, type: 'output', text: 'My Tech Stack:' },
            { id: Date.now() + 2, type: 'output', text: '  🟦 TypeScript' },
            { id: Date.now() + 3, type: 'output', text: '  ⚛️  React & React Native' },
            { id: Date.now() + 4, type: 'output', text: '  🧠 Next.js' },
            { id: Date.now() + 5, type: 'output', text: '  💨 Tailwind CSS' },
            { id: Date.now() + 6, type: 'output', text: '  📦 Node.js & Express' },
            { id: Date.now() + 7, type: 'output', text: '  🔥 Firebase' },
            { id: Date.now() + 8, type: 'output', text: '  🐍 Python' },
        ];
        break;
      case 'cv':
        response = [
            { id: Date.now() + 1, type: 'output', text: 'Téléchargez mon CV ici :' },
            { id: Date.now() + 2, type: 'link', text: '  CV-Noam.pdf', href: '/CV-Noam.pdf' } // Assuming CV is in public/CV-Noam.pdf
        ];
        break;
      case 'blog':
        response = [
            { id: Date.now() + 1, type: 'output', text: 'La section blog arrive bientôt !' },
            // { id: Date.now() + 2, type: 'link', text: '  Visitez /blog (bientôt disponible)', href: '/blog' }
        ];
        break;
      case 'social':
        response = [
            { id: Date.now() + 1, type: 'output', text: 'Retrouvez-moi sur :' },
            { id: Date.now() + 2, type: 'link', text: `  GitHub: https://github.com/${GITHUB_USERNAME}`, href: `https://github.com/${GITHUB_USERNAME}` },
            { id: Date.now() + 3, type: 'link', text: '  LinkedIn: https://linkedin.com/in/noam-etsion', href: 'https://linkedin.com/in/noam-etsion' },
            // { id: Date.now() + 4, type: 'link', text: '  Twitter: https://twitter.com/noam_dev', href: 'https://twitter.com/noam_dev' },
        ];
        break;
      case 'sudo':
        response = [{ id: Date.now() + 1, type: 'error', text: 'sudo: permission denied. You are not root here.' }];
        break;
      case 'rm -rf /':
        response = [{ id: Date.now() + 1, type: 'output', text: '💣 BOOM. Just kidding. Nothing got deleted... I hope.' }];
        break;
      case 'npx':
        response = [{ id: Date.now() + 1, type: 'output', text: 'Running npx... wait... what are you doing? This is a portfolio, not a real terminal!' }];
        break;
      case 'github':
        setOutputLines(prev => [...prev, {id: Date.now(), type: 'output', text: 'Fetching GitHub repositories...'}]);
        try {
            const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&direction=desc&per_page=3`);
            if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
            const repos = await res.json();
            response.push({id: Date.now() +1, type: 'output', text: `Latest repositories for ${GITHUB_USERNAME}:`});
            repos.forEach((repo: any, index: number) => {
                const updatedAgo = formatDistanceToNow(new Date(repo.pushed_at), { addSuffix: true, locale: fr });
                response.push({ id: Date.now() + 2 + index, type: 'output', text: `  ${repo.name} – mis à jour ${updatedAgo}` });
            });
        } catch (error: any) {
            response.push({ id: Date.now() + 1, type: 'error', text: `Failed to fetch repositories: ${error.message}` });
        }
        break;
      case 'hacker':
        setIsHackerMode(true);
        response = [{ id: Date.now() + 1, type: 'output', text: 'Hacker mode activated. Welcome, agent.' }];
        break;
      case 'reset':
        setIsHackerMode(false);
        response = [{ id: Date.now() + 1, type: 'output', text: 'Terminal appearance reset to normal.' }];
        break;
      case 'game':
        setGameState({
            active: true,
            question: 'What does "use strict" do in JavaScript?',
            options: { a: "Enables strict parsing and error handling for 'bad syntax'", b: "Disables asynchronous code execution", c: "Makes JavaScript a statically typed language" },
            answer: 'a',
            step: 'asking',
        });
        response = [
            { id: Date.now() + 1, type: 'output', text: 'Quiz Time!' },
            { id: Date.now() + 2, type: 'output', text: 'What does "use strict" do in JavaScript?' },
            { id: Date.now() + 3, type: 'output', text: "  a) Enables strict parsing and error handling for 'bad syntax'" },
            { id: Date.now() + 4, type: 'output', text: '  b) Disables asynchronous code execution' },
            { id: Date.now() + 5, type: 'output', text: '  c) Makes JavaScript a statically typed language' },
            { id: Date.now() + 6, type: 'output', text: 'Your answer (a, b, or c):' },
        ];
        break;
      default:
        response = [{ id: Date.now() + 1, type: 'error', text: `Command not found: ${command}. Type 'help'.` }];
    }
    setOutputLines(prev => [...prev, ...response]);
  };

  const handleGameInput = (input: string) => {
    if (!gameState || !gameState.active) return;

    const answer = input.toLowerCase().trim();
    let gameResponse: OutputLine[] = [];

    if (gameState.options[answer]) {
        if (answer === gameState.answer) {
            gameResponse.push({ id: Date.now() + 1, type: 'output', text: '✅ Correct! Well done.' });
        } else {
            gameResponse.push({ id: Date.now() + 1, type: 'error', text: '❌ Wrong answer. The correct answer was (a).' });
        }
    } else {
        gameResponse.push({ id: Date.now() + 1, type: 'error', text: "Invalid option. Please type 'a', 'b', or 'c'." });
        // Keep game active for another try if invalid option, or end it. For now, we end.
    }
    
    setOutputLines(prev => [...prev, { id: Date.now(), type: 'input', text: `> ${input}` }, ...gameResponse]);
    setGameState(null); // End game after one question
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    if (gameState && gameState.active && gameState.step === 'asking') {
        handleGameInput(inputValue);
    } else {
        processCommand(inputValue);
    }

    if (inputValue.trim() !== commandHistory[commandHistory.length - 1]) {
      setCommandHistory(prev => [...prev, inputValue.trim()]);
    }
    setHistoryIndex(-1); // Reset history navigation index
    setInputValue('');
    setTimeout(() => inputRef.current?.focus(), 0); // Ensure focus happens after state updates
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (commandHistory.length === 0 && !(e.key === 'ArrowUp' || e.key === 'ArrowDown')) return;

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      // Navigate backward in history (older commands)
      const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(newIndex);
      setInputValue(commandHistory[commandHistory.length - 1 - newIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      // Navigate forward in history (newer commands, or clear input)
      const newIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIndex);
      setInputValue(newIndex === -1 ? '' : commandHistory[commandHistory.length - 1 - newIndex] || '');
    }
  };
  
  const terminalClasses = cn(
    "bg-card p-4 md:p-6 rounded-lg shadow-xl border border-border max-h-[60vh] flex flex-col",
    isHackerMode && "hacker-mode bg-black text-[#00FF00] font-mono border-[#00FF00]"
  );

  const inputPromptColor = isHackerMode ? "text-[#00FF00]" : "text-primary";
  const inputClasses = cn(
    "flex-grow bg-background focus:ring-accent text-base",
    isHackerMode && "bg-black text-[#00FF00] placeholder:text-green-700 focus:ring-[#00FF00] border-[#00FF00]"
  );


  return (
    <Section id="terminal" className="max-w-4xl mx-auto">
      <h2 className={cn("text-4xl font-bold mb-8 text-center text-primary flex items-center justify-center gap-3", isHackerMode && "text-[#00FF00]")}>
        <Terminal size={36} /> Terminal Interactif
      </h2>
      <motion.div
        className={terminalClasses}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div
          ref={terminalScrollRef}
          className={cn("terminal-output flex-grow overflow-y-auto pr-2 space-y-1 text-sm md:text-base mb-4 h-96", isHackerMode && "scrollbar-thumb-green")}
        >
          {outputLines.map(line => (
            <div key={line.id} className="whitespace-pre-wrap break-words">
              {line.type === 'link' && line.href ? (
                <Link 
                  href={line.href} 
                  className={cn("hover:underline cursor-pointer", isHackerMode ? "text-cyan-400" : "text-primary")}
                  onClick={() => setTimeout(() => inputRef.current?.focus(), 0)}
                  target={line.href.startsWith('http') || line.href.endsWith('.pdf') ? "_blank" : "_self"}
                  rel={line.href.startsWith('http') ? "noopener noreferrer" : ""}
                >
                  {line.text}
                </Link>
              ) : (
                <span
                  className={
                    line.type === 'input'
                      ? (isHackerMode ? 'text-[#00FF00]' : 'text-accent')
                      : line.type === 'error'
                      ? (isHackerMode ? 'text-red-400' : 'text-destructive')
                      : (isHackerMode ? 'text-[#00FF00]' : 'text-foreground/90')
                  }
                  dangerouslySetInnerHTML={line.isHtml ? { __html: line.text } : undefined}
                >
                  {!line.isHtml ? line.text : null}
                </span>
              )}
            </div>
          ))}
           {gameState && gameState.active && gameState.step === 'asking' && (
             <div className={cn("whitespace-pre-wrap break-words", isHackerMode ? "text-[#00FF00]" : "text-foreground/90")}>
                {gameState.question}
                {Object.entries(gameState.options).map(([key, value]) => (
                    <div key={key}>{`  ${key}) ${value}`}</div>
                ))}
                {'Your answer (a, b, or c):'}
             </div>
           )}
        </div>
        <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-2 border-t border-border">
          <span className={cn("font-semibold hidden sm:inline", inputPromptColor)}>&gt;</span>
          <Input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={gameState && gameState.active ? "Your answer (a,b,c)..." : "Tapez une commande..."}
            className={inputClasses}
            autoComplete="off"
            spellCheck="false"
            disabled={gameState?.step === 'asking' && outputLines[outputLines.length-1]?.text === 'Your answer (a, b, or c):' && inputValue !== ''} // Minor UX to prevent double input prompt
          />
          <Button type="submit" variant="outline" size="icon" aria-label="Submit command" className={cn(isHackerMode && "border-[#00FF00] text-[#00FF00] hover:bg-green-900")}>
            <CornerDownLeft size={18} />
          </Button>
        </form>
      </motion.div>
    </Section>
  );
}

