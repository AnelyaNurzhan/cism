
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Edit, FileText, Trash, Clock } from 'lucide-react';
import { TestType } from './types';

interface TestsTableProps {
  tests: TestType[];
  onEditTest: (test: TestType) => void;
  onDeleteTest: (testId: string) => void;
}

const TestsTable: React.FC<TestsTableProps> = ({ tests, onEditTest, onDeleteTest }) => {
  const { language } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'ru' ? 'Название теста' : 'Тест атауы'}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'ru' ? 'Время (мин)' : 'Уақыт (мин)'}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'ru' ? 'Проходной балл' : 'Өту балы'}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'ru' ? 'Статус' : 'Күйі'}
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'ru' ? 'Действия' : 'Әрекеттер'}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tests.map((test) => (
              <tr key={test.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{test.title_ru}</div>
                  <div className="text-xs text-gray-500">
                    {test.description_ru && test.description_ru.substring(0, 60)}
                    {test.description_ru && test.description_ru.length > 60 ? '...' : ''}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                  <Clock size={14} className="mr-1" />
                  {test.time_limit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {test.passing_score}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${test.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {test.is_active
                      ? (language === 'ru' ? 'Активен' : 'Белсенді')
                      : (language === 'ru' ? 'Черновик' : 'Қарап жүру')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => onEditTest(test)}
                    className="text-primary hover:text-primary-light mr-3"
                  >
                    <Edit size={16} />
                  </button>
                  <Link 
                    to={`/test/${test.id}/questions`} 
                    className="text-blue-600 hover:text-blue-800 mr-3 inline-block"
                  >
                    <FileText size={16} />
                  </Link>
                  <button 
                    onClick={() => onDeleteTest(test.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {tests.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                  {language === 'ru' ? 'Тесты не найдены' : 'Тесттер табылмады'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestsTable;
