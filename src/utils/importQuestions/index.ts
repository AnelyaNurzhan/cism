
import * as XLSX from 'xlsx';
import { toast } from 'sonner';
import { Question } from '@/types/database';
import { ExcelQuestionRow, ImportResult } from './types';
import { detectColumnKeys, validateRequiredColumns } from './columnDetection';
import { parseQuestionRow } from './rowParsing';

/**
 * Imports questions from an Excel file
 */
export const importQuestionsFromExcel = (
  file: File,
  testId: string,
  language: string
): Promise<Question[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        if (!e.target?.result) {
          reject(new Error(language === 'ru' ? 'Ошибка чтения файла' : 'Файлды оқу қатесі'));
          return;
        }

        // Parse workbook
        const data = new Uint8Array(e.target.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Get first worksheet
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        
        // Convert to JSON
        const rowsJson = XLSX.utils.sheet_to_json<ExcelQuestionRow>(worksheet);
        
        if (rowsJson.length === 0) {
          reject(new Error(language === 'ru' ? 'Файл не содержит данных' : 'Файл деректерді қамтымайды'));
          return;
        }
        
        // Detect column headers based on language
        const columnKeys = detectColumnKeys(rowsJson[0], language);
        
        // Validate required columns exist
        const columnsError = validateRequiredColumns(columnKeys, language);
        if (columnsError) {
          reject(new Error(columnsError));
          return;
        }
        
        // Parse and validate each row
        const result: ImportResult = {
          questions: [],
          errors: []
        };
        
        rowsJson.forEach((row, index) => {
          const { question, error } = parseQuestionRow(row, index, columnKeys, language);
          
          if (question) {
            result.questions.push(question);
          }
          
          if (error) {
            result.errors.push(error);
          }
        });
        
        // Show errors if any
        if (result.errors.length > 0) {
          const errorMessage = formatErrorMessage(result.errors, language);
          reject(new Error(errorMessage));
          return;
        }
        
        resolve(result.questions);
        
      } catch (error) {
        console.error('Error importing questions:', error);
        reject(new Error(
          language === 'ru' 
            ? 'Ошибка импорта вопросов' 
            : 'Сұрақтарды импорттау кезінде қате'
        ));
      }
    };
    
    reader.onerror = () => {
      reject(new Error(
        language === 'ru' 
          ? 'Ошибка чтения файла' 
          : 'Файлды оқу қатесі'
      ));
    };
    
    reader.readAsArrayBuffer(file);
  });
};

/**
 * Format error messages for display
 */
const formatErrorMessage = (errors: Array<{ rowIndex: number, message: string }>, language: string): string => {
  const header = language === 'ru' 
    ? `Найдены ошибки (${errors.length}):` 
    : `Қателер табылды (${errors.length}):`;
    
  const errorMessages = errors.slice(0, 5).map(err => 
    `${language === 'ru' ? 'Строка' : 'Жол'} ${err.rowIndex + 1}: ${err.message}`
  );
  
  const remaining = errors.length > 5 
    ? `\n${language === 'ru' ? '..и еще' : '...және тағы'} ${errors.length - 5}` 
    : '';
    
  return `${header}\n${errorMessages.join('\n')}${remaining}`;
};

/**
 * Saves imported questions to the database
 */
export const saveImportedQuestions = async (
  questions: Question[],
  testId: string,
  supabase: any,
  language: string
): Promise<boolean> => {
  try {
    // Batch insert questions
    for (const question of questions) {
      await insertQuestion(question, testId, supabase);
    }
    
    return true;
  } catch (error) {
    console.error('Error saving imported questions:', error);
    toast.error(
      language === 'ru' 
        ? 'Ошибка при сохранении импортированных вопросов' 
        : 'Импортталған сұрақтарды сақтау кезінде қате'
    );
    return false;
  }
};

/**
 * Insert a single question with its answers
 */
const insertQuestion = async (question: Question, testId: string, supabase: any) => {
  // Insert question
  const questionData = {
    test_id: testId,
    question_text_ru: question.text,
    question_text_kz: question.textKz,
    question_type: question.type === 'single' ? 'single_choice' : 'multiple_choice',
    order_number: question.orderNumber
  };
  
  const { data: insertedQuestion, error: questionError } = await supabase
    .from('questions')
    .insert(questionData)
    .select();
    
  if (questionError) {
    console.error('Error inserting question:', questionError);
    throw new Error(questionError.message);
  }
  
  const questionId = insertedQuestion[0].id;
  
  // Insert answers
  const answersData = question.options.map(option => ({
    question_id: questionId,
    answer_text_ru: option.text,
    answer_text_kz: option.textKz,
    is_correct: question.correctAnswers.includes(option.id)
  }));
  
  const { error: answerError } = await supabase
    .from('answers')
    .insert(answersData);
    
  if (answerError) {
    console.error('Error inserting answers:', answerError);
    throw new Error(answerError.message);
  }
};
