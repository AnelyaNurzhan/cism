
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const ConfirmDialog = ({
  open,
  onOpenChange,
  onConfirm,
}: ConfirmDialogProps) => {
  const { language } = useLanguage();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {language === 'ru' 
              ? 'Завершить тест?' 
              : 'Тестті аяқтау керек пе?'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {language === 'ru'
              ? 'Вы уверены, что хотите завершить тест? После этого вы не сможете изменить свои ответы.'
              : 'Тестті аяқтау керектігіне сенімдісіз бе? Осыдан кейін жауаптарыңызды өзгерте алмайсыз.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {language === 'ru' ? 'Отмена' : 'Бас тарту'}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {language === 'ru' ? 'Да, завершить' : 'Иә, аяқтау'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;
