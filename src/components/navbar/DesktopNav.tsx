
import React from 'react';
import { Link } from 'react-router-dom';
import NavLink from './NavLink';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

const DesktopNav: React.FC = () => {
  const { language, t } = useLanguage();
  const { isAuthenticated, profile, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      const message = language === 'ru' 
        ? 'Вы успешно вышли из системы' 
        : 'Сіз жүйеден сәтті шықтыңыз';
      
      toast.success(message);
    } catch (error) {
      console.error('Logout error:', error);
      const errorMessage = language === 'ru' 
        ? 'Ошибка при выходе из системы' 
        : 'Жүйеден шығу кезінде қате';
      
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <nav className="hidden md:flex items-center">
        <NavLink to="/">{t('nav.home')}</NavLink>
        <NavLink to="/about">{language === 'ru' ? 'Тестирование' : 'Тестілеу'}</NavLink>
        <NavLink to="/faq">{t('nav.faq')}</NavLink>
        <NavLink to="/rules">{t('nav.rules')}</NavLink>
        <NavLink to="/certificate">
          {language === 'ru' ? 'Сертификат' : 'Сертификат'}
        </NavLink>

        {isAuthenticated && (
          <>
            <NavLink to="/specializations">
              {language === 'ru' ? 'Специализации' : 'Мамандықтар'}
            </NavLink>
            
            {profile?.role === 'admin' && (
              <NavLink to="/admin">{t('nav.admin')}</NavLink>
            )}
          </>
        )}
      </nav>

      {!isAuthenticated ? (
        <div className="hidden md:flex items-center">
          <Link 
            to="/login" 
            className="px-6 py-4 text-base font-medium text-primary hover:bg-gray-100 transition-colors"
          >
            {t('nav.login')}
          </Link>
          <Link 
            to="/register" 
            className="px-6 py-4 text-base font-medium bg-primary text-white hover:bg-primary-light transition-colors"
          >
            {t('nav.register')}
          </Link>
        </div>
      ) : (
        <div className="hidden md:flex items-center">
          <Link 
            to="/dashboard" 
            className="px-6 py-4 text-base font-medium hover:bg-gray-100 transition-colors"
          >
            {t('nav.dashboard')}
          </Link>

          <button
            onClick={handleLogout}
            className="px-6 py-4 text-base font-medium text-red-500 hover:bg-gray-100 transition-colors"
          >
            {t('nav.logout')}
          </button>
        </div>
      )}
    </>
  );
};

export default DesktopNav;
