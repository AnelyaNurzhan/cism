
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export interface Specialization {
  id: string;
  name_ru: string;
  name_kz: string;
  created_at: string;
  updated_at: string;
}

export const useSpecializations = () => {
  const { language } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [loadAttempt, setLoadAttempt] = useState(0);
  
  const { 
    data: specializations, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['specializations', loadAttempt, isAuthenticated],
    queryFn: async () => {
      console.log('Fetching specializations... User authenticated:', isAuthenticated);
      
      if (!isAuthenticated) {
        console.log('User not authenticated, skipping specializations fetch');
        return [];
      }
      
      try {
        console.log('Executing Supabase query for specializations...');
        
        const { data, error } = await supabase
          .from('specializations')
          .select('*')
          .order('name_ru', { ascending: true });
        
        if (error) {
          console.error('Error fetching specializations:', error);
          
          toast.error(language === 'ru' 
            ? 'Ошибка при загрузке специализаций' 
            : 'Мамандықтарды жүктеу кезінде қате');
          throw error;
        }
        
        return data as Specialization[];
        
      } catch (err) {
        console.error('Exception in specializations fetching:', err);
        toast.error(language === 'ru' 
          ? 'Не удалось загрузить список специализаций' 
          : 'Мамандықтар тізімін жүктеу мүмкін болмады');
        throw err;
      }
    },
    enabled: isAuthenticated,
    retry: 2,
    retryDelay: 1000,
    staleTime: 1000 * 60 * 5, // Keep data fresh for 5 minutes
  });

  const handleRefresh = () => {
    setLoadAttempt(prev => prev + 1);
    refetch();
    toast.info(language === 'ru' 
      ? 'Обновление списка специализаций...' 
      : 'Мамандықтар тізімін жаңарту...');
  };

  return { specializations, isLoading, error, handleRefresh, isAuthenticated };
};
