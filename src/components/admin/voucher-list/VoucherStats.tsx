
import React from 'react';
import { VoucherType } from '@/types/voucherTypes';
import { useLanguage } from '@/contexts/LanguageContext';
import { Ticket, CheckCircle, XCircle, Clock } from 'lucide-react';

interface VoucherStatsProps {
  vouchers: VoucherType[];
}

export const VoucherStats: React.FC<VoucherStatsProps> = ({ vouchers }) => {
  const { language } = useLanguage();

  const stats = React.useMemo(() => {
    const now = new Date();
    
    const total = vouchers.length;
    const active = vouchers.filter(v => {
      const isExpired = v.expiry_date && new Date(v.expiry_date) < now;
      const isFullyUsed = (v.used_count || 0) >= (v.usage_limit || 1);
      return !isExpired && !isFullyUsed;
    }).length;
    
    const used = vouchers.filter(v => (v.used_count || 0) > 0).length;
    const expired = vouchers.filter(v => v.expiry_date && new Date(v.expiry_date) < now).length;
    
    // Общая статистика использования
    const totalUsages = vouchers.reduce((sum, v) => sum + (v.used_count || 0), 0);
    const totalLimit = vouchers.reduce((sum, v) => sum + (v.usage_limit || 1), 0);

    return {
      total,
      active,
      used,
      expired,
      totalUsages,
      totalLimit
    };
  }, [vouchers]);

  const statCards = [
    {
      title: language === 'ru' ? 'Всего ваучеров' : 'Барлық ваучерлер',
      value: stats.total,
      icon: Ticket,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      title: language === 'ru' ? 'Активные' : 'Белсенді',
      value: stats.active,
      icon: CheckCircle,
      color: 'text-green-600 bg-green-100'
    },
    {
      title: language === 'ru' ? 'Использованные' : 'Қолданылған',
      value: stats.used,
      icon: Clock,
      color: 'text-orange-600 bg-orange-100'
    },
    {
      title: language === 'ru' ? 'Просроченные' : 'Мерзімі өткен',
      value: stats.expired,
      icon: XCircle,
      color: 'text-red-600 bg-red-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-full ${stat.color}`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Общая статистика использования */}
      <div className="bg-white rounded-lg border p-4 md:col-span-2 lg:col-span-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              {language === 'ru' ? 'Общая статистика использования' : 'Жалпы қолдану статистикасы'}
            </p>
            <p className="text-lg font-bold text-gray-900">
              {stats.totalUsages} / {stats.totalLimit}
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({stats.totalLimit > 0 ? Math.round((stats.totalUsages / stats.totalLimit) * 100) : 0}%)
              </span>
            </p>
          </div>
          <div className="w-48 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ 
                width: `${stats.totalLimit > 0 ? (stats.totalUsages / stats.totalLimit) * 100 : 0}%` 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
