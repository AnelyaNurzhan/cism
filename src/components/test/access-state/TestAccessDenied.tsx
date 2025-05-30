
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

interface TestAccessDeniedProps {
  onActivateVoucher: () => void;
}

export const TestAccessDenied: React.FC<TestAccessDeniedProps> = ({
  onActivateVoucher
}) => {
  const { language } = useLanguage();

  return (
    <div className="space-y-4">
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <p className="text-yellow-700">
          {language === 'ru' 
            ? 'У вас нет доступа к этому тесту. Для доступа необходимо активировать ваучер.' 
            : 'Сізде бұл тестке қол жетімділік жоқ. Қол жеткізу үшін ваучерді белсендіру қажет.'}
        </p>
      </div>
      
      <Button 
        size="lg" 
        className="w-full sm:w-auto"
        onClick={onActivateVoucher}
      >
        {language === 'ru' ? 'Активировать ваучер' : 'Ваучерді белсендіру'}
      </Button>
    </div>
  );
};
