
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const TestListAuth: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate('/login');
  };
  
  return (
    <div className="text-center py-10">
      <h2 className="text-2xl font-bold text-amber-500 mb-4">
        {language === 'ru' ? 'Требуется вход' : 'Кіру қажет'}
      </h2>
      <p className="text-gray-600 mb-6">
        {language === 'ru' 
          ? 'Для просмотра тестов необходимо войти в систему.' 
          : 'Тесттерді көру үшін жүйеге кіру керек.'}
      </p>
      <Button
        onClick={handleLogin}
        className="flex items-center gap-2"
      >
        {language === 'ru' ? 'Войти' : 'Кіру'}
      </Button>
    </div>
  );
};

export default TestListAuth;
