
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export interface Level {
  id: string;
  level_number: number;
  name_ru: string;
  name_kz: string;
}

export const useLevels = (specializationId: string | undefined) => {
  const { language } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [loadAttempt, setLoadAttempt] = useState(0);

  const {
    data: levels,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['levels', loadAttempt, specializationId, isAuthenticated],
    queryFn: async () => {
      console.log('Fetching levels for specialization:', specializationId);
      
      if (!isAuthenticated) {
        console.log('User not authenticated, skipping levels fetch');
        return [];
      }

      if (!specializationId) {
        console.log('No specialization ID provided, skipping levels fetch');
        return [];
      }
      
      try {
        console.log('Executing Supabase query for levels...');
        
        const { data, error } = await supabase
          .from('levels')
          .select('*')
          .order('level_number', { ascending: true });
        
        if (error) {
          console.error('Error fetching levels:', error);
          
          toast.error(language === 'ru' 
            ? 'Ошибка при загрузке уровней' 
            : 'Деңгейлерді жүктеу кезінде қате');
          throw error;
        }
        
        return data as Level[];
        
      } catch (err) {
        console.error('Exception in levels fetching:', err);
        toast.error(language === 'ru' 
          ? 'Не удалось загрузить уровни' 
          : 'Деңгейлерді жүктеу мүмкін болмады');
        throw err;
      }
    },
    enabled: isAuthenticated && !!specializationId,
    retry: 2,
    retryDelay: 1000,
    staleTime: 1000 * 60 * 5, // Keep data fresh for 5 minutes
  });

  const handleRefresh = () => {
    setLoadAttempt(prev => prev + 1);
    refetch();
    toast.info(language === 'ru' 
      ? 'Обновление списка уровней...' 
      : 'Деңгейлер тізімін жаңарту...');
  };

  return { levels, isLoading, error, handleRefresh, isAuthenticated };
};
