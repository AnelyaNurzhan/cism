
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface SpecializationCardProps {
  id: string;
  name: {
    ru: string;
    kz: string;
  };
}

const SpecializationCard: React.FC<SpecializationCardProps> = ({ id, name }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  const handleViewLevels = () => {
    navigate(`/specialization/${id}`);
  };
  
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-primary truncate">
          {language === 'ru' ? name.ru : name.kz}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <CardDescription className="text-sm">
          {language === 'ru' 
            ? 'Нажмите «Подробнее» для просмотра уровней'
            : 'Деңгейлерді көру үшін «Толығырақ» түймесін басыңыз'}
        </CardDescription>
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button 
          variant="default" 
          className="w-full" 
          onClick={handleViewLevels}
        >
          {language === 'ru' ? 'Подробнее' : 'Толығырақ'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SpecializationCard;
