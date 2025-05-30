
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const TestNotFoundState = () => {
  const { language } = useLanguage();
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-600">
          {language === 'ru' ? 'Тест не найден' : 'Тест табылмады'}
        </p>
      </div>
    </div>
  );
};

export default TestNotFoundState;
