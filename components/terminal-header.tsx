'use client';

interface TerminalHeaderProps {
  pwd?: string;
  isLoading?: boolean;
}

const TerminalHeader = ( { pwd, isLoading }: TerminalHeaderProps ) => {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      {isLoading && (
        <span className="ml-2 text-gray-500">deadpanda@hostname:{pwd ? pwd : '~'}$</span>
      )}
    </div>
  );
};

export default TerminalHeader;
