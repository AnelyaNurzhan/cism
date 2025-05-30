
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { useTestAccess } from '@/hooks/useTestAccess';
import { useTestResult } from '@/hooks/useTestResult';
import { useTestSession } from './useTestSession';
import { useUserAnswers } from './useUserAnswers';
import { useQuestionNavigation } from './useQuestionNavigation';
import { useTestCompletion } from './useTestCompletion';

/**
 * Основной хук для управления попытками тестирования
 */
export const useTestAttempt = (testId: string | undefined, language: 'ru' | 'kz') => {
  const navigate = useNavigate();
  const location = useLocation();
  const { hasAccess, isCheckingAccess } = useTestAccess(testId);
  
  // Проверяем данные о ваучере из состояния навигации
  const voucherData = location.state as { 
    voucherId?: string;
    fromVoucherActivation?: boolean;
  } | null;

  console.log('=== TEST ATTEMPT ACCESS DEBUG ===');
  console.log('Voucher data from location:', voucherData);
  console.log('Has access from useTestAccess:', hasAccess);
  console.log('Is checking access:', isCheckingAccess);

  // Fetch test and questions
  const { test, questions, isLoading: sessionLoading } = useTestSession(testId);
  
  // Handle user answers
  const { userAnswers, handleAnswerSelect } = useUserAnswers(questions);
  
  // Handle question navigation
  const {
    currentQuestionIndex,
    currentQuestion,
    handleNextQuestion,
    handlePrevQuestion,
    handleTabChange,
  } = useQuestionNavigation(questions);
  
  // Handle test result calculation
  const { calculateTestResult } = useTestResult(questions, test, userAnswers);
  
  // Handle test completion
  const {
    showConfirmDialog,
    setShowConfirmDialog,
    showResultDialog,
    setShowResultDialog,
    testResult,
    isSubmitting,
    handleCompleteTest,
    confirmCompleteTest,
    finishTest,
  } = useTestCompletion({
    testId,
    language,
    calculateTestResult,
  });

  // Проверяем доступ к тесту
  useEffect(() => {
    // Если проверка доступа еще идет, ждем
    if (isCheckingAccess) return;

    // Проверяем, есть ли доступ через роль админа или активированный ваучер
    const hasVoucherAccess = voucherData?.fromVoucherActivation && voucherData?.voucherId;
    const finalHasAccess = hasAccess || hasVoucherAccess;

    console.log('Final access check:', {
      hasAccess,
      hasVoucherAccess,
      finalHasAccess,
      voucherData
    });

    // Если доступа нет, перенаправляем на страницу теста
    if (!finalHasAccess) {
      console.log('No access to test, redirecting...');
      toast.error(
        language === 'ru' 
          ? 'У вас нет доступа к этому тесту. Необходимо активировать ваучер.' 
          : 'Сізде бұл тестке рұқсат жоқ. Ваучерді белсендіру қажет.'
      );
      navigate(`/test/${testId}`);
    }
  }, [hasAccess, isCheckingAccess, voucherData, testId, navigate, language]);

  // Combine loading states
  const isLoading = sessionLoading || isCheckingAccess;

  return {
    test,
    questions,
    isLoading,
    isSubmitting,
    currentQuestion,
    currentQuestionIndex,
    userAnswers,
    showConfirmDialog,
    showResultDialog,
    testResult,
    handleNextQuestion,
    handlePrevQuestion,
    handleAnswerSelect,
    handleTabChange,
    handleCompleteTest,
    confirmCompleteTest,
    finishTest,
    setShowConfirmDialog,
    setShowResultDialog
  };
};
