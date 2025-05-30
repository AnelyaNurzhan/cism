
import { supabase } from '@/integrations/supabase/client';
import { SpecializationTest } from '@/hooks/useSpecializationTests';

export class SpecializationTestService {
  static async getSpecializationTests(
    specializationId: string, 
    levelId: string, 
    userId: string, 
    isAdmin: boolean
  ): Promise<SpecializationTest[]> {
    console.log('SpecializationTestService.getSpecializationTests - params:', { specializationId, levelId, userId, isAdmin });
    
    // Get tests for specialization and level
    const { data: testSpecializations, error: testsError } = await supabase
      .from('test_specializations')
      .select(`
        test_id,
        tests:test_id (
          id,
          title_ru,
          title_kz,
          description_ru,
          description_kz,
          time_limit,
          is_active,
          passing_score,
          created_by,
          created_at,
          updated_at
        )
      `)
      .eq('specialization_id', specializationId)
      .eq('level_id', levelId);
  
    if (testsError) {
      console.error('Test specializations query error:', testsError);
      throw testsError;
    }
    
    const validTests = testSpecializations
      ?.filter(item => item.tests && item.tests.is_active !== false)
      .map(item => item.tests) || [];
      
    if (validTests.length === 0) {
      return [];
    }
    
    const testIds = validTests.map(test => test.id);
    
    // Get question counts for tests
    const { data: questionsData, error: questionsError } = await supabase
      .from('questions')
      .select('test_id')
      .in('test_id', testIds);
    
    if (questionsError) {
      console.error('Questions query error:', questionsError);
      throw questionsError;
    }
    
    // Get voucher access for user (if not admin)
    let accessibleTestIds = new Set<string>();
    
    if (isAdmin) {
      accessibleTestIds = new Set(testIds);
    } else {
      // Get user's activated vouchers
      const { data: userActivations, error: activationsError } = await supabase
        .from('user_voucher_activations')
        .select(`
          voucher_id,
          vouchers!inner(
            id,
            expiry_date,
            start_date
          )
        `)
        .eq('user_id', userId);
      
      if (activationsError) {
        console.error('User voucher activations query error:', activationsError);
        throw activationsError;
      }

      if (userActivations && userActivations.length > 0) {
        // Filter valid vouchers
        const now = new Date();
        const validVoucherIds = userActivations
          .filter(activation => {
            const voucher = activation.vouchers;
            if (voucher.expiry_date && new Date(voucher.expiry_date) < now) return false;
            if (voucher.start_date && new Date(voucher.start_date) > now) return false;
            return true;
          })
          .map(activation => activation.voucher_id);

        if (validVoucherIds.length > 0) {
          // Check direct test access
          const { data: voucherTests, error: voucherTestsError } = await supabase
            .from('voucher_tests')
            .select('test_id')
            .in('voucher_id', validVoucherIds)
            .in('test_id', testIds);
          
          if (voucherTestsError) {
            console.error('Voucher tests query error:', voucherTestsError);
            throw voucherTestsError;
          }
          
          voucherTests?.forEach(vt => accessibleTestIds.add(vt.test_id));

          // Check specialization access
          const { data: voucherSpecs, error: voucherSpecsError } = await supabase
            .from('voucher_specializations')
            .select('specialization_id, level_id')
            .in('voucher_id', validVoucherIds)
            .eq('specialization_id', specializationId)
            .eq('level_id', levelId);

          if (!voucherSpecsError && voucherSpecs && voucherSpecs.length > 0) {
            // If voucher has access to this specialization/level, add all tests
            testIds.forEach(testId => accessibleTestIds.add(testId));
          }
        }
      }
    }
    
    // Count questions by test
    const questionCountMap = new Map<string, number>();
    questionsData?.forEach(question => {
      const count = questionCountMap.get(question.test_id) || 0;
      questionCountMap.set(question.test_id, count + 1);
    });
    
    return validTests.map(test => ({
      ...test,
      questionCount: questionCountMap.get(test.id) || 0,
      hasAccess: isAdmin || accessibleTestIds.has(test.id),
      created_by: test.created_by || '',
      is_active: test.is_active
    }));
  }
}
