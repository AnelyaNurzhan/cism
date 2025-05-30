
import { ExcelQuestionRow, ColumnKeys } from './types';

/**
 * Detects column headers in the Excel file based on language
 */
export const detectColumnKeys = (
  firstRow: ExcelQuestionRow,
  language: string
): ColumnKeys => {
  const questionKey = Object.keys(firstRow).find(key => 
    key.toLowerCase().includes('вопрос') || key.toLowerCase().includes('сұрақ')
  );
  
  const typeKey = Object.keys(firstRow).find(key => 
    key.toLowerCase().includes('тип') || key.toLowerCase().includes('түрі')
  );
  
  const optionsKey = Object.keys(firstRow).find(key => 
    key.toLowerCase().includes('вариант') || key.toLowerCase().includes('нұсқа')
  );
  
  const correctAnswersKey = Object.keys(firstRow).find(key => 
    key.toLowerCase().includes('правильн') || key.toLowerCase().includes('дұрыс')
  );
  
  const pointsKey = Object.keys(firstRow).find(key => 
    key.toLowerCase().includes('балл') || key.toLowerCase().includes('ұпай')
  );

  return {
    questionKey,
    typeKey,
    optionsKey,
    correctAnswersKey,
    pointsKey
  };
};

/**
 * Validates that all required column keys are present
 */
export const validateRequiredColumns = (
  columnKeys: ColumnKeys,
  language: string
): string | null => {
  const { questionKey, optionsKey, correctAnswersKey } = columnKeys;
  
  if (!questionKey || !optionsKey || !correctAnswersKey) {
    return language === 'ru' 
      ? 'Структура файла не соответствует требуемой. Необходимы колонки: Вопрос, Варианты ответов, Правильные ответы' 
      : 'Файл құрылымы қажетті талаптарға сәйкес келмейді. Қажетті бағандар: Сұрақ, Жауап нұсқалары, Дұрыс жауаптар';
  }
  
  return null;
};
