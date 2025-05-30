
import { Question, QuestionOption } from '@/types/database';

export interface ExcelQuestionRow {
  [key: string]: string | number;
}

export interface ImportError {
  rowIndex: number;
  message: string;
}

export interface ImportResult {
  questions: Question[];
  errors: ImportError[];
}

export interface ColumnKeys {
  questionKey: string | undefined;
  typeKey: string | undefined;
  optionsKey: string | undefined;
  correctAnswersKey: string | undefined;
  pointsKey: string | undefined;
}
