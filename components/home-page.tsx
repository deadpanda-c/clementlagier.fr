'use client';

import TerminalHeader from '@/components/terminal-header';

import TypingText from '@/components/typing-text';


const HomePage = () => {
  const lines = [
    { text: "Hi, I'm Clement Lagier", delay: 0, className: "text-4xl md:text-5xl lg:text-6xl" },
    { text: "I'm a software engineer", delay: 2000, className: "text-2xl md:text-3xl lg:text-4xl mt-4" },
    // Add more lines here as needed
  ];

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-8 flex flex-col">
      <TerminalHeader isLoading={false} />
      
      <div className="flex-1 flex items-center justify-center">
        <TypingText lines={lines} />
      </div>
    </div>
  );
};

export default HomePage;
