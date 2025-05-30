
import { toast } from 'sonner';
import { UseVoucherFormState } from './types';

export const validateVoucherForm = (formState: UseVoucherFormState): boolean => {
  const { title, selectedTestIds, selectedSpecializations, language } = formState;
  
  if (!title.trim()) {
    toast.error(language === 'ru' 
      ? 'Введите название ваучера' 
      : 'Ваучер атауын енгізіңіз');
    return false;
  }
  
  if (selectedTestIds.length === 0 && selectedSpecializations.length === 0) {
    toast.error(language === 'ru' 
      ? 'Выберите хотя бы один тест или специализацию с уровнем' 
      : 'Кем дегенде бір тест немесе мамандық пен деңгейді таңдаңыз');
    return false;
  }
  
  return true;
};
