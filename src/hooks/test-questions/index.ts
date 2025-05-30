
import { useQuestionManagement } from './useQuestionManagement';
import { useQuestionImport } from './useQuestionImport';
import { useQuestionExport } from './useQuestionExport';
import { useTestData } from './useTestData';

/**
 * Combined hook for managing test questions
 */
export const useTestQuestions = (testId: string | undefined, language: string) => {
  const { 
    isLoading, 
    test, 
    questions, 
    setQuestions 
  } = useTestData(testId, language);

  const { 
    handleSaveQuestion, 
    handleDeleteQuestion 
  } = useQuestionManagement(testId, language);

  const { 
    importedQuestions,
    showImportDialog,
    setShowImportDialog,
    importLoading,
    handleImportQuestions,
    handleConfirmImport
  } = useQuestionImport(testId, language);

  const { handleExportQuestions } = useQuestionExport(language);

  // Set up the composed hook
  return {
    // Test data
    isLoading,
    test,
    questions,

    // Question management
    handleSaveQuestion,
    handleDeleteQuestion,

    // Import
    importedQuestions,
    showImportDialog,
    setShowImportDialog,
    importLoading,
    handleImportQuestions,
    handleConfirmImport,

    // Export
    handleExportQuestions: () => handleExportQuestions(questions, 
      language === 'ru' ? test?.title_ru : test?.title_kz)
  };
};
