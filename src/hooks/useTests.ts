
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from 'sonner';
import { useTestsQuery } from './queries/useTestsQuery';
import { useQueryClient } from '@tanstack/react-query';
import { QueryInvalidationManager } from '@/utils/queryInvalidation';

export interface TestWithQuestionCount {
  id: string;
  title_ru: string;
  title_kz: string;
  description_ru: string | null;
  description_kz: string | null;
  time_limit: number;
  passing_score: number;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  questionCount: number;
  hasAccess: boolean;
}

export const useTests = () => {
  const { language } = useLanguage();
  const queryClient = useQueryClient();
  const invalidationManager = new QueryInvalidationManager(queryClient);
  
  const { 
    data: tests = [], 
    isLoading, 
    error, 
    refetch 
  } = useTestsQuery();

  const handleRefresh = () => {
    invalidationManager.invalidateTests();
    toast.info(language === 'ru' 
      ? 'Обновление списка тестов...' 
      : 'Тесттер тізімін жаңарту...');
  };

  return { 
    tests, 
    isLoading, 
    error, 
    handleRefresh, 
    isAuthenticated: true // This will be handled by the query hook
  };
};
