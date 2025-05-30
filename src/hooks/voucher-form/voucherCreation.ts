
import { supabase } from '@/integrations/supabase/client';
import { nanoid } from 'nanoid';

interface VoucherData {
  title: string;
  code?: string;
  start_date: string | null;
  expiry_date: string | null;
  usage_limit: number;
  is_used: boolean;
  created_by: string | undefined;
}

export const createVouchersForTests = async (
  voucherData: Omit<VoucherData, 'code'>,
  selectedTestIds: string[],
  quantity: number
) => {
  const vouchers = [];
  
  // Generate voucher codes
  for (let i = 0; i < quantity; i++) {
    const code = nanoid(8).toUpperCase();
    
    vouchers.push({
      ...voucherData,
      code
    });
  }
  
  console.log('Creating vouchers for tests:', vouchers);
  
  // Insert vouchers
  const { data: insertedVouchers, error: insertError } = await supabase
    .from('vouchers')
    .insert(vouchers)
    .select('id');
  
  if (insertError) throw insertError;
  
  // Handle test associations
  if (insertedVouchers) {
    const testAssociations = [];
    
    for (const voucher of insertedVouchers) {
      for (const testId of selectedTestIds) {
        testAssociations.push({
          voucher_id: voucher.id,
          test_id: testId
        });
      }
    }
    
    const { error: testAssocError } = await supabase
      .from('voucher_tests')
      .insert(testAssociations);
    
    if (testAssocError) throw testAssocError;
  }
  
  return quantity;
};

export const createVouchersForSpecializations = async (
  voucherData: Omit<VoucherData, 'code'>,
  selectedSpecializations: Array<{ specializationId: string; levelId: string }>,
  quantity: number
) => {
  console.log('=== CREATING VOUCHERS FOR SPECIALIZATIONS ===');
  console.log('Requested quantity:', quantity);
  console.log('Selected specializations:', selectedSpecializations);
  console.log('Voucher data:', voucherData);

  const vouchers = [];
  
  // ИСПРАВЛЕНИЕ: Генерируем только указанное количество ваучеров (quantity),
  // а не quantity × количество специализаций
  for (let i = 0; i < quantity; i++) {
    const code = nanoid(8).toUpperCase();
    
    vouchers.push({
      ...voucherData,
      code
    });
  }
  
  console.log('Generated vouchers before insertion:', vouchers);
  console.log('Number of vouchers to insert:', vouchers.length);
  
  // Insert vouchers
  const { data: insertedVouchers, error: insertError } = await supabase
    .from('vouchers')
    .insert(vouchers)
    .select('id, code');
  
  if (insertError) {
    console.error('Error inserting vouchers:', insertError);
    throw insertError;
  }
  
  console.log('Successfully inserted vouchers:', insertedVouchers);
  
  // Handle specialization associations
  // ИСПРАВЛЕНИЕ: Каждый ваучер связывается со ВСЕМИ выбранными специализациями
  if (insertedVouchers) {
    const specAssociations = [];
    
    for (const voucher of insertedVouchers) {
      for (const spec of selectedSpecializations) {
        specAssociations.push({
          voucher_id: voucher.id,
          specialization_id: spec.specializationId,
          level_id: spec.levelId
        });
      }
    }
    
    console.log('Creating specialization associations:', specAssociations);
    console.log('Number of associations to create:', specAssociations.length);
    
    const { error: specAssocError } = await supabase
      .from('voucher_specializations')
      .insert(specAssociations);
    
    if (specAssocError) {
      console.error('Error creating specialization associations:', specAssocError);
      throw specAssocError;
    }
    
    console.log('Successfully created specialization associations');
  }
  
  console.log('=== VOUCHER CREATION COMPLETED ===');
  console.log('Created vouchers count:', insertedVouchers?.length || 0);
  
  // Возвращаем фактическое количество созданных ваучеров
  return insertedVouchers?.length || 0;
};
