
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Check } from 'lucide-react';
import { QuestionFromDB } from '@/hooks/useTestResult';

interface QuestionDisplayProps {
  currentQuestion: QuestionFromDB | null;
  userAnswers: Record<string, string[]>;
  onAnswerSelect: (questionId: string, answerId: string, isSingle: boolean) => void;
  language: 'ru' | 'kz';
}

const QuestionDisplay = ({
  currentQuestion,
  userAnswers,
  onAnswerSelect,
  language,
}: QuestionDisplayProps) => {
  if (!currentQuestion) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500">
          {language === 'ru' 
            ? 'Нет доступных вопросов' 
            : 'Қол жетімді сұрақтар жоқ'}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-medium mb-4">
        {language === 'ru' 
          ? currentQuestion.question_text_ru 
          : currentQuestion.question_text_kz}
      </h2>
      
      <div className="space-y-2 mt-6">
        {currentQuestion.answers && currentQuestion.answers.map((answer) => (
          <div 
            key={answer.id} 
            className={`p-4 border rounded-md cursor-pointer transition-all duration-200 ${
              userAnswers[currentQuestion.id]?.includes(answer.id)
                ? 'bg-green-50 border-green-200 scale-[1.01] shadow-sm' 
                : 'hover:bg-gray-50'
            }`}
            onClick={() => onAnswerSelect(
              currentQuestion.id, 
              answer.id, 
              currentQuestion.question_type === 'single'
            )}
          >
            <div className="flex items-start gap-3">
              {currentQuestion.question_type === 'single' ? (
                <div className={`rounded-full w-5 h-5 mt-0.5 border transition-all ${
                  userAnswers[currentQuestion.id]?.includes(answer.id)
                    ? 'border-green-500 bg-green-500'
                    : 'border-gray-300'
                }`}>
                  {userAnswers[currentQuestion.id]?.includes(answer.id) && (
                    <Check size={16} className="text-white" />
                  )}
                </div>
              ) : (
                <Checkbox 
                  checked={userAnswers[currentQuestion.id]?.includes(answer.id)} 
                  className="mt-0.5"
                />
              )}
              <div className="flex-1">
                {language === 'ru' ? answer.answer_text_ru : answer.answer_text_kz}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionDisplay;
