
import { useState } from 'react';
import { VoucherType } from '@/types/voucherTypes';

export const useVoucherModal = () => {
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState<VoucherType | null>(null);

  const openCreateModal = () => {
    setEditingVoucher(null);
    setShowVoucherModal(true);
  };

  const openEditModal = (voucher: VoucherType) => {
    setEditingVoucher(voucher);
    setShowVoucherModal(true);
  };

  const closeModal = () => {
    setShowVoucherModal(false);
    setEditingVoucher(null);
  };

  return {
    showVoucherModal,
    editingVoucher,
    openCreateModal,
    openEditModal,
    closeModal,
    setShowVoucherModal
  };
};
