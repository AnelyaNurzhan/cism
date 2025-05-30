
import { supabase } from '@/integrations/supabase/client';
import { TestWithQuestionCount } from '@/hooks/useTests';

export class AdminTestService {
  static async getTestsWithAccess(userId: string): Promise<TestWithQuestionCount[]> {
    console.log('AdminTestService.getTestsWithAccess - userId:', userId);
    
    // Admin query - get all tests with question counts
    const { data: testsData, error } = await supabase
      .from('tests')
      .select(`
        id,
        title_ru,
        title_kz,
        description_ru,
        description_kz,
        time_limit,
        passing_score,
        created_by,
        created_at,
        updated_at,
        is_active
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Admin tests query error:', error);
      throw error;
    }

    // Get question counts separately for better performance
    const testIds = testsData?.map(test => test.id) || [];
    const { data: questionsData, error: questionsError } = await supabase
      .from('questions')
      .select('test_id')
      .in('test_id', testIds);

    if (questionsError) {
      console.error('Questions count query error:', questionsError);
      throw questionsError;
    }

    // Count questions by test
    const questionCountMap = new Map<string, number>();
    questionsData?.forEach(question => {
      const count = questionCountMap.get(question.test_id) || 0;
      questionCountMap.set(question.test_id, count + 1);
    });

    return testsData?.map(test => ({
      ...test,
      questionCount: questionCountMap.get(test.id) || 0,
      hasAccess: true
    })) || [];
  }
}
