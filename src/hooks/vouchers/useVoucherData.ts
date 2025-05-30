
import { useMemo } from 'react';
import { VoucherType } from '@/types/voucherTypes';

interface UseVoucherDataProps {
  vouchers: VoucherType[];
  searchTerm: string;
}

interface VoucherGroup {
  title: string;
  count: number;
  vouchers: VoucherType[];
}

export const useVoucherData = ({ vouchers, searchTerm }: UseVoucherDataProps) => {
  // Filter vouchers based on search term
  const filteredVouchers = useMemo(() => {
    if (!searchTerm.trim()) return vouchers;
    
    return vouchers.filter(voucher => 
      voucher.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voucher.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [vouchers, searchTerm]);

  // Group vouchers by title
  const groupedVouchers = useMemo(() => {
    const groups: Record<string, VoucherType[]> = {};
    
    filteredVouchers.forEach(voucher => {
      const title = voucher.title || 'Без названия';
      if (!groups[title]) {
        groups[title] = [];
      }
      groups[title].push(voucher);
    });
    
    return Object.entries(groups).map(([title, items]): VoucherGroup => ({
      title,
      count: items.length,
      vouchers: items
    }));
  }, [filteredVouchers]);

  return {
    filteredVouchers,
    groupedVouchers
  };
};
