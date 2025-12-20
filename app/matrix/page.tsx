'use client';

import { useEffect, useState, useMemo } from "react";

import TerminalHeader from "@/components/terminal/terminal-header";
import Prompt from "@/components/terminal/prompt";
import TypingText from "@/components/terminal/typing-text";
import TypingLine from "@/components/terminal/typing-line";
import  useGithubRepos from "@/hooks/useGithubRepos";


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
  const repos = useGithubRepos();
  const cmd_style = "text-white flex ml-2 text-bold text-sm md:text-xl w-full";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



const allCommandSets = useMemo(() => {
  const baseSets = [
    [
      {
        text: "./about-me",
        delay: 0,
        className: cmd_style,
        isPreformatted: false,
        velocity: 0.2
      },
      {
        text: "Hello World ! I'm passionate about pentesting and learning new things. Enjoy your visit !",
        delay: 100,
        className: "text-white text-[0.75rem] md:text-xl",
        isPreformatted: false,
        velocity: 0.2
      },
    ],
    [
      {
        text: "ls -l ./skills/",
        delay: 200,
        className: cmd_style,
        isPreformatted: false,
        velocity: 0.2
      },
      {
        text: ".rw-r--r-- deadpanda deadpanda Low-level programming languages (C, C++, Rust)",
        delay: 300,
        className: "text-white text-[0.75rem] md:text-xl",
        isPreformatted: false,
        velocity: 0.2,
      },
      {
        text: ".rw-r--r-- deadpanda deadpanda Scripting languages (Python, Bash, JavaScript)",
        delay: 300,
        className: "text-white text-[0.75rem] md:text-xl",
        isPreformatted: false,
        velocity: 0.2,
      },
      {
        text: ".rw-r--r-- deadpanda deadpanda SoftSkills (Communication, Teamwork)",
        delay: 300,
        className: "text-white text-[0.75rem] md:text-xl",
        isPreformatted: false,
        velocity: 0.2
      }
    ]
  ];

    const projectSet = [
      {
        text: "repo --pinned",
        delay: 0,
        className: cmd_style,
        isPreformatted: false,
        velocity: 0.2
      },
      {
        text: "NAME        LANGUAGE         DESCRIPTION",
        delay: 0,
        className: cmd_style + " whitespace-pre-wrap",
        isPreformatted: false,
        velocity: 0.2
      },
      ...repos.flatMap((repo, index) => [
        {
          text: `${repo.name}        ${repo.language}        ${repo.description || "No description"}`,
          delay: 200,
          className: "text-white text-sm md:text-lg whitespace-pre-wrap",
          isPreformatted: false,
          velocity: 0.2,
          link: `https://github.com/${repo.author}/${repo.name}`
        },
      ])
    ];
   return [...baseSets, projectSet];

  }, [repos, cmd_style]);

  useEffect(() => {
    
    // Start the first command set
    const timer = setTimeout(() => {
      setCommandHistory([{
        id: 0,
        lines: allCommandSets[0]
      }]);
    }, 300);
  }, [allCommandSets]);

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
      console.log(allCommandSets[nextIndex]);
    }
  };


  const scrollToInfo = () => {
    const infoSection = document.getElementById('info-section');
    if (infoSection) {
      infoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="flex flex-row min-h-screen bg-black divide-x-2">

        {/* Left side - Terminal */}
        <div className="w-full md:w-3/5 overflow-x-auto bg-black text-green-400 font-mono p-4 md:p-8 flex flex-col md:overflow-y-auto md:h-screen scrollbar-hide">
          <TerminalHeader displayPrompt={false} pwd="/matrix"/>
          <div className="flex-1 min-w-0 break-words">
            {commandHistory.map((commandSet, index) => (
              <div key={commandSet.id} className="mb-6">
                <div className="flex gap-2 items-start">
                  <Prompt pwd="/matrix" isMobile={isMobile} />
                  <div>
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

        {/* Right side - Info System */}
    </div>
    </>
  );
};

export default HomePage;
