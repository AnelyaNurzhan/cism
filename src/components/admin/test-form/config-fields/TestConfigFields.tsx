
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { TestFormData } from '../../TestFormModal';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface TestConfigFieldsProps {
  formData: TestFormData;
  formErrors: FieldErrors<TestFormData>;
  register: UseFormRegister<TestFormData>;
}

export const TestConfigFields: React.FC<TestConfigFieldsProps> = ({ 
  formData, 
  formErrors, 
  register 
}) => {
  const { language } = useLanguage();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {language === 'ru' ? 'Время на тест (мин)' : 'Тест уақыты (мин)'}*
        </label>
        <Input
          type="number"
          min="1"
          {...register('time_limit', { 
            required: true,
            min: 1,
            valueAsNumber: true 
          })}
          className={formErrors.time_limit ? 'border-red-500' : ''}
        />
        {formErrors.time_limit && (
          <p className="mt-1 text-sm text-red-600">
            {language === 'ru' ? 'Значение должно быть больше 0' : '0-ден үлкен болуы керек'}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {language === 'ru' ? 'Проходной балл (%)' : 'Өту балы (%)'}*
        </label>
        <Input
          type="number"
          min="1"
          max="100"
          {...register('passing_score', { 
            required: true, 
            min: 1, 
            max: 100,
            valueAsNumber: true
          })}
          className={formErrors.passing_score ? 'border-red-500' : ''}
        />
        {formErrors.passing_score && (
          <p className="mt-1 text-sm text-red-600">
            {language === 'ru' ? 'Значение должно быть между 1 и 100' : '1 және 100 аралығында болуы керек'}
          </p>
        )}
      </div>
    </div>
  );
};
