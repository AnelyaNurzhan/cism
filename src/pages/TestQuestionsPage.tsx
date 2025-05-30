
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Question } from '@/types/database';
import QuestionsTable from '@/components/test-questions/QuestionsTable';
import AddEditQuestionModal from '@/components/test-questions/AddEditQuestionModal';
import LoadingState from '@/components/test-questions/LoadingState';
import NotFoundState from '@/components/test-questions/NotFoundState';
import PageHeader from '@/components/test-questions/PageHeader';
import ActionButtons from '@/components/test-questions/ActionButtons';
import ImportDialog from '@/components/test-questions/ImportDialog';
import { TablePagination } from '@/components/common/TablePagination';
import { useTestQuestions } from '@/hooks/test-questions';

const TestQuestionsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const {
    isLoading,
    test,
    questions,
    importedQuestions,
    showImportDialog,
    setShowImportDialog,
    importLoading,
    handleSaveQuestion,
    handleDeleteQuestion,
    handleImportQuestions,
    handleConfirmImport,
    handleExportQuestions
  } = useTestQuestions(id, language);

  const handleAddQuestion = () => {
    setEditingQuestion(null);
    setShowQuestionModal(true);
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    setShowQuestionModal(true);
  };

  // Calculate pagination
  const totalPages = Math.ceil(questions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedQuestions = questions.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return <LoadingState language={language} />;
  }

  if (!test) {
    return <NotFoundState language={language} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader test={test} language={language} />
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          {language === 'ru' ? 'Управление вопросами' : 'Сұрақтарды басқару'}
        </h2>
        <ActionButtons 
          onAdd={handleAddQuestion} 
          onImport={handleImportQuestions}
          onExport={handleExportQuestions}
          language={language}
        />
      </div>

      <QuestionsTable
        questions={paginatedQuestions}
        language={language}
        onEdit={handleEditQuestion}
        onDelete={handleDeleteQuestion}
      />

      {totalPages > 1 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {showQuestionModal && (
        <AddEditQuestionModal
          isOpen={showQuestionModal}
          onClose={() => setShowQuestionModal(false)}
          onSave={handleSaveQuestion}
          editingQuestion={editingQuestion}
          language={language}
        />
      )}
      
      <ImportDialog 
        isOpen={showImportDialog}
        onClose={() => setShowImportDialog(false)}
        onConfirm={handleConfirmImport}
        importedQuestions={importedQuestions}
        isLoading={importLoading}
        language={language}
      />
    </div>
  );
};

export default TestQuestionsPage;
