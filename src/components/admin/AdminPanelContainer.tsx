
import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { AdminTab } from './SidebarNav';
import { VouchersTab } from './VouchersTab';
import { UsersTab } from './UsersTab';
import { TestsTab } from './TestsTab';
import { StatisticsTab } from './StatisticsTab';
import { AdminLayout } from './AdminLayout';
import { useAdminData } from '../../hooks/admin/useAdminData';

export const AdminPanelContainer: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<AdminTab>(AdminTab.Vouchers);
  const isMobile = useIsMobile();

  const {
    users,
    tests,
    vouchers,
    isDataLoading,
    fetchUsers,
    fetchTests,
    fetchVouchers
  } = useAdminData(language as 'ru' | 'kz');

  const renderTabContent = () => {
    if (isDataLoading) {
      return (
        <div className="flex items-center justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      );
    }
    
    switch (activeTab) {
      case AdminTab.Vouchers:
        return <VouchersTab vouchers={vouchers} onVouchersUpdated={fetchVouchers} />;
      case AdminTab.Users:
        return <UsersTab users={users} onUsersUpdated={fetchUsers} />;
      case AdminTab.Tests:
        return <TestsTab tests={tests} onTestsUpdated={fetchTests} />;
      case AdminTab.Statistics:
        return <StatisticsTab users={users} tests={tests} vouchers={vouchers} />;
      default:
        return <VouchersTab vouchers={vouchers} onVouchersUpdated={fetchVouchers} />;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderTabContent()}
    </AdminLayout>
  );
};
