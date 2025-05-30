
import { UseVoucherFormState } from './types';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { validateVoucherForm } from './validation';
import { createVouchersForTests, createVouchersForSpecializations } from './voucherCreation';
import { updateVoucher } from './voucherUpdate';

export const useVoucherFormSubmit = (
  formState: UseVoucherFormState,
  onClose: () => void,
  onVoucherCreated: () => Promise<void>
) => {
  const { profile } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    formState.setIsLoading(true);
    
    try {
      const {
        title,
        selectedTestIds,
        selectedSpecializations,
        startDate,
        expiryDate,
        usageLimit,
        quantity,
        language,
        editingVoucher
      } = formState;
      
      // Validation
      if (!validateVoucherForm(formState)) {
        formState.setIsLoading(false);
        return;
      }
      
      // Parse date strings to ISO format for database
      const startDateISO = startDate ? new Date(startDate).toISOString() : null;
      const expiryDateISO = expiryDate ? new Date(expiryDate).toISOString() : null;

      // For editing an existing voucher
      if (editingVoucher) {
        const voucherData = {
          title,
          start_date: startDateISO,
          expiry_date: expiryDateISO,
          usage_limit: usageLimit ? parseInt(usageLimit, 10) : 1
        };
        
        await updateVoucher(
          editingVoucher,
          voucherData,
          selectedTestIds,
          selectedSpecializations
        );
        
        toast.success(language === 'ru' 
          ? 'Ваучер успешно обновлен' 
          : 'Ваучер сәтті жаңартылды');
      } 
      // For creating new vouchers
      else {
        console.log('Creating vouchers with data:', {
          title,
          selectedTestIds,
          selectedSpecializations,
          quantity
        });

        const quantityNum = quantity ? parseInt(quantity, 10) : 1;
        let totalVouchers = 0;
        
        const baseVoucherData = {
          title,
          start_date: startDateISO,
          expiry_date: expiryDateISO,
          usage_limit: usageLimit ? parseInt(usageLimit, 10) : 1,
          is_used: false,
          created_by: profile?.id
        };
        
        // If creating vouchers for specific tests
        if (selectedTestIds.length > 0) {
          totalVouchers = await createVouchersForTests(
            baseVoucherData,
            selectedTestIds,
            quantityNum
          );
        }
        
        // If creating vouchers for specializations
        if (selectedSpecializations.length > 0) {
          const specializationVouchers = await createVouchersForSpecializations(
            baseVoucherData,
            selectedSpecializations,
            quantityNum
          );
          totalVouchers += specializationVouchers;
        }
        
        toast.success(language === 'ru' 
          ? `Создано ${totalVouchers} ваучеров` 
          : `${totalVouchers} ваучер жасалды`);
      }
      
      // Close form and refresh list
      onClose();
      await onVoucherCreated();
      
    } catch (error) {
      console.error('Error in voucher operation:', error);
      toast.error(formState.language === 'ru' 
        ? 'Ошибка при работе с ваучером' 
        : 'Ваучермен жұмыс істеу кезінде қате');
    } finally {
      formState.setIsLoading(false);
    }
  };
  
  return { handleSubmit };
};
