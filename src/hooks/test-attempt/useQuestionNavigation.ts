
import { useState } from 'react';
import { QuestionFromDB } from '@/hooks/useTestResult';

/**
 * Хук для навигации между вопросами теста
 */
export const useQuestionNavigation = (questions: QuestionFromDB[] | null) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Handle moving to next question
  const handleNextQuestion = () => {
    if (questions && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Handle moving to previous question
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Handle tab selection
  const handleTabChange = (index: string) => {
    setCurrentQuestionIndex(parseInt(index));
  };

  const currentQuestion = questions && questions.length > 0 ? questions[currentQuestionIndex] : null;

  return {
    currentQuestionIndex,
    currentQuestion,
    handleNextQuestion,
    handlePrevQuestion,
    handleTabChange,
  };
};
