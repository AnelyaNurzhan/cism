
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { Voucher } from '@/types/database';

export const useVoucherUsageValidator = () => {
  const { language } = useLanguage();

  const checkUsageLimit = async (voucher: Voucher) => {
    const { data: activationCount, error: countError } = await supabase
      .from('user_voucher_activations')
      .select('id', { count: 'exact' })
      .eq('voucher_id', voucher.id);
      
    if (countError) {
      console.error('Error checking activation count:', countError);
      throw countError;
    }
    
    const currentActivations = activationCount?.length || 0;
    console.log('Current activations:', currentActivations, 'Usage limit:', voucher.usage_limit);
    
    if (voucher.usage_limit && currentActivations >= voucher.usage_limit) {
      throw new Error(language === 'ru' ? 'Ваучер достиг лимита использований' : 'Ваучер қолдану шегіне жетті');
    }
    
    return currentActivations;
  };

  return { checkUsageLimit };
};
