
import React from 'react';
import { VoucherType } from '@/types/voucherTypes';
import { useLanguage } from '@/contexts/LanguageContext';
import { VoucherGroupCard } from './VoucherGroupCard';

interface VoucherGroup {
  title: string;
  count: number;
  vouchers: VoucherType[];
}

interface VoucherGroupListProps {
  groups: VoucherGroup[];
  onEdit: (voucher: VoucherType) => void;
  onDelete: (id: string) => void;
  onDeleteGroup: (groupTitle: string) => void;
  onExportGroup: (title: string, vouchers: VoucherType[]) => void;
}

export const VoucherGroupList: React.FC<VoucherGroupListProps> = ({
  groups,
  onEdit,
  onDelete,
  onDeleteGroup,
  onExportGroup
}) => {
  const { language } = useLanguage();

  if (groups.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <div className="bg-white rounded-lg shadow-md p-8">
          <p className="text-lg">
            {language === 'ru' 
              ? 'Ваучеры не найдены' 
              : 'Ваучерлер табылмады'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {groups.map((group, index) => (
        <VoucherGroupCard
          key={`${group.title}-${index}`}
          title={group.title}
          vouchers={group.vouchers}
          onEdit={onEdit}
          onDelete={onDelete}
          onDeleteGroup={onDeleteGroup}
          onExportGroup={(title, vouchers) => onExportGroup(title, vouchers)}
        />
      ))}
    </div>
  );
};
