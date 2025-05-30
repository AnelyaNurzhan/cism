
import { useOptimizedQuery } from '../common/useOptimizedQuery';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { TestService } from '@/services/testService';
import { SpecializationTest } from '@/hooks/useSpecializationTests';

interface UseSpecializationTestsQueryProps {
  specializationId: string | undefined;
  levelId: string | undefined;
}

export const useSpecializationTestsQuery = ({ 
  specializationId, 
  levelId 
}: UseSpecializationTestsQueryProps) => {
  const { isAuthenticated, user, profile } = useAuth();
  const { language } = useLanguage();
  
  return useOptimizedQuery<SpecializationTest[]>({
    queryKey: ['specialization-tests', specializationId || '', levelId || '', user?.id || 'anonymous'],
    queryFn: async (): Promise<SpecializationTest[]> => {
      if (!isAuthenticated || !user || !specializationId || !levelId) {
        console.log('Missing required parameters for specialization tests fetch');
        return [];
      }
      
      console.log('Fetching tests for specialization:', specializationId, 'and level:', levelId);
      
      const isAdmin = profile?.role === 'admin';
      return TestService.getSpecializationTests(specializationId, levelId, user.id, isAdmin);
    },
    dependencies: ['specialization-tests', 'tests', 'vouchers'],
    enabled: !!specializationId && !!levelId,
    onError: (error) => {
      console.error('Exception in specialization tests fetching:', error);
      toast.error(language === 'ru' 
        ? 'Не удалось загрузить список тестов для выбранной специализации' 
        : 'Таңдалған мамандық бойынша тесттер тізімін жүктеу мүмкін болмады');
    }
  });
};
