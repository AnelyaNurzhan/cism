
import React from 'react';
import { ArrowUpDown, Edit, FileText, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Question } from '@/types/database';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

interface QuestionsTableProps {
  questions: Question[];
  language: string;
  onEdit: (question: Question) => void;
  onDelete: (questionId: string) => void;
}

const QuestionsTable: React.FC<QuestionsTableProps> = ({ 
  questions, 
  language, 
  onEdit, 
  onDelete 
}) => {
  const getQuestionTypeText = (type: string) => {
    if (language === 'ru') {
      return type === 'single' ? 'Одиночный выбор' : 'Множественный выбор';
    } else {
      return type === 'single' ? 'Жалғыз таңдау' : 'Көп таңдау';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="flex items-center">
                  <span>№</span>
                  <ArrowUpDown size={14} className="ml-1 opacity-50" />
                </div>
              </TableHead>
              <TableHead>
                {language === 'ru' ? 'Текст вопроса' : 'Сұрақ мәтіні'}
              </TableHead>
              <TableHead>
                {language === 'ru' ? 'Тип' : 'Түрі'}
              </TableHead>
              <TableHead>
                {language === 'ru' ? 'Варианты' : 'Нұсқалар'}
              </TableHead>
              <TableHead>
                {language === 'ru' ? 'Баллы' : 'Ұпайлар'}
              </TableHead>
              <TableHead className="text-right">
                {language === 'ru' ? 'Действия' : 'Әрекеттер'}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questions.length > 0 ? (
              questions.map((question, index) => (
                <TableRow key={question.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <div className="max-w-md truncate">
                      {language === 'ru' ? question.text : question.textKz}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getQuestionTypeText(question.type)}
                  </TableCell>
                  <TableCell>
                    {question.options.length}
                  </TableCell>
                  <TableCell>
                    {question.points}
                  </TableCell>
                  <TableCell className="text-right">
                    <button 
                      onClick={() => onEdit(question)}
                      className="text-primary hover:text-primary-light mr-3"
                      aria-label={language === 'ru' ? 'Редактировать' : 'Өңдеу'}
                    >
                      <Edit size={16} />
                    </button>
                    <Link 
                      to="#" 
                      className="text-blue-600 hover:text-blue-800 mr-3 inline-block"
                    >
                      <FileText size={16} />
                    </Link>
                    <button 
                      onClick={() => onDelete(question.id)}
                      className="text-red-600 hover:text-red-800"
                      aria-label={language === 'ru' ? 'Удалить' : 'Жою'}
                    >
                      <Trash size={16} />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-sm text-gray-500">
                  {language === 'ru' ? 'Вопросы не найдены' : 'Сұрақтар табылмады'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default QuestionsTable;
