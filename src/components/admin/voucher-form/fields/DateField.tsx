
import React, { useState } from 'react';
import { format } from 'date-fns';
import { ru, kk } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';

interface DateFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const DateField: React.FC<DateFieldProps> = ({ id, label, value, onChange }) => {
  const { language } = useLanguage();
  const [date, setDate] = useState<Date | undefined>(
    value ? new Date(value) : undefined
  );

  // Select the locale based on the current language
  const locale = language === 'ru' ? ru : kk;

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      // Format date to YYYY-MM-DD for input value
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      onChange(formattedDate);
    } else {
      onChange('');
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP', { locale }) : (
              <span>{language === 'ru' ? 'Выберите дату' : 'Күнді таңдаңыз'}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            initialFocus
            locale={locale}
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
