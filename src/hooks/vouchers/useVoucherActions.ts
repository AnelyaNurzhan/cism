
import { VoucherType } from '@/types/voucherTypes';
import { useVoucherOperations } from './useVoucherOperations';
import { useVoucherModal } from './useVoucherModal';

interface UseVoucherActionsProps {
  onVouchersUpdated: () => Promise<void>;
}

export const useVoucherActions = ({ onVouchersUpdated }: UseVoucherActionsProps) => {
  const operations = useVoucherOperations();
  const modal = useVoucherModal();

  const handleCreateVoucher = modal.openCreateModal;

  const handleEditVoucher = async (voucher: VoucherType) => {
    try {
      const completeVoucher = await operations.editVoucher(voucher);
      // Type assertion is safe here because editVoucher returns the correct structure
      modal.openEditModal(completeVoucher as VoucherType);
    } catch (error) {
      // Error already handled in operations
    }
  };

  const handleDeleteVoucher = async (id: string) => {
    const success = await operations.deleteVoucher(id);
    if (success) {
      onVouchersUpdated();
    }
  };

  const handleDeleteGroup = async (groupTitle: string, vouchers: VoucherType[]) => {
    const success = await operations.deleteVoucherGroup(groupTitle, vouchers);
    if (success) {
      onVouchersUpdated();
    }
  };

  const handleExportGroup = (group: { title: string; count: number; vouchers: VoucherType[] }) => {
    operations.exportVoucherGroup({
      title: group.title,
      count: group.count,
      items: group.vouchers
    });
  };

  return {
    // Modal state
    showVoucherModal: modal.showVoucherModal,
    setShowVoucherModal: modal.setShowVoucherModal,
    editingVoucher: modal.editingVoucher,
    
    // Actions
    handleCreateVoucher,
    handleEditVoucher,
    handleDeleteVoucher,
    handleDeleteGroup,
    handleExportGroup
  };
};
