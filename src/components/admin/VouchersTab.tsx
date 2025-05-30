
import React, { useEffect } from 'react';
import { VoucherType } from '@/types/voucherTypes';
import { exportVouchersToExcel } from './voucher-list/VoucherExcelExport';
import { useVouchers } from '@/hooks/useVouchers';
import { useLanguage } from '@/contexts/LanguageContext';
import { VoucherFormModal } from './VoucherFormModal';
import { VoucherHeader } from './voucher-list/VoucherHeader';
import { VoucherSearchBar } from './voucher-list/VoucherSearchBar';
import { VoucherPagination } from './voucher-list/VoucherPagination';
import { VoucherGroupList } from './voucher-list/VoucherGroupList';
import { VoucherStats } from './voucher-list/VoucherStats';
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface VouchersTabProps {
  vouchers: VoucherType[];
  onVouchersUpdated: () => Promise<void>;
}

export const VouchersTab: React.FC<VouchersTabProps> = ({ 
  vouchers, 
  onVouchersUpdated 
}) => {
  const { language } = useLanguage();
  
  console.log('=== VOUCHERS TAB RENDER ===');
  console.log('Vouchers received in VouchersTab:', vouchers.length);
  console.log('Vouchers details:', vouchers.map(v => ({
    code: v.code,
    used_count: v.used_count,
    usage_limit: v.usage_limit,
    is_used: v.is_used
  })));

  const { 
    searchTerm,
    setSearchTerm,
    showVoucherModal,
    setShowVoucherModal,
    editingVoucher,
    currentPage,
    totalPages,
    itemsPerPage,
    filteredVouchers,
    filteredGroups,
    handlePageChange,
    handleCreateVoucher,
    handleEditVoucher,
    handleDeleteVoucher,
    handleDeleteGroup,
    handleExportGroup,
    handleItemsPerPageChange
  } = useVouchers({ vouchers, onVouchersUpdated });

  console.log('useVouchers hook results:', {
    filteredVouchersCount: filteredVouchers.length,
    filteredGroupsCount: filteredGroups.length,
    currentPage,
    totalPages
  });

  const handleExportToExcel = () => {
    console.log('📊 Exporting vouchers to Excel:', filteredVouchers.length, 'vouchers');
    exportVouchersToExcel(filteredVouchers, language);
  };

  // Transform groups to match expected interface
  const transformedGroups = filteredGroups.map(group => {
    console.log('Transforming group:', {
      title: group.title,
      count: group.count,
      vouchersInGroup: group.vouchers.length
    });
    
    return {
      title: group.title,
      count: group.count,
      vouchers: group.vouchers
    };
  });

  // Добавляем эффект для логирования изменений ваучеров
  useEffect(() => {
    console.log('=== VOUCHERS TAB EFFECT ===');
    console.log('Vouchers prop changed:', {
      totalVouchers: vouchers.length,
      vouchersWithUsage: vouchers.filter(v => (v.used_count || 0) > 0).length,
      vouchersUsageSummary: vouchers.map(v => ({
        code: v.code,
        used: v.used_count || 0,
        limit: v.usage_limit || 1
      }))
    });
  }, [vouchers]);

  return (
    <div>
      <VoucherHeader 
        onCreateVoucher={handleCreateVoucher} 
        onExportToExcel={handleExportToExcel}
      />
      
      {/* Statistics */}
      <VoucherStats vouchers={vouchers} />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <VoucherSearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {language === 'ru' ? 'Показывать:' : 'Көрсету:'}
          </span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => handleItemsPerPageChange(parseInt(value))}
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
                <SelectItem value="-1">
                  {language === 'ru' ? 'Все' : 'Барлығы'}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <VoucherGroupList
        groups={transformedGroups.slice(
          itemsPerPage === -1 ? 0 : (currentPage - 1) * itemsPerPage,
          itemsPerPage === -1 ? transformedGroups.length : currentPage * itemsPerPage
        )}
        onEdit={handleEditVoucher}
        onDelete={handleDeleteVoucher}
        onDeleteGroup={(groupTitle) => {
          console.log('🗑️ Deleting group:', groupTitle);
          const group = filteredGroups.find(g => g.title === groupTitle);
          if (group) {
            handleDeleteGroup(groupTitle, group.vouchers);
          }
        }}
        onExportGroup={(title, vouchers) => {
          console.log('📊 Exporting group:', title, 'with', vouchers.length, 'vouchers');
          handleExportGroup({ title, count: vouchers.length, vouchers });
        }}
      />

      {itemsPerPage !== -1 && filteredGroups.length > itemsPerPage && (
        <VoucherPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <VoucherFormModal
        open={showVoucherModal}
        onOpenChange={setShowVoucherModal}
        onVoucherCreated={onVouchersUpdated}
        editingVoucher={editingVoucher}
      />
    </div>
  );
};
