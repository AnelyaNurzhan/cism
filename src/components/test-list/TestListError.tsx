
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface TestListErrorProps {
  error: unknown;
  handleRefresh: () => void;
}

const TestListError: React.FC<TestListErrorProps> = ({ error, handleRefresh }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <div className="text-center py-10">
      <div className="flex justify-center mb-4">
        <AlertTriangle size={48} className="text-red-500" />
      </div>
      <h2 className="text-2xl font-bold text-red-500 mb-4">
        {language === 'ru' ? 'Ошибка загрузки' : 'Жүктеу қатесі'}
      </h2>
      <p className="text-gray-600 mb-6 max-w-lg mx-auto">
        {language === 'ru' 
          ? 'Не удалось загрузить список тестов. Возможная причина: проблема с доступом к базе данных или правами пользователя.' 
          : 'Тестілер тізімін жүктеу мүмкін болмады. Ықтимал себеп: дерекқорға қол жеткізу мәселесі немесе пайдаланушы құқықтары.'}
      </p>
      <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-2">
        <Button
          onClick={handleRefresh}
          className="flex items-center gap-2"
        >
          <RefreshCw size={18} />
          {language === 'ru' ? 'Попробовать снова' : 'Қайтадан көріңіз'}
        </Button>
        
        <Button 
          variant="outline"
          onClick={() => {
            // Force re-authentication
            supabase.auth.refreshSession().then(() => {
              handleRefresh();
            });
          }}
        >
          {language === 'ru' ? 'Обновить сессию' : 'Сеансты жаңарту'}
        </Button>
        
        <Button 
          variant="outline"
          onClick={() => navigate('/login')}
        >
          {language === 'ru' ? 'Войти снова' : 'Қайта кіру'}
        </Button>
      </div>
    </div>
  );
};

export default TestListError;
