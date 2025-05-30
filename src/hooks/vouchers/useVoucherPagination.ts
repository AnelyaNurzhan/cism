
import { useState, useMemo } from 'react';

interface UseVoucherPaginationProps<T> {
  data: T[];
  initialItemsPerPage?: number;
}

export const useVoucherPagination = <T>({ 
  data, 
  initialItemsPerPage = 10 
}: UseVoucherPaginationProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const isShowingAll = itemsPerPage === -1;
  const totalPages = isShowingAll ? 1 : Math.ceil(data.length / itemsPerPage);
  
  const paginatedData = useMemo(() => {
    if (isShowingAll) return data;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage, isShowingAll]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  return {
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedData,
    handlePageChange,
    handleItemsPerPageChange
  };
};
