
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TestListEmptyProps {
  handleRefresh: () => void;
}

const TestListEmpty: React.FC<TestListEmptyProps> = ({ handleRefresh }) => {
  const { language } = useLanguage();
  
  return (
    <div className="text-center py-10">
      <h2 className="text-2xl font-bold mb-4">
        {language === 'ru' ? 'Тесты не найдены' : 'Тестілер табылмады'}
      </h2>
      <p className="text-gray-500">
        {language === 'ru' 
          ? 'В данный момент доступных тестов нет.' 
          : 'Қазіргі уақытта қол жетімді тестілер жоқ.'}
      </p>
      <Button
        onClick={handleRefresh}
        className="flex items-center gap-2 mt-4"
      >
        <RefreshCw size={18} />
        {language === 'ru' ? 'Обновить' : 'Жаңарту'}
      </Button>
    </div>
  );
};

export default TestListEmpty;
