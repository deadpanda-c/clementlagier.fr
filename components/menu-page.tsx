'use client';

import TerminalHeader from '@/components/terminal/terminal-header';
import TypingText from '@/components/terminal/typing-text';
import CTAButton from '@/components/buttons/call-to-actions';


const MenuPage = () => {
  const lines = [
    { text: "Hi, I'm Clement Lagier", delay: 0, className: "text-4xl md:text-5xl lg:text-6xl" },
    { text: "I'm a software engineer", delay: 2000, className: "text-2xl md:text-3xl lg:text-4xl mt-4" },
  ];

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-8 flex flex-col">
      <TerminalHeader isLoading={false} />
      
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <TypingText lines={lines} />
          <div className="mt-16 flex flex-col items-center">
            <CTAButton text="Enter the matrix" onClick={() => window.location.href = "/matrix"}
              className="bg-green-500 hover text-white font-bold py-2 px-4 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
