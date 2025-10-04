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
  const cmd_style = "text-white flex ml-2 text-bold text-sm md:text-xl";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



const infos_system = useMemo(() => {
  const infos = [
    {
      text: "[User]",
      delay: 200,
      className: cmd_style,
      isPreformatted: false,
      velocity: 0.2
    },
    {
      text: "name = Clement Lagier",
      delay: 200,
      className: "text-white text-xl",
      isPreformatted: false,
      velocity: 0.2
    },
    {
      text: "location = Moulins, France",
      delay: 200,
      className: "text-white text-xl",
      isPreformatted: false,
      velocity: 0.2
    },
    {
      text: "email = clement.lagier@epitech.eu",
      delay: 200,
      className: "text-white text-xl hover:text-green-400 hover:underline cursor-pointer",
      isPreformatted: false,
      velocity: 0.2,
      link: "mailto:clement.lagier@epitech.eu"
    },
    {
      text: "github = https://github.com/deadpanda-c",
      delay: 200,
      className: "text-white text-xl hover:text-green-400 hover:underline cursor-pointer",
      isPreformatted: false,
      velocity: 0.2,
      link: "https://github.com/deadpanda-c"
    },
    {
      text: "linkedin = https://www.linkedin.com/in/clement-lagier",
      delay: 200,
      className: "text-white text-xl hover:text-green-400 hover:underline cursor-pointer",
      isPreformatted: false,
      velocity: 0.2,
      link: "https://www.linkedin.com/in/clement-lagier"
    },
  ];
  return infos;
}, [cmd_style]);

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
        text: "ls -l ./skills/",
        delay: 0,
        className: cmd_style,
        isPreformatted: false,
        velocity: 0.2
      },
      {
        text: ".rw-r--r-- deadpanda deadpanda c",
        delay: 200,
        className: "text-cyan-400 text-[0.75rem] md:text-xl",
        isPreformatted: false,
        velocity: 0.2,
      },
      {
        text: ".rw-r--r-- deadpanda deadpanda c++",
        delay: 200,
        className: "text-cyan-400 text-[0.75rem] md:text-xl",
        isPreformatted: false,
        velocity: 0.2,
      },
      {
        text: ".rw-r--r-- deadpanda deadpanda nextjs",
        delay: 200,
        className: "text-cyan-400 text-[0.75rem] md:text-xl",
        isPreformatted: false,
        velocity: 0.2
      }
    ]
  ];

    const projectSet = [
      {
        text: "./projects --list --verbose",
        delay: 0,
        className: cmd_style,
        isPreformatted: false,
        velocity: 0.2
      },
      ...repos.flatMap((repo, index) => [
        {
          text: "----------------",
          delay: 200,
          className: "text-green-400 text-xs md:text-base",
          isPreformatted: false,
          velocity: 0.2,
        },
        {
          text: `PROJECT_NAME=${repo.name}`,
          delay: 200,
          className: "text-white text-sm md:text-lg",
          isPreformatted: false,
          velocity: 0.2,
          link: `${repo.link}`
        },
        {
          text: `DESCRIPTION=${repo.description || "No description"}`,
          delay: 200,
          className: "text-white text-[0.8rem] md:text-base break-all  whitespace-pre-wrap",
          isPreformatted: false,
          velocity: 0.2,
        },
      ])
    ];
   return [...baseSets, projectSet];

  }, [repos, cmd_style]);

  useEffect(() => {
    
    // Start the first command set
    setCommandHistory([{
      id: 0,
      lines: allCommandSets[0]
    }]);
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
        <div className="flex-1 min-w-0 break-words ">
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
      { !isMobile && (
      <div 
        id="info-section"
        className="w-2/5 fixed right-0 top-16 h-screen bg-black p-4 p-8 flex flex-col font-mono"
      >
        <div className="w-full">
          <div className="mb-4 flex">
            <Prompt pwd="/matrix" isMobile={isMobile} />
            <TypingText
              lines={[
                {
                  text: "cat .deadpanda.conf",
                  delay: 200,
                  className: cmd_style,
                  isPreformatted: false,
                  velocity: 0.2
                }
              ]} 
            />
          </div>
          {infos_system.map((info, index) => (
            <div key={index} className="mb-4">
              <div className="flex gap-2 items-start">
                <div>
                  <TypingText 
                    lines={[info]}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
        )}
    </div>
    </>
  );
};

export default HomePage;
