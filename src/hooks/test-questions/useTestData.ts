
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Question } from '@/types/database';
import { toast } from 'sonner';

/**
 * Hook for fetching test and question data
 */
export const useTestData = (testId: string | undefined, language: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [test, setTest] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  // Fetch test and questions data
  useEffect(() => {
    const fetchTestData = async () => {
      if (!testId) return;
      
      setIsLoading(true);
      try {
        // Fetch test data
        const { data: testData, error: testError } = await supabase
          .from('tests')
          .select('*')
          .eq('id', testId)
          .single();

        if (testError) {
          console.error('Error fetching test:', testError);
          toast.error(language === 'ru' ? 'Ошибка загрузки теста' : 'Тестті жүктеу кезінде қате');
          return;
        }

        if (testData) {
          setTest(testData);
        }

        // Fetch questions
        const { data: questionsData, error: questionsError } = await supabase
          .from('questions')
          .select('*')
          .eq('test_id', testId)
          .order('order_number', { ascending: true });

        if (questionsError) {
          console.error('Error fetching questions:', questionsError);
          toast.error(language === 'ru' ? 'Ошибка загрузки вопросов' : 'Сұрақтарды жүктеу кезінде қате');
          return;
        }

        // For each question, fetch answers
        const questionsWithAnswers = await Promise.all((questionsData || []).map(async (question) => {
          const { data: answersData, error: answersError } = await supabase
            .from('answers')
            .select('*')
            .eq('question_id', question.id);

          if (answersError) {
            console.error('Error fetching answers:', answersError);
            return null;
          }

          // Transform DB question to our format
          const options = answersData.map((answer, index) => ({
            id: index + 1,
            text: answer.answer_text_ru,
            textKz: answer.answer_text_kz,
            isCorrect: answer.is_correct
          }));

          return {
            id: question.id,
            text: question.question_text_ru,
            textKz: question.question_text_kz,
            type: question.question_type === 'single_choice' ? 'single' : 'multiple',
            options,
            correctAnswers: answersData
              .filter(answer => answer.is_correct)
              .map((_, index) => index + 1),
            points: 1, // You might want to store this in the database
            orderNumber: question.order_number
          };
        }));

        setQuestions(questionsWithAnswers.filter(Boolean) as Question[]);
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error(language === 'ru' ? 'Ошибка загрузки данных' : 'Деректерді жүктеу кезінде қате');
      } finally {
        setIsLoading(false);
      }
    };

    if (testId) {
      fetchTestData();
    }
  }, [testId, language]);

  return {
    isLoading,
    test,
    questions,
    setQuestions
  };
};
