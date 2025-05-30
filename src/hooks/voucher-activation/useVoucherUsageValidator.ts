
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { Voucher } from '@/types/database';

export const useVoucherUsageValidator = () => {
  const { language } = useLanguage();

  const checkUsageLimit = async (voucher: Voucher) => {
    console.log('=== CHECKING VOUCHER USAGE LIMIT ===');
    console.log('Voucher details:', {
      id: voucher.id,
      code: voucher.code,
      currentUsedCount: voucher.used_count,
      usageLimit: voucher.usage_limit
    });

    const currentUsedCount = voucher.used_count || 0;
    const usageLimit = voucher.usage_limit || 1;
    
    console.log('Usage comparison:', {
      currentUsedCount,
      usageLimit,
      isLimitReached: currentUsedCount >= usageLimit
    });
    
    // Проверяем, не превышен ли лимит активаций
    if (currentUsedCount >= usageLimit) {
      const errorMsg = language === 'ru' ? 'Ваучер достиг лимита использований' : 'Ваучер қолдану шегіне жетті';
      console.error('❌ Usage limit reached:', errorMsg);
      throw new Error(errorMsg);
    }
    
    console.log('✅ Usage limit check passed');
    return currentUsedCount;
  };

  // Убираем проверку попыток тестов - теперь это не нужно
  const checkTestAttempts = async (userId: string, voucherId: string, testId: string) => {
    console.log('=== CHECKING TEST ATTEMPTS ===');
    console.log('Parameters:', { userId, voucherId, testId });
    console.log('ℹ️ Test attempts check skipped - each voucher use is independent');
    return true;
  };

  return { 
    checkUsageLimit,
    checkTestAttempts
  };
};
