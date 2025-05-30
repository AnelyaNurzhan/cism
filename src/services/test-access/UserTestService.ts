
import { supabase } from '@/integrations/supabase/client';
import { TestWithQuestionCount } from '@/hooks/useTests';

export class UserTestService {
  static async getTestsWithAccess(userId: string): Promise<TestWithQuestionCount[]> {
    console.log('UserTestService.getTestsWithAccess - userId:', userId);
    
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

    if (!userActivations || userActivations.length === 0) {
      return [];
    }

    // Filter valid vouchers (not expired and started)
    const now = new Date();
    const validVoucherIds = userActivations
      .filter(activation => {
        const voucher = activation.vouchers;
        if (voucher.expiry_date && new Date(voucher.expiry_date) < now) return false;
        if (voucher.start_date && new Date(voucher.start_date) > now) return false;
        return true;
      })
      .map(activation => activation.voucher_id);

    if (validVoucherIds.length === 0) {
      return [];
    }

    // Get tests accessible via direct voucher-test associations
    const { data: voucherTests, error: voucherTestsError } = await supabase
      .from('voucher_tests')
      .select('test_id')
      .in('voucher_id', validVoucherIds);

    if (voucherTestsError) {
      console.error('Voucher tests query error:', voucherTestsError);
      throw voucherTestsError;
    }

    let accessibleTestIds = new Set(voucherTests?.map(vt => vt.test_id) || []);

    // Get tests accessible via voucher specializations
    const { data: voucherSpecs, error: voucherSpecsError } = await supabase
      .from('voucher_specializations')
      .select('specialization_id, level_id')
      .in('voucher_id', validVoucherIds);

    if (voucherSpecsError) {
      console.error('Voucher specializations query error:', voucherSpecsError);
      throw voucherSpecsError;
    }

    if (voucherSpecs && voucherSpecs.length > 0) {
      // Get all test specializations that match voucher specializations
      for (const voucherSpec of voucherSpecs) {
        const { data: matchingTestSpecs, error: testSpecsError } = await supabase
          .from('test_specializations')
          .select('test_id')
          .eq('specialization_id', voucherSpec.specialization_id)
          .eq('level_id', voucherSpec.level_id);

        if (testSpecsError) {
          console.error('Test specializations query error:', testSpecsError);
          continue;
        }

        matchingTestSpecs?.forEach(testSpec => {
          accessibleTestIds.add(testSpec.test_id);
        });
      }
    }

    if (accessibleTestIds.size === 0) {
      return [];
    }

    // Get test details for accessible tests
    const { data: testsData, error: testsError } = await supabase
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
      .in('id', Array.from(accessibleTestIds))
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (testsError) {
      console.error('User tests query error:', testsError);
      throw testsError;
    }

    // Get question counts
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
