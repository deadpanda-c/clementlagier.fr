'use client';

import { useEffect, useState } from 'react';

import TerminalHeader from '@/components/terminal/terminal-header';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-8 flex flex-col">
      <TerminalHeader isLoading={false} />
    </div>
  );
};

export default HomePage;
