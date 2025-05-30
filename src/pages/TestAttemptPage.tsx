
import React from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

// Import our components
import TestHeader from '@/components/test-attempt/TestHeader';
import TestContent from '@/components/test-attempt/TestContent';
import ConfirmDialog from '@/components/test-attempt/ConfirmDialog';
import ResultDialog from '@/components/test-attempt/ResultDialog';
import TestLoadingState from '@/components/test-attempt/TestLoadingState';
import TestSubmittingState from '@/components/test-attempt/TestSubmittingState';
import TestNotFoundState from '@/components/test-attempt/TestNotFoundState';

// Import our refactored custom hook
import { useTestAttempt } from '@/hooks/test-attempt';

const TestAttemptPage = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const { 
    test,
    questions,
    isLoading,
    isSubmitting,
    currentQuestion,
    currentQuestionIndex,
    userAnswers,
    showConfirmDialog,
    showResultDialog,
    testResult,
    handleNextQuestion,
    handlePrevQuestion,
    handleAnswerSelect,
    handleTabChange,
    handleCompleteTest,
    confirmCompleteTest,
    finishTest,
    setShowConfirmDialog,
    setShowResultDialog
  } = useTestAttempt(id, language);

  if (isLoading) {
    return <TestLoadingState />;
  }

  if (!test) {
    return <TestNotFoundState />;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <TestHeader 
        test={test}
        currentQuestionIndex={currentQuestionIndex}
        questionsCount={questions?.length || 0}
        testId={id || ''}
      />

      <div className="bg-white rounded-lg shadow-md overflow-hidden animate-fade-in">
        {questions && questions.length > 0 && (
          <TestContent 
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            currentQuestion={currentQuestion}
            userAnswers={userAnswers}
            language={language}
            handleTabChange={handleTabChange}
            handleAnswerSelect={handleAnswerSelect}
            handlePrevQuestion={handlePrevQuestion}
            handleNextQuestion={handleNextQuestion}
            handleCompleteTest={handleCompleteTest}
          />
        )}
      </div>
      
      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        onConfirm={confirmCompleteTest}
      />

      {/* Result Dialog */}
      <ResultDialog
        open={showResultDialog}
        onOpenChange={setShowResultDialog}
        testResult={testResult}
        onFinish={finishTest}
      />

      {/* Submitting overlay */}
      {isSubmitting && <TestSubmittingState />}
    </div>
  );
};

export default TestAttemptPage;
