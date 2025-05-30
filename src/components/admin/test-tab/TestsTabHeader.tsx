
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Plus, Upload } from 'lucide-react';

interface TestsTabHeaderProps {
  onCreateTest: () => void;
}

const TestsTabHeader: React.FC<TestsTabHeaderProps> = ({ onCreateTest }) => {
  const { language } = useLanguage();

  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">
        {language === 'ru' ? 'Управление тестами' : 'Тесттерді басқару'}
      </h2>
      <div className="flex flex-wrap gap-2">
        <button 
          onClick={onCreateTest}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light transition-colors flex items-center"
        >
          <Plus size={16} className="mr-2" />
          {language === 'ru' ? 'Создать тест' : 'Тест жасау'}
        </button>
        <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center">
          <Upload size={16} className="mr-2" />
          {language === 'ru' ? 'Импорт' : 'Импорт'}
        </button>
      </div>
    </div>
  );
};

export default TestsTabHeader;
