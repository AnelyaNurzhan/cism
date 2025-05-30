
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { TestFormData } from '../TestFormModal';
import { TitleFields, DescriptionFields, TestConfigFields, StatusField } from './index';
import TestFormButtons from './TestFormButtons';
import { Form } from '@/components/ui/form';
import SpecializationLevelSelector from './SpecializationLevelSelector';

interface TestFormProps {
  onClose: () => void;
  onTestCreated: () => Promise<void>;
  editingTest?: any | null;
}

const TestForm: React.FC<TestFormProps> = ({ onClose, onTestCreated, editingTest = null }) => {
  const { language } = useLanguage();
  const { profile } = useAuth();
  const [selectedSpecializations, setSelectedSpecializations] = useState<Array<{
    specializationId: string;
    levelId: string;
  }>>([]);

  // Initialize react-hook-form
  const form = useForm<TestFormData>({
    defaultValues: {
      title_ru: '',
      title_kz: '',
      description_ru: '',
      description_kz: '',
      category: 'security',
      difficulty: 'medium',
      time_limit: 30,
      passing_score: 70,
      status: 'active'
    },
  });
  
  const { formState: { errors, isSubmitting }, register, handleSubmit, watch, reset } = form;
  const formData = watch(); // Get current form values

  // If editing an existing test, populate form with test data
  useEffect(() => {
    if (editingTest) {
      reset({
        title_ru: editingTest.title_ru || '',
        title_kz: editingTest.title_kz || '',
        description_ru: editingTest.description_ru || '',
        description_kz: editingTest.description_kz || '',
        category: editingTest.category || 'security',
        difficulty: editingTest.difficulty || 'medium',
        time_limit: editingTest.time_limit || 30,
        passing_score: editingTest.passing_score || 70,
        status: editingTest.is_active ? 'active' : 'draft'
      });

      // Fetch existing specialization-level associations
      if (editingTest.id) {
        fetchTestSpecializations(editingTest.id);
      }
    }
  }, [editingTest, reset]);

  // Fetch test specializations for editing
  const fetchTestSpecializations = async (testId: string) => {
    try {
      const { data, error } = await supabase
        .from('test_specializations')
        .select('specialization_id, level_id')
        .eq('test_id', testId);

      if (error) throw error;

      if (data) {
        const formattedData = data.map(item => ({
          specializationId: item.specialization_id,
          levelId: item.level_id
        }));
        
        setSelectedSpecializations(formattedData);
      }
    } catch (err) {
      console.error('Error fetching test specializations:', err);
    }
  };

  const onSubmit = async (data: TestFormData) => {
    try {
      // Prepare test data for database
      const testData = {
        title_ru: data.title_ru,
        title_kz: data.title_kz,
        description_ru: data.description_ru || null,
        description_kz: data.description_kz || null,
        time_limit: Number(data.time_limit),
        passing_score: Number(data.passing_score),
        is_active: data.status === 'active',
      };
      
      let testId;
      
      if (editingTest) {
        // Update existing test
        console.log("Updating test data:", testData);
        
        const { error } = await supabase
          .from('tests')
          .update(testData)
          .eq('id', editingTest.id);
        
        if (error) {
          console.error('Error updating test:', error);
          toast.error(language === 'ru' 
            ? 'Ошибка при обновлении теста' 
            : 'Тестті жаңарту кезінде қате');
          throw error;
        }
        
        testId = editingTest.id;
        
        toast.success(language === 'ru' 
          ? 'Тест успешно обновлен' 
          : 'Тест сәтті жаңартылды');
      } else {
        // Add created_by field for new tests
        const newTestData = {
          ...testData,
          created_by: profile?.id
        };
        
        console.log("Creating new test:", newTestData);
        
        // Add to database
        const { data, error } = await supabase
          .from('tests')
          .insert(newTestData)
          .select('id')
          .single();
        
        if (error) {
          console.error('Error creating test:', error);
          toast.error(language === 'ru' 
            ? 'Ошибка при создании теста' 
            : 'Тест жасау кезінде қате');
          throw error;
        }
        
        testId = data.id;
        
        toast.success(language === 'ru' 
          ? 'Тест успешно создан' 
          : 'Тест сәтті жасалды');
      }

      // Handle specialization and level associations
      if (testId) {
        // First, if editing, remove existing associations
        if (editingTest) {
          await supabase
            .from('test_specializations')
            .delete()
            .eq('test_id', testId);
        }

        // Then add new associations
        if (selectedSpecializations.length > 0) {
          const specializationData = selectedSpecializations.map(item => ({
            test_id: testId,
            specialization_id: item.specializationId,
            level_id: item.levelId
          }));

          const { error: specializationError } = await supabase
            .from('test_specializations')
            .insert(specializationData);

          if (specializationError) {
            console.error('Error adding test specializations:', specializationError);
            toast.error(language === 'ru' 
              ? 'Ошибка при добавлении специализаций' 
              : 'Мамандықтарды қосу кезінде қате');
          }
        }
      }
      
      onClose();
      await onTestCreated();
      
    } catch (err) {
      console.error('Exception in test operation:', err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <TitleFields 
          formData={formData} 
          formErrors={errors} 
          register={register}
        />
        
        <DescriptionFields 
          formData={formData} 
          formErrors={errors} 
          register={register}
        />
        
        <TestConfigFields 
          formData={formData} 
          formErrors={errors}
          register={register}
        />
        
        <div className="space-y-2 pt-2 border-t">
          <h3 className="text-lg font-medium">
            {language === 'ru' ? 'Специализации и уровни' : 'Мамандықтар мен деңгейлер'}
          </h3>
          <SpecializationLevelSelector
            selectedSpecializations={selectedSpecializations}
            onChange={setSelectedSpecializations}
          />
        </div>

        <StatusField 
          formData={formData} 
          register={register}
        />

        <TestFormButtons 
          isSubmitting={isSubmitting} 
          onCancel={onClose} 
        />
      </form>
    </Form>
  );
};

export default TestForm;
