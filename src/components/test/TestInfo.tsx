
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle2 } from 'lucide-react';

interface TestInfoProps {
  test: {
    title_ru: string;
    title_kz: string;
    description_ru: string | null;
    description_kz: string | null;
    passing_score: number;
    time_limit: number;
  };
}

export const TestInfo: React.FC<TestInfoProps> = ({ test }) => {
  const { language } = useLanguage();

  return (
    <>
      <h1 className="text-2xl font-bold mb-2">
        {language === 'ru' ? test.title_ru : test.title_kz}
      </h1>
      
      <div className="prose max-w-none mb-6">
        <p>{language === 'ru' ? test.description_ru : test.description_kz}</p>
      </div>
      
      <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
        <h3 className="font-medium text-amber-800 mb-2">
          {language === 'ru' ? 'Информация о тесте' : 'Тест туралы ақпарат'}
        </h3>
        <ul className="space-y-2 text-sm text-amber-700">
          <li className="flex items-start">
            <CheckCircle2 size={16} className="mr-2 mt-0.5 flex-shrink-0" />
            {language === 'ru' 
              ? `Проходной балл: ${test.passing_score}%` 
              : `Өту балы: ${test.passing_score}%`}
          </li>
          <li className="flex items-start">
            <CheckCircle2 size={16} className="mr-2 mt-0.5 flex-shrink-0" />
            {language === 'ru' 
              ? 'После начала тест должен быть завершен за отведенное время' 
              : 'Басталғаннан кейін тест белгіленген уақыт ішінде аяқталуы керек'}
          </li>
          <li className="flex items-start">
            <CheckCircle2 size={16} className="mr-2 mt-0.5 flex-shrink-0" />
            {language === 'ru' 
              ? 'Результаты будут доступны сразу после завершения' 
              : 'Нәтижелер аяқталғаннан кейін бірден қол жетімді болады'}
          </li>
        </ul>
      </div>
    </>
  );
};
