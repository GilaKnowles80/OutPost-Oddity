'use client';

import React, { useEffect, useState, useRef } from 'react';

interface DialogueLine {
  speaker: string;
  text: string;
  avatar?: string;
  choices?: { text: string; nextDialogueIndex: number }[];
}

interface DialogueBoxProps {
  dialogue: DialogueLine[];
  onChoice?: (choiceIndex: number) => void;
  onComplete?: () => void;
  className?: string;
}

export function DialogueBox({ dialogue, onChoice, onComplete, className }: DialogueBoxProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showChoices, setShowChoices] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new text appears
  useEffect(() => {
    if (textRef.current) {
      textRef.current.scrollTop = textRef.current.scrollHeight;
    }
  }, [currentIndex]);

  const currentLine = dialogue[currentIndex];
  const isLastLine = currentIndex >= dialogue.length - 1;
  const hasChoices = currentLine.choices && currentLine.choices.length > 0;

  const handleNext = () => {
    if (hasChoices) {
      setShowChoices(true);
      return;
    }
    if (isLastLine) {
      setShowChoices(false);
      onComplete?.();
    } else {
      setShowChoices(false);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleChoice = (choiceIndex: number) => {
    if (!currentLine.choices) return;
    const choice = currentLine.choices[choiceIndex];
    setShowChoices(false);
    setCurrentIndex(choice.nextDialogueIndex);
    onChoice?.(choiceIndex);
  };

  if (!currentLine) return null;

  return (
    <div className={`fixed bottom-6 left-6 right-6 max-w-lg z-50 ${className}`}>
      <div className="bg-slate-900 border-2 border-purple-500 rounded-lg shadow-2xl overflow-hidden backdrop-blur-sm">
        {/* Header with speaker */}
        <div className="bg-purple-600 px-4 py-2 flex items-center gap-3 border-b border-purple-400">
          <div className="w-10 h-10 rounded-full bg-purple-400 flex items-center justify-center font-bold text-slate-900 border-2 border-purple-300 shadow-lg">
            {currentLine.speaker.charAt(0).toUpperCase()}
          </div>
          <span className="font-bold text-slate-100 text-lg tracking-wide uppercase">
            {currentLine.speaker}
          </span>
        </div>

        {/* Dialogue text area */}
        <div className="p-6 min-h-[120px] max-h-[200px] overflow-y-auto text-slate-200 text-lg leading-relaxed font-medium italic">
          <div ref={textRef}>
            {currentLine.text}
          </div>
        </div>

        {/* Choices */}
        {showChoices && hasChoices && currentLine.choices && (
          <div className="p-4 bg-slate-800 border-t border-purple-500">
            {currentLine.choices.map((choice, idx) => (
              <button
                key={idx}
                onClick={() => handleChoice(idx)}
                className="w-full px-4 py-3 mb-2 bg-purple-700 hover:bg-purple-600 border border-purple-500 rounded-lg text-slate-100 font-semibold text-left transition-all active:scale-95"
              >
                {choice.text}
              </button>
            ))}
          </div>
        )}

        {/* Continue button */}
        {!showChoices && (
          <div className="p-4 bg-slate-800 border-t border-purple-500 flex justify-end">
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-slate-100 font-bold rounded-lg transition-all shadow-lg active:scale-95 flex items-center gap-2"
            >
              {isLastLine ? 'Continue Adventure' : 'Next'}
              <span>▶</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
