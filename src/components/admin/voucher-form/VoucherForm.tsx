
import React from 'react';
import { useVoucherForm } from '@/hooks/voucher-form';
import { VoucherFormFields } from './VoucherFormFields';
import { VoucherFormButtons } from './VoucherFormButtons';

interface VoucherFormProps {
  onClose: () => void;
  onVoucherCreated: () => Promise<void>;
  editingVoucher?: any | null;
}

export const VoucherForm: React.FC<VoucherFormProps> = ({
  onClose,
  onVoucherCreated,
  editingVoucher = null,
}) => {
  const { formState, handleSubmit, isLoading } = useVoucherForm({
    onClose,
    onVoucherCreated,
    editingVoucher
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <VoucherFormFields {...formState} />
      
      <VoucherFormButtons 
        onClose={onClose} 
        isLoading={isLoading} 
        language={formState.language} 
      />
    </form>
  );
};
