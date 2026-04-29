"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import TypingLine from "@/components/terminal/typing-line";

export interface TypingTextLine {
  text: string;
  delay: number;
  className?: string;
  isPreformatted?: boolean;
  velocity?: number;
  link?: string;
}

interface TypingTextProps {
  lines: TypingTextLine[];
  onComplete?: () => void;
}

const TypingText = ({ lines, onComplete }: TypingTextProps) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>(() =>
    lines.map(() => ""),
  );
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState<boolean[]>(() =>
    lines.map(() => false),
  );
  const [cursorVisible, setCursorVisible] = useState(true);

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Single blinking cursor for the active line
  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  const advanceLine = useCallback((index: number) => {
    setCompletedLines((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
    setTimeout(() => setActiveLineIndex(index + 1), 80);
  }, []);

  useEffect(() => {
    if (activeLineIndex >= lines.length) {
      if (onCompleteRef.current) {
        setTimeout(() => onCompleteRef.current?.(), 400);
      }
      return;
    }

    const line = lines[activeLineIndex];

    const startId = setTimeout(() => {
      if (line.isPreformatted) {
        setDisplayedLines((prev) => {
          const next = [...prev];
          next[activeLineIndex] = line.text;
          return next;
        });
        advanceLine(activeLineIndex);
        return;
      }

      const charInterval = line.velocity ?? 40;
      let charIndex = 0;

      const typingId = setInterval(() => {
        charIndex++;
        setDisplayedLines((prev) => {
          const next = [...prev];
          next[activeLineIndex] = line.text.slice(0, charIndex);
          return next;
        });

        if (charIndex >= line.text.length) {
          clearInterval(typingId);
          advanceLine(activeLineIndex);
        }
      }, charInterval);

      return () => clearInterval(typingId);
    }, line.delay);

    return () => clearTimeout(startId);
  }, [activeLineIndex, lines, advanceLine]);

  return (
    <div className="flex flex-col">
      {lines.map((line, index) => (
        <TypingLine
          key={index}
          text={displayedLines[index]}
          isActive={index === activeLineIndex}
          isCompleted={completedLines[index]}
          showCursor={cursorVisible}
          className={line.className}
          isPreformatted={line.isPreformatted}
          link={line.link}
        />
      ))}
    </div>
  );
};

export default TypingText;
