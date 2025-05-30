
import React from 'react';
import { ModalFooterProps } from '@/types/questions';

const ModalFooter: React.FC<ModalFooterProps> = ({ onClose, editingQuestion, language }) => {
  return (
    <div className="flex justify-end space-x-3 pt-4">
      <button
        type="button"
        onClick={onClose}
        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
      >
        {language === 'ru' ? 'Отмена' : 'Болдырмау'}
      </button>
      <button
        type="submit"
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light"
      >
        {editingQuestion 
          ? (language === 'ru' ? 'Сохранить' : 'Сақтау') 
          : (language === 'ru' ? 'Добавить' : 'Қосу')}
      </button>
    </div>
  );
};

export default ModalFooter;
