
import { supabase } from '@/integrations/supabase/client';
import { Voucher } from '@/types/database';

export const useDirectTestAccess = () => {
  const checkDirectTestAccess = async (voucher: Voucher, testId: string) => {
    const { data: voucherTests, error: testsError } = await supabase
      .from('voucher_tests')
      .select('test_id')
      .eq('voucher_id', voucher.id);
    
    if (testsError) {
      console.error('Error checking voucher tests:', testsError);
      throw testsError;
    }
    
    console.log('Voucher tests:', voucherTests);
    
    const testIds = voucherTests?.map(vt => vt.test_id) || [];
    if (testIds.includes(testId)) {
      console.log('Access granted via direct test association');
      return true;
    }
    
    return false;
  };

  return { checkDirectTestAccess };
};
