
import { useCallback } from 'react';
import { Test } from '@/types/database';

// Define the question type that matches the database schema
export interface QuestionFromDB {
  id: string;
  question_text_ru: string;
  question_text_kz: string;
  question_type: string;
  answers: Array<{
    id: string;
    answer_text_ru: string;
    answer_text_kz: string;
    is_correct: boolean;
  }>;
  order_number?: number;
}

export interface TestResultType {
  score: number;
  totalQuestions: number;
  isPassed: boolean;
}

export const useTestResult = (questions: QuestionFromDB[] | null, test: Test | null, userAnswers: Record<string, string[]>) => {
  const calculateTestResult = useCallback((): TestResultType => {
    if (!questions || !test) return { score: 0, totalQuestions: 0, isPassed: false };

    let correctAnswers = 0;
    const totalQuestions = questions.length;

    questions.forEach(question => {
      const userSelectedAnswers = userAnswers[question.id] || [];
      
      // Get correct answer IDs for this question
      const correctAnswerIds = question.answers
        .filter(answer => answer.is_correct)
        .map(answer => answer.id);

      // For single choice questions, check if the selected answer is correct
      if (question.question_type === 'single') {
        if (
          userSelectedAnswers.length === 1 &&
          correctAnswerIds.includes(userSelectedAnswers[0])
        ) {
          correctAnswers++;
        }
      } 
      // For multiple choice questions, all correct answers must be selected and no incorrect ones
      else if (question.question_type === 'multiple') {
        const allCorrectSelected = correctAnswerIds.every(id => 
          userSelectedAnswers.includes(id)
        );
        
        const noIncorrectSelected = userSelectedAnswers.every(id => 
          correctAnswerIds.includes(id)
        );
        
        if (allCorrectSelected && noIncorrectSelected) {
          correctAnswers++;
        }
      }
    });

    const scorePercentage = (correctAnswers / totalQuestions) * 100;
    const passingThreshold = test.passing_score || 70; // Default to 70% if not specified
    
    return {
      score: correctAnswers,
      totalQuestions,
      isPassed: scorePercentage >= passingThreshold
    };
  }, [questions, test, userAnswers]);

  return { calculateTestResult };
};
