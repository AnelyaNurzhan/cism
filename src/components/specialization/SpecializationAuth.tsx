
import React from 'react';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const SpecializationAuth: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="container mx-auto py-8">
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="flex justify-center mb-4">
          <Lock size={48} className="text-gray-400" />
        </div>
        
        <h2 className="text-2xl font-bold mb-4">
          {language === 'ru' ? 'Требуется авторизация' : 'Авторизация қажет'}
        </h2>
        
        <p className="text-gray-600 mb-6">
          {language === 'ru' 
            ? 'Для просмотра доступных специализаций необходимо войти в систему.' 
            : 'Қол жетімді мамандықтарды көру үшін жүйеге кіру керек.'
          }
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild>
            <Link to="/login">
              {language === 'ru' ? 'Войти в систему' : 'Жүйеге кіру'}
            </Link>
          </Button>
          
          <Button variant="outline" asChild>
            <Link to="/register">
              {language === 'ru' ? 'Зарегистрироваться' : 'Тіркелу'}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpecializationAuth;
