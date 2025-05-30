
import React from 'react';
import { Loader } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Skeleton } from '@/components/ui/skeleton';

const TestLoadingState = () => {
  const { language } = useLanguage();
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header skeleton */}
        <div className="p-6 border-b">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        
        {/* Tabs skeleton */}
        <div className="px-6 pt-4 pb-2">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-8" />
            ))}
          </div>
        </div>
        
        {/* Question skeleton */}
        <div className="p-6">
          <Skeleton className="h-6 w-full mb-6" />
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
          
          {/* Navigation buttons skeleton */}
          <div className="mt-8 flex justify-between">
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-10 w-28" />
          </div>
        </div>
      </div>
      
      <div className="text-center mt-8">
        <div className="inline-flex items-center justify-center">
          <Loader className="animate-spin mr-2 h-6 w-6 text-primary" />
          <span className="text-lg font-medium text-gray-700">
            {language === 'ru' 
              ? 'Загрузка теста...' 
              : 'Тест жүктелуде...'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TestLoadingState;
