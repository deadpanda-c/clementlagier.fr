'use client';
import { useEffect, useState } from 'react';

import TerminalHeader from '@/components/terminal-header';
import LoadingIndicator from '@/components/loading-indicator';


const LoadingPage = () => {
  const [lines, setLines] = useState([]);
  const [dots, setDots] = useState('');

  const commands = [
    'Initializing system modules...',
    'Loading configuration files...',
    'Connecting to database...',
    'npm install dependencies...',
    'Compiling TypeScript...',
    'Building production bundle...',
    'Optimizing assets...',
    'Starting development server...',
    'Checking for updates...',
    'Running health checks...',
    'Establishing secure connection...',
    'Mounting file system...',
    'Parsing environment variables...',
    'Validating credentials...',
    'Bootstrapping application...',
    'Starting application...',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomCmd = commands[Math.floor(Math.random() * commands.length)];
      const timestamp = new Date().toLocaleTimeString();
      
      setLines(prev => {
        const newLines = [...prev, { text: randomCmd, timestamp, id: Date.now() }];
        return newLines.slice(-12);
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    return () => clearInterval(dotsInterval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-8 flex flex-col">
      {/* Terminal Header */}
      <TerminalHeader isLoading={true} />

      {/* Terminal Content */}
      <div className="flex-1 overflow-hidden">
        {lines.map((line) => (
          <div key={line.id} className="mb-1 animate-pulse">
            <span className="text-gray-600">[{line.timestamp}]</span>
            <span className="ml-2 text-green-400">$</span>
            <span className="ml-2">{line.text}</span>
          </div>
        ))}
      </div>

      {/* Loading Indicator */}
      <LoadingIndicator dots={dots} />

    </div>
  );
};

export default LoadingPage;
