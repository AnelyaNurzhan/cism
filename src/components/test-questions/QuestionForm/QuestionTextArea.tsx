
import React from 'react';
import { QuestionTextAreaProps } from '@/types/questions';

const QuestionTextArea: React.FC<QuestionTextAreaProps> = ({ 
  defaultValue, 
  label, 
  name, 
  language 
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        name={name}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        rows={3}
        defaultValue={defaultValue}
        required
      />
    </div>
  );
};

export default QuestionTextArea;
