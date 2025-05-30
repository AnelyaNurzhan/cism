
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useDashboardData = () => {
  const { user, isAuthenticated } = useAuth();

  // Fetch user's test attempts
  const { data: testHistory = [], isLoading: historyLoading } = useQuery({
    queryKey: ['user-test-history', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      console.log('Fetching test history for user:', user.id);
      
      const { data, error } = await supabase
        .from('test_attempts')
        .select(`
          id,
          score,
          passed,
          created_at,
          end_time,
          tests!inner(
            id,
            title_ru,
            title_kz,
            passing_score
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching test history:', error);
        throw error;
      }

      console.log('Test history fetched:', data);

      return data?.map(attempt => ({
        id: attempt.id,
        name: {
          ru: attempt.tests.title_ru,
          kz: attempt.tests.title_kz
        },
        date: attempt.created_at,
        score: attempt.score || 0,
        maxScore: attempt.tests.passing_score,
        passed: attempt.passed || false
      })) || [];
    },
    enabled: isAuthenticated && !!user?.id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    testHistory,
    isLoading: historyLoading,
  };
};
