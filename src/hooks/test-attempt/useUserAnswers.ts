
import { useState, useEffect } from 'react';
import { QuestionFromDB } from '@/hooks/useTestResult';

/**
 * Хук для управления ответами пользователя в тесте
 */
export const useUserAnswers = (questions: QuestionFromDB[] | null) => {
  const [userAnswers, setUserAnswers] = useState<Record<string, string[]>>({});
  
  // Initialize userAnswers object when questions are loaded
  useEffect(() => {
    if (questions && questions.length > 0) {
      const initialAnswers: Record<string, string[]> = {};
      questions.forEach(question => {
        initialAnswers[question.id] = [];
      });
      setUserAnswers(initialAnswers);
    }
  }, [questions]);

  // Handle answer selection
  const handleAnswerSelect = (questionId: string, answerId: string, isSingle: boolean) => {
    setUserAnswers(prev => {
      const updatedAnswers = { ...prev };
      
      if (isSingle) {
        // For single-choice questions, replace the answer
        updatedAnswers[questionId] = [answerId];
      } else {
        // For multiple-choice questions, toggle the answer
        if (updatedAnswers[questionId].includes(answerId)) {
          updatedAnswers[questionId] = updatedAnswers[questionId].filter(id => id !== answerId);
        } else {
          updatedAnswers[questionId] = [...updatedAnswers[questionId], answerId];
        }
      }
      
      return updatedAnswers;
    });
  };

  return {
    userAnswers,
    handleAnswerSelect,
  };
};
