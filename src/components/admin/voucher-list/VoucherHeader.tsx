
import React from 'react';
import { PlusCircle, FileSpreadsheet } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface VoucherHeaderProps {
  onCreateVoucher: () => void;
  onExportToExcel: () => void;
}

export const VoucherHeader: React.FC<VoucherHeaderProps> = ({ 
  onCreateVoucher, 
  onExportToExcel 
}) => {
  const { language } = useLanguage();

  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">
        {language === 'ru' ? 'Управление ваучерами' : 'Ваучерлерді басқару'}
      </h2>
      <div className="flex flex-wrap gap-2">
        <button 
          onClick={onCreateVoucher}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
        >
          <PlusCircle size={16} className="mr-2" />
          {language === 'ru' ? 'Создать ваучер' : 'Ваучер жасау'}
        </button>
        <button 
          onClick={onExportToExcel}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light transition-colors flex items-center"
        >
          <FileSpreadsheet size={16} className="mr-2" />
          {language === 'ru' ? 'Экспорт Excel' : 'Excel экспорты'}
        </button>
      </div>
    </div>
  );
};
