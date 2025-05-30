
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search } from 'lucide-react';

interface TestSearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const TestSearchBar: React.FC<TestSearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  const { language } = useLanguage();

  return (
    <div className="mb-6 relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search size={18} className="text-gray-500" />
      </div>
      <input
        type="text"
        placeholder={language === 'ru' ? 'Поиск тестов...' : 'Тесттерді іздеу...'}
        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default TestSearchBar;
