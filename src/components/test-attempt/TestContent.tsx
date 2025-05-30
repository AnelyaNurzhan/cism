
import React from 'react';
import { QuestionFromDB } from '@/hooks/useTestResult';
import QuestionTabs from './QuestionTabs';
import QuestionDisplay from './QuestionDisplay';
import NavigationButtons from './NavigationButtons';

interface TestContentProps {
  questions: QuestionFromDB[];
  currentQuestionIndex: number;
  currentQuestion: QuestionFromDB | null;
  userAnswers: Record<string, string[]>;
  language: 'ru' | 'kz';
  handleTabChange: (index: string) => void;
  handleAnswerSelect: (questionId: string, answerId: string, isSingle: boolean) => void;
  handlePrevQuestion: () => void;
  handleNextQuestion: () => void;
  handleCompleteTest: () => void;
}

const TestContent = ({
  questions,
  currentQuestionIndex,
  currentQuestion,
  userAnswers,
  language,
  handleTabChange,
  handleAnswerSelect,
  handlePrevQuestion,
  handleNextQuestion,
  handleCompleteTest,
}: TestContentProps) => {
  return (
    <>
      {/* Question Tabs */}
      <QuestionTabs
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        userAnswers={userAnswers}
        onTabChange={handleTabChange}
      />
      
      {/* Question and Answers */}
      <div className="p-6">
        <QuestionDisplay
          currentQuestion={currentQuestion}
          userAnswers={userAnswers}
          onAnswerSelect={handleAnswerSelect}
          language={language}
        />

        {/* Navigation Buttons */}
        <NavigationButtons
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          onPrevious={handlePrevQuestion}
          onNext={handleNextQuestion}
          onComplete={handleCompleteTest}
        />
      </div>
    </>
  );
};

export default TestContent;
