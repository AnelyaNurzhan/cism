
import { useState } from 'react';
import { useVoucherFormState } from './useVoucherFormState';
import { useVoucherFormSubmit } from './useVoucherFormSubmit';
import { UseVoucherFormProps, UseVoucherFormResult } from './types';

export const useVoucherForm = ({
  onClose,
  onVoucherCreated,
  editingVoucher = null,
}: UseVoucherFormProps): UseVoucherFormResult => {
  const formStateValues = useVoucherFormState(editingVoucher);
  
  const formState = {
    ...formStateValues,
    editingVoucher
  };
  
  const { handleSubmit } = useVoucherFormSubmit(
    formState,
    onClose,
    onVoucherCreated
  );

  return {
    formState,
    handleSubmit,
    isLoading: formState.isLoading
  };
};

// Re-export for backward compatibility
export { useVoucherForm as default } from './index';
