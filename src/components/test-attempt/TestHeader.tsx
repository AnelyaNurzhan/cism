
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Test } from '@/types/database';

interface TestHeaderProps {
  test: Test;
  currentQuestionIndex: number;
  questionsCount: number;
  testId: string;
}

const TestHeader = ({ test, currentQuestionIndex, questionsCount, testId }: TestHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();

  const handleBackNavigation = () => {
    const state = location.state as { 
      fromSpecialization?: string; 
      fromLevel?: string; 
      specializationId?: string; 
      levelId?: string; 
    } | null;
    
    if (state?.fromSpecialization && state?.fromLevel) {
      // If came from specialization test page, navigate back to that page
      navigate(`/specialization/${state.fromSpecialization}/level/${state.fromLevel}`);
    } else if (state?.specializationId) {
      // If came from specialization, navigate back to specialization
      navigate(`/specialization/${state.specializationId}`);
    } else {
      // Default: navigate to test page
      navigate(`/test/${testId}`);
    }
  };

  return (
    <>
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center gap-2"
        onClick={handleBackNavigation}
      >
        <ArrowLeft size={16} />
        {language === 'ru' ? 'Назад' : 'Артқа'}
      </Button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden animate-fade-in">
        {/* Test Header */}
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold">
            {language === 'ru' ? test.title_ru : test.title_kz}
          </h1>
          
          <p className="text-gray-500 mt-2">
            {language === 'ru'
              ? `Вопрос ${currentQuestionIndex + 1} из ${questionsCount}`
              : `Сұрақ ${currentQuestionIndex + 1} / ${questionsCount}`}
          </p>
        </div>
      </div>
    </>
  );
};

export default TestHeader;
