
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Ticket, Users, FileText, BarChart3 } from 'lucide-react';

export enum AdminTab {
  Vouchers = 'vouchers',
  Users = 'users',
  Tests = 'tests',
  Statistics = 'statistics'
}

interface SidebarNavProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  const { language } = useLanguage();

  const tabs = [
    {
      id: AdminTab.Vouchers,
      label: language === 'ru' ? 'Ваучеры' : 'Ваучерлер',
      icon: Ticket
    },
    {
      id: AdminTab.Users,
      label: language === 'ru' ? 'Пользователи' : 'Пайдаланушылар',
      icon: Users
    },
    {
      id: AdminTab.Tests,
      label: language === 'ru' ? 'Тесты' : 'Тесттер',
      icon: FileText
    },
    {
      id: AdminTab.Statistics,
      label: language === 'ru' ? 'Статистика' : 'Статистика',
      icon: BarChart3
    }
  ];

  return (
    <nav className="space-y-2">
      <h2 className="text-lg font-semibold mb-4">
        {language === 'ru' ? 'Управление' : 'Басқару'}
      </h2>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full flex items-center px-3 py-2 text-left rounded-md transition-colors ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Icon className="mr-2 h-4 w-4" />
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
};
