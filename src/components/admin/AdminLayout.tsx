
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { SidebarNav, AdminTab } from './SidebarNav';

interface AdminLayoutProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  activeTab,
  onTabChange,
  children
}) => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold mb-8">
          {language === 'ru' ? 'Панель администратора' : 'Әкімші тақтасы'}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Sidebar */}
          <div className="col-span-1 bg-white rounded-lg shadow-md p-4">
            <SidebarNav activeTab={activeTab} onTabChange={onTabChange} />
          </div>

          {/* Main Content */}
          <div className="col-span-1 md:col-span-4 bg-white rounded-lg shadow-md p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
