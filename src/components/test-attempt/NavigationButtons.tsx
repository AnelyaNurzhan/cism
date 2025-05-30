
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface NavigationButtonsProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  onComplete: () => void;
}

const NavigationButtons = ({
  currentQuestionIndex,
  totalQuestions,
  onPrevious,
  onNext,
  onComplete,
}: NavigationButtonsProps) => {
  const { language } = useLanguage();

  return (
    <>
      <div className="flex justify-between mt-8">
        <Button 
          variant="outline"
          onClick={onPrevious}
          disabled={currentQuestionIndex === 0}
        >
          <ArrowLeft size={16} className="mr-2" />
          {language === 'ru' ? 'Предыдущий' : 'Алдыңғы'}
        </Button>

        {currentQuestionIndex < totalQuestions - 1 ? (
          <Button onClick={onNext}>
            {language === 'ru' ? 'Следующий' : 'Келесі'}
            <ArrowRight size={16} className="ml-2" />
          </Button>
        ) : (
          <Button 
            onClick={onComplete}
            variant="default"
          >
            {language === 'ru' ? 'Завершить тест' : 'Тестті аяқтау'}
            <Check size={16} className="ml-2" />
          </Button>
        )}
      </div>

      <div className="mt-4 flex justify-center">
        <Button 
          variant="outline" 
          onClick={onComplete}
          className="text-gray-500"
        >
          {language === 'ru' ? 'Завершить тест' : 'Тестті аяқтау'}
        </Button>
      </div>
    </>
  );
};

export default NavigationButtons;
