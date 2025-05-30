
import { useState } from 'react';
import { UserType } from '../types';

export const useDialogState = () => {
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [isDeleteUserDialogOpen, setIsDeleteUserDialogOpen] = useState(false);
  
  return {
    isAddUserDialogOpen,
    isEditUserDialogOpen,
    isDeleteUserDialogOpen,
    setIsAddUserDialogOpen,
    setIsEditUserDialogOpen,
    setIsDeleteUserDialogOpen
  };
};
