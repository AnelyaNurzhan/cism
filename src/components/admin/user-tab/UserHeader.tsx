
import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UserHeaderProps {
  language: string;
  onAddUser: () => void;
}

export const UserHeader: React.FC<UserHeaderProps> = ({ language, onAddUser }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">
        {language === 'ru' ? 'Управление пользователями' : 'Пайдаланушыларды басқару'}
      </h2>
      <Button 
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center"
        onClick={onAddUser}
      >
        <PlusCircle size={16} className="mr-2" />
        {language === 'ru' ? 'Добавить пользователя' : 'Пайдаланушы қосу'}
      </Button>
    </div>
  );
};
