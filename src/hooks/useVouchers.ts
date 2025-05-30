
import { useState } from 'react';
import { VoucherType } from '@/types/voucherTypes';
import { useVoucherData } from './vouchers/useVoucherData';
import { useVoucherPagination } from './vouchers/useVoucherPagination';
import { useVoucherActions } from './vouchers/useVoucherActions';

interface UseVouchersProps {
  vouchers: VoucherType[];
  onVouchersUpdated: () => Promise<void>;
}

export const useVouchers = ({ vouchers, onVouchersUpdated }: UseVouchersProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Data filtering and grouping
  const { filteredVouchers, groupedVouchers } = useVoucherData({
    vouchers,
    searchTerm
  });

  // Pagination for groups only (since we're always showing grouped view)
  const groupPagination = useVoucherPagination({
    data: groupedVouchers
  });

  // Actions (create, edit, delete, export)
  const actions = useVoucherActions({ onVouchersUpdated });

  return {
    // Search
    searchTerm,
    setSearchTerm,
    
    // Modal state
    showVoucherModal: actions.showVoucherModal,
    setShowVoucherModal: actions.setShowVoucherModal,
    editingVoucher: actions.editingVoucher,
    
    // Pagination (only for groups)
    currentPage: groupPagination.currentPage,
    totalPages: groupPagination.totalPages,
    itemsPerPage: groupPagination.itemsPerPage,
    handlePageChange: groupPagination.handlePageChange,
    handleItemsPerPageChange: groupPagination.handleItemsPerPageChange,
    
    // Data
    filteredVouchers,
    filteredGroups: groupedVouchers,
    
    // Actions
    handleCreateVoucher: actions.handleCreateVoucher,
    handleEditVoucher: actions.handleEditVoucher,
    handleDeleteVoucher: actions.handleDeleteVoucher,
    handleDeleteGroup: actions.handleDeleteGroup,
    handleExportGroup: actions.handleExportGroup
  };
};
