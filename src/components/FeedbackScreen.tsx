import { Card } from '@/components/ui/card';
import { Question } from '@/types';

interface FeedbackScreenProps {
  questions: Question[];
  answers: Record<string, string[]>;
  score: number;
  onRestart: () => void;
}

export function FeedbackScreen({ questions, answers, score, onRestart }: FeedbackScreenProps) {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="p-6 bg-blue-50 dark:bg-blue-900/20">
        <h2 className="text-2xl font-bold mb-4 text-blue-900 dark:text-blue-100">Your Results</h2>
        <div className="text-xl mb-6 text-blue-800 dark:text-blue-200">
          Score: <span className="font-bold">{score}</span> out of 10
        </div>

        <div className="space-y-6">
          {questions.map((question, index) => {
            const userAnswers = answers[question.questionId] || [];
            const isCorrect = question.correctAnswer.every(
              (answer, i) => answer === userAnswers[i]
            );

            return (
              <div
                key={question.questionId}
                className={`p-4 rounded-lg ${
                  isCorrect 
                    ? 'bg-blue-100 dark:bg-blue-800/50' 
                    : 'bg-red-50 dark:bg-red-900/20'
                }`}
              >
                <h3 className="font-medium mb-2 text-blue-900 dark:text-blue-100">
                  Question {index + 1}
                </h3>
                <p className="mb-4 text-blue-800 dark:text-blue-200">{question.question}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2 text-blue-900 dark:text-blue-100">
                      Your Answer:
                    </h4>
                    <ul className="list-disc list-inside text-blue-800 dark:text-blue-200">
                      {userAnswers.map((answer, i) => (
                        <li key={i}>{answer}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {!isCorrect && (
                    <div>
                      <h4 className="font-medium mb-2 text-blue-900 dark:text-blue-100">
                        Correct Answer:
                      </h4>
                      <ul className="list-disc list-inside text-blue-800 dark:text-blue-200">
                        {question.correctAnswer.map((answer, i) => (
                          <li key={i}>{answer}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onRestart}
          className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Start New Game
        </button>
      </Card>
    </div>
  );
}