
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface SpecializationErrorProps {
  error: any;
  handleRefresh: () => void;
}

const SpecializationError: React.FC<SpecializationErrorProps> = ({ error, handleRefresh }) => {
  const { language } = useLanguage();
  
  return (
    <div className="container mx-auto py-8">
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="flex justify-center mb-4">
          <AlertTriangle size={48} className="text-red-500" />
        </div>
        
        <h2 className="text-2xl font-bold mb-4">
          {language === 'ru' ? 'Ошибка загрузки' : 'Жүктеу қатесі'}
        </h2>
        
        <p className="text-gray-600 mb-6">
          {language === 'ru' 
            ? 'Произошла ошибка при загрузке списка специализаций.' 
            : 'Мамандықтар тізімін жүктеу кезінде қате орын алды.'
          }
        </p>
        
        <div className="mb-4 p-4 bg-gray-100 rounded-md text-left overflow-auto max-h-32">
          <code className="text-sm text-red-600">
            {error?.message || String(error)}
          </code>
        </div>
        
        <Button onClick={handleRefresh}>
          {language === 'ru' ? 'Попробовать снова' : 'Қайталап көріңіз'}
        </Button>
      </div>
    </div>
  );
};

export default SpecializationError;
