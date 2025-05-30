
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export const useVoucherValidation = () => {
  const { language } = useLanguage();
  const [voucherCode, setVoucherCode] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const validateVoucherCode = (code: string) => {
    if (!code.trim()) {
      setErrorMessage(language === 'ru' ? 'Введите код ваучера' : 'Ваучер кодын енгізіңіз');
      return false;
    }
    return true;
  };

  const setValidationError = (message: string) => {
    setIsValid(false);
    setErrorMessage(message);
  };

  const setValidationSuccess = () => {
    setIsValid(true);
    setErrorMessage('');
  };

  const resetValidation = () => {
    setVoucherCode('');
    setIsValid(null);
    setErrorMessage('');
  };

  return {
    voucherCode,
    setVoucherCode,
    isValid,
    setIsValid,
    errorMessage,
    validateVoucherCode,
    setValidationError,
    setValidationSuccess,
    resetValidation
  };
};
