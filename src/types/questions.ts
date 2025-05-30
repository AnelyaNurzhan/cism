
import { Question, QuestionOption } from './database';

export interface AddEditQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: QuestionFormData) => void;
  editingQuestion: Question | null;
  language: string;
}

export interface QuestionFormData {
  id?: string;
  text: string;
  textKz: string;
  type: 'single' | 'multiple';
  options: QuestionOption[];
  correctAnswers: number[];
  points: number;
  orderNumber?: number;
}

export interface ModalHeaderProps {
  editingQuestion: Question | null;
  language: string;
}

export interface QuestionTextAreaProps {
  defaultValue: string;
  label: string;
  name: string;
  language: string;
}

export interface QuestionTypeSelectProps {
  defaultValue: 'single' | 'multiple';
  language: string;
}

export interface PointsInputProps {
  defaultValue: number;
  language: string;
}

export interface OptionsContainerProps {
  initialOptions: QuestionOption[];
  correctAnswers: number[];
  language: string;
}

export interface ModalFooterProps {
  onClose: () => void;
  editingQuestion: Question | null;
  language: string;
}

export interface TestQuestionsPageProps {
  language: string;
}

export interface PageHeaderProps {
  test: any; 
  language: string;
}

export interface ActionButtonsProps {
  onAdd: () => void;
  onImport: (file: File) => void;
  onExport: () => void;
  language: string;
}

export interface LoadingStateProps {
  language: string;
}

export interface NotFoundStateProps {
  language: string;
}

export interface ImportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  importedQuestions: Question[];
  isLoading: boolean;
  language: string;
}

