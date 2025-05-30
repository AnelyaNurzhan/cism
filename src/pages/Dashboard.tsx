
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useDashboardData } from '../hooks/dashboard/useDashboardData';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import ProfileCard from '../components/dashboard/ProfileCard';
import StatisticsCard from '../components/dashboard/StatisticsCard';
import TestHistoryList from '../components/dashboard/TestHistoryList';
import DashboardLoading from '../components/dashboard/DashboardLoading';
import DashboardError from '../components/dashboard/DashboardError';

const Dashboard = () => {
  const { language } = useLanguage();
  const { profile, isLoading: authLoading } = useAuth();
  const { testHistory, isLoading: dataLoading } = useDashboardData();

  const isLoading = authLoading || dataLoading;

  if (isLoading) {
    return <DashboardLoading />;
  }

  if (!profile) {
    return <DashboardError message={language === 'ru' ? 'Профиль не найден' : 'Профиль табылмады'} />;
  }

  console.log('Dashboard data:', { testHistory });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <DashboardHeader userName={profile.fullName || profile.email || ''} />
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <div className="lg:col-span-1">
            <ProfileCard profile={profile} />
          </div>
          
          <div className="lg:col-span-2">
            <StatisticsCard testHistory={testHistory} />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            {language === 'ru' ? 'История тестов' : 'Тест тарихы'}
          </h2>
          <TestHistoryList testHistory={testHistory} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
