
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Question } from '@/types/database';
import { toast } from 'sonner';
import { importQuestionsFromExcel, saveImportedQuestions } from '@/utils/importQuestions';

/**
 * Hook for handling question import functionality
 */
export const useQuestionImport = (testId: string | undefined, language: string) => {
  const [importedQuestions, setImportedQuestions] = useState<Question[]>([]);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [importLoading, setImportLoading] = useState(false);

  // Handle importing questions from Excel
  const handleImportQuestions = async (file: File) => {
    setImportLoading(true);
    
    try {
      if (!testId) {
        throw new Error(language === 'ru' ? 'ID теста не указан' : 'Тест идентификаторы көрсетілмеген');
      }
      
      console.log('Starting import process for test:', testId);
      const questions = await importQuestionsFromExcel(file, testId, language);
      
      if (questions.length > 0) {
        console.log(`Successfully parsed ${questions.length} questions from Excel`);
        setImportedQuestions(questions);
        setShowImportDialog(true);
      } else {
        toast.error(
          language === 'ru' 
            ? 'Файл не содержит вопросов' 
            : 'Файлда сұрақтар жоқ'
        );
      }
    } catch (error) {
      console.error('Import error:', error);
      toast.error((error as Error).message);
    } finally {
      setImportLoading(false);
    }
  };

  // Handle confirming import
  const handleConfirmImport = async () => {
    setImportLoading(true);
    
    try {
      if (!testId) throw new Error('Test ID is missing');
      
      console.log(`Starting to save ${importedQuestions.length} questions to test ${testId}`);
      const success = await saveImportedQuestions(importedQuestions, testId, supabase, language);
      
      if (success) {
        toast.success(
          language === 'ru' 
            ? `Успешно импортировано ${importedQuestions.length} вопросов` 
            : `${importedQuestions.length} сұрақтар сәтті импортталды`
        );
        
        setShowImportDialog(false);
        
        // Reload the page to refresh questions
        window.location.reload();
      }
    } catch (error) {
      console.error('Error saving imported questions:', error);
      toast.error(
        language === 'ru' 
          ? 'Ошибка при сохранении импортированных вопросов' 
          : 'Импортталған сұрақтарды сақтау кезінде қате'
      );
    } finally {
      setImportLoading(false);
    }
  };

  return {
    importedQuestions,
    showImportDialog,
    setShowImportDialog,
    importLoading,
    handleImportQuestions,
    handleConfirmImport
  };
};
