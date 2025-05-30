
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TestCard from '@/components/TestCard';
import { TestListPagination } from './TestListPagination';
import { SpecializationTest } from '@/hooks/useSpecializationTests';

interface TestListContainerProps {
  tests: SpecializationTest[];
  handleRefresh: () => void;
}

const TestListContainer: React.FC<TestListContainerProps> = ({ tests, handleRefresh }) => {
  const { language } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 3x3 grid

  console.log('=== TestListContainer DEBUG ===');
  console.log('Tests received:', tests);
  console.log('Tests count:', tests.length);
  console.log('Current language:', language);

  // Calculate pagination
  const totalPages = Math.ceil(tests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTests = tests.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRefreshClick = () => {
    console.log('TestListContainer: Refresh button clicked');
    handleRefresh();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {language === 'ru' ? 'Доступные тесты' : 'Қол жетімді тесттер'}
        </h1>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={handleRefreshClick}
        >
          <RefreshCw size={16} />
          {language === 'ru' ? 'Обновить' : 'Жаңарту'}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedTests.map((test, index) => {
          console.log(`Rendering test ${index + 1}:`, {
            id: test.id,
            title_ru: test.title_ru,
            title_kz: test.title_kz,
            hasAccess: test.hasAccess,
            questionCount: test.questionCount,
            duration: test.time_limit
          });
          
          return (
            <TestCard 
              key={test.id}
              id={test.id}
              title={{ ru: test.title_ru, kz: test.title_kz }}
              description={{ ru: test.description_ru || null, kz: test.description_kz || null }}
              duration={test.time_limit}
              questions={test.questionCount}
              hasAccess={test.hasAccess}
            />
          );
        })}
      </div>

      {totalPages > 1 && (
        <TestListPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default TestListContainer;
