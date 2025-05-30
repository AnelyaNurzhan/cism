
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { VoucherForm } from './VoucherForm';
import { useVoucherActivation } from '@/hooks/voucher-activation';

interface VoucherActivationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  testId: string;
  onSuccess: (voucherId: string) => void;
}

export const VoucherActivationModal: React.FC<VoucherActivationModalProps> = ({ 
  open, 
  onOpenChange,
  testId,
  onSuccess 
}) => {
  const { language } = useLanguage();
  
  const {
    voucherCode,
    setVoucherCode,
    isChecking,
    isValid,
    errorMessage,
    resetState,
    activateVoucher
  } = useVoucherActivation({ testId, onSuccess });

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      resetState();
    }
    onOpenChange(open);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    activateVoucher();
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {language === 'ru' ? 'Активация ваучера' : 'Ваучерді белсендіру'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <VoucherForm
            voucherCode={voucherCode}
            onVoucherCodeChange={setVoucherCode}
            isChecking={isChecking}
            isValid={isValid}
            errorMessage={errorMessage}
          />

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => handleDialogOpenChange(false)}
              disabled={isChecking}
            >
              {language === 'ru' ? 'Отмена' : 'Болдырмау'}
            </Button>
            <Button 
              type="submit" 
              disabled={isChecking || isValid === true || !voucherCode.trim()}
            >
              {isChecking ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {language === 'ru' ? 'Проверка...' : 'Тексеру...'}
                </span>
              ) : (
                language === 'ru' ? 'Активировать' : 'Белсендіру'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
