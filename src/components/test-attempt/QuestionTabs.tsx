
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QuestionFromDB } from '@/hooks/useTestResult';
import { motion } from 'framer-motion';

interface QuestionTabsProps {
  questions: QuestionFromDB[];
  currentQuestionIndex: number;
  userAnswers: Record<string, string[]>;
  onTabChange: (index: string) => void;
}

const QuestionTabs = ({
  questions,
  currentQuestionIndex,
  userAnswers,
  onTabChange,
}: QuestionTabsProps) => {
  return (
    <div className="px-6 pt-4 overflow-x-auto">
      <Tabs 
        value={currentQuestionIndex.toString()} 
        onValueChange={onTabChange}
      >
        <TabsList className="h-auto p-1 flex flex-wrap">
          {questions.map((question, index) => {
            const isAnswered = userAnswers[question.id]?.length > 0;
            return (
              <TabsTrigger 
                key={question.id} 
                value={index.toString()}
                className={`px-3 py-1.5 m-0.5 transition-colors relative ${
                  isAnswered
                    ? 'bg-green-50' 
                    : 'bg-gray-50'
                }`}
              >
                {isAnswered && (
                  <motion.div
                    className="absolute inset-0 bg-green-100 rounded-sm -z-10"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
                <span>{index + 1}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default QuestionTabs;
