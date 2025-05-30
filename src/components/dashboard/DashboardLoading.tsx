
import React from 'react';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const DashboardLoading: React.FC = () => {
  const { language } = useLanguage();
  
  const loadingText = language === 'ru' 
    ? 'Загрузка профиля...' 
    : 'Профиль жүктелуде...';
  
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center h-64">
      <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
      <p className="text-gray-600 text-lg">{loadingText}</p>
      <p className="text-gray-400 text-sm mt-2">
        {language === 'ru' 
          ? 'Пожалуйста, подождите' 
          : 'Күте тұрыңыз'}
      </p>
    </div>
  );
};

export default DashboardLoading;
