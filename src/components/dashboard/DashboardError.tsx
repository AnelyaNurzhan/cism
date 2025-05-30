
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

interface DashboardErrorProps {
  message?: string;
}

const DashboardError: React.FC<DashboardErrorProps> = ({ message }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const handleLogout = async () => {
    try {
      await logout();
      toast.success(language === 'ru' 
        ? 'Вы успешно вышли из системы' 
        : 'Сіз жүйеден сәтті шықтыңыз');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(language === 'ru' 
        ? 'Ошибка при выходе из системы' 
        : 'Жүйеден шығу кезінде қате');
    }
  };

  const handleRefresh = () => {
    window.location.reload();
    toast.info(language === 'ru' 
      ? 'Обновление страницы...' 
      : 'Бетті жаңарту...');
  };

  const defaultMessage = language === 'ru' 
    ? 'Не удалось загрузить профиль. Попробуйте войти снова.' 
    : 'Профильді жүктеу мүмкін болмады. Қайта кіріп көріңіз.';
  
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
      <p className="text-red-500 text-xl mb-4">
        {message || defaultMessage}
      </p>
      <div className="text-gray-600 mb-4">
        {language === 'ru' 
          ? 'Возможная причина: проблема с доступом к базе данных или политиками безопасности.' 
          : 'Ықтимал себеп: дерекқорға немесе қауіпсіздік саясатына қол жеткізу мәселесі.'}
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center mt-4 space-y-2 sm:space-y-0 sm:space-x-2">
        <Button 
          variant="outline"
          onClick={handleRefresh}
          className="flex items-center justify-center"
        >
          <RefreshCw size={16} className="mr-2" />
          {language === 'ru' ? 'Обновить страницу' : 'Бетті жаңарту'}
        </Button>
        
        <Button onClick={handleLogout}>
          {language === 'ru' ? 'Выйти и войти снова' : 'Шығу және қайта кіру'}
        </Button>
      </div>
    </div>
  );
};

export default DashboardError;
