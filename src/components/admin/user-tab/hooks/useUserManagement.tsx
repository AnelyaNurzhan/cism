
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { UserType, UserFormValues, EditUserFormValues } from '../types';

export const useUserManagement = (initialUsers: UserType[]) => {
  const { language } = useLanguage();
  const [localUsers, setLocalUsers] = useState<UserType[]>(initialUsers);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  
  const handleAddUser = async (data: UserFormValues) => {
    setIsLoading(true);
    try {
      // Register user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password || '',
        options: {
          data: {
            full_name: data.full_name,
            phone: data.phone || null,
          }
        }
      });

      if (authError) throw authError;

      // If role is admin, update the role in profiles table
      if (data.role === 'admin' && authData.user) {
        const { error: roleError } = await supabase
          .from('profiles')
          .update({ role: 'admin' })
          .eq('id', authData.user.id);

        if (roleError) throw roleError;
      }

      toast.success(language === 'ru' 
        ? 'Пользователь успешно добавлен' 
        : 'Пайдаланушы сәтті қосылды');
      
      // Refresh the page to see the new user (in a real app, you would just update the users list)
      window.location.reload();
    } catch (error: any) {
      toast.error(error.message || (language === 'ru' 
        ? 'Ошибка при добавлении пользователя' 
        : 'Пайдаланушыны қосу кезінде қате'));
      console.error('Error creating user:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleEditUser = async (data: EditUserFormValues) => {
    if (!selectedUser) return;
    
    setIsLoading(true);
    try {
      // Update profile information
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          full_name: data.full_name,
          phone: data.phone || null,
          role: data.role
        })
        .eq('id', selectedUser.id);
      
      if (updateError) throw updateError;
      
      // Update email if it changed
      if (data.email !== selectedUser.email) {
        const { error: emailError } = await supabase.auth.admin.updateUserById(
          selectedUser.id,
          { email: data.email }
        );
        
        if (emailError) throw emailError;
      }
      
      // Update password if provided
      if (data.password) {
        const { error: passwordError } = await supabase.auth.admin.updateUserById(
          selectedUser.id,
          { password: data.password }
        );
        
        if (passwordError) throw passwordError;
      }
      
      toast.success(language === 'ru' 
        ? 'Пользователь успешно обновлен' 
        : 'Пайдаланушы сәтті жаңартылды');
      
      // Update local state
      setLocalUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === selectedUser.id 
            ? { ...user, full_name: data.full_name, email: data.email, phone: data.phone || null, role: data.role }
            : user
        )
      );
      
      setSelectedUser(null);
    } catch (error: any) {
      toast.error(error.message || (language === 'ru' 
        ? 'Ошибка при обновлении пользователя' 
        : 'Пайдаланушыны жаңарту кезінде қате'));
      console.error('Error updating user:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.admin.deleteUser(
        selectedUser.id
      );
      
      if (error) throw error;
      
      toast.success(language === 'ru' 
        ? 'Пользователь успешно удален' 
        : 'Пайдаланушы сәтті жойылды');
      
      // Update local state
      setLocalUsers(prevUsers => 
        prevUsers.filter(user => user.id !== selectedUser.id)
      );
      
      setSelectedUser(null);
    } catch (error: any) {
      toast.error(error.message || (language === 'ru' 
        ? 'Ошибка при удалении пользователя' 
        : 'Пайдаланушыны жою кезінде қате'));
      console.error('Error deleting user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    language,
    isLoading,
    localUsers,
    selectedUser,
    setSelectedUser,
    handleAddUser,
    handleEditUser,
    handleDeleteUser
  };
};
