
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLevels, Level } from '@/hooks/useLevels';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSpecializations } from '@/hooks/useSpecializations';
import { LevelsPagination } from '@/components/levels/LevelsPagination';

const LevelCard: React.FC<{ level: Level, specializationId: string }> = ({ level, specializationId }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border border-primary/10"
      onClick={() => navigate(`/specialization/${specializationId}/level/${level.id}`)}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-primary">
            {language === 'ru' ? level.name_ru : level.name_kz}
          </h3>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            {level.level_number}
          </Badge>
        </div>
      </div>
    </div>
  );
};

const LevelsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { specializations } = useSpecializations();
  const { levels, isLoading, error, handleRefresh } = useLevels(id);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 3x3 grid

  const specialization = specializations?.find(s => s.id === id);

  // Calculate pagination
  const totalPages = levels ? Math.ceil(levels.length / itemsPerPage) : 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLevels = levels ? levels.slice(startIndex, startIndex + itemsPerPage) : [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="h-10 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="bg-gray-200 h-40 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
          <h2 className="text-red-600 font-semibold text-xl mb-2">
            {language === 'ru' ? 'Ошибка загрузки' : 'Жүктеу қатесі'}
          </h2>
          <p className="text-gray-700 mb-4">
            {language === 'ru' 
              ? 'Не удалось загрузить уровни специализации. Пожалуйста, попробуйте обновить страницу.' 
              : 'Мамандану деңгейлерін жүктеу мүмкін болмады. Бетті жаңартып көріңіз.'}
          </p>
          <Button onClick={handleRefresh}>
            {language === 'ru' ? 'Обновить' : 'Жаңарту'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center gap-2 text-primary hover:text-primary/80 hover:bg-primary/10"
        onClick={() => navigate('/specializations')}
      >
        <ArrowLeft size={16} />
        {language === 'ru' ? 'Назад к специализациям' : 'Мамандықтарға оралу'}
      </Button>

      <h1 className="text-3xl font-bold mb-6 text-primary">
        {specialization 
          ? (language === 'ru' ? specialization.name_ru : specialization.name_kz)
          : (language === 'ru' ? 'Уровни специализации' : 'Мамандану деңгейлері')}
      </h1>

      {paginatedLevels && paginatedLevels.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedLevels.map(level => (
              <LevelCard 
                key={level.id} 
                level={level}
                specializationId={id || ''}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <LevelsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500 border border-primary/10">
          {language === 'ru' 
            ? 'Нет доступных уровней для этой специализации' 
            : 'Бұл мамандану үшін қол жетімді деңгейлер жоқ'}
        </div>
      )}
    </div>
  );
};

export default LevelsPage;
