
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const deleteTest = async (testId: string, language: 'ru' | 'kz'): Promise<boolean> => {
  try {
    // First check if there are any vouchers using this test
    const { data: vouchersData, error: vouchersError } = await supabase
      .from('vouchers')
      .select('id')
      .eq('test_id', testId);
      
    if (vouchersError) throw vouchersError;
    
    if (vouchersData && vouchersData.length > 0) {
      toast.error(language === 'ru' 
        ? 'Нельзя удалить тест, так как к нему привязаны ваучеры' 
        : 'Тестке байланысты ваучерлер болғандықтан, оны жою мүмкін емес');
      return false;
    }
    
    // Check if there are any attempts for this test
    const { data: attemptsData, error: attemptsError } = await supabase
      .from('test_attempts')
      .select('id')
      .eq('test_id', testId);
      
    if (attemptsError) throw attemptsError;
    
    if (attemptsData && attemptsData.length > 0) {
      toast.error(language === 'ru' 
        ? 'Нельзя удалить тест, так как есть попытки его прохождения' 
        : 'Тест өту әрекеттері болғандықтан, оны жою мүмкін емес');
      return false;
    }
    
    // If no restrictions, first delete questions and answers
    const { data: questionsData, error: questionsError } = await supabase
      .from('questions')
      .select('id')
      .eq('test_id', testId);
      
    if (questionsError) throw questionsError;
    
    // Delete all questions and their answers
    if (questionsData && questionsData.length > 0) {
      const questionIds = questionsData.map(q => q.id);
      
      // Delete answers for these questions
      const { error: deleteAnswersError } = await supabase
        .from('answers')
        .delete()
        .in('question_id', questionIds);
        
      if (deleteAnswersError) throw deleteAnswersError;
      
      // Delete questions
      const { error: deleteQuestionsError } = await supabase
        .from('questions')
        .delete()
        .eq('test_id', testId);
        
      if (deleteQuestionsError) throw deleteQuestionsError;
    }
    
    // Finally delete the test
    const { error: deleteTestError } = await supabase
      .from('tests')
      .delete()
      .eq('id', testId);
      
    if (deleteTestError) throw deleteTestError;
    
    toast.success(language === 'ru' ? 'Тест успешно удален' : 'Тест сәтті жойылды');
    return true;
  } catch (error) {
    console.error('Error deleting test:', error);
    toast.error(language === 'ru' ? 'Ошибка при удалении теста' : 'Тестті жою кезінде қате');
    return false;
  }
};
