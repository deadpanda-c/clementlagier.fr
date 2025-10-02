'use client';

interface PromptProps {
  pwd?: string;
  isMobile?: boolean;
}

const Prompt = ({ pwd, isMobile }: PromptProps) => {
  return (
    <>
      
      {isMobile && (
        <span className="ml-2 text-gray-500">$ </span>
      )}
      {!isMobile && (
        <span className="ml-2 text-gray-500">deadpanda@hostname:{pwd ? pwd : '~'}$</span>
      )}
      <span className="ml-1 text-gray-500">❯</span>
    </>
  );
};

export default Prompt;
