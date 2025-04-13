import { useEffect, useState } from 'react';
import { QuestionCard } from '@/components/QuestionCard';
import { FeedbackScreen } from '@/components/FeedbackScreen';
import { GameState, Question, QuestionData } from '@/types';
import questionsData from './questions.json';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentQuestionIndex: 0,
    answers: {},
    timeRemaining: 30,
    isComplete: false,
    score: 0,
  });

  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    // In a real application, this would be fetched from an API
    const data = questionsData as QuestionData;
    setQuestions(data.data.questions);
  }, []);

  useEffect(() => {
    if (gameState.isComplete || questions.length === 0) return;

    const timer = setInterval(() => {
      setGameState((prev) => ({
        ...prev,
        timeRemaining: prev.timeRemaining > 0 ? prev.timeRemaining - 1 : 0,
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.isComplete, questions]);

  const handleAnswer = (answers: string[]) => {
    const currentQuestion = questions[gameState.currentQuestionIndex];
    const isCorrect = currentQuestion.correctAnswer.every(
      (answer, index) => answer === answers[index]
    );

    setGameState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [currentQuestion.questionId]: answers,
      },
      score: isCorrect ? prev.score + 1 : prev.score,
    }));

    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (gameState.currentQuestionIndex === questions.length - 1) {
      setGameState((prev) => ({
        ...prev,
        isComplete: true,
      }));
    } else {
      setGameState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        timeRemaining: 30,
      }));
    }
  };

  const handleRestart = () => {
    setGameState({
      currentQuestionIndex: 0,
      answers: {},
      timeRemaining: 30,
      isComplete: false,
      score: 0,
    });
  };

  if (questions.length === 0) {
    return <div className="text-blue-600 dark:text-blue-400">Loading...</div>;
  }

  if (gameState.isComplete) {
    return (
      <FeedbackScreen
        questions={questions}
        answers={gameState.answers}
        score={gameState.score}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-blue-950 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2 text-blue-900 dark:text-blue-100">
            Sentence Construction
          </h1>
          <p className="text-blue-600 dark:text-blue-400">
            Question {gameState.currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>

        <QuestionCard
          question={questions[gameState.currentQuestionIndex]}
          onAnswer={handleAnswer}
          timeRemaining={gameState.timeRemaining}
          onTimeUp={handleNextQuestion}
        />
      </div>
    </div>
  );
}

export default App;