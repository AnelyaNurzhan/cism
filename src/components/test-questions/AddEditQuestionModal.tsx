
import React from 'react';
import { AddEditQuestionModalProps } from '@/types/questions';
import ModalHeader from './QuestionForm/ModalHeader';
import QuestionTextArea from './QuestionForm/QuestionTextArea';
import QuestionTypeSelect from './QuestionForm/QuestionTypeSelect';
import PointsInput from './QuestionForm/PointsInput';
import OptionsContainer from './QuestionForm/OptionsContainer';
import ModalFooter from './QuestionForm/ModalFooter';

const AddEditQuestionModal: React.FC<AddEditQuestionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingQuestion,
  language
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <ModalHeader editingQuestion={editingQuestion} language={language} />

        <form className="space-y-4" onSubmit={(e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);
          
          const questionData = {
            id: editingQuestion?.id,
            text: formData.get('questionTextRu') as string,
            textKz: formData.get('questionTextKz') as string,
            type: formData.get('questionType') as 'single' | 'multiple',
            options: [],
            correctAnswers: [],
            points: parseInt(formData.get('points') as string, 10) || 1,
            orderNumber: editingQuestion?.orderNumber
          };
          
          // Get options and correct answers
          const optionsCount = document.querySelectorAll('[name^="optionTextRu"]').length;
          for (let i = 0; i < optionsCount; i++) {
            const isCorrect = formData.getAll('correctOptions[]').includes((i + 1).toString());
            questionData.options.push({
              id: i + 1,
              text: formData.get(`optionTextRu${i}`) as string,
              textKz: formData.get(`optionTextKz${i}`) as string,
              isCorrect
            });
            
            if (isCorrect) {
              questionData.correctAnswers.push(i + 1);
            }
          }
          
          onSave(questionData);
        }}>
          {/* Question Text */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <QuestionTextArea
              defaultValue={editingQuestion?.text || ''}
              label={language === 'ru' ? 'Текст вопроса (RU)' : 'Сұрақ мәтіні (RU)'}
              name="questionTextRu"
              language={language}
            />
            <QuestionTextArea
              defaultValue={editingQuestion?.textKz || ''}
              label={language === 'ru' ? 'Текст вопроса (KZ)' : 'Сұрақ мәтіні (KZ)'}
              name="questionTextKz"
              language={language}
            />
          </div>

          {/* Question Type and Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <QuestionTypeSelect
              defaultValue={editingQuestion?.type || 'single'}
              language={language}
            />
            <PointsInput
              defaultValue={editingQuestion?.points || 1}
              language={language}
            />
          </div>

          {/* Answer Options Section */}
          <OptionsContainer
            initialOptions={editingQuestion?.options || []}
            correctAnswers={editingQuestion?.correctAnswers || []}
            language={language}
          />

          <ModalFooter
            onClose={onClose}
            editingQuestion={editingQuestion}
            language={language}
          />
        </form>
      </div>
    </div>
  );
};

export default AddEditQuestionModal;
