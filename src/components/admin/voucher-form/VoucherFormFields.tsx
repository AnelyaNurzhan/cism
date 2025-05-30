
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DateField } from './fields/DateField';
import { NumberField } from './fields/NumberField';
import { TestSelector } from './fields/TestSelector';
import SpecializationLevelSelector from '../../admin/test-form/SpecializationLevelSelector';

interface VoucherFormFieldsProps {
  language: string;
  editingVoucher: any | null;
  tests: any[];
  title: string;
  setTitle: (value: string) => void;
  selectedTestIds: string[];
  setSelectedTestIds: (value: string[]) => void;
  selectedSpecializations: Array<{
    specializationId: string;
    levelId: string;
  }>;
  setSelectedSpecializations: (value: Array<{
    specializationId: string;
    levelId: string;
  }>) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  expiryDate: string;
  setExpiryDate: (value: string) => void;
  usageLimit: string;
  setUsageLimit: (value: string) => void;
  quantity: string;
  setQuantity: (value: string) => void;
}

export const VoucherFormFields: React.FC<VoucherFormFieldsProps> = ({
  language,
  editingVoucher,
  tests,
  title,
  setTitle,
  selectedTestIds,
  setSelectedTestIds,
  selectedSpecializations,
  setSelectedSpecializations,
  startDate,
  setStartDate,
  expiryDate,
  setExpiryDate,
  usageLimit,
  setUsageLimit,
  quantity,
  setQuantity
}) => {
  const handleTestToggle = (testId: string) => {
    const newSelectedIds = selectedTestIds.includes(testId)
      ? selectedTestIds.filter(id => id !== testId)
      : [...selectedTestIds, testId];
    
    setSelectedTestIds(newSelectedIds);
  };

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">
          {language === 'ru' ? 'Название ваучера' : 'Ваучер атауы'}
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={language === 'ru' ? 'Введите название' : 'Атауын енгізіңіз'}
          required
        />
      </div>

      <div className="space-y-4">
        <div className="font-medium">
          {language === 'ru' ? 'Выберите тесты' : 'Тесттерді таңдаңыз'}
        </div>
        <TestSelector
          tests={tests}
          selectedTestIds={selectedTestIds}
          onTestToggle={handleTestToggle}
          language={language}
        />
      </div>

      <div className="space-y-4">
        <div className="font-medium">
          {language === 'ru' ? 'Или выберите специализации и уровни' : 'Немесе мамандықтар мен деңгейлерді таңдаңыз'}
        </div>
        <SpecializationLevelSelector
          selectedSpecializations={selectedSpecializations}
          onChange={setSelectedSpecializations}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <DateField 
          id="startDate"
          label={language === 'ru' ? 'Дата начала' : 'Басталу күні'}
          value={startDate}
          onChange={setStartDate}
        />
        
        <DateField 
          id="expiryDate"
          label={language === 'ru' ? 'Дата окончания' : 'Аяқталу күні'}
          value={expiryDate}
          onChange={setExpiryDate}
        />
      </div>

      <NumberField 
        id="usageLimit"
        label={language === 'ru' ? 'Лимит использований' : 'Пайдалану шектеуі'}
        value={usageLimit}
        onChange={setUsageLimit}
        min={1}
        help={language === 'ru' ? 'Сколько раз можно использовать этот ваучер' : 'Бұл ваучерді қанша рет пайдалануға болады'}
      />

      {!editingVoucher && (
        <NumberField 
          id="quantity"
          label={language === 'ru' ? 'Количество ваучеров' : 'Ваучерлер саны'}
          value={quantity}
          onChange={setQuantity}
          min={1}
          max={100}
          help={language === 'ru' 
            ? 'Количество ваучеров для генерации (максимум 100)' 
            : 'Жасалатын ваучерлер саны (максимум 100)'
          }
        />
      )}
    </>
  );
};
