'use client';

import { useEffect, useState, useMemo } from "react";

import TerminalHeader from "@/components/terminal/terminal-header";
import Prompt from "@/components/terminal/prompt";
import TypingText from "@/components/terminal/typing-text";

interface Command {
  text: string;
  delay: number;
  className: string;
  isPreformatted: boolean;
}

interface CommandSet {
  id: number;
  lines: Array<Command>;
}


const HomePage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [commandHistory, setCommandHistory] = useState<Array<CommandSet>>([]);
  const [currentCommandSetIndex, setCurrentCommandSetIndex] = useState(0);
  
  const cmd_style = "text-white flex ml-2 text-bold text-sm md:text-xl";

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);


 const allCommandSets = useMemo(() => [
    [
      {
        text: "./about-me",
        delay: 0,
        className: cmd_style,
        isPreformatted: false,
        velocity: 0.2
      },
      {
        text: "-----------------------------",
        delay: 200,
        className: "text-green-400 text-xs md:text-base",
        isPreformatted: false,
        velocity: 0.2
      },
      {
        text: "I'm a software engineer who is passionate about building new things.",
        delay: 400,
        className: "text-white text-sm md:text-base",
        isPreformatted: false,
        velocity: 0.2
      },
      {
        text: "-----------------------------",
        delay: 200,
        className: "text-green-400 text-xs md:text-base",
        isPreformatted: false,
        velocity: 0.2
      },
    ],
    [
      {
        text: "./skills",
        delay: 0,
        className: cmd_style,
        isPreformatted: false,
        velocity: 0.2
      },
      {
        text: "React | TypeScript | Node.js | Python",
        delay: 200,
        className: "text-cyan-400 ml-2 text-sm md:text-xl",
        isPreformatted: false,
        velocity: 0.2
      }
    ],
    [
      {
        text: "./projects",
        delay: 0,
        className: cmd_style,
        isPreformatted: false,
        velocity: 0.2
      },
      {
        text: "Building awesome terminal experiences...",
        delay: 200,
        className: "text-yellow-400 ml-2 text-sm md:text-xl",
        isPreformatted: false,
        velocity: 0.2
      }
    ]
  ], []);

  useEffect(() => {
    
    // Start the first command set
    setCommandHistory([{
      id: 0,
      lines: allCommandSets[0]
    }]);
  }, [setCommandHistory, allCommandSets]);

  const handleCommandSetComplete = () => {
    const nextIndex = currentCommandSetIndex + 1;
    
    // Only add next command if we haven't reached the end
    if (nextIndex < allCommandSets.length) {
      setCurrentCommandSetIndex(nextIndex);
      
      // Add new command set to history
      setCommandHistory(prev => [...prev, {
        id: prev.length,
        lines: allCommandSets[nextIndex]
      }]);
    }
  };


  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-8 flex flex-col">
      <TerminalHeader displayPrompt={false} pwd="/matrix"/>
      <div className="flex-1">
        {commandHistory.map((commandSet, index) => (
          <div key={commandSet.id} className="mb-6">
            <div className="flex gap-2 items-start">
              <Prompt pwd="/matrix" isMobile={isMobile} />
              <div className="flex-1 w-full">
                <TypingText 
                  lines={commandSet.lines}
                  onComplete={index === commandHistory.length - 1 ? handleCommandSetComplete : undefined}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
