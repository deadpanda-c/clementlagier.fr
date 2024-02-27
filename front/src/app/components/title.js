import { React } from 'react';

export default function Title() {
  return (
    <div className="h-screen">
      <div className="grid grid-cols-2 divide-x divide-x text-center h-5/6 mt-8">
        <div className="flex items-center justify-center text-5xl">
          <h1 className="text-5xl text-left">
            Clément<br />
            Lagier 
          </h1>
        </div>
        <div className="flex items-center justify-center text-4xl">
          <h2 className="animate-typing overflow-hidden whitespace-nowrap">
            Software Engineer
          </h2>
        </div>
      </div>
  </div>
  );
}
