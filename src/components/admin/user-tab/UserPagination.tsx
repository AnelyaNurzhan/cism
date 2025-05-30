
import React from 'react';
import { TablePagination } from '@/components/common/TablePagination';

interface UserPaginationProps {
  currentPage: number;
  totalPages: number;
  pageNumbers: (number | string)[];
  onPageChange: (page: number) => void;
}

export const UserPagination: React.FC<UserPaginationProps> = ({
  currentPage,
  totalPages,
  pageNumbers,
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
