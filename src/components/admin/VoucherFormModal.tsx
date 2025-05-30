
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { VoucherModalHeader } from './voucher-form/VoucherModalHeader';
import { VoucherForm } from './voucher-form/VoucherForm';

interface VoucherFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVoucherCreated: () => Promise<void>;
  editingVoucher?: any | null;
}

export const VoucherFormModal: React.FC<VoucherFormModalProps> = ({
  open,
  onOpenChange,
  onVoucherCreated,
  editingVoucher = null
}) => {
  const isMobile = useIsMobile();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${isMobile ? 'w-[95%] max-w-[95%] p-3' : 'w-full max-w-3xl'} max-h-[90vh] overflow-y-auto`}>
        <VoucherModalHeader isEditing={!!editingVoucher} />
        <VoucherForm
          onClose={() => onOpenChange(false)}
          onVoucherCreated={onVoucherCreated}
          editingVoucher={editingVoucher}
        />
      </DialogContent>
    </Dialog>
  );
};
