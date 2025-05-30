
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

export const useVoucherActivationValidator = () => {
  const { language } = useLanguage();

  const checkExistingActivation = async (userId: string, voucherId: string) => {
    try {
      console.log('Checking existing activation for user:', userId, 'voucher:', voucherId);
      
      // Use a simpler query to avoid 406 errors
      const { data: existingActivation, error: activationError } = await supabase
        .from('user_voucher_activations')
        .select('id, activated_at')
        .eq('user_id', userId)
        .eq('voucher_id', voucherId)
        .limit(1)
        .single();
        
      if (activationError) {
        // If no data found, that's expected for new activations
        if (activationError.code === 'PGRST116') {
          console.log('No existing activation found (expected for new activations)');
          return null;
        }
        console.error('Error checking existing activation:', activationError);
        // For other errors, assume no existing activation to allow process to continue
        console.log('Assuming no existing activation due to error');
        return null;
      }
      
      console.log('Existing activation check result:', existingActivation);
      return existingActivation;
    } catch (error) {
      console.error('Error in checkExistingActivation:', error);
      // Always return null for any error to allow activation to proceed
      console.log('Returning null due to catch block');
      return null;
    }
  };

  return { checkExistingActivation };
};
