export interface Question {
  questionId: string;
  question: string;
  questionType: string;
  answerType: string;
  options: string[];
  correctAnswer: string[];
}

export interface GameState {
  currentQuestionIndex: number;
  answers: Record<string, string[]>;
  timeRemaining: number;
  isComplete: boolean;
  score: number;
}

export interface QuestionData {
  status: string;
  data: {
    testId: string;
    questions: Question[];
  };
  message: string;
}