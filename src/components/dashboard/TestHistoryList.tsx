
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

interface TestHistoryItem {
  id: string | number;
  name: {
    ru: string;
    kz: string;
  };
  date: string;
  score: number;
  maxScore: number;
  passed: boolean;
}

interface TestHistoryListProps {
  testHistory: TestHistoryItem[];
}

const TestHistoryList: React.FC<TestHistoryListProps> = ({ testHistory }) => {
  const { language } = useLanguage();

  if (testHistory.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500 border">
        {language === 'ru' 
          ? 'У вас еще нет истории прохождения тестов' 
          : 'Сізде әлі тесттерден өту тарихы жоқ'}
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {testHistory.map((test) => {
        // Обеспечиваем минимальный процент для видимости прогресса
        const percentage = Math.max((test.score / test.maxScore) * 100, 0);
        const displayPercentage = Math.max(percentage, 2); // Минимум 2% для видимости
        
        return (
          <div key={test.id} className="bg-white rounded-lg shadow-md p-4 border hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">
                  {test.name[language === 'ru' ? 'ru' : 'kz']}
                </h3>
                <p className="text-sm text-gray-500 mt-1 flex items-center">
                  <Clock size={14} className="mr-1" />
                  {new Date(test.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex-shrink-0 ml-3">
                {test.passed ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle size={12} className="mr-1" />
                    {language === 'ru' ? 'Пройден' : 'Өтті'}
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <XCircle size={12} className="mr-1" />
                    {language === 'ru' ? 'Не пройден' : 'Өтпеді'}
                  </span>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">
                  {language === 'ru' ? 'Результат' : 'Нәтиже'}: {test.score}/{test.maxScore}
                </span>
                <span className="font-medium text-gray-900">
                  {Math.round(percentage)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    test.passed ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(displayPercentage, 100)}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TestHistoryList;
