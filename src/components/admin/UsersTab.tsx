
import React from 'react';
import { UserTabContainer } from './user-tab/UserTabContainer';

interface UserType {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  role: string;
}

interface UsersTabProps {
  users: UserType[];
  onUsersUpdated: () => Promise<void>;
}

export const UsersTab: React.FC<UsersTabProps> = ({ users, onUsersUpdated }) => {
  return <UserTabContainer users={users} />;
};
