
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ru' ? 'kz' : 'ru');
  };

  return (
    <Button 
      onClick={toggleLanguage}
      variant="ghost"
      size="sm"
      className="px-3 py-1.5 text-sm font-medium hover:bg-gray-100 transition-colors rounded-md"
      aria-label={`Switch to ${language === 'ru' ? 'Kazakh' : 'Russian'}`}
    >
      {language === 'ru' ? 'KZ' : 'RU'}
    </Button>
  );
};

export default LanguageToggle;
