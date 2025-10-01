'use client';

interface TypingLineProps {
  text: string;
  isActive: boolean;
  isCompleted: boolean;
  showCursor: boolean;
  className?: string;
}

const TypingLine = ({ text, isActive, isCompleted, showCursor, className } : TypingLineProps) => {
  return (
    <div className={className}>
      <span>{text}</span>
      <span 
        className={`inline-block w-3 h-8 md:h-10 lg:h-12 bg-green-400 ml-1 transition-opacity ${
          showCursor && isActive && !isCompleted ? 'opacity-100' : 'opacity-0'
        }`}
      ></span>
    </div>
  );
};

export default TypingLine;
