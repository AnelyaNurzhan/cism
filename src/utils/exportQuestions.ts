
import * as XLSX from 'xlsx';
import { Question } from '@/types/database';
import { generateExcelFileName } from './adminUtils';

export const exportQuestionsToExcel = (
  questions: Question[], 
  testName: string,
  language: string
): string | void => {
  if (questions.length === 0) {
    alert(language === 'ru' ? 'Нет вопросов для экспорта' : 'Экспорттау үшін сұрақтар жоқ');
    return;
  }

  try {
    // Transform questions to worksheet-friendly format
    const questionsData = questions.map((question, index) => {
      // Get correct options text
      const correctOptions = question.options
        .filter((_, optionIndex) => question.correctAnswers.includes(optionIndex + 1))
        .map(option => language === 'ru' ? option.text : option.textKz)
        .join('; ');

      return {
        [language === 'ru' ? '№' : '№']: index + 1,
        [language === 'ru' ? 'Вопрос' : 'Сұрақ']: language === 'ru' ? question.text : question.textKz,
        [language === 'ru' ? 'Тип' : 'Түрі']: language === 'ru' 
          ? (question.type === 'single' ? 'Одиночный выбор' : 'Множественный выбор')
          : (question.type === 'single' ? 'Жалғыз таңдау' : 'Көп таңдау'),
        [language === 'ru' ? 'Варианты ответов' : 'Жауап нұсқалары']: question.options
          .map((option) => language === 'ru' ? option.text : option.textKz)
          .join('; '),
        [language === 'ru' ? 'Правильные ответы' : 'Дұрыс жауаптар']: correctOptions,
        [language === 'ru' ? 'Баллы' : 'Ұпайлар']: question.points
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(questionsData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Questions');
    
    // Format column widths
    const maxWidths = [
      { wch: 5 },  // №
      { wch: 50 }, // Question
      { wch: 20 }, // Type
      { wch: 50 }, // Options
      { wch: 30 }, // Correct answers
      { wch: 10 }, // Points
    ];
    
    worksheet['!cols'] = maxWidths;
    
    // Generate filename with test name and date
    const fileName = generateExcelFileName(`questions_${testName.replace(/\s+/g, '_')}`);
    
    XLSX.writeFile(workbook, fileName);
    
    return fileName;
  } catch (error) {
    console.error('Error exporting questions:', error);
    alert(language === 'ru' 
      ? 'Ошибка при экспорте вопросов' 
      : 'Сұрақтарды экспорттау кезінде қате'
    );
  }
};
