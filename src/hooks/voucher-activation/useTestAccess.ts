
import { useLanguage } from '@/contexts/LanguageContext';
import { Voucher } from '@/types/database';
import { useDirectTestAccess } from './test-access/useDirectTestAccess';
import { useSpecializationTestAccess } from './test-access/useSpecializationTestAccess';

export const useTestAccess = () => {
  const { language } = useLanguage();
  const { checkDirectTestAccess } = useDirectTestAccess();
  const { checkSpecializationAccess } = useSpecializationTestAccess();

  const validateTestAccess = async (voucher: Voucher, testId: string) => {
    let hasTestAccess = false;

    // Check direct test access first
    hasTestAccess = await checkDirectTestAccess(voucher, testId);

    // If no direct access, check via specializations
    if (!hasTestAccess) {
      hasTestAccess = await checkSpecializationAccess(voucher, testId);
    }

    if (!hasTestAccess) {
      console.log('No access found for this test');
      throw new Error(language === 'ru' ? 'Этот ваучер нельзя использовать для данного теста' : 'Бұл ваучерді осы тест үшін пайдалануға болмайды');
    }

    return hasTestAccess;
  };

  return {
    validateTestAccess
  };
};
