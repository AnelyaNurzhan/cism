
import React from 'react';
import { VoucherType } from '@/types/voucherTypes';
import { useLanguage } from '@/contexts/LanguageContext';
import { Edit, Trash2, Calendar, User, TestTube, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VoucherListItemProps {
  voucher: VoucherType;
  onEdit: (voucher: VoucherType) => void;
  onDelete: (id: string) => void;
}

export const VoucherListItem: React.FC<VoucherListItemProps> = ({
  voucher,
  onEdit,
  onDelete
}) => {
  const { language } = useLanguage();

  const getStatusBadge = () => {
    const now = new Date();
    const isExpired = voucher.expiry_date && new Date(voucher.expiry_date) < now;
    const usedCount = voucher.used_count || 0;
    const usageLimit = voucher.usage_limit || 1;
    const isFullyUsed = usedCount >= usageLimit;
    
    if (isExpired) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
          {language === 'ru' ? 'Просрочен' : 'Мерзімі өткен'}
        </span>
      );
    }
    
    if (isFullyUsed) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {language === 'ru' ? 'Исчерпан' : 'Таусылған'}
        </span>
      );
    }
    
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
        {language === 'ru' ? 'Активен' : 'Белсенді'}
      </span>
    );
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return language === 'ru' ? 'Не задано' : 'Белгіленбеген';
    return new Date(dateString).toLocaleDateString();
  };

  // Функция для отображения назначения ваучера
  const getVoucherTarget = () => {
    // Если есть связанные тесты
    if (voucher.tests && voucher.tests.length > 0) {
      const testTitle = language === 'ru' ? voucher.tests[0].title_ru : voucher.tests[0].title_kz;
      return {
        type: 'test',
        name: testTitle,
        icon: <TestTube className="h-3 w-3" />
      };
    }
    
    // Если есть связанные специализации
    if (voucher.specializations && voucher.specializations.length > 0) {
      const spec = voucher.specializations[0];
      const specName = language === 'ru' ? spec.specializations?.name_ru : spec.specializations?.name_kz;
      const levelName = language === 'ru' ? spec.levels?.name_ru : spec.levels?.name_kz;
      return {
        type: 'specialization',
        name: `${specName} - ${levelName}`,
        icon: <BookOpen className="h-3 w-3" />
      };
    }
    
    // Универсальный ваучер
    return {
      type: 'universal',
      name: language === 'ru' ? 'Универсальный ваучер' : 'Әмбебап ваучер',
      icon: <TestTube className="h-3 w-3" />
    };
  };

  const targetInfo = getVoucherTarget();
  const usedCount = voucher.used_count || 0;
  const usageLimit = voucher.usage_limit || 1;

  return (
    <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-medium text-gray-900 truncate">
              {voucher.title}
            </h3>
            {getStatusBadge()}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <span className="font-medium">{language === 'ru' ? 'Код:' : 'Код:'}</span>
              <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-xs">
                {voucher.code}
              </span>
            </div>
            
            <div className="flex items-center gap-1">
              <span className="font-medium">
                {language === 'ru' ? 'Использование:' : 'Қолдану:'}
              </span>
              <span className="font-semibold text-blue-600">
                {usedCount}/{usageLimit}
              </span>
            </div>
            
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span className="font-medium">{language === 'ru' ? 'До:' : 'Дейін:'}</span>
              <span>{formatDate(voucher.expiry_date)}</span>
            </div>
            
            {voucher.profiles && (
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span className="font-medium">{language === 'ru' ? 'Создатель:' : 'Жасаушы:'}</span>
                <span className="truncate">{voucher.profiles.full_name}</span>
              </div>
            )}
            
            <div className="flex items-center gap-1 col-span-full">
              {targetInfo.icon}
              <span className="font-medium">{language === 'ru' ? 'Назначение:' : 'Мақсаты:'}</span>
              <span className="truncate">{targetInfo.name}</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 ml-4 flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(voucher)}
            className="p-2"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(voucher.id)}
            className="p-2 text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
