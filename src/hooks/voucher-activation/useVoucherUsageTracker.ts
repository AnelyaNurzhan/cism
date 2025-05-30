
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

export const useVoucherUsageTracker = () => {
  const { language } = useLanguage();

  const checkVoucherAttempts = async (userId: string, voucherId: string, testId: string) => {
    // Проверяем сколько попыток уже использовано для этого ваучера и теста
    const { data: attempts, error: attemptsError } = await supabase
      .from('voucher_attempts')
      .select('id')
      .eq('user_id', userId)
      .eq('voucher_id', voucherId)
      .eq('test_id', testId);

    if (attemptsError) {
      console.error('Error checking voucher attempts:', attemptsError);
      throw attemptsError;
    }

    // Получаем информацию о ваучере
    const { data: voucher, error: voucherError } = await supabase
      .from('vouchers')
      .select('attempts_per_voucher, usage_limit')
      .eq('id', voucherId)
      .single();

    if (voucherError) {
      console.error('Error fetching voucher:', voucherError);
      throw voucherError;
    }

    const usedAttempts = attempts?.length || 0;
    const allowedAttempts = voucher.attempts_per_voucher || 1;

    if (usedAttempts >= allowedAttempts) {
      throw new Error(language === 'ru' 
        ? 'У этого ваучера закончились попытки для данного теста' 
        : 'Бұл ваучердің осы тест үшін әрекеттері аяқталды');
    }

    return {
      usedAttempts,
      allowedAttempts,
      remainingAttempts: allowedAttempts - usedAttempts
    };
  };

  const recordVoucherAttempt = async (userId: string, voucherId: string, testId: string, testAttemptId?: string) => {
    console.log('Recording voucher attempt:', {
      userId,
      voucherId, 
      testId,
      testAttemptId
    });

    const { error } = await supabase
      .from('voucher_attempts')
      .insert({
        user_id: userId,
        voucher_id: voucherId,
        test_id: testId,
        test_attempt_id: testAttemptId
      });

    if (error) {
      console.error('Error recording voucher attempt:', error);
      throw error;
    }

    console.log('Voucher attempt recorded successfully');
  };

  return {
    checkVoucherAttempts,
    recordVoucherAttempt
  };
};
