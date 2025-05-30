
import React from 'react';
import { Loader } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const TestSubmittingState = () => {
  const { language } = useLanguage();
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
        <Loader className="animate-spin h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">
          {language === 'ru' ? 'Проверяем ваши ответы...' : 'Жауаптарыңызды тексеруде...'}
        </h3>
        <p className="text-gray-600">
          {language === 'ru' 
            ? 'Пожалуйста, не закрывайте эту страницу.' 
            : 'Бұл бетті жаппаңыз.'}
        </p>
      </div>
    </div>
  );
};

export default TestSubmittingState;
