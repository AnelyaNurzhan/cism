
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface TestLoadingProps {
  isLoading: boolean;
}

export const TestLoading: React.FC<TestLoadingProps> = ({ isLoading }) => {
  if (!isLoading) return null;
  
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
};

interface TestErrorProps {
  error: unknown;
}

export const TestError: React.FC<TestErrorProps> = ({ error }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  if (!error) return null;
  
  return (
    <div className="text-center py-10">
      <div className="flex justify-center mb-4">
        <AlertTriangle size={48} className="text-red-500" />
      </div>
      <h2 className="text-2xl font-bold text-red-500 mb-4">
        {language === 'ru' ? 'Тест не найден' : 'Тест табылмады'}
      </h2>
      <p className="text-gray-600 mb-6">
        {language === 'ru' 
          ? 'Запрошенный тест не существует или был удален.' 
          : 'Сұралған тест жоқ немесе жойылды.'}
      </p>
      <Button onClick={() => navigate('/tests')}>
        {language === 'ru' ? 'Вернуться к списку тестов' : 'Тесттер тізіміне оралу'}
      </Button>
    </div>
  );
};
