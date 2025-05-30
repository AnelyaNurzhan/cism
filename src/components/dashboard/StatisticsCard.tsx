
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { BarChart3, TrendingUp, Award } from 'lucide-react';

interface TestHistoryItem {
  id: string | number;
  passed: boolean;
}

interface StatisticsCardProps {
  testHistory: TestHistoryItem[];
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ testHistory }) => {
  const { language } = useLanguage();
  
  const totalTests = testHistory.length;
  const passedTests = testHistory.filter(test => test.passed).length;
  const failedTests = totalTests - passedTests;
  const successRate = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border">
      <div className="flex items-center mb-4">
        <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">
          {language === 'ru' ? 'Статистика тестирования' : 'Тестілеу статистикасы'}
        </h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{totalTests}</div>
          <div className="text-sm text-gray-600">
            {language === 'ru' ? 'Всего тестов' : 'Барлық тесттер'}
          </div>
        </div>
        
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{successRate}%</div>
          <div className="text-sm text-gray-600">
            {language === 'ru' ? 'Успешность' : 'Сәттілік'}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Award className="h-4 w-4 text-green-500 mr-2" />
            <span className="text-sm text-gray-700">
              {language === 'ru' ? 'Пройдено успешно' : 'Сәтті өтті'}
            </span>
          </div>
          <span className="text-sm font-medium text-green-600">{passedTests}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <TrendingUp className="h-4 w-4 text-red-500 mr-2" />
            <span className="text-sm text-gray-700">
              {language === 'ru' ? 'Требуют пересдачи' : 'Қайта тапсыру керек'}
            </span>
          </div>
          <span className="text-sm font-medium text-red-600">{failedTests}</span>
        </div>
      </div>

      {totalTests === 0 && (
        <div className="text-center py-4 text-gray-500">
          <BarChart3 className="h-12 w-12 mx-auto text-gray-300 mb-2" />
          <p className="text-sm">
            {language === 'ru' 
              ? 'Пройдите первый тест, чтобы увидеть статистику' 
              : 'Статистиканы көру үшін алғашқы тестті өтіңіз'}
          </p>
        </div>
      )}
    </div>
  );
};

export default StatisticsCard;
