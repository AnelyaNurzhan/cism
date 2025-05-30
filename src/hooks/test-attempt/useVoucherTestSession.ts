
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Упрощенный хук для управления сессией теста с ваучером
 * Только отслеживает наличие ваучера, без дополнительных активаций
 */
export const useVoucherTestSession = (testId: string | undefined) => {
  const { user } = useAuth();
  const location = useLocation();
  const [sessionData, setSessionData] = useState<{
    voucherId?: string;
  }>({});

  useEffect(() => {
    // Извлекаем данные о ваучере из состояния навигации
    const state = location.state as { 
      voucherId?: string;
      fromVoucherActivation?: boolean;
    } | null;

    console.log('=== VOUCHER TEST SESSION DEBUG ===');
    console.log('Location state:', state);

    if (state?.voucherId && state?.fromVoucherActivation) {
      console.log('Valid voucher session found:', state.voucherId);
      setSessionData({
        voucherId: state.voucherId
      });
    } else {
      console.log('No valid voucher session found');
      setSessionData({});
    }
  }, [location.state]);

  // Больше не нужно начинать сессию - ваучер уже активирован
  const startTestSession = async () => {
    console.log('Test session start - voucher already activated, no additional actions needed');
    // Никаких дополнительных действий не требуется
  };

  // Больше не нужно обновлять записи попыток
  const updateTestAttemptId = async (testAttemptId: string) => {
    console.log('Test attempt ID update - no voucher linking needed in simplified logic');
    // В упрощенной логике не связываем попытки тестов с ваучерами
  };

  console.log('=== VOUCHER TEST SESSION RESULT ===');
  console.log('Session data:', sessionData);
  console.log('Has voucher session:', !!sessionData.voucherId);

  return {
    voucherId: sessionData.voucherId,
    hasVoucherSession: !!sessionData.voucherId,
    startTestSession,
    updateTestAttemptId
  };
};
