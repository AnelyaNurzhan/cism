
import { useOptimizedQuery } from '../common/useOptimizedQuery';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { TestService } from '@/services/testService';
import { TestWithQuestionCount } from '@/hooks/useTests';

export const useTestsQuery = () => {
  const { isAuthenticated, user, profile } = useAuth();
  const { language } = useLanguage();
  
  return useOptimizedQuery<TestWithQuestionCount[]>({
    queryKey: ['tests', user?.id || 'anonymous', profile?.role || 'user'],
    queryFn: async () => {
      if (!isAuthenticated || !user) {
        console.log('User not authenticated, skipping test fetch');
        return [];
      }
      
      console.log('Fetching tests... User authenticated:', isAuthenticated, 'User ID:', user?.id, 'Role:', profile?.role);
      
      const isAdmin = profile?.role === 'admin';
      return TestService.getTestsWithAccess(user.id, isAdmin);
    },
    dependencies: ['tests', 'vouchers'],
    invalidateOnAuth: true,
    onError: (error) => {
      console.error('Exception in tests fetching:', error);
      toast.error(language === 'ru' 
        ? 'Не удалось загрузить список тестов' 
        : 'Тестілер тізімін жүктеу мүмкін болмады');
    },
    staleTime: 1000 * 60 * 5, // 5 minutes for tests
  });
};
