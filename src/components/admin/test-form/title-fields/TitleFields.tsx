
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { TestFormData } from '../../TestFormModal';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface TitleFieldsProps {
  formData: TestFormData;
  formErrors: FieldErrors<TestFormData>;
  register: UseFormRegister<TestFormData>;
}

export const TitleFields: React.FC<TitleFieldsProps> = ({ 
  formData, 
  formErrors, 
  register 
}) => {
  const { language } = useLanguage();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {language === 'ru' ? 'Название теста (Рус)' : 'Тест атауы (Орыс)'}*
        </label>
        <Input
          {...register('title_ru', { required: true })}
          className={formErrors.title_ru ? 'border-red-500' : ''}
        />
        {formErrors.title_ru && (
          <p className="mt-1 text-sm text-red-600">
            {language === 'ru' ? 'Обязательное поле' : 'Міндетті өріс'}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {language === 'ru' ? 'Название теста (Каз)' : 'Тест атауы (Қазақ)'}*
        </label>
        <Input
          {...register('title_kz', { required: true })}
          className={formErrors.title_kz ? 'border-red-500' : ''}
        />
        {formErrors.title_kz && (
          <p className="mt-1 text-sm text-red-600">
            {language === 'ru' ? 'Обязательное поле' : 'Міндетті өріс'}
          </p>
        )}
      </div>
    </div>
  );
};
