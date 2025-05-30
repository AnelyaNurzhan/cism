
import React from 'react';
import { User, Edit, Trash2 } from 'lucide-react';
import { UserType } from './types';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

interface UserTableProps {
  users: UserType[];
  language: string;
  onEditUser: (user: UserType) => void;
  onDeleteUser: (user: UserType) => void;
}

export const UserTable: React.FC<UserTableProps> = ({ 
  users, 
  language, 
  onEditUser, 
  onDeleteUser 
}) => {
  if (users.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {language === 'ru' ? 'Пользователи не найдены' : 'Пайдаланушылар табылмады'}
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{language === 'ru' ? 'ФИО' : 'Аты-жөні'}</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>{language === 'ru' ? 'Телефон' : 'Телефон'}</TableHead>
          <TableHead>{language === 'ru' ? 'Роль' : 'Рөлі'}</TableHead>
          <TableHead>{language === 'ru' ? 'Статус' : 'Күйі'}</TableHead>
          <TableHead className="text-right">{language === 'ru' ? 'Действия' : 'Әрекеттер'}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <User size={20} className="text-gray-500" />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">{user.full_name}</div>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-sm text-gray-500">
              {user.email}
            </TableCell>
            <TableCell className="text-sm text-gray-500">
              {user.phone || '-'}
            </TableCell>
            <TableCell className="text-sm text-gray-500">
              {user.role === 'admin' 
                ? (language === 'ru' ? 'Администратор' : 'Әкімші')
                : (language === 'ru' ? 'Пользователь' : 'Пайдаланушы')}
            </TableCell>
            <TableCell>
              <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                {language === 'ru' ? 'Активен' : 'Белсенді'}
              </span>
            </TableCell>
            <TableCell className="text-right text-sm font-medium">
              <button 
                className="text-primary hover:text-primary-light mr-4"
                onClick={() => onEditUser(user)}
                aria-label={language === 'ru' ? 'Редактировать' : 'Өңдеу'}
              >
                <Edit size={16} />
              </button>
              <button 
                className="text-red-600 hover:text-red-800"
                onClick={() => onDeleteUser(user)}
                aria-label={language === 'ru' ? 'Удалить' : 'Жою'}
              >
                <Trash2 size={16} />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
