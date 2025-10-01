'use client';

const TerminalHeader = () => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-3 h-3 rounded-full bg-red-500"></div>
      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
      <div className="w-3 h-3 rounded-full bg-green-500"></div>
      <span className="ml-4 text-gray-500">terminal@loading:~$</span>
    </div>
  );
};

export default TerminalHeader;
