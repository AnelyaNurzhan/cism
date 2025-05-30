import { supabase } from '@/integrations/supabase/client';
import { Voucher } from '@/types/database';

export const useVoucherActivator = () => {
  const createActivationRecord = async (userId: string, voucherId: string) => {
    try {
      console.log('=== CREATING NEW ACTIVATION RECORD ===');
      console.log('Creating new activation record for:', { userId, voucherId });
      
      const { error: activationInsertError } = await supabase
        .from('user_voucher_activations')
        .insert({
          user_id: userId,
          voucher_id: voucherId
        });

      if (activationInsertError) {
        console.error('Error creating voucher activation:', activationInsertError);
        throw activationInsertError;
      }

      console.log('✅ New voucher activation record created successfully');
    } catch (error) {
      console.error('❌ Failed to create activation record:', error);
      throw error;
    }
  };

  const updateVoucherUsage = async (voucher: Voucher) => {
    const currentUsedCount = voucher.used_count || 0;
    const newUsedCount = currentUsedCount + 1;
    const usageLimit = voucher.usage_limit || 1;
    const isFullyUsed = newUsedCount >= usageLimit;
    
    console.log('=== UPDATING VOUCHER USAGE ===');
    console.log('Voucher usage update details:', {
      voucherId: voucher.id,
      voucherCode: voucher.code,
      currentUsedCount,
      newUsedCount,
      usageLimit,
      isFullyUsed
    });
    
    try {
      // Сначала проверим, что ваучер существует
      console.log('🔍 Checking if voucher exists before update...');
      const { data: existingVoucher, error: checkError } = await supabase
        .from('vouchers')
        .select('id, used_count, usage_limit, is_used')
        .eq('id', voucher.id)
        .maybeSingle();

      if (checkError) {
        console.error('❌ Error checking voucher existence:', checkError);
        throw checkError;
      }

      if (!existingVoucher) {
        console.error('❌ Voucher not found:', voucher.id);
        throw new Error(`Voucher with ID ${voucher.id} not found`);
      }

      console.log('✅ Voucher exists, current state:', existingVoucher);

      // Теперь обновляем
      console.log('🔄 Performing voucher update...');
      const { data: updatedVoucher, error: updateError } = await supabase
        .from('vouchers')
        .update({ 
          used_count: newUsedCount,
          is_used: isFullyUsed
        })
        .eq('id', voucher.id)
        .select()
        .maybeSingle();

      if (updateError) {
        console.error('❌ Error updating voucher usage count:', updateError);
        throw updateError;
      } 

      if (!updatedVoucher) {
        console.error('❌ No voucher was updated (possibly due to RLS policies)');
        console.log('🔍 Checking current user session...');
        
        const { data: session, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          console.error('Session error:', sessionError);
        } else {
          console.log('Current session:', session?.session?.user?.id ? 'Authenticated' : 'Not authenticated');
        }
        
        throw new Error('Voucher update failed - no rows affected');
      }
      
      console.log('✅ Voucher usage count updated successfully:', {
        voucherId: voucher.id,
        oldCount: currentUsedCount,
        newCount: newUsedCount,
        updatedVoucher
      });
      
      return {
        ...voucher,
        used_count: newUsedCount,
        is_used: isFullyUsed
      };
    } catch (error) {
      console.error('❌ Exception during voucher update:', error);
      throw error;
    }
  };

  const activateVoucher = async (userId: string, voucher: Voucher, existingActivation: any) => {
    console.log('=== VOUCHER ACTIVATION PROCESS START ===');
    console.log('Activation parameters:', {
      userId,
      voucherId: voucher.id,
      voucherCode: voucher.code,
      currentUsedCount: voucher.used_count,
      usageLimit: voucher.usage_limit,
      note: 'Creating new activation record for each attempt'
    });

    try {
      // Всегда создаем новую запись активации (каждая попытка = новая активация)
      console.log('📝 Creating new activation record for this attempt...');
      await createActivationRecord(userId, voucher.id);
      
      // Всегда обновляем счетчик использований
      console.log('🔄 Updating voucher usage count...');
      const updatedVoucher = await updateVoucherUsage(voucher);
      
      console.log('✅ VOUCHER ACTIVATION COMPLETED SUCCESSFULLY');
      console.log('Final voucher state:', {
        voucherId: updatedVoucher.id,
        usedCount: updatedVoucher.used_count,
        usageLimit: updatedVoucher.usage_limit,
        isUsed: updatedVoucher.is_used
      });
      
      return updatedVoucher;
    } catch (error) {
      console.error('❌ VOUCHER ACTIVATION FAILED:', error);
      throw error;
    }
  };

  return {
    activateVoucher
  };
};
