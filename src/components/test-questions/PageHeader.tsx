
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageHeaderProps } from '@/types/questions';

const PageHeader: React.FC<PageHeaderProps> = ({ test, language }) => (
  <div className="flex items-center mb-6">
    <Link to="/admin" className="mr-4 text-gray-600 hover:text-gray-800">
      <ArrowLeft size={24} />
    </Link>
    <div>
      <h1 className="text-2xl font-bold text-primary">
        {language === 'ru' ? test.title_ru : test.title_kz}
      </h1>
      <p className="text-gray-600">
        {language === 'ru' ? 'Вопросы:' : 'Сұрақтар:'}
      </p>
    </div>
  </div>
);

export default PageHeader;
