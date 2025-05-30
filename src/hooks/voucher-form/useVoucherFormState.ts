
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';

export const useVoucherFormState = (editingVoucher: any | null) => {
  const { language } = useLanguage();
  const [title, setTitle] = useState('');
  const [selectedTestIds, setSelectedTestIds] = useState<string[]>([]);
  const [startDate, setStartDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [usageLimit, setUsageLimit] = useState('1');
  const [quantity, setQuantity] = useState('1');
  const [isLoading, setIsLoading] = useState(false);
  const [tests, setTests] = useState<any[]>([]);
  const [selectedSpecializations, setSelectedSpecializations] = useState<Array<{
    specializationId: string;
    levelId: string;
  }>>([]);

  useEffect(() => {
    fetchTests();
    
    if (editingVoucher) {
      setTitle(editingVoucher.title || '');
      setStartDate(editingVoucher.start_date ? new Date(editingVoucher.start_date).toISOString().split('T')[0] : '');
      setExpiryDate(editingVoucher.expiry_date ? new Date(editingVoucher.expiry_date).toISOString().split('T')[0] : '');
      setUsageLimit(editingVoucher.usage_limit?.toString() || '1');
      setQuantity('1'); // Quantity is only relevant for new vouchers
      
      // Fetch selected tests for this voucher
      if (editingVoucher.selectedTests) {
        setSelectedTestIds(editingVoucher.selectedTests);
      } else {
        fetchVoucherTests(editingVoucher.id);
      }

      // Fetch selected specializations for this voucher
      fetchVoucherSpecializations(editingVoucher.id);
    } else {
      resetForm();
    }
  }, [editingVoucher]);

  const fetchTests = async () => {
    try {
      const { data, error } = await supabase
        .from('tests')
        .select('*')
        .order('title_ru', { ascending: true });
      
      if (error) throw error;
      if (data) setTests(data);
    } catch (error) {
      console.error('Error fetching tests:', error);
    }
  };

  const fetchVoucherTests = async (voucherId: string) => {
    try {
      const { data, error } = await supabase
        .from('voucher_tests')
        .select('test_id')
        .eq('voucher_id', voucherId);
      
      if (error) throw error;
      if (data) {
        const testIds = data.map(item => item.test_id);
        setSelectedTestIds(testIds);
      }
    } catch (error) {
      console.error('Error fetching voucher tests:', error);
    }
  };

  const fetchVoucherSpecializations = async (voucherId: string) => {
    try {
      const { data, error } = await supabase
        .from('voucher_specializations')
        .select('specialization_id, level_id')
        .eq('voucher_id', voucherId);
      
      if (error) throw error;
      if (data) {
        const formattedData = data.map(item => ({
          specializationId: item.specialization_id,
          levelId: item.level_id
        }));
        
        setSelectedSpecializations(formattedData);
      }
    } catch (error) {
      console.error('Error fetching voucher specializations:', error);
    }
  };

  const resetForm = () => {
    setTitle('');
    setSelectedTestIds([]);
    setSelectedSpecializations([]);
    setStartDate('');
    setExpiryDate('');
    setUsageLimit('1');
    setQuantity('1');
  };

  return {
    language,
    tests,
    title,
    setTitle,
    selectedTestIds,
    setSelectedTestIds,
    selectedSpecializations,
    setSelectedSpecializations,
    startDate,
    setStartDate,
    expiryDate,
    setExpiryDate,
    usageLimit,
    setUsageLimit,
    quantity,
    setQuantity,
    isLoading,
    setIsLoading,
    resetForm
  };
};
