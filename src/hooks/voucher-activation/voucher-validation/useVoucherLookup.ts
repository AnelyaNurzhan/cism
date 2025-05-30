
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { Voucher } from '@/types/database';

export const useVoucherLookup = () => {
  const { language } = useLanguage();

  const findVoucherByCode = async (code: string) => {
    console.log('Searching for voucher with code:', code.toUpperCase().trim());
    const { data: voucherData, error: voucherError } = await supabase
      .from('vouchers')
      .select('*')
      .eq('code', code.toUpperCase().trim())
      .single();
      
    if (voucherError) {
      console.log('Voucher search error:', voucherError);
      throw new Error(language === 'ru' ? 'Неверный код ваучера' : 'Жарамсыз ваучер коды');
    }

    if (!voucherData) {
      console.log('No voucher found with code:', code);
      throw new Error(language === 'ru' ? 'Неверный код ваучера' : 'Жарамсыз ваучер коды');
    }

    return voucherData as Voucher;
  };

  return { findVoucherByCode };
};
