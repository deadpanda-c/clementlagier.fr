'use client';

interface TypingLineProps {
  text: string;
  isActive: boolean;
  isCompleted: boolean;
  showCursor: boolean;
  className?: string;
  isPreformatted?: boolean;
  link?: string;
}

const TypingLine = ({ 
  text, 
  isActive, 
  isCompleted, 
  showCursor, 
  className,
  isPreformatted = false,
  link
}: TypingLineProps) => {
  if (isPreformatted) {
    return (
      <pre 
        className={className} 
        style={{ whiteSpace: 'pre', fontFamily: 'monospace' }}
      >
        {text}
      </pre>
    );
  }


  // Regular text with cursor
  return (
    <div className={className}>
      <span><a className={link ? "hover:underline hover:text-green-400" : ""} href={link}>{text}</a></span>
      <span 
        className={`inline-block w-3 h-8 md:h-10 lg:h-12 bg-green-400 ml-1 transition-opacity ${
          showCursor && isActive && !isCompleted ? 'opacity-100' : 'opacity-0'
        }`}
      ></span>
    </div>
  );
};

export default TypingLine;
