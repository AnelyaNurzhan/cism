
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { VoucherActivationModal } from '@/components/test/VoucherActivationModal';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface TestCardProps {
  id: string;
  title: { ru: string; kz: string };
  description: { ru: string | null; kz: string | null };
  duration: number;
  questions: number;
  hasAccess?: boolean;
}

const TestCard: React.FC<TestCardProps> = ({ id, title, description, duration, questions, hasAccess = false }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [showVoucherModal, setShowVoucherModal] = useState(false);

  const handleStartTest = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Админы могут сразу переходить к тесту
    if (profile?.role === 'admin') {
      navigate(`/test/${id}`);
      return;
    }
    
    // Для всех остальных - всегда нужен ваучер
    setShowVoucherModal(true);
  };

  const handleVoucherSuccess = (voucherId: string) => {
    toast.success(language === 'ru' 
      ? 'Ваучер успешно активирован!' 
      : 'Ваучер сәтті белсендірілді!');
    
    setShowVoucherModal(false);
    
    // Navigate to test page with voucher activation data
    navigate(`/test/${id}`, {
      state: {
        voucherId,
        fromVoucherActivation: true
      }
    });
  };

  const isAdmin = profile?.role === 'admin';

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-[1.01]">
        <h3 className="text-xl font-bold mb-2 text-primary">
          {title[language === 'ru' ? 'ru' : 'kz']}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {description[language === 'ru' ? 'ru' : 'kz'] || 
            (language === 'ru' ? 'Описание отсутствует' : 'Сипаттама жоқ')}
        </p>
        <div className="text-sm text-gray-500 mb-4">
          <p className="mb-1">
            <span className="font-medium">{language === 'ru' ? 'Время' : 'Уақыт'}:</span> {duration} {language === 'ru' ? 'минут' : 'минут'}
          </p>
          <p>
            <span className="font-medium">{language === 'ru' ? 'Вопросов' : 'Сұрақтар'}:</span> {questions}
          </p>
        </div>
        <button
          onClick={handleStartTest}
          className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-light transition-colors"
        >
          {isAdmin 
            ? (language === 'ru' ? 'Перейти к тесту' : 'Тестке өту') 
            : (language === 'ru' ? 'Активировать ваучер' : 'Ваучер белсендіру')}
        </button>
      </div>

      <VoucherActivationModal
        open={showVoucherModal}
        onOpenChange={setShowVoucherModal}
        testId={id}
        onSuccess={handleVoucherSuccess}
      />
    </>
  );
};

export default TestCard;
