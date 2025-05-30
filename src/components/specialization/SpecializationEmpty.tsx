
import React from 'react';
import { FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface SpecializationEmptyProps {
  handleRefresh: () => void;
}

const SpecializationEmpty: React.FC<SpecializationEmptyProps> = ({ handleRefresh }) => {
  const { language } = useLanguage();
  
  return (
    <div className="container mx-auto py-8">
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="flex justify-center mb-4">
          <FileQuestion size={48} className="text-gray-400" />
        </div>
        
        <h2 className="text-2xl font-bold mb-4">
          {language === 'ru' ? 'Нет доступных специализаций' : 'Қол жетімді мамандықтар жоқ'}
        </h2>
        
        <p className="text-gray-600 mb-6">
          {language === 'ru' 
            ? 'В настоящее время нет доступных специализаций.' 
            : 'Қазіргі уақытта қол жетімді мамандықтар жоқ.'
          }
        </p>
        
        <Button onClick={handleRefresh}>
          {language === 'ru' ? 'Обновить список' : 'Тізімді жаңарту'}
        </Button>
      </div>
    </div>
  );
};

export default SpecializationEmpty;
