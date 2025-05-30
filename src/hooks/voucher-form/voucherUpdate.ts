
import { supabase } from '@/integrations/supabase/client';

export const updateVoucher = async (
  editingVoucher: any,
  voucherData: {
    title: string;
    start_date: string | null;
    expiry_date: string | null;
    usage_limit: number;
  },
  selectedTestIds: string[],
  selectedSpecializations: Array<{ specializationId: string; levelId: string }>
) => {
  console.log("Updating voucher:", voucherData);
  
  // Update voucher
  const { error: updateError } = await supabase
    .from('vouchers')
    .update(voucherData)
    .eq('id', editingVoucher.id);
  
  if (updateError) throw updateError;
  
  // Update test associations
  const { error: deleteTestsError } = await supabase
    .from('voucher_tests')
    .delete()
    .eq('voucher_id', editingVoucher.id);
  
  if (deleteTestsError) throw deleteTestsError;
  
  if (selectedTestIds.length > 0) {
    const testAssociations = selectedTestIds.map(testId => ({
      voucher_id: editingVoucher.id,
      test_id: testId
    }));
    
    const { error: insertTestsError } = await supabase
      .from('voucher_tests')
      .insert(testAssociations);
    
    if (insertTestsError) throw insertTestsError;
  }
  
  // Update specialization associations
  const { error: deleteSpecsError } = await supabase
    .from('voucher_specializations')
    .delete()
    .eq('voucher_id', editingVoucher.id);
  
  if (deleteSpecsError) throw deleteSpecsError;
  
  if (selectedSpecializations.length > 0) {
    const specAssociations = selectedSpecializations.map(item => ({
      voucher_id: editingVoucher.id,
      specialization_id: item.specializationId,
      level_id: item.levelId
    }));
    
    const { error: insertSpecsError } = await supabase
      .from('voucher_specializations')
      .insert(specAssociations);
    
    if (insertSpecsError) throw insertSpecsError;
  }
};
