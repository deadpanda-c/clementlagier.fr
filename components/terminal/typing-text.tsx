'use-client';

import { useEffect, useState } from 'react';
import TypingLine from '@/components/terminal/typing-line';

interface TypingTextProps {
  lines: Array<{
    text: string;
    delay: number;
    className?: string;
    isPreformatted?: boolean;
    velocity?: number;
    link?: string;
  }>;
  onComplete?: () => void;
}

const TypingText = ({ lines, onComplete }: TypingTextProps) => {
  const [displayedLines, setDisplayedLines] = useState(lines.map(() => ''));
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [showCursors, setShowCursors] = useState(lines.map(() => false));
  const [completedLines, setCompletedLines] = useState(lines.map(() => false));

  useEffect(() => {
    if (activeLineIndex >= lines.length) {
      // All lines completed, notify parent
      if (onComplete) {
        setTimeout(() => onComplete(), 500);
      }
      return;
    }

    const currentLine = lines[activeLineIndex];
    const startTimeout = setTimeout(() => {
      // Mark line as active
      setShowCursors(prev => {
        const newCursors = [...prev];
        newCursors[activeLineIndex] = true;
        return newCursors;
      });    
      
      if (currentLine.isPreformatted) {
        setDisplayedLines(prev => {
          const newLines = [...prev];
          newLines[activeLineIndex] = currentLine.text;
          return newLines;
        });
        setCompletedLines(prev => {
          const newCompleted = [...prev];
          newCompleted[activeLineIndex] = true;
          return newCompleted;
        });
        setTimeout(() => {
          setActiveLineIndex(prev => prev + 1);
        }, 50);
      } else {
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
          if (currentIndex <= currentLine.text.length) {
            setDisplayedLines(prev => {
              const newLines = [...prev];
              newLines[activeLineIndex] = currentLine.text.slice(0, currentIndex);
              return newLines;
            });
            currentIndex++;
          } else {
            clearInterval(typingInterval);
            setCompletedLines(prev => {
              const newCompleted = [...prev];
              newCompleted[activeLineIndex] = true;
              return newCompleted;
            });
            setTimeout(() => {
              setActiveLineIndex(prev => prev + 1);
            }, 50);
          }
        }, currentLine.velocity || 100);
        return () => clearInterval(typingInterval);
      }
    }, currentLine.delay);

    return () => clearTimeout(startTimeout);
  }, [activeLineIndex, lines, onComplete]);

  // Blink cursors
  useEffect(() => {
    const cursorIntervals = lines.map((_, index) => {
      return setInterval(() => {
        setShowCursors(prev => {
          const newCursors = [...prev];
          // Only blink if line is not completed
          if (!completedLines[index]) {
            newCursors[index] = !newCursors[index];
          } else {
            newCursors[index] = false;
          }
          return newCursors;
        });
      }, 500);
    });

    return () => cursorIntervals.forEach(interval => clearInterval(interval));
  }, [completedLines, lines]);

  return (
    <div className="flex flex-col">
      {lines.map((line, index) => (
        <TypingLine
          key={index}
          text={displayedLines[index]}
          isActive={index === activeLineIndex}
          isCompleted={completedLines[index]}
          showCursor={showCursors[index]}
          className={line.className}
          isPreformatted={line.isPreformatted}
          link={line.link}
        />
      ))}
    </div>
  );
};

export default TypingText;
