
import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Check, X } from 'lucide-react';

interface VoucherFormProps {
  voucherCode: string;
  onVoucherCodeChange: (value: string) => void;
  isChecking: boolean;
  isValid: boolean | null;
  errorMessage: string;
}

export const VoucherForm: React.FC<VoucherFormProps> = ({
  voucherCode,
  onVoucherCodeChange,
  isChecking,
  isValid,
  errorMessage
}) => {
  const { language } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);
  
  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-600">
        {language === 'ru' 
          ? 'Для доступа к тесту введите код ваучера' 
          : 'Тестке қол жеткізу үшін ваучер кодын енгізіңіз'}
      </p>
      
      <div className="relative">
        <Input
          ref={inputRef}
          value={voucherCode}
          onChange={(e) => onVoucherCodeChange(e.target.value.toUpperCase())}
          placeholder={language === 'ru' ? 'Введите код ваучера' : 'Ваучер кодын енгізіңіз'}
          className="pr-10 uppercase"
          disabled={isChecking || isValid === true}
          autoFocus
        />
        
        {isValid === true && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
            <Check size={18} />
          </div>
        )}
        
        {isValid === false && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
            <X size={18} />
          </div>
        )}
      </div>
      
      {errorMessage && (
        <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
      )}
      
      {isValid === true && (
        <p className="text-sm text-green-500 mt-1">
          {language === 'ru' ? 'Ваучер успешно активирован!' : 'Ваучер сәтті белсендірілді!'}
        </p>
      )}
    </div>
  );
};
