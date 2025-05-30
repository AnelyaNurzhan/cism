
import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { VoucherActivationModal } from '@/components/test/VoucherActivationModal';
import { TestInfo } from '@/components/test/TestInfo';
import { TestLoading, TestError } from '@/components/test/TestPageStates';
import { TestAccessContent } from '@/components/test/TestAccessContent';
import { TestDuration } from '@/components/test/TestDuration';

const TestPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const { isAuthenticated, profile, user } = useAuth();
  const [showVoucherModal, setShowVoucherModal] = useState(false);

  // Проверяем, пришел ли пользователь с активированным ваучером
  const voucherActivationData = location.state as { 
    voucherId?: string;
    fromVoucherActivation?: boolean;
  } | null;

  // Для админов доступ есть всегда
  const isAdmin = profile?.role === 'admin';
  
  // Для обычных пользователей проверяем наличие активированного ваучера
  const hasVoucherAccess = Boolean(voucherActivationData?.fromVoucherActivation && voucherActivationData?.voucherId);
  
  // Общий доступ - либо админ, либо есть активированный ваучер
  const hasAccess = isAdmin || hasVoucherAccess;
  
  const isCheckingAccess = false; // Проверка не нужна, логика простая

  console.log('=== TEST PAGE ACCESS DEBUG ===');
  console.log('Location state:', location.state);
  console.log('Is admin:', isAdmin);
  console.log('Has voucher access:', hasVoucherAccess);
  console.log('Final hasAccess:', hasAccess);

  // Fetch test details
  const { data: test, isLoading, error } = useQuery({
    queryKey: ['test', id],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('tests')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Error fetching test:', error);
        throw error;
      }
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // Keep data fresh for 5 minutes
  });

  const handleStartTest = () => {
    if (!test) return;
    
    // Передаем информацию о ваучере при переходе к попытке теста
    navigate(`/test/${id}/attempt`, {
      state: voucherActivationData
    });
  };

  const handleVoucherSuccess = (voucherId: string) => {
    toast.success(language === 'ru' 
      ? 'Ваучер успешно активирован! Теперь у вас есть доступ к тесту.' 
      : 'Ваучер сәтті белсендірілді! Енді сізде тестке қол жетімділік бар.');
    
    // Close the modal
    setShowVoucherModal(false);
    
    // Navigate to test attempt page with voucher info
    navigate(`/test/${id}/attempt`, {
      state: {
        voucherId,
        fromVoucherActivation: true
      }
    });
  };

  if (isLoading || isCheckingAccess) {
    return (
      <div className="container mx-auto py-8 px-4">
        <TestLoading isLoading={true} />
      </div>
    );
  }

  if (error || !test) {
    return (
      <div className="container mx-auto py-8 px-4">
        <TestError error={error} />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center gap-2"
        onClick={() => navigate('/tests')}
      >
        <ArrowLeft size={16} />
        {language === 'ru' ? 'Назад к списку' : 'Тізімге оралу'}
      </Button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <TestInfo test={test} />
          <TestDuration timeLimit={test.time_limit} />
          
          {/* Показываем информацию об активированном ваучере */}
          {hasVoucherAccess && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-700 text-sm">
                {language === 'ru' 
                  ? '✅ Ваучер активирован. Вы можете пройти тест.' 
                  : '✅ Ваучер белсендірілді. Сіз тестті өте аласыз.'}
              </p>
            </div>
          )}
          
          <TestAccessContent 
            isAuthenticated={isAuthenticated}
            hasAccess={hasAccess}
            testId={id || ''}
            onActivateVoucher={() => setShowVoucherModal(true)}
            onStartTest={handleStartTest}
          />
        </div>
      </div>
      
      <VoucherActivationModal
        open={showVoucherModal}
        onOpenChange={setShowVoucherModal}
        testId={id || ''}
        onSuccess={handleVoucherSuccess}
      />
    </div>
  );
};

export default TestPage;
