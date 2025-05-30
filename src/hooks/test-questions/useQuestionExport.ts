
import { exportQuestionsToExcel } from '@/utils/exportQuestions';
import { Question } from '@/types/database';
import { toast } from 'sonner';

/**
 * Hook for handling question export functionality
 */
export const useQuestionExport = (language: string) => {
  // Handle exporting questions to Excel
  const handleExportQuestions = (questions: Question[], testTitle: string | undefined) => {
    if (questions.length === 0) {
      toast.info(language === 'ru' ? 'Нет вопросов для экспорта' : 'Экспорттау үшін сұрақтар жоқ');
      return;
    }
    
    try {
      const fileName = exportQuestionsToExcel(
        questions, 
        testTitle || 'test',
        language
      );
      
      if (fileName) {
        toast.success(
          language === 'ru' 
            ? `Вопросы успешно экспортированы в ${fileName}` 
            : `Сұрақтар ${fileName} файлына сәтті экспортталды`
        );
      }
    } catch (error) {
      console.error('Error exporting questions:', error);
      toast.error(
        language === 'ru' 
          ? 'Ошибка при экспорте вопросов' 
          : 'Сұрақтарды экспорттау кезінде қате'
      );
    }
  };

  return {
    handleExportQuestions
  };
};
