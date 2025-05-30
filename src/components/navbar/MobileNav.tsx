import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

interface MobileNavProps {
  isOpen: boolean;
  onItemClick: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onItemClick }) => {
  const { language, t } = useLanguage();
  const { isAuthenticated, profile } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white shadow-lg">
      <div className="container mx-auto">
        <div className="flex flex-col space-y-4 py-6">
          <Link to="/" className="px-6 py-2 hover:bg-gray-100" onClick={onItemClick}>
            {t('nav.home')}
          </Link>
          <Link to="/about" className="px-6 py-2 hover:bg-gray-100" onClick={onItemClick}>
            {language === 'ru' ? 'Тестирование' : 'Тестілеу'}
          </Link>
          <Link to="/faq" className="px-6 py-2 hover:bg-gray-100" onClick={onItemClick}>
            {t('nav.faq')}
          </Link>
          <Link to="/rules" className="px-6 py-2 hover:bg-gray-100" onClick={onItemClick}>
            {t('nav.rules')}
          </Link>
          <Link to="/certificate" className="px-6 py-2 hover:bg-gray-100" onClick={onItemClick}>
            {language === 'ru' ? 'Сертификат' : 'Сертификат'}
          </Link>

          {isAuthenticated && (
            <>
              <Link to="/dashboard" className="px-6 py-2 hover:bg-gray-100" onClick={onItemClick}>
                {t('nav.dashboard')}
              </Link>
              {/* Changed from "Тестирование" to "Специализации" */}
              <Link to="/specializations" className="px-6 py-2 hover:bg-gray-100" onClick={onItemClick}>
                {language === 'ru' ? 'Специализации' : 'Мамандықтар'}
              </Link>
              
              {profile?.role === 'admin' && (
                <Link to="/admin" className="px-6 py-2 hover:bg-gray-100" onClick={onItemClick}>
                  {t('nav.admin')}
                </Link>
              )}
            </>
          )}

          {!isAuthenticated ? (
            <div className="pt-4 border-t border-gray-200">
              <Link 
                to="/login" 
                className="block px-6 py-2 text-primary hover:bg-gray-100"
                onClick={onItemClick}
              >
                {t('nav.login')}
              </Link>
              <Link 
                to="/register" 
                className="block px-6 py-2 m-2 text-center bg-primary text-white rounded"
                onClick={onItemClick}
              >
                {t('nav.register')}
              </Link>
            </div>
          ) : (
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  // Handle logout logic
                  onItemClick();
                }}
                className="block w-full text-left px-6 py-2 text-red-500 hover:bg-gray-100"
              >
                {t('nav.logout')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
