
import React from 'react';
import { TablePagination } from '@/components/common/TablePagination';

interface SpecializationPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const SpecializationPagination: React.FC<SpecializationPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  return (
    <TablePagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
    />
  );
};
