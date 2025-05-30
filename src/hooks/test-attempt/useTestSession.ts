
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { QuestionFromDB } from '@/hooks/useTestResult';

/**
 * Хук для загрузки базовой информации о тесте и вопросах
 */
export const useTestSession = (testId: string | undefined) => {
  // Fetch test details
  const { data: test, isLoading: testLoading } = useQuery({
    queryKey: ['test', testId],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('tests')
          .select('*')
          .eq('id', testId)
          .single();
          
        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Error fetching test:', error);
        throw error;
      }
    },
    enabled: !!testId,
  });

  // Fetch questions for this test
  const { data: questions, isLoading: questionsLoading } = useQuery({
    queryKey: ['test-questions', testId],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('questions')
          .select('*, answers(*)')
          .eq('test_id', testId)
          .order('order_number', { ascending: true });
          
        if (error) throw error;
        return data as QuestionFromDB[];
      } catch (error) {
        console.error('Error fetching questions:', error);
        throw error;
      }
    },
    enabled: !!testId,
  });

  return {
    test,
    questions,
    isLoading: testLoading || questionsLoading,
  };
};
