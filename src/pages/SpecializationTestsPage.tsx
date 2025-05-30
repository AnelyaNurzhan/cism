
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useSpecializationTests } from '@/hooks/useSpecializationTests';
import TestListLoading from '@/components/test-list/TestListLoading';
import TestListError from '@/components/test-list/TestListError';
import TestListEmpty from '@/components/test-list/TestListEmpty';
import TestListContainer from '@/components/test-list/TestListContainer';

const SpecializationTestsPage = () => {
  const { specializationId, levelId } = useParams<{ specializationId: string, levelId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  const { 
    tests, 
    isLoading, 
    error, 
    handleRefresh, 
    isAuthenticated 
  } = useSpecializationTests(specializationId, levelId);

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-medium mb-4">
            {language === 'ru' 
              ? 'Требуется авторизация' 
              : 'Авторизация қажет'}
          </h2>
          <p className="text-gray-600 mb-6">
            {language === 'ru' 
              ? 'Пожалуйста, войдите в систему для доступа к тестам' 
              : 'Тесттерге кіру үшін жүйеге кіріңіз'}
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={() => navigate('/login')}>
              {language === 'ru' ? 'Войти' : 'Кіру'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <TestListLoading />;
  }

  if (error) {
    return <TestListError error={error} handleRefresh={handleRefresh} />;
  }

  if (!tests || tests.length === 0) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center gap-2"
          onClick={() => navigate(`/specialization/${specializationId}`)}
        >
          <ArrowLeft size={16} />
          {language === 'ru' ? 'Назад к уровням' : 'Деңгейлерге оралу'}
        </Button>
        
        <TestListEmpty handleRefresh={handleRefresh} />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center gap-2"
        onClick={() => navigate(`/specialization/${specializationId}`)}
      >
        <ArrowLeft size={16} />
        {language === 'ru' ? 'Назад к уровням' : 'Деңгейлерге оралу'}
      </Button>
      
      <TestListContainer 
        tests={tests} 
        handleRefresh={handleRefresh} 
      />
    </div>
  );
};

export default SpecializationTestsPage;
