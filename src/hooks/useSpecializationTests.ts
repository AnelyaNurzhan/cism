
import { useQuery } from '@tanstack/react-query';
import { TestService } from '@/services/testService';
import { useAuth } from '@/contexts/AuthContext';

export interface SpecializationTest {
  id: string;
  title_ru: string;
  title_kz: string;
  description_ru?: string;
  description_kz?: string;
  time_limit: number;
  passing_score: number;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  questionCount: number;
  hasAccess: boolean;
}

export const useSpecializationTests = (specializationId?: string, levelId?: string) => {
  const { user, isAuthenticated, profile } = useAuth();

  console.log('=== useSpecializationTests DEBUG ===');
  console.log('Hook called with params:', { specializationId, levelId });
  console.log('Auth state:', { 
    isAuthenticated, 
    userId: user?.id, 
    userRole: profile?.role 
  });

  // Early return if required parameters are missing
  const shouldFetch = Boolean(
    specializationId && 
    levelId && 
    isAuthenticated && 
    user?.id && 
    profile?.role !== undefined
  );

  console.log('Should fetch data:', shouldFetch);

  const query = useQuery({
    queryKey: ['specialization-tests', specializationId, levelId, user?.id],
    queryFn: async (): Promise<SpecializationTest[]> => {
      console.log('=== QUERY FUNCTION EXECUTING ===');
      
      if (!specializationId || !levelId || !user?.id || profile?.role === undefined) {
        console.log('Missing required parameters for specialization tests fetch');
        console.log('Parameters check:', {
          specializationId: !!specializationId,
          levelId: !!levelId,
          userId: !!user?.id,
          profileRole: profile?.role
        });
        return [];
      }

      console.log('Fetching tests for specialization:', specializationId, 'and level:', levelId);
      console.log('User details:', { id: user.id, role: profile?.role });
      
      const isAdmin = profile?.role === 'admin';
      console.log('Is admin user:', isAdmin);
      
      const result = await TestService.getSpecializationTests(specializationId, levelId, user.id, isAdmin);
      console.log('TestService returned:', result);
      console.log('Number of tests:', result.length);
      
      return result;
    },
    enabled: shouldFetch,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });

  const handleRefresh = () => {
    console.log('useSpecializationTests: Refresh triggered');
    query.refetch();
  };

  console.log('Query result:', {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError
  });

  return {
    tests: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    handleRefresh,
    isAuthenticated
  };
};
