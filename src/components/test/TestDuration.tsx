
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Clock } from 'lucide-react';

interface TestDurationProps {
  timeLimit: number;
}

export const TestDuration: React.FC<TestDurationProps> = ({ timeLimit }) => {
  const { language } = useLanguage();
  
  return (
    <div className="flex items-center text-gray-500 mb-4">
      <Clock size={16} className="mr-1" />
      <span>
        {language === 'ru' 
          ? `${timeLimit} минут` 
          : `${timeLimit} минут`}
      </span>
    </div>
  );
};
