
import { useState, useEffect } from 'react';
import { UserType } from '../types';

export const useUserSearch = (users: UserType[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>(users);
  
  useEffect(() => {
    const filtered = users.filter(user => 
      user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);
  
  return {
    searchTerm,
    setSearchTerm,
    filteredUsers
  };
};
