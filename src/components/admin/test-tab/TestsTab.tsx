
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TestFormModal } from '../TestFormModal';
import TestsTabHeader from './TestsTabHeader';
import TestSearchBar from './TestSearchBar';
import TestsTable from './TestsTable';
import { TestType } from './types';
import { deleteTest } from './TestDeleteHandler';
import { TablePagination } from '@/components/common/TablePagination';

interface TestsTabProps {
  tests: TestType[];
  onTestsUpdated: () => Promise<void>;
}

export const TestsTab: React.FC<TestsTabProps> = ({ tests, onTestsUpdated }) => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateTestModal, setShowCreateTestModal] = useState(false);
  const [editingTest, setEditingTest] = useState<TestType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredTests = tests.filter(test =>
    test.title_ru?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.title_kz?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.description_ru?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.description_kz?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredTests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTests = filteredTests.slice(startIndex, startIndex + itemsPerPage);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEditTest = (test: TestType) => {
    setEditingTest(test);
    setShowCreateTestModal(true);
  };

  const handleDeleteTest = async (testId: string) => {
    if (window.confirm(language === 'ru' 
      ? 'Вы уверены, что хотите удалить этот тест?' 
      : 'Осы тестті жойғыңыз келетініне сенімдісіз бе?')) {
      const success = await deleteTest(testId, language as 'ru' | 'kz');
      if (success) {
        onTestsUpdated();
      }
    }
  };

  return (
    <div>
      <TestsTabHeader 
        onCreateTest={() => {
          setEditingTest(null);
          setShowCreateTestModal(true);
        }}
      />

      <TestSearchBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <TestsTable 
        tests={paginatedTests}
        onEditTest={handleEditTest}
        onDeleteTest={handleDeleteTest}
      />
      
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <TestFormModal 
        open={showCreateTestModal} 
        onOpenChange={setShowCreateTestModal} 
        onTestCreated={onTestsUpdated}
        editingTest={editingTest}
      />
    </div>
  );
};
