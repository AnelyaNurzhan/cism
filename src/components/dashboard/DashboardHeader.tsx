
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface DashboardHeaderProps {
  userName: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName }) => {
  const { language } = useLanguage();
  
  const formattedName = userName || (language === 'ru' ? 'Пользователь' : 'Қолданушы');
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 text-primary">
        {language === 'ru' ? 'Личный кабинет' : 'Жеке кабинет'}
      </h1>
      <p className="text-gray-600 mb-4">
        {language === 'ru' 
          ? `Добро пожаловать, ${formattedName}` 
          : `Қош келдіңіз, ${formattedName}`}
      </p>
    </div>
  );
};

export default DashboardHeader;
