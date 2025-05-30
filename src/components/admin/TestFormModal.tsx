
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import TestForm from './test-form/TestForm';

// Form interface for test creation
export interface TestFormData {
  title_ru: string;
  title_kz: string;
  description_ru: string;
  description_kz: string;
  category: string;
  difficulty: string;
  time_limit: number;
  passing_score: number;
  status: string;
}

interface TestFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTestCreated: () => Promise<void>;
  editingTest?: any | null;
}

export const TestFormModal: React.FC<TestFormModalProps> = ({ 
  open, 
  onOpenChange,
  onTestCreated,
  editingTest = null
}) => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${isMobile ? 'w-[95%] max-w-[95%] p-3' : 'w-full max-w-3xl'} max-h-[90vh] overflow-y-auto`}>
        <DialogHeader>
          <DialogTitle>
            {editingTest 
              ? (language === 'ru' ? 'Редактирование теста' : 'Тестті өңдеу') 
              : (language === 'ru' ? 'Создание нового теста' : 'Жаңа тест жасау')}
          </DialogTitle>
        </DialogHeader>
        <TestForm 
          onClose={() => onOpenChange(false)}
          onTestCreated={onTestCreated}
          editingTest={editingTest}
        />
      </DialogContent>
    </Dialog>
  );
};
