
import React, { useState } from 'react';
import { VoucherType } from '@/types/voucherTypes';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown, ChevronRight, Download, Trash2, Calendar, TestTube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { VoucherListItem } from './VoucherListItem';

interface VoucherGroupCardProps {
  title: string;
  vouchers: VoucherType[];
  onEdit: (voucher: VoucherType) => void;
  onDelete: (id: string) => void;
  onDeleteGroup: (title: string) => void;
  onExportGroup: (title: string, vouchers: VoucherType[]) => void;
}

export const VoucherGroupCard: React.FC<VoucherGroupCardProps> = ({
  title,
  vouchers,
  onEdit,
  onDelete,
  onDeleteGroup,
  onExportGroup
}) => {
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  // Подсчитываем статистику группы
  const totalCount = vouchers.length;
  const activeCount = vouchers.filter(v => 
    (v.used_count || 0) < (v.usage_limit || 1) && 
    (!v.expiry_date || new Date(v.expiry_date) >= new Date())
  ).length;
  const fullyUsedCount = vouchers.filter(v => (v.used_count || 0) >= (v.usage_limit || 1)).length;
  const expiredCount = vouchers.filter(v => 
    v.expiry_date && 
    new Date(v.expiry_date) < new Date() && 
    (v.used_count || 0) < (v.usage_limit || 1)
  ).length;

  // Подсчитываем общее использование группы
  const totalUsage = vouchers.reduce((sum, v) => sum + (v.used_count || 0), 0);
  const totalLimit = vouchers.reduce((sum, v) => sum + (v.usage_limit || 1), 0);

  const getExpiryRange = () => {
    const dates = vouchers
      .map(v => v.expiry_date)
      .filter(Boolean)
      .map(date => new Date(date!))
      .sort((a, b) => a.getTime() - b.getTime());
    
    if (dates.length === 0) {
      return language === 'ru' ? 'Не задано' : 'Белгіленбеген';
    }
    
    if (dates.length === 1) {
      return dates[0].toLocaleDateString();
    }
    
    return `${dates[0].toLocaleDateString()} - ${dates[dates.length - 1].toLocaleDateString()}`;
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 h-6 w-6"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-gray-900 truncate">
                {title}
              </h3>
              
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <TestTube className="h-3 w-3" />
                  <span className="font-medium">{language === 'ru' ? 'Всего:' : 'Барлығы:'}</span>
                  <span className="font-semibold text-blue-600">{totalCount}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <span className="font-medium">{language === 'ru' ? 'Использование:' : 'Қолдану:'}</span>
                  <span className="font-semibold text-purple-600">{totalUsage}/{totalLimit}</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-green-600">
                    {language === 'ru' ? 'Активных' : 'Белсенді'}: {activeCount}
                  </span>
                  <span className="text-gray-600">
                    {language === 'ru' ? 'Использованных' : 'Қолданылған'}: {fullyUsedCount}
                  </span>
                  {expiredCount > 0 && (
                    <span className="text-red-600">
                      {language === 'ru' ? 'Просроченных' : 'Мерзімі өткен'}: {expiredCount}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span className="font-medium">{language === 'ru' ? 'Срок:' : 'Мерзім:'}</span>
                  <span>{getExpiryRange()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExportGroup(title, vouchers)}
              className="flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
              {language === 'ru' ? 'Экспорт' : 'Экспорт'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDeleteGroup(title)}
              className="flex items-center gap-1 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
              {language === 'ru' ? 'Удалить группу' : 'Топты жою'}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-0">
          <div className="space-y-3">
            {vouchers.map((voucher) => (
              <VoucherListItem
                key={voucher.id}
                voucher={voucher}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};
