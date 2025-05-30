
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

interface TestAccessGrantedProps {
  onStartTest: () => void;
}

export const TestAccessGranted: React.FC<TestAccessGrantedProps> = ({ 
  onStartTest 
}) => {
  const { language } = useLanguage();

  return (
    <>
      <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
        <h3 className="font-medium text-green-800 mb-2">
          {language === 'ru' ? 'У вас есть доступ к этому тесту' : 'Сізде осы тестке қол жетімділік бар'}
        </h3>
        <p className="text-green-700">
          {language === 'ru' 
            ? 'Вы можете начать тест прямо сейчас. Удачи!' 
            : 'Сіз қазір бірден тестті бастай аласыз. Сәттілік!'}
        </p>
      </div>
      
      <Button 
        size="lg" 
        className="w-full sm:w-auto"
        onClick={onStartTest}
      >
        {language === 'ru' ? 'Начать тест' : 'Тестті бастау'}
      </Button>
    </>
  );
};
