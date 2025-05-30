
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Question } from '@/types/database';
import { QuestionFormData } from '@/types/questions';
import { toast } from 'sonner';

/**
 * Hook for managing question CRUD operations
 */
export const useQuestionManagement = (testId: string | undefined, language: string) => {
  const [questions, setQuestions] = useState<Question[]>([]);

  // Handle saving a question (add or edit)
  const handleSaveQuestion = async (formData: QuestionFormData) => {
    if (!testId) {
      toast.error(language === 'ru' ? 'ID теста отсутствует' : 'Тест идентификаторы жоқ');
      return false;
    }
    
    try {
      // Determine if this is an edit or a new question
      const isEdit = formData.id !== undefined;
      
      // For new questions, get the current count to determine the next order number
      let orderNumber = 1;
      if (!isEdit) {
        const { count } = await supabase
          .from('questions')
          .select('*', { count: 'exact', head: true })
          .eq('test_id', testId);
          
        orderNumber = (count || 0) + 1;
      }

      // Prepare question data
      const questionData = {
        test_id: testId,
        question_text_ru: formData.text,
        question_text_kz: formData.textKz,
        question_type: formData.type === 'single' ? 'single_choice' : 'multiple_choice',
        order_number: isEdit ? formData.orderNumber : orderNumber
      };

      let questionId;
      
      // Insert or update question
      if (isEdit && formData.id) {
        const { data, error } = await supabase
          .from('questions')
          .update(questionData)
          .eq('id', formData.id)
          .select();
          
        if (error) throw error;
        questionId = formData.id;
      } else {
        const { data, error } = await supabase
          .from('questions')
          .insert(questionData)
          .select();
          
        if (error) throw error;
        questionId = data[0].id;
      }

      // If editing, delete all existing answers for the question
      if (isEdit) {
        const { error } = await supabase
          .from('answers')
          .delete()
          .eq('question_id', questionId);
          
        if (error) throw error;
      }

      // Insert answers
      const answersData = formData.options.map((option: any, index: number) => ({
        question_id: questionId,
        answer_text_ru: option.text,
        answer_text_kz: option.textKz,
        is_correct: formData.correctAnswers.includes(index + 1)
      }));

      const { error: answerError } = await supabase
        .from('answers')
        .insert(answersData);
        
      if (answerError) throw answerError;

      // Notify success
      toast.success(
        isEdit 
          ? (language === 'ru' ? 'Вопрос обновлен' : 'Сұрақ жаңартылды') 
          : (language === 'ru' ? 'Вопрос добавлен' : 'Сұрақ қосылды')
      );
      
      // Refresh questions list
      window.location.reload();
      return true;
    } catch (error) {
      console.error('Error saving question:', error);
      toast.error(language === 'ru' ? 'Ошибка при сохранении вопроса' : 'Сұрақты сақтау кезінде қате');
      return false;
    }
  };

  // Handle deleting a question
  const handleDeleteQuestion = async (questionId: string) => {
    if (window.confirm(language === 'ru' 
      ? 'Вы уверены, что хотите удалить этот вопрос?' 
      : 'Осы сұрақты жойғыңыз келетініне сенімдісіз бе?')) {
      try {
        // First delete all answers for the question
        const { error: answersError } = await supabase
          .from('answers')
          .delete()
          .eq('question_id', questionId);
          
        if (answersError) throw answersError;

        // Then delete the question
        const { error: questionError } = await supabase
          .from('questions')
          .delete()
          .eq('id', questionId);
          
        if (questionError) throw questionError;

        // Update the UI
        setQuestions(questions.filter(q => q.id !== questionId));
        toast.success(language === 'ru' ? 'Вопрос удален' : 'Сұрақ жойылды');
        return true;
      } catch (error) {
        console.error('Error deleting question:', error);
        toast.error(language === 'ru' ? 'Ошибка при удалении вопроса' : 'Сұрақты жою кезінде қате');
        return false;
      }
    }
    return false;
  };

  return {
    questions,
    setQuestions,
    handleSaveQuestion,
    handleDeleteQuestion
  };
};
