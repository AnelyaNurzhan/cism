
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export interface Specialization {
  id: string;
  name_ru: string;
  name_kz: string;
}

export interface Level {
  id: string;
  level_number: number;
  name_ru: string;
  name_kz: string;
}

interface SpecializationLevelSelectorProps {
  selectedSpecializations: Array<{
    specializationId: string;
    levelId: string;
  }>;
  onChange: (selected: Array<{ specializationId: string; levelId: string }>) => void;
}

const SpecializationLevelSelector: React.FC<SpecializationLevelSelectorProps> = ({
  selectedSpecializations,
  onChange
}) => {
  const { language } = useLanguage();
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch specializations and levels
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        // Fetch specializations
        const { data: specializationsData, error: specializationsError } = await supabase
          .from('specializations')
          .select('*')
          .order('name_ru', { ascending: true });
          
        if (specializationsError) throw specializationsError;
        
        // Fetch levels
        const { data: levelsData, error: levelsError } = await supabase
          .from('levels')
          .select('*')
          .order('level_number', { ascending: true });
          
        if (levelsError) throw levelsError;
        
        setSpecializations(specializationsData || []);
        setLevels(levelsData || []);
      } catch (error) {
        console.error('Error fetching specializations and levels:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Handle specialization selection
  const handleSpecializationLevelChange = (specializationId: string, levelId: string, isChecked: boolean) => {
    let newSelected = [...selectedSpecializations];
    
    if (isChecked) {
      // Add new selection if not already selected
      const exists = newSelected.some(
        item => item.specializationId === specializationId && item.levelId === levelId
      );
      
      if (!exists) {
        newSelected.push({ specializationId, levelId });
      }
    } else {
      // Remove selection
      newSelected = newSelected.filter(
        item => !(item.specializationId === specializationId && item.levelId === levelId)
      );
    }
    
    onChange(newSelected);
  };
  
  // Check if a specialization-level pair is selected
  const isSelected = (specializationId: string, levelId: string) => {
    return selectedSpecializations.some(
      item => item.specializationId === specializationId && item.levelId === levelId
    );
  };
  
  if (loading) {
    return <div className="text-sm text-gray-500">{language === 'ru' ? 'Загрузка...' : 'Жүктелуде...'}</div>;
  }
  
  return (
    <div className="space-y-4">
      <div className="font-medium">
        {language === 'ru' ? 'Выберите специализации и уровни' : 'Мамандықтар мен деңгейлерді таңдаңыз'}
      </div>
      
      <Accordion type="multiple" className="w-full">
        {specializations.map(specialization => (
          <AccordionItem key={specialization.id} value={specialization.id}>
            <AccordionTrigger className="py-2 px-3 hover:bg-gray-100 rounded-md">
              {language === 'ru' ? specialization.name_ru : specialization.name_kz}
            </AccordionTrigger>
            <AccordionContent>
              <div className="pl-4 grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
                {levels.map(level => (
                  <div key={`${specialization.id}-${level.id}`} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${specialization.id}-${level.id}`}
                      checked={isSelected(specialization.id, level.id)}
                      onCheckedChange={(checked) => 
                        handleSpecializationLevelChange(specialization.id, level.id, checked === true)
                      }
                    />
                    <label
                      htmlFor={`${specialization.id}-${level.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {language === 'ru' ? level.name_ru : level.name_kz}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      
      {selectedSpecializations.length > 0 && (
        <div className="text-sm text-blue-600 mt-2">
          {language === 'ru' 
            ? `Выбрано ${selectedSpecializations.length} специализаций/уровней` 
            : `${selectedSpecializations.length} мамандық/деңгей таңдалды`}
        </div>
      )}
    </div>
  );
};

export default SpecializationLevelSelector;
