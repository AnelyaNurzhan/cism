
import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TestSelectorProps {
  tests: any[];
  selectedTestIds: string[];
  onTestToggle: (testId: string) => void;
  language: string;
}

export const TestSelector: React.FC<TestSelectorProps> = ({
  tests,
  selectedTestIds,
  onTestToggle,
  language
}) => {
  return (
    <div className="space-y-2">
      <Label>
        {language === 'ru' ? 'Выберите тесты' : 'Тесттерді таңдаңыз'}
      </Label>
      <div className="border rounded-md p-2">
        <ScrollArea className="h-48">
          <div className="space-y-2 p-2">
            {tests.map((test) => (
              <div key={test.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={`test-${test.id}`} 
                  checked={selectedTestIds.includes(test.id)}
                  onCheckedChange={() => onTestToggle(test.id)}
                />
                <Label 
                  htmlFor={`test-${test.id}`}
                  className="cursor-pointer text-sm"
                >
                  {language === 'ru' ? test.title_ru : test.title_kz}
                </Label>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      <p className="text-xs text-gray-500">
        {language === 'ru' 
          ? `Выбрано тестов: ${selectedTestIds.length}` 
          : `Таңдалған тесттер: ${selectedTestIds.length}`}
      </p>
    </div>
  );
};
