
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

export const useTestAccess = (testId: string | undefined) => {
  const [hasAccess, setHasAccess] = useState(false);
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);
  const { isAuthenticated, user, profile } = useAuth();
  const { language } = useLanguage();

  console.log('=== useTestAccess DEBUG (Updated Logic) ===');
  console.log('Hook initialized with testId:', testId);
  console.log('Auth state:', { isAuthenticated, userId: user?.id, role: profile?.role });

  const checkAccess = useCallback(async () => {
    console.log('=== checkAccess FUNCTION START ===');
    console.log('Parameters:', { isAuthenticated, user: !!user, testId });

    if (!isAuthenticated || !user || !testId) {
      console.log('Early return: missing auth or testId');
      setHasAccess(false);
      setIsCheckingAccess(false);
      return;
    }

    try {
      console.log('Checking access for test:', testId, 'user:', user.id);
      
      // Проверяем, является ли пользователь администратором
      const isAdmin = profile?.role === 'admin';
      console.log('User is admin:', isAdmin);
      
      if (isAdmin) {
        console.log('Setting access to true because user is admin');
        setHasAccess(true);
        setIsCheckingAccess(false);
        return;
      }
      
      // Для обычных пользователей доступ всегда false - нужен ваучер каждый раз
      console.log('User is not admin - voucher required for each test attempt');
      setHasAccess(false);
      setIsCheckingAccess(false);
      
    } catch (error) {
      console.error('Error checking test access:', error);
      setIsCheckingAccess(false);
    }
  }, [testId, isAuthenticated, user, language, profile]);

  useEffect(() => {
    console.log('useTestAccess: Running initial check for test:', testId);
    checkAccess();
  }, [checkAccess]);

  const refreshAccess = () => {
    console.log('useTestAccess: Manually refreshing access for test:', testId);
    setIsCheckingAccess(true);
    checkAccess();
  };

  console.log('useTestAccess returning (updated):', { hasAccess, isCheckingAccess });

  return { hasAccess, isCheckingAccess, refreshAccess };
};
