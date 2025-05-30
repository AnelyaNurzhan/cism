
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const AuthenticationRequired: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
      <p className="text-blue-700">
        {language === 'ru' 
          ? 'Для прохождения теста необходимо войти в систему.' 
          : 'Тестті өту үшін жүйеге кіру қажет.'}
      </p>
      <Button 
        className="mt-3"
        onClick={() => navigate('/login')}
      >
        {language === 'ru' ? 'Войти' : 'Кіру'}
      </Button>
    </div>
  );
};
