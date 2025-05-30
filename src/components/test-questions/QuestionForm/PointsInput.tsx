
import React from 'react';
import { PointsInputProps } from '@/types/questions';

const PointsInput: React.FC<PointsInputProps> = ({ defaultValue, language }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {language === 'ru' ? 'Баллы за вопрос' : 'Сұрақ үшін ұпайлар'}
      </label>
      <input
        type="number"
        name="points"
        min="1"
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        defaultValue={defaultValue}
        required
      />
    </div>
  );
};

export default PointsInput;
