
import { supabase } from '@/integrations/supabase/client';
import { Voucher } from '@/types/database';

export const useSpecializationTestAccess = () => {
  const checkSpecializationAccess = async (voucher: Voucher, testId: string) => {
    console.log('Checking access via specializations...');
    
    const { data: voucherSpecs, error: specsError } = await supabase
      .from('voucher_specializations')
      .select('specialization_id, level_id')
      .eq('voucher_id', voucher.id);

    if (specsError) {
      console.error('Error checking voucher specializations:', specsError);
      throw specsError;
    }

    console.log('Voucher specializations:', voucherSpecs);

    if (!voucherSpecs || voucherSpecs.length === 0) {
      return false;
    }

    const { data: testSpecs, error: testSpecsError } = await supabase
      .from('test_specializations')
      .select('specialization_id, level_id')
      .eq('test_id', testId);

    if (testSpecsError) {
      console.error('Error checking test specializations:', testSpecsError);
      throw testSpecsError;
    }

    console.log('Test specializations:', testSpecs);

    for (const voucherSpec of voucherSpecs) {
      for (const testSpec of testSpecs || []) {
        if (voucherSpec.specialization_id === testSpec.specialization_id && 
            voucherSpec.level_id === testSpec.level_id) {
          console.log('Access granted via specialization association');
          return true;
        }
      }
    }

    return false;
  };

  return { checkSpecializationAccess };
};
