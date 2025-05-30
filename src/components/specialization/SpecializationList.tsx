
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SpecializationCard from './SpecializationCard';
import { SpecializationPagination } from './SpecializationPagination';

interface Specialization {
  id: string;
  name_ru: string;
  name_kz: string;
  created_at: string;
  updated_at: string;
}

interface SpecializationListProps {
  specializations: Specialization[];
  onRefresh: () => void;
}

const SpecializationList: React.FC<SpecializationListProps> = ({ 
  specializations, 
  onRefresh 
}) => {
  const { language } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 3x3 grid

  // Calculate pagination
  const totalPages = Math.ceil(specializations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSpecializations = specializations.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">
          {language === 'ru' ? 'Специализации' : 'Мамандықтар'}
        </h1>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={onRefresh}
        >
          <RefreshCw size={16} />
          {language === 'ru' ? 'Обновить' : 'Жаңарту'}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedSpecializations.map(specialization => (
          <SpecializationCard 
            key={specialization.id} 
            id={specialization.id}
            name={{
              ru: specialization.name_ru,
              kz: specialization.name_kz
            }}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <SpecializationPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default SpecializationList;
