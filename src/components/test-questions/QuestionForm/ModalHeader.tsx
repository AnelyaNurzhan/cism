
import React from 'react';
import { ModalHeaderProps } from '@/types/questions';

const ModalHeader: React.FC<ModalHeaderProps> = ({ editingQuestion, language }) => {
  return (
    <h2 className="text-xl font-bold mb-4">
      {editingQuestion 
        ? (language === 'ru' ? 'Редактирование вопроса' : 'Сұрақты өңдеу')
        : (language === 'ru' ? 'Добавление нового вопроса' : 'Жаңа сұрақ қосу')}
    </h2>
  );
};

export default ModalHeader;
