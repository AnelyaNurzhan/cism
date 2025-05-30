
import { useVoucherLookup } from './voucher-validation/useVoucherLookup';
import { useVoucherDateValidator } from './voucher-validation/useVoucherDateValidator';

export const useVoucherChecker = () => {
  const { findVoucherByCode } = useVoucherLookup();
  const { checkVoucherDates } = useVoucherDateValidator();

  // Убираем проверку существующей активации
  const checkExistingActivation = async (userId: string, voucherId: string) => {
    console.log('=== CHECKING EXISTING ACTIVATION ===');
    console.log('ℹ️ Skipping existing activation check - each use is independent');
    return null; // Всегда возвращаем null (нет существующей активации)
  };

  return {
    findVoucherByCode,
    checkExistingActivation,
    checkVoucherDates
  };
};
