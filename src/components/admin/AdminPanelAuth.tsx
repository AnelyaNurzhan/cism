
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

interface AdminPanelAuthProps {
  children: React.ReactNode;
}

export const AdminPanelAuth: React.FC<AdminPanelAuthProps> = ({ children }) => {
  const { language } = useLanguage();
  const { profile, isAuthenticated, isLoading } = useAuth();

  // Show loading while auth is being checked
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user profile is loaded
  if (!profile) {
    console.log('No profile loaded yet, waiting...');
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  console.log('Current user profile:', profile);
  console.log('User role:', profile.role);

  // Check if user is admin
  if (profile.role !== 'admin') {
    console.log('Access denied. Profile:', profile, 'Role:', profile?.role);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            {language === 'ru' ? 'Доступ запрещен' : 'Қол жеткізу тыйым салынған'}
          </h1>
          <p className="text-gray-600">
            {language === 'ru' 
              ? 'У вас нет прав доступа к панели администратора' 
              : 'Сізде әкімші тақтасына қол жеткізу құқығы жоқ'}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
