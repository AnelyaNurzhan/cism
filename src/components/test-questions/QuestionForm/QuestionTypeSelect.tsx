
import React from 'react';
import { QuestionTypeSelectProps } from '@/types/questions';

const QuestionTypeSelect: React.FC<QuestionTypeSelectProps> = ({ defaultValue, language }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {language === 'ru' ? 'Тип вопроса' : 'Сұрақ түрі'}
      </label>
      <select 
        name="questionType"
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        defaultValue={defaultValue}
      >
        <option value="single">{language === 'ru' ? 'Одиночный выбор' : 'Жалғыз таңдау'}</option>
        <option value="multiple">{language === 'ru' ? 'Множественный выбор' : 'Көп таңдау'}</option>
      </select>
    </div>
  );
};

export default QuestionTypeSelect;
