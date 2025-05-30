
import React from 'react';
import { TablePagination } from '@/components/common/TablePagination';

interface LevelsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const LevelsPagination: React.FC<LevelsPaginationProps> = ({
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
