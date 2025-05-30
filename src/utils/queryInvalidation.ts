
import { QueryClient } from '@tanstack/react-query';

export class QueryInvalidationManager {
  constructor(private queryClient: QueryClient) {}

  invalidateTests() {
    this.queryClient.invalidateQueries({ queryKey: ['tests'] });
    this.queryClient.invalidateQueries({ queryKey: ['specialization-tests'] });
  }

  invalidateVouchers() {
    this.queryClient.invalidateQueries({ queryKey: ['vouchers'] });
    // Invalidate tests too since vouchers affect test access
    this.invalidateTests();
  }

  invalidateUserData() {
    this.queryClient.invalidateQueries({ queryKey: ['user'] });
    this.queryClient.invalidateQueries({ queryKey: ['profile'] });
  }

  invalidateTestQuestions(testId: string) {
    this.queryClient.invalidateQueries({ queryKey: ['test-questions', testId] });
    this.queryClient.invalidateQueries({ queryKey: ['test', testId] });
  }

  prefetchTests(userId: string, isAdmin: boolean) {
    return this.queryClient.prefetchQuery({
      queryKey: ['tests', userId, isAdmin ? 'admin' : 'user'],
      queryFn: () => import('@/services/testService').then(({ TestService }) => 
        TestService.getTestsWithAccess(userId, isAdmin)
      ),
      staleTime: 1000 * 60 * 5
    });
  }
}
