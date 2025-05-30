
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useVoucherValidation } from './useVoucherValidation';
import { useVoucherChecker } from './useVoucherChecker';
import { useTestAccess } from './useTestAccess';
import { useVoucherActivator } from './useVoucherActivator';
import { useVoucherUsageValidator } from './useVoucherUsageValidator';

interface UseVoucherActivationProps {
  testId: string;
  onSuccess: (voucherId: string) => void;
}

export const useVoucherActivation = ({ testId, onSuccess }: UseVoucherActivationProps) => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [isChecking, setIsChecking] = useState(false);

  console.log('=== useVoucherActivation DEBUG ===');
  console.log('Hook initialized with:', { testId, userId: user?.id });

  const validation = useVoucherValidation();
  const checker = useVoucherChecker();
  const testAccess = useTestAccess();
  const activator = useVoucherActivator();
  const usageValidator = useVoucherUsageValidator();

  const resetState = () => {
    console.log('useVoucherActivation: Resetting state');
    validation.resetValidation();
    setIsChecking(false);
  };

  const activateVoucher = async () => {
    console.log('=== VOUCHER ACTIVATION START ===');
    console.log('Voucher code to activate:', validation.voucherCode);

    if (!validation.validateVoucherCode(validation.voucherCode)) {
      console.log('Voucher code validation failed');
      return;
    }

    if (!user?.id) {
      console.log('User not authenticated');
      validation.setValidationError(language === 'ru' ? 'Пользователь не авторизован' : 'Пайдаланушы авторизацияланбаған');
      return;
    }

    setIsChecking(true);
    validation.setIsValid(null);

    try {
      console.log('=== VOUCHER ACTIVATION DEBUG ===');
      console.log('Activating voucher:', validation.voucherCode, 'for user:', user.id, 'test:', testId);

      // Find voucher by code
      console.log('Step 1: Finding voucher by code...');
      const voucher = await checker.findVoucherByCode(validation.voucherCode);
      console.log('Found voucher:', voucher);
      
      // Check usage limits (always check, regardless of previous activations)
      console.log('Step 2: Checking usage limits...');
      await usageValidator.checkUsageLimit(voucher);
      
      // Check voucher dates
      console.log('Step 3: Checking voucher dates...');
      checker.checkVoucherDates(voucher);
      
      // Validate test access
      console.log('Step 4: Validating test access...');
      await testAccess.validateTestAccess(voucher, testId);

      // Activate voucher (create new activation record and update usage count)
      console.log('Step 5: Activating voucher (creating new activation)...');
      await activator.activateVoucher(user.id, voucher, null); // Always pass null - no existing activation check

      validation.setValidationSuccess();
      console.log('=== VOUCHER ACTIVATION SUCCESS ===');
      
      setTimeout(() => {
        console.log('Calling onSuccess callback with voucherId:', voucher.id);
        onSuccess(voucher.id);
      }, 1000);
      
    } catch (error) {
      console.error('Error activating voucher:', error);
      const errorMessage = error instanceof Error ? error.message : 
        (language === 'ru' ? 'Ошибка при активации ваучера' : 'Ваучерді белсендіру кезінде қате');
      validation.setValidationError(errorMessage);
    } finally {
      setIsChecking(false);
    }
  };

  console.log('useVoucherActivation state:', {
    voucherCode: validation.voucherCode,
    isChecking,
    isValid: validation.isValid,
    errorMessage: validation.errorMessage
  });

  return {
    voucherCode: validation.voucherCode,
    setVoucherCode: validation.setVoucherCode,
    isChecking,
    isValid: validation.isValid,
    errorMessage: validation.errorMessage,
    resetState,
    activateVoucher
  };
};
