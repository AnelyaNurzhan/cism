
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TestFormData } from '../../TestFormModal';
import { UseFormRegister } from 'react-hook-form';

interface StatusFieldProps {
  formData: TestFormData;
  register: UseFormRegister<TestFormData>;
}

export const StatusField: React.FC<StatusFieldProps> = ({ 
  formData, 
  register 
}) => {
  const { language } = useLanguage();
  
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {language === 'ru' ? 'Статус' : 'Күйі'}
      </label>
      <select
        {...register('status')}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      >
        <option value="active">{language === 'ru' ? 'Активен' : 'Белсенді'}</option>
        <option value="draft">{language === 'ru' ? 'Черновик' : 'Қарап жүру'}</option>
      </select>
    </div>
  );
};
