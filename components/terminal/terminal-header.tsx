'use client';

import Prompt from '@/components/terminal/prompt';

interface TerminalHeaderProps {
  pwd?: string;
  displayPrompt?: boolean;
}

const TerminalHeader = ( { pwd, displayPrompt }: TerminalHeaderProps ) => {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        {pwd && (
          <div className="flex items-center ml-4">
            <span className="text-white">{pwd}</span>
          </div>
        )}
      </div>
      {displayPrompt && (
        <Prompt pwd={pwd} />
      )}
    </div>
  );
};

export default TerminalHeader;
