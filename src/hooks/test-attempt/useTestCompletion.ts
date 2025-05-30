
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { TestResultType } from '@/hooks/useTestResult';
import { useVoucherTestSession } from './useVoucherTestSession';

interface UseTestCompletionProps {
  testId: string | undefined;
  language: 'ru' | 'kz';
  calculateTestResult: () => TestResultType;
}

/**
 * Хук для управления процессом завершения теста
 */
export const useTestCompletion = ({
  testId,
  language,
  calculateTestResult,
}: UseTestCompletionProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { hasVoucherSession } = useVoucherTestSession(testId);
  
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [testResult, setTestResult] = useState<TestResultType>({ 
    score: 0, 
    totalQuestions: 0, 
    isPassed: false 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle test completion
  const handleCompleteTest = () => {
    setShowConfirmDialog(true);
  };

  const confirmCompleteTest = async () => {
    setShowConfirmDialog(false);
    setIsSubmitting(true);
    
    try {
      // Calculate test result
      const result = calculateTestResult();
      setTestResult(result);
      
      // Save test attempt to database
      if (user?.id && testId) {
        console.log('Saving test attempt:', {
          userId: user.id,
          testId,
          score: result.score,
          totalQuestions: result.totalQuestions,
          passed: result.isPassed
        });

        const { error: attemptError } = await supabase
          .from('test_attempts')
          .insert({
            user_id: user.id,
            test_id: testId,
            score: result.score,
            passed: result.isPassed,
            end_time: new Date().toISOString()
          });

        if (attemptError) {
          console.error('Error saving test attempt:', attemptError);
          throw attemptError;
        }

        console.log('Test attempt saved successfully');
      }
      
      setIsSubmitting(false);
      // Show result dialog
      setShowResultDialog(true);
      
    } catch (error) {
      console.error('Error completing test:', error);
      setIsSubmitting(false);
      toast.error(
        language === 'ru' 
          ? 'Ошибка при сохранении результатов теста' 
          : 'Тест нәтижелерін сақтау кезінде қате'
      );
    }
  };

  const finishTest = () => {
    setShowResultDialog(false);
    
    // Show appropriate toast message based on test result
    if (testResult.isPassed) {
      toast.success(
        language === 'ru' 
          ? 'Тест успешно завершен. Вы прошли тест!' 
          : 'Тест сәтті аяқталды. Сіз тестті өттіңіз!'
      );
    } else {
      toast.error(
        language === 'ru' 
          ? 'Тест завершен. К сожалению, вы не набрали проходной балл.' 
          : 'Тест аяқталды. Өкінішке орай, сіз өту балын жинамадыңыз.'
      );
    }
    
    // ВСЕГДА переходим в личный кабинет независимо от результата и способа доступа
    navigate('/dashboard');
  };

  return {
    showConfirmDialog,
    setShowConfirmDialog,
    showResultDialog,
    setShowResultDialog,
    testResult,
    isSubmitting,
    handleCompleteTest,
    confirmCompleteTest,
    finishTest,
  };
};
