
import React from 'react';
import { TablePagination } from '@/components/common/TablePagination';

interface TestListPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const TestListPagination: React.FC<TestListPaginationProps> = ({
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
