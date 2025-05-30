
import React, { useState, useEffect } from 'react';
import { UserType } from './types';
import { UserHeader } from './UserHeader';
import { UserSearchBar } from './UserSearchBar';
import { UserTable } from './UserTable';
import { UserDialogs } from './UserDialogs';
import { UserPagination } from './UserPagination';
import { useUserManagement } from './hooks/useUserManagement';
import { useUserSearch } from './hooks/useUserSearch';
import { usePagination } from './hooks/usePagination';
import { useDialogState } from './hooks/useDialogState';

interface UsersTabProps {
  users: UserType[];
}

export const UserTabContainer: React.FC<UsersTabProps> = ({ users }) => {
  // Custom hooks
  const {
    language,
    isLoading,
    localUsers,
    selectedUser,
    setSelectedUser,
    handleAddUser,
    handleEditUser,
    handleDeleteUser
  } = useUserManagement(users);
  
  const { searchTerm, setSearchTerm, filteredUsers } = useUserSearch(localUsers);
  
  const {
    isAddUserDialogOpen,
    isEditUserDialogOpen,
    isDeleteUserDialogOpen,
    setIsAddUserDialogOpen,
    setIsEditUserDialogOpen,
    setIsDeleteUserDialogOpen
  } = useDialogState();
  
  const itemsPerPage = 10;
  const {
    currentPage,
    totalPages,
    paginatedUsers,
    handlePageChange,
    getPageNumbers
  } = usePagination({ filteredUsers, itemsPerPage });

  // Event handlers
  const openEditDialog = (user: UserType) => {
    setSelectedUser(user);
    setIsEditUserDialogOpen(true);
  };
  
  const openDeleteDialog = (user: UserType) => {
    setSelectedUser(user);
    setIsDeleteUserDialogOpen(true);
  };

  return (
    <div>
      <UserHeader 
        language={language} 
        onAddUser={() => setIsAddUserDialogOpen(true)} 
      />

      <UserSearchBar 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
        language={language} 
      />

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <UserTable 
            users={paginatedUsers}
            language={language}
            onEditUser={openEditDialog}
            onDeleteUser={openDeleteDialog}
          />
        </div>
      </div>

      {filteredUsers.length > itemsPerPage && (
        <UserPagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageNumbers={getPageNumbers()}
          onPageChange={handlePageChange}
        />
      )}

      <UserDialogs
        language={language}
        isLoading={isLoading}
        isAddUserDialogOpen={isAddUserDialogOpen}
        isEditUserDialogOpen={isEditUserDialogOpen}
        isDeleteUserDialogOpen={isDeleteUserDialogOpen}
        selectedUser={selectedUser}
        onAddUserDialogChange={setIsAddUserDialogOpen}
        onEditUserDialogChange={setIsEditUserDialogOpen}
        onDeleteUserDialogChange={setIsDeleteUserDialogOpen}
        onAddUser={handleAddUser}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
      />
    </div>
  );
};
