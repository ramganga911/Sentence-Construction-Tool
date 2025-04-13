import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Timer } from './Timer';
import { Question } from '@/types';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answers: string[]) => void;
  timeRemaining: number;
  onTimeUp: () => void;
}

export function QuestionCard({ question, onAnswer, timeRemaining, onTimeUp }: QuestionCardProps) {
  const parts = question.question.split('_____________');
  const blankCount = parts.length - 1;
  
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswers(new Array(blankCount).fill(''));
    setSelectedOptions(new Set());
  }, [question.questionId, blankCount]);

  const handleOptionClick = (option: string) => {
    if (selectedOptions.has(option)) return;

    const index = selectedAnswers.findIndex(answer => answer === '');
    if (index !== -1) {
      const newAnswers = [...selectedAnswers];
      newAnswers[index] = option;
      setSelectedAnswers(newAnswers);
      setSelectedOptions(new Set([...selectedOptions, option]));

      if (!newAnswers.includes('')) {
        onAnswer(newAnswers);
      }
    }
  };

  const handleAnswerClick = (index: number) => {
    const option = selectedAnswers[index];
    if (option) {
      const newAnswers = [...selectedAnswers];
      newAnswers[index] = '';
      setSelectedAnswers(newAnswers);
      setSelectedOptions(new Set([...selectedOptions].filter(o => o !== option)));
    }
  };

  return (
    <Card className="p-6 max-w-3xl mx-auto bg-blue-50 dark:bg-blue-900/20">
      <Timer timeRemaining={timeRemaining} onTimeUp={onTimeUp} />
      
      <div className="mt-6 space-y-6">
        <div className="text-lg leading-relaxed">
          {parts.map((part, index) => (
            <span key={index}>
              {part}
              {index < parts.length - 1 && (
                <button
                  onClick={() => handleAnswerClick(index)}
                  className={`mx-2 min-w-[120px] px-4 py-1 rounded ${
                    selectedAnswers[index]
                      ? 'bg-blue-600 text-white dark:bg-blue-500'
                      : 'border-2 border-dashed border-blue-300 dark:border-blue-500'
                  }`}
                >
                  {selectedAnswers[index] || '______'}
                </button>
              )}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          {question.options.map((option) => (
            <Button
              key={option}
              onClick={() => handleOptionClick(option)}
              disabled={selectedOptions.has(option)}
              variant={selectedOptions.has(option) ? "secondary" : "outline"}
              className={`text-lg ${
                selectedOptions.has(option)
                  ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100'
                  : 'hover:bg-blue-50 hover:text-blue-900 dark:hover:bg-blue-900/50'
              }`}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
}