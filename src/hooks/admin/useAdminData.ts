
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useAdminData = (language: 'ru' | 'kz') => {
  const [users, setUsers] = useState<any[]>([]);
  const [tests, setTests] = useState<any[]>([]);
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  // Fetch users data
  const fetchUsers = async () => {
    try {
      console.log('=== ADMIN: FETCHING USERS ===');
      const { data, error } = await supabase
        .from('profiles')
        .select('*');
      
      if (error) {
        console.error('❌ Error fetching users:', error);
        throw error;
      }
      
      console.log('✅ Users fetched successfully:', data?.length || 0, 'users');
      if (data) setUsers(data);
    } catch (error) {
      console.error('❌ Error fetching users:', error);
    }
  };

  // Fetch tests data
  const fetchTests = async () => {
    try {
      console.log('=== ADMIN: FETCHING TESTS ===');
      const { data, error } = await supabase
        .from('tests')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('❌ Error fetching tests:', error);
        throw error;
      }
      
      console.log('✅ Tests fetched successfully:', data?.length || 0, 'tests');
      if (data) setTests(data);
    } catch (error) {
      console.error('❌ Error fetching tests:', error);
    }
  };

  // Исправленная функция загрузки ваучеров с подробным логированием
  const fetchVouchers = async () => {
    try {
      console.log('=== ADMIN: FETCHING VOUCHERS ===');
      console.log('Starting voucher fetch process...');
      
      // Получаем все ваучеры с информацией о создателе
      const { data: vouchers, error: vouchersError } = await supabase
        .from('vouchers')
        .select(`
          *,
          profiles:created_by (
            full_name
          )
        `)
        .order('created_at', { ascending: false });
      
      if (vouchersError) {
        console.error('❌ Error fetching vouchers:', vouchersError);
        throw vouchersError;
      }
      
      console.log('📊 Vouchers fetched from database:', vouchers?.length || 0);
      
      if (vouchers && vouchers.length > 0) {
        console.log('🔍 Processing voucher details...');
        
        // Для каждого ваучера получаем связанные тесты и специализации
        const vouchersWithDetails = await Promise.all(vouchers.map(async (voucher, index) => {
          console.log(`Processing voucher ${index + 1}/${vouchers.length}:`, {
            id: voucher.id,
            code: voucher.code,
            used_count: voucher.used_count,
            usage_limit: voucher.usage_limit,
            is_used: voucher.is_used
          });
          
          // Получаем связанные тесты
          const { data: voucherTests, error: testsError } = await supabase
            .from('voucher_tests')
            .select(`
              test_id,
              tests:test_id (
                id,
                title_ru,
                title_kz
              )
            `)
            .eq('voucher_id', voucher.id);
            
          if (testsError) {
            console.error(`❌ Error fetching tests for voucher ${voucher.code}:`, testsError);
          } else {
            console.log(`✅ Tests for voucher ${voucher.code}:`, voucherTests?.length || 0);
          }
          
          // Получаем связанные специализации
          const { data: voucherSpecs, error: specsError } = await supabase
            .from('voucher_specializations')
            .select(`
              specialization_id,
              level_id,
              specializations:specialization_id (
                name_ru,
                name_kz
              ),
              levels:level_id (
                name_ru,
                name_kz
              )
            `)
            .eq('voucher_id', voucher.id);
          
          if (specsError) {
            console.error(`❌ Error fetching specializations for voucher ${voucher.code}:`, specsError);
          } else {
            console.log(`✅ Specializations for voucher ${voucher.code}:`, voucherSpecs?.length || 0);
          }

          // Дополнительно получаем количество активаций для проверки
          const { data: activations, error: activationsError } = await supabase
            .from('user_voucher_activations')
            .select('id')
            .eq('voucher_id', voucher.id);

          if (activationsError) {
            console.error(`❌ Error fetching activations for voucher ${voucher.code}:`, activationsError);
          } else {
            const activationCount = activations?.length || 0;
            console.log(`📊 Voucher ${voucher.code} activations:`, {
              activationRecords: activationCount,
              usedCountFromVoucher: voucher.used_count,
              match: activationCount === (voucher.used_count || 0)
            });
            
            if (activationCount !== (voucher.used_count || 0)) {
              console.warn(`⚠️ MISMATCH: Voucher ${voucher.code} has ${activationCount} activation records but used_count is ${voucher.used_count}`);
            }
          }
          
          const result = {
            ...voucher,
            tests: voucherTests?.map(vt => vt.tests).filter(Boolean) || [],
            specializations: voucherSpecs || [],
            actualActivationCount: activations?.length || 0
          };
          
          console.log(`✅ Processed voucher ${voucher.code}:`, {
            id: result.id,
            code: result.code,
            used_count: result.used_count,
            usage_limit: result.usage_limit,
            is_used: result.is_used,
            actualActivationCount: result.actualActivationCount,
            testsCount: result.tests.length,
            specializationsCount: result.specializations.length
          });
          
          return result;
        }));
        
        console.log('✅ All vouchers processed successfully:', vouchersWithDetails.length);
        console.log('📊 Final vouchers summary:', vouchersWithDetails.map(v => ({
          code: v.code,
          used_count: v.used_count,
          usage_limit: v.usage_limit,
          actualActivations: v.actualActivationCount
        })));
        
        setVouchers(vouchersWithDetails);
      } else {
        console.log('ℹ️ No vouchers found in database');
        setVouchers([]);
      }
    } catch (error) {
      console.error('❌ Error in fetchVouchers:', error);
      toast.error(language === 'ru' ? 'Ошибка загрузки ваучеров' : 'Ваучерларды жүктеу қатесі');
      setVouchers([]);
    }
  };

  const fetchData = async () => {
    console.log('=== ADMIN DATA FETCH START ===');
    setIsDataLoading(true);
    try {
      await Promise.all([
        fetchUsers(),
        fetchTests(),
        fetchVouchers()
      ]);
      console.log('✅ All admin data fetched successfully');
    } catch (error) {
      console.error('❌ Error loading admin data:', error);
      toast.error(language === 'ru' ? 'Ошибка загрузки данных' : 'Деректерді жүктеу қатесі');
    } finally {
      setIsDataLoading(false);
      console.log('=== ADMIN DATA FETCH END ===');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Добавляем интервал для периодического обновления данных
  useEffect(() => {
    console.log('🔄 Setting up auto-refresh for admin data...');
    const interval = setInterval(() => {
      console.log('🔄 Auto-refreshing admin data...');
      fetchVouchers(); // Обновляем только ваучеры для проверки счетчиков
    }, 30000); // Каждые 30 секунд

    return () => {
      console.log('🛑 Stopping auto-refresh for admin data');
      clearInterval(interval);
    };
  }, []);

  return {
    users,
    tests,
    vouchers,
    isDataLoading,
    fetchUsers,
    fetchTests,
    fetchVouchers,
    fetchData
  };
};
