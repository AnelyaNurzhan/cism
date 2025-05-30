
import * as XLSX from 'xlsx';
import { Question, QuestionOption } from '@/types/database';
import { toast } from 'sonner';

interface ExcelQuestionRow {
  [key: string]: string | number;
}

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
        const questionKey = Object.keys(rowsJson[0]).find(key => 
          key.toLowerCase().includes('вопрос') || key.toLowerCase().includes('сұрақ')
        );
        
        const typeKey = Object.keys(rowsJson[0]).find(key => 
          key.toLowerCase().includes('тип') || key.toLowerCase().includes('түрі')
        );
        
        const optionsKey = Object.keys(rowsJson[0]).find(key => 
          key.toLowerCase().includes('вариант') || key.toLowerCase().includes('нұсқа')
        );
        
        const correctAnswersKey = Object.keys(rowsJson[0]).find(key => 
          key.toLowerCase().includes('правильн') || key.toLowerCase().includes('дұрыс')
        );
        
        const pointsKey = Object.keys(rowsJson[0]).find(key => 
          key.toLowerCase().includes('балл') || key.toLowerCase().includes('ұпай')
        );
        
        // Validate required columns exist
        if (!questionKey || !optionsKey || !correctAnswersKey) {
          reject(new Error(
            language === 'ru' 
              ? 'Структура файла не соответствует требуемой. Необходимы колонки: Вопрос, Варианты ответов, Правильные ответы' 
              : 'Файл құрылымы қажетті талаптарға сәйкес келмейді. Қажетті бағандар: Сұрақ, Жауап нұсқалары, Дұрыс жауаптар'
          ));
          return;
        }
        
        // Parse and validate each row
        const questions: Question[] = [];
        const errors: string[] = [];
        
        rowsJson.forEach((row, index) => {
          try {
            const questionText = String(row[questionKey]);
            const optionsText = String(row[optionsKey]);
            const correctAnswersText = String(row[correctAnswersKey]);
            
            // Validate required fields
            if (!questionText || !optionsText || !correctAnswersText) {
              errors.push(`${language === 'ru' ? 'Строка' : 'Жол'} ${index + 1}: ${
                language === 'ru' 
                  ? 'Отсутствуют обязательные поля' 
                  : 'Міндетті өрістер жоқ'
              }`);
              return;
            }
            
            // Parse options
            const optionsList = optionsText.split(';').map(o => o.trim()).filter(Boolean);
            if (optionsList.length < 2) {
              errors.push(`${language === 'ru' ? 'Строка' : 'Жол'} ${index + 1}: ${
                language === 'ru' 
                  ? 'Должно быть не менее 2 вариантов ответа' 
                  : 'Кемінде 2 жауап нұсқасы болуы керек'
              }`);
              return;
            }
            
            // Parse correct answers
            const correctAnswersList = correctAnswersText.split(';').map(a => a.trim()).filter(Boolean);
            if (correctAnswersList.length === 0) {
              errors.push(`${language === 'ru' ? 'Строка' : 'Жол'} ${index + 1}: ${
                language === 'ru' 
                  ? 'Не указаны правильные ответы' 
                  : 'Дұрыс жауаптар көрсетілмеген'
              }`);
              return;
            }
            
            // Determine question type based on correct answers count or explicit value
            let questionType: 'single' | 'multiple';
            if (typeKey && row[typeKey]) {
              const typeValue = String(row[typeKey]).toLowerCase();
              questionType = 
                typeValue.includes('один') || typeValue.includes('жалғыз') 
                  ? 'single' 
                  : 'multiple';
            } else {
              questionType = correctAnswersList.length === 1 ? 'single' : 'multiple';
            }
            
            // Create options array with correct answers marked
            const questionOptions: QuestionOption[] = optionsList.map((text, i) => ({
              id: i + 1,
              text: text,
              textKz: text, // Both languages get same text in import, user can edit later
              isCorrect: correctAnswersList.includes(text)
            }));
            
            // Get correct answers as array of indices
            const correctAnswersIndices = questionOptions
              .map((opt, i) => opt.isCorrect ? i + 1 : null)
              .filter(Boolean) as number[];
              
            if (correctAnswersIndices.length === 0) {
              errors.push(`${language === 'ru' ? 'Строка' : 'Жол'} ${index + 1}: ${
                language === 'ru' 
                  ? 'Не удалось определить правильные ответы' 
                  : 'Дұрыс жауаптарды анықтау мүмкін емес'
              }`);
              return;
            }
            
            // Get points value
            const points = pointsKey && row[pointsKey] 
              ? Number(row[pointsKey]) || 1 
              : 1;
            
            // Create question object
            questions.push({
              id: '', // Will be generated by the database
              text: questionText,
              textKz: questionText, // Both languages get same text in import, user can edit later
              type: questionType,
              options: questionOptions,
              correctAnswers: correctAnswersIndices,
              points: points,
              orderNumber: questions.length + 1
            });
            
          } catch (err) {
            errors.push(`${language === 'ru' ? 'Строка' : 'Жол'} ${index + 1}: ${
              language === 'ru' 
                ? 'Ошибка обработки' 
                : 'Өңдеу қатесі'
            }`);
          }
        });
        
        // Show errors if any
        if (errors.length > 0) {
          const errorMessage = `${
            language === 'ru' 
              ? `Найдены ошибки (${errors.length}):` 
              : `Қателер табылды (${errors.length}):`
          }\n${errors.slice(0, 5).join('\n')}${
            errors.length > 5 
              ? `\n${language === 'ru' ? '..и еще' : '...және тағы'} ${errors.length - 5}` 
              : ''
          }`;
          reject(new Error(errorMessage));
          return;
        }
        
        resolve(questions);
        
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

export const saveImportedQuestions = async (
  questions: Question[],
  testId: string,
  supabase: any,
  language: string
): Promise<boolean> => {
  try {
    // Batch insert questions
    for (const question of questions) {
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
