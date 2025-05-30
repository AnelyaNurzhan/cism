
import React from 'react';
import { Link } from 'react-router-dom';
import { NotFoundStateProps } from '@/types/questions';

const NotFoundState: React.FC<NotFoundStateProps> = ({ language }) => (
  <div className="container mx-auto px-4 py-8">
    <div className="bg-red-50 p-4 rounded-md">
      <p className="text-red-600">
        {language === 'ru' ? 'Тест не найден' : 'Тест табылмады'}
      </p>
      <Link to="/admin" className="text-primary hover:underline mt-2 inline-block">
        {language === 'ru' ? 'Вернуться к панели администратора' : 'Әкімші тақтасына оралу'}
      </Link>
    </div>
  </div>
);

export default NotFoundState;
