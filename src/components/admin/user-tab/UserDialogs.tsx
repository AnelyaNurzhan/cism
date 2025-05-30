
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { UserType } from './types';
import { UserForm } from './UserForm';
import { UserFormValues, EditUserFormValues } from './types';

interface UserDialogsProps {
  language: string;
  isLoading: boolean;
  isAddUserDialogOpen: boolean;
  isEditUserDialogOpen: boolean;
  isDeleteUserDialogOpen: boolean;
  selectedUser: UserType | null;
  onAddUserDialogChange: (open: boolean) => void;
  onEditUserDialogChange: (open: boolean) => void;
  onDeleteUserDialogChange: (open: boolean) => void;
  onAddUser: (data: UserFormValues) => Promise<void>;
  onEditUser: (data: EditUserFormValues) => Promise<void>;
  onDeleteUser: () => Promise<void>;
}

export const UserDialogs: React.FC<UserDialogsProps> = ({
  language,
  isLoading,
  isAddUserDialogOpen,
  isEditUserDialogOpen,
  isDeleteUserDialogOpen,
  selectedUser,
  onAddUserDialogChange,
  onEditUserDialogChange,
  onDeleteUserDialogChange,
  onAddUser,
  onEditUser,
  onDeleteUser
}) => {
  return (
    <>
      {/* Add User Dialog */}
      <Dialog open={isAddUserDialogOpen} onOpenChange={onAddUserDialogChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{language === 'ru' ? 'Добавить пользователя' : 'Пайдаланушы қосу'}</DialogTitle>
          </DialogHeader>
          <UserForm
            isLoading={isLoading}
            isEditing={false}
            selectedUser={null}
            onSubmit={onAddUser}
            onCancel={() => onAddUserDialogChange(false)}
            language={language}
          />
        </DialogContent>
      </Dialog>
      
      {/* Edit User Dialog */}
      <Dialog open={isEditUserDialogOpen} onOpenChange={onEditUserDialogChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {language === 'ru' ? 'Редактировать пользователя' : 'Пайдаланушыны өңдеу'}
            </DialogTitle>
          </DialogHeader>
          <UserForm
            isLoading={isLoading}
            isEditing={true}
            selectedUser={selectedUser}
            onSubmit={onEditUser}
            onCancel={() => onEditUserDialogChange(false)}
            language={language}
          />
        </DialogContent>
      </Dialog>
      
      {/* Delete User Confirmation Dialog */}
      <AlertDialog open={isDeleteUserDialogOpen} onOpenChange={onDeleteUserDialogChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {language === 'ru' ? 'Подтверждение удаления' : 'Жоюды растау'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {language === 'ru' 
                ? `Вы уверены, что хотите удалить пользователя ${selectedUser?.full_name}? Это действие нельзя отменить.` 
                : `Сіз ${selectedUser?.full_name} пайдаланушысын жойғыңыз келетініне сенімдісіз бе? Бұл әрекетті кері қайтару мүмкін емес.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>
              {language === 'ru' ? 'Отмена' : 'Болдырмау'}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={onDeleteUser}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-r-transparent border-white rounded-full animate-spin mr-2"></div>
                  {language === 'ru' ? 'Удаление...' : 'Жою...'}
                </div>
              ) : (
                language === 'ru' ? 'Удалить' : 'Жою'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
