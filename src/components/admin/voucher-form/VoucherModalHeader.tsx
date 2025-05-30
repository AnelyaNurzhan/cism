
import React from 'react';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/LanguageContext';

interface VoucherModalHeaderProps {
  isEditing: boolean;
}

export const VoucherModalHeader: React.FC<VoucherModalHeaderProps> = ({
  isEditing,
}) => {
  const { language } = useLanguage();

  return (
    <DialogHeader>
      <DialogTitle className="text-xl font-semibold">
        {isEditing 
          ? (language === 'ru' ? 'Редактировать ваучер' : 'Ваучерді өзгерту') 
          : (language === 'ru' ? 'Создать ваучер' : 'Ваучер жасау')}
      </DialogTitle>
      <p className="text-sm text-muted-foreground mt-1">
        {language === 'ru' 
          ? 'Заполните форму ниже, чтобы создать новый ваучер' 
          : 'Жаңа ваучер жасау үшін төмендегі пішінді толтырыңыз'}
      </p>
    </DialogHeader>
  );
};
