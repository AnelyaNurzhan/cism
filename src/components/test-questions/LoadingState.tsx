
import React from 'react';
import { LoadingStateProps } from '@/types/questions';

const LoadingState: React.FC<LoadingStateProps> = ({ language }) => (
  <div className="container mx-auto px-4 py-8">
    <div className="flex flex-col items-center justify-center h-40">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
      <p className="text-gray-500">
        {language === 'ru' ? 'Загрузка вопросов...' : 'Сұрақтар жүктелуде...'}
      </p>
    </div>
  </div>
);

export default LoadingState;
