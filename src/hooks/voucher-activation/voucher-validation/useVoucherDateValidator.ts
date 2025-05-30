
import { useLanguage } from '@/contexts/LanguageContext';
import { Voucher } from '@/types/database';

export const useVoucherDateValidator = () => {
  const { language } = useLanguage();

  const checkVoucherDates = (voucher: Voucher) => {
    const now = new Date();
    
    if (voucher.expiry_date && new Date(voucher.expiry_date) < now) {
      throw new Error(language === 'ru' ? 'Срок действия ваучера истек' : 'Ваучердің мерзімі аяқталды');
    }

    if (voucher.start_date && new Date(voucher.start_date) > now) {
      throw new Error(language === 'ru' ? 'Ваучер еще не активен' : 'Ваучер әлі белсенді емес');
    }
  };

  return { checkVoucherDates };
};
