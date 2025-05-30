
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Question } from '@/types/database';

interface ImportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  importedQuestions: Question[];
  isLoading: boolean;
  language: string;
}

const ImportDialog: React.FC<ImportDialogProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  importedQuestions, 
  isLoading, 
  language 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {language === 'ru' 
              ? 'Подтверждение импорта' 
              : 'Импортты растау'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p>
            {language === 'ru' 
              ? `Найдено ${importedQuestions.length} вопросов для импорта. Продолжить?` 
              : `Импорттауға ${importedQuestions.length} сұрақ табылды. Жалғастыру керек пе?`}
          </p>
          
          <div className="mt-4 max-h-64 overflow-y-auto border rounded-md p-3">
            <ul className="space-y-2 text-sm">
              {importedQuestions.slice(0, 5).map((q, idx) => (
                <li key={idx} className="border-b pb-1">
                  <span className="font-semibold">{idx + 1}.</span> {language === 'ru' ? q.text : q.textKz}
                </li>
              ))}
              {importedQuestions.length > 5 && (
                <li className="text-gray-500 italic text-center pt-2">
                  {language === 'ru' 
                    ? `... и еще ${importedQuestions.length - 5} вопросов` 
                    : `... және тағы да ${importedQuestions.length - 5} сұрақ`}
                </li>
              )}
            </ul>
          </div>
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            {language === 'ru' ? 'Отмена' : 'Болдырмау'}
          </Button>
          <Button 
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading 
              ? (language === 'ru' ? 'Импорт...' : 'Импорт...') 
              : (language === 'ru' ? 'Импортировать' : 'Импорттау')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportDialog;
