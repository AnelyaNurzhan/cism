
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Textarea } from '@/components/ui/textarea';
import { TestFormData } from '../../TestFormModal';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface DescriptionFieldsProps {
  formData: TestFormData;
  formErrors: FieldErrors<TestFormData>;
  register: UseFormRegister<TestFormData>;
}

export const DescriptionFields: React.FC<DescriptionFieldsProps> = ({ 
  formData, 
  formErrors, 
  register 
}) => {
  const { language } = useLanguage();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {language === 'ru' ? 'Описание (Рус)' : 'Сипаттама (Орыс)'}
        </label>
        <Textarea
          {...register('description_ru')}
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {language === 'ru' ? 'Описание (Каз)' : 'Сипаттама (Қазақ)'}
        </label>
        <Textarea
          {...register('description_kz')}
          rows={3}
        />
      </div>
    </div>
  );
};
