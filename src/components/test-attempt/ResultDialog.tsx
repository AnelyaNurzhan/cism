
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface TestResultProps {
  score: number;
  totalQuestions: number;
  isPassed: boolean;
}

interface ResultDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  testResult: TestResultProps;
  onFinish: () => void;
}

const ResultDialog = ({
  open,
  onOpenChange,
  testResult,
  onFinish,
}: ResultDialogProps) => {
  const { language } = useLanguage();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {language === 'ru' 
              ? 'Результаты теста' 
              : 'Тест нәтижелері'}
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <p>
              {language === 'ru'
                ? `Вы ответили правильно на ${testResult.score} из ${testResult.totalQuestions} вопросов.`
                : `Сіз ${testResult.totalQuestions} сұрақтың ${testResult.score} дұрыс жауап бердіңіз.`}
            </p>
            
            {testResult.isPassed ? (
              <div className="bg-green-50 p-4 rounded-md border border-green-200">
                <p className="font-medium text-green-800">
                  {language === 'ru' 
                    ? 'Поздравляем! Вы успешно прошли тест.' 
                    : 'Құттықтаймыз! Сіз тестті сәтті тапсырдыңыз.'}
                </p>
                <p className="mt-2 text-green-700">
                  {language === 'ru'
                    ? 'Ваш сертификат будет готов в течение 2-3 дней и отправлен на вашу электронную почту.'
                    : 'Сіздің сертификатыңыз 2-3 күн ішінде дайын болады және электрондық поштаңызға жіберіледі.'}
                </p>
              </div>
            ) : (
              <div className="bg-red-50 p-4 rounded-md border border-red-200">
                <p className="font-medium text-red-800">
                  {language === 'ru' 
                    ? 'К сожалению, вы не прошли тест.' 
                    : 'Өкінішке орай, сіз тестті тапсыра алмадыңыз.'}
                </p>
                <p className="mt-2 text-red-700">
                  {language === 'ru'
                    ? 'Вы можете попробовать пройти тест еще раз.'
                    : 'Сіз тестті қайтадан тапсыруға тырысып көре аласыз.'}
                </p>
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onFinish}>
            {language === 'ru' ? 'Понятно' : 'Түсінікті'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ResultDialog;
